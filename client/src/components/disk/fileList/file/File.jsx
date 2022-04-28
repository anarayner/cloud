import React from 'react';
import './file.css'
import folderLogo from '../../../../assets/img/folder.png'
import fileLogo from '../../../../assets/img/google-docs.png'

const File = ({file}) => {
    return (
        <div className='file'>
           <img src={file.type === 'dir'? folderLogo : fileLogo} alt='' className='file_img'/>
            <div className='file_name'>{file.name}</div>
            <div className='file_data'>{file.data.slice(0,10)}</div>
            <div className='file_size'>{file.size}</div>
        </div>
    );
};

export default File;
