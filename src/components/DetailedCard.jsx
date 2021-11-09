import React from 'react'

import Card from '../icons/Card.svg'
import GenderFemale from '../icons/Gender-Female.svg'

import GenderMale from '../icons/Gender-Male.svg'
import HomeworldIcon from '../icons/Homeworld.svg'
import Starship from '../icons/Starship.svg'

import Vehicle from '../icons/Vehicle.svg'
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    details: state.details
})

const DetailedCard = (props) => {

    return (
        <div className='detailed-card'>
            <div className='name-block'>
                <div className='name-icon'><img src={Card} /></div>
                <p className='name'>{props.details.name}</p>
            </div>
            <div className='details-block'>
                <div className='demographics'>
                    <div className="demographic-block">
                        <span>
                            {props.details.gender == 'male' ? <img src={GenderMale} /> : <img src={GenderFemale} />}
                            <span className='value gender'>{props.details.gender}</span>
                        </span>
                        <span className='value'>{props.details.species}</span>
                    </div>
                </div>
                <div className="fields">
                    <div className="field">
                        <span className='label-block'>
                            <img className='icon' src={HomeworldIcon} />
                            <span className='label'>HOMEWORLD</span>
                        </span>

                        <span className='value'>{props.details.homeworld}</span>
                    </div>
                    {props.details.vehicles.length !== 0 ?
                        <>
                            {props.details.vehicles.map((vehicle) =>
                            (
                                <div key={vehicle}className="field">
                                    <span className='label-block'>
                                        <img className='icon' src={Vehicle} />
                                        <span className='label'>VEHICLE</span>
                                    </span>

                                    <span className='value'>{vehicle}</span>
                                </div>))}
                        </>
                        :
                        <>

                            <div className="field">
                                <span className='label-block'>
                                    <img className='icon' src={Vehicle} />
                                    <span className='label'>VEHICLE</span>
                                </span>

                                <span className='value'>N/A</span>
                            </div>
                        </>}

                    {props.details.starships.length !== 0 ?
                        <>
                            {props.details.starships.map((starship) => (
                                <div key={starship} className="field">
                                    <span className='label-block'>
                                        <img className='icon' src={Starship} />
                                        <span className='label'>STARSHIP</span>
                                    </span>

                                    <span className='value'>{starship}</span>
                                </div>
                            ))}
                        </>
                        :
                        <>
                            <div className="field">
                                <span className='label-block'>
                                    <img className='icon' src={Starship} />
                                    <span className='label'>STARSHIP</span>
                                </span>

                                <span className='value'>N/A</span>
                            </div>
                        </>}

                </div>

            </div>
        </div>
    )
}


export default connect(mapStateToProps)(DetailedCard);