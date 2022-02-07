import React from 'react';


const Viewbooking = ({ passengers }) => {
  return (
    <>
        {passengers.map((passenger) => (
            <div className='passsenger-list' key={passenger.id} style={{marginTop: '20px', border: 'solid black 1px'}}>
                <h4 style={{marginLeft: '60px', padding: '10px'}}>Name : {passenger.name}</h4>
                <ul style={{paddingBottom: '10px'}}>
                    <li>From: {passenger.src}</li>
                    <li>To: {passenger.dest}</li>
                    <li>Airline: {passenger.airline}</li>
                    <li>Seatnum: {passenger.seatnum}</li>
                    <li>Date: {passenger.date}</li>
                </ul>
            </div>
        ))}
    </>
    )
};


export default Viewbooking;
