import React, { useState, useEffect ,Component } from 'react';
import Pagination from "react-js-pagination";
import axios from 'axios';


class page extends Component {

    constructor(props){
        super(props);

        
        this.state = {
          categories:[],
            activePage:1,
          itemsCountPerPage:1,
          totalItemsCount:1,
          valuefilter: "1"
        }

        
    }

    componentDidMount(){
      axios.post('http://localhost:5000/users/categories/0/username')
        .then(response =>{
          this.setState({categories:response.data})
         console.log(this.state.categories)
        })
    }
    
    handlePageChange(pageNumber) {

        let selectedfilter = document.getElementById('lang').value;
        axios.post('http://localhost:5000/users/categories/'+pageNumber+'/' + selectedfilter)
          .then(response =>{
            this.setState({categories:response.data})
          console.log(this.state.categories)
          })

        this.setState({activePage: pageNumber});
    }

    handleChange(event){
      let value = event.target.value;
      let numberchange = this.state.activePage - 1;
      console.log(numberchange)
      axios.post('http://localhost:5000/users/categories/'+numberchange+'/' + value)
        .then(response =>{
          this.setState({categories:response.data})
         console.log(this.state.categories)
        })
     }
render() {
   
  return (
     <div>
        <div align="right">
          <label > Filter By </label>
          <select id="lang" className="form-control col-4" onChange={(e) => this.handleChange(e)}>
            <option defaultValue  value="username" >Recent</option>
            <option value="categoriesname" >categories Name</option>
            <option value="username" >Username</option>
            <option value="projectname" >Project Name</option>
          </select>
        </div>
        <br/>
        <table className="table table-bordered">
          <thead>
            <tr>
            
              <th scope="col">Project Title</th>
              <th scope="col">Username  </th>
              <th scope="col">CategoryName</th>
            </tr>
          </thead>
          <tbody>
            {this.state.categories.map((item, index)=>{
                return(
                      <tr key={index} value={index}>
                        <td>{item.projectname}</td>
                        <td>{item.email}</td>
                        <td>{item.categoriesname}</td>
                      </tr>
                )

            })}
          </tbody>
        </table>


        <div className="d-flex justify-content-center">
          <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={2}
          totalItemsCount={10}
          pageRangeDisplayed={2}
          onChange={this.handlePageChange.bind(this)}
          itemClass="page-item"
          linkClass="page-link"
        />
        </div>
        
        
      </div>
  );
}
};

export default page;