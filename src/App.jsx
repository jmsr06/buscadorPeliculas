import React, { useEffect, useState, useRef } from 'react'
import Card from './components/Card'
import Loader from './components/Loader'
import Paginador from './components/Paginador'
const API_KEY = '4287ad07'

function App() {
  const [loader, setLoader] = useState(false)
  const [search, setSearch] = useState('')
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [order, setOrder] = useState('asc')
  const primerInput = useRef(true)
  const previousSearch = useRef(search)
  const [pages, setPages] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (search == '') {
      setMovies([])
    }
  }, [search])

  useEffect(() => {
    if (order == 'asc' && movies != undefined) {
      setMovies(JSON.parse(JSON.stringify(movies)).reverse())
    }
    if (order == 'desc' && movies != undefined) {
      setMovies(JSON.parse(JSON.stringify(movies)).reverse())
    }
  }, [order])

  useEffect(() => {
    setLoader(true)
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&type=movie&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder('asc')
        if (data.Response == 'False') {
          setError('No se encontraron resultados para la búsqueda')
        }
        else {
          setPages(Math.ceil((data.totalResults) / 10))
          if (data.Search) {
            setMovies(data.Search.sort((a, b) => {
              return b.Title.localeCompare(a.Title)
            }))
          }
        }
        setLoader(false)
      }).catch(e => setLoader(false)) 
  }, [page])



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search == previousSearch.current) return
    try {
      setLoader(true)
      await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&type=movie&page=${page}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder('asc')
          setPages(Math.ceil((data.totalResults) / 10))
          if (data.Response == 'False') {
            setError('No se encontraron resultados para la búsqueda')
          }
          if (data.Search) {
            setMovies(data.Search.sort((a, b) => {
              return a.Title.localeCompare(b.Title)
            }))
          }
          setLoader(false)
        })
      previousSearch.current = search
    } catch (e) {
      setError('No se encontraron resultados para la búsqueda')
      console.log(e)
    }
  }

  const handleOrder = () => {
    if (order == 'asc') {
      setOrder('desc')
    } else {
      setOrder('asc')
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    if (primerInput.current) {
      primerInput.current = search == ''
      return
    }
    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return (
    <div className="App bg-black py-20 px-5 md:p-28 w-full h-full">
      <h1 className='text-center text-white text-3xl font-bold'>Buscador de películas <i className="fa-solid fa-clapperboard"></i></h1>
      <form className='text-center my-10' onSubmit={ handleSubmit }>
        <input value={search} onChange={handleSearch} placeholder='nombre de la película' className='border w-1/2 md:m-4 h-9 p-2 md:p-4' />

        {order == 'asc' ?
          <i onClick={handleOrder} className="fa-solid fa-arrow-down-a-z align-middle text-white text-2xl md:text-3xl mx-2 md:mx-4 cursor-pointer hover:opacity-50"></i>
          :
          <i onClick={handleOrder} className="fa-solid fa-arrow-down-z-a align-middle text-white text-2xl md:text-3xl mx-2 md:mx-4 cursor-pointer hover:opacity-50"></i>
        }
        <button className='text-white font-bold border border-white rounded-lg py-2 px-5 hover:opacity-60'>Buscar</button>
      </form>
      <div className='grid grid-cols-responsive lg:grid-cols-responsive-lg gap-5 md:gap-14 place-items-center'>
        {!search && <p className='text-center col-span-2 md:col-span-3 lg:col-span-5 text-white'>Por favor escribe el nombre de una película</p>}
        {movies.length > 0 ? movies.map((movie) => (
          <Card key={movie.imdbID} movie={movie} />
        )) :
          <p className='text-white text-center col-span-2 md:col-span-3 lg:col-span-5'>{error}</p>}
      </div>
      {movies.length > 0 && <Paginador pages={pages} page={page} setPage={setPage} />}
      {loader && <Loader />}
    </div>
  )
}

export default App
