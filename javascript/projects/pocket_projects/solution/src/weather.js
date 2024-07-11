

//find the user's location
export const getWeather = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      pollWeather(lat, long);
    });
  }
  else {
    window.alert("Could not get location");
  }
};


export const pollWeather = (lat, lon) => {
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;

  const apiKey = 'f816d7f39052e3a98b21952097a43076';
  // This is our API key; please use your own!
  url += `&APPID=${apiKey}`;

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    //ready state of DONE means this is complete
    if (xmlhttp.status === 200 && xmlhttp.readyState === XMLHttpRequest.DONE) {
      const data = JSON.parse(xmlhttp.responseText);
      const degreesTag = document.querySelector('.degrees');
      const city = data.name;
      const fahrenheit = (data.main.temp - 273.15) * 1.8 + 32;
      degreesTag.innerHTML = `The weather in ${city} is ${fahrenheit.toFixed(1)} F`;
    }
  };

  xmlhttp.open('GET', url, true);
  xmlhttp.send();
};

getWeather();