import React from 'react'

import Card from '../icons/Card.svg'
import GenderFemale from '../icons/Gender-Female.svg'
import GenderMale from '../icons/Gender-Male.svg'
import HomeworldIcon from '../icons/Homeworld.svg'
import Starship from '../icons/Starship.svg'
import Vehicle from '../icons/Vehicle.svg'

const DetailCard = ({ data }) => {

    const numVehicles = data.vehicles.length;
    const numStarships = data.starships.length;

    return (
        <div className='card'>
            <div className='name-block'>
                <div className='name-icon'><img src={Card} /></div>
                <p className='name'>{data.name}</p>
            </div>
            <div className='details-block'>
                <div className='demographics'>
                    <div className="demographic-block">
                        <span>
                            <img src={GenderMale} />
                            <span className='value gender'>{data.gender}</span>
                        </span>
                        <span className='value'>{data.species}</span>
                    </div>
                </div>
                <div className="fields">
                    <div className="field">
                        <span className='label-block'>
                            <img className='icon' src={HomeworldIcon} />
                            <span className='label'>HOMEWORLD111</span>
                        </span>

                        <span className='value'>{data.homeworld}</span>
                    </div>
                    <div className="field">
                        <span className='label-block'>
                            <img className='icon' src={Vehicle} />
                            <span className='label'>VEHICLES</span>
                        </span>

                        <span className='value'>{numVehicles}</span>
                    </div>
                    <div className="field">
                        <span className='label-block'>
                            <img className='icon' src={Starship} />
                            <span className='label'>STARSHIPS</span>
                        </span>

                        <span className='value'>{numStarships}</span>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default DetailCard;