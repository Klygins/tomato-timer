import React from 'react'
import { Header, Icon } from 'semantic-ui-react'

const HeaderWithIcon = (props) => (
    <Header as='h1' textAlign='center'>
        <Icon name={props.iconName} />
        {props.text}
    </Header>
)

export default HeaderWithIcon