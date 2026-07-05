export default async function handler(req, res) {
    const token = process.env.AIRTABLE_TOKEN;
    let todosLosRegistros = [];
    let offset = ""; // Aquí guardaremos la "llave" para las siguientes páginas

    try {
        // Usamos un bucle para traer todas las páginas
        do {
            // Si hay un offset, lo agregamos a la URL
            const url = offset 
                ? `https://api.airtable.com/v0/appqa7V445d14XbPC/articulos?offset=${offset}`
                : 'https://api.airtable.com/v0/appqa7V445d14XbPC/articulos';

            const respuesta = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const datos = await respuesta.json();
            
            // Unimos los nuevos registros a nuestra lista acumulada
            if (datos.records) {
                todosLosRegistros = todosLosRegistros.concat(datos.records);
            }

            // Actualizamos el offset con el valor que nos devuelve Airtable
            offset = datos.offset || ""; 
            
        } while (offset); // Si hay un nuevo offset, el bucle se repite

        // Al final, enviamos todos los registros acumulados
        res.status(200).json({ records: todosLosRegistros });

    } catch (error) {
        res.status(500).json({ error: 'Hubo un problema al contactar a Airtable' });
    }
}