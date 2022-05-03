import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFiles, uploadFile} from '../../actions/file';
import FileList from './fileList/FileList';
import './disk.css'
import Popup from './fileList/Popup';
import {setCurrentDir, setPopupDisplay, setView} from '../../store/fileReducer';
import Logo from '../../assets/img/upload-icon-256.png';
import Uploader from './uploader/Uploader';
import FilesBlock from '../../assets/img/blocks.png';
import FilesList from '../../assets/img/view-list.png';




const Disk = () => {
    // console.log(process.env.REACT_APP_API_URL)
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const dirStack = useSelector(state => state.file.dirStack)
    const loader = useSelector(state => state.app.loader)
    const [dragEnter, setDragEnter] = useState(false)
    const [sort, setSort] = useState('type')

    useEffect(()=>{
     dispatch(getFiles(currentDir, sort))
    }, [currentDir, sort ])

    function showPopupHandler() {
        dispatch(setPopupDisplay('flex'))
    }

    function backClickHandler() {
       const backDirId = dirStack.pop()
        dispatch(setCurrentDir(backDirId))
    }
    async function fileUploadHandler(event) {
        const files = [...event.target.files]
        await files.forEach (file => dispatch (uploadFile (file, currentDir)))
    }

    function dragEventHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }
    function dragLeaveHandler(event){
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function dropHandler(event) {
        event.preventDefault()
        event.stopPropagation()
        let files = [...event.dataTransfer.files]
        console.log(files)
        files.forEach(file=> dispatch(uploadFile(file,currentDir)))
        setDragEnter(false)
    }

    if(loader){
        return (
            <div className='loader'>
                <div className="lds-dual-ring"></div>
            </div>
        )
    }

    return ( !dragEnter?
        <div className='disk' onDragEnter={dragEventHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEventHandler}>
            <div className="disk_buttons">
                <button className="disk_back" onClick={()=> backClickHandler()}>Go Back</button>
                <button className="disk_create" onClick={()=> showPopupHandler()}>New Folder</button>
                <div className="disk_upload">
                    <label
                        htmlFor='disk_upload_input'
                        className="disk_upload_label">Upload file</label>
                    <input type='file'
                           name='main'
                           id='disk_upload_input'
                           className="disk_upload_input"
                           onChange={(event)=> fileUploadHandler(event)}
                           multiple={true}
                    />
                </div>
                <div className='file_options'>
                <select value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="select"
                >
                    <option value='name'>name</option>
                    <option value='type'>type</option>
                    <option value='date'>date</option>
                </select>
                <button className='files_view_button' onClick={()=> dispatch(setView('block'))}>
                    <img src={FilesBlock} alt='logo' className='files_block_view'/>
                </button>
                <button className='files_view_button' onClick={()=> dispatch(setView('list'))}>
                    <img src={FilesList} alt='logo' className='files_block_view'/>
                </button>
                </div>
            </div>
            <FileList/>
            <Popup/>
            <Uploader/>
        </div>
            :
        <div className='drop-area'
             onDrop={dropHandler}
             onDragEnter={dragEventHandler}
             onDragLeave={dragLeaveHandler}
             onDragOver={dragEventHandler}>
            <div className="drop-area-container">
                <div className='drop-area-img'>
                    <img src={Logo} alt='upload-icon'/>
                </div>
                <div className='drop-area-text'>
                    Drag and drop file here.
                </div>
            </div>
        </div>
    );
};

export default Disk;
