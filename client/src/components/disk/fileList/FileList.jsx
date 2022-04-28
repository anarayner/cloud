import React from 'react';
import './fileList.css'
import {useSelector} from 'react-redux';
import File from './file/File';

const FileList = () => {
    const files = useSelector(state => state.file.files).map(file => <File key={file._id} file={file}/>)
//     const files2 = useSelector(state => console.log(state.file.files))
//
//     const files = [{_id:1, name:'direct', type: 'dir', size: '5gb', data: '02-20-2022'},
//         {_id:2, name:'direct', type: 'dir', size: '5gb', data: '02-20-2022'},
//         {_id:3, name:'direct', type: 'dir', size: '5gb', data: '02-20-2022'},
//     ].map(file => <File key={file._id} file={file}/>)
// console.log(files2)
    return (
        <div className='file_list'>
            <div className="file_list_header">
                <div className="file_list_name">Name</div>
                <div className="file_list_data">Data</div>
                <div className="file_list_size">Size</div>

            </div>

            {files}
        </div>
    );
};

export default FileList;
