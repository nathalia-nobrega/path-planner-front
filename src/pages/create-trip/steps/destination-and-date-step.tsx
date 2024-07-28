import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { format } from 'date-fns';
import { ArrowRight, Calendar, MapPin, X } from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Button } from "../../../components/button";
import { useSuggestions } from '../../../components/context/SuggestionsContex';
import { fetchSuggestions } from '../../../services/suggestionsService';

// Google Places API config
const libraries: ('places')[] = ['places'];
const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY

interface DestinationAndDateStepProps {
  createTrip: (event: FormEvent<HTMLFormElement>) => Promise<void>
  setDestination: (destination: string) => void
  setEventStartEndDates: (dates: DateRange | undefined) => void
  eventStartEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
  createTrip,
  setDestination,
  setEventStartEndDates,
  eventStartEndDates
} : DestinationAndDateStepProps) {

  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const { setSuggestions } = useSuggestions();
  
  const [isDatePickerOpen, setIsDatePickerOpen ] = useState(false)
  const displayedDate = eventStartEndDates && eventStartEndDates.from && eventStartEndDates.to
  ? format(eventStartEndDates.from, "dd 'de' LLL").concat(' até ').concat(format(eventStartEndDates.to, "dd 'de' LLL"))
  : null

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }

  /* This function handles the search for the places based on
  *  the user's query every time the user selects a query
  */
  function handlePlaceChanged() {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        setDestination(place.formatted_address || '');
        const location = place.geometry?.location;
        if (location) {
          fetchSuggestions(location.lat(), location.lng(), GOOGLE_API_KEY)
            .then(results => {
              setSuggestions(results)
            })
            .catch(error => console.error('Error fetching suggestions:', error));
        }
      }
    }
  }

  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
        <div className='flex flex-1 items-center gap-2 truncate'>
        <MapPin className='size-5 text-zinc-400'/>
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
          <StandaloneSearchBox
          onPlacesChanged={handlePlaceChanged}
          onLoad={ref => (searchBoxRef.current = ref)}>
            <input 
            type="text" 
            placeholder="Para onde você vai"
            className="bg-transparent text-lg outline-none placeholder-zinc-400"
            required
          />
          </StandaloneSearchBox>
        </LoadScript>
        </div>

        <button className='flex items-center gap-2 text-left w-[240px]' onClick={openDatePicker}>
          <Calendar className='size-5 text-zinc-400'/>
          <span className="text-lg placeholder-zinc-400  w-40 flex-1">
              {displayedDate || "Quando?"}
          </span>
        </button>

        {isDatePickerOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h2 className='text-lg font-semibold'>Selecione a data</h2>
                <button onClick={closeDatePicker} type="button">
                  <X className='size-5 text-zinc-400'/>
                </button>
              </div>
            </div>
            <DayPicker 
            mode="range" 
            selected={eventStartEndDates} 
            onSelect={setEventStartEndDates} 
            classNames={{
              selected: `bg-zinc-400 text-white rounded-[35px]`, // Highlight the selected day
              range_end: `bg-lime-200 text-black`,
              range_start: `bg-lime-200 text-black`
              }}
            />
          </div>
        </div>
        )}

      <div className='w-px h-6 bg-zinc-800'/>
        <form onClick={createTrip}>
          <Button>
              Confirmar viagem
            <ArrowRight className='size-5'/>
          </Button>
        </form>
      </div>
  )
}