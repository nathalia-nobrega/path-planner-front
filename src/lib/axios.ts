import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8080'
})

export const api_auth = 'http://localhost:8080/auth'