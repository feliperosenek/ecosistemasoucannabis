import React, { useState, useEffect } from "react";
import User from '../../../modules/User'
import { Dropdown } from 'react-bootstrap';

const MenuTopo = () => {

  const [user, setUser] = useState();

  useEffect(() =>{
    (async function () {
      const userData = await User();
      setUser(userData);
    })();
  },[])

  const [logout, setLogout] = useState(false);

  const logoutHandleChange = (event) => {
    setLogout(true);
    localStorage.removeItem("user_code")
    window.location.assign("/login");
  };
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {user &&
                <a className="nav-link" href="#">{user.email_account}</a>
              }
            </li>
       
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                Menu
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutHandleChange} class="btn btn-primary">Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MenuTopo;
