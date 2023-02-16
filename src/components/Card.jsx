const Card = ({ movie }) => {
    return (
        <div className="h-[350px] w-[200px] lg:w-auto md:h-[400px] lg:h-[500px] text-white flex flex-col items-center">
            {movie.Poster != 'N/A' ? <img className="h-56 md:h-80 lg:h-96" src={movie.Poster} />
                :
                <span className="text-center h-56 md:h-80 lg:h-96 border flex justify-center items-center place-items-center text-xs">
                    <p><i className="fa-solid fa-triangle-exclamation text-yellow-300"></i> No se encontró el poster de esta película </p>
                </span>}
            <p className="font-bold text-center mt-2">{movie.Title}</p>
            <p className="font-semibold">{movie.Year}</p>
        </div>
    )
}

export default Card
