// GGVerse MLM Platform - Complete JavaScript Implementation
// Single file for IIS deployment

// Global variables
let currentPage = "home";
let currentAdminModule = "dashboard";
let currentUserModule = "dashboard";
let cart = [];
let products = [];
let orders = [];
let isMobileView = false;

// Mock Data
const mockData = {
    products: [
        {
            id: "vitamin-c",
            name: "Premium Vitamin C",
            category: "supplements",
            price: 1499.0,
            stock: 50,
            description: "High-quality vitamin C supplement for immune support",
            icon: "fas fa-pills",
        },
        {
            id: "protein",
            name: "Whey Protein Powder",
            category: "supplements",
            price: 2499.0,
            stock: 30,
            description:
                "Premium whey protein for muscle building and recovery",
            icon: "fas fa-dumbbell",
        },
        {
            id: "omega3",
            name: "Omega-3 Fish Oil",
            category: "supplements",
            price: 1999.0,
            stock: 25,
            description: "Essential fatty acids for heart and brain health",
            icon: "fas fa-leaf",
        },
        {
            id: "multivitamin",
            name: "Daily Multivitamin",
            category: "supplements",
            price: 1249.0,
            stock: 40,
            description: "Complete daily nutrition support",
            icon: "fas fa-tablets",
        },
        {
            id: "probiotic",
            name: "Probiotic Complex",
            category: "wellness",
            price: 1749.0,
            stock: 20,
            description: "Digestive health and immunity support",
            icon: "fas fa-bacteria",
        },
        {
            id: "collagen",
            name: "Collagen Peptides",
            category: "beauty",
            price: 2249.0,
            stock: 15,
            description: "Skin, hair, and joint health support",
            icon: "fas fa-spa",
        },
    ],
    users: [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            level: "Diamond",
            status: "Active",
            sales: 125000,
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            level: "Platinum",
            status: "Active",
            sales: 98000,
        },
        {
            id: 3,
            name: "Mike Johnson",
            email: "mike@example.com",
            level: "Gold",
            status: "Active",
            sales: 75000,
        },
        {
            id: 4,
            name: "Sarah Wilson",
            email: "sarah@example.com",
            level: "Silver",
            status: "Active",
            sales: 45000,
        },
    ],
    orders: [
        {
            id: "ORD001",
            date: new Date().toISOString(),
            customer: "John Doe",
            items: [
                { name: "Premium Vitamin C", quantity: 2, price: 1499.0 },
                { name: "Protein Powder", quantity: 1, price: 2499.0 },
            ],
            total: 5497.0,
            status: "Completed",
        },
    ],
};

