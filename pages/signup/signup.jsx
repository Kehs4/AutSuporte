import React, { useEffect, useState } from "react"
import './signup.css'
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

function SignUp() {
    const [isLoading, setIsLoading] = useState(true);
    const [passwordStrength, setPasswordStrength] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [phone, setPhone] = useState("");
    const [cep, setCep] = useState("");
    const [address, setAddress] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [error, setError] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            surname,
            email,
            password,
            phone,
            cep,
            address,
            number,
            complement,
            city,
            state,
            birthdate,
            termsAccepted,
        };

        try {
            const response = await fetch('http://localhost:9000/api/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setShowSuccessModal(true); // Exibe o modal de sucesso
            } else {
                alert('Erro ao cadastrar as informações em nosso sistema.');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados para o servidor:', error);
            alert('Erro ao conectar com o servidor.');
        }
    };

    const handleCepChange = async (e) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
        setCep(value);

        if (value.length === 8) { // Verifica se o CEP tem 8 dígitos
            try {
                const response = await fetch(`https://viacep.com.br/ws/${value}/json/`);
                const data = await response.json();

                if (data.erro) {
                    setError("CEP não encontrado.");
                    setAddress("");
                    setCity("");
                    setState("");
                } else {
                    setError("");
                    setAddress(data.logradouro || "");
                    setCity(data.localidade || "");
                    setState(data.uf || "");
                }
            } catch (err) {
                setError("Erro ao buscar o CEP.");
                setAddress("");
                setCity("");
                setState("");
            }
        } else {
            setError("");
            setAddress("");
            setCity("");
            setState("");
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        // Verifica a força da senha
        if (value.length >= 8 && /[A-Z]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            setPasswordStrength("Forte");
        } else if (value.length >= 6) {
            setPasswordStrength("Média");
        } else {
            setPasswordStrength("Fraca");
        }
    };

    const validatePassword = (e) => {
        const value = e.target.value;
        if (!/[A-Z]/.test(value) || !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            e.target.setCustomValidity("A senha deve conter pelo menos 1 letra maiúscula e 1 caractere especial.");
        } else {
            e.target.setCustomValidity("");
        }
    };

    useEffect(() => {

        document.title = "AutSuporte - Cadastro de Usuário";

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

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

            <section className="section-signup">
                <div className="div-box-signup">
                    <div className="div-title-signup">
                        <h2 className="title-signup">Cadastro AutSuporte</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-signup">

                            {/* Nome e Sobrenome */}
                            <div className="div-inputs-signup">
                                <div className="div-name-user">
                                    <label htmlFor="signup-name">Nome</label>
                                    <input
                                        type="text"
                                        id="signup-name"
                                        placeholder="Nome"
                                        className="inputs-signup"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="div-surname-user">
                                    <label htmlFor="signup-surname">Sobrenome</label>
                                    <input
                                        type="text"
                                        id="signup-surname"
                                        placeholder="Sobrenome"
                                        className="inputs-signup"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* E-mail e Telefone */}
                            <div className="div-email-password">
                                <div className="div-email-user">
                                    <label htmlFor="signup-email">E-mail</label>
                                    <input
                                        type="email"
                                        id="signup-email"
                                        placeholder="E-mail"
                                        className="inputs-signup"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="div-number-user">
                                    <label htmlFor="signup-number">Número Telefone</label>
                                    <input
                                        type="text"
                                        id="signup-number"
                                        placeholder="(99) 99999-9999"
                                        maxLength={11}
                                        className="inputs-signup"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Senha e Confirmação */}
                            <div className="div-password">
                                <label htmlFor="signup-password">Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="signup-password"
                                    placeholder="Senha"
                                    className="inputs-signup"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onInput={validatePassword}
                                    onBlur={() => setPasswordStrength("")}
                                />
                                {password && passwordStrength && (
                                    <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
                                        Força da senha: {passwordStrength}
                                    </p>
                                )}

                                <label htmlFor="signup-password-confirm">Confirmar Senha</label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    id="signup-password-confirm"
                                    placeholder="Digite a senha novamente"
                                    className="inputs-signup"
                                    defaultValue={passwordConfirm}
                                    required
                                    onInput={(e) => {
                                        if (e.target.value !== password) {
                                            setPasswordConfirmError("As senhas não coincidem.");
                                        } else {
                                            setPasswordConfirmError("");
                                        }
                                    }}
                                />
                                {passwordConfirmError && (
                                    <p className="password-error">{passwordConfirmError}</p>
                                )}
                            </div>

                            {/* Endereço */}
                            <div className="div-address">

                                <label htmlFor="signup-zipcode">CEP</label>
                                <input
                                    type="text"
                                    name="zipcode"
                                    id="signup-zipcode"
                                    placeholder="00000-000"
                                    maxLength={9}
                                    className="inputs-signup"
                                    value={cep}
                                    onChange={handleCepChange}
                                    required
                                />
                                {error && <p className="cep-error">{error}</p>}

                                <label htmlFor="signup-address">Endereço</label>
                                <input
                                    type="text"
                                    name="address"
                                    id="signup-address"
                                    placeholder="Logradouro (Rua, Avenida, etc.)"
                                    className="inputs-signup"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />

                                <div className="div-number-complement">
                                    <div className="div-number">
                                        <label htmlFor="signup-number-address">Número</label>
                                        <input
                                            type="number"
                                            name="number"
                                            id="signup-number-address"
                                            placeholder="Número"
                                            className="inputs-signup"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="div-complement">
                                        <label htmlFor="signup-complement">Complemento</label>
                                        <input
                                            type="text"
                                            name="complement"
                                            id="signup-complement"
                                            placeholder="Complemento (opcional)"
                                            value={complement}
                                            onChange={(e) => setComplement(e.target.value)}
                                            className="inputs-signup"
                                        />
                                    </div>
                                </div>

                                <label htmlFor="signup-state">Estado</label>
                                <input
                                    type="text"
                                    name="state"
                                    id="signup-state"
                                    placeholder="Estado"
                                    className="inputs-signup"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />

                                <label htmlFor="signup-city">Cidade</label>
                                <input
                                    type="text"
                                    name="city"
                                    id="signup-city"
                                    placeholder="Cidade"
                                    className="inputs-signup"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />

                            </div>

                            {/* Data de Nascimento */}
                            <div className="div-birthdate">
                                <label htmlFor="signup-birthdate">Data de Nascimento</label>
                                <input
                                    type="date"
                                    id="signup-birthdate"
                                    className="inputs-signup"
                                    value={birthdate}
                                    onChange={(e) => setBirthdate(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Termos e Condições */}
                            <div className="div-terms">
                                <input
                                    type="checkbox"
                                    id="signup-terms"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    required
                                />
                                <label htmlFor="signup-terms">
                                    Eu aceito os <a href="/terms" target="_blank" rel="noopener noreferrer">Termos e Condições</a>
                                </label>
                            </div>

                            {/* Botão de Cadastro */}
                            <div className="div-submit">
                                <button type="submit" className="btn-signup">Cadastrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {showSuccessModal && (
                <div className="modal-overlay-success">
                    <div className="modal-container-success">
                        <div className="modal-icon-success">
                            <span className="modal-checkmark">✔</span>
                        </div>
                        <h2 className="modal-title-success">Cadastro Realizado!</h2>
                        <p className="modal-message-success">Seu cadastro foi realizado com sucesso. Por favor, faça login para acessar sua conta em nossa página inicial.</p>
                        <button className="modal-button-success" onClick={() => navigate('/home')}>
                            Ok.
                        </button>
                    </div>
                </div>
            )}

        </>
    )
}

export default SignUp;