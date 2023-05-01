import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const ShopApi = axios.create({
  baseURL: process.env.API_URL
})

// http://testapi.giftyshop.pro/ui/shops/refresh

export const refreshShops = async (id: any) => {
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
  console.log('storedToken', storedToken)
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ShopApi.get(`/ui/shops/list`, config)

  return response.data
}

export const addShop = async (data: any) => {
  console.log('data', data)
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }

  return await axios.post('http://testapi.giftyshop.pro/ui/shops/create/', data, config)
}

export const EditShop = async (data: any) => {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }

  return await ShopApi.put(`/pools/api/pools/${data.id.id}/`, data.formData, config)
}

export const deleteShop = async (id: any) => {
  return await ShopApi.delete(`/pools/api/pools/${id}/`)
}

export const getShopById = async (id: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ShopApi.get(`/ui/products/${id}`, config)

  return response.data
}

export default ShopApi
