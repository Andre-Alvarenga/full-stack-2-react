import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';


const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erroLogin, setErroLogin] = useState('');
    const [autenticado, setAutenticado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
                
        if (usuario === 'admin' && senha === 'admin') {            
            setAutenticado(true);
        } else {            
            setErroLogin('Usuário ou senha incorretos');
        }
    };

    // Redirecionar se o usuário estiver autenticado
    if (autenticado) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login</h2>
                            {erroLogin && <div className="alert alert-danger" role="alert">{erroLogin}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="usuario" className="form-label">Usuário</label>
                                    <input type="text" className="form-control" id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha</label>
                                    <input type="password" className="form-control" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Entrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
