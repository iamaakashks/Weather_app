import React, { useEffect, useRef, useState } from 'react';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';
import { IoSearchOutline } from "react-icons/io5";

const Weather = ()=>{
    const inputRef = useRef();
    const [weatherdata, setWeatherdata] = useState(false);
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }
    const search = async (city)=>{
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
            const response = await fetch(url);
            const data = await response.json();
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherdata({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                location : data.name,
                temp: Math.round(data.main.temp),
                icon: icon
            })
            
        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        search("Mysuru");
    }, [])
    return (
        <div className="w-[320px] bg-zinc-900 text-zinc-50 rounded-md flex flex-col p-8">
            <div className="flex items-center justify-between">
                <input ref={inputRef} className="pl-3 py-1.5 text-xl font-medium outline-none rounded-full w-52 text-zinc-900" type="text" placeholder="Search" />
                <IoSearchOutline onClick={()=>search(inputRef.current.value)} className="font-medium cursor-pointer text-2xl bg-zinc-100 h-10 w-10 p-2 rounded-full text-zinc-900" />
            </div>
            <div className="flex justify-center items-center">
                <img src={weatherdata.icon} alt="" className="w-24 my-8"/>
            </div>
            <h1 className="flex justify-center items-center text-6xl">{weatherdata.temp}&deg;c</h1>
            <h4 className={`h-12 flex justify-center items-center text-2xl`}>{weatherdata.location}</h4>
            <div className="flex justify-between mt-6">
                <div className="flex gap-3 items-center">
                    <img src={humidity_icon} alt="" className="h-6" />
                    <div>
                        <h4>{weatherdata.humidity}%</h4>
                        <h4>Humidity</h4>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <img src={wind_icon} alt="" className="h-6"/>
                    <div>
                        <h4>{weatherdata.wind} km/h</h4>
                        <h4>Wind Speed</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Weather;