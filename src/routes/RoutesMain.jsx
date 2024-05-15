import { Route, Routes } from "react-router-dom";
import { Pacietes } from "../components/Forms/pacietes";


export const RoutesMain = () => {
    return (
        <Routes>
            <Route path="/paciente" element={<Pacietes />} />
        </Routes>
    )
};