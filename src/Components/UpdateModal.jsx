import React, { useContext, useRef } from "react";
import { Context } from "../contexts/Context";

import "mdb-react-ui-kit/dist/css/mdb.min.css";
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
} from "mdb-react-ui-kit";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const UpdateModal = () => {
  const { show, setShow, play, setPlay, edit, setShowEdit, showEdit } = useContext(Context);
  const { currUser, setUser } = useAuth();
  let name = useRef();
  let access = useRef();
  const handleClose = () => setShowEdit(false);

  async function handleUpdate() {
    if(name.current.value.trim()){
      let res = await axios.patch(
        `${import.meta.env.VITE_BAPI_URL}/playlist/edit/${edit._id}`,
        {name: name.current.value,access: access.current.value,}
      );
      console.log(res.data.data);
      setPlay((item) => item.map((p)=>{
        if(p._id===edit._id){
          return res.data.data;
        }
        return p;
      }));
    }
    // setPlay((item)=>[...item, playObj]);
  }
  return (
    <div>
      <MDBModal open={showEdit} onClose={handleClose} tabIndex="-1">
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Update PlayList</MDBModalTitle>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput
                label="PlayList Name"
                id="typeText"
                type="text"
                ref={name}
                defaultValue={edit.name}
              />
              <div
                className="mb-2"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px 5px",
                  marginTop: "10px",
                }}
              >
                <label htmlFor="gender" style={{ fontSize: "20px" }}>
                  Access
                </label>
                <select
                  style={{ width: "70%" }}
                  data-mdb-select-init
                  ref={access}
                    defaultValue={edit.access}
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn
                className="mb-3"
                color="success"
                onClick={() => {
                  handleUpdate();
                  handleClose();
                }}
              >
                Update
              </MDBBtn>
              <MDBBtn
                className="mb-3"
                onClick={() => {
                  handleClose();
                }}
              >
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  );
};

export default UpdateModal;
