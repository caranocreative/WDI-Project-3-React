import React from 'react';


const editComment = (props) =>  {

  return (
    <div>
      <h4> Edit Comment</h4>
      <form onSubmit={props.editComment}>
                                                                                                    
          <textarea name="commentToEdit" type="text" value={props.commentToEdit} onChange={props.handleFormChange} />      
          <br/>
        <input type='submit' value='Submit' />
      </form>
    </div>

  )
}

export default editComment;