import { useEffect, useState, useRef } from "react";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api";

function Home() {

  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers(){
    const usersFromApi = await api.get('/users');

    setUsers(usersFromApi.data);
  }

  async function createUsers(){
    await api.post('/users', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    });

    getUsers();
  }

  async function deleteUsers(id){
    await api.delete(`/users/${id}`);

    getUsers();

  }

  useEffect(() => {
    getUsers();
  }, [])  

  return (    
      <div className="container">
        <form>
          <h1>Create Users</h1>
          <input placeholder="Name" name="name" type="text" ref={inputName}/>
          <input placeholder="Age" name="age" type="number" ref={inputAge}/>
          <input placeholder="Email" name="email" type="email" ref={inputEmail}/>
          <button type="button" onClick={createUsers}>Create</button>
        </form>

        { users.map( user => (
          <div key={user.id} className="card">
            <div>
              <p>Name: <span>{user.name}</span></p>
              <p>Age: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={Trash}/>
            </button>
        </div>
        ))}


      </div>
  )
}

export default Home
