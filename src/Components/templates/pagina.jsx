import React from 'react';
import Menu from './menu';
import Cabecalho from './cabecalho';
import { Container } from 'react-bootstrap';

const Pagina = ({ children }) => {
    return (
        <div>
            {/* Componente do cabeçalho */}
            <Cabecalho />
            
            {/* Componente do menu */}
            <Menu />
            
            {/* Conteúdo da página */}
            <Container className="mt-4" style={{ minHeight: '100vh' }}>
                <div>
                    {children}
                </div>
            </Container>
            
            {/* Rodapé */}
            <footer>
                © 2022 Meu Aplicativo
            </footer>
        </div>
    );
};

export default Pagina;
