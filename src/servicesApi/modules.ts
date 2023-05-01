import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const ModuleApi = axios.create({
  baseURL: process.env.API_URL
})

export const getModules = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ModuleApi.get(`/ui/modules/list`, config)

  return response.data
}

export const activeModule = async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken

      // 'content-type': 'content/form-data'
    }
  }

  return await axios.post('http://testapi.giftyshop.pro/ui/modules/active/', data.data, config)
}

export default ModuleApi
