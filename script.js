const apikey = "0db69f352206f6cee5ed9030b876e143"; // go to openweathermap -> sign up-> my api-> go to API section in new tab and scroll down -> current weather data-> api doc->Built-in API request by city name->first link->give the city and api key copied->add &units=metric with the link in order to change the vales to celcius
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// here q= denotes the city we enter
const searchBox = document.querySelector(".search input");
// here "searchBox" means whenever we search a city name which is in the input box so we are calling by the class name "search"
const searchBtn = document.querySelector(".search button");
// here "searchBtn" means whenever we click the button which is in the input box so we are calling by the class name "search"
const weatherIcon = document.querySelector(".weather-icon");
// creating a variable for weather icon

async function checkWeather(city) {
  // this async function is used while using api's async makes a function return a Promise await makes a function wait for a Promise
  // here "city" is passed as arguments into the checkweather function for each time we enter a random city it fetches from the api
  const response = await fetch(apiUrl + city + `&appid=${apikey}`); // here it combines both the apikey as well as api url we got
  var data = await response.json();
  // if the status from console is getting errorcode 404 then its a error so we are displaying this as a response
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none"; // used to not display the weather informaton
  }
  // ths means when the errorcode is not 404 then else block will execute
  else {
    // "document.querySelector" is used when we target a class and innerHTML is used to update the data coming from the api by replacing the old data with new data
    // here these below "document.querySelector" tags are used to access the inputs from JSON file coming from our api
    // moreover the files in JSON is already in string format so we are adding the strings with another strings using "+"
    document.querySelector(".city").innerHTML = data.name;
    // Math.round()nis used to round it intoa whole number
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C"; //here when we look into console the temp is inside main so we are calling it from main using "." likewise for all the required
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./images/rain.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "./images/clear.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "./images/snow.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./images/drizzle.png";
    } else {
      weatherIcon.src = "./images/mist.png";
    }
    // this is used in order to display the details of the city once the city is enterted because previously we have blocked it using css in order to realese that
    document.querySelector(".weather").style.display = "block";
    //here this is used because after entering a wrong city the invalid msg should go and when we type the city name it should not display the error message
    document.querySelector(".error").style.display = "none";
  }
}
// here we are using "addEventListener" which basically tells what will happen when we click on the button
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value); // here we are passing the value of the input box into the searchbox
});
