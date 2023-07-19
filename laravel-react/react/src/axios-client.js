import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((configs) => {
  const token = localStorage.getItem('ACCESS_TOKEN')
  configs.headers.Authorization = `Bearer ${token}`

  return configs;
})

axiosClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  const {response} = error
  if (response.status === 401) {
    localStorage.removeItem('ACCESS_TOKEN')
  }
  throw error

})

export default axiosClient