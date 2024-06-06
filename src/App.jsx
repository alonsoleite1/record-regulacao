import { RoutesMain } from "./routes/RoutesMain";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "./style/index.scss";
import { useContext } from "react";
import { UsuarioContext } from "./provider/UsuarioContext";

function App() {
  const { user } = useContext(UsuarioContext);
  return (
    <>
      <ToastContainer />
      <RoutesMain />
    </>
  )
}

export default App
