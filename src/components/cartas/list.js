import React, { useEffect, useState } from 'react'
import { ListCarta } from '../../services/carta'
import { useHistory } from 'react-router-dom'
import Loading from '../loading/loading'
import Confirmation from '../alert/confirmation/carta'
import './carta.css'
import iconEdit from '../../assets/img/edit.svg'
import iconDelete from '../../assets/img/user-delete.svg'

const CartaList = (props) => {
    const [carta, setCarta] = useState([])
    const [loading, setLoading] = useState(false)
    const [confirmation, setConfirmation] = useState({
        isShow: false,
        params: {}
    })

    const getList = async () => {
        try {
            setLoading(true)
            const carta = await ListCarta()
            if (carta) {
                setCarta(carta.data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const history = useHistory()

    const editCarta = (user) => props.history.push(`/editar-carta/${user.email}`)

    const deleteCarta = (user) => setConfirmation({
        isShow: true,
        params: user
    })

    const verifyIsEmpty = carta.length === 0

    const montarLista = () => {
        const row = carta.map((user, index) => (
            <tr key={index}>
                <td>{user.sexo}</td>
                <td>{user.nascimento}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.texto}</td>
                <td>
                    <img src={iconEdit} className="iconEdit" alt="Editar" onClick={() => editCarta(user)} />
                    <img src={iconDelete} className="iconDelete" alt="Excluir" onClick={() => deleteCarta(user)} />
                </td>
            </tr>
        ))


        return !verifyIsEmpty ? (
            <table>
                <thead>
                    <tr>
                        <th>Sexo</th>
                        <th>Nascimento</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>texto</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {row}
                </tbody>
            </table>
        ) : ""


    }

    useEffect(function () {
        getList()
    }, [])

    useEffect(function () {
        getList()
    }, [confirmation])


    return (
        <section className="sectionList">
            <div className="title">
                <h1>Lista de cartas</h1>
            </div>
            
                {confirmation.isShow ? (
                    <Confirmation data={confirmation} fnc={setConfirmation} />
                ) : (
                    <div className="listaCartas">
                <nav>
                    <div className="action">
                        <button className="btnNavList" name="adicionar" onClick={() => history.push('/')}><i className="fa fa-th-list iconsNav"></i>MENU</button>
                        <button className="btnNavList" name="adicionar" onClick={() => history.push('/cadastrar-usuario')}><i className="fa fa-plus-square-o iconsNav"></i>NOVO</button>
                    </div>
                </nav>
                        <section>
                            <div className="list_carta">
                            <Loading show={loading} />
                            {montarLista()}
                            </div>
                        </section>
                        </div>
                    )}
            
        </section>
    )
}

export default CartaList
