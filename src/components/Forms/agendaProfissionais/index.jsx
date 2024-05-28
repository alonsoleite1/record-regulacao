import { DefaultTemplate } from "../../DefaultTemplate";
import { useForm } from 'react-hook-form';
import { FaCheck } from "react-icons/fa";
import style from "./style.module.scss";



export const AgendaProfissionais = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Aqui você pode enviar os dados para um servidor, por exemplo
    };


    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Agenda dos Profissionais</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>

                    <div className={style.box_input}>
                            <label className={style.label}>Profissional:</label>
                            <select className={style.input} {...register('profissional', { required: 'Profissional é obrigatório' })}>
                                <option value="">Selecione um profissional</option>
                                <option value="profissional1">Profissional 1</option>
                                <option value="profissional2">Profissional 2</option>
                            </select>
                            {errors.profissional && <span className={style.aviso}>{errors.profissional.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Data:</label>
                            <select className={style.input} {...register('data', { required: 'Data é obrigatório' })}>
                                <option value="">Selecione uma data</option>
                                <option value="profissional1">25/01/2024</option>
                                <option value="profissional2">26/01/2024</option>
                            </select>
                            {errors.data && <span className={style.aviso}>{errors.data.message}</span>}
                        </div>

                    </div>

                    <button className={style.button_salvar} type="submit"> Gerar Agenda</button>
                </form>
             
                <ul className={style.ul}>
                    <li className={style.card}>
                        <div className={style.box_card}>
                            <span className={style.label}>Nome:</span>
                            <p>Alonso Araujo Leite</p>
                        </div>
                        <div className={style.box_card}>
                            <span className={style.label}>CPF</span>
                            <p>055.325.325.50</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Data:</span>
                            <p>01/06/2024</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Hora:</span>
                            <p>09:00</p>
                        </div>
                        <div className={style.box_card}>
                            <span className={style.label}>Agendado por:</span>
                            <p>Alonso Araújo Leite</p>
                        </div>
                        <div className={style.div_button}>
                            <button className={style.button_realizado} title="Realizado"><FaCheck /></button>
                        
                            <button className={style.button_not} title="Não realizado">X</button>
                        </div>
                    </li>

                    <li className={style.card}>
                        <div className={style.box_card}>
                            <span className={style.label}>Nome:</span>
                            <p>Alonso Araujo Leite</p>
                        </div>
                        <div className={style.box_card}>
                            <span className={style.label}>CPF</span>
                            <p>055.325.325.50</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Data:</span>
                            <p>01/06/2024</p>
                        </div>
                        <div className={style.box_posicao}>
                            <span className={style.label}>Hora:</span>
                            <p>09:00</p>
                        </div>
                        <div className={style.box_card}>
                            <span className={style.label}>Agendado por:</span>
                            <p>Alonso Araújo Leite</p>
                        </div>
                        <div className={style.div_button}>
                            <button className={style.button_realizado} title="Realizado"><FaCheck /></button>
                        
                            <button className={style.button_not} title="Não realizado">X</button>
                        </div>
                    </li>
                </ul>
               

            </section>

        </DefaultTemplate>
    )
};