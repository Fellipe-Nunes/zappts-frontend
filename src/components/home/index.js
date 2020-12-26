import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom' 
import './home.css'
import jwt from 'jsonwebtoken'
import { getToken } from '../../config/auth'



const Home = (props) => {
  const [userIsAdmin, setUserIsAdmin] = useState({})

  const history = useHistory()

  useEffect(() => {
    (async () => {
        const { user } = await jwt.decode(getToken())
        setUserIsAdmin(user.is_admin)
    })()
    return () => { }
}, [])


  return (
    <section className="home">
      <div className="title">
        <h1>Menu principal</h1>
      </div>
      <div className="nav">
        <button className="homeBtn" onClick={() =>history.push('/carta')}><i className="fa fa-envelope-o i"></i>CARTAS</button>
        <button className="homeBtn" onClick={() => history.push('/cadastrar-carta')}><i className="fa fa-plus-square-o i"></i>NOVA CARTA</button>
        {userIsAdmin ? (
          <button className="homeBtn" onClick={() => history.push('/usuario')}><i className="fa fa-user-o i"></i>USUÁRIOS</button>     

        ): "" }                
           
      </div>
    </section>
  )

}

export default Home