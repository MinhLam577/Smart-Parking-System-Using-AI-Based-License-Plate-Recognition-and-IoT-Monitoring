import React from 'react'
import anhoto from '../../../../Assets/image/xeoto.jpg'
import Button1 from '../../../../Component/Button/Button'
export default function Parking() {
  return (
    <div className='w-full min-h-screen bg-[#E6EFFA] flex justify-center items-center overflow-auto'>
      <div className='container'>
        <div className='grid lg:grid-cols-3 gap-10 mb-15 sm:grid-cols-2 pb-[200px]'>
          {Array(6)
            .fill(0)
            .map((elemen) => {
              return (
                <div className='bg-gray-100 p-2 text-center shadow-xl'>
                  <div className=''>
                    <img src={anhoto} alt='datcho' className='' />
                  </div>
                  <div className='my-2'>
                    <h1 className='text-xl text-black font-bold '>Slot 1 </h1>
                    <p className='text-xl text-black '>
                      Trạng Thái : <span className='text-orange'> Empty</span>
                    </p>
                  </div>
                  <Button1 color='primary' text='Đặt Chỗ' className='mt-5' />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

// flex justify-center items-center'
