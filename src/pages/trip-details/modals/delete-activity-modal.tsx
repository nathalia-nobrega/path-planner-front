import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../../lib/axios";
import { Button } from "../../../components/button";

interface DeleteActivityModalProps {
  closeCreateActivityModal: () => void
  modalKey: string | null
}

export function DeleteActivityModal({ closeCreateActivityModal, modalKey }: DeleteActivityModalProps) {
  const { id } = useParams()

  async function deleteActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await api.delete(`/trips/${id}/activities/${modalKey}`)    
    window.document.location.reload()
}

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-4'>
              <div className='space-y-2'>
                <div className="flex items-center justify-center">
                  <h2 className="font-semibold text-lg">Tem certeza de que deseja deletar esta atividade?</h2>
                </div>
                <div className='flex items-center justify-center gap-8 py-4'>
                <form onSubmit={deleteActivity}>
                  <Button type='submit'>
                      Tenho certeza
                    </Button>
                </form>

                 <Button type='submit' onClick={closeCreateActivityModal}>
                    Cancelar
                  </Button>
                </div>
              </div>
                 
            </div>
          </div>
  )
}