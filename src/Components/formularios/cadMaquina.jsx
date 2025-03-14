import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagina from '../templates/pagina';

function MaquinaForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3003/maquina', {
        nome: nome,
        descricao: descricao,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Máquina cadastrada:', response.data);
      // Limpar os campos do formulário após o cadastro
      setNome('');
      setDescricao('');
      // Redirecionar para a página inicial após o cadastro
      navigate('/maquinas');
    } catch (error) {
      console.error('Erro ao cadastrar máquina:', error);
      // Exibir mensagem de erro
      setErro('Erro ao cadastrar máquina. Verifique os dados e tente novamente.');
    }
  };

  return (
    <Pagina>    
      <h2>Cadastrar Nova Máquina</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">Nome:</label>
          <input
            type="text"
            className="form-control"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">Descrição:</label>
          <textarea
            className="form-control"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        {erro && <div className="alert alert-danger">{erro}</div>}
        <button type="submit" className="btn btn-primary">Cadastrar Máquina</button>
      </form>
    </Pagina>
  );
}

export default MaquinaForm;
