import React from 'react';

export default (props) => {
    console.log(props);
    const style = {
        left : `${props.snakeFood[0]}%`,
        top : `${props.snakeFood[1]}%`
    }
    return (
        <div className="snake-apple" style={style}></div>
    )
}