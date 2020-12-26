import React, { useEffect, useState } from 'react'
import { ListUser } from '../../services/user'
import { useHistory } from 'react-router-dom'
import Loading from '../loading/loading'
import Confirmation from '../alert/confirmation/user'
import './user.css'
import iconEdit from '../../assets/img/user-edit.svg'
import iconDelete from '../../assets/img/user-delete.svg'

const UserList = (props) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [confirmation, setConfirmation] = useState({
        isShow: false,
        params: {}
    })

    const getList = async () => {
        try {
            setLoading(true)
            const users = await ListUser()
            if (users) {
                setUsers(users.data)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const history = useHistory()

    const editUser = (user) => props.history.push(`/editar-usuario/${user.email}`)

    const deleteUser = (user) => setConfirmation({
        isShow: true,
        params: user
    })

    const verifyIsEmpty = users.length === 0

    const setIcon = (conditional) => (
        <i className={`fa fa-${conditional ? "check text-success" : "times text-danger"}`} />
    )


    const montarLista = () => {
        const row = users.map((user, index) => (
            <tr key={index}>
                <td>{setIcon(user.is_active)}</td>
                <td>{setIcon(user.is_admin)}</td>
                <td>{user.nome}</td>                
                <td>{user.email}</td>
                <td>
                    <img src={iconEdit} className="iconEdit" alt="Editar" onClick={() => editUser(user)} />
                    <img src={iconDelete} className="iconDelete" alt="Excluir" onClick={() => deleteUser(user)} />
                </td>
            </tr>
        ))


        return !verifyIsEmpty ? (
            <table>
                <thead>
                    <tr>
                        <th>Ativo</th>
                        <th>Admin</th>
                        <th>Nome</th>
                        <th>E-mail</th>
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
                <h1>Lista de usuários</h1>
            </div>
            
                {confirmation.isShow ? (
                    <Confirmation data={confirmation} fnc={setConfirmation} />
                ) : (
                    <div className="listaUsuarios">
                <nav>
                    <div className="action">
                        <button className="btnNavList" name="adicionar" onClick={() => history.push('/')}><i className="fa fa-th-list iconsNav"></i>MENU</button>
                        <button className="btnNavList" name="adicionar" onClick={() => history.push('/cadastrar-usuario')}><i className="fa fa-user-plus iconsNav"></i>NOVO</button>
                    </div>
                </nav>
                        <section>
                            <div className="list_user">
                            <Loading show={loading} />
                            {montarLista()}
                            </div>
                        </section>
                        </div>
                    )}
            
        </section>
    )
}

export default UserList
