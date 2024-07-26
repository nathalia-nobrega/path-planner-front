import { Link, Tag, X } from "lucide-react";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { api } from "../../../lib/axios";

interface CreateLinkModalProps {
  closeRegisterLinkModal: () => void
}

export function CreateLinkModal({ closeRegisterLinkModal }: CreateLinkModalProps) {
  const { tripId } = useParams()

  async function registerLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    await api.post(`/trips/${tripId}/links`, {
      title,
      url
    }).then(response => console.log(response))

    window.document.location.reload()
  }

  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
    <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-4'>
      <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h2 className='text-lg font-semibold'>Adicionar novo link</h2>
          <button onClick={closeRegisterLinkModal}>
            <X className='size-5'/>
          </button>
        </div>
      </div>

        <form className='space-y-3' onSubmit={registerLink}>
          <div className='px-5 h-14 bg-zinc-950 border-zinc 800 flex items-center gap-2 rounded-lg '>
          <Tag className='text-zinc-400 size-5'/>
            <input type="text" 
            name='title' 
            placeholder="Qual o título do link?" 
            required
            className="bg-transparent text-lg outline-none placeholder-zinc-400 flex-1 "/>
          </div>

         <div className="items-center flex gap-2">
          <div className='px-5 flex-1 h-14 bg-zinc-950  border-zinc-800 flex items-center gap-2 rounded-lg'>
                <Link className='size-5 text-zinc-400'/>
                <input type="url" 
                name='url' 
                placeholder="Insira o link" 
                required
                className="bg-transparent text-lg outline-none placeholder-zinc-400 flex-1 "/>
            </div>
         </div>

          <Button type='submit' size="full">
            Salvar link
          </Button>
        </form>
    </div>
  </div>
  )
}