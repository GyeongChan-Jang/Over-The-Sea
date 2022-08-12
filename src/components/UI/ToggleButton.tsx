import React from 'react'

const ToggleButton = ({ toggleHandler }: any) => {
  return (
    <div>
      <div className="toggle">
        <label className="switch">
          <input type="checkbox" onClick={toggleHandler} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  )
}

export default ToggleButton
