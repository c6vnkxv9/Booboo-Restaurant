// 模擬產品數據
export const products = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: 35900,
    description: '最新的 iPhone 15 Pro，配備 A17 Pro 晶片，擁有強大的性能和專業級的攝影功能。',
    image: 'https://via.placeholder.com/400x300?text=iPhone+15+Pro',
    category: '手機',
    stock: 50
  },
  {
    id: 2,
    name: 'MacBook Pro 14"',
    price: 69900,
    description: '配備 M3 晶片的 MacBook Pro，提供卓越的效能和電池續航力，適合專業工作者。',
    image: 'https://via.placeholder.com/400x300?text=MacBook+Pro',
    category: '筆記型電腦',
    stock: 30
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: 7490,
    description: '主動式降噪功能，空間音訊，以及自適應等化器，提供沉浸式的音訊體驗。',
    image: 'https://via.placeholder.com/400x300?text=AirPods+Pro',
    category: '耳機',
    stock: 100
  },
  {
    id: 4,
    name: 'iPad Air',
    price: 18900,
    description: '配備 M2 晶片的 iPad Air，支援 Apple Pencil，適合創作和生產力工作。',
    image: 'https://via.placeholder.com/400x300?text=iPad+Air',
    category: '平板電腦',
    stock: 40
  },
  {
    id: 5,
    name: 'Apple Watch Series 9',
    price: 12900,
    description: '最新的 Apple Watch，配備 S9 晶片，提供健康監測和運動追蹤功能。',
    image: 'https://via.placeholder.com/400x300?text=Apple+Watch',
    category: '智慧手錶',
    stock: 60
  },
  {
    id: 6,
    name: 'Magic Keyboard',
    price: 4290,
    description: '專為 iPad 設計的鍵盤，提供舒適的打字體驗和背光功能。',
    image: 'https://via.placeholder.com/400x300?text=Magic+Keyboard',
    category: '配件',
    stock: 80
  }
]

// 根據 ID 獲取產品
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

