import React from 'react'
import Input from '../../hoc/Input/Input'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spiner/Spiner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
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

            this.setState({
                purchasable: sum > 0
            });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCounted = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        })
        this.updatePurchaseState(updateIngredients)
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCounted = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredients
        })
        this.updatePurchaseState(updateIngredients)
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

        this.setState({
            loading: true
        })

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Alex R.',
                address: {
                    street: 'TestStreet 1',
                    zipCode: '23453',
                    country: 'Russia'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order)
            .then(res => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
            .catch(err =>{
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
    }

    render () {

        let { ingredients, totalPrice, purchasable, purchasing, loading, error } = this.state;

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (ingredients) {
            burger =    (
                <Input>
                    <Burger ingredients = {ingredients}/>
                    <BuildControls
                        ingredientAdded = {this.addIngredientHandler}
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabled = {disabledInfo}
                        purchasable = {purchasable}
                        ordered = {this.purchaseHandler}
                        price = {totalPrice}
                        />
                </Input>
            );

            orderSummary =      <OrderSummary
                                    ingredients = {ingredients}
                                    price = {totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
