import React from 'react'
import { Button } from 'semantic-ui-react'

const ToggleButton = (props) => (
  <div>
    <Button positive>{props.text}</Button>
  </div>
)

export default ToggleButton
