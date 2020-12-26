import React from 'react'
import { DeleteCarta } from '../../../services/carta'
import './confirm.css'

const Confirmation = (props) => {
    const deleteUser = async (value) => {
        if (value) {
            await DeleteCarta(props.data.params.email)
        }
        props.fnc({
            isShow: false,
            params: {}
        })
    }

    return (
        <section className="boxConfirmation">
            <div className="confirmation">
                <div className="msg">Você deseja excluir {props.data.params.nome} - {props.data.params.texto} ?</div>
                <div className="actions">
                    <button className="btnConfirm" onClick={() => deleteUser(false)}>NÃO</button>
                    <button className="btnConfirm" onClick={() => deleteUser(true)}>SIM</button>
                
                </div>
            </div>
        </section>
    )


}

export default Confirmation