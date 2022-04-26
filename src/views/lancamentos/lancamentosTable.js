import React from "react";
import currencyFormatter from "currency-formatter";

export default props => {

    const rows = props.lancamentos.map((lancamento, index) => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button className="btn btn-success"
                        onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}
                        disabled={lancamento.status !== 'PENDENTE'}
                        type="button"
                        title="Efetivar Lançamnto">
                        <i className="pi pi-check"></i>
                    </button>
                    <button className="btn btn-warning"
                        onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}
                        disabled={lancamento.status === 'CANCELADO'}
                        type="button"
                        title="Cancelar Lançamento">
                        <i className="pi pi-times"></i>
                    </button>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={e => props.editAction(lancamento.id)}
                        title="Editar Lançamento">
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"
                        className="btn btn-danger"
                        onClick={e => props.deleteAction(lancamento)}
                        title="Excluir Lançamento">
                        <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}