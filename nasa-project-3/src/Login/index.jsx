import React, { Component } from 'react';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: ''
		}
	}

    handleSubmit = (e) => {
	    e.preventDefault();
	
	    const loginResponse = await fetch('http://localhost:9000/??????????', {
		    method: 'POST',
		    credentials: 'include',
		    body: JSON.stringify(this.state),
		    headers: {
			    'content-Type': 'application/json'
		}
	});

	const parsedResponse = await loginResponse.json();

	if(parsedResponse.data = 'login successful') {
		this.props.history.push('/??????????');
	}

	console.log(parsedResponse, ' this is the response form api')

}
    handleChange = (e) => {
	    this.setState({[e.target.name]: e.target.value});
}
    render(){
	    return(
		    <form onSubmit={this.handleSubmit}>
			    <label>
			    Username:
			    <input type='text' name='username' onChange={this.handleChange} />
			    </label>
			    <label>
			    Password:
			    <input type='password' name='password' onChange={this.handleChange} />
			    </label>
			    <input type='Submit' value='Login'/>
		    </form>	

	    )
    }
}

export default Login;

