import axios from 'axios'

const DashbaordApi = axios.create({
  baseURL: process.env.API_URL
})

export const getQrCode = async () => {
  const shopId = window.localStorage.getItem('shopId')
  let myInit = {
    method: 'get',
    headers: { 'Content-Type': 'application/json' }
  }
  const send = await fetch(`http://testapi.giftyshop.pro/ui/qr/qrcode/shop/${shopId}`, myInit)
  return await send.blob()
}

export default DashbaordApi
