import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const HistoryApi = axios.create({
  baseURL: process.env.API_URL
})

export const getHistory = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await HistoryApi.get(`/ui/history`, config)

  return response.data
}

export default HistoryApi
