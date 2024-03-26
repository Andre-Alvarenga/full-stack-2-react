import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Pagina from '../templates/pagina';

function EditaOperacao() {
  const { id } = useParams(); // Obtendo o ID da peça da URL

  const [operacao, setOperacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nomeOperacao, setNomeOperacao] = useState('');
  
  useEffect(() => {
    const fetchOperacao = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/operacao/${id}`);
        if (response.data && response.data.listaOperacoes && response.data.listaOperacoes.length > 0) {
            const primeiraOperacao = response.data.listaOperacoes[0];
            setNomeOperacao(primeiraOperacao.operacao_descricao);
            setOperacao(primeiraOperacao);
        } else {
            // Trate o caso em que a lista de peças está vazia ou não existe
        }
        setLoading(false); // Define o carregamento como concluído
      } catch (error) {
        setError(error); // Define o erro, se houver
        setLoading(false); // Define o carregamento como concluído
      }
    };

    fetchOperacao(); // Chama a função para buscar os dados da peça
  }, [id]); // Executa o efeito sempre que o ID da peça mudar

  const handleNomeChange = (event) => {
    setNomeOperacao(event.target.value); // Atualiza o estado do nome da operação ao digitar na caixa de texto
  };

  const handleSalvar = async () => {
    try {
      // Envia a solicitação PUT para salvar as alterações
      await axios.put(`http://localhost:3003/operacao/`, {
        codigo: operacao.operacao_codigo, // Envia o código da operação atual
        nome: nomeOperacao // Envia o novo nome da operação
      });
      // Atualiza o estado da operação com o novo nome
      setOperacao({ ...operacao, operacao_descricao: nomeOperacao });      

    } catch (error) {
      setError('Erro ao salvar alterações.'); // Define o erro, se houver
    }
  };

  if (loading) {
    return <p>Carregando...</p>; // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  }

  if (error) {
    return <p>Ocorreu um erro: {error}</p>; // Exibe mensagem de erro se ocorrer um erro ao buscar os dados da operação
  }

  return (
    <Pagina>
      <div className="container mt-4">
        <h2>Editar Operação: {operacao.operacao_descricao}</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="nomeOperacao">Nome da Operação:</label>
              <input type="text" className="form-control" id="nomeOperacao" value={nomeOperacao} onChange={handleNomeChange} />
            </div>
            <button className="btn btn-primary" onClick={handleSalvar}>Salvar</button>
          </div>
        </div>
      </div>
    </Pagina>
  );
}

export default EditaOperacao;
