import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {Link, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';


const CreateStudents = () => {

    const navigate = useNavigate();

    const [inputErrorList, setInputErrorList] = useState({});

    const[student, setStudent]= useState({
        name:'',
        course:'',
        email:'',
        phone:'',
    });

    const handleInput=(e)=>{
        e.persist();
        setStudent({...student, [e.target.name]:e.target.value});
    }

    const saveStudent=(e)=>{
        e.preventDefault();

        const data ={
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }

        axios.post(`http://127.0.0.1:8000/api/students`, data).then(
            res=>{
                alert(res.data.message);
                navigate('/students');
            }
        ).catch((error)=>{
            if(error.response){
                if(error.response.status===422){
                    setInputErrorList(error.response.data.errors)
                }
            }

        });

    }



    return ( 
    <Container>
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <h4>Create Students</h4>
                            <Link to="/students" >Back</Link>
                        </Card.Title>
                        <Form onSubmit={saveStudent}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name='name' value={student.name} onChange={handleInput} placeholder="name" />
                                    <span className='text-danger' >{inputErrorList.name}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Course</Form.Label>
                                    <Form.Control type="text" name='course' value={student.course} onChange={handleInput} placeholder="course" />
                                    <span className='text-danger' >{inputErrorList.course}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" name='email' value={student.email} onChange={handleInput} placeholder="email" />
                                    <span className='text-danger' >{inputErrorList.email}</span>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" name='phone' value={student.phone} onChange={handleInput} placeholder="phone" />
                                    <span className='text-danger' >{inputErrorList.phone}</span>
                                </Form.Group>

                                
                                <Button as="input" type="submit" value="Submit" variant="outline-success" />{' '}
                                
                        </Form>

                        
                    </Card.Body>




                </Card>

            </Col>
        </Row>
    </Container> );
}
 
export default CreateStudents;