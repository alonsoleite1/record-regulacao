import { DefaultTemplate } from "../../DefaultTemplate";
import { Input } from "../../Imputs";
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";
import { Select } from "../../Selects";

export const Usuarios = () => {
  return (
    <DefaultTemplate>
      <form className={style.container}>
        <div className={style.div_inputs}>
          <span className={style.input_100}>
            <Input label="Nome:" />
          </span>
          <span className={style.input_100}>
            <Input label="CPF:" />
          </span>
          <span className={style.input_100}>
            <Input label="Login" />
          </span>
        </div>
        <div className={style.div_inputs}>
          <span className={style.input_100}>
            <Input label="Senha:" />
          </span>
          <span className={style.input_100}>
            <Input label="Repetir senha:" />
          </span>
          <span className={style.input_100}>
            <Input label="Unidade:" />
          </span>
        </div>
        <div className={style.div_inputs}>
          <span className={style.input_50}>
            <Select label="Perfil:"/>
          </span>
        </div>
        <div>
          <button className={style.button} type="submit"><RiSave3Fill /> Salvar usuário</button>
        </div>
      </form>
    </DefaultTemplate>
  )
}