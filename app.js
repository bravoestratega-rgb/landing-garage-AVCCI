const contenedor = document.getElementById('contenedor-ropa');

// Realizamos la petición al servidor
fetch('/api/productos')
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return respuesta.json();
    })
    .then(datos => {
        // Verificamos si los datos tienen el formato correcto
        if (!datos || !datos.records) {
            console.error("No se encontraron registros en la respuesta", datos);
            contenedor.innerHTML = '<p>No hay productos disponibles en este momento.</p>';
            return;
        }

        // 👕 PESTAÑA 1: ROPA Y CALZADO
        document.getElementById('boton-ropa').addEventListener('click', () => {
            contenedor.innerHTML = ''; 
            datos.records.forEach(registro => {
                if (registro.fields.categoria === "Ropa y Calzado") {
                    renderizarProducto(registro);
                } 
            });
        });

        // 📦 PESTAÑA 2: ARTÍCULOS VARIADOS
        document.getElementById('boton-variados').addEventListener('click', () => {
            contenedor.innerHTML = ''; 
            datos.records.forEach(registro => {
                if (registro.fields.categoria !== "Ropa y Calzado") {
                    renderizarProducto(registro);
                } 
            });
        });
    })
    .catch(error => {
        console.error("Error al conectar:", error);
        contenedor.innerHTML = '<p>Lo sentimos, hubo un problema al cargar los productos.</p>';
    });

// Función auxiliar para no repetir código (limpieza de código)
function renderizarProducto(registro) {
    let etiquetaAlerta = ""; 
    if (registro.fields.estado === "Vendido" || registro.fields.estado === "Reservado") {
        etiquetaAlerta = `<p style="background-color: yellow; font-weight: bold;">Estado: ${registro.fields.estado}</p>`;
    }

    // Codificamos el mensaje para que sea válido en una URL
    const mensaje = encodeURIComponent(`Hola voluntarios AVCCI, me interesa el artículo: ${registro.fields.articulo} (Ref: #${registro.fields.numeroReferencia}). 
    
    Es este artículo: https://airtable.com/appqa7V445d14XbPC/tblENJPZ46SzUxSNt/${registro.id}`);

    const contenedor = document.getElementById('contenedor-ropa');
    contenedor.innerHTML += `
        <div class="tarjeta-ropa">
            <img src="${registro.fields.foto[0].url}" style="width: 200px; border-radius: 8px;">
            <h3>${registro.fields.articulo}</h3>
            <p>💰 Precio: ${registro.fields.precio} Bs</p>
            ${etiquetaAlerta}
            <p>📝 ${registro.fields.descripcion}</p>
            <br>
            <a href="https://wa.me/59176208782?text=${mensaje}" target="_blank">Reservar por WhatsApp</a>
        </div>
    `;
}