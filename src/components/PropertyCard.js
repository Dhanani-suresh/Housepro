import React, { useState } from 'react'
import dayjs from 'dayjs'
import { useDrag } from 'react-dnd'
import { Link } from 'react-router-dom'
import '../App.css'

export default function PropertyCard({ property, addToFav }) {
  const [isHovered, setIsHovered] = useState(false);
  const [, drag] = useDrag({

    type: 'PROPERTY_TYPE',
    item: { property },
  })
  return (
    <div key={property.id} className="col-sm-4 mb-3" ref={drag} >
      <div className="card h-100" style={{ border: '2px solid grey', transform: isHovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.3s ease', backgroundColor: 'rgb(248, 246, 246)' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <button className="fav-button" onClick={() => addToFav(property)} style={{ position: 'absolute', top: 3, left: 3, padding: '2px', cursor: 'pointer', fontSize: '0.7rem', borderRadius: '5px', fontWeight: 'bold' }}>Add to Favourite</button>
        <img src={`../${property.picture}`} className="card-img-top" alt="property" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ color: '#031357' }}>{property.location}</h5>
          <p className="card-text" style={{ color: '#051d8c', marginBottom: 'auto', padding: '5px 0 20px' }}>  {property.type} with {property.bedrooms} bedrooms </p>
          <div style={{ display: 'flex' }}>
            <p className="card-text" style={{ fontSize: '13px', color: 'grey', textAlign: 'center', marginRight: 'auto' }}>{dayjs(`${property.added.year}-${property.added.month}-${property.added.day}`).format("DD MMMM YYYY")}</p>
            <button className="card-text justify-content-center" style={{ backgroundColor: '#031357', padding: '0 5px', borderRadius: '5px' }}><Link to={property.url} style={{ fontSize: '15px', textDecoration: 'none', color: 'white' }}>View details</Link></button>
          </div>
        </div>
      </div>
    </div>
  )
}