const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");
const icon0 = document.querySelector(".icon0 img");
const icon1 = document.querySelector(".icon1 img");
const icon2 = document.querySelector(".icon2 img");
const icon3 = document.querySelector(".icon3 img");
const icon4 = document.querySelector(".icon4 img");
const dan0 = document.querySelector(".dan0");
const dan1 = document.querySelector(".dan1");
const dan2 = document.querySelector(".dan2");
const dan3 = document.querySelector(".dan3");
const dan4 = document.querySelector(".dan4");
const weatherDiv0 = document.querySelector(".weather0");
const weatherDiv1 = document.querySelector(".weather1");
const weatherDiv2 = document.querySelector(".weather2");
const weatherDiv3 = document.querySelector(".weather3");
const weatherDiv4 = document.querySelector(".weather4");
const tempDiv0 = document.querySelector(".temp0");
const tempDiv1 = document.querySelector(".temp1");
const tempDiv2 = document.querySelector(".temp2");
const tempDiv3 = document.querySelector(".temp3");
const tempDiv4 = document.querySelector(".temp4");

const updateUI = (data) => {
  //destructuring properties

  const { cityInfo, weather, forecast } = data;
  console.log(forecast);
  details.innerHTML = `
    <h5 class="my-3">${cityInfo.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

  //update img and icon
  let iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  let timeSrc;
  // insert icons
  let forecastIcon0 = `img/icons/${forecast.DailyForecasts[0].Day.Icon}.svg`;
  icon0.setAttribute("src", forecastIcon0);
  let forecastIcon1 = `img/icons/${forecast.DailyForecasts[1].Day.Icon}.svg`;
  icon1.setAttribute("src", forecastIcon1);
  let forecastIcon2 = `img/icons/${forecast.DailyForecasts[2].Day.Icon}.svg`;
  icon2.setAttribute("src", forecastIcon2);
  let forecastIcon3 = `img/icons/${forecast.DailyForecasts[3].Day.Icon}.svg`;
  icon3.setAttribute("src", forecastIcon3);
  let forecastIcon4 = `img/icons/${forecast.DailyForecasts[4].Day.Icon}.svg`;
  icon4.setAttribute("src", forecastIcon4);

  //insert dates
  let forecastDan0 = new Date(forecast.DailyForecasts[0].Date);
  dan0.innerHTML = `${dateFns.format(forecastDan0, "DD MMM")}`;
  let forecastDan1 = new Date(forecast.DailyForecasts[1].Date);
  dan1.innerHTML = `${dateFns.format(forecastDan1, "DD MMM")}`;
  let forecastDan2 = new Date(forecast.DailyForecasts[2].Date);
  dan2.innerHTML = `${dateFns.format(forecastDan2, "DD MMM")}`;
  let forecastDan3 = new Date(forecast.DailyForecasts[3].Date);
  dan3.innerHTML = `${dateFns.format(forecastDan3, "DD MMM")}`;
  let forecastDan4 = new Date(forecast.DailyForecasts[4].Date);
  dan4.innerHTML = `${dateFns.format(forecastDan4, "DD MMM")}`;

  //insert weather
  let forecastWeather0 = forecast.DailyForecasts[0].Day.IconPhrase;
  weatherDiv0.innerHTML = `${forecastWeather0}`;
  let forecastWeather1 = forecast.DailyForecasts[1].Day.IconPhrase;
  weatherDiv1.innerHTML = `${forecastWeather1}`;
  let forecastWeather2 = forecast.DailyForecasts[2].Day.IconPhrase;
  weatherDiv2.innerHTML = `${forecastWeather2}`;
  let forecastWeather3 = forecast.DailyForecasts[3].Day.IconPhrase;
  weatherDiv3.innerHTML = `${forecastWeather3}`;
  let forecastWeather4 = forecast.DailyForecasts[4].Day.IconPhrase;
  weatherDiv4.innerHTML = `${forecastWeather4}`;

  //insert temp
  let forecastTemp0 = forecast.DailyForecasts[0].Temperature.Maximum.Value;
  tempDiv0.innerHTML = `<span>${forecastTemp0}</span><span>&deg;C</span>`;
  let forecastTemp1 = forecast.DailyForecasts[1].Temperature.Maximum.Value;
  tempDiv1.innerHTML = `<span>${forecastTemp1}</span><span>&deg;C</span>`;
  let forecastTemp2 = forecast.DailyForecasts[2].Temperature.Maximum.Value;
  tempDiv2.innerHTML = `<span>${forecastTemp2}</span><span>&deg;C</span>`;
  let forecastTemp3 = forecast.DailyForecasts[3].Temperature.Maximum.Value;
  tempDiv3.innerHTML = `<span>${forecastTemp3}</span><span>&deg;C</span>`;
  let forecastTemp4 = forecast.DailyForecasts[4].Temperature.Maximum.Value;
  tempDiv4.innerHTML = `<span>${forecastTemp4}</span><span>&deg;C</span>`;

  weather.IsDayTime ? (timeSrc = "img/day.svg") : (timeSrc = "img/night.svg");

  time.setAttribute("src", timeSrc);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityInfo = await getCity(city);
  const weather = await getWeather(cityInfo.Key);
  const forecast = await getForecast(cityInfo.Key);

  return { cityInfo, weather, forecast };
};

cityForm.addEventListener("submit", (e) => {
  // prevent reload
  e.preventDefault();
  // get City
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update html

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  localStorage.setItem("city", city);
});

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
