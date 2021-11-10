import { useState } from 'react'

import '../styles/SplitButton.css'
import ChevronDown from '../icons/ChevronDown.svg'

function SplitButton({ data }) {
  const [sortBy, setSortBy] = useState('Homeworld')

  return (
    <div className='split-btn'>
      <button> {sortBy} </button>
      <div className='dropdown'>
        <button><img src={ChevronDown}/></button>
        {data ?
          <div className='dropdown-content'>
            {data.map((option) => (
              <a key={option} onClick={() => setSortBy(option)}> {option} </a>
            ))}
          </div>
          :
          <div className='dropdown-content'>
            <p>Blank</p>
          </div>
        }
      </div>
    </div>
  )
}

export default SplitButton;
