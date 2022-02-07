import { useState } from 'react';


const Passengerform = ({flight, onBook}) => {

  const [name,setName] = useState('')
  const [phnum,setPhnum] = useState('')
  const [seatnum,setSeatnum] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    
    onBook(name,flight.src,flight.dest,flight.airline,phnum,seatnum,flight.date);
    
    setName('')
    setPhnum('')
    setSeatnum('')
  }

  return (
    <div style={{paddingTop: '15px', paddingLeft: '28px'}}>
        <form >
            <label>Name</label>
            <input type="text" style={{marginLeft: '10px'}} value={name} onChange={(e) => setName(e.target.value)} />
            <label>Phone Number</label>
            <input type="text" style={{marginLeft: '10px'}} value={phnum} onChange={(e) => setPhnum(e.target.value)} />
            <label>Seat Number</label>
            <input type="text" style={{marginLeft: '10px'}} value={seatnum} onChange={(e) => setSeatnum(e.target.value)} />
            <input type ="button" style={{marginLeft: '10px'}} value="Book" onClick={onSubmit}/>
        </form>
    </div>
  );
};



export default Passengerform;
