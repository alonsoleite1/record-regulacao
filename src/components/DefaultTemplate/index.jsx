import { Header } from "../Header";
import { NavLeft } from "../NavLeft/template";
import style from "./style.module.scss";

export const DefaultTemplate = ({ children }) => {
    return (
        <>
            <Header />
            <main className={style.main}>
                <div className={style.container}>
                    <div className={style.navigate}><NavLeft/></div>
                    <div className={style.children}>{children}</div>
                </div>
            </main>
        </>
    )
}