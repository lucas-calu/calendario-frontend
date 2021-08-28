import { useState,useEffect } from 'react';
import './styles.css';
import api from '../../services/api';
import { Alert } from 'bootstrap';

function CadastroEventos(){
    const [eventos, setEventos] = useState([]);    
    const [descricao, setDescricao] = useState();
    const [horaInicio, setHoraInicio] = useState();
    const [horaFim, setHoraFim] = useState();
    const [editando, setEditando] = useState(false);
    
    const [edicaoId, setEdicaoId] = useState();
    const [edicaoDescricao, setEdicaoDescricao] = useState();
    const [edicaoHoraInicio, setEdicaoHoraInicio] = useState();
    const [edicaoHoraFim, setEdicaoHoraFim] = useState();
    
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

    function preparaEdicao(eventJS, id, descricao, inicio, fim){
        eventJS.preventDefault();
        setEdicaoId(id)
        setEdicaoDescricao(descricao)
        setEdicaoHoraInicio(inicio)
        setEdicaoHoraFim(fim)
        setEditando(true);
    }

    async function alterarEvento(){
        let bodyDeEnvio = {"descricao": edicaoDescricao, "inicio": edicaoHoraInicio, "fim": edicaoHoraFim};
        api
            .put("/eventos/" + edicaoId, bodyDeEnvio)        
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
            {editando ? 
            (
            
                <div className="divExteriorCadastro">                
                    <form className="divInterior2" onSubmit={alterarEvento}>
                        <h3>Edição do Evento {edicaoId}</h3>
                        <input type="text" placeholder="Descrição" onChange={eventJS => setEdicaoDescricao(eventJS.target.value)} value={edicaoDescricao}></input>
                        <input type="datetime-local" placeholder="Data e hora de início" onChange={eventJS => setEdicaoHoraInicio(eventJS.target.value)} value={edicaoHoraInicio}></input>
                        <input type="datetime-local" placeholder="Data e hora de fim" onChange={eventJS => setEdicaoHoraFim(eventJS.target.value)} value={edicaoHoraFim}></input>
                        <button type="submit" ><b>Salvar</b></button>
                        <button onClick={eventJS => setEditando(false)}><b>Cancelar</b></button>

                    </form>
                </div>
            
            ) 
            : 
            ( 
                <div>
                    <div className="divExteriorCadastro">                
                        <form className="divInterior2" onSubmit={salvarEvento}>
                            <h3>Cadastro</h3>
                            <input type="text" placeholder="Descrição" onChange={eventJS => setDescricao(eventJS.target.value)}></input>
                            <input type="datetime-local" placeholder="Data e hora de início" onChange={eventJS => setHoraInicio(eventJS.target.value)}></input>
                            <input type="datetime-local" placeholder="Data e hora de fim" onChange={eventJS => setHoraFim(eventJS.target.value)}></input>
                            <button type="submit"><b>Salvar</b></button>
                        </form>
                    </div>

                    <div className="divExteriorLista">
                        <h3>Eventos cadastrados</h3>
                        <ul>
                            {
                                eventos.map(evento => 
                                (
                                    <li>
                                        <div className="divItemDaLista">
                                            <div><b>Evento: </b>{evento.idEvento} |</div>
                                            <div>&nbsp;<b>Descrição: </b>{evento.descricao} |</div>
                                            <div>&nbsp;<b>Hora de início: </b>{evento.inicio} |</div>
                                            <div>&nbsp;<b>Hora de fim: </b>{evento.fim}  </div>
                                            <button id="botaoEditar" onClick={eventJs => preparaEdicao(eventJs, evento.idEvento, evento.descricao, evento.inicio, evento.fim)}><b>Editar </b></button>
                                            <button id="botaoDeletar" onClick={eventJs => deletaEvento(eventJs, evento.idEvento)}><b>Deletar </b></button>
                                        </div>                                
                                    </li>
                                ))
                            }            
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}


export default CadastroEventos;