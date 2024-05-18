import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { CadastroUsuario } from "../components/Forms/usuarios";
import { Pacientes } from "../components/Forms/pacietes";


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usuario" element={<CadastroUsuario />} />
            <Route path="/paciente" element={<Pacientes />} />
        </Routes>
    )
};