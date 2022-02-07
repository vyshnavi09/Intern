import Flightform from "./Flightform";
import Flight from "./Flight";

const Booking = ({ flights, onSearch, onToggle, onBook}) => {
  return (
    <div className='booking'>
        <Flightform onSearch={onSearch} />
        <Flight flights={flights} onToggle={onToggle} onBook={onBook}/>
    </div>
  );
}

export default Booking;
