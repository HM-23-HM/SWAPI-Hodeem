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
            <div className='name-icon'><img src={Card} /></div>
                <p className='name'>{Name}</p>
            </div>
            <div className='details-block'>
                <div className='demographics'>
                    <div className="demographic-block">
                        <span>
                            <img src={GenderMale} />                            
                            <span className='value gender'>{Gender}</span>
                        </span>
                        <span className='value'>{Species}</span>
                    </div>
                </div>
                <div className="fields">
                    <div className="field">
                        <span className='label-block'>
                            <img className='icon' src={HomeworldIcon} />
                            <span className='label'>HOMEWORLD</span>
                        </span>

                        <span className='value'>{Homeworld}</span>
                    </div>
                    <div className="field">
                        <span className='label-block'>
                            <img className='icon' src={Vehicle} />
                            <span className='label'>VEHICLES</span>
                        </span>

                        <span className='value'>{NumVehicles}</span>
                    </div>
                    <div className="field">
                        <span className='label-block'>
                            <img className='icon' src={Starship} />
                            <span className='label'>STARSHIPS</span>
                        </span>

                        <span className='value'>{NumStarships}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SummaryCard;