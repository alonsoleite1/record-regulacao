import { forwardRef } from "react";
import style from "./style.module.scss";

export const Input = forwardRef(({ label, error, ...rest }, ref) => {
    return (
        <div className={style.container}>
            <label className={style.label}>{label}</label>
            <div className={style.box_input}>
                <input className={style.input_default} ref={ref} {...rest} />
                {error ? <p className={style.paragraph}>{error.message}</p> : null}
            </div>
        </div>
    )
});