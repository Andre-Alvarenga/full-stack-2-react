import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagina from '../templates/pagina';

function CadOperacao() {
    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3003/operacao', {
                nome: nome,
                descricao: descricao,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Operação cadastrada:', response.data);
            
            setNome('');
            setDescricao('');
            navigate('/operacoes');
        } catch (error) {
            console.error('Erro ao cadastrar operação:', error);
            setErro('Erro ao cadastrar operação. Por favor, tente novamente.');
        }
    };

    return (
        <Pagina>    
            <h2>Cadastrar Nova Operação</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        className="form-control"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">Descrição:</label>
                    <textarea
                        id="descricao"
                        className="form-control"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </div>
                {erro && <div className="alert alert-danger">{erro}</div>}
                <button type="submit" className="btn btn-primary">Cadastrar Operação</button>
            </form>
        </Pagina>
    );
}

export default CadOperacao;
