import React, { useEffect, useState } from 'react'

const Paginador = ({ pages, page, setPage }) => {

    const handleAnterior = () => {
        setPage(page - 1)
    }
    const handleSiguiente = () => {
        setPage(page + 1)
    }

    return (
        <div className='mt-14 relative h-10 w-full flex justify-center items-center text-white'>
            <button disabled={page == 1 ? true : false} onClick={handleAnterior} className={`text-3xl hover:opacity-50 absolute left-0 ${page == 1 && 'opacity-50'}`}><i className="fa-solid fa-square-caret-left"></i></button>
            <button disabled={page == pages ? true : false} onClick={handleSiguiente} className={`text-3xl hover:opacity-50 absolute right-0 ${page == pages && 'opacity-50'}`}><i className="fa-solid fa-square-caret-right"></i></button>
            <span className='font-semibold w-full text-center'>Página {page} de {pages}</span>
        </div>
    )
}

export default Paginador
