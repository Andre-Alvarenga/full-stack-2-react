import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function TabelaInstrucoes({ maquinaId }) {
  const [instrucoes, setInstrucoes] = useState([]);
  const [descricaoInstrucao, setDescricaoInstrucao] = useState('');

  const fetchInstrucoes = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3003/instrucao/maquina/${maquinaId}`);
      if (response.data && response.data.listaInstrucoes && response.data.listaInstrucoes.length > 0) {
        setInstrucoes(response.data.listaInstrucoes);
      } else {
        setInstrucoes([]);
      }
    } catch (error) {
      console.error('Erro ao carregar instruções:', error);
    }
  }, [maquinaId]);

  useEffect(() => {
    fetchInstrucoes();
  }, [fetchInstrucoes]);

  const handleCadastrarInstrucao = async () => {
    try {
      console.log(descricaoInstrucao);
      const response = await axios.post('http://localhost:3003/instrucao/', {
        descricao: descricaoInstrucao,
        codigoMaquina: maquinaId
      });

      console.log('Instrução cadastrada com sucesso:', response.data);
      // Atualiza a lista de instruções após a inserção
      fetchInstrucoes();
      // Limpa o campo de descrição da instrução
      setDescricaoInstrucao('');
    } catch (error) {
      console.error('Erro ao cadastrar instrução:', error);
    }
  };

  const handleDesvincularInstrucao = async (instrucaoId) => {
    const confirmarDesvinculacao = window.confirm('Tem certeza que deseja desvincular esta instrução?');
    if (confirmarDesvinculacao) {
      try {
        await axios.delete('http://localhost:3003/instrucao', {
          data: {
            codigo: instrucaoId
          }
        });
        // Atualiza a lista de instruções após a exclusão
        fetchInstrucoes();
      } catch (error) {
        console.error('Erro ao desvincular instrução:', error);
      }
    }
  };

  return (
    <div>
      <div className='row mb-3'>
        <div className='col-6'>
          <input type="text" className="form-control" value={descricaoInstrucao} onChange={(e) => setDescricaoInstrucao(e.target.value)} placeholder="Digite a descrição da instrução" />
        </div>
        <div className='col-6'>
          <button className="btn btn-primary" onClick={handleCadastrarInstrucao}>Cadastrar Instrução</button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {instrucoes.map((instrucao, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td>{instrucao.descricao}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDesvincularInstrucao(instrucao.codigo)}>Desvincular</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaInstrucoes;
