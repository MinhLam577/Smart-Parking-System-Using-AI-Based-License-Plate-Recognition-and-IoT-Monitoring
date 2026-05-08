import React, { useState } from 'react'
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'

export default function Button1({ color, text, className }) {
  const { isOpen, onOpen, onClose } = useDisclosure() // Sử dụng hook useDisclosure từ NextUI

  const handleBookSlot = () => {
    console.log('đã oki')
    console.log(bookData)
    // Thực hiện các hành động khác ở đây nếu cần
    onClose() // Đóng modal sau khi xử lý hành động
  }
  const [bookData, setBookData] = useState({
    id: ''
  })
  return (
    <>
      <Button className={className} color={color} onPress={onOpen}>
        {text}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          <ModalHeader>Modal Slot 1</ModalHeader>
          <ModalBody>
            {/* Nội dung của modal */}
            <p>This is the content of the modal.</p>

            <form action=''>
              <div className='flex flex-col m-4'>
                <input
                  type='text'
                  name=''
                  id='Email'
                  placeholder='Email'
                  className='p-3 border-2 '
                  onChange={(event) => {
                    setBookData({ ...bookData, email: event.target.value })
                  }}
                />
              </div>
              <div className='flex flex-col m-4'>
                <input
                  type='text'
                  name=''
                  id='value '
                  placeholder='Sdt '
                  className='p-3 border-2 '
                  onChange={(event) => {
                    setBookData({ ...bookData, sdt: event.target.value })
                  }}
                />
              </div>

              <div className='flex flex-col m-4 '>
                <input
                  type='text'
                  name=''
                  id='Email'
                  placeholder='Email'
                  className='p-3 border-2 '
                  onChange={(event) => {
                    setBookData({ ...bookData, datxe: event.target.value })
                  }}
                />
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Close
            </Button>
            <Button color='primary' onPress={handleBookSlot}>
              Action
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
