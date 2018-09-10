import React from 'react';
import { Pie } from 'react-chartjs-2';
import classes from './Chart.css'

const chart = ({ ingredients }) => {

    let ingredientsKeys = Object.keys(ingredients)

    let ingredientsValues = ingredientsKeys.map(igKey => ingredients[igKey])

    let charData = {
        labels: ingredientsKeys,
        datasets: [
            {
                data: ingredientsValues,
                backgroundColor: [
                  "#bf3813",
                  "#f4d004",
                  "#7f3608",
                  "#228c1d"
                ]
            }
        ],
    }

    let options = {
        title: {
            display: true,
            position: 'right',
            padding: 30,
            text: 'Ingredients of your Burger',
            fontSize: 16,
            fontColor: 'gray'
        },
        legend: {
            display: true,
            position: 'left'
        }
    }

    return (
        <div className = {classes.Chart}>
            <Pie
            	data = {charData}
            	options = {options}
                />
        </div>
    )
}

export default chart;
