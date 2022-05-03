import React from 'react';
import './fileList.css'
import {useSelector} from 'react-redux';
import File from './file/File';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const FileList = () => {
    const files = useSelector(state => state.file.files)
    const fileView = useSelector(state => state.file.view)

    if(files.length === 0){
        return (
            <div className='loader no_file_title'>
                No Files
            </div>
        )
    }
    if(fileView === 'block') {
        return (
            <div className='file_block'>
                   {files.map (file =>
                            <File file={file}/>
                   )}
            </div>
        );
    }
    if(fileView === 'list') {
        return (
            <div className='file_list'>
                <div className="file_list_header">
                    <div className="file_list_name">Name</div>
                    <div className="file_list_data">Data</div>
                    <div className="file_list_size">Size</div>

                </div>
                <TransitionGroup>
                    {files.map (file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames={'item'}
                            exit={false}
                        >
                            <File file={file}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
            </div>
        );
    }
};

export default FileList;
