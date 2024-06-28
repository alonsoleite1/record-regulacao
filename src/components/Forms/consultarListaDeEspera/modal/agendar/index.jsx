import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import style from "./style.module.scss";

export const AgendarModal = ({ setModalAgendar, modalRef, escRef }) => {
   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div role="dialog" className={style.overlayBox}>
         <div className={style.modalBox} ref={modalRef}>
            <div className={style.header}>
               <div className={style.title}>
                  <h2>Agendar</h2>
               </div>
               <button className={style.button_header} ref={escRef} onClick={() => setModalAgendar(false)} title="Fechar">
                  <MdClose size={21} />
               </button>
            </div>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

               <div className={style.container}>
                  <div className={style.box_input}>
                     <label>Serviço:</label>
                     <input className={style.input_servico} type="text" {...register('especialidade', { required: 'Especialidade é obrigatório' })} />
                     {errors.especialidade && <span className={style.aviso}>{errors.especialidade.message}</span>}
                  </div>

                  <div className={style.box_input}>
                     <label>Profissional:</label>
                     <select className={style.input} {...register('profissional', { required: 'Profissional é obrigatório' })}>
                        <option value="">Selecione...</option>
                     </select>
                     {errors.profissional && <span className={style.aviso}>{errors.profissional.message}</span>}
                  </div>

                  <div className={style.box_input}>
                     <label>Data:</label>
                     <select className={style.input}
                        {...register('data', { required: 'Data é obrigatória' })}>
                        <option value="">Selecione...</option>
                     </select>
                     {errors.data && <span className={style.aviso}>{errors.data.message}</span>}
                  </div>

                  <div className={style.box_input}>
                     <label>Unidade:</label>
                     <select className={style.input}
                        {...register('unidade', { required: 'Unidade é obrigatório' })}>
                        <option value="">Selecione...</option>
                     </select>
                     {errors.unidade && <span className={style.aviso}>{errors.unidade.message}</span>}
                  </div>
               </div>

               <button className={style.button} type="submit">Agendar</button>
            </form>
         </div>
      </div>
   );
};