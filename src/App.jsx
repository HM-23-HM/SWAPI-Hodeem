import { useState } from 'react'
import './App.css'

import CardsBlock from './components/CardsBlock'

import DataService from './lib/DataService'
import { sortAscending, sortDescending } from './lib/sort'

function App() {

    const [characterDetails, setCharacterDetails] = useState(
        [
            {
                name: 'Name',
                gender: 'n/a',
                species: 'Species',
                homeworld: 'Planet',
                vehicles: [],
                starships: []
            }
        ]
    )

    const handleError = (e) => {
        console.log("Error is ", e)
    }

    const extractAllRaw = () => {
        DataService.getAllData()
            .then(response => extractRelevantData(response.data.results))
            .catch(err => alert(err));
    }

    const extractRelevantData = (rawData) => {
        const relevantData = []

        rawData.forEach((character) => {
            let entry = {};
            const { name, gender, species, homeworld, vehicles, starships } = character;
            entry = { name, gender, species, homeworld, vehicles, starships };
            relevantData.push(entry)
        });

        getHomeworld(relevantData)

    }

    const getHomeworld = (relevantData) => {

        relevantData.forEach((character) => {
            let homeEndpoint = character.homeworld;

            DataService.getMissingData(homeEndpoint)
                .then(response => {
                    character.homeworld = response.data.name
                })
                .catch(err => alert(err));


        });

        getSpecies(relevantData);

    }

    const getSpecies = (relevantData) => {

        relevantData.forEach((character) => {
            let speciesEndpoint = character.species;

            if (speciesEndpoint.length === 0) {
                character.species = 'Human';
                return;
            }

            DataService.getMissingData(speciesEndpoint)
                .then(response => {
                    character.species = response.data.name
                })
                .catch(err => alert(err));
        });

        getStarshipsAndVehicles(relevantData)

    }

    const getStarshipsAndVehicles = (relevantData) => {

        relevantData.forEach((character) => {

            let starshipNames = [];

            let starshipEndpoints = character.starships;

            if (starshipEndpoints.length === 0) {
                character.starships = starshipNames;
                return;
            }

            starshipEndpoints.forEach((endpoint) => {

                DataService.getMissingData(endpoint)
                    .then(response => starshipNames.push(response.data.name))
                    .catch(err => alert(err));
            })



            character.starships = starshipNames;
        })

        relevantData.forEach((character) => {

            let vehicleNames = [];

            let vehicleEndpoints = character.vehicles;

            if (vehicleEndpoints.length === 0) {
                character.vehicles = vehicleNames;
                return;
            }

            vehicleEndpoints.forEach((endpoint) => {

                DataService.getMissingData(endpoint)
                    .then(response => vehicleNames.push(response.data.name))
                    .catch(err => alert(err));

            })

            character.vehicles = vehicleNames;
        })

        console.log("It's here ", relevantData);
        setCharacterDetails(relevantData);

    }

    const sortAsc = () => {
        setCharacterDetails(sortAscending(characterDetails))
    }

    const sortDesc = () => {
        setCharacterDetails(sortDescending(characterDetails))
    }


    return (
        <div className="App">
            <button onClick={() => extractAllRaw()}> Testing </button>
            <button onClick={() => sortAsc()}> Asc </button>
            <button onClick={() => sortDesc()}> Desc </button>

            <CardsBlock data={characterDetails} />
        </div>
    )
}

export default App
