import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
import Chart from '../../UI/Chart/Chart'

const checkoutSummary = (props) => {

    return (
        <div className = {classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div className = {classes.burgerWrapper}>
                <Burger ingredients = {props.ingredients}/>
            </div>
            <Chart ingredients = {props.ingredients} />
            <Button
                btnType="Danger"
                clicked = {props.checkoutCancelled}
                >CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked = {props.checkoutContinued}
                >CONTINUE
            </Button>
        </div>
    )
}

export default checkoutSummary;