// Utility Functions
function formatCurrency(amount) {
    return `₱${amount.toLocaleString("en-PH", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}


function showAlert(message, type = "info") {
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
             style="top: 80px; right: 20px; z-index: 9999; min-width: 300px;" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    document.body.insertAdjacentHTML("beforeend", alertHTML);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
        const alert = document.querySelector(".alert:last-of-type");
        if (alert) {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }
    }, 3000);
}

// Navigation Functions
function showPage(pageId) {
    // Hide all pages first
    document.querySelectorAll(".page-content").forEach((page) => {
        page.classList.add("d-none");
    });

    let targetPage = null;

    // Handle User Page special case
    if (pageId === "account-summary") {
        targetPage = document.getElementById("user-page");
        if (targetPage) {
            targetPage.classList.remove("d-none");
            currentPage = "user";
            loadUserPage("account-summary");

            // Initialize sidebar after a short delay to ensure DOM is ready
            setTimeout(() => {
                initializeSidebarNavigation("user");
            }, 50);
        }
    }

    // Handle POS Page special case
    else if (pageId === "pos-page") {
        targetPage = document.getElementById("pos-page");
        if (targetPage) {
            targetPage.classList.remove("d-none");
            currentPage = "pos";
            loadPosModule("home");

            setTimeout(() => {
                initializeSidebarNavigation("pos");
            }, 50);
        }
    }

    // Handle Admin Page special case
    else if (pageId === "admin-page") {
        targetPage = document.getElementById("admin-page");
        if (targetPage) {
            targetPage.classList.remove("d-none");
            currentPage = "admin";
            loadAdminModule("dashboard");

            setTimeout(() => {
                initializeSidebarNavigation("admin");
            }, 50);
        }
    }

    // Handle standard pages (home, etc.)
    else {
        targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.remove("d-none");
            currentPage = pageId;
        }
    }

    // Update navigation active state
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        link.classList.remove("active");
    });

    const currentNavLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (currentNavLink) {
        currentNavLink.classList.add("active");
    }
}


function loadPageContent(pageId) {
    switch (pageId) {
        case "admin":
            loadAdminModule();
            break;
        case "user":
            showUserPage();
            break;
        case "pos":
            loadPosContent();
            break;
    }
}

function loadUserPage(pageName) {
    const userPageContainer = document.querySelector("#user-page-container");
    if (!userPageContainer) return;

    // Account Settings
    if (pageName === 'user-profile') {
        userPageContainer.innerHTML = getUserProfileContent();
        console.log(`Loaded User Profile page`);
        return;
    }

    if (pageName === 'withdrawal-settings') {
        userPageContainer.innerHTML = getWithdrawalSettingsContent();
        console.log(`Loaded Withdrawal Settings page`);
        return;
    }

    if (pageName === 'change-password') {
        userPageContainer.innerHTML = getChangePasswordContent();
        console.log(`Loaded Change Password page`);
        return;
    }

    if (pageName === 'withdrawal-pin-settings') {
        userPageContainer.innerHTML = getWithdrawalPinContent();
        console.log(`Loaded Withdrawal PIN page`);
        return;
    }

    // Shop
    if (pageName === 'shop-now') {
        userPageContainer.innerHTML = getShopNowContent();
        console.log(`Loaded Shop Now page`);
        return;
    }

    if (pageName === 'checkout') {
        userPageContainer.innerHTML = getCheckoutContent();
        console.log(`Loaded Checkout page`);
        return;
    }

    if (pageName === 'transactions') {
        userPageContainer.innerHTML = getTransactionsContent();
        console.log(`Loaded Transactions page`);
        return;
    }

    // Reports
    if (pageName === 'direct-referral') {
        userPageContainer.innerHTML = getDirectReferralContent();
        console.log(`Loaded Direct Referral page`);
        return;
    }

    if (pageName === 'sales-match') {
        userPageContainer.innerHTML = getSalesMatchBonusContent();
        console.log(`Loaded Sales Match page`);
        return;
    }

    if (pageName === 'leadership-bonus') {
        userPageContainer.innerHTML = getLeadershipBonusContent();
        console.log(`Loaded Leadership Bonus page`);
        return;
    }

    if (pageName === 'personal-rebates') {
        userPageContainer.innerHTML = getPersonalRebatesContent();
        console.log(`Loaded Personal Rebates page`);
        return;
    }

    if (pageName === 'unilevel-bonus') {
        userPageContainer.innerHTML = getUnilevelBonusContent();
        console.log(`Loaded Unilevel Bonus page`);
        return;
    }

    // Organization
    if (pageName === 'switch-account') {
        userPageContainer.innerHTML = getSwitchAccountContent();
        console.log(`Loaded Switch Account page`);
        return;
    }

    if (pageName === 'genealogy-tree') {
        userPageContainer.innerHTML = getGenealogyTreeContent();
        console.log(`Loaded Genealogy Tree page`);
        return;
    }

    if (pageName === 'direct-sponsors') {
        userPageContainer.innerHTML = getDirectSponsorsContent();
        console.log(`Loaded Direct Sponsors page`);
        return;
    }

    if (pageName === 'binary-list') {
        userPageContainer.innerHTML = getBinaryListContent();
        console.log(`Loaded Binary List page`);
        return;
    }

    if (pageName === 'unilevel-list') {
        userPageContainer.innerHTML = getUnilevelListContent();
        console.log(`Loaded Unilevel List page`);
        return;
    }

    // Check if this is a special page with custom content
    if (pageName === 'ewallet-summary') {
        userPageContainer.innerHTML = getEwalletSummaryContent();
        console.log(`Loaded eWallet Summary page`);
        return;
    }

    if (pageName === 'epoints-summary') {
        userPageContainer.innerHTML = getEpointsSummaryContent();
        console.log(`Loaded ePoints Summary page`);
        return;
    }

    if (pageName === 'claim-products') {
        userPageContainer.innerHTML = getEpointsClaimProductsContent();
        console.log(`Loaded ePoints Claim Products page`);
        return;
    }

    // Check if this is encash wallet page
    if (pageName === 'encash-wallet') {
        userPageContainer.innerHTML = getEncashWalletContent();
        console.log(`Loaded Encash eWallet page`);
        return;
    }

    if (pageName === 'withdrawal-pin') {
        userPageContainer.innerHTML = getWithdrawalPinContent();
        console.log(`Loaded Withdrawal PIN page`);
        return;
    }
    
    // Check if this is dashboard - redirect to Account Summary instead
    if (pageName === 'account-summary') {
        userPageContainer.innerHTML = getAccountSummaryContent();
        console.log(`Loaded Account Summary for dashboard request`);
        return;
    }
    
    // Create page title from page name
    const title = pageName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    
    // Update user page content with placeholder
    userPageContainer.innerHTML = `
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h2 class="card-title mb-0">
                                <i class="fas fa-file-alt me-2"></i>${title}
                            </h2>
                        </div>
                        <div class="card-body p-4">
                            <div class="row">
                                <div class="col-md-8">
                                    <p class="lead text-muted">Content coming soon...</p>
                                    <p>This page will contain the <strong>${title}</strong> functionality.</p>
                                    <div class="alert alert-info">
                                        <i class="fas fa-info-circle me-2"></i>
                                        Page identifier: <code>${pageName}</code>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="bg-light p-3 rounded">
                                        <h6 class="fw-bold mb-2">Quick Actions</h6>
                                        <button class="btn btn-primary btn-sm me-2 mb-2">Action 1</button>
                                        <button class="btn btn-secondary btn-sm mb-2">Action 2</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log(`Loaded user page: ${pageName}`);
    
    // Close sidebar on mobile after page load
    const userSidebar = document.querySelector(".user-sidebar");
    const isDesktop = window.innerWidth >= 992;
    if (!isDesktop && userSidebar && userSidebar.classList.contains("open")) {
        userSidebar.classList.remove("open");
    }
}


// canonical loadAdminModule - place this once at the end of ggverse.js
function loadAdminModule(moduleId, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }

  // Prefer the admin-module-content container, fallback to admin-page-container
  const contentDiv =
    document.getElementById("admin-module-content") ||
    document.getElementById("admin-page-container");

  if (!contentDiv) {
    console.warn("No admin-module-content or admin-page-container found.");
    return;
  }

  const moduleContents = {
    "dashboard": getAdminDashboardContent,
    "account-manager": getAdminAccountsManagerContent,
    "cd-accounts": getAdminAccountsCdContent,
    "promo1": getAdminPromo2fastContent,
    "promo2": getAdminPromoPearlfarmContent,
    "promo-list": getAdminPromoListContent,
    "add-store": getAdminStoreAddContent,
    "store-manager": getAdminStoreManagerContent,
    "store-user-manager": getAdminStoreUserManagerContent,
    "sales-manager": getAdminSalesManagerContent,
    "monthly-sales": getAdminSalesMonthlyContent,
    "daily-sales": getAdminSalesDailyContent,
    "add-item": getAdminItemAddContent,
    "manage-items": getAdminItemManageContent,
    "item-sales-report": getAdminItemSalesReportContent,
    "activation-summary": getAdminActivationSummaryContent,
    "activation-search": getAdminActivationSearchContent,
    "activation-tracker": getAdminActivationTrackerContent,
    "balance-summary": getAdminWalletBalanceSummaryContent,
    "credit-history": getAdminWalletCreditHistoryContent,
    "debit-history": getAdminWalletDebitHistoryContent,
    "process-withdrawals": getAdminWalletDebitProcessContent,
    "withdrawal-summary": getAdminWalletDebitSummaryContent,
    "manage-category": getAdminSettingsCategoryContent,
    "payout-options": getAdminSettingsPayoutContent,
    "package-settings": getAdminSettingsPackageContent,
    "superadmin": getAdminSettingsSuperadminContent,
    "maintenance": getAdminSettingsMaintenanceContent,
    "otp-manager": getAdminSmsOtpContent,
    "otp-mobile": getAdminSmsOtpMobileContent,
    "sponsoring-report": getAdminReportSponsoringContent,
    "flushout-report": getAdminReportFlushoutContent,
    "login-logs": getAdminLogsUserLoginContent
  };

  const fn = moduleContents[moduleId];
  contentDiv.innerHTML = fn ? fn() : `<div class="alert alert-danger">Page not found: ${moduleId}</div>`;

  // update active link highlight (HTML uses .user-sidebar)
  document.querySelectorAll('#admin-page .user-sidebar a').forEach(a => a.classList.remove('active'));
  const active = document.querySelector(`#admin-page .user-sidebar a[onclick*="${moduleId}"]`);
  if (active) active.classList.add('active');
}

