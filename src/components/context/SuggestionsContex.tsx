/*
This context file had to be created due to the fact that I need access to the
suggestions that came as a response to a request that was made in the DestinationDateStep
component. However, I need to access them in another component that isn't a direct child to it.
*/

import React, { ReactNode, createContext, useContext, useState } from "react"

export interface Suggestion {
  name: string
  vicinity: string
  icon: string
  photos?: string[]
  rating: number
}

export interface SuggestionsContextType {
  suggestions: Suggestion[]
  setSuggestions: (suggestions: Suggestion[]) => void
}

const SuggestionsContext = createContext<SuggestionsContextType | undefined>(undefined)

export const SuggestionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  return (
    <SuggestionsContext.Provider value={{ suggestions, setSuggestions }}>
      {children}
    </SuggestionsContext.Provider>
  )
}

export const useSuggestions = (): SuggestionsContextType => {
  const context = useContext(SuggestionsContext)
  if (!context) {
    throw new Error('useSuggestions must be used within a SuggestionsProvider');
  }
  return context
}