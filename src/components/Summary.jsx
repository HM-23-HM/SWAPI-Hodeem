import React from 'react'

import Card from '../icons/Card.svg'
import GenderFemale from '../icons/Gender-Female.svg'
import GenderMale from '../icons/Gender-Male.svg'
import HomeworldIcon from '../icons/Homeworld.svg'
import Starship from '../icons/Starship.svg'
import Vehicle from '../icons/Vehicle.svg'

const SummaryCard = ({ Name = 'Name', Gender = '19BBY', Species = 'Species', Homeworld = 'Planet', NumVehicles = 0, NumStarships = 0 }) => {

    return (
        <div className='card'>
            <div className='name-block'>
                <img src={Card} />
                <p>{Name}</p>
            </div>
            <div className='details-block'>
                <div className='demographics'>
                    <span>
                        <img src={GenderMale} />
                        <span>{Gender}</span>
                    </span>
                    <span>{Species}</span>
                </div>
                <div className="fields">
                    <div className="field">
                        <span>
                            <img src={HomeworldIcon} />
                            <span>HOMEWORLD</span>
                        </span>

                        <span>{Homeworld}</span>
                    </div>
                    <div className="field">
                        <span>
                            <img src={Vehicle} />
                            <span>VEHICLES</span>
                        </span>

                        <span>{NumVehicles}</span>
                    </div>
                    <div className="field">
                        <span>
                            <img src={Starship} />
                            <span>STARSHIPS</span>
                        </span>

                        <span>{NumStarships}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SummaryCard;