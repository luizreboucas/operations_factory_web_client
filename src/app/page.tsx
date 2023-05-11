"use client"

import Form from '@/components/Form'
import Image from 'next/image'
import React,{ useState } from 'react'
import UserProps from './types/userProps'


export default function Home() {
  const [usuarioALogar, setUsuarioALogar] = useState<UserProps>({
    user: '',
    password: ''
  })
  return (
    <div className='w-screen h-full flex justify-center items-center bg-blue-200'>
      <div className='flex flex-col md:flex-row gap-5 bg-white drop-shadow-xl p-8 rounded-lg w-2/3'>

      
     
        <Image
          alt='imagem de pessoas relacionadas com finaças'
          width={300}
          height={0}
          src={'/imagem-inicial.jpg'}
          className='md:w-1/2'
        />
        <Form 
          setUsuarioALogar = {setUsuarioALogar}
          usuarioALogar = {usuarioALogar}
        />

    </div>
    </div>
    
  )
}
