'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface CategoriasProps {
  nome: string,
  __v: number,
  _id: string
}
interface OperacoesProps{
  _id: string,
  tipo: string
  categoria: string
  valor: number,
  __v: number
}


const Show = () => {
  const [categorias,setCategorias] = useState<CategoriasProps[]>([])
  const [operacoes, setOperacoes] = useState<OperacoesProps[]>([])
  const [mounted,setMounted] = useState<boolean>(false)
  useEffect(()=>{

    const getCategorias = async()=>{
      try {
        const cat : CategoriasProps[] = await (await axios.get('http://localhost:3500/categorias')).data
        setCategorias(cat)
        

      } catch (error) {
        console.log(error)
      }
    }
    getCategorias()
    setMounted(true)
    
  },[])
  
  const [categoria,setCategoria] = useState<CategoriasProps>()
  const escolheuCategoria = async(e: any) =>{
    
    try {
      const nomeCategoria = e.target.value
      const categoriaSelecionada: CategoriasProps = categorias.filter(cat=> cat.nome === nomeCategoria)
      setCategoria(categoriaSelecionada)
      console.log(categoriaSelecionada)
      
      const operacoesDb : OperacoesProps[] = (await axios.get('http://localhost:3500/operacoes')).data
     
     console.log(categoriaSelecionada?._id)
     
    } catch (error) {
      console.log(error)
    }

  }

  
  return (
    <div>
      <form action="" className='flex flex-col'>
        <h2>Escolha a Categoria Desejada</h2>
        {mounted
        ? (<select onChange={(e)=>escolheuCategoria(e)}>
          {categorias.map((item)=>{
            return <option key={item._id}  >{item.nome}</option>
          })}
        </select>): ''}
        <h2>Escolha A Operação </h2>
        {mounted
        ? (<select onChange={(e)=>escolheuCategoria(e)}>
          {operacoes.map((item)=>{
            return <option key={item._id} >{item.tipo}</option>
          })}
        </select>): ''}
      
      </form>
    </div>
  )
}

export default Show
