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
            className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${
              toggle === "light" ? 'opacity-100 bg-amber-500' : 'opacity-100 bg-gray-100'
            }`}
          />
          <span
            className={`absolute inset-0 rounded-full blur-lg transition-opacity duration-500 ${
              toggle === "light" ? 'opacity-80 bg-yellow-300' : 'opacity-80 bg-gray-600'
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