// Simple User Page Placeholder Function
function showUserPage() {
    const userPage = document.getElementById('user-page');
    if (userPage) {
        // Load Account Summary by default when user page is accessed
        loadUserModule('account-summary');
        console.log("User page loaded - Account Summary displayed");
    }
}

function displayProducts(productsToShow) {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    productsGrid.innerHTML = productsToShow
        .map(
            (product) => `
        <div class="col-md-6 col-lg-4">
            <div class="card product-card h-100" onclick="addToCart('${product.id}')">
                <div class="card-body text-center">
                    <div class="mb-3">
                        <i class="${product.icon} fa-3x text-primary"></i>
                    </div>
                    <h6 class="card-title">${product.name}</h6>
                    <p class="card-text text-muted small">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 text-primary mb-0">${formatCurrency(product.price)}</span>
                        <span class="badge ${product.stock > 10 ? "bg-success" : product.stock > 0 ? "bg-warning" : "bg-danger"}">
                            Stock: ${product.stock}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `,
        )
        .join("");
}

function filterProducts(category) {
    // Update active button
    document
        .querySelectorAll(".btn-group .btn")
        .forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");

    const filteredProducts =
        category === "all"
            ? products
            : products.filter((product) => product.category === category);

    displayProducts(filteredProducts);
}

function searchProducts() {
    const searchTerm = document
        .getElementById("product-search")
        .value.toLowerCase();
    const filteredProducts = products.filter(
        (product) =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm),
    );
    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) {
        showAlert("Product is out of stock!", "warning");
        return;
    }

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
            showAlert(`Added another ${product.name} to cart`, "success");
        } else {
            showAlert("Cannot add more items than available stock!", "warning");
            return;
        }
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon,
        });
        showAlert(`${product.name} added to cart`, "success");
    }

    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId);
    updateCartDisplay();
    showAlert("Item removed from cart", "info");
}

