import React, { useEffect, useState } from 'react';
import Misty from '../Assets/Images/Mist.png';
import Cloudy from '../Assets/Images/Cloudy.png';
import SnowFall from '../Assets/Images/Snow.png';
import Shower from '../Assets/Images/Shower.png';
import Clear_Sun from '../Assets/Images/Clear_Sunny.png';
import Clear_Moon from '../Assets/Images/Clear_Moon.png';
import Heavy_Rain from '../Assets/Images/Heavy_Rain.png';
import Night_Snow from '../Assets/Images/Night_Snow.png';
import Sun_Cloud from '../Assets/Images/Sunny_Cloudy.png';
import Moon_Cloud from '../Assets/Images/Moon_Cloudy.png';
import Night_Misty from '../Assets/Images/Night_Mist.png';
import Night_Shower from '../Assets/Images/Night_Shower.png';
import Night_Cloudy from '../Assets/Images/Night_Cloudy.png';
import Night_Heavy_Rain from '../Assets/Images/Night_Heavy_Rain.png';

const Image_Object = {

  "01d": Clear_Sun,
  "01n": Clear_Moon,
  "02d": Sun_Cloud,
  "02n": Moon_Cloud,
  "03d": Cloudy,
  "03n": Night_Cloudy,
  "04d": Cloudy,
  "04n": Night_Cloudy,
  "09d": Shower,
  "09n": Night_Shower,
  "10d": Shower,
  "10n": Night_Shower,
  "11d": Heavy_Rain,
  "11n": Night_Heavy_Rain,
  "13d": SnowFall,
  "13n": Night_Snow,
  "50d": Misty,
  "50n": Night_Misty,

}
const WeatherContainer1 = ({ City, WeatherData1, UnitChange }) => {
  const [date, setDate] = useState('');
  useEffect(() => {
    const Current_date = new Date();
    setDate(
      `${String(Current_date.getDate()).padStart(2, 0)} /
       ${String(Current_date.getMonth()).padStart(2, 0)} /
       ${Current_date.getFullYear()}`
    );
  }, []);
  const BackGroundImage = {
    backgroundImage: `url(${Image_Object[WeatherData1.Icon]})`,
    backgroundSize: '450px 120px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }
  return (
    <div className='Weather-Container1'>
      <div className='Data-Container' style={BackGroundImage}>
        <h2 className='Sky-Description-Text'>{(City !== '') && WeatherData1.SkyDescription}</h2>
      </div>
      <div className='Data-Container'>
        <h3><span style={{ color: 'var(--Color3)' }}>Date:</span> {(City !== '') && date}</h3>
        <h2 style={{ marginTop: '10px', fontSize: "1.9em", color: 'var(--Color3)' }}>{City}</h2>
      </div>
      <div className='Data-Container with-Boxes'>
        <div className='Data-Boxes'>
          <h3>Temperature</h3>
          <h1>{(City !== '') && (UnitChange)?((9/5 * WeatherData1.Main_temp)+32).toFixed():WeatherData1.Main_temp}&deg;{(UnitChange)?'F':'C'}</h1>
        </div>
        <div className='Data-Boxes'>
          <h3>Feels Like</h3>
          <h1>{(City !== '') && (UnitChange)?((9/5 * WeatherData1.Feels_like)+32).toFixed():WeatherData1.Feels_like}&deg;{(UnitChange)?'F':'C'}</h1>
        </div>
      </div>
    </div>
  )
}

export default WeatherContainer1