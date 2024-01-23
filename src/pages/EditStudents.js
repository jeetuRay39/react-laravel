import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import {Link, useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import axios from 'axios';


const EditStudents = () => {

    let {id} = useParams();

    

    const [inputErrorList, setInputErrorList] = useState({});

    const[student, setStudent]= useState({});


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/students/edit/${id}`).then(res=>{
            console.log(res);
            setStudent(res.data.student);

        }).catch((error)=>{
            if(error.response){
                if(error.response.status===422){
                    setInputErrorList(error.response.data.errors)
                }
            }

        });;
      
    
      
    }, [id]);

    const handleInput=(e)=>{
        e.persist();
        setStudent({...student, [e.target.name]:e.target.value});
    }

    const updateStudent=(e)=>{
        e.preventDefault();

        const data ={
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }

        axios.put(`http://127.0.0.1:8000/api/students/edit/${id}`, data).then(
            res=>{
                alert(res.data.message);
                
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
                            <h4>Edit Students</h4>
                            <Link to="/students" >Back</Link>
                        </Card.Title>
                        <Form onSubmit={updateStudent}>
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

                                
                                <Button as="input" type="submit" value="update" variant="outline-success" />{' '}
                                
                        </Form>

                        
                    </Card.Body>




                </Card>

            </Col>
        </Row>
    </Container> );
}
 
export default EditStudents;