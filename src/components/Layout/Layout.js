import React from 'react';
import Input from '../../hoc/Input';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => {
    return (
        <Input>
            <Toolbar />
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Input>
    )
}

export default layout;
