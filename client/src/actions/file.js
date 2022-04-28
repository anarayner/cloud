import axios from 'axios'
import {setFiles} from '../store/fileReducer';

export function getFiles(dirId){
    return async dispatch =>{
        try{
            const response = await axios.get(`http://localhost:7000/api/files/${dirId ? '?parent=' +dirId : ''}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data)
            dispatch(setFiles(response.data))
        }catch (e) {
            alert(e.response.data.message)
        }
    }
}