import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const GagnantsApi = axios.create({
  baseURL: process.env.API_URL
})

export const getGagnants = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await GagnantsApi.get(`/ui/gagnants`, config)

  return response.data
}

export default GagnantsApi
