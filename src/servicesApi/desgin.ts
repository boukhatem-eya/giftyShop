import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const DesignApi = axios.create({
  baseURL: process.env.API_URL
})

export const addGameRules = async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const shopId = window.localStorage.getItem('shopId')
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await DesignApi.put(`ui/shops/${shopId}`, data, config)

  return response.data
}

export default DesignApi
