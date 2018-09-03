import React from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spiner/Spiner'
import classes from './ContactData.css'
import axios from '../../../axios-order'

class ContactData extends React.Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
                    loading: false
                })
                this.props.history.push('/')
            })
            .catch(err =>{
                this.setState({
                    loading: false
                })
            })
    }

    render () {

        let { loading } = this.state;

        let form = (
            <form>
                <input className = {classes.Input} type="text" name="name" placeholder="Your name"/>
                <input className = {classes.Input} type="text" name="email" placeholder="Your email"/>
                <input className = {classes.Input} type="text" name="street" placeholder="Street"/>
                <input className = {classes.Input} type="text" name="postal" placeholder="Postal Code"/>
                <Button
                    btnType="Success"
                    clicked = {this.orderHandler}
                    >ORDER
                </Button>
            </form>
        );
        if (loading) {
            form = <Spinner />
        }

        return (
            <div className = {classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;
