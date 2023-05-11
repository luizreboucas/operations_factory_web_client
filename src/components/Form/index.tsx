'use client'

import React from 'react'
import type { SetStateAction} from 'react'
import UserProps from '@/app/types/userProps'
import axios from 'axios'


interface FormProps{
    setUsuarioALogar:  React.Dispatch<React.SetStateAction<UserProps>>,
    usuarioALogar: UserProps
}

const Form = ({setUsuarioALogar, usuarioALogar}: FormProps) => {
    const autentica = (e:React.MouseEvent)=>{
        e.preventDefault()
    
        axios.post('http://localhost:3500/login', usuarioALogar)
            .then((response)=>{
                if(response.data == "usuário logado"){
                    if (typeof window !== undefined) {
                        window.location.href = '/showpage'
                      }
                    
                }
            }).catch(err=>console.log(err.response.data))
        

    }

  return (
    <form className='md:w-1/2 flex flex-col md:items-start justify-center gap-4 md:gap-8'>
        <div>
          <h3 className='text-4xl font-bold text-slate-600'>Bem Vindo</h3>
          <p className='text-lg text-slate-500'>Faça o Login para Continuar</p>
        </div>
        
        <input 
            type="text" 
            placeholder='Usuário' 
            className='h-8 text-lg'
            onChange={(e)=> setUsuarioALogar({...usuarioALogar,user: e.target.value})}/>
        <input 
            type="text" 
            placeholder='Senha' 
            className='h-8 text-lg'
            onChange={e => setUsuarioALogar({...usuarioALogar, password: e.target.value})}/>
        <button 
            className='text-slate-50 text-xl font-bold bg-blue-600 p-3 rounded-lg w-80'
            onClick={(e)=>{autentica(e)}}>Login</button>
    </form>
  )
}

export default Form
