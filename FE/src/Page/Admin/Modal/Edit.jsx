import { useState } from "react"

export default function Edit() {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <button onClick={() => setModalVisible(true)} className='bg-blue-500 text-white py-2 px-4 rounded'>
        Open Modal
      </button>

      {modalVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-blue-200 bg-opacity-60'>
          <div className='bg-white p-8 rounded w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4'>Hello, I'</h2>
            <button onClick={() => setModalVisible(false)} className='bg-gray-300 text-gray-700 py-2 px-4 rounded'>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </>
  )
}
