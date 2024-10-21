document.addEventListener('DOMContentLoaded', () => {
    // Mostrar título, subtítulo, descripción y botón después de 10 segundos
    setTimeout(() => {
        const title = document.querySelector('.title');
        const subtitle = document.querySelector('.subtitle');
        const description = document.querySelector('.description');
        const button = document.querySelector('.cta-button');
        
        title.style.display = 'block';
        subtitle.style.display = 'block';
        description.style.display = 'block';
        button.style.display = 'inline-block';
        
        // Agregar animaciones
        title.classList.add('fadeIn');
        subtitle.classList.add('fadeIn');
        description.classList.add('fadeIn');
        button.classList.add('fadeIn');
    }, 10000); // 10 segundos

    // Mostrar el teléfono y el mensaje después de 20 segundos
    setTimeout(() => {
        const telefonoIcon = document.querySelector('.telefono-icon');
        const callNow = document.querySelector('.call-now');
        
        telefonoIcon.style.display = 'block';
        callNow.style.display = 'block';
        
        // Ocultar después de 10 segundos
        setTimeout(() => {
            telefonoIcon.style.display = 'none';
            callNow.style.display = 'none';
        }, 10000); // 10 segundos
    }, 20000); // Aparece después de 20 segundos
});





