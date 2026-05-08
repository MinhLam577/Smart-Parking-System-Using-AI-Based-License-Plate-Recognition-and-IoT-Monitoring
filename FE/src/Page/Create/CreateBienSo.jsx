import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import BiensoxeApi from '../../Api/biensoxe'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function CreateBienSo() {
  const [formData, setformData] = useState({
    nguoidangki: '',
    mabien: '',
    mathe: ''
  })
  const navigate = useNavigate() // Khởi tạo useNavigate hook

  const createBienso = useMutation({
    mutationFn: BiensoxeApi.createBienso,
    onSuccess: () => {
      toast.success('Thêm thành công biển số')
      navigate('/admin') // Chuyển hướng về trang chính (home) sau khi thành công
    },
    onError: (error) => {
      if (error.response && error.response.status === 409) {
        if (error.response.data === 'Biển số đã tồn tại') {
          toast.error('Biển số đã tồn tại')
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
          <h1>Thêm Biển Số</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col mb-10'>
            <label htmlFor='name' className='text-2xl mb-3 '>
              Người Đăng Kí
            </label>
            <input
              type='text'
              className='border p-3 rounded-lg outline-none'
              id='name'
              name='nguoidangki'
              required
              onChange={(e) => setformData({ ...formData, nguoidangki: e.target.value })}
              value={formData.name}
            />
          </div>
          <div className='flex flex-col pb-4'>
            <label htmlFor='mabien' className='text-2xl mb-3'>
              Mã biển
            </label>
            <input
              type='text'
              className='border p-3 rounded-lg outline-none'
              id='mabien'
              name='mabien'
              required
              onChange={(e) => setformData({ ...formData, mabien: e.target.value })}
              value={formData.mabien}
            />
          </div>

          <div className='flex flex-col pb-4'>
            <label htmlFor='mabien' className='text-2xl mb-3'>
              Mã Thẻ
            </label>
            <input
              type='text'
              className='border p-3 rounded-lg outline-none'
              id='mathe'
              name='mathe'
              required
              onChange={(e) => setformData({ ...formData, mathe: e.target.value })}
              value={formData.the}
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
