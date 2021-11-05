import React from 'react'
import SummaryCard from './Summary'

const CardsBlock = ({ data }) => {

    return(
        <div className='cards-block'>
            {data.map((character) => (
                <SummaryCard key={character.name} data={character}/>
            ))}
        </div>
    )
}

export default CardsBlock;