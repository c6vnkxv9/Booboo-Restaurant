import axiosInstance from './axios'
import axios from 'axios'
import { API_CONFIG } from '../config/api'
import { auth } from '../utils/auth'
const baseUrl = API_CONFIG.BASE_URL
export const adminSigninAPI = async (username, password) => {
  
  const response = await axios.post(
    `${baseUrl}admin/signin`,
    {
      username,
      password
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (response.data.success && response.data.token) {
    auth.setToken(response.data.token, response.data.uid, response.data.expired)
    auth.login(username, password)
  }
  return response.data
}


export const logoutAPI = async () => {
  try {
    const response = await axiosInstance.post(`${baseUrl}/logout`)
    auth.logout()
    return response.data
  } catch (error) {
    auth.logout()
    throw error
  }
}

// export const checkUserAPI = async () => {
//   const response = await axiosInstance.post(`${baseUrl}/user/check`)
//   return response.data
// }

export const loginAPI = adminSigninAPI


