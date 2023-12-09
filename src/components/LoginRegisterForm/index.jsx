import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ObtenerInfoPerfil } from '../../api/perfil';
import { Modal, Button } from 'react-bootstrap';
import { IoIosArrowBack } from "react-icons/io";
import './LoginRegister.css';

const LoginRegisterForm = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token, user, login, register } = useAuth();
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);

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
                const redirectURL = `${import.meta.env.VITE_FRONT_ADMIN}`;
                window.location.href = redirectURL;
            } else {
                const redirectURL = `${import.meta.env.VITE_FRONT_AGENDAMIENTO}`;
                window.location.href = redirectURL;
            }
        }
    }, [user, data]);

    const handleButtonClick = () => {
        setIsLoginView(!isLoginView);
    };

    const handleForgotPassword = () => {
        setIsForgotPasswordModalVisible(true);
    };

    const handleForgotPasswordEmailChange = (e) => {
        setForgotPasswordEmail(e.target.value);
    };

    const handleSendForgotPassword = async () => {
        try {
            // Aquí debes implementar la lógica para enviar el correo de recuperación de contraseña
            console.log('Enviar enlace de recuperación a:', forgotPasswordEmail);
            setIsForgotPasswordModalVisible(false);
        } catch (error) {
            setError(error.message);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => setShowModal(false);
    const handleCloseForgotPasswordModal = () => setIsForgotPasswordModalVisible(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

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

    // Modal para recuperación de contraseña
    const forgotPasswordModal = (
        <Modal show={isForgotPasswordModalVisible} onHide={handleCloseForgotPasswordModal}>
            <Modal.Header closeButton>
                <Modal.Title>Recuperación de Contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Por favor, ingresa tu correo electrónico para enviar el enlace de recuperación de contraseña.</p>
                <input
                    type="email"
                    className="form-control"
                    value={forgotPasswordEmail}
                    onChange={handleForgotPasswordEmailChange}
                    placeholder="Tu correo electrónico"
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseForgotPasswordModal}>
                    Cerrar
                </Button>
                <Button variant="primary" onClick={handleSendForgotPassword}>
                    Enviar
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <div className="login-register-container">
            <div className="login-register-card">
                {isLoginView ? (
                    <div className="d-flex">
                        <LoginForm
                            onLogin={handleLogin}
                            onChange={handleChange}
                            onViewRegister={() => setIsLoginView(false)}
                            onForgot={handleForgotPassword}
                            email={email}
                            password={password}
                        />
                        <img src={`${import.meta.env.VITE_BUCKET_LOGO}`} alt="Logo" />
                    </div>
                ) : (
                    <>
                        <div className="back-button-container" onClick={() => setIsLoginView(true)}>
                            <IoIosArrowBack />
                            <span>Atrás</span>
                        </div>
                        <div className="d-flex">
                            <img src={`${import.meta.env.VITE_BUCKET_LOGO}`} alt="Logo" />
                            <RegisterForm onRegister={handleRegister} />
                        </div>
                    </>
                )}
            </div>
            {forgotPasswordModal}
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
