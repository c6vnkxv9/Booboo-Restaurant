import axiosInstance from './axios';

/**
 * 建立訂單
 * @param {Object} orderData - 訂單資料
 * @param {Object} orderData.user - 使用者資料
 * @param {string} orderData.user.name - 姓名
 * @param {string} orderData.user.email - Email
 * @param {string} orderData.user.tel - 電話
 * @param {string} orderData.user.address - 地址
 * @param {string} orderData.message - 留言（選填）
 */
export const createOrderAPI = async (orderData) => {
	const response = await axiosInstance.post('/order', {
		data: orderData,
	});
	return response.data;
};

/**
 * 取得訂單列表
 */
export const getOrdersAPI = async () => {
	const response = await axiosInstance.get('/orders');
	return response.data;
};

/**
 * 取得單一訂單
 * @param {string} orderId - 訂單 ID
 */
export const getOrderByIdAPI = async (orderId) => {
	const response = await axiosInstance.get(`/order/${orderId}`);
	return response.data;
};

/**
 * 付款
 * @param {string} orderId - 訂單 ID
 */
export const payOrderAPI = async (orderId) => {
	const response = await axiosInstance.post(`/pay/${orderId}`);
	return response.data;
};
