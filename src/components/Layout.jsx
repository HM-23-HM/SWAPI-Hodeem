import { useState, useLayoutEffect } from 'react'

import DataService from '../lib/DataService'
import { removeUnecessaryFields, getHomeworld, getSpecies, getStarships } from '../lib/ETL'


import React from 'react'
import CardIcon from '../icons/Card.svg'
import DeckIcon from '../icons/Deck.svg'

import ChevronRight from '../icons/ChevronRight.svg'
import { connect } from 'react-redux'
import { toSummaries } from '../lib/redux/actions'

const mapStateToProps = (state) => ({
    nameOfDetailedPlayer: state.name
})

const mapDispatchToProps = {
    dispatchToSummaries: () => toSummaries()
};

const Layout = (props) => {

    const [characterDetails, setCharacterDetails] = useState(undefined);
    useLayoutEffect(() => { extractData(); }, []);

    const extractData = () => {
        DataService.getAllData()
            .then(response => removeUnecessaryFields(response.data.results))
            .then(response => getHomeworld(response))
            .then(response => getSpecies(response))
            .then(response => getStarships(response))
            .then(response => setCharacterDetails(response))
            .catch(err => console.log(err));
    };

    return (
        <div className="layout">
            <div className="top-btn-bar">
                <span className='top-btn-bar-left'>
                    <button className='btn-top' onClick={() => props.dispatchToSummaries() }>
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
                <span><img src={ChevronRight}/></span>
                <span>{props.nameOfDetailedPlayer}</span>
            </div>
            { props.children }
        </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);