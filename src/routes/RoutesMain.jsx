import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Pacietes } from "../components/Forms/pacietes";
import { Usuarios } from "../components/Forms/usuarios";


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usuario" element={<Usuarios />} />
            <Route path="/profissional" element={<Pacietes />} />
            <Route path="/paciente" element={<Pacietes />} />
        </Routes>
    )
};