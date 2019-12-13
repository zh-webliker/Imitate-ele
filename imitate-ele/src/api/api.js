import axios from 'axios'

export const goods = () => {
  return axios.get(`/api2/goods`, {})
}
export const ratings = () => {
  return axios.get(`/api2/ratings`, {})
}
export const seller = () => {
  return axios.get(`/api2/seller`, {})
}