function updateQuantity(productId, change) {
    const item = cart.find((item) => item.id === productId);
    const product = products.find((p) => p.id === productId);

    if (item && product) {
        const newQuantity = item.quantity + change;

        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else if (newQuantity <= product.stock) {
            item.quantity = newQuantity;
            updateCartDisplay();
        } else {
            showAlert("Cannot exceed available stock!", "warning");
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTax = document.getElementById("cart-tax");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");

    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML =
            '<div class="text-center text-muted p-3">Cart is empty</div>';
        cartSubtotal.textContent = "₱0.00";
        cartTax.textContent = "₱0.00";
        cartTotal.textContent = "₱0.00";
        checkoutBtn.disabled = true;
        return;
    }

    cartItems.innerHTML = cart
        .map(
            (item) => `
        <div class="cart-item">
            <div class="d-flex align-items-center">
                <i class="${item.icon} me-2"></i>
                <div class="flex-grow-1">
                    <div class="fw-bold">${item.name}</div>
                    <small class="text-muted">${formatCurrency(item.price)} each</small>
                </div>
                <div class="text-end">
                    <div class="btn-group btn-group-sm">
                        <button class="btn btn-outline-secondary" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span class="btn btn-outline-secondary disabled">${item.quantity}</span>
                        <button class="btn btn-outline-secondary" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                    <div class="mt-1">
                        <small class="fw-bold">${formatCurrency(item.price * item.quantity)}</small>
                        <button class="btn btn-sm btn-outline-danger ms-2" onclick="removeFromCart('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
        )
        .join("");

    const subtotal = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    );
    const tax = subtotal * 0.12;
    const total = subtotal + tax;

    cartSubtotal.textContent = formatCurrency(subtotal);
    cartTax.textContent = formatCurrency(tax);
    cartTotal.textContent = formatCurrency(total);
    checkoutBtn.disabled = false;
}

function clearCart() {
    cart = [];
    updateCartDisplay();
    showAlert("Cart cleared", "info");
}

function processPayment() {
    if (cart.length === 0) {
        showAlert("Cart is empty!", "warning");
        return;
    }

    // Simulate payment processing
    const total =
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.12;

    // Update product stock
    cart.forEach((cartItem) => {
        const product = products.find((p) => p.id === cartItem.id);
        if (product) {
            product.stock -= cartItem.quantity;
        }
    });

    // Create order record
    const order = {
        id: "ORD" + String(Math.floor(Math.random() * 1000)).padStart(3, "0"),
        date: new Date().toISOString(),
        customer: "Walk-in Customer",
        items: cart.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
        })),
        total: total,
        status: "Completed",
    };

    orders.push(order);

    showAlert(
        `Payment processed successfully! Order ID: ${order.id}`,
        "success",
    );

    // Clear cart and refresh display
    clearCart();
    displayProducts(products);
}

// Dashboard sub-module functions


// REMOVED: getDashboardViewContent() - legacy function completely removed


// Initialize dropdown functionality on page load
function initializeDropdowns() {
    // Add click listeners to dropdown toggles
    document.addEventListener('click', function(e) {
        // Close dropdowns when clicking outside
        if (!e.target.closest('.dropdown-menu') && !e.target.closest('.menu-item')) {
            closeAllDropdowns();
        }
    });
    
    // Initialize dropdowns on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Set up initial state
        closeAllDropdowns();
    });
}

// Call initialize dropdowns
initializeDropdowns();




window.addEventListener("resize", function () {
    console.log("Resize handling enabled - responsive active");
    if (typeof checkScreenSize === "function") {
        checkScreenSize();
    }
});



// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
    // SIDEBAR INITIALIZATION CALLS REMOVED

    // Initialize theme toggle
    // Theme toggle removed as per clean design requirements
});




// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM LOADED - Starting initialization...");

    loadPageContent("home");

    products = [...mockData.products];
    orders = [...mock.orders];
});

let currentActivePage = "account-summary"; // Global state for active page
let currentActiveDropdown = "dashboard"; // Global state for active dropdown
let currentOpenDropdowns = new Set(["dashboard"]); // Track which dropdowns are open

// USER PAGE SIDEBAR NAVIGATION FUNCTIONS

function enableSidebarDropdowns(pageType) {
    const container = document.querySelector(`#${pageType}-page`);
    if (!container) return;

    // Make sure only runs once per page
    container.querySelectorAll(".menu-toggle").forEach(btn => {
        // Avoid double binding
        if (btn.dataset.bound) return;
        btn.dataset.bound = "true";

        btn.addEventListener("click", () => {
            const submenu = btn.nextElementSibling;
            if (!submenu || !submenu.classList.contains("submenu")) return;

            // Toggle submenu visibility
            submenu.classList.toggle("open");

            // Optional: rotate chevron icon
            const icon = btn.querySelector(".fa-chevron-right, .fa-chevron-down");
            if (icon) {
                icon.classList.toggle("fa-chevron-right");
                icon.classList.toggle("fa-chevron-down");
            }
        });
    });
}


function initializeSidebarNavigation(pageType = "user") {
    const pageId = `#${pageType}-page`;
    const page = document.querySelector(pageId);
    if (!page || page.classList.contains("d-none")) return;

    // Initialize sidebar dropdowns
    initializeSidebarDropdowns(pageId, pageType);

    // Initialize mobile overlay for user page
    if (pageType === "user") {
        initializeUserMobileOverlay();
    }
    
    // Load default content based on page type
    switch (pageType) {
        case "user":
            loadUserPage("account-summary");
            break;
        case "pos":
            loadPosModule("pos-home");
            break;
        case "admin":
            loadAdminModule("dashboard");
            break;
    }
}


// Toggle dropdowns in sidebar
function initializeSidebarDropdowns(containerSelector, pageType = "user") {
    const sidebar = document.querySelector(containerSelector + " .user-sidebar");
    if (!sidebar) {
        console.error(`Sidebar not found for selector: ${containerSelector}`);
        return;
    }

    // Remove any existing event listeners to prevent duplicates
    const menuToggleButtons = sidebar.querySelectorAll(".menu-toggle");
    menuToggleButtons.forEach(button => {
        button.replaceWith(button.cloneNode(true));
    });

    // Re-select fresh buttons and add event listeners
    sidebar.querySelectorAll(".menu-toggle").forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get the parent menu section
            const menuSection = this.parentElement;
            
            // Close all other menu sections (optional - remove if you want multiple open)
            if (!menuSection.classList.contains('open')) {
                sidebar.querySelectorAll('.menu-section').forEach(section => {
                    if (section !== menuSection) {
                        section.classList.remove('open');
                    }
                });
            }
            
            // Toggle the 'open' class on the menu section
            menuSection.classList.toggle('open');
        });
    });

    // Add click handlers to submenu items
    const submenuItems = sidebar.querySelectorAll(".submenu li a");
    submenuItems.forEach(item => {
        // Preserve existing onclick behavior
        const originalOnClick = item.getAttribute('onclick');
        
        item.addEventListener("click", function(e) {
            // Remove active class from all items
            submenuItems.forEach(i => i.classList.remove("active"));
            
            // Add active class to clicked item
            this.classList.add("active");
            
            // Execute original onclick if it exists
            if (originalOnClick) {
                try {
                    // Create a function from the onclick string and execute it
                    new Function(originalOnClick.replace(/^javascript:/i, '').replace(/^onclick="/i, '').replace(/"$/i, ''))();
                } catch (error) {
                    console.error('Error executing onclick:', error);
                }
            }
        });
    });

    console.log(`[${pageType}] Initialized ${menuToggleButtons.length} dropdown toggles`);
}

// Mobile user sidebar toggle with floating button animation
function toggleSidebar(pageType = "user") {
    const container = document.querySelector(`#${pageType}-page`);
    if (!container) return;

    const sidebar = container.querySelector(".user-sidebar");
    const floatingToggle = container.querySelector(".floating-toggle");
    
    if (!sidebar || !floatingToggle) return;

    const isOpening = !sidebar.classList.contains("open");

    if (isOpening) {
        sidebar.classList.add("open");
        floatingToggle.classList.add("hide");
        floatingToggle.classList.remove("show");
    } else {
        sidebar.classList.remove("open");
        floatingToggle.classList.remove("hide");
        floatingToggle.classList.add("show");
    }

    console.log(`${pageType} sidebar toggled:`, isOpening ? "opening" : "closing");
}



// Initialize mobile overlay click detection for user page
function initializeUserMobileOverlay() {
    document.addEventListener("click", (e) => {
        const userSidebar = document.querySelector(".user-sidebar");
        const floatingToggle = document.getElementById("floatingToggle");
        const isDesktop = window.innerWidth >= 992;
        
        // Only handle mobile/tablet view and when user page is active
        const userPage = document.querySelector("#user-page");
        if (!isDesktop && userPage && !userPage.classList.contains("d-none") && userSidebar && userSidebar.classList.contains("open")) {
            // If clicking outside sidebar and not the floating toggle button
            if (!userSidebar.contains(e.target) && floatingToggle && !floatingToggle.contains(e.target)) {
                // Close sidebar and show floating button
                userSidebar.classList.remove("open");
                floatingToggle.classList.remove("hide");
                floatingToggle.classList.add("show");
                console.log("User sidebar closed by outside click");
            }
        }
    });
}

// Load user page content (placeholder)

// SIDEBAR TOGGLE BUTTON FUNCTION REMOVED

