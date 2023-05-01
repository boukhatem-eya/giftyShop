import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const ProductsApi = axios.create({
  baseURL: process.env.API_URL
})

export const getProducts = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ProductsApi.get(`/ui/products`, config)

  return response.data
}
export const getProductsArchivier = async () => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ProductsApi.get(`/ui/products/archiver`, config)

  return response.data
}

export const addProduct = async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }

  return await ProductsApi.post('/ui/products', data.dataToSave, config)
}

export const EditProduct = async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }

  return await ProductsApi.put(`/ui/products/${data.id.id}/`, data, config)
}

export const deleteProduct = async (id: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }

  return await ProductsApi.delete(`/ui/products/${id}/`, config)
}

export const getProductById = async (id: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ProductsApi.get(`/ui/products/${id}/`, config)

  return response.data
}
export const archiveProduct = async (data: any) => {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
  const config = {
    headers: {
      Authorization: storedToken
    }
  }
  const response = await ProductsApi.put(`/ui/products/${data?.id}/`, data?.state, config)

  return response.data
}

export default ProductsApi
