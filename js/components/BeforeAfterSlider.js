/* =========================================
   COMPONENTE: SLIDER ANTES/DESPUÉS
   ========================================= */
export function initBeforeAfterSlider() {
    const containers = document.querySelectorAll('.ba-slider-container');
    
    containers.forEach(container => {
        const slider = container.querySelector('.ba-slider-handle');
        const beforeImg = container.querySelector('.ba-before');
        
        const moveSlider = (e) => {
            const rect = container.getBoundingClientRect();
            let x = (e.pageX || e.touches[0].pageX) - rect.left;
            
            // Limitadores
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            const position = (x / rect.width) * 100;
            
            slider.style.left = `${position}%`;
            beforeImg.style.width = `${position}%`;
        };

        container.addEventListener('mousemove', moveSlider);
        container.addEventListener('touchmove', moveSlider);
    });
}
