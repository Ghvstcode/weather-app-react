import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import axios from "axios";
import "./App.css";
import Clouds from "../assets/images/Clouds.jpg";
import Clear from "../assets/images/Clear.jpg";
import Sun from "../assets/images/Sun.jpg";
import Rain from "../assets/images/Rain.jpg";
import Mist from "../assets/images/Mist.jpg";
import SearchIcon from "../assets/images/search_icon.svg";
import CloudIcon from "../assets/images/cloud.svg";

const App = () => {
  const [location, setLocation] = useState("London");
  const [background, setBackground] = useState("Rain");
  const [weather, setWeather] = useState({
    description: "Rain",
    temprature: "16",
    pressure: "40",
    humidity: "40",
    speed: "40",
    city: "London",
  });

  useEffect(() => {
    const backgroundArray = [Rain, Clear, Clouds, Mist, Sun];
    const backgroundArrayStrings = backgroundArray.map((el) => {
      const split = el.split(".");
      const reSplit = split[0].split("/");
      return reSplit[1];
    });
    let backgroundIndex = backgroundArrayStrings.indexOf(weather.description);
    if (backgroundIndex < 0) {
      backgroundIndex = 4;
    }
    const backgroundImage = backgroundArray[backgroundIndex];
    setBackground(backgroundImage);
  }, [weather]);

  const getWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e511caac0334bace2eca889753293989&units=metric`;
    await axios.get(url).then(({ data }) => {
      setWeather({
        description: data.weather[0].main,
        temprature: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        speed: data.wind.speed,
        city: data.name,
      });
    });
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="Form">
        <div className="wrapper">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              getWeather();
            }}
          >
            <button className="Searchbtn_thing">
              <img
                alt="Clock"
                src={SearchIcon}
                style={{ height: 40, width: 60 }}
              />
            </button>
            <input
              className="input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <span className="underline-input"></span>
          </form>
          {/* <hr /> */}
          <div className="Form-weather_details">
            <p id="Form-weather_details_header"> Weather Details </p>
            <div className="Form-weather_details_main">
              <p>
                Pressure
                <span id="Form-weather_details_units">{weather.pressure}%</span>
              </p>
              <p>
                Humidity
                <span id="Form-weather_details_units">{weather.humidity}%</span>
              </p>
              <p>
                W.Speed
                <span id="Form-weather_details_units">{weather.speed}%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Box">
        <div className="weather_details">
          <p className="weather_details_degree">
            {weather.temprature} &deg;
            <span id="weather_details_city">{weather.city}</span>
            <p id="weather_details_date">Monday-12 sept 20</p>
          </p>
        </div>
        <div className="weather_description">
          <img
            alt="Weather description"
            src={CloudIcon}
            style={{ height: 30, width: 60 }}
          />
          <p>{weather.description}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
