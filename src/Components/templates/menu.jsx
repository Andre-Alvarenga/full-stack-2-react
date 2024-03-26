import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Menu</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="cadastrosDropdown">
                                    Cadastros
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/pecas">Peças</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/operacoes">Operações</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/maquinas">Maquinas</Dropdown.Item>
                                    {/* Adicione outras opções de cadastro aqui */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                        <li className="nav-item">
                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="relatoriosDropdown">
                                    Relatórios
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to="/relatorios/pecas">Relatório de Peças</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/relatorios/operacoes">Relatório de Operações</Dropdown.Item>
                                    {/* Adicione outras opções de relatório aqui */}
                                </Dropdown.Menu>
                            </Dropdown>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
