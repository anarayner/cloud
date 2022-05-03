import React, {useState} from 'react';
import Input from '../../UI/input/Input';
import './popup.css'
import {useDispatch, useSelector} from 'react-redux';
import {setPopupDisplay} from '../../../store/fileReducer';
import {createDir} from '../../../actions/file';

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.file.popupDisplay)
    const currentDir = useSelector(state => state.file.currentDir)

    const dispatch = useDispatch()

    function createDirHandler() {
        dispatch(createDir(currentDir, dirName))
        dispatch(setPopupDisplay('none'))
        setDirName('')
    }

    return (
        <div className='popup'
             style={{display: popupDisplay}}
             onClick={()=> dispatch(setPopupDisplay('none'))}
        >
            <div className='popup_content'
                 onClick={(event)=> event.stopPropagation()}
            >
                <div className='popup_header'>
                    <div className='popup_title'>Create new folder</div>
                    <button
                        className='popup_close'
                        onClick={()=> dispatch(setPopupDisplay('none'))}
                    >x</button>
                </div>
                <Input type='text' placeholder='Name' value={dirName} setValue={setDirName}/>
                <button className="popup_create"
                        onClick={()=> createDirHandler()}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default Popup;
