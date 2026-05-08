import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import BiensoxeApi from '../../Api/biensoxe'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LedApi from '../../Api/led'
export default function CreateLed() {
  const [formData, setformData] = useState({
    name: '',
    Pin: '',
    status: false
  })
  const navigate = useNavigate() // Khởi tạo useNavigate hook

  const createBienso = useMutation({
    mutationFn: LedApi.createLed,
    onSuccess: () => {
      toast.success('Thêm thành công')
      navigate('/admin') // Chuyển hướng về trang chính (home) sau khi thành công
    },
    onError: (error) => {
      if (error.response && error.response.status === 409) {
        if (error.response.data === 'LED with this Pin already exists') {
          toast.error('Thiết bị đã tồn tại')
        } else {
          toast.error('Lỗi: ' + error.response.data)
        }
      } else {
        toast.error('Đã xảy ra lỗi khi tạo')
        console.error(error)
      }
    }
  })
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(formData)
    // api
    createBienso.mutate(formData)
  }
  return (
    <div className='m-full min-h-screen bg-blue-300 flex items-center justify-center'>
      <div className='w-[500px] p-5 bg-gray-50 rounded-lg shadow-lg'>
        <div className='text-4xl text-blue-600 font-bold mb-10'>
          <h1>Thêm Thiết bị</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-10'>
            <label htmlFor='name' className='text-2xl mb-3 '>
              Name
            </label>
            <input
              type='text'
              className='border p-3 rounded-lg outline-none'
              id='name'
              name='name'
              required
              onChange={(e) => setformData({ ...formData, name: e.target.value })}
              value={formData.name}
            />
          </div>
          <div className='flex flex-col pb-4'>
            <label htmlFor='mabien' className='text-2xl mb-3'>
              Chân Pin
            </label>
            <input
              type='text'
              className='border p-3 rounded-lg outline-none'
              id='mapin'
              name='pin'
              required
              onChange={(e) => setformData({ ...formData, Pin: e.target.value })}
              value={formData.Pin}
            />
          </div>

          <div className='flex items-center justify-center mt-2'>
            <Button type='submit' className='p-3 w-full bg-blue-500 rounded-sm text-white text-2xl'>
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

//top, right, bottom, and left properties to 0
