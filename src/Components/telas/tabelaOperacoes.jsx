import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function TabelaOperacoes({ pecaId }) {
  const [operacoes, setOperacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [operacaoSelecionada, setOperacaoSelecionada] = useState('');
  const [allOperacoes, setAllOperacoes] = useState([]);

  const fetchAllOperacoes = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3003/operacao/`);
      if (response.data && response.data.listaOperacoes && response.data.listaOperacoes.length > 0) {
        setAllOperacoes(response.data.listaOperacoes);
      } else {
        setAllOperacoes([]);
      }
    } catch (error) {
      setError(error);
    }
  }, []);

  const fetchOperacoes = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3003/operacaopeca/${pecaId}`);
      if (response.data && response.data.operacoesPeca && response.data.operacoesPeca.length > 0) {
        setOperacoes(response.data.operacoesPeca);
      } else {
        setOperacoes([]);
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [pecaId]);

  useEffect(() => {
    fetchOperacoes();
  }, [fetchOperacoes]);

  useEffect(() => {
    fetchAllOperacoes();
  }, [fetchAllOperacoes]);

  useEffect(() => {
    const fetchOperacoes = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/operacaopeca/${pecaId}`);
        if (response.data && response.data.operacoesPeca && response.data.operacoesPeca.length > 0) {
          setOperacoes(response.data.operacoesPeca);
        } else {
          setOperacoes([]);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOperacoes();
  }, [pecaId, fetchOperacoes]);

  const handleSelecionarOperacao = (event) => {
    setOperacaoSelecionada(event.target.value);
  };

  const handleVincularOperacao = async () => {
    try {
      console.log(pecaId, operacaoSelecionada);
      await axios.post('http://localhost:3003/operacaopeca', {
        nomePeca: pecaId,
        nomeOperacao: operacaoSelecionada
      });
      // Atualiza a lista de operações após a inserção
      fetchOperacoes();
      // Limpa a seleção da operação
      setOperacaoSelecionada('');
    } catch (error) {
      setError(error);
    }
  };

  const handleDesvincularOperacao = async (operacaoId) => {
    const confirmarDesvinculacao = window.confirm('Tem certeza que deseja desvincular esta operação?');
    if (confirmarDesvinculacao) {
      try {
        console.log(pecaId, operacaoId);
        await axios.delete('http://localhost:3003/operacaopeca', {
          data: {
            idPeca: pecaId,
            idOperacao: operacaoId
          }
        });
        // Atualiza a lista de operações após a exclusão
        fetchOperacoes();
      } catch (error) {
        console.error('Erro ao desvincular operação:', error);
      }
    }
  };

  if (loading) {
    return <p>Carregando operações...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro ao carregar as operações: {error.message}</p>;
  }

  return (
    <div>
      <div className='row mb-3'>
        <div className='col-6'>
          <select className="form-control" value={operacaoSelecionada} onChange={handleSelecionarOperacao}>
            <option value="">Selecione uma operação</option>
            {allOperacoes.map(operacao => (
              <option key={operacao.operacao_codigo} value={operacao.operacao_codigo}>{operacao.operacao_descricao}</option>
            ))}
          </select>
        </div>
        <div className='col-6'>
          <button className="btn btn-primary" onClick={handleVincularOperacao}>Vincular Operação</button>
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
          {operacoes.map((operacao, index) => (
            <tr key={operacao.codigoOperacao}>
              <td>{index + 1}</td>
              <td>{operacao.operacao_descricao}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDesvincularOperacao(operacao.codigoOperacao)}>Desvincular</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaOperacoes;
