import { format } from 'date-fns';
import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Button } from "../../../components/button";

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartEndDates: (dates: DateRange | undefined) => void
  eventStartEndDates: DateRange | undefined
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  setEventStartEndDates,
  eventStartEndDates
} : DestinationAndDateStepProps) {

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

  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape gap-3">
        <div className='flex flex-1 items-center gap-2'>
        <MapPin className='size-5 text-zinc-400'/>
        <input 
        disabled={isGuestsInputOpen} 
        type="text" 
        placeholder="Para onde você vai?" 
        className="bg-transparent text-lg outline-none placeholder-zinc-400"
        onChange={event => setDestination(event.target.value)}
        />
        </div>

        <button className='flex items-center gap-2 text-left w-[240px]' disabled={isGuestsInputOpen} onClick={openDatePicker}>
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

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary">
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>
      ):  (
      <Button onClick={openGuestsInput} variant="primary">
      Continuar
    <ArrowRight className='size-5'/>
    </Button>
    )}
    
  </div>
  )
}