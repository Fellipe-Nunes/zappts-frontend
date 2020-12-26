import { clientHttp } from '../config/config.js'

const CreateCarta = (data) => clientHttp.post(`/carta`, data)

const ListCarta = () => clientHttp.get(`/carta`)

const DeleteCarta = (email) => clientHttp.delete(`/carta/${email}`)

const UpdateCarta = (data) => clientHttp.patch(`/carta/${data.email}`, data)

const ShowCarta = (email) => clientHttp.get(`/carta/${email}`)


export {
    CreateCarta,
    ListCarta,
    DeleteCarta,
    UpdateCarta,
    ShowCarta 
}
