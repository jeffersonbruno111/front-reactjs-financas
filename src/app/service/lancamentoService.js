import ApiService from '../apiservice'
import ErroValidacao from '../exception/ErroValidacao'

export default class LancamentoService extends ApiService{

    constructor(){
        super('/lancamentos')
    }

    obterListaMeses(){
        return [
            { label: 'SELECIONE', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 }
        ]
    }

    obterListaTipos(){
        return [
            { label: 'SELECIONE', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' },
        ]
    }

    obterPorId(id){
        return this.get(`/${id}`)
    }

    alterarStatus(id, status){
        return this.put(`/${id}/atualiza-status`, { status })
    }

    validar(lancamento){
        const erros =[];

        if(!lancamento.ano ){
            erros.push("Informe o Ano.")
        }

        if(!lancamento.mes ){
            erros.push("Informe o Mês.")
        }

        if(!lancamento.descricao ){
            erros.push("Informe a Descrição.")
        }

        if(!lancamento.valor ){
            erros.push("Informe o Valor.")
        }

        if(!lancamento.tipo ){
            erros.push("Informe o Tipo.")
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

    salvar(lancamento){
        return this.post('/', lancamento)
    }

    atualizar(lancamento){
        return this.put(`/${lancamento.id}`, lancamento)
    }

    consultar(lancamentoFiltro){
        let param = `?ano=${lancamentoFiltro.ano}`

        if(lancamentoFiltro.mes){
            param = `${param}&mes=${lancamentoFiltro.mes}`
        }

        if(lancamentoFiltro.tipo){
            param = `${param}&tipo=${lancamentoFiltro.tipo}`
        }

        if(lancamentoFiltro.status){
            param = `${param}&status=${lancamentoFiltro.status}`
        }

        if(lancamentoFiltro.usuario){
            param= `${param}&usuario=${lancamentoFiltro.usuario}`
        }

        if(lancamentoFiltro.descricao){
            param = `${param}&descricao=${lancamentoFiltro.descricao}`
        }

        return this.get(param);
    }
    
    deletar(id){
        return this.delete(`/${id}`)
    }
}