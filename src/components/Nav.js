import React from "react"
import { Link } from 'react-router-dom'
import { useDrop } from 'react-dnd'
export default function Nav({ onDrop }) {
  const [, drop] = useDrop({
    accept: 'FAVOURITES',
    drop: (item) => onDrop(item.property),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })
  return (
    <nav className="navigation" ref={drop}>
      <div className='nav--logo'>
        <img src="../images/logo.png" alt='logo' />
      </div>
      <ul className="navBar">
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  )
}