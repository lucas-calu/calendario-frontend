import { useState,useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import { Alert } from 'bootstrap';

function CadastroEventos(){
    const [eventos, setEventos] = useState([]);    
    const [descricao, setDescricao] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [horaFim, setHoraFim] = useState();

    async function salvarEvento(){
        let bodyDeEnvio = {"descricao": descricao, "inicio": horaInicio, "fim": horaFim};
        api
            .post("/eventos", bodyDeEnvio)        
            .then((response) => setEventos([...eventos, response.data]))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    async function deletaEvento(eventJS, id){
        eventJS.preventDefault();
        api
            .delete("/eventos/" + id)
            .then((response) => window.location.reload())
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
                }); 
    }

    useEffect(() => {
        api
          .get("/eventos")
          .then((response) => setEventos(response.data))
          .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
          });
      }, []);

    return (
        <div className="divPrincipal2">
            
            <div className="divExteriorCadastro">                
                <form className="divInterior2" onSubmit={salvarEvento}>
                    <h3>Cadastro</h3>
                    <input type="text" placeholder="Descrição" onChange={eventJS => setDescricao(eventJS.target.value)}></input>
                    <input type="datetime-local" placeholder="Data e hora de início" onChange={eventJS => setHoraInicio(eventJS.target.value)}></input>
                    <input type="datetime-local" placeholder="Data e hora de fim" onChange={eventJS => setHoraFim(eventJS.target.value)}></input>
                    <button type="submit">Salvar</button>
                </form>
            </div>

            <div className="divExteriorLista">
                <h3>Eventos cadastrados</h3>
                <ul>
                    {
                        eventos.map(evento => (
                            <li>
                                <div className="divItemDaLista">
                                    <div>Descrição: {evento.descricao} |</div>
                                    <div>&nbsp;Hora de início: {evento.inicio} |</div>
                                    <div>&nbsp;Hora de fim: {evento.fim}  </div>
                                    <button id="botaoEditar">Editar </button>
                                    <button id="botaoDeletar" onClick={eventJs => deletaEvento(eventJs, evento.idEvento)}>Deletar </button>
                                </div>                                
                            </li>
                        ))
                    }            
                </ul>
            </div>
        </div>
    );
}


export default CadastroEventos;