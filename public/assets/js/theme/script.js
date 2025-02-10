function changeTheme(theme) {
  const themePath = `/assets/css/theme/${theme}`; // Ruta base de los temas
  document.getElementById('theme-style').setAttribute('href', themePath);
  localStorage.setItem('theme', theme); // Guardar la preferencia del tema
}

// Cargar el tema guardado al cargar la página
window.onload = function() {
  const savedTheme = localStorage.getItem('theme') || 'theme-default.css';
  changeTheme(savedTheme);
}