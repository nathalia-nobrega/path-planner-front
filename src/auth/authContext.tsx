/**
 * This file provides the context of authentication so that
 * we can manage the user's state and token. It works as a sort
 * of 'Controller'.
 **/

import { ReactNode, createContext, useContext, useState } from "react";
import { LoginResponse, getUserEmail, login, logout, setToken } from "./authService";
import { AxiosResponse } from "axios";

interface AuthContextType {
  email: string | null,
  login: (email: string, password: string) => Promise<AxiosResponse<LoginResponse, any>>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState<string | null>(getUserEmail())

  const handleLogin = async (email: string, password: string) => {
    const response = await login(email, password)
    
    setToken(response.data.token)
    setEmail(getUserEmail())

    return response
  }

  const handleLogout = () => {
    logout()
    setEmail(null)
  }

  return (
    <AuthContext.Provider value={{ email, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider')

  return context
}