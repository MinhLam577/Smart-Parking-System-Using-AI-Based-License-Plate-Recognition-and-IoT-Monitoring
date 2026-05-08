import React from 'react'
import Tab1 from '../../Component/Tabs/Tabs'
import AvatarMain from '../../Component/Avatar/AvatarMain'

export default function Admin() {
  return (
    <div className='flex flex-col'>
      <div className='mb-4 bg-green-400 p-5'>
        <AvatarMain />
      </div>
      <Tab1 />
    </div>
  )
}
