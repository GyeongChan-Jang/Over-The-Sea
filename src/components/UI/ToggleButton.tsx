import React from 'react'

const ToggleButton = () => {
  return (
    <div>
      <div className="toggle">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  )
}

export default ToggleButton
