const contenedor = document.getElementById('contenedor-ropa');
let todosLosProductos = [];
let productosFiltrados = [];
let indiceActual = 0;
const TAMANO_PAGINA = 6; 

// Realizamos la petición al servidor una sola vez[cite: 10]
fetch('/api/productos')
    .then(respuesta => respuesta.json())
    .then(datos => {
        if (datos && datos.records) {
            todosLosProductos = datos.records;
            document.getElementById('boton-ropa').addEventListener('click', () => filtrar('Ropa y Calzado'));
            document.getElementById('boton-variados').addEventListener('click', () => filtrar('Variados'));
        }
    })
    .catch(error => console.error("Error al conectar:", error));

function filtrar(categoriaSeleccionada) {
    indiceActual = 0;
    contenedor.innerHTML = '';
    
    // Filtramos los productos según la categoría[cite: 10]
    productosFiltrados = todosLosProductos.filter(registro => {
        return categoriaSeleccionada === 'Ropa y Calzado' 
            ? registro.fields.categoria === "Ropa y Calzado" 
            : registro.fields.categoria !== "Ropa y Calzado";
    });

    cargarBloque();
}

function cargarBloque() {
    const fin = Math.min(indiceActual + TAMANO_PAGINA, productosFiltrados.length);
    
    // Renderizamos solo el bloque de productos correspondiente[cite: 10]
    for (let i = indiceActual; i < fin; i++) {
        renderizarProducto(productosFiltrados[i]);
    }
    
    indiceActual = fin;
    actualizarBotonVerMas();
}

function actualizarBotonVerMas() {
    let btnMas = document.getElementById('btn-ver-mas');
    if (btnMas) {
        // Mostramos el botón solo si quedan productos pendientes[cite: 10]
        btnMas.style.display = (indiceActual < productosFiltrados.length) ? 'block' : 'none';
    }
}

function renderizarProducto(registro) {
    const fotoUrl = registro.fields.foto[0].url;
    
    // Construcción del mensaje para WhatsApp con el enlace de Airtable[cite: 10]
    const urlRegistro = `https://airtable.com/appqa7V445d14XbPC/tblENJPZ46SzUxSNt/${registro.id}`;
    const textoMensaje = `Hola voluntarios AVCCI, me interesa el artículo: ${registro.fields.articulo}. \n\nEs este artículo: ${urlRegistro}`;
    const mensaje = encodeURIComponent(textoMensaje);
    
    contenedor.innerHTML += `
        <div class="tarjeta-ropa">
            <img src="${fotoUrl}" onclick="abrirModal('${fotoUrl}')" style="width: 200px; border-radius: 8px; cursor: pointer;">
            <h3>${registro.fields.articulo}</h3>
            <p>💰 Precio: ${registro.fields.precio} Bs</p>
            ${registro.fields.estado ? `<p style="background-color: yellow; font-weight: bold;">Estado: ${registro.fields.estado}</p>` : ''}
            <a href="https://wa.me/59176208782?text=${mensaje}" target="_blank">Reservar por WhatsApp</a>
        </div>
    `;
}

function abrirModal(url) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-img').src = url;
    modal.style.display = 'flex';
}