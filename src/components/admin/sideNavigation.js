import React from 'react';
import logo from "../../assets/mdb-react-small.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import './sideNavigation.css';

const TopNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <a href="#!" className="logo-wrapper waves-effect">
                <img alt="Logo" className="img-fluid" src={logo}/>
            </a>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/admin/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="tachometer-alt" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/organization" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user-tie" className="mr-3"/>
                        Organization
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/category" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3"/>
                        Category
                    </MDBListGroupItem>
                </NavLink>                
            </MDBListGroup>
        </div>
    );
}

export default TopNavigation;