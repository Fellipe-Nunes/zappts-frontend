import React from 'react'
import './loading.css'
import load from '../../../src/assets/img/load.jpg'

const Loading = ({ show = false }) => {

    return (
        show ? (
            <div className="loading">
                <div className="load">
                    <img src = {load} alt="Carregando"/>
                </div>
            </div>
        ) : ""

    )

}
export default Loading
