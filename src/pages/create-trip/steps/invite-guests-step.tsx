import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../../../components/button";
import { FormEvent } from "react";

interface InviteGuestsStepProps {
  emailsToInvite: string[]
  openGuestsModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => Promise<void>
}

export function InviteGuestsStep({
  emailsToInvite,
  openGuestsModal,
  createTrip
} :  InviteGuestsStepProps) {
  return (
    <div className="h-16 px-4 bg-zinc-900 rounded-xl flex items-center shadow-shape flex-1 gap-3">
    <button type='button' className='flex items-center gap-2 flex-1 text-left' onClick={openGuestsModal}>
      <UserRoundPlus className='size-5 text-zinc-400'/>
      {emailsToInvite.length > 0 ? (
        <span className='text-zinc-100 text-lg flex-1'>{emailsToInvite.length} pessoa(s) convidada(s)</span>
      ) : (
        <span className='text-zinc-400 text-lg flex-1'>Convidar pessoas</span>

      )}
    </button>

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