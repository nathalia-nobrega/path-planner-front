import { FormEvent, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { useNavigate } from 'react-router-dom'
import { getUserEmail } from '../../auth/authService'
import { api } from '../../lib/axios'
import { InviteGuestsModal } from './invite-guests-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'

export function CreateTripPage() {
  const ownerName = localStorage.getItem('full_name')
  const navigate = useNavigate()

  const [ isGuestsInputOpen, setIsGuestsInputOpen ] = useState(false)
  const [ isGuestsModalOpen, setIsGuestsModalOpen ] = useState(false)

  const [destination, setDestination] = useState('')
  const [emailsToInvite, setEmailsToInvite ] =  useState([''])
  const [eventStartEndDates, setEventStartEndDates ] = useState<DateRange | undefined>()




  function openGuestsInput() {
    setIsGuestsInputOpen(true)
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false)
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }


  async function createTrip(event: FormEvent<HTMLFormElement>) {
    const email = getUserEmail()?.sub
    
    event.preventDefault()

    // Melhorar validação
    if (!destination) {
      return 
    }

    if (!eventStartEndDates?.from || !eventStartEndDates.to) {
      return
    }

    if (emailsToInvite.length === 0){
      return 
    }    

     const response = await api.post('/trips', {
      destination,
      starts_at: eventStartEndDates.from,
      ends_at: eventStartEndDates.to,
      emails_to_invite: emailsToInvite,
      owner_email: email,
      owner_name: ownerName
    })

    
    const { tripId } = response.data        
    
    navigate(`/trips/${tripId}`)
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) return

    if (emailsToInvite.includes(email)) return 

    setEmailsToInvite([...emailsToInvite, email])

    event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string) {
    const updatedEmailList = emailsToInvite.filter(invited => invited != emailToRemove)
    setEmailsToInvite(updatedEmailList)
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full px-6 space-y-10 text-center">
      <div className='flex flex-col items-center gap-3'>
        <img src="/logo.svg" alt="plann.er" />
        <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
      </div>

    <div className='space-y-4'>

    <DestinationAndDateStep
      closeGuestsInput={closeGuestsInput}
      isGuestsInputOpen={isGuestsInputOpen}
      openGuestsInput={openGuestsInput}
      setDestination={setDestination}
      setEventStartEndDates={setEventStartEndDates}
      eventStartEndDates={eventStartEndDates}

    />
    
      {isGuestsInputOpen && (
        <InviteGuestsStep
          emailsToInvite={emailsToInvite}
          createTrip={createTrip}
          openGuestsModal={openGuestsModal}
        />
      )}
      </div>
    </div>

    {isGuestsModalOpen && (
      <InviteGuestsModal 
      emailsToInvite={emailsToInvite}
      addNewEmailToInvite={addNewEmailToInvite}
      removeEmailToInvite={removeEmailToInvite}
      closeGuestsModal={closeGuestsModal}/>
    )}

      {/* {isConfirmTripModalOpen && (
            <ConfirmTripModal 
            addNewEmailToInvite={addNewEmailToInvite}
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
            />
      )} */}
    </div>
  )
}