import React, { useState, useEffect } from 'react'
import { CreateCarta, ShowCarta, UpdateCarta } from '../../services/carta'
import { useHistory, useParams } from 'react-router-dom'
import Alert from '../alert/index'
import './carta.css'

const UserCreate = (props) => {
    const [isEdit, setisEdit] = useState(false)
    const { email } = useParams()
    const history = useHistory()
    const [alert, setAlert] = useState({})
    const method = isEdit ? UpdateCarta : CreateCarta
    const [isSubmit, setIsSubmit] = useState (false)

    const [form, setForm] = useState({
        is_active: true,
        is_admin: false

    })

    useEffect(() => {
        const getShowUser = async () => {
            const user = await ShowCarta(email)
            setForm(user.data)
        }
        if (email) {
            setisEdit(true)
            getShowUser()            
        }
    }, [email]

    )

    const handleChange = (event) => {
       
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
        return
    }

    const formIsValid = () => {
        let radioButtonIsValid = false
         let radiosButtons = document.getElementsByName('sexo')
 
         radiosButtons.forEach((radioButton) => {
             if (radioButton.checked) {
                 radioButtonIsValid = true
             }
        })
        return (
            radioButtonIsValid &&            
            form.nascimento &&
            form.nome &&
            form.email &&
            form.texto
        )
    }

    const checkMasculino = () => {
        if(form.sexo === "Masculino"){
            document.getElementById("masculino").checked = true
        }      
    }

    const checkFeminino = () => {
        if(form.sexo === "Feminino"){
            document.getElementById("feminino").checked = true
        }
    }
   

    const submitForm = async (event) => {
        try {
            setIsSubmit(true)
            await method(form)
            
            setForm({
                is_active: true,
                is_admin: false
            })

            setAlert({
                type: "success",
                message: "Formulário enviado com sucesso!",
                show: true
            })

            setTimeout(() => 
                history.push('/carta')
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
        <section>
            <div className="title">
                <h1>{isEdit ? 'Editar cartas' : 'Cadastro de cartas'}</h1>
            </div>
            
            <div className="cadastroCarta">
            <Alert type={alert.type || ""} message={alert.message || ""} show={alert.show || false} />                
                <div className="row">
                    <div className="radios">
                        <div className="etiqueta">Sexo</div>
                        <div className="radio">
                            <input disabled={isSubmit} className="option" type="radio" id="masculino" name="sexo" onChange={handleChange} value="Masculino" checked={isEdit ? checkMasculino() : form.masculino}/>
                            <label htmlFor="masculino">Masculino</label>
                        </div>
                        <div className="radio">
                            <input disabled={isSubmit} className="option" type="radio" id="feminino" name="sexo" onChange={handleChange} value="Feminino" checked={isEdit ? checkFeminino() : form.feminino}/>
                            <label htmlFor="feminino">Feminino</label>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="nascimento">Nascimento:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="date" name="nascimento" onChange={handleChange} value={form.nascimento || ""} placeholder="Nascimento" />
                    </div>
                </div>
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="nome">Nome:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="text" name="nome" label="Nome:" onChange={handleChange} value={form.nome || ""} placeholder="Insira o nome" autoComplete="false"/>
                    </div>
                </div>
               
                <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="email">E-mail:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="email" name="email" onChange={handleChange} value={form.email || ""} placeholder="Insira o e-mail" autoComplete="false"/>
                    </div>
                    <div className="row">
                    <div className="etiqueta">
                        <label htmlFor="texto">Texto:</label>
                    </div>
                    <div className="form-input">
                        <input disabled={isSubmit} className="campo" type="text" name="texto" onChange={handleChange} value={form.texto || ""} placeholder="Escreva o seu pedido" autoComplete="false"/>
                    </div>                
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
