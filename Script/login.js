  document.getElementById('registroForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const password = document.getElementById('password-field').value;
    const confirmPassword = document.getElementById('confirm-password-field').value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Si todo está bien, redirigir
    window.location.href = "../HTML/Dashboard.html";
  });
