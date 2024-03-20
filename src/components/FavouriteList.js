import React from 'react'
import { useDrop } from 'react-dnd'
import FavCard from './FavCard'

export default function FavouriteList({ favList, removeFromFav, clearFavList, onDrop }) {

  const [{ isOver }, drop] = useDrop({
    accept: 'PROPERTY_TYPE',
    drop: (item) => onDrop(item.property),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  return (
    <section className='container mt-5' ref={drop} style={{ cursor: 'move', border: '3px solid grey', backgroundColor: '#f1f3f4', borderRadius: '10px' }}>
      <h4 style={{ color: "#031357", padding: '11px 0px 2px 0px', marginBottom: '20px', borderBottom: '2px solid rgb(202, 199, 199)' }}>Favourites</h4>
      {favList && favList.length > 0 ? (
        <div className='fav--section'>
          <button onClick={() => { clearFavList() }} className='clear--button'>Clear All</button>
          <div className='fav--list'>
            {favList.map((property) => (
              <FavCard property={property} removeFromFav={removeFromFav} />
            ))}
          </div>

        </div>
      ) : (
        <p>No favourites available.</p>
      )}

    </section>
  );
}