import { React, useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import '../../header.css'
import './profile.css'
import '../dashboard.css'
import './editprofile.css'
import '../../../components/MenuAutSuporte.css'
import MenuAutSuporte from '../../../components/MenuAutSuporte';

const EditProfile = () => {
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem("user"));
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

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    function handleLogout() {
        localStorage.removeItem("user");
        localStorage.clear();
        setIsMenuOpen(false);
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleCloseMenu() {
    setIsMenuOpen(false);
  }

    function menuSwitch() {
        setIsMenuOpen((prev) => !prev);
    }

    // Estados para os campos editáveis
    const [name, setName] = useState(user?.name || "");
    const [surname, setSurname] = useState(user?.surname || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [birthdate, setBirthdate] = useState(user?.birthdate || "");
    const [cep, setCep] = useState(user?.cep || "");
    const [city, setCity] = useState(user?.city || "");
    const [stateUf, setStateUf] = useState(user?.state || "");
    const [address, setAddress] = useState(user?.address || "");
    const [number, setNumber] = useState(user?.number || "");
    const [complement, setComplement] = useState(user?.complement || "");

    useEffect(() => {
        document.title = "AutSuporte - Editar Perfil";

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);


        return () => clearTimeout(timer);
    }, []);


    // Função para enviar os dados editados
    async function handleSaveEdit(e) {
        e.preventDefault();

        const updatedUser = {
            name,
            surname,
            email,
            phone,
            birthdate,
            cep,
            city,
            state: stateUf,
            address,
            number,
            complement
        };

        try {
            const response = await fetch("http://localhost:9000/api/user/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedUser)
            });

            if (response.ok) {
                // Atualiza localStorage e dá feedback ao usuário
                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Dados atualizados com sucesso!");
            } else {
                alert("Erro ao atualizar dados.");
            }
        } catch (error) {
            alert("Erro ao conectar com o servidor.");
        }
    }

    if (isLoading) {
        return <Loading />;
    }

    return (
        <>

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Deseja realmente sair da plataforma?</h2>
                        <div className="modal-actions">
                            <Link to="/home"><button className="btn-logout-confirm" onClick={handleLogout}>Sim, sair</button></Link>
                            <button className="btn-logout-cancel" onClick={() => setShowLogoutModal(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className='autsuporte-container-dashboard'>

                <div className='autsuporte-header'>
                    <button className='btn-menu' id='menu-switch' onClick={menuSwitch}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi list" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                    </button>

                    <h1 className='autsuporte-header-title'>AutSuporte</h1>
                </div>



                <nav className='autsuporte-header-options'>
                    <Link to="/profile">Meu Perfil</Link>
                </nav>
            </div>

            <div className="dashboard-flex-wrapper">
                <MenuAutSuporte isMenuOpen={isMenuOpen} user={user} onCloseMenu={menuSwitch} />

                <div className={`dashboard-container${isMenuOpen ? ' menu-open' : ''}`}>
                    <div className='dashboard-header'>
                        <h1 className='dashboard-title'>Editar Perfil</h1>
                        <p className='dashboard-subtitle'>Olá <font color='#0356bb'>{payload.username},</font> esses são seus dados e informações.</p>
                    </div>

                    <div className='dashboard-content-container'>
                        <div className='dashboard-content-profile'>
                            <div className='user-info-container'>
                                <div className='user-image-container'>
                                    <img src="" alt="" srcset="" />
                                    {payload.image ? (
                                        <img src={payload.image} alt="Foto do usuário" className='user-image' id='user-image' width={80} height={80} />
                                    ) : (
                                        <div
                                            className='user-initial'
                                            style={{
                                                borderRadius: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '30px',
                                                fontWeight: 'bold',
                                                color: '#fff'
                                            }}
                                        >
                                            {payload.username ? payload.username.charAt(0).toUpperCase() : '?'}
                                        </div>
                                    )}
                                </div>
                                <div className='user-details'>
                                    <h2 className='user-name'>{payload.username} {payload.surname}</h2>
                                    <p className='user-email'>{payload.email}</p>

                                </div>
                            </div>
                            <div className='user-details-container'>
                                <div className='user-details-info'>
                                    <h2 className='user-details-title'>Informações Pessoais</h2>
                                    <div className='user-info-div'>

                                        <div className='user-info-edit'>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-name" className='info-label'>Nome</label>
                                                <input type="text" value={name} onChange={e => setName(e.target.value)} className='input-edit' />
                                            </div>


                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-surname" className='info-label'>Sobrenome</label>
                                                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} className='input-edit' />
                                            </div>




                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                            <label htmlFor="user-email" className='info-label'>E-mail</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='input-edit' />
                                        </div>

                                        <div className='user-info-edit'>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-phone" className='info-label'>Telefone:</label>
                                                <input
                                                    type="text"
                                                    className='input-edit'
                                                    placeholder="(99) 99999-9999"
                                                    maxLength={11}
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                                                    required
                                                />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-birthDate" className='info-label'>Data de Nascimento:</label>
                                                <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className='input-edit' />
                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className='user-address-container'>
                                    <h2 className='user-details-title'>Endereço:</h2>
                                    <div className='user-info-div'>
                                        <div className='user-info-edit' style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-cep" className='info-label'>CEP:</label>
                                                <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} className='input-edit' />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-city" className='info-label'>Cidade:</label>
                                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className='input-edit' />
                                            </div>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-state" className='info-label'>Estado:</label>
                                                <input type="text" value={stateUf} onChange={(e) => setStateUf(e.target.value)} className='input-edit' />
                                            </div>

                                        </div>

                                        <div className='user-info-edit' style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>

                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-address" className='info-label'>Logradouro:</label>
                                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className='input-edit'
                                                />
                                            </div>


                                        </div>

                                        <div className='user-info-edit' style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>


                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-number" className='info-label'>Número:</label>
                                                <input type="text" value={number} onChange={(e) => setNumber(e.target.value)} className='input-edit' />
                                            </div>


                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                                                <label htmlFor="user-complement" className='info-label'>Complemento:</label>
                                                <input type="text" value={complement} onChange={(e) => setComplement(e.target.value)} className='input-edit' />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='menu-options-box-profile' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                    <Link to='/profile'>
                                        <button className='btn-cancel'>Cancelar</button>
                                    </Link>

                                    <button className='btn-save-edit' onClick={handleSaveEdit}>Salvar Alterações</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    );
};


export default EditProfile;

