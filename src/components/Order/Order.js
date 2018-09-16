import React from 'react'
import classes from './Order.css'

const order = (props) => {

    const ingredients = [];

    let textColor;

    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        })
    }

    const ingredientOutput = ingredients.map(ig => {

        switch (ig.name) {
            case 'bacon': textColor = '#bf3813';
            break;
                case 'cheese': textColor = '#d6bb22';
                break;
                    case 'meat': textColor = '#702e05';
                    break;
                        case 'salad': textColor = '#228c1d';
                        break;
            default: textColor = '#222';
        }

        if (ig.amount === 0) return null;

        return <span
            style = {{
                color: textColor,
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key = {ig.name}
            >{ig.name} ({ig.amount})
        </span>
    })

    return (
        <div className = {classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}
export default order;
