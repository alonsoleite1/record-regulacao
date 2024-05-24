import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { CadastroUsuario } from "../components/Forms/usuarios";
import { Pacientes } from "../components/Forms/pacietes";
import { Profissionais } from "../components/Forms/profissionais";
import { Unidades } from "../components/Forms/unidades";
import { Especialidades } from "../components/Forms/especialidades";
import { Exames } from "../components/Forms/exames";
import { Cirugias } from "../components/Forms/cirugia";


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usuario" element={<CadastroUsuario />} />
            <Route path="/profissional" element={<Profissionais />} />
            <Route path="/unidade" element={<Unidades />} />
            <Route path="/especialidade" element={<Especialidades />} />
            <Route path="/exame" element={<Exames />} />
            <Route path="/cirugia" element={<Cirugias />} />
            <Route path="/paciente" element={<Pacientes />} />
        </Routes>
    )
};