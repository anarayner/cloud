import React from 'react';
import './uploader.css'
import {useDispatch} from 'react-redux';
import {removeUploadFile} from '../../../store/uploadReducer';

const UploadFile = ({file}) => {
    const dispatch = useDispatch()

    return (
        <div className='upload_file'>
            <div className='upload_file_header'>
               <div className='upload_file_title'>{file.name}</div>
               <div className='upload_file_button'
                    onClick={()=> dispatch(removeUploadFile(file.id))}
               >x</div>
            </div>
            <div className='upload_file_progress_bar'>
                <div className='upload_file_upload_bar' style={{width: file.progress}}/>
                <div className='upload_file_progress'>{file.progress}</div>
            </div>

        </div>
    );
};

export default UploadFile;
