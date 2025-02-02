import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'
import Logout from '../logout'
import apiRequest from '../../modules/apiRequest';


function LoginForm() {

  const [emailInput, setEmailInput] = useState([])
  const [passInput, setPassInput] = useState([])
  const [loginSucess, setLoginSucess] = useState(false);
  const [loginErrorPass, setLoginErrorPass] = useState(false);
  const [loginEmailError, setLoginEmailError] = useState(false);
  const [logged, setLogged] = useState(false);

  var verLogin = localStorage.getItem("user_code")

  useEffect(() => {
    if (verLogin) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }, [])


  const userLogin = async (event) => {
    event.preventDefault()
    await apiRequest("/api/directus/login", { "email": emailInput, "pass": passInput }, "POST")
      .then(async response => {
        if (!response) {
          console.log("E-mail ou senha inválidos")
          setLoginEmailError(true)
          setLogged(false)
          setTimeout(() => { setLoginEmailError(false); }, 5000);
        } else {
          localStorage.setItem("user_code", await response.user_code)
          setLogged(true)
          setLoginSucess(true);
          window.location.assign("/");
        }
      })

  }

  const emailHandleChange = (event) => {
    setEmailInput(event.target.value);
  };

  const passHandleChange = (event) => {
    setPassInput(event.target.value);
  };

  return (

    <div class="container">
      {loginSucess && <Navigate to="/" replace={true} />}
      {!logged &&
        <div class="row justify-content-center">
          <div class="col-md-6 form-login">
            {loginEmailError &&
              <div class="alert alert-danger" role="alert">
                E-mail ou senha inválidos
              </div>
            }
            {loginErrorPass &&
              <div class="alert alert-danger" role="alert">
                Senha incorreta
              </div>
            }
            <h1 class="sub-title">Preencha seus dados de acesso</h1>
            <form onSubmit={userLogin}>
              <div class="form-group">
                <label class="label-login" for="email">E-mail:</label>
                <input type="email" class="form-control input-login" onChange={emailHandleChange} value={emailInput} id="email" placeholder="Digite seu email"></input>
              </div>
              <div class="form-group">
                <label class="label-login" for="password">Senha:</label>
                <input type="password" class="form-control input-login" onChange={passHandleChange} value={passInput} id="password" placeholder="Digite sua senha"></input>
              </div>
              <button type="submit" onClick={userLogin} class="btn btn-success btn-lg btn-login">Acessar o sistema</button>
            </form>

          </div>
        </div>
      }

      {logged && <Logout />}
    </div>

  );
}

export default LoginForm;
