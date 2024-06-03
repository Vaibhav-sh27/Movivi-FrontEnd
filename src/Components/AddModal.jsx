import React, { useContext, useRef } from 'react'

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
import { Context } from '../contexts/Context';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AddModal = () => {
    const {show, setShow, play, setPlay, playItem} = useContext(Context);
    const {setToken, setUser, currUser} = useAuth();

    let navigate=useNavigate();
    const handleClose = () => setShow(false);

    async function handleAdd(i) {
  
        let res = await axios.patch(`${import.meta.env.VITE_BAPI_URL}/playlist/${i._id}`, playItem)
        // console.log(res.data);
        // setPlay((item)=>[...item, res.data.data]);


        setPlay((item)=>item.map((p)=>{
          if(p._id==i._id){
              // console.log('push');
              p.movies=[...p.movies, playItem];
          }
          return p;
        }));

        // console.log(play);
    }
  return (
    <div>
        <MDBModal open={show} onClose={handleClose} tabIndex='-1' >
        <MDBModalDialog >
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle >Choose PlayList</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
            {play.length>0 ? 
              play && play.map((item)=>{
                return <div onClick={()=>{
                    handleAdd(item);
                    handleClose();
                }} style={{margin:'15px 28px', backgroundColor:'#3DD2CC', color:'white', padding:'10px 20px', borderRadius:'25px', cursor:'pointer'}}>
                    <h3 style={{margin:0, fontWeight:"600"}}><i className="fas fa-circle-play"></i> &nbsp; {item.name}</h3>
                </div>
            }) :
            <div style={{margin:'15px 28px', backgroundColor:'#3DD2CC', color:'white', padding:'10px 20px', borderRadius:'25px', cursor:'pointer'}}>
                    <h3 style={{margin:0, fontWeight:"600"}}><i className="fas fa-circle-play"></i> &nbsp; No PlayList Found! </h3>
                </div>
            }
            </MDBModalBody>

            <MDBModalFooter>

              <MDBBtn className='mb-3'  color='success' onClick={()=>{
                navigate('/playlists')
                handleClose();
              }}>
                Create New PlayList
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

export default AddModal