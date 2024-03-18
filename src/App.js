import './App.css';
import { useEffect, useState } from 'react';
import DraftPage from './components/DraftPage';
import WeatherHeader from './components/WeatherHeader';
import WeatherContainer1 from './components/WeatherContainer1';
import WeatherContainer2 from './components/WeatherContainer2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  // localStorage.clear();
  // Put Your Own API from 'OpenWeatherMap' WebSite 
  let Api = '';
  // These are States
  const [City, setCity] = useState('');
  const [DataError, setDataError] = useState(false);
  const [UnitChange, setUnitChange] = useState(false);
  const [LoadingFlag, setLoadingFlag] = useState(false);
  const [List_items, setList_items] = useState(JSON.parse(localStorage.getItem('List_items')) || []);
  // To set the Array Objects Data to store in LocalStorage for Pin your Favorite cities  
  useEffect(() => {
    localStorage.setItem("List_items", JSON.stringify(List_items));
  }, [List_items]);
  function GotoHome() {
    setTimeout(() => {
      setDataError(false);
    }, 200);
  }
  // These Two Objects is used for store the weather data values which is for display in the UI  
  const [WeatherData1, setWeatherData1] = useState(
    {
      Icon: '02n',
      Main_temp: '',
      Feels_like: '',
      SkyDescription: "",
    }
  );
  const [WeatherData2, setWeatherData2] = useState(
    {
      Min_Temp: '',
      Max_Temp: '',
      Humidity: '',
      Pressure: '',
      WindSpeed: '',
      Visibility: '',
    }
  );
  // This is the Hero Function used to call the API to get the Data
  function GetCity(Which_City) {
    if (Which_City === '') {
      setDataError(true);
      return
    }
    setCity(Which_City);
    setLoadingFlag(true);
    setTimeout(() => {
      setLoadingFlag(false);
    }, 3000);
    if(Api !== ''){
      getWeatherData(Which_City);
    }
  }
  // This function is to (store) Pinned or Your Favorite Cities for again if you want to check the weather again
  // LocalStorage is Used to store The Favorite Cities
  function GetCityData(Which_City) {
    setList_items(List_items.filter((el) => (el.Name !== Which_City)))
    setList_items(Prev_Data => [...Prev_Data, { Name: Which_City }]);
    setLoadingFlag(true);
    setTimeout(() => {
      setLoadingFlag(false);
    }, 600);
  }
  // Temperature Unit Conversion Button Function
  function UnitBtnClick() {
    setUnitChange(!UnitChange);
    setLoadingFlag(true);
    setTimeout(() => {
      setLoadingFlag(false);
    }, 3000);
  }
  // To Delete the Clicked City from the Favourite City Lists
  function DeleteCity(Which_id){
    setList_items(
      List_items.filter((_,index)=> (index !== Which_id))
    )
  }
  // This is the Main function to getWeatherData by API Call
  async function getWeatherData(Which_City) {
    // console.log("Getting" , Which_City , "Data");
    try {
      // 
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Which_City}&appid=${Api}&units=metric`);
      if (!response.ok) {
        setDataError(true);
        throw new Error("Did't Get the Response");
      }
      const Json_Data = await response.json();
      setWeatherData1(
        {
          Icon: Json_Data.weather[0].icon,
          Main_temp: Json_Data.main.temp.toFixed(),
          Feels_like: Json_Data.main.feels_like.toFixed(),
          SkyDescription: Json_Data.weather[0].description
        },
      )
      setWeatherData2(
        {
          Min_Temp: Json_Data.main.temp_min.toFixed(),
          Max_Temp: Json_Data.main.temp_max.toFixed(),
          Humidity: Json_Data.main.humidity + " %",
          Pressure: Json_Data.main.pressure + " hPa",
          WindSpeed: (Json_Data.wind.speed.toFixed() * (18 / 5)).toFixed() + " Km/hr",
          Visibility: (Json_Data.visibility / 1000) + " Km",
        }
      )
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element=
          {
            <div className="App">
              <WeatherHeader GetCity={GetCity} GetCityData={GetCityData} UnitBtnClick={UnitBtnClick} UnitChange={UnitChange} />
              <div className='Main-Container'>
                <WeatherContainer1 City={City} WeatherData1={WeatherData1} UnitChange={UnitChange} />
                <WeatherContainer2 City={City} WeatherData2={WeatherData2} UnitChange={UnitChange} />
              </div>
              {
                DataError &&
                <div className='Error-Container'>
                  <h1 style={{ color: 'var(--Color1)' }}>Error Occurred !</h1>
                  <div>
                    {/* <h2>! InAppropriate Name !</h2> */}
                    <h2>! Enter the Valid Name !</h2>
                  </div>
                  <button className='Error-Submit-Btn' onClick={() => GotoHome()}>OK</button>
                </div>
              }
              {
                LoadingFlag &&
                <div className="LoadingContainer">
                  <h1>!! Processing...</h1>
                  <div className="Loader" style={(LoadingFlag) ? { animation: 'Loading-Animation 1s linear 3' } : { animation: 'none' }}></div>
                </div>
              }
            </div>
          } />
        <Route path='/DraftPage' element={<DraftPage List_items={List_items} GetCity={GetCity} DeleteCity={DeleteCity}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
