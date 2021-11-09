import React from 'react'

import { useState, useLayoutEffect } from 'react'
import './App.css'

import CardsBlock from './components/CardsBlock'
import DataService from './lib/DataService'

import { removeUnecessaryFields, getHomeworld, getSpecies, getStarships, getVehicles } from './lib/ETL'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toSummaries } from './lib/redux/actions'

import CardIcon from './icons/Card.svg'
import DeckIcon from './icons/Deck.svg'
import ChevronRight from './icons/ChevronRight.svg'

const mapStateToProps = (state) => ({
    nameOfDetailedPlayer: state.name
})

const mapDispatchToProps = {
    dispatchToSummaries: () => toSummaries()
};

const App = (props) => {

    const [sortBy, setSortBy] = useState('homeworld');
    const [allCharactersDetails, setCharacterDetails] = useState(undefined);

    useLayoutEffect(() => {
        extractData();
    }, []);

    const extractData = () => {
        DataService.getAllData()
            .then(response => removeUnecessaryFields(response.data.results))
            .then(response => getHomeworld(response))
            .then(response => getSpecies(response))
            .then(response => getStarships(response))
            .then(response => getVehicles(response))
            .then(results => setCharacterDetails(results))
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
        setCharacterDetails(sortAscending(allCharactersDetails))
    };

    const invokeSortDesc = () => {
        setCharacterDetails(sortDescending(allCharactersDetails))
    };

    const handleSelectChange = (e) => {
        setSortBy(e.target.value);
    };

    return (
        <div className="App">
            <div className='layout'>
                <div className="top-btn-bar">
                    <span className='top-btn-bar-left'>
                        <button className='btn-top' onClick={() => props.dispatchToSummaries()}>
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
                    <span>All Cards </span>
                    <span><img src={ChevronRight} /></span>
                    <span>{props.nameOfDetailedPlayer}</span>
                </div>
            </div>

            <div id="search-bar">
                <input type='text' placeholder='Search' id='search' />
            </div>

            <div id="sort-bar">
                <span>Sort By: </span>

                <select id="sortBy" onChange={handleSelectChange}>
                    <option value="homeworld">Homeworld</option>
                    <option value="starships">Starships</option>
                    <option value="vehicles">Vehicles</option>
                </select>
                <span id='sort-btn-group'>
                    <button onClick={() => invokeSortAsc()}> ASC </button>
                    <button onClick={() => invokeSortDesc()}> DESC </button>
                </span>
            </div>

            {!allCharactersDetails ?
                <BeatLoader size={100} /> :
                <CardsBlock data={allCharactersDetails} />
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
