import React from 'react';


const Comments = (props) =>  {

  return (
    <div>
      <h4> Add Comments</h4>
      <form onSubmit={props.closeAndEdit}>
        <label>
          Add comments below:                                                                                           
          <textarea onChange={this.handleChange} />        
        </label>
        <button onClick={props.closeAndEdit}>SAVE</button>
      </form>
    </div>

  )
}

export default Comments;