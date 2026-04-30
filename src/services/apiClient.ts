import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api',
  timeout: 2500,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getWithFallback = async <T>(endpoint: string, fallback: T): Promise<T> => {
  try {
    const response = await apiClient.get<T>(endpoint)
    return response.data
  } catch {
    return fallback
  }
}

export const postWithFallback = async <TResponse, TPayload>(
  endpoint: string,
  payload: TPayload,
  fallback: TResponse,
): Promise<TResponse> => {
  try {
    const response = await apiClient.post<TResponse>(endpoint, payload)
    return response.data
  } catch {
    return fallback
  }
}
