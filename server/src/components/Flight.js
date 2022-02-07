import { useState } from 'react';
import Passengerform from './Passengerform';



const Flight = ({ flights, onToggle, onBook}) => {

  return (
    <>
        {flights.map((flight) => (
            <div className='flight-data' key={flight.flight_id} style={{marginTop: '20px', border: 'solid 1px black',padding: '20px'}}>
                <ul>
                  <li className='flight-list'>{flight.src}<i>({flight.arr})</i></li>
                  <li className='flight-list'>{flight.dest}<i>({flight.dept})</i></li>
                  <li className='flight-list'>{flight.date}</li>
                  <li className='flight-list'>{flight.airline}</li>      
                  <button className='btn' style={{marginLeft : '40px'}} onClick={() => { onToggle(flight.flight_id) }}>Book a Ticket</button>
                  {flight.toggle && < Passengerform flight={flight} onBook={onBook}/>}
                </ul>
            </div>
        ))}
    </>
  )
}

export default Flight;
