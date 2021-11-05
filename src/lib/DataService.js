import axios from "axios";

const swapiBase = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: {
    "Content-type": "application/json"
  }
});

const swapiBlankBase = axios.create({
  baseURL: "",
  headers: {
    "Content-type": "application/json"
  }
});


class DataService {

  getAllData() {
    return swapiBase.get(`people/`)
  }

  getMissingData( endpoint ) {
    return swapiBlankBase.get(`${endpoint}`)
  }

}

export default new DataService;