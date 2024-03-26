import React, { useContext } from 'react';
import { Navigate, Route } from 'react-router-dom';
import { AutenticacaoContext } from './Autenticacao';

const RotaProtegida = ({ element, ...props }) => {
  const { autenticado } = useContext(AutenticacaoContext);

  return autenticado ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default RotaProtegida;
