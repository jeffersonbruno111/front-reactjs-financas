import React from "react";

import Home from '../views/home'
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import CadastroLancamento from '../views/lancamentos/cadastro-lancamentos'
import ConsultaLancamento from '../views/lancamentos/consulta-lancamentos'
import { AuthConsumer } from "./provedorAutenticacao";

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';

function RotaAutenticada({component: Component, isUsuarioAutenticado, ...props}){
    return(
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
                return(
                    <Component {...componentProps}/>
                )
            }else{
                return(
                    <Redirect to={ {pathname: '/login', state: {from: componentProps.location}}} />
                )
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/cadastro-usuarios' component={CadastroUsuario} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path='/home' component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path='/consulta-lancamentos' component={ConsultaLancamento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path='/cadastro-lancamentos/:id?' component={CadastroLancamento} />
            </Switch>
        </HashRouter>
    )
}



export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado}  />)}
    </AuthConsumer>
);