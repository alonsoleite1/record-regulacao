import { Route, Routes } from "react-router-dom";
import { Pacietes } from "../components/Forms/pacietes";
import { Dashboard } from "../pages/Dashboard";


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/paciente" element={<Pacietes />} />
        </Routes>
    )
};