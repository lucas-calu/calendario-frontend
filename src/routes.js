import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import CadastroEventos from './paginas/CadastroEventos';
import Login from './paginas/Login';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component = { Login }  path="/" exact />
            <Route component = { CadastroEventos }  path="/cadastro" />
            
        </BrowserRouter>
    )
 }
 
 export default Routes;