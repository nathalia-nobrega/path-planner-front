import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";

interface Guest {
  id: string
  name: string | null
  email: string
  isConfirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [guests, setGuests] = useState<Guest[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => {
     setGuests(response.data)
     console.log(response.data);
     
    }
    )
  }, [tripId])
  return (
    <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>

            <div className="space-y-5">
             {guests.map(guest => (
               <div className="flex items-center justify-between gap-4">
               <div className="space-y-1.5">
                 {guest.name && (
                  <span className="block font-medium text-zinc-100">{guest.name}</span>
                 )}
                 <a href="#" className="block text-xs hover:text-zinc-200 text-zinc-400 truncate">
                   {guest.email}
                 </a>
               </div>
               {guest.isConfirmed ? (
                 <CircleCheck className="text-lime-200 size-5 shrink-0"/>
               ) : (
                  <CircleDashed className="text-zinc-400 size-5 shrink-0"/>
               )}
              </div>
             ))} 
            </div>

            <Button variant="secondary" size="full">
            Gerenciar convidados
            <UserCog className='size-5' />
            </Button>
          </div>
  )
}