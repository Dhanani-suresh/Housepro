import React ,{useState} from 'react'
import { DropdownList, DateTimePicker,NumberPicker } from 'react-widgets';
import 'react-widgets/styles.css';
import '../App.css'
import { useDrop } from 'react-dnd';

export default function SearchPanel({ onFilter, onDrop }) {
  const [filterCriteria, setFilterCriteria] = useState({
    type: "All", minPrice: '', maxPrice: '', startDate: null, endDate: null, minBedrooms: null, maxBedrooms: null, postcode: ""
  })

  const handleChange = event => {
    const { name, value } = event.target
    setFilterCriteria(prevCriteria => ({ ...prevCriteria, [name]: value }))
    console.log(value)
  }

  //fileter items on submit
  const handleSubmit = event => {
    event.preventDefault()
    onFilter(filterCriteria)

  }
  //removes fav cards dropped
  const [, drop] = useDrop({
    accept: 'FAVOURITES',
    drop: (item) => onDrop(item.property),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  // Clear all filter criteria
  const handleClear = () => {
    setFilterCriteria({
      type: 'All',
      minPrice: '',
      maxPrice: '',
      startDate: null,
      endDate: null,
      minBedrooms: null,
      maxBedrooms: null,
      postcode: '',
    })
    onFilter(filterCriteria)
  }


  return (
    <form className="container mt-5 rounded p-3 bg-light" style={{ border: "2px solid grey" }} onSubmit={handleSubmit} ref={drop}>
      <h5 className="border-bottom mb-3" style={{ color: "#031357" }}>Search for Property</h5>
      <div className="mb-3" >
        <label htmlFor="type" className="form-label">Type: </label>
        <DropdownList className="form-input" id="type" name="type" value={filterCriteria.type} data={['All', 'House', 'Flat']} onChange={value => handleChange({ target: { name: 'type', value } })} />
      </div>
      <div className="mb-3">
        <label className="form-label">Price Range:
          <div className="mt-2 d-flex">
            <NumberPicker className="form-input" type="number" name="minPrice" value={filterCriteria.minPrice} placeholder='Minimum' onChange={(value) => handleChange({ target: { name: 'minPrice', value } })} />
            <NumberPicker className="form-input ms-2" type="number" name="maxPrice" value={filterCriteria.maxPrice} placeholder='Maximum' onChange={(value) => handleChange({ target: { name: 'maxPrice', value } })} />
          </div>
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="noOfBedrooms" className="form-label">Number of Bedrooms:
          <div className="mt-2 d-flex">
            <NumberPicker className="form-input" name="minBedrooms" value={filterCriteria.minBedrooms} placeholder="Minimum" onChange={(value) => handleChange({ target: { name: 'minBedrooms', value } })} />
            <NumberPicker className="form-input ms-2" name="maxBedrooms" value={filterCriteria.maxBedrooms} placeholder="Maximum" onChange={(value) => handleChange({ target: { name: 'maxBedrooms', value } })} />
          </div>
        </label>
      </div>
      <div className="mb-3 d-flex">
        <div className='flex-grow'>
          <label htmlFor="startDate" className="form-label"> From</label>
          <DateTimePicker className="form-input" name="startDate" format="dd-MM-yyyy HH:mm:ss" value={filterCriteria.startDate} onChange={value => handleChange({ target: { name: 'startDate', value } })} />
        </div>
        <div className='flex-grow'>
          <label htmlFor="endDate" className="form-label">To:</label>
          <DateTimePicker className="form-input ms-3" name="endDate" value={filterCriteria.endDate} onChange={value => handleChange({ target: { name: 'endDate', value } })} />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="postcode" className="form-label">Postcode:</label>
        <input className="form-control" type="text" name="postcode" value={filterCriteria.postcode} onChange={handleChange} />
      </div>
      <div className="mb-3 d-flex">
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#031357", borderRadius: '30px', height: '40px', marginRight: 'auto' }}>Search</button>
        <button type="button" className="btn btn-primary" style={{ backgroundColor: "#031357", borderRadius: '30px', height: '40px' }} onClick={handleClear}>Clear All</button>
      </div>
    </form>
  )
}