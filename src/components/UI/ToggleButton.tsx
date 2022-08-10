import React from 'react'

const ToggleButton = ({ toggleHandler }: any) => {
  return (
    <div>
      <div className="toggle" onClick={toggleHandler}>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  )
}

export default ToggleButton
