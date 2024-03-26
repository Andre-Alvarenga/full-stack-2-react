import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TabelaOperacoes from '../telas/tabelaOperacoes';
import Pagina from '../templates/pagina';

function EditaPeca() {
  const { id } = useParams(); // Obtendo o ID da peça da URL

  const [peca, setPeca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeca = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/peca/${id}`);
        if (response.data && response.data.listaPecas && response.data.listaPecas.length > 0) {
            const primeiraPeca = response.data.listaPecas[0];
            setPeca(primeiraPeca);
        } else {
            // Trate o caso em que a lista de peças está vazia ou não existe
        }
        setLoading(false); // Define o carregamento como concluído
      } catch (error) {
        setError(error); // Define o erro, se houver
        setLoading(false); // Define o carregamento como concluído
      }
    };

    fetchPeca(); // Chama a função para buscar os dados da peça
  }, [id]); // Executa o efeito sempre que o ID da peça mudar

  if (loading) {
    return <p>Carregando...</p>; // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  }

  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>; // Exibe mensagem de erro se ocorrer um erro ao buscar os dados da peça
  }

  return (
    <Pagina>
    <div>
      <h2>Editar Peça: {peca.peca_nome}</h2>
      <div>
        <h3>Informações da Peça:</h3>
        <p>ID: {peca.peca_codigo}</p>
        <p>Nome: {peca.peca_nome}</p>
        {/* Outras informações da peça */}
      </div>

      <div>
        <h3>Operações Vinculadas:</h3>
        <TabelaOperacoes pecaId={peca.peca_codigo} /> {/* Passa o ID da peça para o componente da tabela de operações */}
        {/* Adicione a opção de vincular nova operação aqui */}
      </div>
    </div>
    </Pagina>
  );
}

export default EditaPeca;