function checkScreenSize() {
    const screenWidth = window.innerWidth;
    const wasMobile = isMobileView;
    isMobileView = screenWidth < 992;

    console.log(
        "Screen size check:",
        screenWidth,
        "isMobileView:",
        isMobileView,
    );

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {
        if (isMobileView) {
            // Mobile view - hide sidebar by default, show toggle button
            sidebar.classList.remove("expanded");
            console.log("Switched to mobile view");
        } else {
            // Desktop view - show sidebar, hide toggle button initially
            sidebar.classList.add("expanded");
            sidebar.style.transform = "translateX(0)";

            // Remove sidebar-open class from toggle button

            removeMobileOverlay();
            console.log("Switched to desktop view");
        }
    }

}

// Unified Sidebar Toggle - Works same on all devices
function toggleDesktopSidebar() {
    console.log("Sidebar toggle called, isMobileView:", isMobileView);

    if (isMobileView) {
        // Mobile/Tablet: use mobile sidebar logic
        toggleMobileSidebar();
        return;
    }

    // Desktop: hide/show sidebar completely like mobile
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");

    if (sidebar) {
        const isHidden =
            sidebar.style.transform === "translateX(-100%)" ||
            sidebar.style.left === "-280px";

        if (isHidden) {
            // Show sidebar - restore desktop layout
            sidebar.style.cssText = `
                position: relative !important;
                top: auto !important;
                left: auto !important;
                width: 280px !important;
                height: calc(100vh - 60px) !important;
                transform: translateX(0) !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                z-index: auto !important;
                background: white !important;
                display: block !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                padding: 1rem !important;
            `;

            // Restore main content position
            if (mainContent) {
                mainContent.style.left = "280px";
                mainContent.style.width = "calc(100vw - 280px)";
            }

            localStorage.setItem("sidebarCollapsed", "false");
            console.log("Desktop sidebar shown, restored desktop layout");
        } else {
            // Hide sidebar - make it like mobile
            sidebar.style.cssText = `
                position: fixed !important;
                top: 60px !important;
                left: -280px !important;
                width: 280px !important;
                height: calc(100vh - 60px) !important;
                transform: translateX(0) !important;
                transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                z-index: 1050 !important;
                background: white !important;
                box-shadow: 2px 0 8px rgba(0,0,0,0.1) !important;
                display: block !important;
                overflow-y: auto !important;
                overflow-x: hidden !important;
                padding: 1rem !important;
            `;

            // Expand main content to full width
            if (mainContent) {
                mainContent.style.left = "0";
                mainContent.style.width = "100vw";
            }

            localStorage.setItem("sidebarCollapsed", "true");
            console.log("Desktop sidebar hidden, toggle button shown");
        }
    }
}

// Mobile/Tablet Sidebar Toggle with Animations
function toggleMobileSidebar() {
    console.log("Toggle sidebar called, isMobileView:", isMobileView);

    // Always look for mobile sidebar first (if it exists)
    let mobileSidebar = document.querySelector("body > .sidebar");

    if (!mobileSidebar && isMobileView) {
        // First time opening - create mobile sidebar with correct content
        const originalSidebar = document.querySelector("#userSidebar");
        if (!originalSidebar) {
            console.log("Original userSidebar not found");
            return;
        }

        console.log("Creating mobile sidebar for first time");
        mobileSidebar = originalSidebar.cloneNode(true);
        mobileSidebar.classList.remove("expanded");
        mobileSidebar.id = "mobileSidebar"; // Change ID to avoid conflicts
        document.body.appendChild(mobileSidebar);
        attachSidebarEventListeners(mobileSidebar);

        // Re-initialize mobile synchronization
        initializeMobileSidebarSync(mobileSidebar);
    }

    if (!mobileSidebar) {
        console.log("Mobile sidebar not found");
        return;
    }

    // Toggle the mobile sidebar
    const isExpanded = mobileSidebar.classList.contains("expanded");
    console.log("Current state - expanded:", isExpanded);

    if (isExpanded) {
        // Hide sidebar with closing animation
        mobileSidebar.classList.remove("expanded");
        // Toggle button functionality removed

        mobileSidebar.style.cssText = `
            position: fixed !important;
            top: 60px !important;
            left: -280px !important;
            width: 280px !important;
            height: calc(100vh - 60px) !important;
            transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            z-index: 1050 !important;
            background: white !important;
            box-shadow: 2px 0 8px rgba(0,0,0,0.1) !important;
            display: block !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            padding: 1rem !important;
            opacity: 1 !important;
            transform: scale(1) !important;
        `;

        // Add closing animation
        setTimeout(() => {
            mobileSidebar.style.opacity = "0";
            mobileSidebar.style.transform = "scale(0.95)";
        }, 50);
        removeMobileOverlay();
        console.log("Sidebar hidden");
    } else {
        // Show sidebar with opening animation
        mobileSidebar.classList.add("expanded");
        // Toggle button functionality removed

        mobileSidebar.style.cssText = `
            position: fixed !important;
            top: 60px !important;
            left: 0 !important;
            width: 280px !important;
            height: calc(100vh - 60px) !important;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
            z-index: 1050 !important;
            background: white !important;
            box-shadow: 2px 0 8px rgba(0,0,0,0.1) !important;
            display: block !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            padding: 1rem !important;
            -webkit-overflow-scrolling: touch !important;
            opacity: 1 !important;
            transform: scale(1) !important;
        `;
        addMobileOverlay();
        console.log("Sidebar shown");
    }

    // Check final state
    setTimeout(() => {
        console.log(
            "Final left position:",
            window.getComputedStyle(mobileSidebar).left,
        );
        console.log("Final classList:", mobileSidebar.classList.toString());
    }, 100);
}

