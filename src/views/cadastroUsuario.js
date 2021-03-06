import React from "react";

import Card from '../components/card';
import FormGroup from "../components/form-group";
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService'
import { mensagemSucesso, mensagemErro } from "../components/toastr";

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state
        const usuario = { nome, email, senha, senhaRepeticao }

        try {
            this.service.validar(usuario);
        } catch (erro) {
            const msgs = erro.messages;
            msgs.forEach(msg => mensagemErro(msg))
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso. Faça o login para acessar o sistema ')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })}
                                    placeholder="Digite o nome" />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })}
                                    placeholder="Digite o email" />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="inputSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })}
                                    placeholder="Digite a senha" />
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    id="inputRepitaSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })}
                                    placeholder="Repita a senha" />
                            </FormGroup>
                            <br />
                            <button onClick={this.cadastrar} type="button" className="btn btn-success" title="Salvar Usuário">
                                <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger" title="Cancelar Cadastro de Usuário e voltar">
                                <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(CadastroUsuario)