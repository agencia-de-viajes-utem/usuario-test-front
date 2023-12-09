import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './LoginRegisterForm.css';
import { ObtenerInfoPerfil } from '../../api/perfil';
import { Modal, Button } from 'react-bootstrap';



const LoginRegisterForm = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState(`${import.meta.env.VITE_USER_TEST}`);
    const [password, setPassword] = useState(`${import.meta.env.VITE_PASS_TEST}`);
    const { token, user, login, register } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState(''); // Estado para manejar el mensaje de error
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (token) {
            ObtenerInfoPerfil(token).then(userData => {
                setData(userData);
            });
        }
    }, [token]);

    useEffect(() => {
        if (data && user) {
            if (data.Rol === 'admin') {
                const redirectURL = `${import.meta.env.VITE_FRONT_ADMIN}`
                window.location.href = redirectURL;
            } else {
                const redirectURL = `${import.meta.env.VITE_FRONT_AGENDAMIENTO}`
                window.location.href = redirectURL;
            }
        }
    }, [user, data]);

    const handleButtonClick = () => {
        setIsLoginView(!isLoginView);
    };

 
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password'){
            setPassword(value);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (error) {
            setError(error.message);
            setShowModal(true);
        }
    };

    const handleRegister = async (userData) => {
        try {
            await register(userData);
        } catch (error) {
            setError(error.message);
            setShowModal(true);
        }
    };

    return (
        <div className="login-register-container">
            <div className="login-register-card">
                <div className="slide-button-container">
                    <button
                        className={`slide-button ${isLoginView ? 'active' : ''}`}
                        onClick={handleButtonClick}
                    >
                        Login
                    </button>
                    <button
                        className={`slide-button ${!isLoginView ? 'active' : ''}`}
                        onClick={handleButtonClick}
                    >
                        Signup
                    </button>
                </div>
                {isLoginView ? (
                    <LoginForm onLogin={handleLogin} onChange={handleChange} email={email} password={password} />
                ) : (
                    <RegisterForm onRegister={handleRegister} />
                )}
                
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{error}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default LoginRegisterForm;
