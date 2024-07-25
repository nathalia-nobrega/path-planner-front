import { format, setHours, setMinutes } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { Calendar, Tag, X } from "lucide-react";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useParams } from "react-router-dom";
import { Button } from "../../../components/button";
import { api } from "../../../lib/axios";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({ closeCreateActivityModal }: CreateActivityModalProps) {
  const { id } = useParams()
  const[startDate, setStartDate] = useState<Date>(new Date())
  const[endDate, setEndDate] = useState<Date>(new Date())

  const [selected, setSelected] = useState<Date>();
  const [timeValue, setTimeValue] = useState<string>("00:00");

  
  const[activityDate, setActivityDate] = useState<Date | undefined | undefined>()
  const [isDatePickerOpen, setIsDatePickerOpen ] = useState(false)

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours);
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  // get the start and end date for the trip

  useEffect(() => {
    api.get(`/trips/${id}`).then(response => {
     const  { endsAt, startsAt } = response.data
     const starts_at = new Date(startsAt)
     const ends_at = new Date(endsAt)

    setStartDate(starts_at)
    setEndDate(ends_at)
    }
    )
  }, [id])

  const getLocalDateTime = () => {
    if (activityDate && timeValue) {
      const hour = Number(timeValue.split(':')[0])      
      const minutes = Number(timeValue.split(':')[1])

      const dateTime = new Date(
        activityDate.getFullYear(),
        activityDate.getMonth(),
        activityDate.getDate(),
        hour,
        minutes
      );
      const pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
      const dateTimeFormat = formatInTimeZone(dateTime, 'America/Manaus', pattern)
      return dateTimeFormat;
    }
    return null;
  };

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()  
     
    const occurs_at = getLocalDateTime()

    await api.post(`/trips/${id}/activities`, {
      title,
      occurs_at
    })

    window.document.location.reload()
  }

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }


  return (
    <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-4'>
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h2 className='text-lg font-semibold'>Cadastrar atividade</h2>
                  <button onClick={closeCreateActivityModal}>
                    <X className='size-5'/>
                  </button>
                </div>
                <p className='text-sm text-zinc-400'>Todos convidados podem visualizar as atividades.</p>
              </div>
    
              <div className='flex flex-wrap gap-2'>
     
              </div>
    
                <form className='space-y-3' onSubmit={createActivity}>
                  <div className='px-5 h-14 bg-zinc-950 border-zinc 800 flex items-center gap-2 rounded-lg '>
                  <Tag className='text-zinc-400 size-5'/>
                    <input type="text" 
                    name='title' 
                    placeholder="Qual a atividade" 
                    required
                    className="bg-transparent text-lg outline-none placeholder-zinc-400 flex-1 "/>
                  </div>
    
                 <div className="px-5 h-14 bg-zinc-950 border-zinc 800 flex items-center gap-2 rounded-lg ">
                 <button className='flex items-center gap-2 text-left w-[240px]' onClick={openDatePicker}>
                      <Calendar className='size-5 text-zinc-400'/>
                      <span className="text-lg placeholder-zinc-400  w-40 flex-1">
                        {activityDate ? format(activityDate, "dd 'de' LLL, ").concat(timeValue, "h") : 'Quando?'}
                      </span>
                  </button>
                 </div>

        {isDatePickerOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <button onClick={closeDatePicker} type="button">
                  <X className='size-5 text-zinc-400'/>
                </button>
              </div>
            </div>

             
            <div className="mx-auto">
              <label className="block mb-2 text-md text-gray-900 dark:text-white">Select time:</label>
              <div className="relative">
                  <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                          <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                      </svg>
                  </div>
                  <input type="time" onChange={handleTimeChange}
                  className="bg-gray-50 border 
                  leading-none border-gray-300 
                  text-gray-900 text-sm rounded-lg 
                  focus:ring-blue-500 focus:border-blue-500 
                  block w-full p-2.5 dark:bg-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
            </div>

              <DayPicker 
              mode="single" 
              selected={activityDate} 
              onSelect={setActivityDate} 
              disabled={ 
                {
                  before: startDate,
                  after: endDate
                }
              }
              classNames={{
                selected: `bg-zinc-400 text-white rounded-[35px]`, // Highlight the selected day
                range_end: `bg-lime-200 text-black`,
                range_start: `bg-lime-200 text-black`
                }}
              />
          </div>
        </div>
        )}

                  <Button type='submit' size="full">
                    Salvar atividade
                  </Button>
                </form>
            </div>
          </div>
  )
}