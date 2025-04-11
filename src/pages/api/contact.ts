// src/pages/api/contact.ts
import type { APIRoute } from "astro";
import { MongoClient } from "mongodb";
import { MONGODB_URI, DB_NAME } from 'astro:env/server';




export const POST: APIRoute = async ({ request }) => {
  let client;
  
  try {
    console.log("🚀 Iniciando la solicitud POST a /api/contact");
    
    // Obtener datos del formulario
    const formData = await request.formData();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const message = formData.get("message")?.toString();
    
    // Validar datos
    if (!name || !email || !message) {
      console.error("❌ Datos de formulario incompletos:", { name, email, message });
      return new Response(
        JSON.stringify({ success: false, message: "Faltan datos requeridos" }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("✅ Datos del formulario recibidos:", { name, email, message });

    // Conectar a MongoDB
    console.log("🔌 Conectando a MongoDB...");
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("✅ Conexión a MongoDB establecida");
    
    // Insertar datos en la colección
    const db = client.db(DB_NAME);
    const collection = db.collection("mewinPortfolio");
    
    const resultado = await collection.insertOne({
      nombre: name,
      correo: email,
      mensaje: message,
      fecha: new Date()
    });
    
    console.log("📝 Mensaje guardado en MongoDB con ID:", resultado.insertedId);
    
    // Respuesta exitosa
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Mensaje enviado y guardado correctamente" 
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("❌ Error procesando la solicitud:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: "Error al procesar el formulario" 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  } finally {
    // Cerrar la conexión a MongoDB
    if (client) {
      await client.close();
      console.log("🔌 Conexión a MongoDB cerrada");
    }
  }
};