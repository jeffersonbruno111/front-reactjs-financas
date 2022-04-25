import React from "react";

import Card from "../../components/card";

import { withRouter } from 'react-router-dom'
import * as messages from '../../components/toastr'
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";

import LancamentoService from "../../app/service/lancamentoService";
import LocalStorageService from '../../app/service/localstorageSevice'
import currencyFormatter from "currency-formatter";

class CadastroLancamentos extends React.Component {

    state = {
        idUsuario: null,
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        tipo: '',
        status: ''
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    componentDidMount(){
        const params = this.props.match.params

        if(params.id){
            this.service.obterPorId(params.id)
            .then(response => {
                this.setState( {...response.data})
            }).catch( error => {
                messages.mensagemErro(error.response.data)
            })
        }
    }

    botaoSalvar = () => {
        if(this.state.idUsuario){
            this.atualizar()
        }else(
            this.submit()
        )
    }

    submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
        
        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, idUsuario: usuarioLogado.id }

        try{
            this.service.validar(lancamento);
        }catch(erro){
            const menssages = erro.messages;
            menssages.forEach( msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
        .salvar(lancamento)
        .then(response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso(`Lançamento de valor ${currencyFormatter.format(valor, { locale: 'pt-BR' })} cadastrado com sucesso!`)
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, tipo, id, idUsuario } = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, id, idUsuario }

        try{
            this.service.validar(lancamento);
        }catch(erro){
            const menssages = erro.messages;
            menssages.forEach( msg => messages.mensagemErro(msg));
            return false;
        }

        this.service
        .salvar(lancamento)
        .then(response => {
            this.props.history.push('/consulta-lancamentos')
            messages.mensagemSucesso(`Lançamento de valor ${currencyFormatter.format(valor, { locale: 'pt-BR' })} atualizado com sucesso!`)
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    /*{ melhoria para mudanca de estados "onChange"}*/
    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value})
    }

    render() {

        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (

            <Card title={ this.state.idUsuario ? 'Atualização de Lançamento' : 'Cadastro de Lançamento' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="imputDescricao" label="Descrição: *">
                            <input id="imputDescricao" type="text" 
                            className="form-control" 
                            name="descricao"
                            value={this.state.descricao}
                            onChange={this.handleChange}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                            name="mes"
                            value={this.state.mes}
                            onChange={this.handleChange}
                            lista={meses} 
                            className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-2">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" 
                            type="text" 
                            name="ano"
                            value={this.state.ano}
                            onChange={this.handleChange}
                            className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" 
                            type="text" 
                            name="valor"
                            value={this.state.valor}
                            onChange={this.handleChange}
                            className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                            name="tipo"
                            value={this.state.tipo}
                            onChange={this.handleChange}
                            lista={tipos} 
                            className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text" 
                            name="status"
                            value={this.state.status}
                            className="form-control" 
                            disabled />
                        </FormGroup>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-md-6">
                        {
                            this.state.idUsuario ? 
                            (
                                <button className="btn btn-success" onClick={this.botaoSalvar}>Atualizar</button>
                            ) : (
                                <button className="btn btn-success" onClick={this.botaoSalvar}>Salvar</button>
                            )
                        }                        
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/consulta-lancamentos')}>
                            Cancelar
                            </button>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos);