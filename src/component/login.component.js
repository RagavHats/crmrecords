import React, { Component } from "react";
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        
       
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email : '',
            password : ''
        }
    }

    onChangeemail(e){
        this.setState({
            email : e.target.value
        });
    }
    onChangepassword(e){
        this.setState({
            password : e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();

        const user = {
           
            email : this.state.email,
            password : this.state.password,
        }

        //console.log(user);

        axios.post('http://localhost:5000/users/login',user)
        .then(res =>{
            console.log(res['data']);
            if(res['data'] !== 'sucess'){
                document.getElementById('success').innerHTML ="Username and password are not matched";
            }else{
                document.getElementById('success').innerHTML ="success .";
               console.log('success');
            }
        });

        this.setState({
            firstname : '',
            lastname : '',
            email : '',
            password :'',
            success :'success'
        })
    }

    render() {
        return (
            <div className="container" style={{width:300}}>
                    <h3>Login</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" name="email"
                        value={this.state.email} onChange={this.onChangeemail}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.onChangepassword}/>
                    </div>

                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>
                    <span className="forgot-password text-left" id="success" style={{color:'#00FF00',fontSize:'25'}}>
                   
                </span>
                    <button type="submit" className="btn btn-primary btn-block" name ="submit">Submit</button>
                </form>
            </div>
        );
    }
}
export default Login;