import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter, showAll } from './reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        // input-kentän arvo muuttujassa event.target.value
        if (event.target.value.length === 0) {
            dispatch(showAll())
        } else {
            dispatch(setFilter(event.target.value))
        }
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

export default Filter