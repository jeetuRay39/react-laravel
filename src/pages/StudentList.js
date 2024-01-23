import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import  axios from 'axios';
import Button from 'react-bootstrap/Button';

const StudentList = () => {

    const [students, setStudents] = useState([]);
  

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/students`).then(res=>{
            console.log(res);
            setStudents(res.data.students);

        });
      
    
      
    }, []);

    const deleteStudent = (e,id)=>{
        e.preventDefault();

        const thisClicked=e.currentTarget;
        thisClicked.innerText = "Deleting....";

        axios.delete(`http://127.0.0.1:8000/api/students/delete/${id}`).then(
            res=>{
                alert(res.data.message);
                thisClicked.closest("tr").remove();
                
            }
        ).catch((error)=>{
            if(error.response){
                if(error.response.status===422){
                    alert(error.response.data.errors);
                    thisClicked.innerText="delete";
                }
            }

        });
    }


    var studentDetails = "";
    studentDetails = students.map((item, index)=>{
        return(
            <tr key={index} >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                <Link to={`/students/edit/${item.id}`} ><Button variant="outline-info">Edit</Button>{' '}</Link>
                </td>
                <td>
                    
                    <Button variant="outline-danger" onClick={(e)=>{deleteStudent(e, item.id)}} >Delete</Button>{' '}
                    
                
                </td>
                


            </tr>

        );

    });
    




    return ( 
        <Container>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <h4>Student Lists</h4>
                                <Link to="/students/create" >Add Student</Link>
                            </Card.Title>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>id</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                   {studentDetails}

                                </tbody>
                            </Table>
                        </Card.Body>




                    </Card>

                </Col>
            </Row>
        </Container>
     );
}
 
export default StudentList;