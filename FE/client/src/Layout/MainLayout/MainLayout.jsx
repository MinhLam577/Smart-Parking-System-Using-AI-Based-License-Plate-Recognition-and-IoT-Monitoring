import React from 'react'
import HeaderMain from '../../Component/Header'
import Footer from '../../Component/Footer/Footer'

export default function MainLayout({ children }) {
  return (
    <div className='w-full min-h-screen bg-[#E6EFFA]'>
      <HeaderMain />
      {children}
    </div>
  )
}
