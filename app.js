const contenedor = document.getElementById('contenedor-ropa');
let todosLosProductos = [];
let productosFiltrados = [];
let indiceActual = 0;
const TAMANO_PAGINA = 6;

fetch('/api/productos')
    .then(respuesta => respuesta.json())
    .then(datos => {
        todosLosProductos = datos.records;
        document.getElementById('boton-ropa').addEventListener('click', () => filtrar('Ropa y Calzado'));
        document.getElementById('boton-variados').addEventListener('click', () => filtrar('Variados'));
        // Asegurar que el botón tenga el evento al cargar
        document.getElementById('btn-ver-mas').addEventListener('click', cargarBloque);
    });

function filtrar(categoria) {
    indiceActual = 0;
    contenedor.innerHTML = '';
    productosFiltrados = todosLosProductos.filter(r => categoria === 'Ropa y Calzado' ? r.fields.categoria === "Ropa y Calzado" : r.fields.categoria !== "Ropa y Calzado");
    cargarBloque();
}

function cargarBloque() {
    const fin = Math.min(indiceActual + TAMANO_PAGINA, productosFiltrados.length);
    for (let i = indiceActual; i < fin; i++) renderizarProducto(productosFiltrados[i]);
    indiceActual = fin;
    document.getElementById('btn-ver-mas').style.display = (indiceActual < productosFiltrados.length) ? 'inline-block' : 'none';
}

function renderizarProducto(registro) {
    // Usamos 'small' para cargar más rápido en la tarjeta, y la original solo en el modal
    const fotoUrl = registro.fields.foto[0].url;
    const fotoThumbnail = registro.fields.foto[0].thumbnails.large.url; 
    
    const mensaje = encodeURIComponent(`Hola, me interesa: ${registro.fields.articulo}. \n\nEnlace: https://airtable.com/appqa7V445d14XbPC/tblENJPZ46SzUxSNt/${registro.id}`);
    
    contenedor.innerHTML += `
        <div class="tarjeta-ropa">
            <img src="${fotoThumbnail}" onclick="abrirModal('${fotoUrl}')" style="width: 200px; height: 200px; object-fit: cover; border-radius: 8px; cursor: pointer;">
            <h3>${registro.fields.articulo}</h3>
            <p>💰 ${registro.fields.precio} Bs</p>
            <a href="https://wa.me/59176208782?text=${mensaje}" target="_blank">Reservar por WhatsApp</a>
        </div>
    `;
}

function abrirModal(url) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-img').src = url;
    modal.style.display = 'flex';
}