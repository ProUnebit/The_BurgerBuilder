import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key = {igKey + '-' + index} type = {igKey}/>;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p><span role="img" aria-label="ingredients">🥦🥓 </span> Please start adding ingredients <span role="img" aria-label="ingredients"> 🥩🧀</span></p>;
    }

    return (
        <div className = {classes.Burger}>
            <BurgerIngredient type = "bread-top" />
                {transformedIngredients}
            <BurgerIngredient type = "bread-bottom" />
        </div>
    )
}

export default burger;
