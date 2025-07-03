const apiKey = "110fd0953649c149449f6583d2fc1529"; 

const cities = [
  { name: "Tokyo", country: "JP" },
  { name: "New York", country: "US" },
  { name: "London", country: "GB" },
  { name: "Paris", country: "FR" },
  { name: "Cairo", country: "EG" },
  { name: "Rio de Janeiro", country: "BR" },
  { name: "Sydney", country: "AU" },
  { name: "Cape Town", country: "ZA" }
];

document.addEventListener("DOMContentLoaded", () => {
  showBrisbaneTime();

  document.getElementById("get-forecast").addEventListener("click", async () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${randomCity.name},${randomCity.country}&appid=${apiKey}&units=metric`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();

      const localTime = getLocalTimeFromOffset(data.timezone);
      const output = `
        <strong>City:</strong> ${data.name}<br/>
        <strong>Temperature:</strong> ${data.main.temp}°C<br/>
        <strong>Weather:</strong> ${data.weather[0].description}<br/>
        <strong>Local Time:</strong> ${localTime}
      `;
      document.getElementById("weather-output").innerHTML = output;
    } catch (err) {
      document.getElementById("weather-output").textContent = "Failed to fetch weather.";
      console.error(err);
    }
  });
});

function showBrisbaneTime() {
  const brisbaneTime = new Intl.DateTimeFormat('en-AU', {
    timeZone: 'Australia/Brisbane',
    dateStyle: 'full',
    timeStyle: 'short'
  }).format(new Date());

  document.getElementById("brisbane-time").textContent = `Current time in Brisbane: ${brisbaneTime}`;
}

function getLocalTimeFromOffset(offsetInSeconds) {
  const nowUTC = new Date(new Date().toUTCString().slice(0, -4));
  const localTime = new Date(nowUTC.getTime() + offsetInSeconds * 1000);
  return localTime.toLocaleString();
}
