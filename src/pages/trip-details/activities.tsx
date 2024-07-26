import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { CircleMinusIcon, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { DeleteActivityModal } from './modals/delete-activity-modal';
import { UpdateActivityModal } from './modals/update-activity-modal';

interface Activity {
  id: string
  title: string
  occurs_at: string
}

export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])
  const [isDeleteActivityModalOpen,setIsDeleteActivityModalOpen ] = useState(false)
  const [isUpdateActivityModalOpen, setIsUpdateActivityModalOpen ] = useState(false)
  const [modalKey, setModalKey] = useState<string | null>(null);


  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => {
    console.log(response);  
    setActivities(response.data)
      }
    )
  }, [tripId])


  function openDeleteActivityModal() {
    setIsDeleteActivityModalOpen(true)
  }

  function closeDeleteActivityModal() {
    setIsDeleteActivityModalOpen(false)
  }

  function openUpdateActivityModal() {
    setIsUpdateActivityModalOpen(true)
  }

  function closeUpdateActivityModal() {
    setIsUpdateActivityModalOpen(false)
  }

  function handleButtonClick(key: string) {
    setModalKey(key)        
  }

  return (
   <>
    <div className="space-y-8">
      {activities.map(activity => (
        <div key={activity.id} data-key={activity.id} className="space-y-2.5">
        <div className="flex gap-2 items-baseline">
          <span className="text-xl text-zinc-300 font-semibold">Dia {format(activity.occurs_at, 'd')}</span>
          <span className="text-xs text-zinc-500">{format(activity.occurs_at, 'EEEE', { locale: ptBR })}</span>
        </div>

        <div className="space-y-2.5">
          <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
            <button onClick={() => {
              handleButtonClick(activity.id)
              openUpdateActivityModal()
            }}>
             <Pencil className="size-4 text-lime-200" />
            </button>
            <span className="text-zinc-100">{activity.title}</span>
            <span className="text-zinc-400 ml-auto">
              {format(activity.occurs_at, 'HH:mm')}h
            </span>
            <button onClick={() => {
              handleButtonClick(activity.id)
              openDeleteActivityModal()
            }}>
              <CircleMinusIcon className="size-5 text-red-500"/>
            </button>
           </div>
          </div>
        </div>
      ))}
      </div>

    {isDeleteActivityModalOpen && <DeleteActivityModal modalKey={modalKey} closeCreateActivityModal={closeDeleteActivityModal} />}
    {isUpdateActivityModalOpen && <UpdateActivityModal modalKey={modalKey} closeUpdateActivityModal={closeUpdateActivityModal} />}
    </>
  )
}