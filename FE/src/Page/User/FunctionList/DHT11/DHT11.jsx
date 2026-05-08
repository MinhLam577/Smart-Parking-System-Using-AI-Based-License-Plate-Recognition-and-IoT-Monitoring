import React, { useState, useEffect } from 'react'
import anh from '../../../../Assets/image/hot.png'
import drop from '../../../../Assets/image/drop.png'
import { toast } from 'react-toastify'
import Gauge from './Gauge'

export default function DHT11() {
  // var espServer = 'http://10.10.49.247'
  const espServer = 'http://192.168.255.43'
  const [temp, setTemp] = useState('')
  const [humid, setHumid] = useState('')
  const [khigas, setkhigas] = useState(0)
  const [value, setValue] = useState(0)
  const [alert, setAlert] = useState(true)

  const handleVolumeChange = (event) => {
    console.log(event.target.value)
    handleWarningKhigas(event.target.value)
    setValue(event.target.value)
  }
  function getTemperature() {
    fetch(espServer + '/dht/temp')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        setTemp(data)
      })
      .catch((error) => console.error('Error:', error))
  }

  function getHumidity() {
    fetch(espServer + '/dht/hum')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        setHumid(data)
      })
      .catch((error) => console.error('Error:', error))
  }

  function getKhigas() {
    fetch(espServer + '/khiga')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.text()
      })
      .then((data) => {
        setkhigas(data)
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((result) => {
        console.log('Server response:', result)
        alert(result)
        if (result) {
          alert('Gas level is too high! Fire alert!')
        }
      })
      .catch((error) => console.error('Error:', error))
  }
  // gửi data ngưỡng khí gấ xuống
  function handleWarningKhigas(data) {
    fetch(`${espServer}/warning?threshold=${data}`, {
      method: 'GET'
    })
      .then((response) => {
        if (response.ok) {
          return response.json() // Giả sử server trả về JSON
        } else {
          throw new Error('Network response was not ok')
        }
      })
      .then((data) => {
        console.log(data) // Xử lý dữ liệu nhận được từ server
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
  useEffect(() => {
    const notifyChay = () => {
      console.log(value)
      console.log(khigas)
      if (alert) {
        if (value < khigas && value !== 0) {
          toast.warning('Cháy To')
        }
      }
    }
    // Kiểm tra ngay khi component mount
    // Sau đó thiết lập khoảng thời gian định kỳ
    notifyChay()
    const notifyInterval = setInterval(notifyChay, 3000)

    return () => clearInterval(notifyInterval)
  }, [value, alert])

  useEffect(() => {
    function updateData() {
      getTemperature()
      getHumidity()
      getKhigas()
    }
    updateData()
    const intervalId = setInterval(updateData, 2000)
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array means this effect runs once when the component mounts

  const toggleAlert = () => {
    handleAleart(!alert)
    setAlert(!alert)
  }
  // notifyChay()
  function handleAleart(alert) {
    fetch(`${espServer}/canhbao?alert=${alert}`)
      .then((response) => {
        if (!response.oki) {
          throw new Error('Lỗi')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='mw-full h-[1000px] bg-gray-200 flex flex-col'>
      <div className='p-5 bg-white w-full rounded-xl'>
        <h1 className='font-bold text-2xl'>Nhiệt độ - độ ẩm bãi đổ xe</h1>
        <p className='mt-5 text-xl'>
          <img src={drop} className='w-[30px] h-[30px] inline-block mr-5 mb-3' />
          Độ Ẩm : {humid} %
        </p>
        <p className='mt-5 text-xl'>
          <img src={anh} className='w-[30px] h-[30px] inline-block mr-5 mb-3' />
          Nhiệt Độ : {temp} ℃
        </p>
      </div>

      <div className='p-5 bg-white mt-2 w-full rounded-xl'>
        <div className='mt-5 border-bottom-5'>
          <h1 className='font-bold text-2xl'>Khí Gas</h1>
          <div className='flex items-center'>
            <svg
              className='w-8 h-8 text-red-400 dark:text-red-500 mt-3 mr-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z'
              />
            </svg>
            <p className='mt-5 text-xl'>Nồng độ khí gas : {khigas}</p>
          </div>
          <input
            type='range'
            id='volumeSlider'
            min='0'
            max='600'
            value={khigas}
            readOnly
            className='w-full md:w-[1000px] lg:w-[1000px] xl:w-full sm:w-[200px] mt-2'
          />
        </div>
        <div className='mt-5 text-xl'>
          <div className='flex items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6 mr-2 text-yellow-700'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z'
              />
            </svg>
            Ngưỡng cảnh báo khí gas : {value}
          </div>
          <input
            type='range'
            id='volume'
            min='0'
            max='600'
            value={value}
            onChange={handleVolumeChange}
            className='w-full md:w-[1000px] lg:w-[1000px] xl:w-full sm:w-[200px] mt-2'
          />
        </div>
        <div className='flex items-center mt-10 text-base md:text-lg lg:text-xl'>
          <h1 className='text-2xl'>Chế độ cảnh báo</h1>
          <button
            onClick={toggleAlert}
            className={`py-4 px-4 border border-indigo-600 rounded-md ml-5 text-xl ${
              !alert ? 'bg-green-400' : 'bg-red-400'
            }`}
          >
            {alert ? 'Tắt Cảnh báo' : 'Bật cảnh báo'}
          </button>
        </div>
      </div>
    </div>
  )
}
