// src/scripts/contactForm.ts
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm') as HTMLFormElement | null;
    const statusElement = document.getElementById('formStatus') as HTMLParagraphElement | null;
    const submitButton = document.getElementById('submitButton') as HTMLButtonElement | null;
    
    if (form && statusElement && submitButton) {
      form.addEventListener('submit', async (e: Event) => {
        e.preventDefault();
        
        // Cambiar el botón a estado de carga
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        try {
          const formData = new FormData(form);
          
          const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
          });
          
          const result = await response.json() as { success: boolean, message?: string };
          
          if (result.success) {
            // Mostrar mensaje de éxito
            statusElement.textContent = '¡Mensaje enviado con éxito! Gracias por contactarme.';
            statusElement.className = 'text-center mt-2 text-green-400';
            statusElement.classList.remove('hidden');
            
            // Resetear el formulario
            form.reset();
          } else {
            // Mostrar mensaje de error
            statusElement.textContent = result.message || 'Error al enviar el mensaje. Inténtalo de nuevo.';
            statusElement.className = 'text-center mt-2 text-red-400';
            statusElement.classList.remove('hidden');
          }
        } catch (error) {
          // Mostrar error de conexión
          console.error('Error:', error);
          statusElement.textContent = 'Error de conexión. Por favor, inténtalo más tarde.';
          statusElement.className = 'text-center mt-2 text-red-400';
          statusElement.classList.remove('hidden');
        } finally {
          // Restaurar el botón
          submitButton.textContent = 'Enviar';
          submitButton.disabled = false;
          
          // Hacer que el mensaje desaparezca después de un tiempo
          setTimeout(() => {
            if (statusElement.className.includes('text-green-400')) {
              statusElement.classList.add('hidden');
            }
          }, 5000);
        }
      });
    }
  });