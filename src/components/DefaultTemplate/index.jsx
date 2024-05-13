import { Header } from "../Header";
import style from "./style.module.scss";

export const DefaultTemplate = ({ children }) => {
    return (
        <>
         <Header/>
         <main>
            {children}
         </main>
        </>
    )
}