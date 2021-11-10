import React from 'react'

import { useState, useLayoutEffect } from 'react'
import './App.css'

import CardsBlock from './components/CardsBlock'
import DataService from './lib/DataService'

import { removeUnecessaryFields, getHomeworlds, getSpecies, getStarships, getVehicles } from './lib/ETL'
import { BeatLoader } from 'react-spinners'
import { connect } from 'react-redux'
import { toSummaries } from './lib/redux/actions'

import CardIcon from './icons/Card.svg'
import DeckIcon from './icons/Deck.svg'
import ChevronRight from './icons/ChevronRight.svg'

import ChevronDown from './icons/ChevronDown.svg'

const mapStateToProps = (state) => ({
    nameOfDetailedPlayer: state.name
})

const mapDispatchToProps = {
    dispatchToSummaries: () => toSummaries()
};

const App = (props) => {

    const [sortBy, setSortBy] = useState('Homeworld');
    const [allCharactersDetails, setCharacterDetails] = useState(undefined);

    useLayoutEffect(() => {
        extractData();
    }, []);

    /** This function extracts all of the unaltered data from the SWAPI API, transforms it and populates the
     *  card block.
     */
    const extractData = () => {
        DataService.getAllData()
            .then(response => removeUnecessaryFields(response.data.results))
            .then(response => getHomeworlds(response))
            .then(response => getSpecies(response))
            .then(response => getStarships(response))
            .then(response => getVehicles(response))
            .then(results => setCharacterDetails(results))
            .catch(err => console.log(err));

    };

    /** This is a custom compare function to be used by the Array.sort() method when sorting the cards in ascending 
     *  order.
     * @param {Object} firstObject      This is the first parameter used by the Array.sort() method when invoked.
     * @param {Object} secondObject     This is the second parameter used by the Array.sort() method when invoked.
     * @return {Number}                 The number which determines the order of placement of the two arguments.
     */
    const AscendingCompareFn = (firstObject, secondObject) => {

        if (sortBy == 'Homeworld') {
            var firstEl = firstObject.homeworld;
            var secondEl = secondObject.homeworld;
        }

        if (sortBy == 'Vehicles') {
            var firstEl = firstObject.vehicles.length;
            var secondEl = secondObject.vehicles.length;
        }

        if (sortBy == 'Starships') {
            var firstEl = firstObject.starships.length;
            var secondEl = secondObject.starships.length;
        }

        if (firstEl < secondEl) return -1;
        if (secondEl < firstEl) return 1;
        return 0;
    };

    /** This is a custom compare function to be used by the Array.sort() method when sorting the cards in 
     * descending order.
     * @param {Object} firstObject      This is the first parameter used by the Array.sort() method when invoked.
     * @param {Object} secondObject     This is the second parameter used by the Array.sort() method when invoked.
     * @return {Number}                 The number which determines the order of placement of the two arguments. 
     */
    const DescendingCompareFn = (firstObject, secondObject) => {

        if (sortBy == 'Homeworld') {
            var firstEl = firstObject.homeworld;
            var secondEl = secondObject.homeworld;
        }

        if (sortBy == 'Vehicles') {
            var firstEl = firstObject.vehicles.length;
            var secondEl = secondObject.vehicles.length;
        }

        if (sortBy == 'Starships') {
            var firstEl = firstObject.starships.length;
            var secondEl = secondObject.starships.length;
        }

        if (firstEl > secondEl) return -1;
        if (secondEl < firstEl) return 1;
        return 0;
    };

    /** This functions receives an unsorted array of cards and returns it sorted in ascending order.
     * @param {Array} unsortedArray     The unsorted array of cards.
     * @return {Array}                  The array sorted in ascending order.
     */
    const sortAscending = (unsortedArray) => {
        let sortedArray = [...unsortedArray].sort(AscendingCompareFn);
        return sortedArray;
    };

    /** This function receives an unsorted array of cards an returns it sorted in descending order.
     * @param {Array} unsortedArray     The unsorted array of cards.
     * @return {Array}                  The array sorted in descending order.
     */
    const sortDescending = (unsortedArray) => {
        let sortedArray = [...unsortedArray].sort(DescendingCompareFn);
        return sortedArray;
    };

    return (
        <div>
            <div id='before-search'>
                <div id="top-btn-bar">
                    <span id='top-btn-bar-left'>
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

            <div id='search-and-sort'>
                <input type='text' placeholder='Search' id='search' />

                <div id="sort-bar">
                    <span>Sort By: </span>
                    <div className='split-btn'>
                        <button> {sortBy} </button>
                        <div className='dropdown'>
                            <button><img src={ChevronDown} /></button>
                            <div className='dropdown-content'>
                                <a onClick={() => setSortBy('Homeworld')}> Homeworld </a>
                                <a onClick={() => setSortBy('Vehicles')}> Vehicles</a>
                                <a onClick={() => setSortBy('Starships')}> Starships </a>
                            </div>
                        </div>
                    </div>

                    <span id='sort-btn-group'>
                        <button onClick={() => setCharacterDetails(sortAscending(allCharactersDetails))}> ASC </button>
                        <button onClick={() => setCharacterDetails(sortDescending(allCharactersDetails))}> DESC </button>
                    </span>
                </div>

            </div>

            {!allCharactersDetails ?
                <BeatLoader size={100} /> :
                <CardsBlock data={allCharactersDetails} />
            }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
