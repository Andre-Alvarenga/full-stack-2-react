import React, { createContext, useContext, useState, useEffect } from 'react';

// Criar o contexto de autenticação
export const AutenticacaoContext = createContext();

// Provedor do contexto de autenticação
export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(false);

  // Função para autenticar o usuário
  const login = (usuario, senha) => {
    // Implemente a lógica de autenticação aqui
    if (usuario === 'admin' && senha === 'admin') {
      setAutenticado(true);
      localStorage.setItem('autenticado', 'true');
    } else {
      setAutenticado(false);
      localStorage.removeItem('autenticado');
    }
  };

  // Função para deslogar o usuário
  const logout = () => {
    setAutenticado(false);
    localStorage.removeItem('autenticado');
  };

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const autenticadoLocalStorage = localStorage.getItem('autenticado');
    if (autenticadoLocalStorage === 'true') {
      setAutenticado(true);
    }
  }, []);

  return (
    <AutenticacaoContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AutenticacaoContext.Provider>
  );
};

// Hook personalizado para acessar o contexto de autenticação
export const useAuth = () => useContext(AutenticacaoContext);
