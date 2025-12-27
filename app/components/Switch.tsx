import React from 'react'
import './Switch.css'

type SwitchProps = {
  toggle: undefined | string ,
  onClick: () => void;
  onColor: string;
};

const Switch = ({ toggle, onClick, }: SwitchProps) => {
  return (
    <>
        <button 
            onClick={onClick}
            className={`relative w-12 h-6 rounded-full transition-colors duration-500 ease-in-out ${
              toggle === "light" ? 'bg-yellow-400' : 'bg-gray-700'
            }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-all duration-500 ease-in-out ${
              toggle === "light" ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
          <span
            className={`absolute inset-0 rounded-full blur-lg transition-opacity duration-500 ${
              toggle === "light" ? 'opacity-800 bg-yellow-400' : 'opacity-800 bg-gray-700'
            }`}
          />
        </button>
        {/* <label
            style={{background: toggle === "dark" ? onColor : "#242038" }}
            className='react-switch-label'
            htmlFor={`react-switch-new`}
        >
            <span className={`react-switch-button`} />
        </label> */}
    </>
  )
}

export default Switch