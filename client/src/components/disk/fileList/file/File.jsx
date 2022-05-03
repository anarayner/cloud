import React from 'react';
import './file.css'
import folderLogo from '../../../../assets/img/folder.png'
import fileLogo from '../../../../assets/img/google-docs.png'
import {useDispatch, useSelector} from 'react-redux';
import {pushToStack, setCurrentDir} from '../../../../store/fileReducer';
import DownloadLogo from '../../../../assets/img/download-second.png';
import DeleteLogo from '../../../../assets/img/delete.png';
import {deleteFile, downloadFile} from '../../../../actions/file';
import sizeFormat from '../../../../utils/sizeFormat';

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    const fileView = useSelector(state => state.file.view)

    function openDirHandler() {
        if(file.type === 'dir'){
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
       e.stopPropagation()
        downloadFile(file)
    }

    async function deleteClickHandler(e) {
        e.stopPropagation ()
        console.log (file)
         dispatch (deleteFile (file))
    }
    if(fileView === 'list') {
        return (
            <div className='file'
                 onClick={() => openDirHandler ()}
            >
                <img src={file.type === 'dir' ? folderLogo : fileLogo} alt='' className='file_img'/>
                <div className='file_name'>{file.name}</div>

                {file.type !== 'dir' && <button
                    onClick={(e) => downloadClickHandler (e)}
                    className='file_button download_button'>
                    <img src={DownloadLogo} alt='download_button-icon'/>
                </button>}
                <button
                    onClick={(e) => deleteClickHandler (e)}
                    className='file_button delete_button'>
                    <img src={DeleteLogo} alt='delete_button-icon'/>
                </button>
            </div>
        );
    }

    if(fileView === 'block') {
        return (
            <div className='file__block'
                 onClick={() => openDirHandler ()}
            >
                <img src={file.type === 'dir' ? folderLogo : fileLogo} alt='' className='file_block_img'/>
                <div className='file_block_name'>{file.name}</div>
                {file.type !== 'dir' && <button
                    onClick={(e) => downloadClickHandler (e)}
                    className='file_block_button download_button'>
                    <img src={DownloadLogo} alt='download_button-icon'/>
                </button>}
                <button
                    onClick={(e) => deleteClickHandler (e)}
                    className='file_block_button delete_button'>
                    <img src={DeleteLogo} alt='delete_button-icon'/>
                </button>
            </div>
        );
    }

};

export default File;
