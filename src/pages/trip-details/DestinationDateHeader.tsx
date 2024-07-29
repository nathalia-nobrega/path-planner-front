import { format } from 'date-fns';
import { Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { api } from "../../lib/axios";

interface Trip {
  id: string | undefined
  destination: string,
  starts_at: string,
  ends_at: string,
  is_confirmed: boolean
}

// Tratar ID not found

export function DestinationDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => {
     const  { destination, endsAt, isConfirmed, startsAt } = response.data
          
     setTrip( { id: tripId, 
      is_confirmed: isConfirmed, 
      destination, 
      starts_at: startsAt,
      ends_at: endsAt} )
  }
    )
  }, [tripId])
  
  

  const displayedDate = trip ? format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d' de 'LLL"))
  : null

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-center gap-32">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400"/>
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className='w-px h-6 bg-zinc-800'/>


      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400"/>
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

      </div>
      </div>
  )
}