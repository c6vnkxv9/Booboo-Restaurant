import axiosInstance from './axios'

export const getCartAPI = async () => {
  const response = await axiosInstance.get('/cart')
  return response.data
}

export const addToCartAPI = async (productId, qty = 1) => {
  const response = await axiosInstance.post('/cart', {
    data: {
      product_id: productId,
      qty
    }
  })
  return response.data
}

export const updateCartItemAPI = async (cartItemId, productId, qty) => {
  const response = await axiosInstance.put(`/cart/${cartItemId}`, {
    data: {
      product_id: productId,
      qty
    }
  })
  return response.data
}

export const removeCartItemAPI = async (cartItemId) => {
  const response = await axiosInstance.delete(`/cart/${cartItemId}`)
  return response.data
}

export const clearCartAPI = async () => {
  const response = await axiosInstance.delete('/carts')
  return response.data
}
