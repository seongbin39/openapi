import React from 'react'
import './Button.css'

function Button({size, color, width, handleClick, children}) {
    return <button className={`Button ${size} ${color} ${width}`} onClick={handleClick}>{children}</button>
}

Button.defaultProps = {
    size: 'medium',
    color: 'tomato',
}

export default Button