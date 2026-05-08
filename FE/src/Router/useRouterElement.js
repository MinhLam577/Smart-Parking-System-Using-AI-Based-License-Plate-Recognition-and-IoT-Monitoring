import React from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import MainLayout from '../Layout/MainLayout/MainLayout'
import FunctionList from '../Page/User/FunctionList'
import RegisterLayout from '../Layout/Register_LoginLayout'
import Login from '../Page/Login'
import Register from '../Page/Register/Register'
import Admin from '../Page/Admin'
import AdminLayout from '../Layout/AdminLayout'
import Led from '../Page/User/FunctionList/Led'
import ParkingLot from '../Page/User/FunctionList/ParkingLot'
import CreateBienSo from '../Page/Create/CreateBienSo'
import CreateLed from '../Page/Create/CreateDenled'
import DHT11 from '../Page/User/FunctionList/DHT11/DHT11'
import RegisterLicense from '../Page/User/FunctionList/RegisterLicense'
// const isAuthenticated = true
function ProtectRoute() {
  // login : true , log out : false
  // route đã login thì outlet , chưa login thì navigate login
  // true : sẽ đăng nhập -> outlet chứa children đã đăng nhập >< login
  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}
// >< ProtectRoute
function RejectedRoute() {
  // trường hợp false
  const isAuthenticated = false

  // chưa login thì cho vào outLet , còn rồi thì trang sản phẩm
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouterElement() {
  const routerElements = useRoutes([
    {
      path: '',
      element: <ProtectRoute />,
      children: [
        {
          path: '/user',
          element: (
            <MainLayout>
              <FunctionList />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/login',
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: '/Register',
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectRoute />,
      children: [
        {
          path: '/user/led',
          element: <Led />
        },
        {
          path: '/user/parkinglot',
          element: <ParkingLot />
        },
        {
          path: '/dht11',
          element: <DHT11 />
        },
        {
          path: '/user/dht11',
          element: <DHT11 />
        },
        {
          path: '/admin/createBienso',
          element: <CreateBienSo />
        },
        {
          path: '/create',
          element: <CreateBienSo />
        },
        {
          path: '/admin/createLed',
          element: <CreateLed />
        },
        {
          path: '/user/register_licese',
          element: <RegisterLicense />
        },
        {
          path: '/admin',
          element: <Admin />
        }
      ]
    },
    {
      path: '/',
      // nhận diện thằng nào là chính  index : true
      index: true,
      element: (
        <MainLayout>
          <FunctionList />
        </MainLayout>
      )
    }
  ])
  return routerElements
}
