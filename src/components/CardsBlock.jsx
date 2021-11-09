import React from 'react'

import { useState } from 'react'
import SummaryCard from './SummaryCard'
import DetailCard from './DetailedCard'

import { connect } from 'react-redux'
import { toDetails } from '../lib/redux/actions'


const MapStateToProps = (state) => ({
    isDetailed: state.isDetailed
})

const mapDispatchToProps = {
    dispatchToDetails: (name) => toDetails(name)
};

const CardsBlock = (props) => {

    const [details, setDetails] = useState(undefined);

    return (
        <div className='cards-block'>
            {!props.isDetailed ? props.data.map((character) => (
                <div key={character.name} onClick={() => {
                    setDetails(character);
                    props.dispatchToDetails(character.name);
                }}>
                    <SummaryCard key={character.name} data={character} />
                </div>
            ))
                :
                <DetailCard data={details}/>
            }
        </div>
    )
}

export default connect(MapStateToProps, mapDispatchToProps)(CardsBlock);