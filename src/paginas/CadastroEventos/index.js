import { useState } from 'react';
import './styles.css';

function CadastroEventos(){
    const [eventos, setEventos] = useState([{"descricao":"teste1"},{"descricao":"teste2"}]);
    return (
        <div className="divPrincipal2">
            
            <div className="divExteriorCadastro">                
                <div className="divInterior2">
                <h3>Cadastro</h3>
                    <input type="text" placeholder="Descrição"></input>
                    <input type="datetime-local" placeholder="Data e hora de início"></input>
                    <input type="datetime-local" placeholder="Data e hora de fim"></input>
                    <button type="submit">Salvar</button>
                </div>
            </div>

            <div className="divExteriorLista">
                <h3>Eventos cadastrados</h3>
                <ul>
                    {
                        eventos.map(evento => (
                            <li>
                                <div>
                                    
                                </div>
                                {evento.descricao}
                            </li>
                        ))
                    }            
                </ul>
            </div>
        </div>
    );
}


export default CadastroEventos;