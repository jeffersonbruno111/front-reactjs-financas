import ApiService from '../apiservice'

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