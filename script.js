document.addEventListener('DOMContentLoaded', () => {
    
    //  navigation
    const burger = document.getElementById('burger-menu');
    const nav = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-menu a');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

      // configurator elements
    const modelSelect = document.getElementById('model-select');
    const swatches = document.querySelectorAll('.swatch');
    const adventureCheck = document.getElementById('adventure-pack');
    const totalPriceEl = document.getElementById('total-price');
    const carImage = document.getElementById('car-image');
    const colorNameDisplay = document.getElementById('active-color-name');

    if (modelSelect && swatches.length > 0 && carImage) {
        
            // update configurator
        function updateConfigurator() {
            const selectedOption = modelSelect.options[modelSelect.selectedIndex];
            const model = selectedOption.getAttribute('data-name');
            const basePrice = parseInt(modelSelect.value);

            const activeSwatch = document.querySelector('.swatch.active') || swatches[0];
            const colorPrice = parseInt(activeSwatch.getAttribute('data-price')) || 0;
            const colorTitle = activeSwatch.getAttribute('title');
            
                // convert color name for image file naming
            let colorSuffix = colorTitle.split(' ').pop().toLowerCase();
            const colorImagePath = `img/${model}_${colorSuffix}.jpg`;

            if (colorNameDisplay) {
                colorNameDisplay.innerText = colorTitle;
            }

            if (carImage.getAttribute('src') !== colorImagePath) {
                carImage.style.opacity = '0';
                
                const tempImg = new Image();
                tempImg.src = colorImagePath;
                
                tempImg.onload = () => {
                    carImage.src = colorImagePath;
                    carImage.style.opacity = '1';
                };
                
                tempImg.onerror = () => {
                    console.error("Bild nicht gefunden: " + colorImagePath);
                    carImage.style.opacity = '1'; 
                };
            }

            const addonPrice = (adventureCheck && adventureCheck.checked) ? parseInt(adventureCheck.value) : 0;
            const total = basePrice + colorPrice + addonPrice;
            
            if (totalPriceEl) {
                totalPriceEl.innerText = total.toLocaleString('de-CH') + ' CHF';
            }
        }

        //  EVENT LISTENERS
        modelSelect.addEventListener('change', updateConfigurator);
        if (adventureCheck) {
            adventureCheck.addEventListener('change', updateConfigurator);
        }
        swatches.forEach(swatch => {
            swatch.addEventListener('click', () => {
                swatches.forEach(s => s.classList.remove('active'));
                swatch.classList.add('active');
                updateConfigurator();
            });
        });


        // Initial update on page load
        updateConfigurator();
    }
});