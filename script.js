const URL = "https://restcountries.com/v2/all";
const countryElement = document.querySelector(".countries");
const searchBar = document.getElementById("search-input");
// console.log(searchBar)

const dropDown = document.querySelector(".dropDown");
const dropDwonElement = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const moon = document.querySelector(".moon");
const toggle = document.querySelector(".toggle");

async function getCountries() {
  // const responce = await fetch("https://restcountries.com/v2/all");
  const responce = await fetch(URL);

  const data = await responce.json();
  console.log(data);
  data.forEach((element) => {
    displayCountries(element);
  });
}

function displayCountries(data) {
  const country = document.createElement("div");
  country.classList.add("country");

  country.innerHTML = `
  <div class="country-img">
    <img src="${data.flags.png}" alt="" loading="eager"/>
  </div>
  <div class="country-info">
    <h4 class="countryName">${data.name}</h4>
    <p  ><strong>Population : </strong>${data.population}</p>
    <p class="regionName"><strong>Region : </strong>${data.region}</p>
    <p><strong>Capital : </strong>${data.capital}</p>
  </div>`;

  countryElement.appendChild(country);
  country.addEventListener("click", () => {
    showCountryDetails(data);
  });
}

getCountries();

dropDown.addEventListener("click", () => {
  dropDwonElement.classList.toggle("showDropDown");
});

// searchBar.addEventListener("click", () => {
//   dropDwonElement.classList.toggle("showDropDown");
// });

const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");
region.forEach((element) => {
  element.addEventListener("click", () => {
    console.log(element);
    Array.from(regionName).forEach((elem) => {
      console.log(elem.innerText);
      if (
        elem.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        elem.parentElement.parentElement.style.display = "grid";
      } else {
        elem.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

searchBar.addEventListener("input", () => {
  // console.log(searchBar.value);
  Array.from(countryName).forEach((elem) => {
    console.log(elem.innerText.toLowerCase());
    if (elem.innerText.toLowerCase().includes(searchBar.value.toLowerCase())) {
      elem.parentElement.parentElement.style.display = "grid";
    } else {
      elem.parentElement.parentElement.style.display = "none";
    }
  });
});

const country = document.querySelectorAll(".country");

toggle.addEventListener("click", () => {
  moon.classList.toggle("fas");
  document.body.classList.toggle("dark");

  // dropDwonElement.style.backgroundColor = "hsl(209, 23%, 22%)";
});

const countryModal = document.querySelector(".countryModal");
const back = countryModal.querySelector(".back");
back.addEventListener("click", () => {
  countryModal.classList.toggle('active');
   
});
function showCountryDetails(data) {
  countryModal.classList.toggle("active");
  countryModal.innerHTML = `
      <button class="back">
      <i class="fa-solid fa-arrow-right fa-rotate-180"></i>
      Back
      </button>
    <div class="modal">
      <div class="left">
        <img src="${data.flags.png}" alt="" loading="eager" />
      </div>
      <div class="right">
        <h1>${data.name}</h1>
        <div class="info">
          <div class="innerLeft">
            <p><strong>Native Name : </strong>${data.nativeName}</p>
            <p><strong>Population : </strong>${data.population}</p>
            <p><strong>Region : </strong>${data.region}</p>
            <p><strong>Sub-region : </strong>${data.subregion}</p>
          </div>
          <div class="innerRight">
            <p><strong>Capital: </strong>${data.capital}</p>
            <p><strong>Top Level Domain : </strong>${data.topLevelDomain.map(elem => elem)}</p>
            <p><strong>Currencies : </strong>${data.currencies.map(elem => elem.name)}</p>
            <p><strong>Language : </strong>${data.languages.map(elem => elem.name)}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}


