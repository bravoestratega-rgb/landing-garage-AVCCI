const contenedor = document.getElementById('contenedor-ropa');

// Recuerda que aquí va tu URL de Airtable con tu Base ID y nombre de tabla
console.log("Iniciando conexión:", datos);
fetch('/api/productos')
.then(respuesta => {
    // Verificamos si la respuesta del servidor es correcta
    console.log("Estado de la respuesta:", respuesta.status);
    return respuesta.json();
})
.then(datos => {
    console.log("Datos recibidos:", datos);
    
    // 👕 PESTAÑA 1: ROPA Y CALZADO
    document.getElementById('boton-ropa').addEventListener('click', () => {
        contenedor.innerHTML = ''; 

        datos.records.forEach(registro => {
            if (registro.fields.categoria === "Ropa y Calzado") {
                
                let etiquetaAlerta = ""; 
                if (registro.fields.estado === "Vendido" || registro.fields.estado === "Reservado") {
                    etiquetaAlerta = `<p style="background-color: yellow; font-weight: bold;">Estado: ${registro.fields.estado}</p>`;
                }

                contenedor.innerHTML += `
                    <div class="tarjeta-ropa">
                        <img src="${registro.fields.foto[0].url}" style="width: 200px; border-radius: 8px;">
                        <h3>${registro.fields.articulo}</h3>
                        <p>💰 Precio: ${registro.fields.precio} Bs</p>
                        ${etiquetaAlerta}
                        <p>📝 ${registro.fields.descripcion}</p>
                        <br>
                        <a href="https://wa.me/591XXXXXXXX?text=Hola voluntarios AVCCI, me interesa el artículo: ${registro.fields.articulo}">Reservar por WhatsApp</a>
                    </div>
                `;
            } 
        });
    });

    // 📦 PESTAÑA 2: ARTÍCULOS VARIADOS
    document.getElementById('boton-variados').addEventListener('click', () => {
        contenedor.innerHTML = ''; 

        datos.records.forEach(registro => {
            if (registro.fields.categoria !== "Ropa y Calzado") {
                
                let etiquetaAlerta = ""; 
                if (registro.fields.estado === "Vendido" || registro.fields.estado === "Reservado") {
                    etiquetaAlerta = `<p style="background-color: yellow; font-weight: bold;">Estado: ${registro.fields.estado}</p>`;
                }

                contenedor.innerHTML += `
                    <div class="tarjeta-ropa">
                        <img src="${registro.fields.foto[0].url}" style="width: 200px; border-radius: 8px;">
                        <h3>${registro.fields.articulo}</h3>
                        <p>💰 Precio: ${registro.fields.precio} Bs</p>
                        ${etiquetaAlerta}
                        <p>📝 ${registro.fields.descripcion}</p>
                        <br>
                        <a href="https://wa.me/591XXXXXXXX?text=Hola voluntarios AVCCI, me interesa el artículo: ${registro.fields.articulo}">Reservar por WhatsApp</a>
                    </div>
                `;
            } 
        });
    });

});