import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import dayjs from 'dayjs'
import jsonData from './properties.json'
import './App.css'
import Nav from './components/Nav.js'
import PropertyList from './components/PropertyList.js'
import SearchPanel from './components/SearchPanel.js'
import FavouriteList from './components/FavouriteList.js'
import PropertyPage from './Pages/PropertyPage.js'
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter')
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


function App() {
  const [propertiesList, setPropertiesList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [favouriteList, setFavouriteList] = useState([])

  useEffect(() => {
    setPropertiesList(jsonData.properties);
    setFilteredList(jsonData.properties);
  }, []);

  //add to favoutites function
  const addToFav = (property) => {
    if (!favouriteList.some((favProperty) => favProperty.id === property.id)) {
      setFavouriteList((prevList) => [...prevList, property]);
    }
  };

  //remove from favourites
  const removeFromFav = (favProperty) => {
    if (favouriteList.includes(favProperty)) {
      setFavouriteList((prevList) =>
        prevList.filter((property) => property.id !== favProperty.id)
      );
    }
  };

  //Function to clear favourites
  const clearFavList = () => {
    setFavouriteList([])
  }

  // function to filter property list
  const filterProperty = (filterCriteria) => {
    let filteredResults = propertiesList.filter((property) => {
      const monthNumber = getMonthNumber(property.added.month)
      const date = new Date(property.added.year, monthNumber, property.added.day)

      function getMonthNumber(monthString) {
        const months = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ];
        return months.indexOf(monthString)
      }

      // Type filter
      if (filterCriteria.type !== 'All' && property.type !== filterCriteria.type) {
        return false
      }

      // Price range filter
      if (
        (filterCriteria.minPrice && property.price < Number(filterCriteria.minPrice)) ||
        (filterCriteria.maxPrice && property.price > Number(filterCriteria.maxPrice))
      ) {
        return false
      }

      // Bedrooms filter
      if (
        (filterCriteria.minBedrooms && property.bedrooms < Number(filterCriteria.minBedrooms)) ||
        (filterCriteria.maxBedrooms && property.bedrooms > Number(filterCriteria.maxBedrooms))
      ) {
        return false
      }

      // Date filter
      if (
        (filterCriteria.startDate &&
          !dayjs(date).isSameOrAfter(dayjs(filterCriteria.startDate))) ||
        (filterCriteria.endDate &&
          !dayjs(date).isSameOrBefore(dayjs(filterCriteria.endDate)))
      ) {
        return false;
      }


      // Postcode filter
      if (filterCriteria.postcode && !property.location.includes(filterCriteria.postcode)) {
        return false
      }

      return true
    })

    setFilteredList(filteredResults)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Nav onDrop={removeFromFav} />
        <div className="container-fluid">
          <div className="col-md-12">
            <Routes>
              <Route
                path="/"
                element={
                  <div className="row mt-3 ms-2 mx-2">
                    <div className="col-md-3">
                      <SearchPanel onFilter={filterProperty} onDrop={removeFromFav} />
                    </div>
                    <div className="col-md-7">
                      <PropertyList properties={filteredList} addToFav={addToFav} removeFromFav={removeFromFav} />
                    </div>
                    <div className="col-md-2">
                      <FavouriteList favList={favouriteList} removeFromFav={removeFromFav} clearFavList={clearFavList} onDrop={addToFav} />
                    </div>
                  </div>
                }
              />
              <Route path="/properties/:propertyId" element={<div className='row mt-0'><PropertyPage properties={propertiesList} /></div>} />
            </Routes>
          </div>
        </div>
      </Router>
    </DndProvider>
  );
}

export default App;