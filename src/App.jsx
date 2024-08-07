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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        />
      <RoutesMain />
    </>
  )
}

export default App
