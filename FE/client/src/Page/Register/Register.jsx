import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import UserApi from '../../Api/user'
import { toast } from 'react-toastify'
const schema = yup.object({
  gmail: yup
    .string()
    .email('Lỗi email không đúng định dạng')
    .min(5, 'Lỗi độ dài 5 - 160 kí tự')
    .max(160, 'Lỗi độ dài 5 - 160 kí tự'),
  password: yup.string().min(5, 'Lỗi độ dài 5 - 160 kí tự').max(160, 'Lỗi độ dài 5 - 160 kí tự'),
  password_again: yup
    .string()
    .min(5, 'Lỗi độ dài 5 - 160 kí tự')
    .max(160, 'Lỗi độ dài 5 - 160 kí tự')
    .oneOf([yup.ref('password')], 'Nhập lại mật khẩu không khớp')
})

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const Signupmutation = useMutation({
    mutationFn: (body) => UserApi.signup(body)
  })
  const onSubmit = handleSubmit((data) => {
    console.log(data)
    Signupmutation.mutate(data, {
      onSuccess: (data) => {
        toast.success('Sign up Thành công ', {
          autoClose: 1000
        })
        // user
        navigate('/Login')
      },
      onError: (error) => {
        // setErrors(error.response.data.message)
        toast.error(error.response.data.message, {
          autoClose: 1000
        })
      }
    })
  })
  console.log(errors)
  return (
    <div className='bg-[#71bf44]'>
      <div className='max-w-7xl mx-auto px-4 '>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-25 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='p-10 bg-white rounded shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Kí</div>
              <div className='mt-8'>
                <input
                  placeholder='Họ tên'
                  type='text'
                  name='name'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                  {...register('name')}
                ></input>
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{}</div>
              </div>

              <div className='mt-3'>
                <input
                  placeholder='Email/Số điện thoại/ Tên đăng nhập'
                  type='text'
                  name='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                  {...register('gmail')}
                ></input>
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.gmail?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  placeholder='Mật khẩu'
                  type='password'
                  name='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                  {...register('password')}
                ></input>
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.password?.message}</div>
              </div>
              <div className='mt-3'>
                <input
                  placeholder='Nhập lại mật khẩu'
                  type='password'
                  name='password_again'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm shadow-sm'
                  {...register('password_again')}
                ></input>
                <div className='mt-1 text-red-600 text-sm min-h-[1.5rem]'>{errors.password_again?.message}</div>
              </div>
              <div className='mt-3'>
                <button
                  type='submit'
                  className='text-center bg-orange w-full p-3 capitalize text-white cursor-not-allowed font-semibold'
                >
                  Đăng kí
                </button>
              </div>

              <div className='flex items-center gap-2 mt-3'>
                <div className='h-[1px] grow bg-gray-200'></div>
                <span className='text-gray-500'>hoặc</span>
                <div className='h-[1px] grow bg-gray-200'></div>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className=' text-slate-400'>Bạn đã có tài khoản SmartParking? </span>
                  <Link to='/login' className='text-red-600 ml-1'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
