import React from 'react';


const DeletePicture = (props) =>  {

  return (
    <div>
      
      <form onSubmit={props.deletePicture}>
        
        <button onClick={props.deletePicture}>DELETE</button>
      </form>
    </div>

    )
}

export default DeletePicture;