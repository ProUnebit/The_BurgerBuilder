import React from 'react'
import classes from './Modal.css'
import Input from '../../../hoc/Input'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
    return (
        <Input>
            <Backdrop
                show = {props.show}
                clicked = {props.modalClosed}
                />
            <div
                className = {classes.Modal}
                style = {{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
                >{props.children}
            </div>
        </Input>
    )
}

export default modal;
