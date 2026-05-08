import React from 'react'
import { Button, Popover } from 'antd'

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)
const Popover1 = () => (
  <Popover content={content} title='Title'>
  
  </Popover>
)
export default Popover1
