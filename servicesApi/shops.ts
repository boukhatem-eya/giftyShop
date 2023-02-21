import axios from 'axios'
// ** Config
import authConfig from 'src/configs/auth'

const ShopApi = axios.create({
  baseURL: process.env.API_URL
})

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
  console.log(data.formData)
  const config = {
    headers: {
      Authorization: storedToken,
      'content-type': 'multipart/form-data'
    }
  }
  return await ShopApi.post('/ui/shops/', data.formData, config)
}

export const EditShop = async (data: any) => {
  console.log(data.formData)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return await ShopApi.put(`/pools/api/pools/${data.id.id}/`, data.formData, config)
}

export const deleteShop = async (id: number | string) => {
  return await ShopApi.delete(`/pools/api/pools/${id}/`)
}

export const getShopById = async (id: any) => {
  const response = await ShopApi.get(`/pools/api/detail-pool/${id}/`)
  return response.data
}

export default ShopApi
