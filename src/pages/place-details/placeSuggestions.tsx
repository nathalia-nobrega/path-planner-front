import { useSuggestions } from "../../components/context/SuggestionsContex";

export function PlaceSuggestions() {
  const GOOGLE_API_KEY = import.meta.env.VITE_APP_GOOGLE_API_KEY

  const { suggestions } = useSuggestions();  
 
   return (
    <div className="bg-zinc-950">
      <h1 className="text-2xl font-bold text-center py-2">Sugestões de locais para visitar:</h1>
        <div className="columns-3 space-y-5 shadow-shape px-5">
          {suggestions.map((suggestion) => (
            <div className="py-4 flex space-x-5">
              {suggestion.photos && suggestion.photos.length > 0 && (
              <img src={`/api/maps/api/place/photo?maxwidth=400&photoreference=${suggestion.photos[0]}&key=${GOOGLE_API_KEY}`} 
              alt={suggestion.name}
              className="rounded" />
             )}
              <div className="space-y-5">
                <p className="font-semibold text-lg">{suggestion.name}</p>
                <p> - {suggestion.vicinity}</p>
                <p> - Avaliação: {suggestion.rating}</p>
                <img src={suggestion.icon} className="size-5" />

              </div>
            </div>
          ))}
        </div>
    </div>
  )
}