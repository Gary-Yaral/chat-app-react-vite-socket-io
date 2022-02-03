import './css/login.css'

function Login({data, setUserActive}) {
  function validate(e) {
    e.preventDefault();
    let { email, password } = e.target;
    const findUser = data.filter(user => user.email === email.value && user.password === password.value);
    if (findUser.length > 0) {
      setUserActive(findUser);
    }
  }


  return (
   <form 
    className="form-login"
    onSubmit={(e) => validate(e)}>
    <h2>Decpify</h2>
    <div>
      <label for="email" >Email</label>
      <input type="email" name="email" id="email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
    </div>
    <input type="submit" value="Login" />     
   </form>
  )
}

export default Login;