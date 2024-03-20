import React from 'react'
import { useDrop } from 'react-dnd'
import 'bootstrap/dist/css/bootstrap.min.css'
import PropertyCard from './PropertyCard'

export default function PropertyList({ properties, addToFav,removeFromFav}) { 
  const [{ isOver}, drop] = useDrop({
    accept: 'FAVOURITES',
    drop: (item) => removeFromFav(item.property),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <section className="container mt-5" ref={drop}>
      <div className="row">
        {properties.map((item) => (         
          <PropertyCard key={item.id} property={item} addToFav={addToFav} removeFromFav={removeFromFav}/>
        ))}
      </div>
    </section>
  );
}
