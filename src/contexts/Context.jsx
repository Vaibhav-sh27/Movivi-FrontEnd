import { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider=({children})=>{
    const [array, setArr] = useState([]);
    const [play, setPlay] = useState([]);
    const [playItem, setPlayItem] = useState("");
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState("");
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState("");

    return( 
        <Context.Provider value={{array, setArr, show, setShow, alert, setAlert, play, setPlay, playItem, setPlayItem, edit, setEdit, showEdit, setShowEdit}}>
            {children}
        </Context.Provider>
    )
}