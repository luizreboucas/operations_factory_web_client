'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface CategoriasProps {
  nome: string,
  __v: number,
  _id: string,
  subcategorias: string[]
}
interface NovaOperacaoProps{
  categoria: string,
  subcategoria: string,
  descricao: string,
  valor: number
}


const Show = () => {
  
  const [categorias,setCategorias] = useState<CategoriasProps[] | undefined>([])
  const [subcategorias, setSubcategorias] = useState<string[] | undefined>()
  const [novaOperacao, setNovaOperacao] = useState<NovaOperacaoProps>({
    categoria: '',
    subcategoria: '',
    descricao: '',
    valor: 0
  })
  
  
  const [mounted,setMounted] = useState<boolean>(false)
  useEffect(()=>{

    const getCategorias = async()=>{
      try {
        const cat : CategoriasProps[] = (await axios.get('http://localhost:3500/categorias')).data
        setCategorias(cat)
        
      } catch (error) {
        console.log(error)
      }
      console.log(categorias)
    }
    getCategorias()
    setMounted(true)
    
  },[])
  
  const [categoria,setCategoria] = useState<CategoriasProps>()
  const escolheuCategoria = (e : React.ChangeEvent<HTMLSelectElement>)=>{
    const nomeCategoriaEscolhida : string = e.target.value
    const categoriaEscolhida : (CategoriasProps | undefined) = categorias?.find(item => item.nome == nomeCategoriaEscolhida)
    setSubcategorias(categoriaEscolhida?.subcategorias)
    setNovaOperacao({...novaOperacao, categoria: nomeCategoriaEscolhida})
  }

  const enviarCadastro = async(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    event.preventDefault()
    try {
      setNovaOperacao({...novaOperacao, categoria: "645d2a6037efd604d363318f"})
      console.log(novaOperacao)
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div className='h-full  flex flex-col items-center justify-center bg-blue-200'>
      <form action="" className=' text-2xl flex-wrap bg-slate-50 p-8 rounded-xl'>
        
        {mounted
        ? (<div className='flex flex-col gap-8'>
          <h2 className='font-bold text-slate-600'>Escolha a Categoria Desejada</h2>
          <select onChange={(e)=>escolheuCategoria(e)}  className='p-3 rounded-lg'>
          {categorias?.map((item)=>{
            return <option key={item._id}  >{item.nome}</option>
          })}
        </select></div>): ''}
        
        {mounted
        ? (<div className='flex flex-col gap-8 '>
          <h2 className='mt-8 font-bold text-slate-600'>Escolha A Subcategoria </h2>
          <select onChange={(event)=> setNovaOperacao({...novaOperacao,subcategoria: event.target.value})}  className='p-3 rounded-lg'>
          {subcategorias?.map((item)=>{
            return <option key={item}>{item}</option>
          })}
        </select>
        <input 
          type='text' 
          placeholder='descricao' 
          className='p-3 rounded-lg' 
          onChange={(event)=> setNovaOperacao({...novaOperacao, descricao: event.target.value})}
        />
        <input 
          type='number' 
          placeholder='valor'  
          className='p-3 rounded-lg'
          onChange={(event)=> setNovaOperacao({...novaOperacao, valor: parseFloat(event.target.value) })}
        />
        <button 
          className='text-slate-50 text-xl font-bold bg-blue-600 p-3 rounded-lg '
          onClick={(e) => enviarCadastro(e)}>Cadastrar</button>
        </div>): ''}
        
      
      </form>
    </div>
  )
}

export default Show
