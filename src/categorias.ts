import axios from "axios"

const getCategorias = async() : Promise<CategoriasProps[] | undefined >  =>{
    try {
        const cat : CategoriasProps[] = (await axios.get('http://localhost:3500/categorias')).data
        return cat
    } catch (error) {
        console.log(error)
        return undefined
    }

    
}

const categoriasImport = getCategorias()

export default categoriasImport
