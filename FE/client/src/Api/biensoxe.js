import http from '../until/http'
const url = 'biensoxe/'
const BiensoxeApi = {
  getBienso: () => {
    return http.get(url)
  },
  createBienso: (body) => {
    return http.post(`${url}create`, body)
  },
  updatedBienso: (id, body) => {
    return http.put(`${url}update/${id}`, body)
  },
  deleteBienso: (id) => {
    return http.delete(`${url}delete/${id}`)
  }
}

export default BiensoxeApi
