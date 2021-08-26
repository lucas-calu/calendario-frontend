import './styles.css';

function Login(){
    return (
        <div className="divPrincipal">
            <div className="divExterior">
                <div className="divInterior">
                    <input type="text" placeholder="Usuário"></input>
                    <input type="password" placeholder="Senha"></input>
                    <button type="submit">Entrar</button>
                </div>
            </div>
        </div>
    );
}


export default Login;