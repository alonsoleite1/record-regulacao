import { Route, Routes } from "react-router-dom";
import { DashboardSede } from "../pages/Dashboard/Sede/espera";
import { CadastroUsuario } from "../components/Forms/usuarios/formCadastro";
import { Pacientes } from "../components/Forms/pacietes/formCadastro";
import { Profissionais } from "../components/Forms/profissionais/formCadastro";
import { CadastroUnidade } from "../components/Forms/unidades/formCadastro";
import { Especialidades } from "../components/Forms/especialidades/formCadastrar";
import { Exames } from "../components/Forms/exames/formCadastrar";
import { Cirugias } from "../components/Forms/cirugia/formCadastrar";
import { ListaDeEspera } from "../components/Forms/listaDeEspera";
import { ConsultarListaDeEspera } from "../components/Forms/consultarListaDeEspera/consulta";
import { GerarListaDeEspera } from "../components/Forms/geraListaDeEspera";
import { DashboardRealizadas } from "../components/Forms/dashboardRealizadas";
import { Login } from "../pages/Login/login";
import { Inicio } from "../pages/Inicio";
import { ListaDeRetorno } from "../components/Forms/listaDeRetorno";
import { ConsultarListaDeRetorno } from "../components/Forms/consultarListaDeRetorno/consulta";
import { GerarListaDeRetorno } from "../components/Forms/geraListaDeRetorno";
import { DashboardNasf } from "../pages/Dashboard/Nasf/espera";
import { ProtectedRoutes } from "../protectedRoutes";



export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="" element={<Login />} />
            <Route element={<ProtectedRoutes/>}>
            
            <Route path="/inicio" element={<Inicio/>}/>
            <Route path="/usuario" element={<CadastroUsuario />} />
            <Route path="/profissional" element={<Profissionais />} />
            <Route path="/unidade" element={<CadastroUnidade />} />
            <Route path="/especialidade" element={<Especialidades />} />
            <Route path="/exame" element={<Exames />} />
            <Route path="/cirugia" element={<Cirugias />} />
            <Route path="/paciente" element={<Pacientes />} />
            <Route path="/listaDeEspera" element={<ListaDeEspera/>} />
            <Route path="/consultarListaDeEspera" element={<ConsultarListaDeEspera/>} />
            <Route path="/gerarListaDeEspera" element={<GerarListaDeEspera/>} />
            
            <Route path="/listaDeRetorno" element={<ListaDeRetorno/>} />
            <Route path="/consultarListaDeRetorno" element={<ConsultarListaDeRetorno/>} />
            <Route path="/gerarListaDeRetorno" element={<GerarListaDeRetorno/>} />

            <Route path="/dashboardSede" element={<DashboardSede />} />
            <Route path="/dashboardNasf" element={<DashboardNasf />} />
            <Route path="/dashboardRealizada" element={<DashboardRealizadas/>} />

            </Route> 
        </Routes>
    )
};