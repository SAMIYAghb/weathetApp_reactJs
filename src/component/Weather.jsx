import React, {  useState, useEffect } from 'react'
import {IoMdSunny,IoMdRainy,IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch} from 'react-icons/io';
import {BsCloudHaze2Fill,BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind} from 'react-icons/bs';
import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';

import axios from 'axios';




export default function Weather() {
  let apiKey='39a99f187da11559796ce6d444ea561c';
  

  const [data, setdata] = useState(null);
  const [location, setLocation] = useState('Paris');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [laoding, setLaoding] = useState(false);


  const handleInput = (e)=> {
   
    setInputValue(e.target.value);
    // console.log(e.target.value);
    
  }
  const handleubmit = (e)=>{
    e.preventDefault() ;
    // console.log(inputValue)

    //if input value is not empty
    if(inputValue !== ''){
      setLocation(inputValue);
    }
    //select input ehen clear input
    const input = document.querySelector('input');
    input.value = '';

    //if input value is  empty
    if(inputValue === ''){
      setAnimate(true);
      //after 500ms set animate to false
      setTimeout(()=>{
        setAnimate(false);
      },500)
    }

  }

  async function getData(){
    let {data}=await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    
      
      console.log(data);
      setdata(data);
  }

  useEffect(() => {
    setLaoding(true);
    // set data after 1000ms
      setTimeout(()=>{
        getData();
        setLaoding(false);
      }, 500)
    
  }, [location])
  
  if(!data){
    return(
      <div className='container'>
        <div className='spn'> 
          <ImSpinner8 className='spinner animate-spin'/>
        </div>

      </div>
    )
  }


//   console.log(data.weather[0].main);
  // let{weather, wind, sys, main, coord,clouds} = data
  // console.log(weather);
  // console.log(wind);
  // console.log(sys);
  // console.log(main);
  // console.log(coord);
  // console.log(clouds);

  let icon;
  switch (data.weather[0].main) {
    case 'Clouds':
        icon = <IoMdCloudy/>;
        break;

        case 'Rain':
        icon = <IoMdRainy/>;
        break;

        case 'Drizzle':
        icon = <BsCloudDrizzleFill/>;
        break;

        case 'Snow':
        icon = < IoMdSnow/>;
        break;

        case 'Thunderstorm':
        icon = <IoMdThunderstorm/>;
        break;

        case 'Haze':
        icon = < BsCloudHaze2Fill/>;
        break;

        case 'Clear':
        icon = < IoMdSunny/>;
        break;
  
    default:
        break;
  }
  
  const date = new Date();
  return (
    <>
 
      <div className='container'>
        <div className="weather">
            <form className='search'>
                <input onChange={handleInput}
                type="text" placeholder='Search by city or coutry' />
                <button onClick={handleubmit}
                ><IoMdSearch/> search</button>
            </form>

          

            <div className="result">
              {laoding ? (
                <div className="laod">
                  <div className="">
                  <ImSpinner8/>
                  </div>
                 </div>
              )  : (<>

      <div className="item">
                      <div className="icon">{icon}</div>
                      <div className="">
                          <div className="location">{data.name}, {data.sys.country}</div>

                          <div className="date">{date.getDate()}/{date.getMonth() + 1 }/{date.getFullYear()} </div>
                      </div>
                      
      </div>
      <div className="deg">
                  <h1 className="cel">{parseInt(data.main.temp)}<span><TbTemperatureCelsius/></span>
                  </h1>

                  <div className="sky">{data.weather[0].description}</div>
      </div>
      <div className="wind">
                  <div className="">
                  <div className=""><BsEye/> Visibility {data.wind.deg}Km</div>
                  <div className=""><BsWater/> Humidity {data.main.humidity}%</div>
                  </div>
                  <div className="">
                  <div className=""><BsThermometer/> Feels like {parseInt(data.main.feels_like)}°C</div>
                  <div className=""><BsWind/> Wind {parseInt(data.wind.speed)}m/s</div>
                  </div>

      </div>


</>)}
            
                
                
            </div>
        </div>
       
      </div>
    </>
  )
}

