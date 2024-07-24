import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface Link {
  id: string
  title: string
  url: string
}


export function ImportantLinks() {

  const { id } = useParams()
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    api.get(`/trips/${id}/links`).then(response => {
     setLinks(response.data)
     console.log(response.data);
     
    }
    )
  }, [id])
  
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
                    <Link2 className="text-zinc-400 size-5 shrink-0"/>
                </div>
                  ))
                )}
            </div>

            <Button variant="secondary" size="full">
             Cadastrar novo link
              <Plus className='size-5' />
            </Button>
          </div>
  )
}