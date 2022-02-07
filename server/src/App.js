import './App.css';
import React from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Booking from './components/Booking';
import axios from 'axios';
import Viewbooking from './components/Viewbooking';


const App = () => {

  const [showFlight,setShowFlight] = useState(false)

  const [ flights, setFlights ] = useState([]);

  const [ passengers, setPassenger ] = useState([])


  // Toggle the Passenger Form
  const togglePassenger = (id) => {
    //console.log(id)
    const p = flights.map(flight => flight.flight_id==id ? {...flight, toggle: false}: {...flight, toggle: false})
    setFlights(p)
    const newPassenger = flights.map(flight => flight.flight_id==id ? {...flight, toggle: !flight.toggle} : flight)
    // console.log(newPassenger)
    setFlights(newPassenger)
  }

  // Search the flights
  const searchFlights = (src,dest,date) => {
    axios
      .get("http://localhost:8000/flight/Chennai/Mumbai/07-02-2022",{ params: { src: src, dest: dest, date: date } })
      .then(res => {
        // console.log(res.data)
        setFlights(res.data)
        // console
        // const p = flights.map(flight => flight.flight_id==flight.flight_id ? {...flight, toggle: false}: {...flight, toggle: false})
        // setFlights(p)
        // console.log(flights)
      })
      .catch(err => console.error(err))
  }

  // View Bookings
  // const Getpasssengers = () => {
  //   axios
  //     .get("http://localhost:8080/passenger")
  //     .then(res => {console.log(res.data); setPassenger(res.data)})
  //     .catch(err => console.error(err))
  // }

  useEffect(() => {
    axios
    .get("http://localhost:8000/passengers")
    .then(res => {console.log(res.data); setPassenger(res.data)})
    .catch(err => console.error(err))
  })

  // Post Passengers
  const sendPassenger = (name,src,dest,airline,phnum,seatnum,date) => {
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    }
    
    axios.post('http://localhost:8000/passengers', passengers ,{headers: headers})
    .then(res => console.log(res))
    .catch(err => console.error(err))
  }

  return (
    <BrowserRouter>
    <div className="container">
    <Header />
    <ul className='list'>
      <li className='main-list'>
        <Link to="/" className='link' style={{color: 'white'}}>Book a Ticket</Link>
      </li>
      <li className='main-list'>
        <Link style={{color: 'white'}} className='link' to='/viewbooking'>View Booking</Link>
      </li>
    </ul>
    <Routes>
      <Route exact path='/' element={< Booking flights={flights} onSearch={searchFlights} onToggle={togglePassenger} onBook={sendPassenger}/>}></Route>
      <Route exact path='/viewbooking' element={<Viewbooking passengers={passengers} />}></Route>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;