import React from 'react'
import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import App from '../Table/TableBien'
import TableBienSo from '../Table/TableBien'
import BiensoxeApi from '../../Api/biensoxe'
import { useQuery } from '@tanstack/react-query'
import LedApi from '../../Api/led'
import Tableled from '../Table/Tableled'

export default function Tab1() {
  const {
    data: denledData,
    isLoading: denledIsLoading,
    error: denledError
  } = useQuery({
    queryKey: ['getDenled'],
    queryFn: LedApi.getLed // Sử dụng hàm truy vấn mới từ DenledApi
  })
  const { data, isLoading, error } = useQuery({
    queryKey: ['getBienso'],
    queryFn: BiensoxeApi.getBienso
  })
console.log(denledData)
  // Kiểm tra xem có lỗi hoặc đang tải không
  if (isLoading || denledIsLoading) return ''
  if (error || denledError) return ''
  return (
    <div className='flex w-full flex-col'>
      <Tabs aria-label='Options'>
        <Tab key='photos' title='Biển số xe '>
          <TableBienSo databienso={data} />
        </Tab>
        <Tab key='music' title='Bãi đổ '>
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key='videos' title='Quản lí thiết bị'>
          <Tableled dataled={denledData} />
        </Tab>
      </Tabs>
    </div>
  )
}
