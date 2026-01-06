// ============================================
// PRODUCT DATA
// ============================================
const products = [
    {
        id: 2,
        name: "زيت طبيعي للشعر",
        description: "زيت معالج طبيعي للشعر، يمنح شعرك القوة واللمعان",
        price: 220,
        image: "images/product1.png",
        category: "hair"
    },
    {
        id: 4,
        name: "سبراي تونيك للشعر",
        description: "مكونات طبيعية، يقوي الشعر ويحميه من التساقط",
        price: 160,
        image: "images/product2.png",
        category: "hair"
    },
    {
        id: 6,
        name: "سيروم للبشرة",
        description: "سيروم طبيعي للعناية بالبشرة وترطيبها العميق",
        price: 200,
        image: "images/product3.png",
        category: "skin"
    }
];

// ============================================
// GLOBAL STATE
// ============================================
let cart = JSON.parse(localStorage.getItem('cocoRoseCart')) || [];

// WhatsApp phone number (Replace with your actual number)
const WHATSAPP_NUMBER = "201020909939";

// FormSubmit email (Replace with your actual email)
const FORMSUBMIT_EMAIL = "your-email@example.com";

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Render products
    renderProducts();

    // Render products
    renderProducts();

    // Setup event listeners
    setupEventListeners();

    // Update cart UI
    updateCartUI();
});

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');

    if (!productsGrid) return;

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">
                        ${product.price} <small>جنيه</small>
                    </div>
                    <div class="quantity-selector">
                        <button class="qty-btn qty-minus" data-id="${product.id}">-</button>
                        <input type="number" class="qty-input" id="qty-${product.id}" value="1" min="1" max="99" readonly>
                        <button class="qty-btn qty-plus" data-id="${product.id}">+</button>
                    </div>
                </div>
                <button class="add-to-cart-btn btn-ripple" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i>
                    أضف للسلة
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for quantity buttons
    document.querySelectorAll('.qty-minus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const input = document.getElementById(`qty-${id}`);
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    document.querySelectorAll('.qty-plus').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.id;
            const input = document.getElementById(`qty-${id}`);
            if (input.value < 99) {
                input.value = parseInt(input.value) + 1;
            }
        });
    });

    // Add event listeners for add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = parseInt(btn.dataset.id);
            const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
            addToCart(productId, quantity);
        });
    });
}

