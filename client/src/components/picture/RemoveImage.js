import React from 'react';
import { AuthConsumer } from '../../providers/AuthProvider';
import { ImageConsumer } from '../../providers/ImageProvider';
import axios from 'axios';
import deleteImg from '../../img/delete.png';
import styled from 'styled-components';
const RemoveImage = (props) => {

  const removeImage = () => {
    const result = window.confirm("Remove Image from Collection?")
    if (result) {
      props.removeImageFromCollection(props.pictureCollection.id)
    }
  }

  return (
    <>  
      { props.authenticated && 
        <> 
           {
              (props.user.id === props.userId) &&
                <RemoveFromCollection onClick={removeImage}>
                  <RemoveDiv image={deleteImg} />
                    Remove
                </RemoveFromCollection>
           }
        </>
      }
    </>
  )
}

const RemoveFromCollection = styled.div`
  align-items: center;
  display: flex;
  cursor: pointer;
  font-size: 12px;
`
const RemoveDiv = styled.div`

  background-image: url(${props => props.image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 100%;
  height: 30px;
  width: 30px;  
  cursor: pointer;


`

const ConnectedRemoveImage = (props) => (
  <AuthConsumer>
    {(value) => <RemoveImage {...props} {...value} />}
  </AuthConsumer>
);

const ImageConnectedRemoveImage = (props) => (
  <ImageConsumer>
    {(value) => <ConnectedRemoveImage {...props} {...value} />}
  </ImageConsumer>
);

export default ImageConnectedRemoveImage;