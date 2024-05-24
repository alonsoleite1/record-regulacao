import { forwardRef } from "react";
import style from "./style.module.scss";

export const Select = forwardRef(({ label, error, ...rest }, ref) => {
    return (

        <div className={style.select}>
            <label className={style.label}>{label}</label>
            <select className={style.input_select} {...rest} ref={ref}>
                <option value="">Selecione perfil</option>
                <option value="operador">Operador</option>
                <option value="gerencia">Gerencia</option>
                <option value="admin">Admin</option>
            </select>
            {error ? <p className={style.paragraph}>{error.message}</p> : null}
        </div>

    )
});