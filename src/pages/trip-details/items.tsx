import { CircleMinusIcon, Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { CreateItemModal } from "./modals/create-item-modal";

interface Item {
  id: string
  title: string
}


export function ImportantItems() {
  const { tripId } = useParams()
  const [items, setItems] = useState<Item[]>([])
  const [modalKey, setModalKey] = useState<string | null>(null);
  const [isRegisterItemModalOpen, setIsRegisterItemModalOpen] = useState(false)

    useEffect(() => {
      api.get(`/trips/${tripId}/items`).then(response => {
      setItems(response.data)
        }
      )
    }, [tripId])


  function openRegisterItemModal() {
    setIsRegisterItemModalOpen(true)
  }

  function closeRegisterItemModal() {
    setIsRegisterItemModalOpen(false)
  }

  async function deleteItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await api.delete(`/trips/${tripId}/items/${modalKey}`)    
    window.document.location.reload()
}

function handleButtonClick(key: string) {
  setModalKey(key)        
}
  return (
    <div className="space-y-6">
            <h2 className="font-semibold text-xl">O que você vai levar?</h2>

            <div className="px-5">
              <ul className="list-disc space-y-5">
              {items.length > 0 && (
                    items.map(item => (
                          <li>
                            <div className="flex items-center justify-between">
                              <span className="block text-zinc-100 truncate">{item.title}</span>
                             <form onSubmit={deleteItem}>
                              <button type="submit" onClick={() => handleButtonClick(item.id)}>
                                  <CircleMinusIcon className="size-5 text-red-500"/>
                              </button>
                             </form>
                            </div>
                          </li>
                    ))
                  )}
              </ul>
            </div>

            <Button variant="secondary" size="full" type="submit" onClick={openRegisterItemModal}>
              Adicionar novo item
              <Plus className='size-5' />
            </Button>

            {isRegisterItemModalOpen && <CreateItemModal closeRegisterItemModal={closeRegisterItemModal}/>}
          </div>
  )
}