// Variables globales
let userPoints = 0;
let isLoggedIn = false;
let selectedPoints = 0;
let selectedPrice = 0;
let selectedMethod = '';

// Sistema de navegación mejorado
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-section');
        
        // Ocultar todas las secciones principales
        document.querySelectorAll('.main-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Ocultar todas las páginas de detalles de productos
        document.querySelectorAll('.product-detail').forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Mostrar la sección seleccionada
        if (targetSection === 'productos' || targetSection === 'puntos' || targetSection === 'soporte' || targetSection === 'inicio') {
            document.getElementById(targetSection).classList.add('active');
        }
        
        // Desplazarse suavemente a la sección
        document.getElementById(targetSection).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Ver detalles del producto
document.querySelectorAll('.view-product').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product');
        
        // Ocultar todas las secciones principales
        document.querySelectorAll('.main-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Ocultar todas las páginas de detalles de productos
        document.querySelectorAll('.product-detail').forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Mostrar la página de detalles del producto
        document.getElementById(`${productId}-detail`).classList.add('active');
        
        // Desplazarse suavemente a la sección
        document.getElementById(`${productId}-detail`).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Botones de volver
document.querySelectorAll('.back-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = this.getAttribute('data-back');
        
        // Ocultar todas las páginas de detalles de productos
        document.querySelectorAll('.product-detail').forEach(detail => {
            detail.classList.remove('active');
        });
        
        // Mostrar la sección principal correspondiente
        document.getElementById(targetSection).classList.add('active');
        
        // Desplazarse suavemente a la sección
        document.getElementById(targetSection).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Selección de planes en páginas de detalles
document.querySelectorAll('.plan-option').forEach(option => {
    option.addEventListener('click', function() {
        const container = this.closest('.product-info');
        const productId = container.closest('.product-detail').id.replace('-detail', '');
        const price = this.getAttribute('data-price');
        
        // Actualizar selección
        container.querySelectorAll('.plan-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        this.classList.add('selected');
        
        // Actualizar precio final
        container.querySelector('.final-price span').textContent = `${price} pts`;
        
        // Actualizar botón de compra
        const buyButton = container.querySelector('.buy-product-detail');
        buyButton.setAttribute('data-points', price);
    });
});

// Comprar desde página de detalles
document.querySelectorAll('.buy-product-detail').forEach(button => {
    button.addEventListener('click', function() {
        if (!isLoggedIn) {
            alert('Debes iniciar sesión para comprar productos');
            authModal.style.display = 'flex';
            return;
        }
        
        const productName = this.getAttribute('data-product');
        const pointsRequired = parseInt(this.getAttribute('data-points'));
        
        if (userPoints < pointsRequired) {
            alert(`No tienes suficientes puntos para comprar ${productName}. Necesitas ${pointsRequired} puntos pero solo tienes ${userPoints}.`);
            return;
        }
        
        if (confirm(`¿Estás seguro de que quieres comprar ${productName} por ${pointsRequired} puntos?`)) {
            userPoints -= pointsRequired;
            updatePointsDisplay();
            alert(`¡Compra exitosa! Has adquirido ${productName}. Recibirás los detalles por correo electrónico.`);
        }
    });
});

// Navegación de soporte
document.querySelectorAll('.support-nav-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        
        // Ocultar todas las secciones de soporte
        document.querySelectorAll('.support-content').forEach(section => {
            section.classList.remove('active');
        });
        
        // Mostrar la sección seleccionada
        document.getElementById(targetId).classList.add('active');
        
        // Desplazarse suavemente a la sección de soporte
        document.getElementById('soporte').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Preguntas frecuentes interactivas
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        if (answer.classList.contains('active')) {
            answer.classList.remove('active');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            answer.classList.add('active');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
});

// Resto del código (autenticación, compra de puntos, etc.)
// Modal de autenticación
const authModal = document.getElementById('auth-modal');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const closeModal = document.querySelector('.close-modal');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Abrir modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.style.display = 'flex';
    switchTab('login');
});

registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    authModal.style.display = 'flex';
    switchTab('register');
});

