import './css/login.css'
import {useState} from 'react'
import Modal from './Modal';

let year =new Date().getFullYear();

function Login({data, setUserActive}) {
  
  const [modal, setModal] = useState(false);
  const [newMessage, setMessage] = useState("");
  function validate(e) {
    e.preventDefault();
    let { email, password } = e.target;
    if(email.value === "" || password === "") {
      setModal(()=>true);
      setMessage(()=> "Rellene todos los campos")
    } else {
      const findUser = data.filter(user => user.email === email.value && user.password === password.value);
      if (findUser.length > 0) {
        setUserActive(findUser);
      } else {
        setModal(()=>true);
        setMessage(()=>"Usuario o contraseña incorrecto");
      }
    }
  }


  return (
   <form className="form-login" onSubmit={(e) => validate(e)}>
     {!modal ? <></>: 
      <Modal data={
        {
          title: "Atención", 
          message: newMessage, 
          type: "information",
          active: setModal
        }
      }/>}
    <h2>Log In</h2>
    <div>
      <input type="email" name="email" id="email" placeholder='Email'/>
    </div>
    <div>
      <input type="password" name="password" id="password" placeholder='Password'/>
    </div>
    <input type="submit" value="Login" />     
    <footer className="copy">Gary Yaral ©{year}</footer>
   </form>
  )
}

export default Login;