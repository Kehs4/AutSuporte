import React from "react";
import { Link } from "react-router-dom";
import '../header.css';
import './login.css';

function Login() {
    return <>

        <div className='autsuporte-container'>
            <div className='autsuporte-header'>
                <h1 className='autsuporte-header'>AutSuporte</h1>
            </div>

            <nav className='autsuporte-options'>
                <Link to="/login">Login</Link>
            </nav>
        </div>
        <div className="login-background">
            <div className="login-container">
                <form className="login-form" action="/login" method="POST">
                    <h1 className='login-title'>AutSuporte</h1>

                    <div className="box-login">
                        <label htmlFor="username">Usuário:</label>
                        <input type="text" id="username" name="username" required />
                    </div>

                    <div className="box-login">
                        <label htmlFor="password">Senha:</label>
                        <input type="password" id="password" name="password" required />
                    </div>

                    <div className="login-actions">
                        <p className='paragraph-signup'>Não tem uma conta ainda? <Link to="/signup" className='btn-signup'>Clique aqui e cadastre-se.</Link></p>

                        <label className="remember-me">
                            <input type="checkbox" name="remember" className="input-remember" />
                            Manter-me conectado
                        </label>
                        
                        <Link to='/dashboard'><button type="submit" className='btn-login'>Entrar</button></Link>

                    </div>
                </form>
            </div>
        </div>


    </>
}

export default Login;