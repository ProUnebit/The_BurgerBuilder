import React from 'react'
import Input from '../../hoc/Input'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component {
    render () {
        return (
            <Input>
                <Burger />
                <div>Build Controls</div>
            </Input>
        )
    }
}

export default BurgerBuilder;
