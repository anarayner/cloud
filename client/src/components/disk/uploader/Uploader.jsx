import React from 'react';
import UploadFile from './UploadFile';
import './uploader.css'
import {useDispatch, useSelector} from 'react-redux';
import {hideUploader} from '../../../store/uploadReducer';

const Uploader = () => {
    const files = useSelector(state => state.upload.files )

    const isVisible = useSelector(state => state.upload.isVisible)
    const dispatch = useDispatch()
    return ( isVisible &&
        <div className='uploader'>
            <div className='uploader_header'>
                <div className='uploader_title'></div>
                <div className='uploader_button'
                     onClick={()=> dispatch(hideUploader())}
                >x</div>
            </div>
            {files.map(file =>
                <UploadFile key={file._id} file={file}/>) }
        </div>
    );
};

export default Uploader;
