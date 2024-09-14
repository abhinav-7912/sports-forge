import React from 'react'
import { Flex, Spin } from 'antd';
export default function Loader() {
  return (
    <div className='loader'>
        <p>
            Getting Content..<br/>Please Wait..
        </p>
        <Flex align="center" gap="middle">
            <Spin size="large" />
        </Flex>
    </div>
  )
}
