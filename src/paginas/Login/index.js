import './styles.css';
import { useState} from 'react';

function Login(){
    
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();

    function efetuarLogin(){
        if (login == "admin" && password == "1234"){

            window.location.href = "http://localhost:3000/cadastro";
            
        }
        else{
            alert("Usuário e/ou senha incorreta(s).")
        }


    }

    return (
        <div className="divPrincipal">
            <div className="divExterior">
                <div className="divInterior" >
                    <input type="text" placeholder="Usuário" onChange={eventJS => setLogin(eventJS.target.value)}></input>
                    <input type="password" placeholder="Senha" onChange={eventJS => setPassword(eventJS.target.value)}></input>
                    <button onClick={efetuarLogin}><b>Entrar</b></button>
                </div>
            </div>
        </div>
    );
}


export default Login;