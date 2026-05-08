import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import LedApi from '../../../../Api/led'
import { toast } from 'react-toastify'
import { BsLightbulbOffFill } from 'react-icons/bs'
// const espServer = 'http://192.168.1.36'
// const espServer = 'http://10.10.49.247'
const espServer = 'http://192.168.255.43'
// const espServer = 'http://192.168.255.165'
export default function Led() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['getLed'],
    queryFn: LedApi.getLed
  })
  const updateLedMutate = useMutation({
    mutationFn: ({ id, body }) => LedApi.updatedLed(id, body)
  })
  const handleTurnLight = (index, status, element) => {
    console.log(element)
    console.log('Bật đèn ' + element.Pin + ' ' + status)
    fetch(`${espServer}/led${element.Pin}=on`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        toast.success(`Bật ${element.name} thành công`, {
          autoClose: 1000
        })
      })
      .catch((error) => console.error('Error:', error))
    // updateLedMutate.mutate(
    //   { id: element.id, body: { name: element.name, Pin: element.Pin, status: 1 } },
    //   {

    //   }
    // )
  }
  const handleoffLight = (index, status, element) => {
    status = false
    console.log('Tắt đèn ' + element.Pin + status)
    // updateLedMutate.mutate(
    //   { id: element.id, body: { name: element.name, Pin: element.Pin, status: 0 } },
    //   {
    //     onSuccess: (data) => {
    //       toast.error(`Tắt ${element.name} thành công`)
    //     }
    //   }
    // )

    fetch(espServer + `/led${element.Pin}=off`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        toast.error(`Tắt ${element.name} thành công`, {
          autoClose: 1000
        })
      })
      .catch((error) => console.error('Error:', error))
  }
  // console.log(data.data)
  if (isLoading) {
    return ''
  }
  console.log(data)
  return (
    <div className='w-full min-h-screen bg-[#E6EFFA] '>
      <div className='  p-10 '>
        <div className='w-full mx-auto text-center p-4'>
          <p className='font-bold text-blue-500 text-2xl mb-5'>Led Smart</p>
        </div>
        <div className='grid grid-cols-1 gap-y-5'>
          {data.data &&
            data.data?.map((element) => {
              return (
                <div className='flex items-center justify-between p-3 bg-white rounded-2xl mb-4'>
                  <div className='flex items-center text-xl'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke-width='1.5'
                      stroke='currentColor'
                      class='w-8 h-8 mr-3'
                    >
                      <path
                        stroke-linecap='round'
                        strokeLinejoin='round'
                        d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
                      />
                    </svg>
                    {element.name}
                  </div>
                  <div className='flex items-center '>
                    <button
                      className='p-3 bg-red-500 rounded-2xl mr-5'
                      onClick={() => handleTurnLight(element.id, element.status, element)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='w-6 h-6 text-white'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
                        />
                      </svg>
                    </button>
                    <button
                      className='bg-gray-200 rounded-2xl p-3 relative shadow-sm'
                      onClick={() => handleoffLight(element.id, element.status, element)}
                    >
                      <BsLightbulbOffFill size={24} className='text-red-500' />
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
// <svg
//   xmlns='http://www.w3.org/2000/svg'
//   fill='none'
//   viewBox='0 0 24 24'
//   strokeWidth='1.5'
//   stroke='currentColor'
//   className='w-6 h-6 '
// >
//   <path
//     strokeLinecap='round'
//     strokeLinejoin='round'
//     d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
//   />
// </svg>

// <svg
//   xmlns='http://www.w3.org/2000/svg'
//   fill='none'
//   viewBox='0 0 24 24'
//   strokeWidth='1.5'
//   stroke='currentColor'
//   className='w-6 h-6 '
// >
//   <path
//     strokeLinecap='round'
//     strokeLinejoin='round'
//     d='M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18'
//   />
// </svg>
