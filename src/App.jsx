import { useState, useLayoutEffect } from 'react'
import './App.css'

import CardIcon from './icons/Card.svg'
import DeckIcon from './icons/Deck.svg'
import CardsBlock from './components/CardsBlock'

import DataService from './lib/DataService'
import { removeUnecessaryFields, getHomeworld, getSpecies, getStarshipsAndVehicles } from './lib/ETL'

import { BeatLoader } from 'react-spinners'

function App() {

    const [sortBy, setSortBy] = useState('homeworld');
    const [characterDetails, setCharacterDetails] = useState(undefined);

    useLayoutEffect(() => {
        extractData();
    }, []);

    const extractData = () => {
        DataService.getAllData()
            .then(response => removeUnecessaryFields(response.data.results))
            .then(response => getHomeworld(response))
            .then(response => getSpecies(response))
            .then(response => getStarshipsAndVehicles(response))
            .then(response => setCharacterDetails(response))
            .catch(err => console.log(err));
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

    const invokeSortAsc = () => {
        setCharacterDetails(sortAscending(characterDetails))
    };

    const invokeSortDesc = () => {
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
                        <button className='btn-top' onClick={() => extractData()}>
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
                    <input type='text' placeholder='Search' id='search' />
                </div>
                <div id="sort-bar">
                    <select id="sortBy" onChange={handleSelectChange}>
                        <option value="homeworld">Homeworld</option>
                        <option value="starships">Starships</option>
                        <option value="vehicles">Vehicles</option>
                    </select>

                    <button onClick={() => invokeSortAsc()}> Asc </button>
                    <button onClick={() => invokeSortDesc()}> Desc </button>
                </div>
            </div>
            {characterDetails ?
                <CardsBlock data={characterDetails} /> :
                <BeatLoader size={100} />
            }
        </div>
    )
}

export default App
