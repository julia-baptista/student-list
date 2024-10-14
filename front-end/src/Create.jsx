import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Create() {
  const [values, setValues] = useState({
    name: '',
    email: '',
  })

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/student', values)
      .then(res => {
        console.log(res)
        navigate('/')
      })
      .catch(err => console.log(err))

  }

/*   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/student', values);
      console.log(res.data);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }; */

/*   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/student', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }; */
  

  return (
  <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
      <form onSubmit={handleSubmit}>
        <h2>Add Student</h2>
        <div className="mb-2">
            <label htmlFor="">Name</label>
            <input type="text" placeholder='Enter Name' className='form-control'
            onChange={e => setValues({...values, name: e.target.value})}/>
        </div>
        <div className="mb-2">
            <label htmlFor="">Email</label>
            <input type="email" placeholder='Enter Email' className='form-control'
            onChange={e => setValues({...values, email: e.target.value})} />
        </div>
        <Link to='/' className='btn btn-primary me-2'>Back</Link>
        <button type='submit' className='btn btn-success'>Submit</button>
      </form>
    </div>
  </div>
  )
}

export default Create;