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
    const [email, setEmail] = useState('');
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
            const response = await fetch('http://localhost:9000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage('');
                setModalBorder('');
                setShowSuccessModal(true);

                // Armazena os dados do usuário no localStorage
                localStorage.setItem('user', JSON.stringify({
                    name: data.UserName,
                    surname: data.UserSurname,
                    email: data.UserEmail,
                    phone: data.UserPhone,
                    cep: data.UserCEP,
                    address: data.UserAddress,
                    number: data.UserNumber,
                    complement: data.UserComplement,
                    city: data.UserCity,
                    state: data.UserState,
                    birthdate: data.UserBirthdate,
                    keys: data.UserKeys
                }));

                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } else {
                setErrorMessage(data.error);
                setModalBorder('red');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setErrorMessage('Erro ao conectar com o servidor.');
            setModalBorder('red');
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
                            E-mail:
                            <div>
                                <input
                                    type="text"
                                    placeholder="Digite seu E-mail"
                                    className="login-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
)}


export default Login;