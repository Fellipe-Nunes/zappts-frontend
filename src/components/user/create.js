import React, { useState, useEffect } from 'react'
import { CreateUser, UpdateUser, ShowUser } from '../../services/user'
import { useHistory, useParams } from 'react-router-dom'
import Alert from '../alert/index'
import './user.css'

const UserCreate = (props) => {    
    const [isEdit, setisEdit] = useState(false)
    const { email } = useParams()
    const history = useHistory()
    const [alert, setAlert] = useState({})
    const method = isEdit ? UpdateUser : CreateUser
    const [isSubmit, setIsSubmit] = useState (false)
    const [form, setForm] = useState({ })

    
    useEffect(() => {
        const getShowUser = async () => {
            const user = await ShowUser(email)
            if (user.data.senha) {
                delete user.data.senha
            }
            setForm(user.data)
        }
        if (email) {
            setisEdit(true)
            getShowUser()            
        }
    }, [email]

    )

    const handleChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        const name = event.target.name
       
        setForm({
            ...form,
            [name]: value
            
        })
        return
    }

    const formIsValid = () => {
        
        return (
                       
            form.nome &&          
            form.email &&
            form.password
            
        )
    }

        
    const submitForm = async (event) => {
        try {
            setIsSubmit(true)
            await method(form)
            
            
            setAlert({
                type: "success",
                message: "Formulário enviado com sucesso!",
                show: true
            })

            setTimeout(() => 
                history.push('/usuario')
            , 3000);

            
        } catch (error) {
            setAlert({
                type: "error",
                message: "Ocorreu um erro no cadastro...",
                show: true
            })
            setIsSubmit(false)

        }
    }

    
    return (
        <section className="sectionCreate">
            <div className="title">
                <h1>{isEdit ? 'Editar usuário' : 'Cadastro de usuários'}</h1>
            </div>
            <Alert type={alert.type || ""} message={alert.message || ""} show={alert.show || false} />
            <div className="cadastroUsuario">                
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="nome">Nome:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="text" name="nome" label="Nome:" onChange={handleChange} value={form.nome || ""} placeholder="Insira seu nome" autoComplete="false"/>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="email">E-mail:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="email" name="email" onChange={handleChange} value={form.email || ""} placeholder="Insira seu e-mail" autoComplete="false"/>
                    </div>
                    
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="email">Senha</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="password" name="password" onChange={handleChange} value={form.password || ""} placeholder="Insira uma senha" autoComplete="false"/>
                    </div>
                    
                </div>
               
                            <div className="row">
                                <div className="etiqueta">
                                <label htmlFor="is_admin">Administrador:</label>
                                <input type="checkbox" className="checkbox" name="is_admin" id="is_admin" onChange={handleChange} checked={form.is_admin} />
                                <label htmlFor="is_active">Ativo:</label>
                                <input type="checkbox" className="checkbox" name="is_active" id="is_active" onChange={handleChange} checked={form.is_active} />
                                </div>
                                
                            </div>
                      

                <div className="row">
                    <button disabled={!formIsValid()} className="btn cadastrar" onClick={submitForm}>{isEdit ? 'EDITAR' : 'CADASTRAR'}</button>
                </div>
                <div className="row">
                    <button className="btn cadastrar" onClick={() => history.goBack()}>CANCELAR</button>
                </div>
            </div>
        </section>
    )
}
export default UserCreate
