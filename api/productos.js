export default async function handler(req, res) {
    // Vercel buscará tu token en sus variables de entorno (tu "caja fuerte")
    const token = process.env.AIRTABLE_TOKEN;

    try {
        // Reemplaza esta URL con tu dirección real de Airtable (ID de Base y Tabla)
        const respuesta = await fetch('https://api.airtable.com/v0/appqa7V445d14XbPC/articulos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const datos = await respuesta.json();

        // El mensajero envía los datos de vuelta a tu página web
        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un problema al contactar a Airtable' });
    }
}