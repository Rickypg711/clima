"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaCloud, FaSun, FaCloudSun, FaCloudRain, FaSnowflake } from "react-icons/fa";

type WeatherData = {
  name?: string;
  main?: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather?: {
    main: string;
  }[];
  wind?: {
    speed: number;
  };
};


export default function Home() {
  const [data, setData] = useState<WeatherData>({});;
  const [location, setLocation] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");

  const apiKey = `87e455a72ede06909556a35b713e8890`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

  const unsplashAccessKey = `M0OH7D48h871fb0jVqbFy8qycRDrD6xC7zSSx6rObDY`;
  const unsplashUrl = `https://api.unsplash.com/search/photos?page=1&query=${location}&client_id=${unsplashAccessKey}`;

  useEffect(() => {
    getCurrentLocationWeather();
  }, []);

  

  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

      axios.get(weatherUrl).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLocation(response.data.name);

        axios.get(unsplashUrl).then((response) => {
          setBackgroundImage(response.data.results[0]?.urls.regular);
        });
      });
    });
  };

  const searchLocation = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLocation("");

        axios.get(unsplashUrl).then((response) => {
          setBackgroundImage(response.data.results[0].urls.regular);
        });
      });
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };
  // 
  const getWeatherIcon = (weatherCondition:any) => {
    switch (weatherCondition) {
      case "Clear":
        return <FaSun  className=' text-xl'/>;
      case "Clouds":
        return <FaCloud />;
      case "Drizzle":
      case "Rain":
        return <FaCloudRain />;
      case "Snow":
        return <FaSnowflake />;
      default:
        return <FaCloudSun/>;
    }
  };
  // 

  return (
    <div style={backgroundStyle} className=" h-screen">
      <main>
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

            {data.main ? <p>{data.main.temp.toFixed()}&deg;F</p> : null}
          </div>

          <div className="description ">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
            {data.weather && data.weather.length > 0 && (
    <p className=' text-2xl'>{getWeatherIcon(data.weather[0].main)}</p>
  )}
          {/* {getWeatherIcon(data.weather[0].main)} */}

          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom flex justify-evenly text-center  mx-4 my-auto p-4 border-3 bg-slate-50/50 rounded-3xl">
            <div className="feelsLike">
              <h2>Feels Like</h2>
              {data.main ? <p>{data.main.feels_like.toFixed()}&deg;F</p> : null}
            </div>
            <div className="humidity">
              <h2>Humidity</h2>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
            </div>
            <div className="wind">
              <h2>Wind Speed</h2>
              {data.main ? <p>{data.wind.speed.toFixed()}&deg;F</p> : null}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
