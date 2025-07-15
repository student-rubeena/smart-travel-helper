// 
// 
import { useEffect, useState } from "react";
import CanvasWeather from "./CanvasWeather";
import ScrollSection from "./ScrollSection";

function App() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (location) {
      fetch(
       `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=d3ee94b58b3e1e1e1cd4369341a09d2c`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data));
    }
  }, [location]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-10 filter: blur(var(--blur-xs));"
      style={{
        backgroundImage: "url('https://plus.unsplash.com/premium_photo-1667933161757-dd2b0d7b9e0d?q=80&w=401&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="w-full max-w-5xl text-white text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold flex justify-center items-center gap-3">
          🌍 <span>Smart Travel Helper</span>
        </h1>
        
        {location && (
          <p className="text-lg italic flex justify-center items-center gap-1">
            📍 Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
          </p>
        )}

        {weather && weather.weather && weather.weather[0] && (
          <ScrollSection>
            <div className="text-2xl font-semibold text-white mt-4">
              {weather.weather[0].main === "Clouds" && "☁️ Clouds"}
              {weather.weather[0].main === "Clear" && "☀️ Clear"}
              {weather.weather[0].main === "Rain" && "🌧️ Rain"}
              {weather.weather[0].main === "Thunderstorm" && "🌩️ Thunderstorm"}
              {weather.weather[0].main === "Snow" && "❄️ Snow"}
              {weather.weather[0].main === "Drizzle" && "🌦️ Drizzle"}
              {weather.weather[0].main === "Mist" && "🌫️ Mist"}
              {!["Clouds", "Clear", "Rain", "Thunderstorm", "Snow", "Drizzle", "Mist"].includes(
                weather.weather[0].main
              ) && weather.weather[0].main}
            </div>

            {/* Responsive Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {/* Temperature Card */}
              <div className="bg-black/60 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold mb-2">🌡️ Temperature</div>
                <p className="text-xl text-white">{weather.main.temp}°C</p>
              </div>

              {/* Humidity Card */}
              <div className="bg-black/60 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold mb-2">💧 Humidity</div>
                <p className="text-xl text-white">{weather.main.humidity}%</p>
              </div>

              {/* Wind Card */}
              <div className="bg-black/60 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                <div className="text-3xl font-bold mb-2">💨 Wind</div>
                <p className="text-xl text-white">{weather.wind.speed} m/s</p>
              </div>
            </div>

            {/* Optional canvas animation */}
            <CanvasWeather weatherType={weather.weather[0].main} />
          </ScrollSection>
        )}
      </div>
    </div>
  );
}

export default App;