import React from 'react'
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'

export default function FavCard({ property, removeFromFav }) {
  const [, drag] = useDrag({
    type: 'FAVOURITES',
    item: { property },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult && !monitor.didDrop()) {
        removeFromFav(property);
      }
    },
  })

  return (
    <div key={property.id} ref={drag} className="fav--card">
      <p className='fav--title'>{property.type} with {property.bedrooms} BR</p>
      <div className='other-details'>
        <Link to={property.url} className='fav--link'>More details</Link>
        <img src='../images/delete.svg' onClick={() => removeFromFav(property)} style={{ width: '18px', cursor: 'pointer' }} />
      </div>
    </div>
  )
}