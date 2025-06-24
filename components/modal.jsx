const switchModal = () => {
  const cod_cliente = document.getElementById('client-cod');
  const cod_unid_neg = document.getElementById('client-cod-unid');
  const cod_unid_oper = document.getElementById('client-cod-unid-oper');
  const modal = document.querySelector('.div-form-clients');
  const SalvarBtn = document.getElementById('btn-save');
  const deleteBtn = document.getElementById('btn-delete');
  const alterarBtn = document.getElementById('btn-update');
  const inputs = document.querySelectorAll('.btns');

  // Alterna visibilidade do modal
  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
  }

  // Configura visibilidade dos botões
  if (SalvarBtn) SalvarBtn.style.display = 'block';
  if (deleteBtn) deleteBtn.style.display = 'block';
  if (alterarBtn) alterarBtn.style.display = 'block';

  // Adiciona eventos apenas uma vez, se necessário
  if (alterarBtn && !alterarBtn.dataset.listenerAttached) {
    alterarBtn.addEventListener('click', () => {
      inputs.forEach(input => input.disabled = false);
      
    });
    alterarBtn.dataset.listenerAttached = 'true'; // Evita múltiplas ligações
  }

  if (SalvarBtn && !SalvarBtn.dataset.listenerAttached) {
    SalvarBtn.addEventListener('click', () => {
      inputs.forEach(input => input.disabled = true);
    });
    SalvarBtn.dataset.listenerAttached = 'true';
  }

  // Fecha o modal ao clicar fora dele
  const btnClose = document.querySelector('.btn-close');
  window.onclick = function(event) {
    if (event.target === btnClose) {
      modal.style.display = 'none';
      cod_cliente.value = '';
      inputs.forEach(input => input.value = '');
      if (SalvarBtn) SalvarBtn.style.display = 'none';
      inputs.forEach(input => input.disabled = true);
    }
  };
};

// Registra o evento apenas uma vez ao carregar
const btn = document.querySelector('tbody-list');
if (btn) {
  btn.addEventListener('dblclick', switchModal);
}

    
export default switchModal;