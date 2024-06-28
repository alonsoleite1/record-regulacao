import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { CadastroUsuario } from "../components/Forms/usuarios/formCadastro";
import { Pacientes } from "../components/Forms/pacietes/formCadastro";
import { Profissionais } from "../components/Forms/profissionais/formCadastro";
import { CadastroUnidade } from "../components/Forms/unidades/formCadastro";
import { Especialidades } from "../components/Forms/especialidades/formCadastrar";
import { Exames } from "../components/Forms/exames/formCadastrar";
import { Cirugias } from "../components/Forms/cirugia/formCadastrar";
import { CriarAgenda } from "../components/Forms/criarAgenda";
import { Agendar } from "../components/Forms/agenda";
import { ConsultarAgenda } from "../components/Forms/consultarAgenda";
import { ListaDeEspera } from "../components/Forms/listaDeEspera";
import { ConsultarListaDeEspera } from "../components/Forms/consultarListaDeEspera/consulta";
import { GerarListaDeEspera } from "../components/Forms/geraListaDeEspera";
import { DashboardRealizadas } from "../components/Forms/dashboardRealizadas";
import { AgendaProfissionais } from "../components/Forms/agendaProfissionais";
import { Login } from "../pages/Login/login";


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/usuario" element={<CadastroUsuario />} />
            <Route path="/profissional" element={<Profissionais />} />
            <Route path="/unidade" element={<CadastroUnidade />} />
            <Route path="/especialidade" element={<Especialidades />} />
            <Route path="/exame" element={<Exames />} />
            <Route path="/cirugia" element={<Cirugias />} />
            <Route path="/paciente" element={<Pacientes />} />
            <Route path="/criarAgenda" element={<CriarAgenda />} />
            <Route path="/agenda" element={<Agendar />} />
            <Route path="/consultarAgenda" element={<ConsultarAgenda />} />
            <Route path="/listaDeEspera" element={<ListaDeEspera/>} />
            <Route path="/consultarListaDeEspera" element={<ConsultarListaDeEspera/>} />
            <Route path="/gerarListaDeEspera" element={<GerarListaDeEspera/>} />
            <Route path="/dashboardRealizada" element={<DashboardRealizadas/>} />
            <Route path="/agendaProfissional" element={<AgendaProfissionais/>} />
        </Routes>
    )
};