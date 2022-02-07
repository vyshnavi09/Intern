import { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const Flightform = ({ onSearch }) => {
  const [src, setSrc] = useState('')
  const [dest, setDest] = useState('')
  const [date, setDate] = useState(null)

  function reverseString(s){
    return s.split("-").reverse().join("-");
}

  const onSubmit = (e) => {
    e.preventDefault()
    
    let text = date.toISOString().split('T')[0]
    let d = reverseString(text)
    // onSearch(src,dest,d)

    if(src && dest && date){
      onSearch(src,dest,d)
    }
    else {
      alert("Enter the Value")
    }

    // setSrc('')
    // setDest('')
    // setDate(new Date())
  }

  return (
    <div className="form">
        <form className='flight-form' onSubmit={onSubmit}>
        <div style={{marginTop : '10px'}}> 
            <label className="label" style={{marginLeft: '20px'}}>From</label>
            <input type='text' value={src} onChange={(e) => setSrc(e.target.value)} />
            <label className="label">To</label>
            <input type='text' value={dest} onChange={(e) => setDest(e.target.value)}/>
            <label className="label">Date</label>
            {/* <input type='date' selected={date} onChange={date => setDate(date)}/> */}
            {/* <Datepicker selected={date} onChange={date => setDate(date)} dateFormat='dd/MM/yyyy' minDate={new Date}/> */}
            <Datepicker  selected={date} onChange={date => setDate(date)} dateFormat='dd/MM/yyyy' minDate={new Date} wrapperClassName='datepicker'/>
            <input  type='submit' value='Search'/>
        </div>
        
      </form>
    </div>
    // <h2>vyshnavi</h2>
  )
}

export default Flightform;
