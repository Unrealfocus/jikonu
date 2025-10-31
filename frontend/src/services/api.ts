import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  register: (data: any) =>
    api.post('/auth/register', data),

  logout: () =>
    api.post('/logout'),
}

// Products API
export const productsAPI = {
  getAll: (params?: any) =>
    api.get('/products', { params }),

  getById: (id: string) =>
    api.get(`/products/${id}`),

  create: (data: FormData) =>
    api.post('/products', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  update: (id: string, data: any) =>
    api.put(`/products/${id}`, data),

  delete: (id: string) =>
    api.delete(`/products/${id}`),

  getMyProducts: (params?: any) =>
    api.get('/seller/products', { params }),
}

// Orders API
export const ordersAPI = {
  create: (data: any) =>
    api.post('/orders', data),

  getMyOrders: (params?: any) =>
    api.get('/orders', { params }),

  getById: (id: string) =>
    api.get(`/orders/${id}`),

  confirmDelivery: (id: string) =>
    api.post(`/orders/${id}/confirm-delivery`),

  requestInspection: (id: string) =>
    api.post(`/orders/${id}/request-inspection`),
}

// Inspection API
export const inspectionAPI = {
  getAssigned: (params?: any) =>
    api.get('/inspections/assigned', { params }),

  getById: (id: string) =>
    api.get(`/inspections/${id}`),

  submitReport: (id: string, data: any) =>
    api.post(`/inspections/${id}/submit-report`, data),

  uploadPhotos: (id: string, photos: FormData) =>
    api.post(`/inspections/${id}/upload-photos`, photos, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
}

// Shipping API
export const shippingAPI = {
  getQuote: (data: any) =>
    api.get('/shipping/quote', { params: data }),

  track: (trackingNumber: string) =>
    api.get(`/shipping/track/${trackingNumber}`),
}

// Rating API
export const ratingAPI = {
  create: (orderId: string, data: any) =>
    api.post(`/orders/${orderId}/review`, data),

  getMyReviews: (params?: any) =>
    api.get('/reviews/my-reviews', { params }),
}

// Admin API
export const adminAPI = {
  getUsers: (params?: any) =>
    api.get('/admin/users', { params }),

  verifyUser: (id: string) =>
    api.patch(`/admin/users/${id}/verify`),

  verifyProduct: (id: string) =>
    api.patch(`/admin/products/${id}/verify`),

  getAllOrders: (params?: any) =>
    api.get('/admin/orders', { params }),

  getDashboard: () =>
    api.get('/admin/analytics/dashboard'),

  getKPIs: () =>
    api.get('/admin/analytics/kpis'),
}
