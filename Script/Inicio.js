function mostrarFormulario() {
  const formulario = document.getElementById('formulario');
  formulario.style.display = 'block';
  formulario.scrollIntoView({ behavior: 'smooth' });


}


//Para dirigirse al dashboar

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.formulario__form');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío real del formulario
    // Aquí podrías validar datos si lo necesitas
    window.location.href = "../HTML/Dashboard.html";
  });
});

