import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes, FaPlus, FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Main_Object = {
  RunOnce: true,
}

const WeatherHeader = ({ GetCity, GetCityData, UnitBtnClick, UnitChange }) => {
  // These are States
  const [ScreenWidth, setScreenWidth] = useState(window.innerWidth);
  const [City, setCity] = useState('Coimbatore');
  const [CityData, setCityData] = useState(City);
  const [MenuFlag, setMenuFlag] = useState(false);
  // Handle the Submit of the form
  function handleSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      setCityData(City);
      GetCity(City);
      setCity("");
    }, 400);
  }
  // 
  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    })
  }, []);
  // "Default City", To change the default city state in City state variable as your wish
  useEffect(() => {
    if (Main_Object.RunOnce) {
      Main_Object.RunOnce = false;
      GetCity(City);
      setCity('');
    }
    else {
      setCity('');
    }
  }, []);
  // 
  window.addEventListener('click', (e) => {
    if (e.target.className !== 'Nav-Icon') {
      setMenuFlag(false);
    }
  });
  return (
    <header className='Header'>
      <h2>Weather App</h2>
      <div className='Nav-Icon-Container'>
        <FaBars className='Hamburger-Icon' />
        <div className='Nav-Icon' onClick={() => setMenuFlag(true)} ></div>
      </div>
      <FaPlus className='SaveCity-Btn' onClick={() => GetCityData(CityData)} />
      <form onSubmit={handleSubmit}>
        <input type="text" name="CityInput" id="City-Input" value={City} placeholder='Search City' onChange={(e) => { setCity(e.target.value) }} />
        <div style={{ position: 'relative' }}>
          <input type="submit" value={''} id='Search-btn' />
          <FaSearch id="Search-icon" />
        </div>
      </form>
      <nav className='NavBar' style={(ScreenWidth <= '680') ? ((MenuFlag) ? { transform: 'translateX(0%)' } : { transform: 'translateX(100%)' }) : { transform: 'translateX(0%)' }}>
        <FaTimes className='Close-Icon' onClick={() => setMenuFlag(false)} />
        <div className='Drafts-btn'>
          <Link to="/DraftPage">Drafts</Link>
        </div>
        <button className='TempUnit-Btn' onClick={UnitBtnClick}>&deg;{(UnitChange) ? 'F' : 'C'} -&deg;{(UnitChange) ? 'C' : 'F'}</button>
      </nav>
    </header>
  )
}

export default WeatherHeader