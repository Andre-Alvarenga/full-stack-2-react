import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagina from '../templates/pagina';

function TabelaOperacoes() {
    const [operacoes, setOperacoes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3003/operacao');
                setOperacoes(response.data.listaOperacoes);
            } catch (error) {
                console.error('Erro ao buscar operações:', error);
            }
        };

        fetchData();
    }, []);

    const handleExcluir = async (operacaoId) => {
        if (window.confirm('Tem certeza que deseja excluir esta operação?')) {
            try {
                await axios.delete('http://localhost:3003/operacao', {
                    data: { codigo: operacaoId }
                });
                const updatedOperacoes = operacoes.filter((operacao) => operacao.operacao_codigo !== operacaoId);
                setOperacoes(updatedOperacoes);
            } catch (error) {
                console.error('Erro ao excluir a operação:', error);
            }
        }
    };

    return (
        <Pagina>
            <h3>Tabela de Operações Cadastradas</h3>
            <Link to="/operacaoform" className="btn btn-success mb-3">Cadastrar Operação</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {operacoes.map((operacao, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{operacao.operacao_descricao}</td>
                            <td>
                                <Link to={`/editaroperacaoform/${operacao.operacao_codigo}`} className="btn btn-primary mr-2">Editar</Link>
                                <button onClick={() => handleExcluir(operacao.operacao_codigo)} className="btn btn-danger mr-2">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </Pagina>
    );
}

export default TabelaOperacoes;
