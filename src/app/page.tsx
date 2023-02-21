"use client";
import { useState, useEffect } from "react";
import { IoMdPartlySunny } from "react-icons/io";
import axios from "axios";

export default function Home() {


  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const apiKey = `87e455a72ede06909556a35b713e8890`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const searchLocation = (event: any) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLocation("");
      });
    }
  };

  useEffect(() => {
    const unsplashAccessKey = `M0OH7D48h871fb0jVqbFy8qycRDrD6xC7zSSx6rObDY`;
    const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=${unsplashAccessKey}`;
    
    
    axios.get(unsplashUrl).then((response) => {
      setBackgroundImage(response.data.results[0].urls.regular);
    });
  
  }, [location]);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  return (
    <div   style={backgroundStyle} className=' h-screen'>
      <main >
        <div className="top w-full">
          <div className="title text-center items-center py-7">
            <h1 className="text-7xl text-orange-600">ClimApp</h1>
          </div>
          <div className="text-center p-2">
            <input
              id="input"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter Location"
              onKeyUp={searchLocation}
              className="px-4 py-2 border border-orange-400 rounded-xl focus:outline-none focus:ring focus:border-blue-300 text-center"
              type="text"
            />
          </div>
          <div className=" items-center text-center">
            <p className="text-4xl">{data.name}</p>

            {data.main ? <p>{data.main.temp}</p> : null}
          </div>

          <div className="description ">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        <div className="bottom flex justify-evenly text-center  mx-4 my-auto p-4 border-3 bg-slate-50/50 rounded-3xl">
          <div className="feelsLike">
            <h2>Feels Like</h2>
            {data.main ? <p>{data.main.feels_like}&deg;F</p> : null}
          </div>
          <div className="humidity">
            <h2>Humidity</h2>
            {data.main ? <p>{data.main.humidity}%</p> : null}
          </div>
          <div className="wind">
            <h2>Wind Speed</h2>
            {data.main ? <p>{data.wind.speed}&deg;F</p> : null}
          </div>
        </div>
      </main>
    </div>
  );
}
