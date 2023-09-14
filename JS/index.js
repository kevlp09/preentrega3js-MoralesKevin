// array de ingresos
let ingresos = [];
let totalIngreso = 0;

// array de gastos
let gastos = [];
let totalGasto = 0;

// poner ingresos
function agregarIngreso() {
  let descripcion = document.getElementById("detalleIngreso").value;
  let monto = parseFloat(document.getElementById("montoIngreso").value);

  if (descripcion == "" || monto == "") {
    Swal.fire({
      title: "Oopps",
      text: "Ingresa un dato valido",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return;
  } else {
    ingresos.push({ descripcion, monto });
    totalIngreso += monto;
    document.getElementById("detalleIngreso").value = "";
    document.getElementById("montoIngreso").value = "";
    actualizarTotalIngresos();
    Toastify({
      text: "Agregaste el gasto Correctamente",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #40ff69, #00ff0d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
}
// Actualizar el total de ingresos
function actualizarTotalIngresos() {
  document.getElementById(
    "totalIngresos"
  ).textContent = `$${totalIngreso.toFixed(2)}`;
}

// Mostrar ingresos.
function mostrarIngresos() {
  const ul = document.getElementById("listaIngresos");
  const ingresosHtml = ingresos
    .map(
      (item) =>
        `<li class="lista">${item.descripcion}: $${item.monto.toFixed(2)}</li>`
    )
    .join("");
  ul.innerHTML = ingresosHtml;
}

// Evento de boton para agregar ingreso
let botonIngreso = document.getElementById("btnIngreso");
botonIngreso.addEventListener("click", function (event) {
  event.preventDefault();
  agregarIngreso();
  mostrarIngresos();
  mostrarSaldo();
});

mostrarIngresos();
actualizarTotalIngresos();

function agregarGasto() {
  let descripcion = document.getElementById("detalleGasto").value;
  let monto = parseFloat(document.getElementById("montoGasto").value);

  if (descripcion == "" || monto == "") {
    Swal.fire({
      title: "Oopps",
      text: "Ingresa un dato valido",
      icon: "warning",
      confirmButtonText: "ok",
    });
    return;
  } else {
    gastos.push({ descripcion, monto });
    totalGasto += monto;
    document.getElementById("detalleGasto").value = "";
    document.getElementById("montoGasto").value = "";
    actualizarTotalGastos();
    Toastify({
      text: "Agregaste el gasto Correctamente",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #40ff69, #00ff0d)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
}
// Actualizar gasto en el dom
function actualizarTotalGastos() {
  document.getElementById("totalGastos").textContent = `$${totalGasto.toFixed(
    2
  )}`;
}

function mostrarGastos() {
  const ul = document.getElementById("listaGastos");
  const gastosHtml = gastos
    .map(
      (item) =>
        `<li class="lista">${item.descripcion}: $${item.monto.toFixed(2)}</li>`
    )
    .join("");
  ul.innerHTML = gastosHtml;
}

let botonGastos = document.getElementById("botonGastos");
botonGastos.addEventListener("click", function (event) {
  event.preventDefault();
  agregarGasto();
  mostrarGastos();
  mostrarSaldo();
});
mostrarGastos();
actualizarTotalGastos();

// Funcion para mostrar el saldo en el dom
function mostrarSaldo() {
  let saldo = totalIngreso - totalGasto;
  document.getElementById("saldoTotal").textContent = `$${saldo.toFixed(2)}`;
}
mostrarSaldo();

// Boton para guardar datos en el Local Storage
let botonGuardar = document.getElementById("guardarDatos");
botonGuardar.addEventListener("click", function () {
  localStorage.setItem("ingresos", JSON.stringify(ingresos));
  localStorage.setItem("gastos", JSON.stringify(gastos));
  Swal.fire({
    title: "Guardado",
    text: "Acabas de guardar los datos",
    icon: "success",
    confirmButtonText: "ok",
  });
});
// Tomar el evento del boton para Cargar datos
let botonCargar = document.getElementById("cargarDatos");
botonCargar.addEventListener("click", function () {
  cargarDatosDesdeLocalStorage();
  Swal.fire({
    title: "Cargado",
    text: "Acabas de cargar los datos anteriormente guardados",
    icon: "success",
    confirmButtonText: "ok",
  });
});
// Esta funcion trae los datos guardados al Dom
function cargarDatosDesdeLocalStorage() {
  const ingresosGuardados = JSON.parse(localStorage.getItem("ingresos"));
  const gastosGuardados = JSON.parse(localStorage.getItem("gastos"));

  // Verificar si hay datos guardados
  if (ingresosGuardados && gastosGuardados) {
    // Asignar los datos guardados a tus arrays de ingresos y gastos
    ingresos = ingresosGuardados;
    gastos = gastosGuardados;
    totalIngreso = calcularTotal(ingresos);
    totalGasto = calcularTotal(gastos);
    // Llamar a las funciones para mostrar los datos en el DOM
    mostrarIngresos();
    mostrarGastos();
    mostrarSaldo();
    actualizarTotalIngresos();
    actualizarTotalGastos();
  }
}
// Boton para borrar los datos tanto del local Storage como del DOM
let botonBorrarDatos = document.getElementById("borrarDatos");
botonBorrarDatos.addEventListener("click", function () {
  Swal.fire({
    title: "Seguro que quieres reiniciar?",
    text: "No puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, quiero",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Borrado!", "Acabas de reiniciar todos los datos", "success");
      localStorage.clear();
      ingresos = [];
      gastos = [];
      totalIngreso = 0;
      totalGasto = 0;
      mostrarIngresos();
      mostrarGastos();
      actualizarTotalIngresos();
      actualizarTotalGastos();
      mostrarSaldo();
    }
  });
});
function calcularTotal(items) {
  return items.reduce((total, item) => total + item.monto, 0);
}
