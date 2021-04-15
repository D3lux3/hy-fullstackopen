import React from 'react';

const Filterform = (props) => {
    return (
        <div>
            filter shown with <input onChange={props.handle} />
        </div>
    )
}

export default Filterform;