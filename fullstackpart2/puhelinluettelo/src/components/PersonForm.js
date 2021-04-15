import React from 'react';

const PersonForm = (props) => {

    return (
        <form>
            <div>
                name: <input onChange={props.handleChange} />
            </div>
            <div>
                number: <input onChange={props.handleInput} /> </div>
            <div>
                <button onClick={props.buttonHandler} type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm;