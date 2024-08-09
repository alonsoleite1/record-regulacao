import { RoutesMain } from "./routes/RoutesMain";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "./style/index.scss";
import { useContext } from "react";
import { UsuarioContext } from "./provider/UsuarioContext";
import { Spinner } from "react-loading-io";
function App() {
  const { loading } = useContext(UsuarioContext);
  const spinnerCfg = { left: "50%", transform: "translateY(150%)" };
  
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        />
        {loading ? <Spinner style={spinnerCfg}/> : <RoutesMain/>}
      
    </>
  )
}

export default App
