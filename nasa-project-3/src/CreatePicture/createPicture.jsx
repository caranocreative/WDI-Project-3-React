import React from 'react';


const CreatePicture = (props) => {
 
  
  return (
    <form onSubmit={props.addPicture}> 
      <input type='Submit'/>
    </form>

  )
}


export default CreatePicture;