function attachSidebarEventListeners(sidebar) {
    // Remove existing event listeners to prevent double-click issue
    const menuItems = sidebar.querySelectorAll(".menu-item[data-dropdown]");

    // Clone and replace elements to remove all existing listeners
    menuItems.forEach((menuItem) => {
        const newMenuItem = menuItem.cloneNode(true);
        menuItem.parentNode.replaceChild(newMenuItem, menuItem);
    });

    // Reattach dropdown toggle event listeners using the correct data attributes
    const freshMenuItems = sidebar.querySelectorAll(
        ".menu-item[data-dropdown]",
    );
    freshMenuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(
                "Dropdown toggle clicked:",
                this.getAttribute("data-dropdown"),
            );

            const dropdownName = this.getAttribute("data-dropdown");
            const dropdownMenu = sidebar.querySelector(
                `[data-dropdown-menu="${dropdownName}"]`,
            );

            if (dropdownMenu) {
                const isCurrentlyOpen = dropdownMenu.classList.contains("show");

                // Close all other dropdowns first
                sidebar
                    .querySelectorAll("[data-dropdown-menu]")
                    .forEach((menu) => {
                        if (menu !== dropdownMenu) {
                            menu.classList.remove("show");
                            const menuButton = sidebar.querySelector(
                                `[data-dropdown="${menu.getAttribute("data-dropdown-menu")}"]`,
                            );
                            if (menuButton) {
                                menuButton.setAttribute(
                                    "aria-expanded",
                                    "false",
                                );
                                const chevron =
                                    menuButton.querySelector(
                                        ".fa-chevron-down",
                                    );
                                if (chevron) {
                                    chevron.style.transform = "rotate(0deg)";
                                }
                            }
                        }
                    });

                // Toggle current dropdown
                if (isCurrentlyOpen) {
                    dropdownMenu.classList.remove("show");
                    this.setAttribute("aria-expanded", "false");
                    console.log(`Closed dropdown: ${dropdownName}`);
                } else {
                    dropdownMenu.classList.add("show");
                    this.setAttribute("aria-expanded", "true");
                    console.log(`Opened dropdown: ${dropdownName}`);
                }

                // Rotate the chevron icon
                const chevron = this.querySelector(".fa-chevron-down");
                if (chevron) {
                    chevron.style.transform = dropdownMenu.classList.contains(
                        "show",
                    )
                        ? "rotate(180deg)"
                        : "rotate(0deg)";
                    chevron.style.transition = "transform 0.3s ease";
                }

                // Sync with other sidebars
                syncDropdownState(
                    dropdownName,
                    dropdownMenu.classList.contains("show"),
                );
            }
        });
    });

    // Reattach dropdown item click handlers
    const dropdownItems = sidebar.querySelectorAll(".dropdown-item[onclick]");
    dropdownItems.forEach((item) => {
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
    });

    const freshDropdownItems = sidebar.querySelectorAll(
        ".dropdown-item[onclick]",
    );
    freshDropdownItems.forEach((item) => {
        const onclickAttr = item.getAttribute("onclick");
        if (onclickAttr) {
            item.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("Dropdown item clicked:", onclickAttr);

                // Clear all active dropdown items first
                sidebar.querySelectorAll(".dropdown-item").forEach((itm) => {
                    itm.classList.remove("active");
                });

                // Set this item as active
                this.classList.add("active");

                // Execute the original onclick function
                try {
                    eval(onclickAttr);
                } catch (error) {
                    console.log("Error executing onclick:", error);
                }

                // Sync highlighting with tab bar
                const moduleName = onclickAttr.match(/['"]([^'"]+)['"]/)?.[1];
                if (moduleName) {
                    syncActiveStateWithTabBar(moduleName);
                }

                // Close mobile sidebar after navigation
                if (isMobileView) {
                    const sidebarElement = document.querySelector(
                        "body > .sidebar.expanded",
                    );
                    if (sidebarElement) {
                        sidebarElement.classList.remove("expanded");
                        sidebarElement.style.left = "-280px";
                        removeMobileOverlay();
                    }
                }
            });
        }
    });

    // NEW: Add event listeners for submenu items (accordion behavior)
    const submenuItems = sidebar.querySelectorAll(".submenu li a");
    console.log(`Found ${submenuItems.length} submenu items in sidebar`);
    
    submenuItems.forEach((link, index) => {
        // Remove onclick attribute to prevent conflicts
        const originalOnclick = link.getAttribute('onclick');
        link.removeAttribute('onclick');
        
        // Add our new event listener
        link.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log(`Submenu item ${index} clicked: ${link.textContent.trim()}`);

            // Close all dropdowns except the one containing this link (accordion behavior)
            const currentSection = link.closest(".menu-section");
            console.log(`Current section:`, currentSection?.querySelector('.menu-toggle')?.textContent);
            
            sidebar.querySelectorAll(".menu-section").forEach(section => {
                if (section !== currentSection) {
                    console.log(`Closing section:`, section.querySelector('.menu-toggle')?.textContent);
                    section.classList.remove("open");
                }
            });
            
            // Keep the current section open
            if (currentSection) {
                console.log(`Keeping section open:`, currentSection.querySelector('.menu-toggle')?.textContent);
                currentSection.classList.add("open");
            }

            // Remove 'active' from all submenu links in ALL sidebars
            document.querySelectorAll(".submenu li a").forEach(l => {
                l.classList.remove("active");
                console.log(`Removed active from:`, l.textContent.trim());
            });

            // Add 'active' to clicked link
            link.classList.add("active");
            console.log(`Added active to:`, link.textContent.trim(), `Has active class:`, link.classList.contains('active'));
            
            // Also sync active state across mobile sidebar if it exists
            const mobileSidebar = document.querySelector("#mobileSidebar, body > .sidebar");
            if (mobileSidebar && mobileSidebar !== sidebar) {
                const linkText = link.textContent.trim();
                const mobileLink = mobileSidebar.querySelector(`.submenu li a[onclick*="${linkText.toLowerCase().replace(/\s+/g, '-')}"]`);
                if (mobileLink) {
                    mobileLink.classList.add("active");
                }
            }

            // Load the placeholder page
            const page = link.textContent.trim();
            const mainContent = document.querySelector(".user-main-content") || document.querySelector(".main-content");
            if (mainContent) {
                mainContent.innerHTML = `<div class="container-fluid mt-4">
                    <div class="card border-0 shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h2 class="card-title mb-0"><i class="fas fa-cog me-2"></i>${page}</h2>
                        </div>
                        <div class="card-body p-4">
                            <p class="lead text-muted">Content coming soon...</p>
                            <p class="text-muted">Page loaded via accordion behavior</p>
                        </div>
                    </div>
                </div>`;
            }

            // Close mobile sidebar after navigation
            if (isMobileView) {
                const sidebarElement = document.querySelector("body > .sidebar.expanded");
                if (sidebarElement) {
                    sidebarElement.classList.remove("expanded");
                    sidebarElement.style.left = "-280px";
                    removeMobileOverlay();
                }
            }

            // Execute original onclick if it existed (for content loading)
            if (originalOnclick) {
                try {
                    console.log(`Executing original onclick: ${originalOnclick}`);
                    eval(originalOnclick);
                } catch (error) {
                    console.log("Error executing original onclick:", error);
                }
            }

            console.log(`Submenu item processing complete for: ${link.textContent.trim()}`);
        });
    });

    // Reattach other navigation links
    const navLinks = sidebar.querySelectorAll("a[onclick]");
    navLinks.forEach((link) => {
        const onclickAttr = link.getAttribute("onclick");
        if (onclickAttr) {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                console.log("Nav link clicked:", onclickAttr);

                // Execute the original onclick function
                try {
                    eval(onclickAttr);
                } catch (error) {
                    console.log("Error executing onclick:", error);
                }

                // Close mobile sidebar after navigation
                if (isMobileView) {
                    const sidebarElement = document.querySelector(
                        "body > .sidebar.expanded",
                    );
                    if (sidebarElement) {
                        sidebarElement.classList.remove("expanded");
                        sidebarElement.style.left = "-280px";
                        removeMobileOverlay();
                    }
                }
            });
        }
    });

    console.log("Attached event listeners to mobile sidebar");
}

