import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/telas/login';
import PecaForm from './Components/formularios/cadPeca';
import OperacaoForm from './Components/formularios/cadOperacao';
import Home from './Components/telas/home';
import TabelaPecas from './Components/telas/pecas';
import TabelaOperacoes from './Components/telas/operacoes.jsx';
import EditaPeca from './Components/formularios/editaPeca.jsx';
import EditaOperacao from './Components/formularios/editaOperacao.jsx';
import TabelaMaquinas from './Components/telas/maquinas.jsx';
import MaquinaForm from './Components/formularios/cadMaquina.jsx';
import EditaMaquina from './Components/formularios/editaMaquina.jsx';
const Rotas = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/pecaform" element={<PecaForm />} />
        <Route path="/maquinaform" element={<MaquinaForm />} />
        <Route path="/operacaoform" element={<OperacaoForm />} />
        <Route path="/pecas" element={<TabelaPecas />} />
        <Route path="/maquinas" element={<TabelaMaquinas />} />
        <Route path="/editarpecaform/:id" element={<EditaPeca />} />
        <Route path="/editarmaquinaform/:id" element={<EditaMaquina />} />
        <Route path="/editaroperacaoform/:id" element={<EditaOperacao />} />
        <Route path="/operacoes" element={<TabelaOperacoes />} />
        <Route path="/" element={<Home />} />
        {/* Adicione outras rotas aqui */}
      </Routes>
    </Router>
  );
};

export default Rotas;
