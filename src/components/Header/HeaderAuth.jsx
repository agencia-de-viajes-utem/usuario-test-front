import React from "react";
import "./Header.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"; // Importa Link de react-router-dom

const HeaderAuth = () => {
    return (
        <Navbar
            expand="md"
            className="navbar-lighter"
            style={{ background: "#023047" }}
        >
            <div className="container-xl">
                <Link to="/">
                    <img
                        src={`${import.meta.env.VITE_BUCKET_LOGO}`}
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
                            className="link-izq d-flex justify-content-center"
                            to="/nosotros"
                        >
                            <i className="bi bi-info-circle-fill"></i> Nosotros
                        </Link>
                        <Link
                            className="link-izq d-flex justify-content-center"
                            to="/faq"
                        >
                            <i className="bi bi-question-circle-fill"></i> FAQ
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default HeaderAuth;