// MOBILE BEHAVIOR SYSTEM - Clean Implementation
function initializeMobileBehavior() {
    console.log("Mobile behavior system initialized");
}

function handleMobileAutoClose() {
    if (isMobileView) {
        setTimeout(() => {
            const mobileSidebar = document.querySelector(
                "body > .sidebar.expanded",
            );
            if (mobileSidebar) {
                mobileSidebar.classList.remove("expanded");
                mobileSidebar.style.left = "-280px";
                removeMobileOverlay();
                console.log("Mobile sidebar auto-closed");
            }
        }, 150);
    }
}

function initializeMobileSidebarSync(mobileSidebar) {
    if (!mobileSidebar) return;

    // The new system automatically handles mobile sidebar synchronization
    // through the unified event handlers
    console.log("Mobile sidebar sync ready");
}

// SIDEBAR BEHAVIOR SYSTEM - Clean Implementation
let sidebarState = {
    activeItem: "account-summary",
    openDropdown: "dashboard",
    isInitialized: false,
};

function initializeSidebarBehavior() {
    if (sidebarState.isInitialized) return;

    console.log("Initializing clean sidebar behavior system...");

    // Initialize dropdown behavior
    initializeDropdowns();

    // Initialize synchronization
    initializeSynchronization();

    // Initialize mobile behavior
    initializeMobileBehavior();

    sidebarState.isInitialized = true;
    console.log("Sidebar behavior system initialized");
}

function initializeDropdowns() {
    // Find all dropdown toggles across all sidebars
    const allDropdownToggles = document.querySelectorAll(
        ".menu-item[data-dropdown]",
    );

    allDropdownToggles.forEach((toggle) => {
        toggle.addEventListener("click", handleDropdownToggle);
    });

    console.log(`Initialized ${allDropdownToggles.length} dropdown toggles`);
}

// --- Replaced / consolidated dropdown initialization & helpers ---
function handleDropdownToggle(e) {
    const toggle = e.currentTarget || e.target;
    const name = toggle.getAttribute("data-dropdown");
    const sidebar = toggle.closest(".user-sidebar") || document;
    if (!name) return;

    // Toggle the menu that matches the dropdown name
    const menu = sidebar.querySelector(`[data-dropdown-menu="${name}"]`);
    if (!menu) return;

    const isOpen = menu.classList.contains("show");

    // Close others (only one open at a time)
    sidebar.querySelectorAll("[data-dropdown-menu]").forEach((m) => {
        if (m !== menu) {
            m.classList.remove("show");
            const btn = sidebar.querySelector(`[data-dropdown="${m.getAttribute("data-dropdown-menu")}"]`);
            if (btn) btn.setAttribute("aria-expanded", "false");
        }
    });

    // Toggle current
    if (isOpen) {
        menu.classList.remove("show");
        toggle.setAttribute("aria-expanded", "false");
    } else {
        menu.classList.add("show");
        toggle.setAttribute("aria-expanded", "true");
    }

    // rotate chevron if present
    const chevron = toggle.querySelector(".fa-chevron-down, .fa-chevron-right");
    if (chevron) {
        chevron.style.transform = menu.classList.contains("show") ? "rotate(180deg)" : "rotate(0deg)";
        chevron.style.transition = "transform 0.25s ease";
    }

    // notify sync layer (stubbed below)
    syncDropdownState(name, menu.classList.contains("show"));
}

function closeAllDropdowns(root = document) {
    root.querySelectorAll("[data-dropdown-menu].show").forEach((m) => {
        m.classList.remove("show");
    });
    root.querySelectorAll("[data-dropdown]").forEach((btn) => {
        btn.setAttribute("aria-expanded", "false");
        const chevron = btn.querySelector(".fa-chevron-down, .fa-chevron-right");
        if (chevron) chevron.style.transform = "rotate(0deg)";
    });
}

// Single, reliable initializeDropdowns — replaces previous duplicates
function initializeDropdowns() {
    // attach global click handler to close when clicking outside dropdowns
    document.addEventListener("click", (e) => {
        const isDropdownClick = !!e.target.closest("[data-dropdown]") || !!e.target.closest("[data-dropdown-menu]");
        if (!isDropdownClick) {
            closeAllDropdowns();
        }
    });

    // Attach handlers to toggles (idempotent)
    document.querySelectorAll(".menu-item[data-dropdown]").forEach((el) => {
        // Remove duplicates by cloning and replacing if already has listeners
        const cloned = el.cloneNode(true);
        el.parentNode.replaceChild(cloned, el);
    });

    document.querySelectorAll(".menu-item[data-dropdown]").forEach((el) => {
        el.addEventListener("click", (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            handleDropdownToggle(ev);
        });
    });

    // Ensure initial closed state after DOM ready
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", () => closeAllDropdowns());
    } else {
        closeAllDropdowns();
    }

    console.log(`initializeDropdowns: attached ${document.querySelectorAll(".menu-item[data-dropdown]").length} toggles`);
}

// Ensure the consolidated initializer runs (replaces old call site)
initializeDropdowns();



