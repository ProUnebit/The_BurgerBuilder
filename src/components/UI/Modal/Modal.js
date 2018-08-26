import React from 'react'
import classes from './Modal.css'
import Input from '../../../hoc/Input'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentWillUpdate() {
        console.log(1)
    }

    render() {

        return (
            <Input>
                <Backdrop
                    show = {this.props.show}
                    clicked = {this.props.modalClosed}
                    />
                <div
                    className = {classes.Modal}
                    style = {{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                    >{this.props.children}
                </div>
            </Input>
        )
    }
}

export default Modal;
