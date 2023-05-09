import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const ShopApi = axios.create({
  baseURL: process.env.API_URL
})

// http://testapi.giftyshop.pro/ui/shops/refresh

export const refreshShops = async (id: any) => {
  console.log('id', id)
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }

  return await ShopApi.post('/ui/shops/refresh', id, config)
}

export const getShops = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ShopApi.get(`/ui/shops/list`, config)

  return response.data
}

export const addShop = async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }

  return await axios.post('http://testapi.giftyshop.pro/ui/shops/create/', data, config)
}

export const EditShop = async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }

  return await ShopApi.put(`/ui/shops/${data?.id}`, data, config)
}

export const getShopById = async (id: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ShopApi.get(`/ui/shops/${id}`, config)

  return response.data
}

export default ShopApi
