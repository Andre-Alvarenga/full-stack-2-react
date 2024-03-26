import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TabelaInstrucoes from '../telas/tabelaInstrucoes.jsx'; 
import Pagina from '../templates/pagina';

function EditaMaquina() {
  const { id } = useParams(); 

  const [maquina, setMaquina] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaquina = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/maquina/${id}`);
        if (response.data && response.data.listaMaquinas && response.data.listaMaquinas.length > 0) {
            const primeiraMaquina = response.data.listaMaquinas[0];
            setMaquina(primeiraMaquina);
        } else {
            // Trate o caso em que a lista de máquinas está vazia ou não existe
        }
        setLoading(false); // Define o carregamento como concluído
      } catch (error) {
        setError(error); // Define o erro, se houver
        setLoading(false); // Define o carregamento como concluído
      }
    };

    fetchMaquina(); // Chama a função para buscar os dados da máquina
  }, [id]); // Executa o efeito sempre que o ID da máquina mudar

  if (loading) {
    return <p>Carregando...</p>; // Exibe mensagem de carregamento enquanto os dados estão sendo buscados
  }

  if (error) {
    return <p>Ocorreu um erro: {error.message}</p>; // Exibe mensagem de erro se ocorrer um erro ao buscar os dados da máquina
  }

  return (
    <Pagina>
      <div>
        <h2>Editar Máquina: {maquina.nome}</h2>
        <div>
          <h3>Informações da Máquina:</h3>
          <p>ID: {maquina.codigo}</p>
          <p>Nome: {maquina.nome}</p>
          {/* Outras informações da máquina */}
        </div>

        <div>
          <h3>Instruções Vinculadas:</h3>
          <TabelaInstrucoes maquinaId={maquina.codigo} /> {/* Passa o ID da máquina para o componente da tabela de instruções */}
          {/* Adicione a opção de vincular nova instrução aqui */}
        </div>
      </div>
    </Pagina>
  );
}

export default EditaMaquina;
