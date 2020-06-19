import React, { Component } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends Component {
    constructor(props){
        super(props);
        
        this.onChangefirstname = this.onChangefirstname.bind(this);
        this.onChangelastname = this.onChangelastname.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangepassword = this.onChangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            firstname : '',
            lastname : '',
            email : '',
            password : '',
            success : ''
        }
    }
 
    onChangefirstname(e){
        this.setState({
            firstname : e.target.value
        });
    }
    onChangelastname(e){
        this.setState({
            lastname : e.target.value
        });
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
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            email : this.state.email,
            password : this.state.password,
        }

        console.log(user);
        this.setState({
            username : '',
        })
        axios.post('http://localhost:5000/users/add',user)
        .then(res =>{
            if(res['data'] !== 'user added'){
                document.getElementById('success').innerHTML ="Already Email Id Exists";
            }else{
                document.getElementById('success').innerHTML ="success . Account Created";
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
            <form onSubmit={this.onSubmit}>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" name="firstname" value={this.state.firstname} onChange={this.onChangefirstname}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" name="lastname" value={this.state.lastname} onChange={this.onChangelastname}/>
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" name="email" value={this.state.email} onChange={this.onChangeemail}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" name="password" value={this.state.password} onChange={this.onChangepassword}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" name="submit">Sign Up</button>
                <span className="forgot-password text-left" id="success" style={{color:'#00FF00',fontSize:'25'}}>
                   
                </span>
                <p className="forgot-password text-right">
                    Already registered <a href="/">sign in?</a>
                </p>
            </form>
        );
    }
}

export default SignUp;