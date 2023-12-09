//src/api/backend.js
// Función para enviar la solicitud de inicio de sesión al backend
export const loginOnBackend = async (token) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_USUARIOS_BACKEND}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ token }) // Envia el token JWT como objeto
        });

        if (response.ok) {
            const data = await response.json();
        } else {
            console.error('Error en la solicitud al backend después del inicio de sesión');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud de inicio de sesión en el backend:', error.message);
    }
};
// Función para enviar la solicitud de registro al backend
export const registerOnBackend = async (userData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_USUARIOS_BACKEND}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const responseData = await response.json();
            // Manejo de la respuesta exitosa
            console.log('Usuario registrado con éxito:', responseData);
        } else {
            const errorData = await response.json();
            console.error('Error en el registro en el backend:', errorData.error);
        }
    } catch (error) {
        console.error('Error al realizar la solicitud de registro en el backend:', error.message);
    }
};
