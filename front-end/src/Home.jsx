import {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, [])


/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/');
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []); */


/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []); */


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
    .then(res => {
      //location.reload
      console.log(res.data)
      const newList = data.filter(student => student.ID !== id)
      setData(newList)
    })
    .catch(err => console.log(err));

  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <h2>Student List</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Create +</Link>
        </div>
        <table className='table'>
          <thead>
            <tr >
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((student, index) => {
                return <tr key={index}>
                  <td>{student.ID}</td>
                  <td>{student.Name}</td>
                  <td>{student.Email}</td>
                  <td>
                    <Link to={`/read/${student.ID}`} className='btn btn-sm btn-info'>Read</Link>
                    <Link to={`/edit/${student.ID}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                    <button onClick={() => handleDelete(student.ID)} className='btn btn-sm btn-danger'>Delete</button>
                  </td>
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
   
  )
}

export default Home