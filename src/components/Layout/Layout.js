import React from 'react';
import Input from '../../hoc/Input';
import classes from './Layout.css';

const layout = (props) => {
    return (
        <Input>
            <div>
            Toolbar, sidedrawer, backdrop
            </div>
            <main className = {classes.Content}>
                {props.children}
            </main>
        </Input>
    )
}

export default layout;
