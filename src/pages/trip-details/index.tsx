import { ArrowUpRightFromSquare, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { api } from "../../lib/axios";
import { Activities } from "./activities";
import { DestinationDateHeader } from "./destination-date-header";
import { ImportantLinks } from "./important-links";
import { CreateActivityModal } from "./modals/create-activity-modal";

export function TripDetailsPage() {

  const { tripId } = useParams()
  const [destination, setDestination] = useState<string | undefined>()
  const navigate = useNavigate()


  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => {
     const  { destination } = response.data
     setDestination(destination)
  }
    )
  }, [tripId])

  const [isCreateActivityModalOpen,setIsCreateActivityModalOpen ] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  function navigateToSuggestions() {
    navigate(`/trips/${tripId}/place-suggestions`)
  }
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationDateHeader  />

      <main className="flex gap-16 px-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center  justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivityModal} variant="primary">
              <Plus className='size-5'/>
              Cadastrar atividade
            </Button>
          </div>
          <Activities />
        </div>

        <div className="space-y-6 w-80">
          <div className="flex">
            <button className="flex hover:text-zinc-300" onClick={navigateToSuggestions}>
              <h2 className="font-semibold text-xl truncate">Lugares para visitar em {destination}</h2>
              <ArrowUpRightFromSquare className="size-5"/>
            </button>
          </div>
          <div className='w-full h-px bg-zinc-800 ' />
          <ImportantLinks />
          <div className='w-full h-px bg-zinc-800 ' />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal closeCreateActivityModal={closeCreateActivityModal}/>
      )}
    </div>
  )
}