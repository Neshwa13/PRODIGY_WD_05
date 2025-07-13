const apiKey = 'ebcd3b9f53f182d10b88114e922c5b74'; // Replace this with your API key

function getWeather() {
  const city = document.getElementById('cityInput').value;
  const resultDiv = document.getElementById('weatherResult');

  if (!city) {
    resultDiv.innerHTML = "<p>? Please enter a city name.</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const iconCode = data.weather[0].icon;
      const weatherHTML = `
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">
        <h2>${data.name}, ${data.sys.country}</h2>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].main}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      `;
      resultDiv.innerHTML = weatherHTML;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>? ${error.message}</p>`;
    });
}
