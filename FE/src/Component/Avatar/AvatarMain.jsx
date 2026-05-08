import React from 'react'
import { Avatar } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Button, Popover } from 'antd'

export default function AvatarMain() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/Login')
  }
  const content = (
    <div className=''>
      <div className=' mb-3 rounded-sm w-full hover:text-orange'>Tài khoản của tôi</div>
      <div className=' rounded-sm '>
        <button className='hover:text-orange w-full text-left' onClick={handleLogout}>
          {' '}
          Đăng Xuất{' '}
        </button>
      </div>
    </div>
  )
  const isLogin = localStorage.getItem('token') !== null
  return (
    // Handling when logged in
    <>
      {isLogin && ( // Conditional rendering
        <div className='flex gap-4 items-center'>
          <Popover content={content}>
            <Avatar isBordered color='default' src='https://i.pravatar.cc/150?u=a042581f4e29026024d' />
          </Popover>

          <div className='font-bold text-xl'>
            <span className='text-sm'>Xin Chào,</span> {localStorage.getItem('gmail')}
          </div>
        </div>
      )}
      {!isLogin && (
        <div className='flex items-center  '>
          <Link to='/register ' className='text-2xl hover:text-orange'>
            Đăng Kí
          </Link>
          <div className='h-4 w-[1px] bg-black mx-2 '></div>
          <Link to='/login' className='text-2xl hover:text-orange'>
            Đăng Nhập
          </Link>
        </div>
      )}
    </>
  )
}
