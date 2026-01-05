// 圖片上傳相關的 API 請求
import axiosInstance from './axios'

/**
 * 上傳圖片（管理控制台）
 * POST /v2/api/{api_path}/admin/upload
 * @param {File} file - 要上傳的檔案
 * @returns {Promise} API 響應
 */
export const uploadAdminImageAPI = async (file) => {
  const formData = new FormData()
  formData.append('file-to-upload', file)

  const response = await axiosInstance.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

/**
 * 批次從 public 資料夾獲取圖片並上傳，最後將 URL 存入 localStorage
 * @param {Array<string>} filenames - 檔名陣列
 */
export const uploadAndSaveToLocal = async (filenames) => {
  const storageKey = 'uploadedImages'
  const currentImages = JSON.parse(localStorage.getItem(storageKey) || '[]')

  for (const name of filenames) {
    try {
      console.log(`準備處理: ${name}`)
      // 1. 從 public 獲取檔案
      const response = await fetch(`/${name}`)
      const blob = await response.blob()
      const file = new File([blob], name, { type: 'image/png' })

      // 2. 調用上傳 API
      const result = await uploadAdminImageAPI(file)

      if (result.success) {
        // 3. 存入 localStorage
        currentImages.push(result.imageUrl)
        localStorage.setItem(storageKey, JSON.stringify(currentImages))
        console.log(`✅ ${name} 上傳成功並已存入 localStorage`)
      }
    } catch (error) {
      console.error(`❌ ${name} 處理過程發生錯誤:`, error)
    }
  }
  
  return JSON.parse(localStorage.getItem(storageKey))
}


