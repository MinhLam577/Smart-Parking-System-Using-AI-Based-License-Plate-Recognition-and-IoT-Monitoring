import React from 'react'
import Header from '../../Component/RegisterHeader'
import Footer from '../../Component/Footer/Footer'
export default function RegisterLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}
