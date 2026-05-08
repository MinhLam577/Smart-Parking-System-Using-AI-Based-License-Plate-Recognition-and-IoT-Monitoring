/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue
} from '@nextui-org/react'
import { Link } from 'react-router-dom'
import BiensoxeApi from '../../Api/biensoxe'
import { useMutation } from '@tanstack/react-query'
import { Button } from 'antd'

export default function TableBien({ databienso }) {
  console.log('re - render bien ')
  const queryClient = useQueryClient()
  const [page, setPage] = React.useState(1)
  const rowsPerPage = 2

  console.log(databienso.data.length)
  const pages = Math.ceil(databienso.data.length / rowsPerPage)
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = Math.min(start + rowsPerPage, databienso.data.length)
    return databienso.data.slice(start, end)
  }, [page, databienso, rowsPerPage])

  const deleteBienSoMutate = useMutation({
    mutationFn: BiensoxeApi.deleteBienso,
    onSuccess: () => {
      toast.success('Thành công xóa ')
      queryClient.invalidateQueries({ queryKey: ['getBienso'] })
    }
  })
  const handleDelete = (id) => {
    console.log('xoa ' + id)
    deleteBienSoMutate.mutate(id)
  }

  const handleEdit = (value) => {
    console.log('edit ' + value)
    setformData(value)
    setModalVisible(true)
  }
  const [modalVisible, setModalVisible] = useState(false)

  const [formData, setformData] = useState({
    id: '',
    nguoidangki: '',
    mabien: '',
    mathe: ''
  })
  const updateMutateBienSo = useMutation({
    mutationFn: ({ id, body }) => BiensoxeApi.updatedBienso(id, body),
    onSuccess: () => {
      toast.success('Cập nhật biển số thành công')
      queryClient.invalidateQueries({ queryKey: ['getBienso'] })
      setModalVisible(false)
    }
    // Quay lại trang trước đó sau khi cập nhật thành công
  })
  const handleSubmitUpdate = (event) => {
    event.preventDefault()
    console.log(formData)
    updateMutateBienSo.mutate({
      id: formData.id,
      body: {
        nguoidangki: formData.nguoidangki,
        mabien: formData.mabien,
        mathe: formData.mathe
      }
    })
  }
  console.log(databienso)
  return (
    <div className=''>
      <Link to='/admin/createBienso' className='inline-block'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-10 h-10 text-green'
          style={{ padding: '5px', backgroundColor: 'lightgreen', borderRadius: '50%' }}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </Link>

      <Table
        aria-label='Example table with client side pagination'
        bottomContent={
          <div className='flex w-full justify-center  '>
            <Pagination
              isCompact
              showControls
              showShadow
              color='secondary'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: 'min-h-[222px]'
        }}
      >
        <TableHeader>
          <TableColumn key='nguoidangki' className='text-center'>
            Người Đăng Kí
          </TableColumn>
          <TableColumn key='mabien' className='text-center'>
            Mã Biển
          </TableColumn>
          <TableColumn key='mathe' className='text-center'>
            Mã Thẻ
          </TableColumn>
          <TableColumn key='active' className='text-center'>
            ACTION
          </TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            // key là duy nhất
            <TableRow key={item.id} className='text-center   '>
              {(columnKey) => (
                <TableCell>
                  {columnKey === 'active' ? (
                    <>
                      <button onClick={() => handleDelete(item.id)} className='p-2 bg-yellow-400 rounded-full'>
                        <svg
                          className='w-8 h-8  text-gray-800 dark:text-white '
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z'
                          />
                        </svg>
                      </button>

                      <button onClick={() => handleEdit(item)} className='p-2 bg-yellow-400 rounded-full ml-2'>
                        <svg
                          className='w-8 h-8  text-orange'
                          aria-hidden='true'
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <path
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z'
                          />
                        </svg>
                      </button>
                    </>
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <>
        {modalVisible && (
          <>
            <div className='fixed inset-0 flex items-center justify-center bg-blue-200 bg-opacity-60'>
              <div className='w-[500px] p-5 bg-gray-50 rounded-lg shadow-lg'>
                <div className='text-3xl text-blue-600 font-bold mb-10 mt-3'>
                  <h1>Cập nhật biển số</h1>
                </div>
                <form onSubmit={handleSubmitUpdate}>
                  <div className='flex flex-col mb-8'>
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
                      value={formData.nguoidangki}
                    />
                  </div>
                  <div className='flex flex-col pb-4 mb-2'>
                    <label htmlFor='mabien' className='text-2xl mb-3'>
                      Mã biển
                    </label>
                    <input
                      type='text'
                      className='border p-3 rounded-lg outline-none'
                      id='mabien'
                      name='babien'
                      required
                      onChange={(e) => setformData({ ...formData, mabien: e.target.value })}
                      value={formData.mabien}
                    />
                  </div>

                  <div className='flex flex-col pb-4'>
                    <label htmlFor='mabien' className='text-2xl mb-3'>
                      Mã thẻ
                    </label>
                    <input
                      type='text'
                      className='border p-3 rounded-lg outline-none'
                      id='mathe'
                      name='mathe'
                      required
                      onChange={(e) => setformData({ ...formData, mathe: e.target.value })}
                      value={formData.mathe}
                    />
                  </div>

                  <div className='flex items-center justify-center mt-2 gap-5'>
                    <button
                      onClick={() => setModalVisible(false)}
                      className='bg-gray-300 text-gray-700  bg-blue-500 rounded-sm text-2xl py-2 px-4  min-w-[113px] rounded-lg text-white'
                    >
                      Close
                    </button>

                    <button type='submit' className='p-2 bg-blue-500 rounded-sm text-white text-2xl rounded-lg'>
                      Cập nhật
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  )
}
