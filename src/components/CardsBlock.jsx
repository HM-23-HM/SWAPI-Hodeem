import React from 'react'

import SummaryCard from './SummaryCard'
import DetailCard from './DetailedCard'

import { connect } from 'react-redux'
import { toDetails } from '../lib/redux/actions'


const MapStateToProps = (state) => ({
    isDetailed: state.isDetailed
})

const mapDispatchToProps = {
    dispatchToDetails: (name, details) => toDetails(name, details)
};

const CardsBlock = (props) => {

    return (
        <div className='cards-block'>
            {!props.isDetailed ? props.data.map((character) => (
                <div key={character.name} onClick={() => {
                    props.dispatchToDetails(character.name, character);
                }}>
                    <SummaryCard key={character.name} data={character} />
                </div>
            ))
                :
                <DetailCard />
            }
        </div>
    )
}

export default connect(MapStateToProps, mapDispatchToProps)(CardsBlock);