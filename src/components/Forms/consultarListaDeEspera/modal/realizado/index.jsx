import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { RiSave3Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { api } from "../../../../../services/api"
import style from "./style.module.scss";

export const RealizadoModal = ({ setModalRealizado, listaId, profissionais, modalRef, escRef }) => {

   const { register, handleSubmit, formState: { errors } } = useForm();

   const navigate = useNavigate();

   const onSubmit = async (payload) => {
      const token = JSON.parse(localStorage.getItem("@token"));
      try {
         const { data } = await api.patch(`/lista/${listaId}`, payload, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         navigate("/dashboard");
         toast.success("Atualizado!");
      } catch (error) {
         toast.error("Não foi possivel atualizar!");
      }
   };

   return (
      <div role="dialog" className={style.overlayBox}>
         <div className={style.modalBox} ref={modalRef}>
            <div className={style.header}>
               <div className={style.title}>
                  <h2>Realizado</h2>
               </div>
               <button className={style.button_header} ref={escRef} onClick={() => setModalRealizado(false)} title="Fechar">
                  <MdClose size={21} />
               </button>
            </div>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>

               <div className={style.container}>

                  <div className={style.box_input}>
                     <label>Profissional:</label>
                     <select className={style.input} {...register('nomeProfissional', { required: 'Nome do profissional é obrigatório' })}>
                        <option value="">Selecione...</option>
                        {profissionais.map((option, i) => (
                           <option key={i} value={option.nome}>
                              {option.nome}
                           </option>
                        ))}
                     </select>
                     {errors.nomeProfissional && <span className={style.aviso}>{errors.nomeProfissional.message}</span>}
                  </div>

                  <div className={style.box_input}>
                     <label>Data:</label>
                     <input type="date" className={style.input} {...register('realizado', { required: 'Data é obrigatório' })} />
                     {errors.realizado && <span className={style.aviso}>{errors.realizado.message}</span>}
                  </div>

               </div>

               <button className={style.button} type="submit"><RiSave3Fill />Salvar</button>
            </form>
         </div>
      </div>
   );
};