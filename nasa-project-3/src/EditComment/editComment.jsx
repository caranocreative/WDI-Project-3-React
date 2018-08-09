import React from 'react';


const editComment = (props) =>  {

  return (
    <div>
      <h4> Edit Comment</h4>
      <form onSubmit={props.editComment}>
        <label>
          Add comments below:                                                                                              
          <textarea value={props.commentToEdit} onChange={props.handleChange} />        
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>

  )
}

export default editComment;