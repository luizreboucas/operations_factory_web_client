'use client'

import React, { useEffect, useState } from 'react'
import categoriasImport from '@/categorias'
import axios from 'axios'





const Show = () => {
  
  const [categorias,setCategorias] = useState<CategoriasProps[] | undefined>()
  const [subcategorias, setSubcategorias] = useState<string[] | undefined>()
  const [novaOperacao, setNovaOperacao] = useState<NovaOperacaoProps>({
    categoria: '',
    subcategoria: '',
    descricao: '',
    valor: 0
  })
  
  
  useEffect(()=>{
    async function getDados(){
      const categoriass = await categoriasImport
      setCategorias(categoriass)
    }
    getDados()

  },[])
  
  
  const [categoria,setCategoria] = useState<CategoriasProps | undefined>()
  
  const escolheuCategoria = (e : React.ChangeEvent<HTMLSelectElement>)=>{
    const nomeCategoriaEscolhida : string = e.target.value
    const categoriaEscolhida : (CategoriasProps | undefined) = categorias?.find(item => item.nome == nomeCategoriaEscolhida)
    setNovaOperacao({...novaOperacao, categoria: categoriaEscolhida?._id})
    setSubcategorias(categoriaEscolhida?.subcategorias)
   
  }

  const enviarCadastro = async(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
    event.preventDefault()
    try {
      console.log(novaOperacao)
      await axios.post('http://localhost:3500/operacoes', novaOperacao)
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <div className='h-full  flex flex-col items-center justify-center bg-blue-200'>
      <form action="" className=' text-2xl flex-wrap bg-slate-50 p-8 rounded-xl'>
        <div>
        
        
       <div className='flex flex-col gap-8'>
          <h2 className='font-bold text-slate-600'>Escolha a Categoria Desejada</h2>
          <select onChange={(e)=>escolheuCategoria(e)}  className='p-3 rounded-lg'>
          {categorias?.map((item)=>{
            return <option key={item._id}  >{item.nome}</option>
          })}
        </select></div>
        
        
       <div className='flex flex-col gap-8 '>
          <h2 className='mt-8 font-bold text-slate-600'>Escolha A Subcategoria </h2>
          <select onChange={(event)=> setNovaOperacao({...novaOperacao, subcategoria: event.target.value})}  className='p-3 rounded-lg'>
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
        </div>
        
        </div>
      </form>
    </div>
  )
}

export default Show
