import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const UsuarioContext = createContext({});

export const UsuarioContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("@token"));
        setNome(JSON.parse(localStorage.getItem("@nome")));
        setUnidade(JSON.parse(localStorage.getItem("@unidade")));

        const loadUser = async () => {
            try {

                const { data } = await api.get('/usuario/autentificacao', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(data);
                setNome(data.user.nome);
                setUnidade(data.user.unidade);
                
                navigate("/dashboard");

            } catch (error) {

                //localStorage.removeItem("@token")
            };
        }
        if (token) {
            loadUser();
        }

    }, []);

    const login = async (formData) => {
        try {
            const { data } = await api.post("/usuario/login", formData);
            const token = data.accessToken;

            setUser(data.user);
            setNome(data.user.nome);
            setUnidade(data.user.unidade);

            localStorage.setItem("@token", JSON.stringify(token));
            localStorage.setItem("@nome", JSON.stringify(data.user.nome));
            localStorage.setItem("@unidade", JSON.stringify(data.user.unidade));

            toast.success("Bem vindo!");
            navigate("/dashboard");
        } catch (error) {
            toast.error("Login ou senha invalido!");
        }
    };

    const logout = () => {
        navigate("/");
        setUser(null);
        localStorage.removeItem("@token");
        localStorage.removeItem("@nome");
        localStorage.removeItem("@unidade");
    };


    return (
        <UsuarioContext.Provider value={{ user, nome, unidade, login, logout, }}>
            {children}
        </UsuarioContext.Provider>
    )
};