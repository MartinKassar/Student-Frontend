import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

export class App extends Component {

  constructor() {
    super();
    this.state = {
      studentList: [],
      studentObj: {
        students: {
          email: '',
          name: '',
          address: {
            street: '',
            zipcode: '',
            city: ''
          }
        }
      }

    };
  }

  componentDidMount(){
    fetch("http://localhost:3000/students")
      .then(res => res.json())
      .then(data => {

        this.setState({ studentList: data });

        console.log('this is students', this.state.studentList)
        // console.log('this is ID', data[1]._id)
      })
      .catch(error => console.error(error));

  }

getStudents = () => {
  fetch("http://localhost:3000/students")
      .then(res => res.json())
      .then(data => {

        this.setState({ studentList: data });

        console.log('this is students', this.state.studentList)
        // console.log('this is ID', data[1]._id)
      })
      .catch(error => console.error(error));
}

  post = (e) => {
  
    var studentInfo = { ...this.state.studentObj }
    studentInfo.students.name = e.target.elements.name.value
    studentInfo.students.email = e.target.elements.email.value
    studentInfo.students.address.street = e.target.elements.street.value
    studentInfo.students.address.city = e.target.elements.city.value
    studentInfo.students.address.zipcode = e.target.elements.zipcode.value
    this.setState({ studentObj: studentInfo })

    fetch("http://localhost:3000/students", {
      method: 'POST',
      body: JSON.stringify(this.state.studentObj),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
      
      
  }
 
 
  deleteUser = (id) => {
    fetch("http://localhost:3000/students/" + id, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));
  }
  
  render() {
    console.log('this is state', this.state.studentObj)

    return (
      <div className="App">
        
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Street</th>
              <th>City</th>
              <th>Zipcode</th>
              <th>Delete user</th>

            </tr>

            {this.state.studentList.map((student, i) => (
              <tr key={i}>
                <td>{student.students.name}</td>
                <td>{student.students.email}</td>
                <td>{student.students.address.street}</td>
                <td>{student.students.address.city}</td>
                <td>{student.students.address.zipcode}</td>
                <td>{student.students._id}</td>
                {console.log(student._id)}

                <button onClick={()=> this.deleteUser(student._id)}>Delete</button>
              </tr>

            ))}

          </tbody>
        </table>

        <button onClick={this.getStudents}>get student</button>

        <form onSubmit={this.post}>
          <input type="text" name="name" placeholder="Name..." />
          <br />
          <input type="text" name="email" placeholder="Email..." />
          <br />
          <input type="text" name="street" placeholder="Street..." />
          <br />
          <input type="text" name="city" placeholder="City..." />
          <br />
          <input type="text" name="zipcode" placeholder="Zipcode..." />
          <br />
          <button>POST</button>
        </form>
      </div>
    )
  }
}

export default App
