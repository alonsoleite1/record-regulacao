import { DefaultTemplate } from "../../DefaultTemplate";
import { Input } from "../../Imputs";
import style from "./style.module.scss";

export const Usuarios = () => {
  return (
    <DefaultTemplate>
      <form className={style.container}>
        <div className={style.div_inputs}>
          <span className={style.input_100}>
            <Input label="Nome:"/>
          </span>
          <span className={style.input_100}>
            <Input label="CPF:"/>
          </span>
          <span className={style.input_100}>
            <Input label="Login"/>
          </span>
        </div>
        <div className={style.div_inputs}>
          <span className={style.input_100}>
            <Input label="Senha:"/>
          </span>
          <span className={style.input_100}>
            <Input label="Repetir senha:"/>
          </span>
          <span className={style.input_100}>
            <Input label="Unidade:"/>
          </span>
        </div>
        <div className={style.div_inputs}>
          <span className={style.input_50}>
            <Input label="Perfil:"/>
          </span>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </DefaultTemplate>
  )
}