import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getFiles} from '../../actions/file';
import FileList from './fileList/FileList';
import './disk.css'

const Disk = () => {
    console.log(process.env.REACT_APP_API_URL)
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.file.currentDir)
    useEffect(()=>{
     dispatch(getFiles(currentDir))
    }, [currentDir ])
    return (
        <div className='disk'>
            <div className="disk_buttons">
                <button className="disk_back">Go Back</button>
                <button className="disk_create">New Folder</button>
            </div>
            <FileList/>
        </div>
    );
};

export default Disk;
