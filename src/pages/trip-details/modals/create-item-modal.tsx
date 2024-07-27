import { Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { Button } from "../../../components/button";
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateItemModalProps {
  closeRegisterItemModal: () => void
}

export function CreateItemModal({ closeRegisterItemModal }: CreateItemModalProps) {
  const { tripId } = useParams()

  async function registerItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()

    await api.post(`/trips/${tripId}/items`, {
      title,
    }).then(response => console.log(response))

    window.document.location.reload()
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
    <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Adicionar novo item</h2>
          <button onClick={closeRegisterItemModal}>
            <X className='size-5'/>
          </button>
        </div>
      </div>

        <form className='space-y-3' onSubmit={registerItem}>
          <div className='px-5 h-14 bg-zinc-950 border-zinc 800 flex items-center gap-2 rounded-lg '>
          <Tag className='text-zinc-400 size-5'/>
            <input type="text" 
            name='title' 
            placeholder="Qual item você vai levar?" 
            required
            className="bg-transparent text-lg outline-none placeholder-zinc-400 flex-1 "/>
          </div>

          <Button type='submit' size="full">
            Salvar item
          </Button>
        </form>
    </div>
  </div>
  )
}