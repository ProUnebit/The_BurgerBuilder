import React from 'react'
import { connect } from 'react-redux'
import Input from '../../hoc/Input/Input'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spiner/Spiner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        console.log(this.props)
        axios.get('https://my-burgerbuilder.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                });
            })
            .catch(err => {
                this.setState({
                    error: true
                });
            })
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }

    render () {

        let { purchasing, loading, error } = this.state;

        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ings) {
            burger =    (
                <Input>
                    <Burger ingredients = {this.props.ings}/>
                    <BuildControls
                        ingredientAdded = {this.props.onIngredientAdded}
                        ingredientRemoved = {this.props.onIngredientRemoved}
                        disabled = {disabledInfo}
                        purchasable = {this.updatePurchaseState(this.props.ings)}
                        ordered = {this.purchaseHandler}
                        price = {this.props.price}
                        />
                </Input>
            );

            orderSummary =      <OrderSummary
                                    ingredients = {this.props.ings}
                                    price = {this.props.price}
                                    purchaseCanceled = {this.purchaseCancelHandler}
                                    purchaseContinued = {this.purchaseContinueHandler}
                                    />;
        }
        if (loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Input>
                <Modal
                    show = {purchasing}
                    modalClosed = {this.purchaseCancelHandler}
                    >
                    {orderSummary}
                </Modal>
                {burger}
            </Input>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
