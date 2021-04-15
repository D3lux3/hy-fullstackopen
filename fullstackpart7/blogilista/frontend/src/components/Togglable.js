import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button, } from '@material-ui/core/'
import  { AddCircle, RemoveCircle } from '@material-ui/icons'

const Togglable = React.forwardRef((props, ref) => {
  Togglable.displayName = 'Togglable'

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })


  const buttonStyle = {
    color: "inherit",
    padding: ".6rem 1rem",
    border: '3px solid #33332d',
    marginTop: 15,
    marginBottom: 15,
    boxShadow: "-3px 5px #33332d",
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} style={buttonStyle} color="inherit">{props.buttonLabel} <AddCircle style={{marginLeft: 5, color: "#20bf6b"}}/> </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} style={buttonStyle} color="inherit">cancel <RemoveCircle style={{marginLeft: 5, color: "#eb3b5a"}}/></Button>
      </div>
    </div>
  )
})


export default Togglable