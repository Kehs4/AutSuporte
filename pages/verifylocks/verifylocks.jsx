import { useState, useEffect } from 'react';
import '../../components/MenuAutSuporte.css'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading';
import MenuToggleProvider from '../../components/MenuToggleProvider';
import MenuAutSuporte from '../../components/MenuAutSuporte';

function verifyLocks() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const userOn = JSON.parse(localStorage.getItem("user"));

    // Basta passar o token JWT para esta função
    function parseJwt(token) {
        if (!token) return null;
        const base64Url = token.split('.')[1];
        if (!base64Url) return null;
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    }
    const token = userOn?.token;
    const payload = parseJwt(token);

    if (!userOn) {
        return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', marginTop: '60px', color: '#ff0000', backgroundColor: '#f8d7da', padding: '20px', borderRadius: '10px', maxWidth: '600px', margin: 'auto' }}>
            <p>Usuário não encontrado. Por favor, faça login novamente.</p>

            <Link to="/home"><button style={{ backgroundColor: '#FFAAAA', color: 'red', padding: '10px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Home</button></Link>
        </div>;
    }

    const [userColor, setUserColor] = useState('');

    // Função para obter ou gerar cor persistente
    function getOrCreateUserColor(userId) {
        // Use o id do usuário como chave, se houver
        const token = `userColor_${userId}`;
        let color = localStorage.getItem(token ? `userColor_${userId}` : token);
        if (!color) {
            color = getRandomColor();
            localStorage.setItem(token, color);
        }
        return color;
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        document.title = "AutSuporte - Dashboard";

        // Recupera os dados do usuário do localStorage
        const storedUser = localStorage.getItem('user');

        if (storedUser && storedUser !== '{}') {
            setUser(JSON.parse(storedUser));
        }

        // Use o id ou email do usuário para garantir cor única por usuário
        if (userOn) {
            setUserColor(getOrCreateUserColor(payload.username || payload.origem || "default"));
        }

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);


        return () => clearTimeout(timer);
    }, []);


    if (isLoading) {
        return <Loading />;
    }

    return (
        <MenuToggleProvider>
            {({ isMenuOpen, menuSwitch }) => (
                <>
                    <div className='autsuporte-container-dashboard'>

                        <div className='autsuporte-header'>
                            <button className='btn-menu' id='menu-switch' onClick={menuSwitch}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg>
                            </button>

                            <h1 className='autsuporte-header-title'>AutSuporte</h1>
                        </div>

                        <nav className='autsuporte-header-options'>
                            <Link to="/profile">Meu Perfil</Link>
                        </nav>
                    </div>

                    <div className="dashboard-flex-wrapper">
                        <MenuAutSuporte isMenuOpen={isMenuOpen} user={user} userColor={userColor} onCloseMenu={menuSwitch} />

                        <div className={`dashboard-container${isMenuOpen ? ' menu-open' : ''}`}>
                            <div className='dashboard-header'>
                                <h1 className='dashboard-title'>Dashboard</h1>
                                <p className='dashboard-subtitle'>Bem-vindo(a) a AutSuporte, <font color='#0356bb'>{payload.username}!</font></p>
                            </div>

                            <div className='dashboard-content'></div>


                        </div>
                    </div>
                </>
            )}
        </MenuToggleProvider>

    );

}

export default verifyLocks;