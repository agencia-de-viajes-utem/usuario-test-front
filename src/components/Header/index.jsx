import React from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";

function NavBar() {
    return (
        <Navbar
            expand="md"
            className="navbar-lighter"
            style={{ background: "#023047" }}
        >
            <div className="container-xl">
                <Navbar.Brand href="/">
                    <img
                        src = {`${import.meta.env.VITE_BUCKET_LOGO2}`}
                        alt="logo"
                        className="logo_header"
                    />
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="menu"
                    className="btn-colapse"
                />
                <Navbar.Collapse id="menu">
                    <Nav className="me-auto justify-content-center">
                        <Nav.Link
                            className="link-izq d-flex justify-content-center"
                            href="/nosotros"
                        >
                            <i className="bi bi-info-circle-fill"></i> Nosotros
                        </Nav.Link>
                        <Nav.Link
                            className="link-izq d-flex justify-content-center"
                            href="/faq"
                        >
                            <i className="bi bi-question-circle-fill"></i> FAQ
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavBar;