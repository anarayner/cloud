import axios from 'axios'
import {addFile, deleteFileAction, setFiles} from '../store/fileReducer';
import {addUploadFile, changeUploadFile, showUploader} from '../store/uploadReducer';
import {hideLoader, showLoader} from '../store/appReducer';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';


export function getFiles(dirId, sort){
    return async dispatch =>{
        try{
            dispatch(showLoader())
            let url = `http://localhost:7000/api/files`
            if(dirId && sort){
                url = `${url}?parent=${dirId}&sort=${sort}`
            }
            if(dirId){
                url = `${url}?parent=${dirId}`
            }
            if(sort){
                url = `${url}?sort=${sort}`
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
            })
            console.log(response.data)
            dispatch(setFiles(response.data))
        }catch (e) {
            alert(e.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId, name){
    return async dispatch =>{
        try{
            const response = await axios.post(`http://localhost:7000/api/files`,{
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data)
            dispatch(addFile(response.data))
        }catch (e) {
            alert(e.response?.data?.message)
        }
    }
}

export function uploadFile(file, dirId){
    return async dispatch =>{
        try{
            const formData = new FormData()
            formData.append('file', file)
            if(dirId){
               formData.append('parent', dirId)
            }
                const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader())
            dispatch(addUploadFile(file))
                const response = await axios.post(`http://localhost:7000/api/files/upload`, formData,
                {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ?
                        progressEvent.total :
                        progressEvent.target.getResponseHeader('content-length')
                        || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    if(totalLength){
                        uploadFile.progress = Math.round((progressEvent.loaded *100)/totalLength)
                        console.log(uploadFile.progress)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            })
            console.log(response)
            dispatch(addFile(response.data))
        }catch (e) {
            alert(e.response?.data?.message)
        }
    }
}

export async function downloadFile(file){
    const response = await fetch(`http://localhost:7000/api/files/download?id=${file._id}`,{
        headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
    })
    if(response.status === 200){
        console.log(response.status === 200)

        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        console.log(link)
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function deleteFile(file) {
    console.log(file._id)
    return async dispatch =>{
        try{
            console.log(file._id)
            const response = await axios.delete(`http://localhost:7000/api/files?id=${file._id}`, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            console.log(response)
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            alert(e.response?.data?.message)
        }
    }
}

export function searchFile(search) {
    return async dispatch =>{
        try{
            const response = await axios.get(`http://localhost:7000/api/files/search?search=${search}`, {
                headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            alert(e.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}