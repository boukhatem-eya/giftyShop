import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const ClientApi = axios.create({
  baseURL: process.env.API_URL
})

export const getClients = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ClientApi.get(`/ui/clients`, config)

  return response.data
}

export default ClientApi
