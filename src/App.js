import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentList from './pages/StudentList';
import CreateStudents from './pages/CreateStudents';
import EditStudents from './pages/EditStudents';


function App() {
  return (
    <div className="App">
      <Header/>
    
      <Router>
        <Routes>

          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/students' element={<StudentList/>} />
          <Route path='/students/create' element={<CreateStudents/>} />
          <Route path='/students/edit/:id' element={<EditStudents/>} />

        </Routes>
      </Router>
      
   
      

    </div>
  );
}

export default App;
