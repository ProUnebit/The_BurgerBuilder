import React from 'react';
import Input from '../Input/Input';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showSideDrawer: false
        }
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {

        let { showSideDrawer } = this.state;

        return (
            <Input>
                <Toolbar drawerToggleClicked = {this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open = {showSideDrawer}
                    closed = {this.sideDrawerClosedHandler}
                    />
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Input>
        )
    }
}

export default Layout;
