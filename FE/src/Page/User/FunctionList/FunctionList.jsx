import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function FunctionList() {
  var islogin = localStorage.getItem('token') !== null

  const handleLock = () => {
    toast.error('Chưa đăng nhập không thể truy cập', {
      autoClose: 1000
    })
  }
  return (
    <div className='w-full min-h-screen bg-[#E6EFFA]'>
      <div className='py-5 bg-[#17C964] px-2'>
        <div className=''>
          {islogin && (
            <>
              <div className='w-full'>
                <div className='flex justify-between '>
                  <div className='text-xl text-white'>Chức năng chính</div>
                  <div className=' text-sky-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-6 h-6 text-sky-700'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                      />
                    </svg>
                    Tùy chỉnh
                  </div>
                </div>

                <div className=''>
                  <div className='grid grid-cols-1 gap-y-4'>
                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <Link to='/user/parkinglot' className='flex justify-between '>
                        <div className='flex items-center text-xl '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6 text-cyan-400 mr-2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                            />
                          </svg>
                          Parking lot
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                          </svg>
                        </Link>
                      </Link>
                    </div>

                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <Link to='/user/dht11' className='flex justify-between '>
                        <div className='flex items-center text-xl '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6 text-cyan-400 mr-3'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
                            />
                          </svg>
                          Nhiệt Độ - Độ ẩm
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                          </svg>
                        </Link>
                      </Link>
                    </div>

                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <Link to='/user/register_licese' className='flex justify-between '>
                        <div className='flex items-center text-xl '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6 text-cyan-400 mr-2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                            />
                          </svg>
                          Đăng Kí Biển Số
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                          </svg>
                        </Link>
                      </Link>
                    </div>

                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <Link to='/user/led' className='flex justify-between '>
                        <div className='flex items-center text-xl '>
                          <svg
                            className='w-6 h-6 text-cyan-400 mr-3'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z'
                            />
                          </svg>
                          Đèn Led
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-6 h-6'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                          </svg>
                        </Link>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {!islogin && (
            <>
              <div className='w-full'>
                <div className='flex justify-between '>
                  <div className='text-2xl text-white'>Chức năng chính</div>
                  <div className=' text-sky-700'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='w-8 h-8 text-sky-700'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                      />
                    </svg>
                    Tùy chỉnh
                  </div>
                </div>

                <div className=''>
                  <div className='grid grid-cols-1 gap-y-4'>
                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <Link to='/parkinglot' className='flex justify-between '>
                        <div className='flex items-center text-xl '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-8 h-8 text-cyan-400 mr-2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                            />
                          </svg>
                          Parking lot
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-8 h-8'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                          </svg>
                        </Link>
                      </Link>
                    </div>

                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <Link to='/dht11' className='flex justify-between '>
                        <div className='flex items-center text-xl '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-8 h-8 text-cyan-400 mr-3'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z'
                            />
                          </svg>
                          Nhiệt Độ - Độ ẩm
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-8 h-8'
                          >
                            <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                          </svg>
                        </Link>
                      </Link>
                    </div>

                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <div className='flex justify-between ' onClick={handleLock}>
                        <div className='flex items-center text-xl '>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-8 h-8 text-cyan-400 mr-2'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z'
                            />
                          </svg>
                          Đăng Kí Biển Số
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='red'
                            class='size-8'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>

                    <div className='bg-white shadow-lg p-2 rounded-2xl mt-5'>
                      <div className='flex justify-between ' onClick={handleLock}>
                        <div className='flex items-center text-xl '>
                          <svg
                            className='w-8 h-8 text-cyan-400 mr-3'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z'
                            />
                          </svg>
                          Đèn Led
                        </div>
                        <Link to='' className=''>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke-width='1.5'
                            stroke='red'
                            class='size-8'
                          >
                            <path
                              stroke-linecap='round'
                              stroke-linejoin='round'
                              d='M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z'
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
