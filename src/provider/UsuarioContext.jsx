import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const UsuarioContext = createContext({});

export const UsuarioContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("@token"));

        const loadUser = async () => {
            try {
                setLoading(true);

                const { data } = await api.get('/usuario/autentificacao', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
console.log(data);
                setUser(data)
                navigate("/dashboard")

            } catch (error) {

                localStorage.removeItem("@token")
            } finally {
                setLoading(false)
            }
        }
        if (token) {
            loadUser();
        }

    }, []);

    const userRegister = async (formData) => {
       
    };

    const login = async (formData) => {
        try {
            const { data } = await api.post("/usuario/login", formData);
            const token = data.accessToken;
console.log(data.user);
            setUser(data.user);

            localStorage.setItem("@token", JSON.stringify(token));
            toast.success("Bem vindo!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Email ou senha invalido!");
        }
    };

    const logout = () => {
        navigate("/");
        setUser(null);
        localStorage.removeItem("@token");
    };




    return (
        <UsuarioContext.Provider value={{ loading, user, login, logout, }}>
            {children}
        </UsuarioContext.Provider>
    )
};