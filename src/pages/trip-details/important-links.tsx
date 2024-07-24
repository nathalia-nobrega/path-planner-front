import { Pencil, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { CreateLinkModal } from "./modals/create-link-modal";
import { UpdateLinkModal } from "./modals/update-link-modal";

interface Link {
  id: string
  title: string
  url: string
}


export function ImportantLinks() {

  const { id } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [isRegisterLinkModalOpen, setIsRegisterLinkModalOpen] = useState(false)
  const [isUpdateLinkModalOpen, setIsUpdateLinkModalOpen] = useState(false)
  const [modalKey, setModalKey] = useState<string | null>(null);


  useEffect(() => {
    api.get(`/trips/${id}/links`).then(response => {
     setLinks(response.data)
      }
    )
  }, [id])

  function openRegisterLinkModal() {
    setIsRegisterLinkModalOpen(true)
  }

  function closeRegisterLinkModal() {
    setIsRegisterLinkModalOpen(false)
  }
  function openUpdateLinkModal() {
    setIsUpdateLinkModalOpen(true)
  }

  function closeUpdateLinkModal() {
    setIsUpdateLinkModalOpen(false)
  }

  function handleButtonClick(key: string) {
    setModalKey(key)        
  }

  function registerLink() {

  }
  
  return (
    <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links importantes</h2>

            <div className="space-y-5">
                {links.length > 0 && (
                  links.map(link => (
                    <div className="flex items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">{link.title}</span>
                        <a href={link.url} target="_blank"  className="block text-xs hover:text-zinc-200 text-zinc-400 truncate">
                          {link.url}
                        </a>
                      </div>
                    <button onClick={() => {
                      handleButtonClick(link.id)
                      openUpdateLinkModal()
                    }}>
                      <Pencil className="text-zinc-400 size-5 shrink-0"/>
                    </button>
                </div>
                  ))
                )}
            </div>

            <Button variant="secondary" size="full" type="submit" onClick={openRegisterLinkModal}>
             Cadastrar novo link
              <Plus className='size-5' />
            </Button>

            {isRegisterLinkModalOpen && <CreateLinkModal closeRegisterLinkModal={closeRegisterLinkModal}/>}
            {isUpdateLinkModalOpen && <UpdateLinkModal closeUpdateLinkModal={closeUpdateLinkModal} modalKey={modalKey}/>}
          </div>
  )
}