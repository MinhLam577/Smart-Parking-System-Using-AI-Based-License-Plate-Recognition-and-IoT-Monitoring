import http from '../until/http'
const url = 'user/signup'
const regiter = 'user/adduser'
const UserApi = {
  login: (body) => {
    return http.post(url, body)
  },
  signup: (body) => {
    return http.post(regiter, body)
  }
}
export default UserApi
