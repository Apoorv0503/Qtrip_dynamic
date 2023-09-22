import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
  // console.log("From init()");
  // console.log(config.backendEndpoint + "/cities");
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const cities = await response.json();
    console.log(cities);
    return cities;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {

  // console.log("id",id,"city",city);
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  //-----basic approach mine using DOM
  //----for creating <div class="col-sm-6 col-lg-3 mb-4"></div>
  let myDiv = document.createElement("div");
  myDiv.setAttribute("class", "col-lg-3 col-md-6 col-sm-6 mb-4");

  // ----for <a href="pages/adventures/"></a>
  // let anchor = document.createElement("a");
  // anchor.setAttribute("href", "pages/adventures/");

  //---for <div class="tile"></div>
  // let myDivTile = document.createElement("div");
  // myDivTile.setAttribute("class", "tile");

  // myDiv.append(anchor);
  // anchor.append(myDivTile);

  //--------- direct html added

let main = document.getElementById("data");

myDiv.innerHTML = `
<a href="pages/adventures/?city=${id}" id="${id}">
<div class="tile">
<img class="card-img" src=${image} />
<div class="tile-text text-center">
  <h5>${city}</h5>
  <p>${description}</p>
</div>
</div>
</a>
`;

main.append(myDiv);

  //---for the reference of my html code
  /* <div class="row">
  <div class="col-lg-3 col-md-6 col-sm-6 mb-4">
          <a href="./pages/adventures/index.html">
            <div class="tile">
              <img class="card-img" src="./assets/bengaluru.jpg" />
              <div class="tile-text text-center">
                <h5>Bengaluru</h5>
                <p>100+ places</p>
              </div>
            </div>
          </a>
        </div> 
        ---
        ---
        ---
  </div>*/
}

export { init, fetchCities, addCityToDOM };
