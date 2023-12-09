import React from "react";
import "./Header.css";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <Navbar
            expand="md"
            className="navbar-lighter"
            style={{ background: "#023047" }}
        >
            <div className="container-xl">
                <Link to="/" className="navbar-brand">
                    <img
                        src={import.meta.env.VITE_BUCKET_LOGO}
                        alt="logo"
                        className="logo_header"
                    />
                </Link>
                <Navbar.Toggle
                    aria-controls="menu"
                    className="btn-colapse"
                />
                <Navbar.Collapse id="menu">
                    <Nav className="me-auto justify-content-center">
                        <Link
                            className="link-izq d-flex justify-content-center nav-link"
                            to="/nosotros"
                        >
                            <i className="bi bi-info-circle-fill"></i> Nosotros
                        </Link>
                        <Link
                            className="link-izq d-flex justify-content-center nav-link"
                            to="/faq"
                        >
                            <i className="bi bi-question-circle-fill"></i> FAQ
                        </Link>
                    </Nav>
                    <Nav>
                        <Link to="/" className="nav-link mx-auto">
                            <Button variant="outline-light">Ingresar</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavBar;
