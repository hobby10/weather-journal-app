/* Global Variables */
let openWeatherMapBaseURL =
  "http://api.openweathermap.org/data/2.5/weather?zip=";

let apiKey = "&appid=e6ec9c6f7206c2d268a5df847e33673b";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

/* http requests helpers */
const postRequest = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    // Body data type must match "Content-Type" header
    body: JSON.stringify(data),
  });

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

const getRequest = async (url = "") => {
  const response = await fetch(url);
  try {
    // Transform into JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

document.getElementById("generate").addEventListener("click", () => {
  getRequest(
    openWeatherMapBaseURL + document.getElementById("zip").value + apiKey
  )
    .then((data) => {
      postRequest("/data", {
        temperature: data.main.temp,
        date: newDate,
        user_response: document.getElementById("feelings").value,
      });
    })
    .then(async (data) => {
      try {
        const data = await getRequest("/data");
        document.getElementById("date").innerText = data.temperature;
        document.getElementById("temp").innerText = data.date;
        document.getElementById("content").innerText = data.user_response;
      } catch (error) {
        console.log("error", error);
      }
    });
});
