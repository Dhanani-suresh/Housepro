import React from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"
import { useParams } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { FaHome, FaBed } from 'react-icons/fa';


export default function PropertyPage({ properties }) {
  const { propertyId } = useParams()
  const property = properties.find((prop) => prop.id === propertyId)
  if (!property) {
    return <div>No imageGallery found.</div>
  }

  return (
    <div className='propertyPage' style={{ backgroundImage: 'url("/images/greyBackground.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh' }}>
      <main className='container'>
        <section className='propertyInfo row mt-5 mx-2'>
          <div className='details col-md-5'>
            <h2 className='location'>{property.location}</h2>
            <h4 className='price'>Offers over <p>£ {property.price}</p></h4>
            <div className='otherInfo'>
              <div className='info'><p className='top'>TYPE</p><p className='bottom'><FaHome size={23} />  {property.type}</p></div>
              <div className='info'><p className='top'>BEDROOMS</p> <p className='bottom'><FaBed size={23} /> x {property.bedrooms}</p></div>
              <div className='info'><p className='top'>TENURE</p><p className='bottom'>{property.tenure}</p></div>
            </div>
          </div>
          <div className='gallery col-md-7'>
            <ImageGallery items={property.imageGallery} thumbnailPosition='right' />
          </div>
        </section>
        <Tabs className='tabs'>
          <TabList>
            <Tab>Description</Tab>
            <Tab>Floor Plan</Tab>
            <Tab>Google Maps</Tab>
          </TabList>
          <TabPanel>
            <p className='long--description'>{property.description}</p>
          </TabPanel>
          <TabPanel>
            <div style={{ textAlign: 'center' }}>
              <img src={property.floorPlan} alt="Floor Plan" style={{ display: 'block', margin: '0 auto', maxWidth: '100%', height: "auto" }} />
            </div>

          </TabPanel>
          <TabPanel>
            <div className='property-location'>
              <iframe src={property.mapLink} title='Property-Location' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" ></iframe>
            </div>
          </TabPanel>
        </Tabs>
      </main>
    </div>
  )
}
