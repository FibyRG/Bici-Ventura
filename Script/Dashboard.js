// AQUI EMPIEZA EL MENU LATERAL
const navBar = document.querySelector("nav"),
  menuBtns = document.querySelectorAll(".menu-icon"),
  overlay = document.querySelector(".overlay");

menuBtns.forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
});

overlay?.addEventListener("click", () => {
  navBar.classList.remove("open");
});

// AQUI TERMINA EL MENU LATERAL

// AQUI EMPIEZA EL DASHBOARD
document.addEventListener("DOMContentLoaded", function () {
  // Gráfico de línea
  const barCtx = document.getElementById("myBarChart").getContext("2d");
  new Chart(barCtx, {
    type: "line",
    data: {
      labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
      datasets: [{
        label: "Bicicletas Alquiladas",
        data: [11, 15, 14, 20, 18, 25, 30],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 2,
        fill: true,
      }],
    },
    options: {
      responsive: true,
    }
  });

  // Gráfico de pastel
  const pieCtx = document.getElementById("myPieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "pie",
    data: {
      labels: ["Eléctricas", "Monteras", "Urbanas"],
      datasets: [{
        data: [50, 30, 25],
        backgroundColor: ["#00796B", "#FF9800", "#03A9F4"],
      }],
    },
    options: {
      responsive: true,
    }
  });

  // Gráfico de barras horizontales
  const barHorizontal = document.getElementById("estadoBicicletasChart").getContext("2d");
  new Chart(barHorizontal, {
    type: "bar",
    data: {
      labels: ["Disponibles", "Alquiladas", "Mantenimiento"],
      datasets: [{
        label: "Cantidad",
        data: [30, 150, 30],
        backgroundColor: ["#4CAF50", "#FFC107", "#F44336"],
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
    }
  });
});