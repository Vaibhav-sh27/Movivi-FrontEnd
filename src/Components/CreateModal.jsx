import React, { useContext, useRef } from 'react'
import { Context } from '../contexts/Context';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
  } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const CreateModal = () => {
    const {show, setShow, play, setPlay} = useContext(Context);
    const {currUser,setUser} = useAuth();
    let name = useRef();
    let access= useRef();
    const handleClose = () => setShow(false);

    async function handleCreate() {
      if(name.current.value.trim()){
        let playObj= {
          name: name.current.value,
          access: access.current.value,
          owner: currUser.email,
          movies:[],
      }
      let res = await axios.post(`${import.meta.env.VITE_BAPI_URL}/playlist/${currUser._id}/add`, playObj)
      console.log(res.data);
      setPlay((item)=>[...item, res.data.data.playlistData]);
      setUser(res.data.data.currUser);
      }
        // setPlay((item)=>[...item, playObj]);
    }
  return (
    <div>
        <MDBModal open={show} onClose={handleClose} tabIndex='-1' >
        <MDBModalDialog >
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle >Create PlayList</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBInput label="PlayList Name" id="typeText" type="text" ref={name} />
            <div className='mb-2' style={{display:"flex", justifyContent:'space-between', padding:'5px 5px', marginTop:'10px'}}>
          <label htmlFor="gender" style={{fontSize:'20px'}}>Access</label>
          <select style={{width:"70%"}} data-mdb-select-init ref={access}>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          </div>
            </MDBModalBody>

            <MDBModalFooter>
            <MDBBtn className='mb-3'  color='success' onClick={()=>{
                handleCreate();
                handleClose();
              }}>
                Create
              </MDBBtn>
            <MDBBtn className='mb-3' onClick={()=>{
                handleClose();
              }}>
                Close
              </MDBBtn>


            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default CreateModal