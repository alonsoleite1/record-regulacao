import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const UsuarioContext = createContext({});

export const UsuarioContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [nome, setNome] = useState("");
    const [unidade, setUnidade] = useState("");
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("@token"));
        setNome(JSON.parse(localStorage.getItem("@nome")));
        setUnidade(JSON.parse(localStorage.getItem("@unidade")));
        setPerfil(JSON.parse(localStorage.getItem("@perfil")));

        const loadUser = async () => {
            try {
                setLoading(true);

                const { data } = await api.get('/usuario/autentificacao/login', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(data);
                navigate("/inicio")

            } catch (error) {
                navigate("");
                setUser(null);
                localStorage.removeItem("@token");
                localStorage.removeItem("@nome");
                localStorage.removeItem("@unidade");
                localStorage.removeItem("@perfil");
            }
            finally{
                setLoading(false)
            }
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
            setPerfil(data.user.perfil);
            

            localStorage.setItem("@token", JSON.stringify(token));
            localStorage.setItem("@nome", JSON.stringify(data.user.nome));
            localStorage.setItem("@unidade", JSON.stringify(data.user.unidade));
            localStorage.setItem("@perfil", JSON.stringify(data.user.perfil));
            

            toast.success("Bem vindo!");
            navigate("/inicio");
        } catch (error) {
            toast.error("Login ou senha invalido!");
        }
    };

    const logout = () => {
        navigate("");
        setUser(null);
        localStorage.removeItem("@token");
        localStorage.removeItem("@nome");
        localStorage.removeItem("@unidade");
        localStorage.removeItem("@perfil");
    };


    return (
        <UsuarioContext.Provider value={{loading, user, nome, unidade,perfil, login, logout, }}>
            {children}
        </UsuarioContext.Provider>
    )
};