// Cerrar modal
closeModal.addEventListener('click', () => {
    authModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

// Cambiar pestañas
function switchTab(tabName) {
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    tabContents.forEach(content => {
        if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

// Formularios
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    isLoggedIn = true;
    userPoints = 500; // Puntos iniciales al registrarse
    updatePointsDisplay();
    alert('Inicio de sesión exitoso');
    authModal.style.display = 'none';
    updateUserActions();
});

document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    isLoggedIn = true;
    userPoints = 100; // Puntos iniciales al registrarse
    updatePointsDisplay();
    alert('Registro exitoso');
    authModal.style.display = 'none';
    updateUserActions();
});

// Actualizar acciones de usuario
function updateUserActions() {
    if (isLoggedIn) {
        document.getElementById('login-btn').textContent = 'Mi Cuenta';
        document.getElementById('register-btn').textContent = 'Cerrar Sesión';
        
        // Cambiar comportamiento del botón de registro a cerrar sesión
        document.getElementById('register-btn').addEventListener('click', (e) => {
            e.preventDefault();
            isLoggedIn = false;
            userPoints = 0;
            updatePointsDisplay();
            document.getElementById('login-btn').textContent = 'Iniciar Sesión';
            document.getElementById('register-btn').textContent = 'Registrarse';
            alert('Sesión cerrada correctamente');
        });
    }
}

// Actualizar visualización de puntos
function updatePointsDisplay() {
    document.getElementById('user-points').textContent = `${userPoints} Puntos`;
}

// Función para calcular el precio de puntos personalizados
function calculateCustomPrice(points) {
    // Precio base: $0.065 por punto (mejor precio por volumen)
    let basePrice = points * 0.065;
    
    // Aplicar descuentos por volumen
    if (points >= 1000) {
        basePrice *= 0.9; // 10% de descuento
    } else if (points >= 500) {
        basePrice *= 0.92; // 8% de descuento
    } else if (points >= 200) {
        basePrice *= 0.95; // 5% de descuento
    }
    
    return basePrice.toFixed(2);
}

// Actualizar precio personalizado cuando cambia la cantidad
document.getElementById('custom-points').addEventListener('input', function() {
    const points = parseInt(this.value) || 0;
    const price = calculateCustomPrice(points);
    document.getElementById('custom-price').textContent = `$${price} USD`;
    
    // Actualizar selección global
    selectedPoints = points;
    selectedPrice = parseFloat(price);
    
    // Deseleccionar cualquier paquete predeterminado
    document.querySelectorAll('.point-card').forEach(card => {
        card.classList.remove('selected');
    });
});

// Seleccionar paquete de puntos predeterminado
document.querySelectorAll('.select-points').forEach(button => {
    button.addEventListener('click', function() {
        const card = this.closest('.point-card');
        const points = parseInt(card.dataset.points);
        const price = parseFloat(card.dataset.price);
        
        // Actualizar selección
        selectedPoints = points;
        selectedPrice = price;
        
        // Actualizar interfaz
        document.querySelectorAll('.point-card').forEach(c => {
            c.classList.remove('selected');
        });
        card.classList.add('selected');
        
        // Actualizar campo personalizado
        document.getElementById('custom-points').value = points;
        document.getElementById('custom-price').textContent = `$${price.toFixed(2)} USD`;
    });
});

// Seleccionar método de pago
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.payment-option').forEach(o => {
            o.classList.remove('selected');
        });
        this.classList.add('selected');
        selectedMethod = this.dataset.method;
    });
});

// Procesar compra de puntos
document.getElementById('checkout-btn').addEventListener('click', function() {
    if (!isLoggedIn) {
        alert('Debes iniciar sesión para comprar puntos');
        authModal.style.display = 'flex';
        return;
    }
    
    if (selectedPoints <= 0) {
        alert('Por favor, selecciona una cantidad de puntos o un paquete');
        return;
    }
    
    if (!selectedMethod) {
        alert('Por favor, selecciona un método de pago');
        return;
    }
    
    // Simular proceso de pago
    alert(`Redirigiendo al proceso de pago:\n\n- Puntos: ${selectedPoints}\n- Precio: $${selectedPrice.toFixed(2)} USD\n- Método: ${selectedMethod.toUpperCase()}`);
    
    // En una aplicación real, aquí redirigiríamos al procesador de pagos
    // window.location.href = `checkout.html?points=${selectedPoints}&price=${selectedPrice}&method=${selectedMethod}`;
    
    // Simular compra exitosa
    userPoints += selectedPoints;
    updatePointsDisplay();
    alert(`¡Compra exitosa! Has recibido ${selectedPoints} puntos.`);
});

// Inicializar con el primer paquete seleccionado
document.querySelector('.point-card').click();

// Seleccionar PayPal como método por defecto
document.querySelector('.payment-option[data-method="paypal"]').click();

// Seleccionar primer plan por defecto en cada producto
document.querySelectorAll('.plan-option').forEach(option => {
    if (option.getAttribute('data-plan') === '1mes') {
        option.click();
    }
});
