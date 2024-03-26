import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagina from '../templates/pagina';

function TabelaPecas() {
    const [pecas, setPecas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3003/peca');
                setPecas(response.data.listaPecas);
            } catch (error) {
                console.error('Erro ao buscar peças:', error);
            }
        };

        fetchData();
    }, []);

    const handleExcluir = async (pecaId) => {
        if (window.confirm('Tem certeza que deseja excluir esta peça?')) {
            try {
                await axios.delete('http://localhost:3003/peca', {
                    data: { codigo: pecaId }
                });
                const updatedPecas = pecas.filter((peca) => peca.peca_codigo !== pecaId);
                setPecas(updatedPecas);
            } catch (error) {
                console.error('Erro ao excluir a peça:', error);
            }
        }
    };

    return (
        <Pagina>
            <h3>Tabela de Peças Cadastradas</h3>
            <Link to="/pecaform" className="btn btn-success mb-3">Cadastrar Peça</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {pecas.map((peca, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{peca.peca_nome}</td>
                            <td>
                                <Link to={`/editarpecaform/${peca.peca_codigo}`} className="btn btn-primary mr-2">Editar</Link>
                                <button onClick={() => handleExcluir(peca.peca_codigo)} className="btn btn-danger mr-2">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </Pagina>
    );
}

export default TabelaPecas;
