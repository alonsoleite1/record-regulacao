import { DefaultTemplate } from "../../DefaultTemplate";
import InputMask from 'react-input-mask';
import { useForm, Controller } from 'react-hook-form';
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";



export const GerarListaDeEspera = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // Aqui você pode enviar os dados para um servidor, por exemplo
    };

    return (
        <DefaultTemplate>
            <section className={style.container}>
                <div className={style.header}>
                    <h1 className={style.title}>Gerar lista de espera</h1>
                </div>

                <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={style.box_cadastro}>
                    
                        <div className={style.box_input}>
                            <label className={style.label}>Serviço:</label>
                            <select className={style.input} {...register('servico', { required: 'Serviço é obrigatório' })}>
                                <option value="">Selecione um serviço</option>
                                <option value="especialista">Especialista</option>
                                <option value="cirugia">Cirugia</option>
                                <option value="exameProcedimento">Exame/Procedimento</option>
                            </select>
                            {errors.servico && <span className={style.aviso}>{errors.servico.message}</span>}
                        </div>
                        
                        <div className={style.box_input}>
                            <label className={style.label}>Especialidade:</label>
                            <select className={style.input} {...register('especialidade', { required: 'Especialidade é obrigatória' })}>
                                <option value="">Selecione uma especialidade</option>
                                <option value="especialidade1">cardiologia</option>
                                <option value="especialidade2">Especialidade 2</option>
                            </select>
                            {errors.especialidade && <span className={style.aviso}>{errors.especialidade.message}</span>}
                        </div>
                        <div className={style.box_input}>
                            <label className={style.label}>Regulaçao:</label>
                            <select className={style.input} {...register('especialidade', { required: 'Especialidade é obrigatória' })}>
                                <option value="">Selecione uma regulação</option>
                                <option value="sede">Sede</option>
                                <option value="nasf">Nasf</option>
                            </select>
                            {errors.regulacao && <span className={style.aviso}>{errors.regulacao.message}</span>}
                        </div>

                        <div className={style.box_input}>
                            <label className={style.label}>Quantidade:</label>
                            <input className={style.input}
                                type="number"
                                {...register("quantidade", { required: "Informe a quantidade", min: { value: 1, message: "A quantidade deve ser no mínimo 1" } })}
                            />
                            {errors.quantidade && <span className={style.aviso}>{errors.quantidade.message}</span>}
                        </div>
                       
                    </div>

                    <button className={style.button_salvar} type="submit"> Gerar Lista</button>
                </form>

            </section>
        </DefaultTemplate>
    )
};