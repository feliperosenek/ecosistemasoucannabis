import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import User from '../../../modules/User'
import CheckIcon from './checkIcon'

const Sidebar = () => {  
  const [user, setUser] = useState({}); 

  useEffect(() => {
    (async () => {
      const userData = await User();
      setUser(userData);
    })()

 

  }, []);

  return (
    <div>
      <div>
        <div className="bg-green text-white" >
          <ul className="listPages">
          {user.associate_status <= 1 &&(
              <div>
                <Link to="/solicitacao-contato"><li><CheckIcon status={1}/>Solicitação de contato</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Cadastro de associado</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Documentação</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Consulta Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Receita Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Aguardando aprovação do cadastro</li></Link>
              </div>
            )}
            {user.associate_status === 2 && (
              <div>
                <Link><li className="line-through"><CheckIcon status={2}/>Solicitação de contato</li></Link>
                <Link to="/cadastro-associado"><li><CheckIcon status={1}/>Cadastro de associado</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Documentação</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Consulta Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Receita Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

            {user.associate_status === 3 && (
              <div>
             
                <Link><li className="line-through"><CheckIcon status={2}/>Solicitação de contato</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Cadastro de associado</li></Link>
                <Link to="/documentos"><li><CheckIcon status={1}/>Documentação</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Consulta Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Receita Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

            {user.associate_status === 4 && (
              <div>
                <Link><li className="line-through"><CheckIcon status={2}/>Solicitação de contato</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Cadastro de associado</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Documentação</li></Link>
                <Link to="/consulta"><li><CheckIcon status={1}/>Consulta Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Receita Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

            {user.associate_status === 5 && (
              <div>
                <Link><li className="line-through"><CheckIcon status={2}/>Solicitação de contato</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Cadastro de associado</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Documentação</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Consulta Medica</li></Link>
                <Link to="/receita-medica"><li><CheckIcon status={1}/>Receita Medica</li></Link>
                <Link><li className="disabled"><CheckIcon status={1}/>Aguardando aprovação do cadastro</li></Link>
              </div>
            )}

          {user.associate_status === 6 && (
              <div>
                <Link><li className="line-through"><CheckIcon status={2}/>Solicitação de contato</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Cadastro de associado</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Documentação</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Consulta Medica</li></Link>
                <Link><li className="line-through"><CheckIcon status={2}/>Receita Medica</li></Link>
                <Link to="/cadastro-aprovado"><li><CheckIcon status={1}/>Aguardando aprovação do cadastro</li></Link>
              </div>
            )}


          </ul>
        </div>
      </div>

    </div>

  );
}

export default Sidebar;
