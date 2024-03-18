import React from 'react'

const WeatherContainer2 = ({ City , WeatherData2, UnitChange }) => {
  return (
    <div className='Weather-Container2'>
      <div className="Data-Container with-Boxes">
        <div className="Data-Boxes">
          <h3>Min</h3>
          <h1 style={{fontSize: "1.5em"}}>{(City !== '') && (UnitChange)?((9/5 * WeatherData2.Min_Temp)+32).toFixed():WeatherData2.Min_Temp}&deg;{(UnitChange)?'F':'C'}</h1>
        </div>
        <div className="Data-Boxes">
          <h3>Max</h3>
          <h1 style={{fontSize: "1.5em"}}>{(City !== '') && (UnitChange)?((9/5 * WeatherData2.Max_Temp)+32).toFixed():WeatherData2.Max_Temp}&deg;{(UnitChange)?'F':'C'}</h1>
        </div>
      </div>
      <div className="Data-Container with-Boxes">
        <div className='Data-Boxes'>
          <h3>Wind Speed</h3>
          <h1 style={{fontSize: "1.5em"}}>{(City !== '') && WeatherData2.WindSpeed}</h1>
        </div>
        <div className='Data-Boxes'>
          <h3>Pressure</h3>
          <h1 style={{fontSize: "1.5em"}}>{(City !== '') && WeatherData2.Pressure}</h1>
        </div>
      </div>
      <div className="Data-Container with-Boxes">
        <div className="Data-Boxes">
          <h3>Humidity</h3>
          <h1 style={{fontSize: "1.5em"}}>{(City !== '') && WeatherData2.Humidity}</h1>
        </div>
        <div className="Data-Boxes">
          <h3>Visibility</h3>
          <h1 style={{fontSize: "1.5em"}}>{(City !== '') && WeatherData2.Visibility}</h1>
        </div>
      </div>
    </div>
  )
}

export default WeatherContainer2