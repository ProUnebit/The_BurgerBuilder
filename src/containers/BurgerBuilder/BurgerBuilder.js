import React from 'react'
import Input from '../../hoc/Input'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: {
                salad: 1,
                bacon: 1,
                cheese: 2,
                meat: 2
            }
        }
    }

    render () {

        let { ingredients } = this.state;

        return (
            <Input>
                <Burger ingredients = {ingredients}/>
                <div>Build Controls</div>
            </Input>
        )
    }
}

export default BurgerBuilder;
