import { MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { RiSave3Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { api } from "../../../../../services/api";
import style from "./style.module.scss";

export const ObservacaoModal = ({ listaId, setModalObservacao, modalRef, escRef }) => {
   const { register, handleSubmit, formState: { errors } } = useForm();

   const onSubmit = async (payload) => {
      const token = JSON.parse(localStorage.getItem("@token"));
      try {
         const { data } = await api.patch(`/retorno/${listaId}`, payload, {
            headers: {
               Authorization: `Bearer ${token}`
            }
         });
         toast.success("Atualizado!");
         window.location.reload();
      } catch (error) {
         toast.error("Não foi possivel atualizar!");
      }
   };

   return (
      <div role="dialog" className={style.overlayBox}>
         <div className={style.modalBox} ref={modalRef}>
            <div className={style.header}>
               <div className={style.title}>
                  <h2>Observação</h2>
               </div>
               <button className={style.button_header} ref={escRef} onClick={() => setModalObservacao(false)} title="Fechar">
                  <MdClose size={21} />
               </button>
            </div>
            <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
               <textarea className={style.input}  {...register('observacao')}></textarea>
               <button className={style.button_salvar} type="submit"><RiSave3Fill /> Salvar</button>
            </form>
         </div>
      </div>
   );
};