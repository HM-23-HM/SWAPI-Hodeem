import { useState } from 'react'
import './App.css'

import CardIcon from './icons/Card.svg'
import DeckIcon from './icons/Deck.svg'

import CardsBlock from './components/CardsBlock'

import DataService from './lib/DataService'

function App() {

    const [sortBy, setSortBy] = useState('homeworld');
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
    );

    const handleError = (e) => {
        console.log("Error is ", e)
    };

    const extractAllRaw = () => {
        DataService.getAllData()
            .then(response => transformRawData(response.data.results))
            .catch(err => alert(err));
    };

    const transformRawData = (rawData) => {
        const relevantData = []

        rawData.forEach((character) => {
            let entry = {};
            const { name, gender, species, homeworld, vehicles, starships } = character;
            entry = { name, gender, species, homeworld, vehicles, starships };
            relevantData.push(entry)
        });

        getHomeworld(relevantData)

    };

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

    };

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

    };

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

        setCharacterDetails(relevantData);

    };

    const AscendingCompareFn = (firstObject, secondObject) => {

        if (sortBy == 'homeworld') {
            var firstEl = firstObject.homeworld;
            var secondEl = secondObject.homeworld;
        }

        if (sortBy == 'vehicles') {
            var firstEl = firstObject.vehicles.length;
            var secondEl = secondObject.vehicles.length;
        }

        if (sortBy == 'starships') {
            var firstEl = firstObject.starships.length;
            var secondEl = secondObject.starships.length;
        }

        if (firstEl < secondEl) return -1;
        if (secondEl < firstEl) return 1;
        return 0;
    };

    const DescendingCompareFn = (firstObject, secondObject) => {

        if (sortBy == 'homeworld') {
            var firstEl = firstObject.homeworld;
            var secondEl = secondObject.homeworld;
        }

        if (sortBy == 'vehicles') {
            var firstEl = firstObject.vehicles.length;
            var secondEl = secondObject.vehicles.length;
        }

        if (sortBy == 'starships') {
            var firstEl = firstObject.starships.length;
            var secondEl = secondObject.starships.length;
        }

        if (firstEl > secondEl) return -1;
        if (secondEl < firstEl) return 1;
        return 0;
    };

    const sortAscending = (unsortedArray) => {
        let sortedArray = [...unsortedArray].sort(AscendingCompareFn);
        return sortedArray;
    };

    const sortDescending = (unsortedArray) => {
        let sortedArray = [...unsortedArray].sort(DescendingCompareFn);
        return sortedArray;
    };

    const setSortedAsc = () => {
        setCharacterDetails(sortAscending(characterDetails))
    };

    const setSortedDesc = () => {
        setCharacterDetails(sortDescending(characterDetails))
    };

    const handleSelectChange = (e) => {
        setSortBy(e.target.value);
    };


    return (
        <div className="App">
            <div className="top-block">
                <div className="top-btn-bar">
                    <span className='top-btn-bar-left'>
                        <button className='btn-top' onClick={() => extractAllRaw()}>
                            <img src={CardIcon} />
                            <span> All Cards </span>
                        </button>
                        <button className='btn-top' disabled>
                            <img src={DeckIcon} />
                            <span> Decks </span>
                        </button>
                    </span>

                    <button className='btn-top' disabled> Bavin Edwards </button>
                </div>

                <div id="route-bar">
                    <p>Enter dynamic route here</p>
                </div>
                <div id="search-bar">
                    <input type='text' placeholder='Search' id='search'/>
                </div>
                <div id="sort-bar">
                    <select id="sortBy" onChange={handleSelectChange}>
                        <option value="homeworld">Homeworld</option>
                        <option value="starships">Starships</option>
                        <option value="vehicles">Vehicles</option>
                    </select>

                    <button onClick={() => setSortedAsc()}> Asc </button>
                    <button onClick={() => setSortedDesc()}> Desc </button>
                </div>
            </div>


            <CardsBlock data={characterDetails} />
        </div>
    )
}

export default App
