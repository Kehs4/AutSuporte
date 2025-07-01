import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import '../header.css'
import './login.css'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Login() {
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalBorder, setModalBorder] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "AutSuporte - SignIn";
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://177.11.209.38/constellation/IISConstellationAPI.dll/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Basic ' + btoa(`${username}:${password}`),
                },
                body: JSON.stringify({
                    unid_negoc: 211,
                    unid_oper: 1,
                    dev_mode: "S",
                    svcName: "desenv-vertis"
                })
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage('');
                setModalBorder('');
                setShowSuccessModal(true);

                // Armazena os dados do usuário no localStorage
                localStorage.setItem('user', JSON.stringify({
                   token: data.token,
                }));

                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setModalBorder('red');
                setErrorMessage('Erro ao realizar login. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }


    return (
        <>

            <div className='autsuporte-container-dashboard'>
                <div className='autsuporte-header'>
                    <h1 className='autsuporte-header-title'>AutSuporte</h1>
                </div>
            </div>

            <div className="login-background">
                <div className="login-container">
                    <form onSubmit={handleSubmit} className="login-form" action="/login" method="POST">
                        <h1 className='login-title'>AutSuporte</h1>

                        <div className="box-login">
                            <label htmlFor="" className="label-email">
                                Usuário:
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Digite seu Usuário"
                                        className="login-input"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                            </label>
                        </div>

                        <div className="box-login">
                            <label htmlFor="" className="label-senha">
                                Senha:
                                <div className="password-container">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua Senha"
                                        className="login-input"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <Visibility style={{ fontSize: '20px' }} />
                                        ) : (
                                            <VisibilityOff style={{ fontSize: '20px' }} />
                                        )}
                                    </button>
                                </div>
                            </label>
                            {errorMessage && <p className="login-error">{errorMessage}</p>}
                        </div>

                        <div className="login-actions">
                            <p className='paragraph-signup'>Não tem uma conta ainda? <Link to="/signup" className='p-signup'>Clique aqui e cadastre-se.</Link></p>

                            <label className="remember-me">
                                <input type="checkbox" name="remember" className="input-remember" />
                                Manter-me conectado
                            </label>

                            <button className='btn-login'>Entrar</button>

                        </div>
                    </form>
                </div>
            </div>
            {showSuccessModal && (
                <div className="modal-overlay-success">
                    <div className="modal-container-success">
                        <div className="modal-icon-success">
                            <span className="modal-checkmark">✔</span>
                        </div>
                        <h2 className="modal-title-success">SUCESSO</h2>
                        <p className="modal-message-success">Login realizado, você será redirecionado para o painel.</p>
                    </div>
                </div>
            )}


        </>
    )
}


export default Login;