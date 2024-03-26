import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagina from '../templates/pagina';

function TabelaMaquinas() {
    const [maquinas, setMaquinas] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3003/maquina');
                setMaquinas(response.data.listaMaquinas);
            } catch (error) {
                console.error('Erro ao buscar máquinas:', error);
            }
        };

        fetchData();
    }, []);

    const handleExcluir = async (maquinaId) => {
        if (window.confirm('Tem certeza que deseja excluir esta máquina?')) {
            try {
                await axios.delete('http://localhost:3003/maquina', {
                    data: { codigo: maquinaId }
                });
                const updatedMaquinas = maquinas.filter((maquina) => maquina.maquina_codigo !== maquinaId);
                setMaquinas(updatedMaquinas);
            } catch (error) {
                console.error('Erro ao excluir a máquina:', error);
            }
        }
    };

    return (
        <Pagina>
            <h3>Tabela de Máquinas Cadastradas</h3>
            <Link to="/maquinaform" className="btn btn-success mb-3">Cadastrar Máquina</Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {maquinas.map((maquina, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{maquina.nome}</td>
                            <td>
                                <Link to={`/editarmaquinaform/${maquina.codigo}`} className="btn btn-primary mr-2">Editar</Link>
                                <button onClick={() => handleExcluir(maquina.codigo)} className="btn btn-danger mr-2">Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </Pagina>
    );
}

export default TabelaMaquinas;
