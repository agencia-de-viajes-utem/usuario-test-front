import React, { useState, useEffect } from 'react';
import UserProfileDisplay from './UserProfileDisplay';
import { Spinner } from 'react-bootstrap';
import './UserProfile.css';

const UserProfile = ({ user, onUserUpdate, onUploadImg, onLogout }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const { Rol, ...userData } = user;
            setData(userData);
            setLoading(false); // Datos listos, no hay carga
        } else {
            setLoading(true); // No hay usuario, posiblemente cargando
        }
    }, [user]);

    if (!user) {
        return <div className="alert alert-warning" role="alert">Debes iniciar sesión para ver esta página.</div>;
    }

    if (loading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
        </Spinner>;
    }

    return (
        <div className="container mt-5 user-profile-container">
            <UserProfileDisplay data={data} onUserUpdate={onUserUpdate} onUploadImg={onUploadImg} />
            <button onClick={onLogout} className="btn btn-danger mt-3 logout-button">Cerrar Sesión</button>
        </div>
    );
};

export default UserProfile;
