var titulos = {
  htmltitle: "AM VISSION",
  headingprincipal: "AM VISSION SA DE CV",
  miperfil: "Mi Perfil - AM VISSION",
  facturas: "Generador de Facturas",
  mensajes: "Mensajes",
  bodega: "Bodega",
  pendientes: "Pendientes",
  exposiciones: "Exposiciones",
  piedepagina: "Todos los Derechos Reservados - WebThemez",
};

var i;
for (var key in titulos) {
  i = document.getElementById(key);
  if (i != null) {
    console.log(i);
    i.textContent += titulos[key];
  }
}
