import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
export default function Header() {
  let { pathname } = useLocation()
  const [bien, setBien] = useState('')
  useEffect(() => {
    console.log(pathname)
    if (pathname === '/Login' || pathname === '/login' || '') {
      setBien('Đăng Nhập')
    } else if (pathname === '/Register') {
      setBien('Đăng Kí')
    }
  }, [pathname])

  console.log(bien)

  return (
    <div className='bg-white'>
      <div className='flex  items-end p-5'>
        <nav className='overflow-hidden '>
          <Link to='/'>
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMnBicEmJPXi05PnJEhc3La_M2Ldo3H1BJkw&usqp=CAU'
              alt=''
              className='w-40 h-30 object-cover'
            />
          </Link>
        </nav>
        <div className='text-2xl mb-1 ml-3'>{bien}</div>
      </div>
    </div>
  )
}
