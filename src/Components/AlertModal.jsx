import { useContext, useState } from 'react';
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
  } from 'mdb-react-ui-kit';
import { Context } from '../contexts/Context';
import { useNavigate } from 'react-router-dom';

function AlertModal() {
  const {show, setShow, alert, setAlert} = useContext(Context);
let navigate = useNavigate();
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

  return (
    <>


      <MDBModal open={show} onClose={handleClose} tabIndex='-1'>
        <MDBModalDialog >
          <MDBModalContent >
            <MDBModalHeader>
              <MDBModalTitle>Movivi Say's</MDBModalTitle>
              {/* <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn> */}
            </MDBModalHeader>
            <MDBModalBody style={{fontSize:'20px'}}>{alert}</MDBModalBody>

            <MDBModalFooter>
            {alert==='This PlayList is Private!!!'?
            <MDBBtn onClick={()=>{
              navigate('/');
              setAlert("");
              handleClose();
            }}>
                ok
              </MDBBtn> :
              <MDBBtn onClick={handleClose}>
                ok
              </MDBBtn>
            }

              {/* <MDBBtn>Save changes</MDBBtn> */}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}

export default AlertModal;