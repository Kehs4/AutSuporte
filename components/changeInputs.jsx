function ChangeInputs() {
const alterarBtn = document.getElementById('btn-update-clients')
const inputs = document.querySelectorAll('.btns')
const codGPI  = document.getElementById('client-code')

    // Verifique se o botão foi encontrado
    
        // Adiciona um evento de clique ao botão
        
            // Habilita os inputs
            inputs.forEach(input => {
                codGPI.disabled = true
                input.disabled = false
            });
        
    
};

export default ChangeInputs;