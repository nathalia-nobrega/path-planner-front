import { FormEvent, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'
import { getUserEmail } from '../../auth/authService'
import { api } from '../../lib/axios'
import { DestinationAndDateStep } from './steps/destination-and-date-step'

export function CreateTripPage() {
  const ownerName = localStorage.getItem('full_name')
  const navigate = useNavigate()

  const [destination, setDestination] = useState('')
  const [eventStartEndDates, setEventStartEndDates ] = useState<DateRange | undefined>()


  async function createTrip(event: FormEvent<HTMLFormElement>) {    
    const email = getUserEmail()?.sub
    event.preventDefault()

    if (!eventStartEndDates?.from || !eventStartEndDates.to) {
      return
    }

     const response = await api.post('/trips', {
      destination,
      starts_at: eventStartEndDates.from,
      ends_at: eventStartEndDates.to,
      owner_email: email,
      owner_name: ownerName
    })
    const { tripId } = response.data        
    
    navigate(`/trips/${tripId}`)
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 space-y-10 text-center">
      <div className='flex flex-col items-center gap-3'>
        <img src="/logo.svg" alt="plann.er" />
        <p className="text-zinc-300 text-lg">Planeje sua próxima viagem!</p>
      </div>

    <div className='space-y-4'>

    <DestinationAndDateStep
      createTrip={createTrip}
      setDestination={setDestination}
      setEventStartEndDates={setEventStartEndDates}
      eventStartEndDates={eventStartEndDates}

    />
        </div>
      </div>
    </div>
  )
}