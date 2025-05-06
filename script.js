const manualBtn = document.getElementById('manual-btn');
const geoBtn = document.getElementById('geo-btn');
const manualForm = document.getElementById('manual-form');
const geoForm = document.getElementById('geo-form');

const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('search-btn');
const getLocationBtn = document.getElementById('get-location-btn');

const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('time');
const cityTemp = document.getElementById('temp');
const cityCondition = document.getElementById('condition');

// Weather fetch function
async function fetchWeather(query) {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=d578a993838b4c068f970157250105&q=${query}&aqi=yes`);
  const data = await response.json();
  cityName.innerText = `Location: ${data.location.name}, ${data.location.region} - ${data.location.country}`;
  cityTime.innerText = `Time: ${data.location.localtime}`;
  cityTemp.innerText = `Temperature: ${data.current.temp_c}°C`;
  cityCondition.innerText = `Weather Status: ${data.current.condition.text}`;

}

// Toggle view
manualBtn.addEventListener('click', () => {
  manualForm.classList.remove('hidden');
  geoForm.classList.add('hidden');
  manualBtn.classList.add('active');
  geoBtn.classList.remove('active');
});

geoBtn.addEventListener('click', () => {
  manualForm.classList.add('hidden');
  geoForm.classList.remove('hidden');
  geoBtn.classList.add('active');
  manualBtn.classList.remove('active');
});

// Manual city search
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Geolocation-based search
getLocationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      fetchWeather(`${lat},${long}`);
    },
    () => {
      alert("Unable to retrieve your location.");
    }
  );
});
