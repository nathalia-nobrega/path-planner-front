import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../../components/button";
import { FormEvent } from "react";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface UpdateActivityModalProps {
  closeUpdateActivityModal: () => void
  modalKey: string | null
}

export function UpdateActivityModal({ closeUpdateActivityModal, modalKey } : UpdateActivityModalProps) {
  const { id } = useParams()

  async function updateActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    await api.put(`/trips/${id}/activities/${modalKey}`, {
      title,
      occurs_at
    })

    window.document.location.reload()
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>Editar atividade</h2>
                  <button onClick={closeUpdateActivityModal}>
                    <X className='size-5'/>
                  </button>
                </div>
              </div>
            
                <form className='space-y-3' onSubmit={updateActivity}>
                  <div className='px-5 h-14 bg-zinc-950 border-zinc 800 flex items-center gap-2 rounded-lg '>
                  <Tag className='text-zinc-400 size-5'/>
                    <input type="text" 
                    name='title' 
                    placeholder="Novo nome da atividade" 
                    required
                    className="bg-transparent text-lg outline-none placeholder-zinc-400 flex-1 "/>
                  </div>
    
                 <div className="items-center flex gap-2">
                  <div className='px-5 flex-1 h-14 bg-zinc-950  border-zinc-800 flex items-center gap-2 rounded-lg'>
                        <Calendar className='size-5 text-zinc-400'/>
                        <input 
                        type="datetime-local" 
                        placeholder="Data e horário"
                        name="occurs_at" 
                        required
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
                    </div>
                 </div>

                  <Button type='submit' size="full">
                    Atualizar
                  </Button>
                </form>
            </div>
          </div>
  )
}