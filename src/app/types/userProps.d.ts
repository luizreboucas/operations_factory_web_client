
interface UserProps{
    user: string,
    password: string
  }

interface CategoriasProps {
    nome: string,
    __v: number,
    _id: string,
    subcategorias: string[]
  }
interface NovaOperacaoProps{
    categoria: string | undefined,
    subcategoria: string | undefined,
    descricao: string,
    valor: number
  }