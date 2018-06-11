import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavbarToggler, Nav, Collapse, NavItem, NavLink} from 'reactstrap';

import {Link} from "react-router-dom";

class PreciousNavbar extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {

        return (
            <Navbar color="white" light expand="md">

                <NavbarBrand href="/">precious electricity</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>


                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        <NavItem>
                            <Link to="/simulation" className="nav-link">Simulation</Link>
                        </NavItem>

                        <NavItem>
                            <Link to="/18650" className="nav-link">18650</Link>
                        </NavItem>
                    </Nav>
                </Collapse>

            </Navbar>

        )
    }

}

export default PreciousNavbar