document.addEventListener("click", (e) => {
    ["user", "pos", "admin"].forEach((pageType) => {
        const container = document.querySelector(`#${pageType}-page`);
        if (!container || container.classList.contains("d-none")) return;

        const sidebar = container.querySelector(".user-sidebar");
        const toggleBtn = container.querySelector(".floating-toggle");
        if (!sidebar || !toggleBtn) return;

        // if clicking outside sidebar and toggle button
        if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
            if (sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
                toggleBtn.classList.remove("hide");
                toggleBtn.classList.add("show");
            }
        }
    });
});

// initialize register panel when page loads and bind initial Next button
document.addEventListener('DOMContentLoaded', () => {
    // if register page exists and is visible later, ensure the panel is ready.
    // Initialize panel content to validation template so Next works even if user navigated earlier.
    if (document.getElementById('register-right-panel')) {
        showRegisterStep('validation');
    }

    // optional: if user clicks the nav Register Now link and page is created dynamically,
    // showRegisterStep('validation') will already have been bound because showRegisterStep reads DOM each time.
});

// --- Full synchronization implementation (cross-sidebar) ---
const GGV_SYNC_DROPDOWN = "ggv:dropdown-toggle";
const GGV_SYNC_ACTIVE = "ggv:active-change";
const GGV_INSTANCE_ID = `ggv-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2)}`;

function initializeSynchronization() {
    // Listen for incoming sync events from other sidebar instances
    document.addEventListener(GGV_SYNC_DROPDOWN, (ev) =>
        handleIncomingDropdownSync(ev.detail),
    );
    document.addEventListener(GGV_SYNC_ACTIVE, (ev) =>
        handleIncomingActiveSync(ev.detail),
    );

    // Optional: when a new sidebar is added to the DOM later (mobile clone),
    // broadcast current state so it can adopt the current UI.
    // We keep a small state container to re-broadcast current known state.
    console.log("initializeSynchronization ready, instance:", GGV_INSTANCE_ID);
}

// Broadcast dropdown state to other sidebars
function syncDropdownState(dropdownName, isOpen, sourceId = GGV_INSTANCE_ID) {
    try {
        // Update local memory
        sidebarState.openDropdown = isOpen ? dropdownName : null;

        // Dispatch a DOM CustomEvent that other sidebars are listening to
        const ev = new CustomEvent(GGV_SYNC_DROPDOWN, {
            detail: { dropdownName, isOpen, sourceId },
        });
        document.dispatchEvent(ev);
    } catch (err) {
        console.error("syncDropdownState error:", err);
    }
}

// Broadcast active navigation (submenu) selection to other sidebars
function syncActiveStateWithTabBar(moduleName, sourceId = GGV_INSTANCE_ID) {
    try {
        sidebarState.activeItem = moduleName;
        const ev = new CustomEvent(GGV_SYNC_ACTIVE, {
            detail: { moduleName, sourceId },
        });
        document.dispatchEvent(ev);
    } catch (err) {
        console.error("syncActiveStateWithTabBar error:", err);
    }
}

// Handle incoming dropdown sync requests
function handleIncomingDropdownSync(detail) {
    if (!detail || detail.sourceId === GGV_INSTANCE_ID) return; // ignore our own events
    applyDropdownStateToAllSidebars(detail.dropdownName, detail.isOpen);
}

// Handle incoming active selection sync requests
function handleIncomingActiveSync(detail) {
    if (!detail || detail.sourceId === GGV_INSTANCE_ID) return; // ignore our own events
    applyActiveStateToAllSidebars(detail.moduleName);
}

// Apply dropdown open/close to all known sidebars
function applyDropdownStateToAllSidebars(dropdownName, isOpen) {
    const sidebars = document.querySelectorAll(".user-sidebar, body > .sidebar, #mobileSidebar");
    sidebars.forEach((sidebar) => {
        try {
            const menu = sidebar.querySelector(`[data-dropdown-menu="${dropdownName}"]`);
            const toggleBtn = sidebar.querySelector(`[data-dropdown="${dropdownName}"]`);

            if (menu && toggleBtn) {
                if (isOpen) {
                    menu.classList.add("show");
                    toggleBtn.setAttribute("aria-expanded", "true");
                } else {
                    menu.classList.remove("show");
                    toggleBtn.setAttribute("aria-expanded", "false");
                }

                // rotate chevron if present
                const chevron = toggleBtn.querySelector(".fa-chevron-down, .fa-chevron-right");
                if (chevron) {
                    chevron.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
                    chevron.style.transition = "transform 0.25s ease";
                }
            }
        } catch (err) {
            console.warn("applyDropdownStateToAllSidebars error:", err);
        }
    });
}

// Apply active selection highlight to all sidebars
function applyActiveStateToAllSidebars(moduleName) {
    if (!moduleName) return;

    // Normalize a search token (match against onclick or data-module attributes)
    const token = String(moduleName).trim();

    // Remove existing active classes
    document.querySelectorAll(".submenu li a, .dropdown-item, .user-sidebar a, body > .sidebar a").forEach((el) => {
        el.classList.remove("active");
    });

    // Try to find links by onclick content first, then by data-module or href containing token
    const candidates = [
        ...document.querySelectorAll(`a[onclick*="${token}"]`),
        ...document.querySelectorAll(`a[data-module="${token}"]`),
        ...document.querySelectorAll(`a[href*="${token}"]`),
        ...document.querySelectorAll(`.submenu li a`),
    ];

    // If multiple matches, pick the best ones and mark active
    const marked = new Set();
    candidates.forEach((el) => {
        if (!el || marked.has(el)) return;
        el.classList.add("active");
        // If element is inside a menu-section, ensure its section is open
        const section = el.closest(".menu-section");
        if (section) section.classList.add("open");
        marked.add(el);
    });

    // If nothing matched by token, fallback: try to find a matching innerText
    if (marked.size === 0) {
        document.querySelectorAll(".submenu li a").forEach((el) => {
            if (el.textContent.trim().toLowerCase().includes(token.toLowerCase())) {
                el.classList.add("active");
                const section = el.closest(".menu-section");
                if (section) section.classList.add("open");
            }
        });
    }
}

// Ensure initialization of the sync layer after dropdowns ready
try {
    initializeSynchronization();
} catch (e) {
    console.warn("initializeSynchronization failed:", e);
}
