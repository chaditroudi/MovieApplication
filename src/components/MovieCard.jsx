import React from 'react'
import { Link } from 'react-router-dom'

function MovieCard({data}) {

  
  return (
    <div className="bg-secondary-color max-w-[210px] mx-auto cursor-pointer transition-all duration-300 hover:scale-105 hover:transition-all hover:duration-300 min-h-[450px] h-full m-[10px]">
    <Link to={`/movie/${data.imdbID}`}>
      <div>
        {/* Add lazy loading effect for optimisation, faster initial load time and less data traffic */}
        <img
          width="200px"
          height="320px"
          className="w-full h-80 p-3"
          loading="lazy"
          src={data.Poster}
          alt={data.Title}
        />
        <div>
          <div className="text-font-primary p-3">
            <h4 className="text-xl mb-2 font-normal line-clamp">
              {data.Title}
            </h4>
            <p>{data.Year}</p>
          </div>
        </div>
      </div>
    </Link>
    </div>
  )
}

export default MovieCard