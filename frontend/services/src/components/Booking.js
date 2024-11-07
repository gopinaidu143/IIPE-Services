import {React} from 'react';
import Navbar from '../navbar';

const Booking=()=>{
    const styles = {
        card: {
            marginTop:'10%'
        }
    }
    return (
        <>
        <Navbar/>
        <div><h1 style={styles.card}>Hello</h1></div>
        </>
      );
}

export default Booking;