// ============================================
// CART MANAGEMENT
// ============================================
function addToCart(productId, quantity) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }

    // Save to localStorage
    saveCart();

    // Update UI
    updateCartUI();

    // Fly to cart animation
    const productCard = document.querySelector(`.product-card[data-product-id="${productId}"]`);
    if (productCard) {
        const img = productCard.querySelector('img');
        if (img) flyToCart(img);
    }

    // Show feedback with click action
    showNotification(`تم إضافة ${product.name} إلى السلة (اضغط للعرض)`, () => showCart());
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            updateCartUI();
        }
    }
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// ============================================
// CART UI
// ============================================
function updateCartUI() {
    try {
        const cartBadge = document.getElementById('cartBadge');


        // Target modal elements
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const modalTotalPrice = document.getElementById('modalTotalPrice'); // Total inside form
        const cartTotalSection = document.getElementById('cartTotalSection'); // Total inside cart content
        const totalPrice = document.getElementById('totalPrice'); // Initial total

        // Update badges (Header + Floating)
        const itemCount = getCartItemCount();
        const badges = [
            document.getElementById('cartBadge'),
            document.getElementById('headerCartBadge')
        ];

        badges.forEach(badge => {
            if (badge) {
                badge.textContent = itemCount;
                badge.style.display = itemCount > 0 ? 'flex' : 'none';

                if (itemCount > 0) {
                    badge.classList.remove('bump');
                    void badge.offsetWidth;
                    badge.classList.add('bump');
                }
            }
        });



        // Calculate total
        const total = getCartTotal();
        const freeShippingThreshold = 500;

        // Update Shipping Progress
        const shippingContainer = document.getElementById('shippingProgressContainer');
        const shippingText = document.getElementById('shippingText');
        const shippingBar = document.getElementById('shippingProgressBar');

        if (shippingContainer && shippingText && shippingBar) {
            let percentage = (total / freeShippingThreshold) * 100;
            if (percentage > 100) percentage = 100;
            shippingBar.style.width = `${percentage}%`;

            if (total >= freeShippingThreshold) {
                shippingText.innerHTML = '🎉 <strong>مبروك!</strong> لقد حصلت على شحن مجاني';
                shippingBar.style.background = 'linear-gradient(90deg, #25D366, #20ba5a)';
            } else {
                const remaining = freeShippingThreshold - total;
                shippingText.innerHTML = `باقي <strong>${remaining} جنيه</strong> للحصول على شحن مجاني`;
                shippingBar.style.background = 'linear-gradient(90deg, #a8577d, #d097b3)';
            }
        }

        // Update Content
        if (cart.length === 0) {
            // Empty state
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartItems) cartItems.style.display = 'none';
            if (cartTotalSection) cartTotalSection.style.display = 'none';
            if (shippingContainer) shippingContainer.style.display = 'none';

        } else {
            // Filled state
            if (emptyCart) emptyCart.style.display = 'none';
            if (shippingContainer) shippingContainer.style.display = 'block';
            if (cartTotalSection) cartTotalSection.style.display = 'block';

            if (cartItems) {
                cartItems.style.display = 'block';
                cartItems.innerHTML = cart.map((item, index) => `
                    <div class="cart-item" style="display:flex; gap:10px; margin-bottom:10px; align-items:center;">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info" style="flex:1;">
                            <div style="display:flex; justify-content:space-between;">
                                <div style="font-weight:600;">${item.name}</div>
                                <button onclick="removeFromCart(${item.id})" style="color:red; background:none; border:none; cursor:pointer;"><i class="fas fa-times"></i></button>
                            </div>
                            <div style="color:gray; font-size:0.9rem;">${item.price} جنيه</div>
                            <div style="display:flex; justify-content:space-between; margin-top:5px; align-items:center;">
                                <div class="quantity-selector" style="transform:scale(0.8); transform-origin:left;">
                                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                    <input type="number" class="qty-input" value="${item.quantity}" readonly>
                                    <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                </div>
                                <div style="font-weight:bold;">${item.price * item.quantity}</div>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update all total displays
        const formattedTotal = `${total} جنيه`;
        if (totalPrice) totalPrice.textContent = formattedTotal;
        if (modalTotalPrice) modalTotalPrice.textContent = formattedTotal;

    } catch (error) {
        console.error("Error updating cart UI:", error);
    }
}

function showCart() {
    // Show the Checkout Modal directly as the Cart
    const modal = document.getElementById('checkoutModal');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modal) modal.classList.add('active');
    if (modalOverlay) modalOverlay.classList.add('active');
}

function hideCart() {
    const modal = document.getElementById('checkoutModal');
    const modalOverlay = document.getElementById('modalOverlay');

    if (modal) modal.classList.remove('active');
    if (modalOverlay) modalOverlay.classList.remove('active');
}

// ============================================
// CHECKOUT
// ============================================


function handleCheckout(event) {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();
    const address = document.getElementById('customerAddress').value.trim();
    const email = document.getElementById('customerEmail').value.trim();

    // Validate
    if (!name || !phone || !address) {
        showNotification('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    // Format order message for WhatsApp
    let message = `*طلب جديد من Coco & Rose*\n\n`;
    message += `*الاسم:* ${name}\n`;
    message += `*الهاتف:* ${phone}\n`;
    message += `*العنوان:* ${address}\n\n`;
    message += `*المنتجات:*\n`;

    cart.forEach(item => {
        message += `• ${item.name} × ${item.quantity} = ${item.price * item.quantity} جنيه\n`;
    });

    message += `\n*الإجمالي:* ${getCartTotal()} جنيه`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Send email notification (using FormSubmit - no backend needed)
    sendEmailNotification(name, phone, address, email);

    // Open WhatsApp
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    // Clear cart and close modal
    setTimeout(() => {
        clearCart();
        hideCheckoutModal();
        document.getElementById('checkoutForm').reset();

        // Trigger celebration
        if (window.celebrateOrder) window.celebrateOrder();

        showAnimatedNotification('تم إرسال طلبك بنجاح! سيتم التواصل معك قريباً', 'success');
    }, 1000);
}

// ============================================
// EMAIL NOTIFICATION (FormSubmit)
// ============================================
function sendEmailNotification(name, phone, address, email) {
    // Format order details for email
    const orderDetails = cart.map(item =>
        `${item.name} × ${item.quantity} = ${item.price * item.quantity} EGP`
    ).join('\n');

    const emailData = {
        name: name,
        phone: phone,
        address: address,
        email: email || 'لم يتم توفير بريد إلكتروني',
        order: orderDetails,
        total: `${getCartTotal()} EGP`,
        _subject: `طلب جديد من ${name}`,
        _template: 'table'
    };

    // Send using FormSubmit
    fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Email sent successfully:', data);
        })
        .catch(error => {
            console.error('Email error:', error);
            // Don't block WhatsApp flow if email fails
        });
}

// ============================================
// LOCALSTORAGE
// ============================================
function saveCart() {
    localStorage.setItem('cocoRoseCart', JSON.stringify(cart));
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    const floatingCartBtn = document.getElementById('floatingCartBtn');
    if (floatingCartBtn) {
        floatingCartBtn.addEventListener('click', showCart);
    }

    const headerCartBtn = document.getElementById('headerCartBtn');
    if (headerCartBtn) {
        headerCartBtn.addEventListener('click', showCart);
    }





    // Modal close
    const modalClose = document.getElementById('modalClose');
    if (modalClose) {
        modalClose.addEventListener('click', hideCart);
    }

    // Modal overlay
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', hideCart);
    }

    // Checkout form
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ============================================
// NOTIFICATIONS
// ============================================
function showNotification(message, onClick = null) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #a8577d, #d097b3);
        color: white;
        padding: 16px 24px;
        border-radius: 50px;
        box-shadow: 0 4px 20px rgba(168, 87, 125, 0.4);
        z-index: 10000;
        animation: slideDownFade 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        font-weight: 600;
        min-width: 300px;
        text-align: center;
        cursor: ${onClick ? 'pointer' : 'default'};
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    `;

    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    if (onClick) {
        notification.addEventListener('click', onClick);
    }

    // Add animation styles dynamically if not present
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideDownFade {
                from {
                    transform: translate(-50%, -50px);
                    opacity: 0;
                }
                to {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
            }
            @keyframes slideUpFade {
                from {
                    transform: translate(-50%, 0);
                    opacity: 1;
                }
                to {
                    transform: translate(-50%, -50px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUpFade 0.5s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 4000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
// Format currency
function formatCurrency(amount) {
    return `${amount.toLocaleString('ar-EG')} جنيه`;
}

// Validate phone number
function validatePhone(phone) {
    return /^[0-9]{11}$/.test(phone);
}

// Validate email
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ============================================
// ANIMATIONS
// ============================================
function flyToCart(sourceImage) {
    const cartBtn = document.getElementById('floatingCartBtn');
    if (!cartBtn || !sourceImage) return;

    const imgClone = sourceImage.cloneNode();
    const rect = sourceImage.getBoundingClientRect();
    const cartRect = cartBtn.getBoundingClientRect();

    imgClone.style.cssText = `
        position: fixed;
        top: ${rect.top}px;
        left: ${rect.left}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        z-index: 9999;
        pointer-events: none;
        transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
        border-radius: 50%;
        opacity: 0.8;
    `;

    document.body.appendChild(imgClone);

    // Trigger animation
    setTimeout(() => {
        imgClone.style.top = `${cartRect.top + 10}px`;
        imgClone.style.left = `${cartRect.left + 10}px`;
        imgClone.style.width = '30px';
        imgClone.style.height = '30px';
        imgClone.style.opacity = '0';
    }, 10);

    // Cleanup
    setTimeout(() => {
        imgClone.remove();
        cartBtn.classList.add('bump');
        setTimeout(() => cartBtn.classList.remove('bump'), 300);
    }, 800);
}
