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

function formatDateTime(date) {
    return new Date(date).toLocaleString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
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


function getDefaultModuleContent(title, description) {
    return `
        <div class="text-center py-5">
            <div class="mb-4">
                <i class="fas fa-cogs fa-3x text-primary"></i>
            </div>
            <h3>${title}</h3>
            <p class="text-muted">${description}</p>
            <button class="btn btn-primary" onclick="showAlert('${title} module is fully functional!', 'success')">
                <i class="fas fa-rocket me-2"></i>Explore Features
            </button>
        </div>
    `;
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

// POS Module Functions

function loadPosContent() {
    const posPage = document.getElementById("pos-page");
    if (!posPage) return;

    // Replace entire POS page
    posPage.outerHTML = getPosContent();

    // Now re-init sidebar dropdowns and mobile toggle
    setTimeout(() => {
        initializeSidebarNavigation("pos");
    }, 0);

    // Your POS-specific logic
    loadProducts();
    updateCartDisplay();
}

function loadPosModule(moduleName) {
    const posPageContainer = document.getElementById("pos-page-container");
    if (!posPageContainer) return;

    console.log("[POS] Loading module:", moduleName);

    switch (moduleName) {
        case "pos-home":
            posPageContainer.innerHTML = getPosHomeContent();
            break;
        case "orders-summary":
            posPageContainer.innerHTML = getOrdersSummaryContent();
            break;
        case "orders-pending":
            posPageContainer.innerHTML = getOrdersPendingContent();
            break;
        case "orders-voided":
            posPageContainer.innerHTML = getOrdersVoidedContent();
            break;
        case "sales-summary":
            posPageContainer.innerHTML = getSalesSummaryContent();
            break;
        case "sales-pending":
            posPageContainer.innerHTML = getSalesPendingContent();
            break;
        case "sales-voided":
            posPageContainer.innerHTML = getSalesVoidedContent();
            break;
        case "monthly-sales":
            posPageContainer.innerHTML = getMonthlySalesContent();
            break;
        case "daily-sales":
            posPageContainer.innerHTML = getDailySalesContent();
            break;
        case "sku-inventory":
            posPageContainer.innerHTML = getSkuInventoryContent();
            break;
        case "item-inventory":
            posPageContainer.innerHTML = getItemInventoryContent();
            break;
        case "settings":
            posPageContainer.innerHTML = getSettingsContent();
            break;
        default:
            posPageContainer.innerHTML = `<div class="alert alert-danger">[POS] Page not found: ${moduleName}</div>`;
    }
}




function getPosContent() {
    return `
        <div id="pos-page" class="page-content">
                <!-- Floating Toggle Button for Mobile/Tablet -->
                <button class="floating-toggle d-lg-none" id="floatingToggle" onclick="toggleSidebar('pos')">
                    <i class="fas fa-bars"></i>
                </button>

            <div class="container-fluid">
                <div class="row">
                    <!-- Sidebar -->
                    ${getSidebarContent("pos")}

                    <main class="user-main-content">
                        <div id="pos-page-container">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card border-0 shadow-sm">
                                            <div class="card-header bg-primary text-white">
                                                <h2 class="card-title mb-0">
                                                    <i class="fas fa-cash-register me-3"></i> Point of Sale
                                                </h2>
                                            </div>
                                            <div class="card-body p-4">
                                                <p class="lead text-muted">Select an option from the sidebar.</p>
                                                <p>Use the navigation menu on the left to access different POS features.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    `;
}

function loadProducts() {
    const productsGrid = document.getElementById("products-grid");
    if (!productsGrid) return;

    products = [...mockData.products];
    displayProducts(products);
}

// --- POS HOME ---
function getPosHomeContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Summary Cards -->
             <div class="row g-3 mb-4">
                <div class="col-md-4 col-sm-6 col-12">
                    <div class="card shadow-sm border-success" style="border-width:1px;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="text-secondary">Welcome back, JMDLONSOD</h6>
                                    <h4 class="fw-bold">₱349,050.00</h4>
                                    <small class="text-success">Your total completed orders</small>
                                </div>
                                <div class="d-flex flex-column align-items-end gap-2">
                                    <div class="btn-group">
                                        <button class="btn btn-sm btn-light border" title="Summary">
                                            <i class="fas fa-list"></i>
                                        </button>
                                        <button class="btn btn-sm btn-success">
                                            <i class="fas fa-plus me-1"></i> NEW PO
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 col-sm-6 col-12">
                    <div class="card shadow-sm border-warning" style="border-width:1px;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="text-muted">Total Pending Orders</h6>
                                    <h4 class="fw-bold">₱0.00</h4>
                                    <small class="text-warning">Your total pending orders</small>
                                </div>
                                <div class="d-flex flex-column align-items-end">
                                    <button class="btn btn-sm btn-light border" title="Pending list">
                                        <i class="fas fa-list"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-4 col-sm-6 col-12">
                    <div class="card shadow-sm border-success" style="border-width:1px;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="text-secondary">Total Sales</h6>
                                    <h4 class="fw-bold">₱472,280.00</h4>
                                    <small class="text-success">Your total sales</small>
                                </div>
                                <div class="d-flex flex-column align-items-end">
                                    <button class="btn btn-sm btn-success">
                                        <i class="fas fa-list me-1"></i> Personal Sales
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Personal Sales -->
            <div class="row g-3 mb-4">
                <div class="col-md-6 col-12">
                    <div class="card shadow-sm">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-shopping-cart fa-2x text-success me-3"></i>
                                <div>
                                    <h6 class="text-muted mb-0">PERSONAL SALES</h6>
                                    <h4 class="mb-0">₱472,280.00 <small class="text-muted">(45)</small></h4>
                                </div>
                            </div>
                            <div class="d-flex gap-2 align-items-center">
                                <button class="btn btn-light btn-sm border" title="Summary">
                                    <i class="fas fa-list"></i>
                                </button>
                                <button class="btn btn-success btn-sm">
                                    <i class="fas fa-plus me-1"></i> NEW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-12">
                    <div class="card shadow-sm">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-shopping-cart fa-2x text-warning me-3"></i>
                                <div>
                                    <h6 class="text-muted mb-0">PENDING PERSONAL SALES</h6>
                                    <h4 class="mb-0 text-muted">₱0.00 <small class="text-muted">(0)</small></h4>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-light btn-sm border" title="Pending list">
                                    <i class="fas fa-list"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Inventory Stats -->
            <div class="row g-3 mb-4">
                ${[
                    { icon: "bi-box-seam", label: "Total SKU Count", value: "125", note: "All active SKUs", color: "primary" },
                    { icon: "bi-truck", label: "Total SKU OUT", value: "101", note: "Dispatched SKUs", color: "warning" },
                    { icon: "bi-bar-chart-line", label: "SKU Balance", value: "24", note: "PTS: 6,000", color: "success" },
                    { icon: "bi-clipboard-data", label: "Total ITEM Count", value: "168", note: "All item units", color: "info" },
                    { icon: "bi-arrow-up-right-circle", label: "Total ITEM OUT", value: "144", note: "Delivered items", color: "danger" },
                    { icon: "bi-check-circle", label: "ITEM Balance", value: "24", note: "Remaining stock", color: "success" }
                ].map(stat => `
                    <div class="col-md-2 col-6">
                        <div class="card shadow-sm text-center">
                            <div class="card-body">
                                <i class="bi ${stat.icon} fs-4 text-${stat.color} mb-2"></i>
                                <h6 class="text-muted">${stat.label}</h6>
                                <h5 class="fw-bold">${stat.value}</h5>
                                <small class="text-muted">${stat.note}</small>
                            </div>
                        </div>
                    </div>
                `).join("")}
            </div>

            <!-- Inventory Tables -->
            <div class="row g-4">
                <div class="col-lg-6 col-12">
                    <div class="card shadow-sm">
                        <div class="card-header bg-info text-white">
                            <h5 class="mb-0">SKU Inventory</h5>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-bordered mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th>SKU</th>
                                            <th>UNIT</th>
                                            <th>PTS</th>
                                            <th>IN</th>
                                            <th>OUT</th>
                                            <th>AVAILABLE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${[
                                            { sku: "CREDITS", unit: "PC", pts: "0.00", in: 0, out: 0, available: 0 },
                                            { sku: "GOLD", unit: "PACK", pts: "0.00", in: 8, out: 8, available: 0 },
                                            { sku: "PLATINUM", unit: "PACK", pts: "0.00", in: 3, out: 3, available: 0 },
                                            { sku: "SCGUARD", unit: "BOTTLE", pts: "250.00", in: 50, out: 26, available: 24 },
                                            { sku: "SILVER", unit: "PACK", pts: "0.00", in: 64, out: 64, available: 0 }
                                        ].map(row => `
                                            <tr>
                                                <td>${row.sku}</td>
                                                <td>${row.unit}</td>
                                                <td>${row.pts}</td>
                                                <td>${row.in}</td>
                                                <td>${row.out}</td>
                                                <td>${row.available}</td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                    <tfoot class="table-light">
                                        <tr>
                                            <td colspan="3"><strong>Total</strong></td>
                                            <td><strong>125</strong></td>
                                            <td><strong>101</strong></td>
                                            <td><strong>24</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-12">
                    <div class="card shadow-sm">
                        <div class="card-header bg-secondary text-white">
                            <h5 class="mb-0">ITEM Inventory</h5>
                        </div>
                        <div class="card-body p-0">
                            <div class="table-responsive">
                                <table class="table table-bordered mb-0">
                                    <thead class="table-light">
                                        <tr>
                                            <th>SKU</th>
                                            <th>UNIT</th>
                                            <th>IN</th>
                                            <th>OUT</th>
                                            <th>AVAILABLE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>SCGUARD</td>
                                            <td>BOTTLE</td>
                                            <td>168</td>
                                            <td>144</td>
                                            <td>24</td>
                                        </tr>
                                    </tbody>
                                    <tfoot class="table-light">
                                        <tr>
                                            <td colspan="2"><strong>Total</strong></td>
                                            <td><strong>168</strong></td>
                                            <td><strong>144</strong></td>
                                            <td><strong>24</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// --- MY ORDERS ---
function getOrdersSummaryContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Summary Cards -->
            <div class="row g-3 mb-4">
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #28a745, #218838);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Completed Orders</h6>
                            <h4 class="fw-bold">₱349,050.00</h4>
                            <small>26 orders</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #dc3545, #c82333);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Voided Orders</h6>
                            <h4 class="fw-bold">₱0.00</h4>
                            <small>1 order</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-dark" style="background: linear-gradient(135deg, #ffc107, #e0a800);">
                        <div class="card-body text-center">
                            <h6 class="text-dark-50">Pending Orders</h6>
                            <h4 class="fw-bold">₱0.00</h4>
                            <small>0 orders</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Orders Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-success text-white d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <h3 class="mb-2 mb-md-0"><i class="fas fa-list me-2"></i> My Purchase Orders</h3>
                    <div class="input-group" style="max-width: 300px;">
                        <span class="input-group-text bg-light"><i class="fas fa-search text-muted"></i></span>
                        <input type="text" class="form-control bg-light" placeholder="Search orders...">
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>TRANS#</th>
                                    <th>REF#</th>
                                    <th>STORE</th>
                                    <th>CASHIER/CREATOR</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th>AMOUNT</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>30</td><td>20250326-10232</td><td>DAVAO BRANCH</td><td>Guild, Grinders [98293]</td><td>2025-03-26 14:40:55</td>
                                    <td><span class="badge bg-success">PAID / COMPLETED</span></td><td>₱10,500.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-secondary me-1"><i class="fas fa-search"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-ellipsis-h"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>47</td><td>20250330-10231</td><td>DAVAO BRANCH</td><td>Guild, Grinders [98293]</td><td>2025-03-30 16:25:26</td>
                                    <td><span class="badge bg-success">PAID / COMPLETED</span></td><td>₱10,350.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-secondary me-1"><i class="fas fa-search"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-ellipsis-h"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>50</td><td>20250401-10231</td><td>DAVAO BRANCH</td><td>Guild, Grinders [98293]</td><td>2025-04-01 01:31:41</td>
                                    <td><span class="badge bg-success">PAID / COMPLETED</span></td><td>₱20,700.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-secondary me-1"><i class="fas fa-search"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-ellipsis-h"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>25</td><td>20350322-104302</td><td>DAVAO BRANCH</td><td>System</td><td>2025-03-22 11:00:00</td>
                                    <td><span class="badge bg-danger">VOIDED</span></td><td>₱0.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 0 to 0 of 0 entries</small>
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Previous"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Next"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}

function getOrdersPendingContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb" class="mb-3">
                <ol class="breadcrumb bg-light p-2 rounded">
                    <li class="breadcrumb-item">Purchase Orders</li>
                    <li class="breadcrumb-item active" aria-current="page">Pending Orders</li>
                </ol>
            </nav>

            <!-- Header Section -->
            <div class="card shadow-sm mb-4">
                <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="d-flex align-items-center mb-3 mb-md-0">
                        <div class="bg-white rounded d-flex align-items-center justify-content-center me-3" 
                             style="width:64px; height:64px; box-shadow:0 2px 6px rgba(0,0,0,0.04);">
                            <i class="fas fa-box fa-2x text-secondary" aria-hidden="true"></i>
                        </div>
                        <div>
                            <h6 class="mb-0 text-uppercase">TOTAL PENDING ORDERS</h6>
                            <p class="mb-0 text-muted">₱0.00 <small class="text-muted">(0)</small></p>
                        </div>
                    </div>

                    <div class="d-flex gap-2 flex-wrap">
                        <button class="btn btn-success btn-sm">
                            <i class="fas fa-plus me-1"></i> NEW PO
                        </button>
                        <button class="btn btn-outline-secondary btn-sm">
                            <i class="fas fa-eye me-1"></i> View All Orders
                        </button>
                    </div>
                </div>
            </div>

            <!-- Pending Orders Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-warning text-dark">
                    <h5 class="mb-0"><i class="fas fa-clock me-2"></i> Pending Orders</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>TRANS#</th>
                                    <th>REF#</th>
                                    <th>STORE</th>
                                    <th>STAFF</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="7" class="text-center text-muted py-4">No data available in table</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 0 to 0 of 0 entries</small>
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Previous"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Next"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}

function getOrdersVoidedContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Breadcrumb -->
            <nav aria-label="breadcrumb" class="mb-3">
                <ol class="breadcrumb bg-light p-2 rounded">
                    <li class="breadcrumb-item">Purchase Orders</li>
                    <li class="breadcrumb-item active" aria-current="page">Voided Orders</li>
                </ol>
            </nav>

            <!-- Header Section -->
            <div class="card shadow-sm mb-4">
                <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="d-flex align-items-center mb-3 mb-md-0">
                        <div class="bg-danger text-white rounded p-3 d-flex align-items-center">
                            <i class="fas fa-shopping-bag fa-lg me-2"></i>
                            <div>
                                <h6 class="mb-0">Voided Orders</h6>
                                <small>₱0.00 (1)</small>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm"><i class="fas fa-list me-1"></i> My Orders</button>
                    </div>
                </div>
            </div>

            <!-- Voided Orders Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-danger text-white">
                    <h5 class="mb-0"><i class="fas fa-ban me-2"></i> My Purchase Orders</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>TRANS#</th>
                                    <th>REF#</th>
                                    <th>STORE</th>
                                    <th>CASHIER/CREATOR</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th>AMOUNT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>25</td>
                                    <td>20250324-10231</td>
                                    <td>DAVAO BRANCH</td>
                                    <td>DLONSOD, JESSYLE MAE C. (0432025)</td>
                                    <td>2025-03-24 10:43:02</td>
                                    <td><span class="badge bg-danger">VOIDED</span></td>
                                    <td>₱0.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 0 to 0 of 0 entries</small>
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Previous"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Next"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}

// --- PERSONAL SALES ---
function getSalesSummaryContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Summary Cards -->
            <div class="row g-3 mb-4">
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #198754, #157347);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Total Sales</h6>
                            <h4 class="fw-bold">₱472,280.00</h4>
                            <small>45 transactions</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #dc3545, #b02a37);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Voided Sales</h6>
                            <h4 class="fw-bold">₱2,280.00</h4>
                            <small>1 transaction</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-dark" style="background: linear-gradient(135deg, #ffc107, #e0a800);">
                        <div class="card-body text-center">
                            <h6 class="text-dark-50">Pending Sales</h6>
                            <h4 class="fw-bold">₱0.00</h4>
                            <small>0 transactions</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Unified Personal Sales Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0"><i class="fas fa-hand-holding-usd me-2"></i> Personal Sales</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>TRANSAK</th>
                                    <th>CUSTOMER</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th>AMT</th>
                                    <th>PAYMENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>168</td>
                                    <td>ADSUARA, ROMELYN [HEIDI]</td>
                                    <td>2023-05-14 09:29:40</td>
                                    <td><span class="badge bg-warning text-dark">PENDING / SETTLED CLAIMED PERSONAL</span></td>
                                    <td>₱45,600.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>169</td>
                                    <td>Salanggang, Grace [Gracious01]</td>
                                    <td>2023-05-14 11:17:38</td>
                                    <td><span class="badge bg-warning text-dark">PENDING / SETTLED CLAIMED PERSONAL</span></td>
                                    <td>₱7,000.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>163</td>
                                    <td>Salanggang, Grace [Gracious01]</td>
                                    <td>2023-05-14 16:52:23</td>
                                    <td><span class="badge bg-warning text-dark">PENDING / SETTLED CLAIMED PERSONAL</span></td>
                                    <td>₱1,500.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>148</td>
                                    <td>ASIDIGBAH IPOMELYN (PEDRO)</td>
                                    <td>2023-03-14 00:22:50</td>
                                    <td><span class="badge bg-success">PENDING / INCOMPLETE CLAIMS PERSONAL</span></td>
                                    <td>₱4,200.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>149</td>
                                    <td>Salangwang Grace (Glaucous)</td>
                                    <td>2023-03-14 11:17:38</td>
                                    <td><span class="badge bg-success">PENDING / INCOMPLETE CLAIMS PERSONAL</span></td>
                                    <td>₱7,000.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>150</td>
                                    <td>Salangwang Grace (Glaucous)</td>
                                    <td>2023-03-14 16:22:23</td>
                                    <td><span class="badge bg-success">PENDING / INCOMPLETE CLAIMS PERSONAL</span></td>
                                    <td>₱0.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>151</td>
                                    <td>Lentoha Jemeto (APEMO)</td>
                                    <td>2023-03-14 17:00:00</td>
                                    <td><span class="badge bg-success">PENDING / INCOMPLETE CLAIMS PERSONAL</span></td>
                                    <td>₱0.00</td>
                                    <td class="text-center">
                                        <button class="btn btn-sm btn-outline-primary me-1"><i class="fas fa-eye"></i></button>
                                        <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}



function getSalesPendingContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Header Section -->
            <div class="card shadow-sm mb-4">
                <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1">Pending Personal Sales</h5>
                        <p class="mb-0 text-muted">Total Pending Sales: <strong>₱0.00</strong></p>
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm"><i class="fas fa-list me-1"></i> View All Orders</button>
                    </div>
                </div>
            </div>

            <!-- Pending Sales Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-warning text-dark">
                    <h5 class="mb-0"><i class="fas fa-clock me-2"></i> Pending Personal Sales</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>TRANS#</th>
                                    <th>CUSTOMER</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th>AMT</th>
                                    <th>PAYMENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="6" class="text-center text-muted py-4">No data available in table</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 0 to 0 of 0 entries</small>
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Previous"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Next"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}


function getSalesVoidedContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Header Section -->
            <div class="card shadow-sm mb-4">
                <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div>
                        <h5 class="mb-1">Voided Personal Sales</h5>
                        <p class="mb-0 text-muted">Total Voided Sales: <strong>₱2,280.00</strong></p>
                    </div>
                    <div>
                        <button class="btn btn-success btn-sm"><i class="fas fa-list me-1"></i> View All Orders</button>
                    </div>
                </div>
            </div>

            <!-- Voided Sales Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-danger text-white">
                    <h5 class="mb-0"><i class="fas fa-ban me-2"></i> Voided Personal Sales</h5>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>TRANSACTION</th>
                                    <th>CUSTOMER</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                    <th>AMT</th>
                                    <th>PAYMENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>64-3</td>
                                    <td>Valica, Nicolas [Berths]</td>
                                    <td>2023-05-17 18:41:21</td>
                                    <td><span class="badge bg-danger">VOIDED (Personal)</span></td>
                                    <td>₱2,280.00</td>
                                    <td>₱0.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 0 to 0 of 0 entries</small>
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Previous"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Next"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}


// --- REPORTS ---
function getMonthlySalesContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Top Summary Section -->
            <div class="row g-3 mb-4">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                            <div>
                                <h5 class="mb-1">Your total sales Store + Personal</h5>
                                <p class="mb-0 text-muted"><strong>₱472,280.00</strong></p>
                            </div>
                            <div class="d-flex gap-2 flex-wrap">
                                <button class="btn btn-success btn-sm"><i class="fas fa-store me-1"></i> Store Sales</button>
                                <button class="btn btn-success btn-sm"><i class="fas fa-user me-1"></i> Personal Sales</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Redesigned cards to match provided image -->
                <div class="col-md-6 col-12">
                    <div class="card shadow-sm border-success">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <div class="bg-success rounded d-flex align-items-center justify-content-center me-3" 
                                     style="width:56px; height:56px;">
                                    <i class="fas fa-store text-white fa-lg"></i>
                                </div>
                                <div>
                                    <h6 class="mb-0 text-muted">Store Sales</h6>
                                    <small class="text-success">Total Store Sales</small>
                                </div>
                            </div>

                            <div class="d-flex flex-column align-items-end">
                                <h4 class="mb-1">₱0.00 <small class="text-muted">(0)</small></h4>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-success btn-sm" title="Export">
                                        <i class="fas fa-table"></i>
                                    </button>
                                    <button class="btn btn-success btn-sm">
                                        <i class="fas fa-plus me-1"></i>NEW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-12">
                    <div class="card shadow-sm border-success">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <div class="bg-success rounded d-flex align-items-center justify-content-center me-3" 
                                     style="width:56px; height:56px;">
                                    <i class="fas fa-user text-white fa-lg"></i>
                                </div>
                                <div>
                                    <h6 class="mb-0 text-muted">Personal Sales</h6>
                                    <small class="text-success">Total Personal Sales</small>
                                </div>
                            </div>

                            <div class="d-flex flex-column align-items-end">
                                <h4 class="mb-1">₱472,280.00 <small class="text-muted">(45)</small></h4>
                                <div class="d-flex gap-2">
                                    <button class="btn btn-success btn-sm" title="Export">
                                        <i class="fas fa-table"></i>
                                    </button>
                                    <button class="btn btn-success btn-sm">
                                        <i class="fas fa-plus me-1"></i>NEW
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Monthly Sales Summary Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-info text-white d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <h5 class="mb-2 mb-md-0"><i class="fas fa-calendar-alt me-2"></i> Monthly Sales Summary</h5>
                    <div class="input-group" style="max-width: 300px;">
                        <span class="input-group-text bg-light"><i class="fas fa-search text-muted"></i></span>
                        <input type="text" class="form-control bg-light" placeholder="Search month...">
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>Date</th>
                                    <th>Pending</th>
                                    <th>Store</th>
                                    <th>Personal</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>2025-06</td><td>₱0.00</td><td>₱0.00</td><td>₱94,500.00</td><td>₱94,500.00</td></tr>
                                <tr><td>2025-05</td><td>₱0.00</td><td>₱0.00</td><td>₱52,180.00</td><td>₱52,180.00</td></tr>
                                <tr><td>2025-04</td><td>₱0.00</td><td>₱0.00</td><td>₱164,500.00</td><td>₱164,500.00</td></tr>
                                <tr><td>2025-03</td><td>₱0.00</td><td>₱0.00</td><td>₱161,100.00</td><td>₱161,100.00</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 0 to 0 of 0 entries</small>
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Previous"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Next"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}


function getDailySalesContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">

            <!-- Summary Cards -->
            <div class="row g-3 mb-4">
                <div class="col-12">
                    <div class="card shadow-sm">
                        <div class="card-body d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                            <div>
                                <h5 class="mb-1">Your total sales Store + Personal</h5>
                                <p class="mb-0 text-muted"><strong>₱472,280.00</strong></p>
                            </div>
                            <div class="d-flex gap-2 flex-wrap">
                                <button class="btn btn-success btn-sm"><i class="fas fa-store me-1"></i> Store Sales</button>
                                <button class="btn btn-success btn-sm"><i class="fas fa-user me-1"></i> Personal Sales</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-12">
                    <div class="card shadow-sm border-success">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <div class="bg-success rounded d-flex align-items-center justify-content-center me-3" 
                                     style="width:56px; height:56px;">
                                    <i class="fas fa-store text-white fa-lg"></i>
                                </div>
                                <div>
                                    <h6 class="mb-0 text-muted">Total Store Sales</h6>
                                    <h4 class="mb-0">₱0.00 <small class="text-muted">(0)</small></h4>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-success btn-sm"><i class="fas fa-table me-1"></i>Export</button>
                                <button class="btn btn-light btn-sm ms-2"><i class="fas fa-plus"></i> NEW</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-12">
                    <div class="card shadow-sm border-success">
                        <div class="card-body d-flex justify-content-between align-items-center">
                            <div class="d-flex align-items-center">
                                <div class="bg-success rounded d-flex align-items-center justify-content-center me-3" 
                                     style="width:56px; height:56px;">
                                    <i class="fas fa-user text-white fa-lg"></i>
                                </div>
                                <div>
                                    <h6 class="mb-0 text-muted">Total Personal Sales</h6>
                                    <h4 class="mb-0">₱472,280.00 <small class="text-muted">(45)</small></h4>
                                </div>
                            </div>
                            <div>
                                <button class="btn btn-success btn-sm"><i class="fas fa-table me-1"></i>Export</button>
                                <button class="btn btn-light btn-sm ms-2"><i class="fas fa-plus"></i> NEW</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Daily Sales Summary Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-info text-white d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <h5 class="mb-2 mb-md-0"><i class="fas fa-calendar-day me-2"></i> Daily Sales Summary</h5>
                    <div class="input-group" style="max-width: 300px;">
                        <span class="input-group-text bg-light"><i class="fas fa-search text-muted"></i></span>
                        <input type="text" class="form-control bg-light" placeholder="Search date...">
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>Date</th>
                                    <th>Pending</th>
                                    <th>Store</th>
                                    <th>Personal</th>
                                    <th>Completed</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>2025-06-24</td><td>₱0.00</td><td>₱0.00</td><td>₱49,000.00</td><td>₱49,000.00</td></tr>
                                <tr><td>2025-06-13</td><td>₱0.00</td><td>₱0.00</td><td>₱14,000.00</td><td>₱14,000.00</td></tr>
                                <tr><td>2025-06-05</td><td>₱0.00</td><td>₱0.00</td><td>₱21,000.00</td><td>₱21,000.00</td></tr>
                                <tr><td>2025-06-01</td><td>₱0.00</td><td>₱0.00</td><td>₱10,000.00</td><td>₱10,000.00</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 1 to 4 of 4 entries</small>
                    <nav>
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">#<i class="fas fa-angle-left"></i></a></li>
                            rounded-circle" href="#">1</a></li>
                            <li class="page-item disabled">#<i class="fas fa-angle-right"></i></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}


// --- INVENTORY ---
function getSkuInventoryContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Summary Cards -->
            <div class="row g-3 mb-4">
                <div class="col-md-3 col-6">
                    <div class="card shadow-sm text-center">
                        <div class="card-body">
                            <h6 class="text-muted">Total SKU Count</h6>
                            <h5 class="fw-bold">125</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="card shadow-sm text-center">
                        <div class="card-body">
                            <h6 class="text-muted">Total SKU OUT</h6>
                            <h5 class="fw-bold">101</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="card shadow-sm text-center">
                        <div class="card-body">
                            <h6 class="text-muted">Total SKU Balance</h6>
                            <h5 class="fw-bold">24</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-6">
                    <div class="card shadow-sm text-center">
                        <div class="card-body">
                            <h6 class="text-muted">Total PTS Balance</h6>
                            <h5 class="fw-bold">6,000.00</h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SKU Inventory Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-secondary text-white d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <h5 class="mb-2 mb-md-0"><i class="fas fa-barcode me-2"></i> SKU Inventory</h5>
                    <div class="input-group" style="max-width: 300px;">
                        <span class="input-group-text bg-light"><i class="fas fa-search text-muted"></i></span>
                        <input type="text" class="form-control bg-light" placeholder="Search SKU...">
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>SKU</th>
                                    <th>UNIT</th>
                                    <th>PTS</th>
                                    <th>IN</th>
                                    <th>OUT</th>
                                    <th>AVAILABLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>CREDITS</td><td>PC</td><td>0.00</td><td>0</td><td>0</td><td>0</td></tr>
                                <tr><td>GOLD</td><td>PACK</td><td>0.00</td><td>8</td><td>8</td><td>0</td></tr>
                                <tr><td>PLATINUM</td><td>PACK</td><td>0.00</td><td>3</td><td>3</td><td>0</td></tr>
                                <tr><td>SGGUARD</td><td>BOTTLE</td><td>250.00</td><td>50</td><td>26</td><td>24</td></tr>
                                <tr><td>SILVER</td><td>PACK</td><td>0.00</td><td>64</td><td>64</td><td>0</td></tr>
                            </tbody>
                            <tfoot class="table-light">
                                <tr>
                                    <td colspan="2"><strong>Total</strong></td>
                                    <td><strong>6,000.00</strong></td>
                                    <td><strong>125</strong></td>
                                    <td><strong>101</strong></td>
                                    <td><strong>24</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function getItemInventoryContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Summary Cards -->
            <div class="row g-3 mb-4">
                <div class="col-md-4 col-6">
                    <div class="card shadow-sm text-center">
                        <div class="card-body">
                            <h6 class="text-muted">Total ITEM Count</h6>
                            <h5 class="fw-bold">168</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-6">
                    <div class="card shadow-sm text-center">
                        <div class="card-body">
                            <h6 class="text-muted">Total ITEM OUT</h6>
                            <h5 class="fw-bold">144</h5>
                        </div>
                    </div>
                </div>
                <div class="col-md-4 col-6">
                    <div class="card shadow-sm text-center">
                        <div class="card-body">
                            <h6 class="text-muted">Total ITEM Balance</h6>
                            <h5 class="fw-bold">24</h5>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ITEM Inventory Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-secondary text-white d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <h5 class="mb-2 mb-md-0"><i class="fas fa-cubes me-2"></i> ITEM Inventory</h5>
                    <div class="input-group" style="max-width: 300px;">
                        <span class="input-group-text bg-light"><i class="fas fa-search text-muted"></i></span>
                        <input type="text" class="form-control bg-light" placeholder="Search item...">
                    </div>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover mb-0 w-100">
                            <thead class="table-light">
                                <tr>
                                    <th>SKU</th>
                                    <th>UNIT</th>
                                    <th>IN</th>
                                    <th>OUT</th>
                                    <th>AVAILABLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>SCGUARD</td>
                                    <td>BOTTLE</td>
                                    <td>168</td>
                                    <td>144</td>
                                    <td>24</td>
                                </tr>
                            </tbody>
                            <tfoot class="table-light">
                                <tr>
                                    <td colspan="2"><strong>Total</strong></td>
                                    <td><strong>168</strong></td>
                                    <td><strong>144</strong></td>
                                    <td><strong>24</strong></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `;
}


// --- SETTINGS ---
function getSettingsContent() {
    return `
        <div class="container-fluid">
            <div class="breadcrumb mb-3">
                #Home</a> &gt; 
                <span>Profile Settings</span>
            </div>

            <div class="card shadow-sm">
                <div class="card-header bg-dark text-white">
                    <h3><i class="fas fa-cog me-2"></i> Profile Settings</h3>
                </div>
                <div class="card-body">
                    <!-- Navigation Tabs -->
                    <div class="nav nav-tabs mb-3" role="tablist">
                        <button class="nav-link active" data-bs-toggle="tab" type="button">1 Account Details<br><small>Account Details</small></button>
                        <button class="nav-link" data-bs-toggle="tab" type="button">2 Personal<br><small>Personal Info</small></button>
                        <button class="nav-link" data-bs-toggle="tab" type="button">3 Contacts<br><small>Contact Details</small></button>
                    </div>

                    <!-- Account Details Section -->
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="account-details">
                            <h4>Account Details<br><small>Your Account Details.</small></h4>
                            <form>
                                <div class="mb-3">
                                    <label for="username" class="form-label">Username:</label>
                                    <input type="text" id="username" name="username" class="form-control" value="[JMDLONSDD]" readonly>
                                </div>
                                <div class="mb-3">
                                    <label for="position" class="form-label">Position:</label>
                                    <input type="text" id="position" name="position" class="form-control" value="[ADMIN]" readonly>
                                </div>
                                <div class="mb-3">
                                    <label for="created-date" class="form-label">Created:</label>
                                    <input type="date" id="created-date" name="created-date" class="form-control" value="2025-03-04" readonly>
                                </div>
                                <div class="mb-3">
                                    <label for="hired-date" class="form-label">Hired:</label>
                                    <input type="date" id="hired-date" name="hired-date" class="form-control" value="1970-01-01" readonly>
                                </div>
                                <button type="submit" class="btn btn-warning">Change Password</button>
                            </form>
                        </div>
                    </div>

                    <!-- Next Button -->
                    <div class="mt-3 text-end">
                        <button type="submit" class="btn btn-primary">Next →</button>
                    </div>
                </div>
            </div>
        </div>
    `;
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

function getCodeBankContent() {
    return `
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="mb-0">Code Bank</h2>
        </div>
        
        <!-- Stats Cards Row -->
        <div class="row g-3 mb-4">
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); min-height: 100px; border-radius: 12px;">
                    <div class="card-body d-flex flex-column justify-content-center py-3">
                        <h6 class="text-white-75 mb-2 fw-normal" style="opacity: 0.8;">Total Activation Codes</h6>
                        <h1 class="mb-0 fw-bold text-white" style="font-size: 2.5rem;">14</h1>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #F87171 0%, #EF4444 100%); min-height: 100px; border-radius: 12px;">
                    <div class="card-body d-flex flex-column justify-content-center py-3">
                        <h6 class="text-white-75 mb-2 fw-normal" style="opacity: 0.8;">Used</h6>
                        <h1 class="mb-0 fw-bold text-white" style="font-size: 2.5rem;">9</h1>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-12 col-12">
                <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); min-height: 100px; border-radius: 12px;">
                    <div class="card-body d-flex flex-column justify-content-center py-3">
                        <h6 class="text-white-75 mb-2 fw-normal" style="opacity: 0.8;">Active</h6>
                        <h1 class="mb-0 fw-bold text-white" style="font-size: 2.5rem;">5</h1>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Activation Codes Table -->
        <div class="card border-0 shadow-sm" style="border-radius: 12px;">
            <div class="card-body p-0">
                <div class="px-4 pt-4 pb-3">
                    <h5 class="mb-0 fw-normal">Activation Codes</h5>
                </div>
                
                <div class="px-4 pb-3">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-12 mb-2 mb-lg-0">
                            <div class="d-flex align-items-center flex-wrap gap-2">
                                <span class="text-muted">Show</span>
                                <select class="form-select form-select-sm" style="width: auto; min-width: 70px;">
                                    <option selected>10</option>
                                    <option>25</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                                <span class="text-muted">entries</span>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-12">
                            <div class="d-flex justify-content-lg-end">
                                <div class="d-flex align-items-center gap-2">
                                    <span class="text-muted">Search:</span>
                                    <input type="text" class="form-control form-control-sm" style="min-width: 200px; max-width: 300px;" placeholder="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0;">
                            <tr>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">Ctrl# <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">TRANS# <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">CODE <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">PIN <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">DESC <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">STATUS <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">AMOUNT <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">BV <i class="fas fa-caret-down ms-1"></i></th>
                                <th class="px-4 py-3 fw-normal text-muted" style="font-size: 0.875rem;">DR <i class="fas fa-caret-down ms-1"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-4 py-3">3772</td>
                                <td class="px-4 py-3">1021844</td>
                                <td class="px-4 py-3">POS-1021-85658418</td>
                                <td class="px-4 py-3"><small class="text-muted">8yesrQqwSac8nS</small></td>
                                <td class="px-4 py-3">SILVER</td>
                                <td class="px-4 py-3">Royalty07, Royalty07[kyou]</td>
                                <td class="px-4 py-3">3,500.00</td>
                                <td class="px-4 py-3">10.00</td>
                                <td class="px-4 py-3">500.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">3773</td>
                                <td class="px-4 py-3">1021844</td>
                                <td class="px-4 py-3">POS-1021-34228143</td>
                                <td class="px-4 py-3"><small class="text-muted">tgse5fehdssyf</small></td>
                                <td class="px-4 py-3">SILVER</td>
                                <td class="px-4 py-3">Barber, Jerson[JersonBarber01]</td>
                                <td class="px-4 py-3">3,500.00</td>
                                <td class="px-4 py-3">10.00</td>
                                <td class="px-4 py-3">500.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">3774</td>
                                <td class="px-4 py-3">1021844</td>
                                <td class="px-4 py-3">POS-1021-83054399</td>
                                <td class="px-4 py-3"><small class="text-muted">Bb4vsfwfwxe9ytb</small></td>
                                <td class="px-4 py-3">GOLD</td>
                                <td class="px-4 py-3">Flores, Angeles[Angeles7]</td>
                                <td class="px-4 py-3">10,500.00</td>
                                <td class="px-4 py-3">30.00</td>
                                <td class="px-4 py-3">1,500.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">3775</td>
                                <td class="px-4 py-3">1021844</td>
                                <td class="px-4 py-3">POP-1021-33350335</td>
                                <td class="px-4 py-3"><small class="text-muted">hyab7e4ehb8efg</small></td>
                                <td class="px-4 py-3">PLATINUM</td>
                                <td class="px-4 py-3"><span class="badge bg-success rounded-pill">ACTIVE</span></td>
                                <td class="px-4 py-3">35,000.00</td>
                                <td class="px-4 py-3">100.00</td>
                                <td class="px-4 py-3">5,000.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">3900</td>
                                <td class="px-4 py-3">1023654</td>
                                <td class="px-4 py-3">POS-1023-07554484</td>
                                <td class="px-4 py-3"><small class="text-muted">lg7hwfss8h2sss</small></td>
                                <td class="px-4 py-3">SILVER</td>
                                <td class="px-4 py-3">Medel, Elena[Dataset92]</td>
                                <td class="px-4 py-3">3,500.00</td>
                                <td class="px-4 py-3">10.00</td>
                                <td class="px-4 py-3">500.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">4000</td>
                                <td class="px-4 py-3">1023654</td>
                                <td class="px-4 py-3">POS-1023-19235585</td>
                                <td class="px-4 py-3"><small class="text-muted">db6db3cmy4gfe</small></td>
                                <td class="px-4 py-3">GOLD</td>
                                <td class="px-4 py-3">Gonzaga, Elena[ElenaGonzaga05]</td>
                                <td class="px-4 py-3">10,500.00</td>
                                <td class="px-4 py-3">30.00</td>
                                <td class="px-4 py-3">1,500.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">4565</td>
                                <td class="px-4 py-3">10001203</td>
                                <td class="px-4 py-3">POS-1000-74540352</td>
                                <td class="px-4 py-3"><small class="text-muted">rv2yesfh67u5h</small></td>
                                <td class="px-4 py-3">SILVER</td>
                                <td class="px-4 py-3">Dionisod, Jesher Charles[Jcbdionisod]</td>
                                <td class="px-4 py-3">3,500.00</td>
                                <td class="px-4 py-3">10.00</td>
                                <td class="px-4 py-3">500.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">6356</td>
                                <td class="px-4 py-3">1057226</td>
                                <td class="px-4 py-3">POS-1057-92579268</td>
                                <td class="px-4 py-3"><small class="text-muted">fg3sgh8gdwbqqu</small></td>
                                <td class="px-4 py-3">GOLD</td>
                                <td class="px-4 py-3">Pepito, Precious Pearl[Preciouspearl01]</td>
                                <td class="px-4 py-3">10,500.00</td>
                                <td class="px-4 py-3">30.00</td>
                                <td class="px-4 py-3">1,500.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">6632</td>
                                <td class="px-4 py-3">1032264</td>
                                <td class="px-4 py-3">POP-1039-36396234</td>
                                <td class="px-4 py-3"><small class="text-muted">3b7b3eqewvbbdf</small></td>
                                <td class="px-4 py-3">PLATINUM</td>
                                <td class="px-4 py-3"><span class="badge bg-success rounded-pill">ACTIVE</span></td>
                                <td class="px-4 py-3">35,000.00</td>
                                <td class="px-4 py-3">100.00</td>
                                <td class="px-4 py-3">5,000.00</td>
                            </tr>
                            <tr>
                                <td class="px-4 py-3">6633</td>
                                <td class="px-4 py-3">1032264</td>
                                <td class="px-4 py-3">POP-1039-66332479</td>
                                <td class="px-4 py-3"><small class="text-muted">4bth7qwsosagjw</small></td>
                                <td class="px-4 py-3">PLATINUM</td>
                                <td class="px-4 py-3"><span class="badge bg-success rounded-pill">ACTIVE</span></td>
                                <td class="px-4 py-3">35,000.00</td>
                                <td class="px-4 py-3">100.00</td>
                                <td class="px-4 py-3">5,000.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">Showing 0 to 0 of 0 entries</small>
                    <nav aria-label="Pagination">
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Previous"><i class="fas fa-angle-left"></i></a>
                            </li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled">
                                <a class="page-link" href="#" aria-label="Next"><i class="fas fa-angle-right"></i></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}

// eWallet sub-module functions
function getWithdrawalPinContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-key me-2"></i>Withdrawal PIN</h2>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>Update Withdrawal PIN</h5>
            </div>
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label class="form-label">Current PIN</label>
                        <input type="password" class="form-control" maxlength="6">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">New PIN</label>
                        <input type="password" class="form-control" maxlength="6">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Confirm New PIN</label>
                        <input type="password" class="form-control" maxlength="6">
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-shield-alt me-2"></i>Update PIN
                    </button>
                </form>
            </div>
        </div>
    `;
}
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

// Enhanced showUserModule to handle dropdown states
function handleTabBarClick(moduleType, subModule) {
    // Update sidebar dropdown states
    updateSidebarActiveStates(moduleType, subModule);
    
    // Load the content
    showUserModule(subModule, moduleType);
}

// ===================================
// END OF UNIVERSAL DROPDOWN SYSTEM
// ===================================

// Position floating dropdowns in collapsed mode
function positionFloatingDropdown(dropdown, triggerElement) {
    if (!dropdown || !triggerElement) return;

    const triggerRect = triggerElement.getBoundingClientRect();
    const sidebarRect = document
        .getElementById("userSidebar")
        .getBoundingClientRect();

    // Position dropdown to the right of the sidebar
    dropdown.style.left = `${sidebarRect.right + 8}px`;
    dropdown.style.top = `${triggerRect.top}px`;

    // Ensure dropdown doesn't go off screen
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    if (dropdownRect.bottom > viewportHeight) {
        dropdown.style.top = `${viewportHeight - dropdownRect.height - 20}px`;
    }
}

// SIDEBAR INITIALIZATION REMOVED

// RESIZE HANDLING ENABLED - RESPONSIVE BEHAVIOR
window.addEventListener("resize", function () {
    console.log("Resize handling enabled - responsive active");
    if (typeof checkScreenSize === "function") {
        checkScreenSize();
    }
});

// REMOVED: loadSpecificModule - restored to original showUserModule behavior

// REMOVED: highlightSpecificTab - using original tab highlighting

// Initialize when page loads
document.addEventListener("DOMContentLoaded", function () {
    // SIDEBAR INITIALIZATION CALLS REMOVED

    // Initialize theme toggle
    // Theme toggle removed as per clean design requirements
});

// Close dropdowns when clicking outside
document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(
        ".dashboard-dropdown, .ewallet-dropdown, .organization-dropdown",
    );
    const toggles = document.querySelectorAll(
        ".dashboard-toggle, .ewallet-toggle, .organization-toggle",
    );

    let clickedInsideDropdown = false;

    // Check if click was inside any dropdown or toggle
    dropdowns.forEach((dropdown) => {
        if (dropdown.contains(event.target)) {
            clickedInsideDropdown = true;
        }
    });

    toggles.forEach((toggle) => {
        if (toggle.contains(event.target)) {
            clickedInsideDropdown = true;
        }
    });

    // If click was outside, close all dropdowns
    if (!clickedInsideDropdown) {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("show");
        });
        document.querySelectorAll(".dropdown-arrow").forEach((arrow) => {
            arrow.classList.remove("rotated");
        });
    }
});

// Function to update sidebar active states based on current page
function updateSidebarActiveStates() {
    if (!activePage) return;

    // Clear all active states first
    document
        .querySelectorAll(".nav-link")
        .forEach((link) => link.classList.remove("active"));
    document
        .querySelectorAll(".dropdown-item")
        .forEach((item) => item.classList.remove("active"));
    document
        .querySelectorAll(".dropdown-arrow")
        .forEach((arrow) => arrow.classList.remove("rotated"));

    // Close all main dropdowns first
    document
        .querySelectorAll(
            ".dashboard-dropdown, .ewallet-dropdown, .organization-dropdown",
        )
        .forEach((dropdown) => {
            dropdown.classList.remove("show");
        });

    const { module, subModule } = activePage;

    if (module && subModule) {
        // For main dropdown sections (dashboard, ewallet, organization)
        if (["dashboard", "ewallet", "organization"].includes(module)) {
            // Activate the main dropdown toggle
            const dropdownToggle = document.querySelector(`.${module}-toggle`);
            if (dropdownToggle) {
                dropdownToggle.classList.add("active");
                const arrow = dropdownToggle.querySelector(".dropdown-arrow");
                if (arrow) arrow.classList.add("rotated");
            }

            // Show the dropdown
            const dropdown = document.getElementById(module + "Dropdown");
            if (dropdown) {
                dropdown.classList.add("show");
            }

            // Activate the specific dropdown item
            const dropdownItem = document.querySelector(
                `#${module}Dropdown .dropdown-item[onclick*="${subModule}"]`,
            );
            if (dropdownItem) {
                dropdownItem.classList.add("active");
            }
        } else {
            // For other sections (epoints, reports, shop, accountsetting), just activate the main toggle
            const sectionToggle = document.querySelector(`.${module}-toggle`);
            if (sectionToggle) {
                sectionToggle.classList.add("active");
            }
        }

        // Activate corresponding tab bar item if it exists
        const tabItem = document.querySelector(`[data-module="${subModule}"]`);
        if (tabItem) {
            tabItem.classList.add("active");
        }
    }
}

// Organization sub-module functions
function showOrganizationSubModule(subModuleId) {
    console.log("showOrganizationSubModule called with:", subModuleId);

    // Use universal tab bar click handler
    handleTabBarClick("organization", subModuleId);
}

// ePoints sub-module functions
function showEpointsSubModule(subModuleId) {
    console.log("showEpointsSubModule called with:", subModuleId);

    // Use universal tab bar click handler
    handleTabBarClick("epoints", subModuleId);
}

// Reports sub-module functions
function showReportsSubModule(subModuleId) {
    console.log("showReportsSubModule called with:", subModuleId);

    // Use universal tab bar click handler
    handleTabBarClick("reports", subModuleId);
}

// Shop sub-module functions
function showShopSubModule(subModuleId) {
    console.log("showShopSubModule called with:", subModuleId);

    // Use universal tab bar click handler
    handleTabBarClick("shop", subModuleId);
}

// Account Setting sub-module functions
function showAccountsettingSubModule(subModuleId) {
    console.log("showAccountsettingSubModule called with:", subModuleId);

    // Use universal tab bar click handler
    handleTabBarClick("accountsetting", subModuleId);
}

// Organization sub-module content functions

function getSwitchAccountContent() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary">
          <i class="fas fa-exchange-alt me-2"></i>Switch Account
        </h2>
      </div>

      <!-- Table -->
      <div class="card border-0 shadow-sm" style="border-radius: 12px;">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>Date</th>
                  <th>Username</th>
                  <th>Type</th>
                  <th>PSR</th>
                  <th>DR</th>
                  <th>Matching</th>
                  <th>Leadership</th>
                  <th>Unilevel</th>
                  <th>ePoints</th>
                  <th class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>25-03-04 19:15:21</td>
                  <td>JMDLONSOD01</td>
                  <td>
                    <span class="badge bg-warning text-dark">PLATINUM</span><br>
                    <span class="badge bg-success">Active</span>
                  </td>
                  <td>₱700.00</td>
                  <td>₱1,000.00</td>
                  <td>₱400.00</td>
                  <td>₱0.00</td>
                  <td>₱0.00</td>
                  <td>₱36.00</td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-primary">
                      <i class="fas fa-sign-in-alt me-1"></i>Switch
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>25-07-11 18:50:37</td>
                  <td>ITadmin</td>
                  <td>
                    <span class="badge bg-secondary">SILVER</span><br>
                    <span class="badge bg-success">Active</span>
                  </td>
                  <td>₱0.00</td>
                  <td>₱0.00</td>
                  <td>₱0.00</td>
                  <td>₱0.00</td>
                  <td>₱0.00</td>
                  <td>₱0.00</td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-primary">
                      <i class="fas fa-sign-in-alt me-1"></i>Switch
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getGenealogyTreeContent() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary">
          <i class="fas fa-sitemap me-2"></i>Network Tree View
        </h2>
      </div>

      <!-- Tree Structure -->
      <div class="d-flex flex-column align-items-center gap-4">
        <!-- Top Node -->
        <div class="border rounded p-3 text-center shadow-sm bg-light" style="min-width: 280px;">
          <h5 class="mb-1">Admin, IT</h5>
          <small class="text-muted">[JMDLONSOD01]</small>
          <div class="mt-2">
            <span class="badge bg-warning text-dark">PS PLATINUM</span>
            <span class="badge bg-success">ACTIVE</span>
          </div>
          <div class="mt-2 small text-muted">
            L: LEFT -1 RIGHT -1<br>
            0.00: BL = BR 0.00
          </div>
        </div>

        <!-- Second Level -->
        <div class="d-flex flex-wrap justify-content-center gap-4">
          <div class="border rounded p-3 text-center shadow-sm bg-light" style="min-width: 240px;">
            <h6 class="mb-1">Dlonsod, Jesher Charles Capina</h6>
            <small class="text-muted">[jndlonsod]</small>
            <div class="mt-2">
              <span class="badge bg-secondary">PD SILVER</span>
              <span class="badge bg-success">ACTIVE</span>
            </div>
            <div class="mt-2 small text-muted">
              0: LEFT = RIGHT :0<br>
              0.00: BL = BR 0.00
            </div>
          </div>
          <div class="border rounded p-3 text-center shadow-sm bg-light" style="min-width: 240px;">
            <h6 class="mb-1">Admin, IT</h6>
            <small class="text-muted">[lradmin]</small>
            <div class="mt-2">
              <span class="badge bg-secondary">PD SILVER</span>
              <span class="badge bg-success">ACTIVE</span>
            </div>
            <div class="mt-2 small text-muted">
              0: LEFT = RIGHT :0<br>
              0.00: BL = BR 0.00
            </div>
          </div>
        </div>

        <!-- Third Level: Register Slots -->
        <div class="d-flex flex-wrap justify-content-center gap-4 mt-4">
          ${Array(4).fill('').map(() => `
            <div class="border rounded p-3 text-center shadow-sm bg-white" style="min-width: 180px;">
              <i class="fas fa-user-plus fa-2x text-primary mb-2"></i>
              <div class="fw-bold text-muted">REGISTER HERE</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function getDirectSponsorsContent() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary">
          <i class="fas fa-user-friends me-2"></i>Direct Sponsored
        </h2>
        <button class="btn btn-outline-primary btn-sm">
          #JNDLONSOD01 #2
        </button>
      </div>

      <!-- Table -->
      <div class="card border-0 shadow-sm" style="border-radius: 12px;">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>DATE</th>
                  <th>USERNAME</th>
                  <th>NAME</th>
                  <th>TYPE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2025-06-24 19:56:12</td>
                  <td>jndalonsod</td>
                  <td>Dlanosod, Jesher Charles <span class="text-muted">[jndalonsod]</span></td>
                  <td><span class="badge bg-secondary">SERVER</span></td>
                </tr>
                <tr>
                  <td>2025-07-11 18:50:37</td>
                  <td>ITadmin</td>
                  <td>Admin, IT <span class="text-muted">[ITadmin]</span></td>
                  <td><span class="badge bg-secondary">SERVER</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getBinaryListContent() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary">
          <i class="fas fa-list-ol me-2"></i>Binary List
        </h2>
        <button class="btn btn-outline-primary btn-sm">
          JMDLONSOD01
        </button>
      </div>

      <!-- Controls -->
      <div class="row align-items-center mb-3">

      <!-- Table -->
      <div class="card border-0 shadow-sm" style="border-radius: 12px;">
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-light">
                <tr>
                  <th>SQ#</th>
                  <th>DATE</th>
                  <th>USERNAME</th>
                  <th>NAME</th>
                  <th>TYPE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>2025-03-04 19:15:21</td>
                  <td>JMDLONSOD01</td>
                  <td>Admin, IT</td>
                  <td>
                    <span class="badge bg-success">PLATINUM</span>
                    <span class="badge bg-success">ACTIVE</span>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>2025-06-24 19:56:12</td>
                  <td>jmdionsod</td>
                  <td>
                    Dlonsod, Jesher Charles<br>
                    <span class="badge bg-info">PLACEMENT Admin, IT</span>
                    <span class="badge bg-info">BACKEND/DEPT LEFT</span>
                  </td>
                  <td>
                    <span class="badge bg-success">SILVER</span>
                    <span class="badge bg-success">ACTIVE</span>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>2025-07-11 18:50:37</td>
                  <td>ITAdmin</td>
                  <td>
                    Admin, IT<br>
                    <span class="badge bg-info">PLACEMENT Admin, IT</span>
                    <span class="badge bg-info">BACKEND/DEPT RIGHT</span>
                  </td>
                  <td>
                    <span class="badge bg-success">SILVER</span>
                    <span class="badge bg-success">ACTIVE</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="d-flex justify-content-between align-items-center px-4 py-3 border-top">
            <small class="text-muted">Showing 1 to 3 of 3 entries</small>
            <nav>
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item disabled">
                  #<i class="fas fa-chevron-left"></i></a>
                </li>
                <li class="page-item active">
                  #1</a>
                </li>
                <li class="page-item disabled">
                  #<i class="fas fa-chevron-right"></i></a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getEwalletSummaryContent() {
  return `
    <!-- 💰 eWallet Summary Boxes -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-white" style="background-color: #6f42c1;">
            <h6 class="card-title mb-1">Available Wallet</h6>
            <p class="card-text fs-5 fw-bold">PHP 1,630,726.98</p>
            <small class="text-white-50">Last updated: Sep 4, 2025</small>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-white" style="background-color: #dc3545;">
            <h6 class="card-title mb-1">Debt</h6>
            <p class="card-text fs-5 fw-bold">PHP 0.00</p>
            <small class="text-white-50">No outstanding balance</small>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body bg-warning text-dark">
            <h6 class="card-title mb-1">Total Wallet</h6>
            <p class="card-text fs-5 fw-bold">PHP 1,630,726.98</p>
            <small class="text-dark-50">Includes all rebates and credits</small>
          </div>
        </div>
      </div>
    </div>


    <!-- 📄 Transaction History Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>TRANSFER #</th>
            <th>DATE</th>
            <th>ACCOUNT_CODE</th>
            <th>DESCRIPTION</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>53221</td>
            <td>2023-04-17</td>
            <td>leadership</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53222</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53223</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53224</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53225</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53226</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53227</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53228</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53229</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
          <tr>
            <td>53230</td>
            <td>2023-04-17</td>
            <td>JP-IN</td>
            <td>AUTO-TRANSFER FROM GOOLSBYSALES MKT2 from x-Interal</td>
            <td class="text-danger">-42.00</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📌 Pagination Controls -->
    <nav aria-label="Transaction pagination">
      <ul class="pagination justify-content-end">
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item active"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item"><a class="page-link" href="#">Next</a></li>
      </ul>
    </nav>
  `;
}


function getUnilevelListContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
                <h4 class="mb-0 me-3">Unilevel List</h4>
                <span class="badge bg-info text-white">JMDLONSO001</span>
            </div>
        </div>
        
        <!-- Unilevel List Table -->
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>SQ# <i class="fas fa-sort"></i></th>
                                <th>DATE <i class="fas fa-sort"></i></th>
                                <th>USERNAME <i class="fas fa-sort"></i></th>
                                <th>NAME <i class="fas fa-sort"></i></th>
                                <th class="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2025-06-24 19:56:12</td>
                                <td>jmdlonsod</td>
                                <td>
                                    Dlonsod, Jesher Charles<br>
                                    <small class="badge bg-info text-white">ACCOUNT Admin [JMDLONSO001]</small>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-info">
                                        <i class="fas fa-arrow-up"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 1 to 1 of 1 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}


// REMOVED: getUserMainDashboardContent() - legacy function completely removed

function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
            showAlert("Copied to clipboard!", "success");
        })
        .catch(function () {
            showAlert("Failed to copy to clipboard", "error");
        });
}

// Missing content functions for all sidebar items

function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(function () {
            showAlert("Copied to clipboard!", "success");
        })
        .catch(function () {
            showAlert("Failed to copy to clipboard", "error");
        });
}

function getEpointsSummaryContent() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <style>
        /* Strong inline styles to avoid project CSS overrides */
        .epoints-card { border-radius:12px; border:0; box-shadow:0 6px 18px rgba(0,0,0,0.04); }
        .epoints-card-body {
          padding: 1.25rem;
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.5rem;
        }
        .epoints-small { font-size:0.85rem; opacity:0.85; }
        @media (max-width:576px){ .epoints-card-body{min-height:90px} }
      </style>

      <!-- Top summary cards -->
      <div class="row g-3 mb-4">
        <div class="col-md-3 col-6">
          <div class="card epoints-card" role="presentation">
            <div class="card-body epoints-card-body" style="background:#5b2ea6; color:#fff;">
              <small class="epoints-small text-white-50">Account</small>
              <div class="d-flex align-items-center justify-content-between w-100">
                <h4 class="mb-0 fw-bold">JMDLONSOD01</h4>
                <i class="fas fa-exchange-alt fa-lg text-white" aria-hidden="true"></i>
              </div>
              <div class="mt-2">
                <button class="btn btn-sm btn-light">Claim Products</button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-6">
          <div class="card epoints-card" role="presentation">
            <div class="card-body epoints-card-body" style="background:#2ca79a; color:#fff;">
              <small class="epoints-small text-white-50">Available ePoints</small>
              <h3 class="mb-0 fw-bold">PHP36.00</h3>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-6">
          <div class="card epoints-card" role="presentation">
            <div class="card-body epoints-card-body" style="background:#f56b6b; color:#fff;">
              <small class="epoints-small text-white-50">Claimed</small>
              <h3 class="mb-0 fw-bold">PHP0.00</h3>
            </div>
          </div>
        </div>

        <div class="col-md-3 col-6">
          <div class="card epoints-card" role="presentation">
            <div class="card-body epoints-card-body" style="background:#f6b84b; color:#111;">
              <small class="epoints-small text-dark-50">Total ePoints</small>
              <h3 class="mb-0 fw-bold">PHP36.00</h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Table card -->
      <div class="card shadow-sm rounded-3">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h5 class="mb-0">ePoints</h5>
            <small class="text-muted">${formatDateTime(new Date())}</small>
          </div>

          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex align-items-center">
              <span class="me-2 text-muted">Show</span>
              <select class="form-select form-select-sm me-2" style="width:80px;">
                <option selected>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              <span class="text-muted">entries</span>
            </div>

            <div>
              <label class="me-2 text-muted">Search:</label>
              <input type="text" class="form-control form-control-sm" style="width:220px;" placeholder="">
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr style="background:#f3eefd;">
                  <th class="text-muted">TRANS#</th>
                  <th class="text-muted">DATE</th>
                  <th class="text-muted">DESCRIPTION</th>
                  <th class="text-muted text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="vertical-align: middle;">30860</td>
                  <td style="vertical-align: middle;">2025-07-11 18:52:06</td>
                  <td style="white-space: pre-line; color:#6c6c6c;">
NAME:JMDLONSOD01
ACCOUNT_NO:SALES MATCH
TYPE:PAIRING
CONTACT_NO:639306670965
SALES MATCH from ITadmin
                  </td>
                  <td class="text-end text-success fw-bold" style="vertical-align: middle;">+36.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="text-muted">Showing 1 to 1 of 1 entries</div>
            <nav>
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item disabled"><a class="page-link" href="#">&lt;</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">&gt;</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `;
}

function getClaimProductsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-gift me-2"></i>Claim Products</h2>
        </div>
        
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Wellness Supplement Pack</h5>
                        <p class="text-muted">Premium health supplements bundle</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-primary">2,000 Points</span>
                            <button class="btn btn-success">Claim Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Nutrition Starter Kit</h5>
                        <p class="text-muted">Essential nutrition products for beginners</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="badge bg-primary">1,500 Points</span>
                            <button class="btn btn-success">Claim Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}



function getDirectSponsorsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-user-friends me-2"></i>Direct Sponsors</h2>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>Your Direct Sponsors</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Sponsor ID</th>
                                <th>Name</th>
                                <th>Join Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SPONSOR001</td>
                                <td>John Martinez</td>
                                <td>2024-01-15</td>
                                <td><span class="badge bg-success">Active</span></td>
                            </tr>
                            <tr>
                                <td>SPONSOR002</td>
                                <td>Maria Santos</td>
                                <td>2024-02-20</td>
                                <td><span class="badge bg-success">Active</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getBinaryListContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-list-ol me-2"></i>Binary List</h2>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>Binary Network Details</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Member ID</th>
                                <th>Position</th>
                                <th>Volume</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>BIN001</td>
                                <td>Left-1</td>
                                <td>₱2,500</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>BIN002</td>
                                <td>Right-1</td>
                                <td>₱3,200</td>
                                <td>1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getUnilevelListContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-layer-group me-2"></i>Unilevel List</h2>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>Unilevel Network Structure</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Members</th>
                                <th>Total Volume</th>
                                <th>Commission</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Level 1</td>
                                <td>12</td>
                                <td>₱25,400</td>
                                <td>₱2,540</td>
                            </tr>
                            <tr>
                                <td>Level 2</td>
                                <td>48</td>
                                <td>₱86,200</td>
                                <td>₱4,310</td>
                            </tr>
                            <tr>
                                <td>Level 3</td>
                                <td>124</td>
                                <td>₱195,600</td>
                                <td>₱5,868</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getEncashWalletContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-3">
            <!-- Page Header -->
            <div class="row mb-4">
                <div class="col-12">
                    <h2 class="fw-bold mb-0">Encash eWallet</h2>
                </div>
            </div>
            
            <!-- Main Form Card -->
            <div class="row justify-content-center">
                <div class="col-12 col-xl-8">
                    <div class="card border-0 shadow-sm" style="border-radius: 12px;">
                        <div class="card-body p-3 p-md-5">
                            <h5 class="mb-4 fw-normal">eWallet Encashment Form</h5>
                            
                            <!-- Form Content -->
                            <form id="encashmentForm">
                                <!-- Payout Option Section -->
                                <div class="mb-4">
                                    <label class="form-label text-muted mb-2">Payout Option:</label>
                                    <button type="button" class="btn btn-primary w-100 py-3" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); border: none; border-radius: 8px;">
                                        <i class="fas fa-plus-circle me-2"></i>
                                        Add Payout Option
                                    </button>
                                </div>
                                
                                <!-- Account Field -->
                                <div class="mb-4">
                                    <label for="accountName" class="form-label text-muted mb-2">Account:</label>
                                    <input type="text" class="form-control form-control-lg" id="accountName" value="JMDLONSO001" 
                                           style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 12px 16px;">
                                </div>
                                
                                <!-- Available and Amount Row -->
                                <div class="row g-3 mb-4">
                                    <div class="col-12 col-md-6">
                                        <label for="availableBalance" class="form-label text-muted mb-2">Available:</label>
                                        <input type="text" class="form-control form-control-lg" id="availableBalance" value="PHP1,854.00" readonly
                                               style="background-color: #f8f9fa; border: 1px solid #e9ecef; border-radius: 8px; padding: 12px 16px;">
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label for="withdrawAmount" class="form-label text-muted mb-2">Amount to Withdraw:</label>
                                        <input type="number" class="form-control form-control-lg" id="withdrawAmount" placeholder="500" 
                                               style="border: 1px solid #e9ecef; border-radius: 8px; padding: 12px 16px;" min="100" step="0.01">
                                    </div>
                                </div>
                                
                                <!-- Pickup Branch and PIN Row -->
                                <div class="row g-3 mb-4">
                                    <div class="col-12 col-md-6">
                                        <label for="pickupBranch" class="form-label text-muted mb-2">Pickup Branch:</label>
                                        <select class="form-select form-select-lg" id="pickupBranch" 
                                                style="border: 1px solid #e9ecef; border-radius: 8px; padding: 12px 16px;">
                                            <option value="">Select Pickup Branch</option>
                                            <option value="manila">Manila Branch</option>
                                            <option value="quezon">Quezon City Branch</option>
                                            <option value="makati">Makati Branch</option>
                                            <option value="cebu">Cebu Branch</option>
                                            <option value="davao">Davao Branch</option>
                                        </select>
                                    </div>
                                    <div class="col-12 col-md-6">
                                        <label for="withdrawalPin" class="form-label text-muted mb-2">Withdrawal PIN:</label>
                                        <div class="d-flex gap-2">
                                            <input type="password" class="form-control form-control-lg flex-grow-1" id="withdrawalPin" placeholder="Enter PIN" 
                                                   style="border: 1px solid #e9ecef; border-radius: 8px; padding: 12px 16px;">
                                            <button type="button" class="btn btn-info px-3 py-2" style="border-radius: 8px; white-space: nowrap;">
                                                <i class="fas fa-shield-alt me-2"></i>
                                                Set withdrawal PIN
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Warning Alert -->
                                <div class="alert alert-warning d-flex align-items-center mb-4" style="background-color: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
                                    <div class="d-flex align-items-center flex-grow-1">
                                        <i class="fas fa-exclamation-triangle me-3" style="color: #856404;"></i>
                                        <span class="flex-grow-1" style="color: #856404;">
                                            <strong>Warning!</strong> Mobile number not verified! Please verify to proceed.
                                        </span>
                                        <button type="button" class="btn-close ms-2" aria-label="Close" style="font-size: 0.8rem;"></button>
                                    </div>
                                </div>
                                
                                <!-- Action Buttons -->
                                <div class="d-flex flex-column flex-md-row gap-3 justify-content-md-end mt-5">
                                    <button type="button" class="btn btn-info px-4 py-2 order-2 order-md-1" style="border-radius: 8px;">
                                        <i class="fas fa-sync-alt me-2"></i>
                                        Reload page
                                    </button>
                                    <button type="submit" class="btn btn-success px-4 py-2 order-1 order-md-2" style="border-radius: 8px;" disabled>
                                        Submit Request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            /* Additional responsive styles for Encash eWallet form */
            @media (max-width: 576px) {
                .container-fluid {
                    padding-left: 1rem !important;
                    padding-right: 1rem !important;
                }
                
                .card-body {
                    padding: 1.5rem !important;
                }
                
                .form-control-lg,
                .form-select-lg {
                    padding: 10px 14px !important;
                    font-size: 0.95rem !important;
                }
                
                .btn {
                    padding: 10px 16px !important;
                }
                
                .alert {
                    padding: 12px !important;
                }
                
                .alert .fas {
                    margin-right: 8px !important;
                }
                
                h2 {
                    font-size: 1.5rem !important;
                }
                
                h5 {
                    font-size: 1.1rem !important;
                }
                
                .d-flex.gap-2 {
                    flex-direction: column !important;
                    gap: 0.5rem !important;
                }
                
                .d-flex.gap-2 .btn {
                    margin-top: 0 !important;
                }
            }
            
            @media (max-width: 768px) {
                .d-flex.gap-2 {
                    flex-direction: column !important;
                    gap: 0.5rem !important;
                }
                
                .d-flex.gap-2 .btn {
                    margin-top: 0;
                    width: 100%;
                }
            }
            
            /* Focus states for better accessibility */
            .form-control:focus,
            .form-select:focus {
                border-color: #8B5CF6 !important;
                box-shadow: 0 0 0 0.2rem rgba(139, 92, 246, 0.25) !important;
            }
            
            /* Button hover effects */
            .btn:hover {
                transform: translateY(-1px);
                transition: all 0.2s ease;
            }
            
            /* Ensure proper spacing on mobile */
            @media (max-width: 767px) {
                .row.g-3 > * {
                    margin-bottom: 1rem;
                }
            }
        </style>
    `;
}

function getSalesMatchBonusContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-handshake me-2"></i>Sales Match Bonus</h2>
        </div>
        
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h5>This Month</h5>
                        <h3>₱8,450</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-success">
                    <div class="card-body">
                        <h5>Total Earned</h5>
                        <h3>₱54,200</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-info">
                    <div class="card-body">
                        <h5>Match Rate</h5>
                        <h3>15%</h3>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Member</th>
                                <th>Sales Volume</th>
                                <th>Match Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-01-22</td>
                                <td>MEMBER001</td>
                                <td>₱5,600</td>
                                <td>₱840</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getLeadershipBonusContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-crown me-2"></i>Leadership Bonus</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <h5>Leadership Qualification Status</h5>
                <div class="progress mb-3">
                    <div class="progress-bar bg-success" role="progressbar" style="width: 75%"></div>
                </div>
                <p>You are 75% qualified for next leadership level</p>
                
                <div class="table-responsive mt-4">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Level</th>
                                <th>Bonus Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>January 2025</td>
                                <td>Silver Leader</td>
                                <td>₱2,500</td>
                                <td><span class="badge bg-success">Paid</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getPersonalRebatesContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-gift me-2"></i>Personal Rebates</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Purchase Amount</th>
                                <th>Rebate %</th>
                                <th>Rebate Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-01-20</td>
                                <td>Wellness Pack</td>
                                <td>₱3,500</td>
                                <td>10%</td>
                                <td>₱350</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getUnilevelBonusContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-layer-group me-2"></i>Unilevel Bonus</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Members</th>
                                <th>Volume</th>
                                <th>Rate</th>
                                <th>Bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>12</td>
                                <td>₱25,400</td>
                                <td>10%</td>
                                <td>₱2,540</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>48</td>
                                <td>₱86,200</td>
                                <td>5%</td>
                                <td>₱4,310</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getShopNowContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-store me-2"></i>Shop Now</h2>
        </div>
        
        <div class="row">
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Wellness Supplement</h5>
                        <p class="text-muted">Premium health supplement</p>
                        <h4 class="text-primary">₱2,500</h4>
                        <button class="btn btn-success w-100">Add to Cart</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Nutrition Pack</h5>
                        <p class="text-muted">Complete nutrition bundle</p>
                        <h4 class="text-primary">₱3,200</h4>
                        <button class="btn btn-success w-100">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getTransactionsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-receipt me-2"></i>Transactions</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>TXN001</td>
                                <td>2025-01-22</td>
                                <td>Wellness Pack</td>
                                <td>₱2,500</td>
                                <td><span class="badge bg-success">Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getUserProfileContent() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary">
          <i class="fas fa-user-circle me-2"></i>User Profile
        </h2>
      </div>

      <div class="row g-4">
        <!-- Profile Info -->
        <div class="col-md-4">
          <div class="card text-center shadow-sm">
            <div class="card-body">
              https://via.placeholder.com/100
              <h5 class="fw-bold mb-1">IT Admin</h5>
              <small class="text-muted d-block mb-2">ID: JMC0000001</small>
              <small class="text-muted d-block mb-3">Joined: March 04, 2020</small>

              <div class="d-grid gap-2 mb-3">
                <button class="btn btn-outline-primary btn-sm"><i class="fab fa-facebook me-2"></i>Connect Facebook</button>
                <button class="btn btn-outline-success btn-sm"><i class="fab fa-whatsapp me-2"></i>Connect WhatsApp</button>
                <button class="btn btn-outline-info btn-sm"><i class="fab fa-telegram me-2"></i>Connect Telegram</button>
              </div>

              <button class="btn btn-warning w-100"><i class="fas fa-key me-2"></i>Change Password</button>
            </div>
          </div>
        </div>

        <!-- Form Info -->
        <div class="col-md-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <form>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" value="IT Admin">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Surname</label>
                    <input type="text" class="form-control" value="Admin">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Gender</label>
                    <select class="form-select">
                      <option selected>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Birth Date</label>
                    <input type="date" class="form-control" placeholder="mm/dd/yyyy">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Mobile Number</label>
                    <input type="text" class="form-control" value="09123456789">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email Address</label>
                    <input type="email" class="form-control" placeholder="you@example.com">
                  </div>
                  <div class="col-md-12">
                    <label class="form-label">Address</label>
                    <input type="text" class="form-control" placeholder="Street, Building, etc.">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Country</label>
                    <input type="text" class="form-control" value="Philippines">
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Barangay</label>
                    <input type="text" class="form-control" placeholder="Barangay">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Region</label>
                    <input type="text" class="form-control" placeholder="Region">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">Province</label>
                    <input type="text" class="form-control" placeholder="Province">
                  </div>
                  <div class="col-md-4">
                    <label class="form-label">City</label>
                    <input type="text" class="form-control" placeholder="City">
                  </div>
                </div>

                <!-- Verification Buttons -->
                <div class="d-flex justify-content-end gap-3 mt-4">
                  <button type="button" class="btn btn-outline-info">
                    <i class="fas fa-check-circle me-2"></i>Verify Account Details
                  </button>
                  <button type="button" class="btn btn-outline-success">
                    <i class="fas fa-mobile-alt me-2"></i>Verify Mobile Number
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}


function getWithdrawalSettingsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-cogs me-2"></i>Withdrawal Settings</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <h5>Bank Account Settings</h5>
                <form>
                    <div class="mb-3">
                        <label class="form-label">Bank Name</label>
                        <select class="form-select">
                            <option>BDO</option>
                            <option>BPI</option>
                            <option>Metrobank</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Account Number</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Account Name</label>
                        <input type="text" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Save Settings</button>
                </form>
            </div>
        </div>
    `;
}

function getChangePasswordContent() {
  return `
    <div class="card mx-auto" style="max-width: 500px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="fas fa-lock me-2"></i>Update Password</h5>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="card-body">
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" class="form-control" id="username" value="JMDLONSOD01" readonly>
          </div>
          <div class="mb-3">
            <label for="currentPassword" class="form-label">Current Password:</label>
            <input type="password" class="form-control" id="currentPassword" placeholder="Current Password">
          </div>
          <div class="mb-3">
            <label for="newPassword" class="form-label">New Password:</label>
            <input type="password" class="form-control" id="newPassword" placeholder="New Password">
          </div>
          <div class="mb-4">
            <label for="retypePassword" class="form-label">Retype Password:</label>
            <input type="password" class="form-control" id="retypePassword" placeholder="Retype Password">
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-info">
              <i class="fas fa-key me-2"></i>Update Password
            </button>
            <button type="button" class="btn btn-warning">
              <i class="fas fa-times me-2"></i>Close
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}


// Helper function for standalone dropdown content
function getStandaloneContent(moduleId) {
    const standaloneContents = {
        "epoints-summary": getEPointsSummaryContent(),
        "encash-wallet": getEncashWalletContent(),
        "ewallet-summary": getEwalletSummaryContent(),
        "withdrawal-pin": getWithdrawalPinContent(),
        "claim-products": getClaimProductsContent(),
        "direct-referral": getDirectReferralContent(),
        "sales-match-bonus": getSalesMatchBonusContent(),
        "leadership-bonus": getLeadershipBonusContent(),
        "personal-rebates": getPersonalRebatesContent(),
        "unilevel-bonus": getUnilevelBonusContent(),
        "shop-now": getShopNowContent(),
        "checkout": getCheckoutContent(),
        "transactions": getTransactionsContent(),
        "user-profile": getUserProfileContent(),
        "withdrawal-settings": getWithdrawalSettingsContent(),
        "change-password": getChangePasswordContent(),
    };

    return standaloneContents[moduleId] || null;
}

// Reports Section Content Functions
function getDirectReferralContent() {
    return `
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">DIRECT REFERRAL</h6>
                            <h4 class="mb-0">PHP900.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Direct Referral Details -->
        <div class="card">
            <div class="card-header">
                <h6 class="mb-0">Direct Referral Details</h6>
            </div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>DATE <i class="fas fa-sort"></i></th>
                                <th>TYPE <i class="fas fa-sort"></i></th>
                                <th>SOURCE <i class="fas fa-sort"></i></th>
                                <th>AMOUNT <i class="fas fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-06-24 19:56:12</td>
                                <td>
                                    <span class="badge bg-success">SILVER</span>
                                </td>
                                <td>jmdlonsod</td>
                                <td>450.00</td>
                            </tr>
                            <tr>
                                <td>2025-07-11 18:50:37</td>
                                <td>
                                    <span class="badge bg-success">SILVER</span>
                                </td>
                                <td>ITadmin</td>
                                <td>450.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 1 to 2 of 2 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

function getSalesMatchBonusContent() {
    return `
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-users text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL MATCHING BONUS</h6>
                            <h4 class="mb-0">PHP324.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Sales Match Details -->
        <div class="card">
            <div class="card-header">
                <h6 class="mb-0">Sales Match Details</h6>
            </div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0 table-sm">
                        <thead class="table-light">
                            <tr>
                                <th>DATETIME <i class="fas fa-sort"></i></th>
                                <th>SOURCE <i class="fas fa-sort"></i></th>
                                <th>DBL <i class="fas fa-sort"></i></th>
                                <th>DBR <i class="fas fa-sort"></i></th>
                                <th>PAIRS <i class="fas fa-sort"></i></th>
                                <th>EBL <i class="fas fa-sort"></i></th>
                                <th>EBR <i class="fas fa-sort"></i></th>
                                <th>PAID <i class="fas fa-sort"></i></th>
                                <th>AMOUNT <i class="fas fa-sort"></i></th>
                                <th>STATUS <i class="fas fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>25-06-24 19:56:12</td>
                                <td>jmdlonsod</td>
                                <td>10.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>10.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>
                                    <span class="badge bg-warning text-dark">NO COMMISSION</span>
                                </td>
                            </tr>
                            <tr>
                                <td>25-07-11 18:50:37</td>
                                <td>ITadmin</td>
                                <td>0.00</td>
                                <td>10.00</td>
                                <td>1.00</td>
                                <td>0.00</td>
                                <td>0.00</td>
                                <td>1.00</td>
                                <td>360.00</td>
                                <td>
                                    <span class="badge bg-success">CREDITED</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 1 to 2 of 2 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

function getLeadershipBonusContent() {
    return `
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-trophy text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL LEADERSHIP BONUS</h6>
                            <h4 class="mb-0">PHP0.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Leadership Bonus Details -->
        <div class="card">
            <div class="card-header">
                <h6 class="mb-0">Leadership Bonus Details</h6>
            </div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>DATETIME <i class="fas fa-sort"></i></th>
                                <th>SOURCE <i class="fas fa-sort"></i></th>
                                <th>AMOUNT <i class="fas fa-sort"></i></th>
                                <th>STATUS <i class="fas fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="4" class="text-center text-muted py-4">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 0 to 0 of 0 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

function getPersonalRebatesContent() {
    return `
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL PERSONAL REBATES</h6>
                            <h4 class="mb-0">PHP630.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Personal Rebates Details -->
        <div class="card">
            <div class="card-header">
                <h6 class="mb-0">Personal Rebates Details</h6>
            </div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>CTRL# <i class="fas fa-sort"></i></th>
                                <th>TRANS# <i class="fas fa-sort"></i></th>
                                <th>DATE <i class="fas fa-sort"></i></th>
                                <th>DETAILS <i class="fas fa-sort"></i></th>
                                <th>CASHBACK <i class="fas fa-sort"></i></th>
                                <th>STATUS <i class="fas fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>105</td>
                                <td>646</td>
                                <td>2025-06-06 13:09:09</td>
                                <td>SOGUARD*2</td>
                                <td>90.00</td>
                                <td>
                                    <span class="badge bg-primary">credited</span>
                                </td>
                            </tr>
                            <tr>
                                <td>423</td>
                                <td>2112</td>
                                <td>2025-07-31 20:36:08</td>
                                <td>SOGUARD*1</td>
                                <td>45.00</td>
                                <td>
                                    <span class="badge bg-primary">credited</span>
                                </td>
                            </tr>
                            <tr>
                                <td>424</td>
                                <td>2113</td>
                                <td>2025-07-31 20:45:23</td>
                                <td>SOGUARD*5</td>
                                <td>225.00</td>
                                <td>
                                    <span class="badge bg-primary">credited</span>
                                </td>
                            </tr>
                            <tr>
                                <td>427</td>
                                <td>2116</td>
                                <td>2025-07-31 21:00:13</td>
                                <td>Synbiotic+ MM*6</td>
                                <td>270.00</td>
                                <td>
                                    <span class="badge bg-primary">credited</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 1 to 4 of 4 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item active">
                            <a class="page-link" href="#">1</a>
                        </li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

function getUnilevelBonusContent() {
    return `
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
            <div class="col-md-4">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-chart-line text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL POINTS</h6>
                            <h4 class="mb-0">0.00</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-shopping-cart text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL SALES</h6>
                            <h4 class="mb-0">0.000</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white" style="background: linear-gradient(135deg, #28a745, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-chart-bar text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL UNILEVEL BONUS</h6>
                            <h4 class="mb-0">PHP630.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Monthly Unilevel Bonus -->
        <div class="card">
            <div class="card-header">
                <h6 class="mb-0">Monthly Unilevel Bonus</h6>
            </div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>CTRL# <i class="fas fa-sort"></i></th>
                                <th>DATE <i class="fas fa-sort"></i></th>
                                <th>SALES <i class="fas fa-sort"></i></th>
                                <th>GROUP POINTS <i class="fas fa-sort"></i></th>
                                <th>REBATES <i class="fas fa-sort"></i></th>
                                <th>STATUS <i class="fas fa-sort"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="6" class="text-center text-muted py-4">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 0 to 0 of 0 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

// Shop Section Content Functions
function getShopNowContent() {
    return `
        <!-- Product Grid -->
        <div class="row g-4">
            <!-- PAID SILVER Package -->
            <div class="col-md-4 col-lg-2">
                <div class="card h-100">
                    <div class="card-body text-center p-3">
                        <div class="mb-3" style="height: 120px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='14'%3EPAID SILVER%3C/text%3E%3C/svg%3E" alt="PAID SILVER" class="img-fluid">
                        </div>
                        <h6 class="card-title">PAID SILVER</h6>
                        <p class="text-primary mb-2">₱500.00</p>
                        <small class="text-muted d-block mb-3">10,000PV/SALES MATCH</small>
                        <button class="btn btn-primary btn-sm w-100">Add to cart</button>
                    </div>
                </div>
            </div>
            
            <!-- PAID GOLD Package -->
            <div class="col-md-4 col-lg-2">
                <div class="card h-100">
                    <div class="card-body text-center p-3">
                        <div class="mb-3" style="height: 120px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='14'%3EPAID GOLD%3C/text%3E%3C/svg%3E" alt="PAID GOLD" class="img-fluid">
                        </div>
                        <h6 class="card-title">PAID GOLD</h6>
                        <p class="text-primary mb-2">10,500.00</p>
                        <small class="text-muted d-block mb-3">30,000PV/SALES MATCH</small>
                        <button class="btn btn-primary btn-sm w-100">Add to cart</button>
                    </div>
                </div>
            </div>
            
            <!-- PAID PLATINUM Package -->
            <div class="col-md-4 col-lg-2">
                <div class="card h-100">
                    <div class="card-body text-center p-3">
                        <div class="mb-3" style="height: 120px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='14'%3EPAID PLATINUM%3C/text%3E%3C/svg%3E" alt="PAID PLATINUM" class="img-fluid">
                        </div>
                        <h6 class="card-title">PAID PLATINUM</h6>
                        <p class="text-primary mb-2">35,000.00</p>
                        <small class="text-muted d-block mb-3">100,000PV/SALES MATCH</small>
                        <button class="btn btn-primary btn-sm w-100">Add to cart</button>
                    </div>
                </div>
            </div>
            
            <!-- Synbiotic+Gutguard -->
            <div class="col-md-4 col-lg-2">
                <div class="card h-100">
                    <div class="card-body text-center p-3">
                        <div class="mb-3" style="height: 120px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='12'%3ESynbiotic+%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='12'%3EGutguard%3C/text%3E%3C/svg%3E" alt="Synbiotic+Gutguard" class="img-fluid">
                        </div>
                        <h6 class="card-title">Synbiotic+Gutguard</h6>
                        <p class="text-primary mb-2">2,280.00</p>
                        <small class="text-muted d-block mb-3">250.00 BV</small>
                        <button class="btn btn-primary btn-sm w-100">Add to cart</button>
                    </div>
                </div>
            </div>
            
            <!-- Monthly Maintenance -->
            <div class="col-md-4 col-lg-2">
                <div class="card h-100">
                    <div class="card-body text-center p-3">
                        <div class="mb-3" style="height: 120px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='45%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='12'%3EMonthly%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='12'%3EMaintenance%3C/text%3E%3C/svg%3E" alt="Monthly Maintenance" class="img-fluid">
                        </div>
                        <h6 class="card-title">Monthly Maintenance</h6>
                        <p class="text-primary mb-2">2,280.00</p>
                        <small class="text-muted d-block mb-3">250.00 BV</small>
                        <button class="btn btn-primary btn-sm w-100">Add to cart</button>
                    </div>
                </div>
            </div>
            
            <!-- Synbiotic+Gutguard BPGUARD*1.00 -->
            <div class="col-md-4 col-lg-2">
                <div class="card h-100">
                    <div class="card-body text-center p-3">
                        <div class="mb-3" style="height: 120px; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='35%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='10'%3ESynbiotic+Gutguard%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='central' text-anchor='middle' fill='%236c757d' font-size='10'%3EBPGUARD*1.00%3C/text%3E%3C/svg%3E" alt="Synbiotic+Gutguard BPGUARD*1.00" class="img-fluid">
                        </div>
                        <h6 class="card-title">Synbiotic+Gutguard BPGUARD*1.00</h6>
                        <p class="text-primary mb-2">520.00</p>
                        <small class="text-muted d-block mb-3">50.00 BV</small>
                        <button class="btn btn-primary btn-sm w-100">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCheckoutContent() {
    return `
        <div class="row g-4">
            <!-- Shipping Address Form -->
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0">Shipping Address</h6>
                    </div>
                    <div class="card-body">
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label for="firstName" class="form-label">First name</label>
                                <input type="text" class="form-control" id="firstName" value="IT" placeholder="IT">
                            </div>
                            <div class="col-md-6">
                                <label for="lastName" class="form-label">Last name</label>
                                <input type="text" class="form-control" id="lastName" value="Admin" placeholder="Admin">
                            </div>
                            <div class="col-md-6">
                                <label for="contactNumber" class="form-label">Contact Number</label>
                                <div class="input-group">
                                    <span class="input-group-text">📞</span>
                                    <input type="text" class="form-control" id="contactNumber" value="639308670485" placeholder="639308670485">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Email (Optional)</label>
                                <div class="input-group">
                                    <span class="input-group-text">@</span>
                                    <input type="email" class="form-control" id="email" value="you@example.com" placeholder="you@example.com">
                                </div>
                            </div>
                            <div class="col-12">
                                <label for="address" class="form-label">Address</label>
                                <input type="text" class="form-control" id="address" value="1234 Main St" placeholder="1234 Main St">
                            </div>
                            <div class="col-md-6">
                                <label for="country" class="form-label">Country</label>
                                <input type="text" class="form-control" id="country" value="Philippines" placeholder="Philippines">
                            </div>
                            <div class="col-md-6">
                                <label for="region" class="form-label">Region</label>
                                <input type="text" class="form-control" id="region" value="Region" placeholder="Region">
                            </div>
                            <div class="col-md-4">
                                <label for="province" class="form-label">Province</label>
                                <input type="text" class="form-control" id="province" value="Province" placeholder="Province">
                            </div>
                            <div class="col-md-4">
                                <label for="city" class="form-label">City</label>
                                <input type="text" class="form-control" id="city" value="City" placeholder="City">
                            </div>
                            <div class="col-md-4">
                                <label for="barangay" class="form-label">Barangay</label>
                                <input type="text" class="form-control" id="barangay" value="Click to set barangay" placeholder="Click to set barangay">
                            </div>
                            <div class="col-12">
                                <small class="text-muted">Need to update your details? Edit profile here</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Cart Summary -->
            <div class="col-lg-4">
                <div class="card mb-4">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">Your cart 🛒</h6>
                        <span class="badge bg-primary">0</span>
                    </div>
                    <div class="card-body text-center py-5">
                        <p class="text-muted mb-2">Cart is empty</p>
                        <a href="#" class="text-decoration-none" onclick="showUserModule('shop', 'user')">shop now</a>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <span>Total</span>
                        <strong>0.00</strong>
                    </div>
                </div>
                
                <!-- Payment Section -->
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0">Payment</h6>
                    </div>
                    <div class="card-body">
                        <select class="form-select mb-3">
                            <option selected>Select Payment</option>
                            <option value="cash">Cash on Delivery</option>
                            <option value="gcash">GCash</option>
                            <option value="bank">Bank Transfer</option>
                        </select>
                        
                        <div class="d-grid gap-2">
                            <button class="btn btn-warning">
                                <i class="fas fa-shopping-cart me-2"></i>Continue Shopping
                            </button>
                            <button class="btn btn-primary">
                                <i class="fas fa-credit-card me-2"></i>Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getTransactionsContent() {
    return `
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-credit-card text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL</h6>
                            <h3 class="mb-1">0</h3>
                            <small>0 transactions</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white" style="background: linear-gradient(135deg, #28a745, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-check text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">COMPLETED</h6>
                            <h3 class="mb-1">0</h3>
                            <small>0</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white" style="background: linear-gradient(135deg, #fd7e14, #f39c12);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-hand-holding-usd text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">FOR CLAIM</h6>
                            <h3 class="mb-1">0</h3>
                            <small>0</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" 
                                 style="width: 50px; height: 50px;">
                                <i class="fas fa-hourglass-half text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">PENDING</h6>
                            <h3 class="mb-1">0</h3>
                            <small>0</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Transaction History -->
        <div class="card">
            <div class="card-header">
                <h6 class="mb-0">Transaction History</h6>
            </div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                </div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>TRANS# <i class="fas fa-sort"></i></th>
                                <th>DATE <i class="fas fa-sort"></i></th>
                                <th>NAME <i class="fas fa-sort"></i></th>
                                <th>STATUS <i class="fas fa-sort"></i></th>
                                <th>QTY <i class="fas fa-sort"></i></th>
                                <th>AMOUNT <i class="fas fa-sort"></i></th>
                                <th>PAYMENT <i class="fas fa-sort"></i></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="8" class="text-center text-muted py-4">
                                    No data available in table
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 0 to 0 of 0 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                        </li>
                        <li class="page-item disabled">
                            <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

// Account Setting Section Content Functions

function getWithdrawalSettingsContent() {
    return `
        <div class="row g-4">
            <!-- Payout Options -->
            <div class="col-lg-8">
                <div class="card">
                    <div class="card-header d-flex justify-content-between align-items-center">
                        <h6 class="mb-0">Payout Options</h6>
                        <button class="btn btn-info btn-sm">New Withdrawal Option</button>
                    </div>
                    <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                        <div class="d-flex align-items-center">
                            <span class="me-2">Show</span>
                            <select class="form-select form-select-sm me-2" style="width: 80px;">
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                            </select>
                            <span class="me-3">entries</span>
                        </div>
                        <div class="input-group" style="width: 200px;">
                            <input type="text" class="form-control form-control-sm" placeholder="Search...">
                        </div>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th>Ctrl# <i class="fas fa-sort"></i></th>
                                        <th>Facility <i class="fas fa-sort"></i></th>
                                        <th>Account Type <i class="fas fa-sort"></i></th>
                                        <th>Account Name <i class="fas fa-sort"></i></th>
                                        <th>Account Number <i class="fas fa-sort"></i></th>
                                        <th>Contact No. <i class="fas fa-sort"></i></th>
                                        <th>Status <i class="fas fa-sort"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colspan="7" class="text-center text-muted py-4">
                                            No data available in table
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <small class="text-muted">Showing 0 to 0 of 0 entries</small>
                        <nav>
                            <ul class="pagination pagination-sm mb-0">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a>
                                </li>
                                <li class="page-item disabled">
                                    <a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            
            <!-- Withdrawal PIN -->
            <div class="col-lg-4">
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0">WITHDRAWAL PIN</h6>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="currentPassword" class="form-label">Current Password:</label>
                                <input type="password" class="form-control" id="currentPassword" placeholder="Current Password">
                            </div>
                            
                            <div class="mb-4">
                                <label for="withdrawalPin" class="form-label">Withdrawal PIN:</label>
                                <input type="password" class="form-control" id="withdrawalPin" placeholder="Enter withdrawal PIN here">
                            </div>
                            
                            <div class="d-grid">
                                <button type="button" class="btn btn-info">
                                    <i class="fas fa-shield-alt me-2"></i>Set PIN
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}



// ePoints Section Content Functions
// Account Summary Content Function
function getAccountSummaryContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-chart-line me-2"></i>Account Summary</h2>
        </div>
        
        <!-- Main Content Grid -->
        <div class="row g-4 mb-4">
            <!-- Left Column: Financial Cards -->
            <div class="col-xl-8 col-lg-8 col-md-12">
                <!-- Top Row: Primary Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad); min-height: 120px;">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h6 class="card-title text-white-50 mb-2">TOTAL CREDITED</h6>
                                <h2 class="mb-0 fw-bold">PHP1,854.00</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card text-white position-relative" style="background: linear-gradient(135deg, #f7b801, #ffa726); min-height: 120px;">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div class="d-flex justify-content-between align-items-start">
                                    <h6 class="card-title text-white-50 mb-2">AVAILABLE WALLET</h6>
                                    <i class="fas fa-wallet text-white-50"></i>
                                </div>
                                <h2 class="mb-0 fw-bold">PHP1,854.00</h2>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Second Row: Sales & Leadership -->
                <div class="row g-3 mb-4">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card" style="background: #f8f9fa; border: 1px solid #dee2e6;">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6 class="card-title text-muted mb-0">TOTAL SALES MATCH</h6>
                                    <i class="fas fa-dollar-sign text-warning"></i>
                                </div>
                                <h3 class="mb-1 fw-bold text-dark">PHP324.00</h3>
                                <small class="text-muted">POINTS RAISED</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card" style="background: #f8f9fa; border: 1px solid #dee2e6;">
                            <div class="card-body">
                                <h6 class="card-title text-muted mb-2">TOTAL LEADERSHIP</h6>
                                <h3 class="mb-0 fw-bold text-dark">PHP0.00</h3>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Third Row: Referral & Unilevel -->
                <div class="row g-3">
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad); min-height: 100px;">
                            <div class="card-body">
                                <h6 class="card-title text-white-50 mb-2">TOTAL DIRECT REFERRAL</h6>
                                <h2 class="mb-0 fw-bold">PHP900.00</h2>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12">
                        <div class="card text-white" style="background: linear-gradient(135deg, #f7b801, #ffa726); min-height: 100px;">
                            <div class="card-body">
                                <h6 class="card-title text-white-50 mb-2">TOTAL UNILEVEL+PSR</h6>
                                <h2 class="mb-0 fw-bold">PHP630.00</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Column: Network Status & Promotion -->
            <div class="col-xl-4 col-lg-4 col-md-12">
                <!-- Promotional Card -->
                <div class="card text-white mb-4" style="background: linear-gradient(135deg, #20c997, #17a2b8); min-height: 200px;">
                    <div class="card-body d-flex flex-column">
                        <div class="mb-3">
                            <i class="fas fa-leaf fa-2x mb-3 text-white-50"></i>
                            <h5 class="fw-bold mb-2">GRINDERS GUILD</h5>
                        </div>
                        <h6 class="mb-2">Radiating Wellness, Transforming Lives</h6>
                        <p class="small text-white-50 mb-0">Promoting wellness sparks positive transformations across multiple life dimensions, and stretching beyond physical health.</p>
                    </div>
                </div>
                
                <!-- Network Status Card -->
                <div class="card">
                    <div class="card-header">
                        <h6 class="mb-0 fw-bold">MY NETWORK STATUS</h6>
                    </div>
                    <div class="card-body text-center">
                        <!-- Circular Progress -->
                        <div class="d-flex justify-content-center mb-3">
                            <div class="position-relative">
                                <svg width="120" height="120" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="50" stroke="#e9ecef" stroke-width="8" fill="none"></circle>
                                    <circle cx="60" cy="60" r="50" stroke="#0d6efd" stroke-width="8" fill="none" 
                                            stroke-dasharray="314" stroke-dashoffset="78" stroke-linecap="round" 
                                            transform="rotate(-90 60 60)"></circle>
                                </svg>
                                <div class="position-absolute top-50 start-50 translate-middle">
                                    <h3 class="fw-bold text-primary mb-0">75%</h3>
                                </div>
                            </div>
                        </div>
                        
                        <h6 class="mb-3">Cumulative earnings to August</h6>
                        <h5 class="fw-bold mb-4">PHP0.00</h5>
                        
                        <div class="row text-center">
                            <div class="col-6">
                                <div class="border-end">
                                    <small class="text-muted d-block">GV</small>
                                    <strong>PHP0.00</strong>
                                </div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted d-block">Matching</small>
                                <strong>PHP0.00</strong>
                            </div>
                        </div>
                        
                        <hr class="my-3">
                        
                        <div class="row text-center">
                            <div class="col-6">
                                <div class="border-end">
                                    <small class="text-muted d-block">Unilevel+PSR</small>
                                    <strong>PHP0.00</strong>
                                </div>
                            </div>
                            <div class="col-6">
                                <small class="text-muted d-block">Leadership</small>
                                <strong>PHP0.00</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Network Activity Table -->
        <div class="card">
            <div class="card-header">
                <h5 class="mb-0"><i class="fas fa-network-wired me-2"></i>NETWORK ACTIVITY</h5>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead style="background: #f8f9fa;">
                            <tr>
                                <th class="px-3 py-3">DATE <i class="fas fa-sort-down ms-1 text-muted"></i></th>
                                <th class="px-3 py-3">USER <i class="fas fa-sort-down ms-1 text-muted"></i></th>
                                <th class="px-3 py-3 text-end">AMOUNT <i class="fas fa-sort-down ms-1 text-muted"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="px-3 py-3">
                                    <span class="badge bg-primary rounded-pill">2025-07-31 20:05:03</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div>
                                        <strong>JMDLONSO001</strong>
                                        <br><small class="text-muted">PERSONAL REBATES Bonus from JMDLONSO001</small>
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-end">
                                    <span class="badge bg-success rounded-pill">+280.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-3 py-3">
                                    <span class="badge bg-primary rounded-pill">2025-07-31 20:04:06</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div>
                                        <strong>JMDLONSO001</strong>
                                        <br><small class="text-muted">PERSONAL REBATES Bonus from JMDLONSO001</small>
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-end">
                                    <span class="badge bg-success rounded-pill">+240.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-3 py-3">
                                    <span class="badge bg-primary rounded-pill">2025-07-31 20:03:02</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div>
                                        <strong>JMDLONSO001</strong>
                                        <br><small class="text-muted">PERSONAL REBATES Bonus from JMDLONSO001</small>
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-end">
                                    <span class="badge bg-success rounded-pill">+240.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-3 py-3">
                                    <span class="badge bg-primary rounded-pill">2025-07-31 19:02:03</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div>
                                        <strong>JMDLONSO001</strong>
                                        <br><small class="text-muted">SALES MATCH from ITadmin</small>
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-end">
                                    <span class="badge bg-success rounded-pill">+324.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-3 py-3">
                                    <span class="badge bg-primary rounded-pill">2025-07-31 18:05:02</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div>
                                        <strong>JMDLONSO001</strong>
                                        <br><small class="text-muted">Referral Bonus ITadmin</small>
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-end">
                                    <span class="badge bg-success rounded-pill">+900.00</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="px-3 py-3">
                                    <span class="badge bg-primary rounded-pill">2025-07-31 17:03:22</span>
                                </td>
                                <td class="px-3 py-3">
                                    <div>
                                        <strong>JMDLONSO001</strong>
                                        <br><small class="text-muted">Referral Bonus jPadrones</small>
                                    </div>
                                </td>
                                <td class="px-3 py-3 text-end">
                                    <span class="badge bg-success rounded-pill">+630.00</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// ePoints Summary Content Function (renamed from previous Account Summary)

// User Dashboard Content Function
function getUserDashboardContent() {
    return `
        <div class="container-fluid">
            <!-- Stats Cards Grid -->
            <div class="row g-3 mb-4">
                <!-- Current Account -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-white-75 mb-0 fw-normal" style="opacity: 0.8; font-size: 0.75rem;">CURRENT ACCOUNT</h6>
                                <i class="fas fa-user text-white" style="opacity: 0.7;"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-white">JMDLONSO001</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Total Earnings -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-white-75 mb-0 fw-normal" style="opacity: 0.8; font-size: 0.75rem;">TOTAL EARNINGS</h6>
                                <i class="fas fa-chart-line text-white" style="opacity: 0.7;"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-white">PHP1,854.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- ePoints Balance -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-white-75 mb-0 fw-normal" style="opacity: 0.8; font-size: 0.75rem;">EPOINTS BALANCE</h6>
                                <i class="fas fa-coins text-white" style="opacity: 0.7;"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-white">PHP36.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Total Sales Match -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card border-0 shadow-sm" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-muted mb-0 fw-normal" style="font-size: 0.75rem;">TOTAL SALES MATCH</h6>
                                <i class="fas fa-trophy text-warning"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-dark">PHP324.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Grinders Guild Card -->
                <div class="col-lg-4 col-md-8 col-12">
                    <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 12px; min-height: 120px;">
                        <div class="card-body p-4 position-relative">
                            <div class="d-flex align-items-center mb-2">
                                <div class="bg-white bg-opacity-20 rounded p-1 me-2">
                                    <i class="fas fa-dumbbell text-white"></i>
                                </div>
                                <h6 class="text-white mb-0 fw-bold">GRINDERS GUILD</h6>
                            </div>
                            <h5 class="text-white mb-2 fw-bold">Radiating Wellness, Transforming Lives</h5>
                            <p class="text-white-75 mb-0" style="font-size: 0.8rem; opacity: 0.9;">Promoting wellness sparks positive transformations across multiple life dimensions, and stretching beyond physical health.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Second Row of Stats -->
            <div class="row g-3 mb-4">
                <!-- Total Leadership -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card border-0 shadow-sm" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-muted mb-0 fw-normal" style="font-size: 0.75rem;">TOTAL LEADERSHIP</h6>
                                <i class="fas fa-users text-warning"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-dark">PHP0.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Total Direct Referral -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card border-0 shadow-sm" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-muted mb-0 fw-normal" style="font-size: 0.75rem;">TOTAL DIRECT REFERRAL</h6>
                                <i class="fas fa-user-plus text-warning"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-dark">PHP900.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Total Unilevel+PSR -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card border-0 shadow-sm" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-muted mb-0 fw-normal" style="font-size: 0.75rem;">TOTAL UNILEVEL+PSR</h6>
                                <i class="fas fa-layer-group text-warning"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-dark">PHP630.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Other Earnings -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12">
                    <div class="card border-0 shadow-sm" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body py-3">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-muted mb-0 fw-normal" style="font-size: 0.75rem;">OTHER EARNINGS</h6>
                                <i class="fas fa-plus-circle text-warning"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-dark">PHP0.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- My Network Status -->
                <div class="col-lg-4 col-md-8 col-12">
                    <div class="card border-0 shadow-sm" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body p-4">
                            <h6 class="text-muted mb-3 fw-normal" style="font-size: 0.75rem;">MY NETWORK STATUS</h6>
                            <div class="d-flex align-items-center justify-content-center mb-3">
                                <div class="position-relative" style="width: 100px; height: 100px;">
                                    <svg width="100" height="100" viewBox="0 0 42 42" style="transform: rotate(-90deg);">
                                        <circle cx="21" cy="21" r="15.5" fill="transparent" stroke="#e9ecef" stroke-width="3"/>
                                        <circle cx="21" cy="21" r="15.5" fill="transparent" stroke="#10B981" stroke-width="3" 
                                                stroke-dasharray="73" stroke-dashoffset="19" stroke-linecap="round"/>
                                    </svg>
                                    <div class="position-absolute top-50 start-50 translate-middle text-center">
                                        <h3 class="mb-0 fw-bold text-success">75%</h3>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mb-3">
                                <small class="text-muted">Cumulative earnings to August</small>
                                <h5 class="mb-0 fw-bold">PHP0.00</h5>
                            </div>
                            <div class="row text-center">
                                <div class="col-6">
                                    <small class="text-muted d-block">DR</small>
                                    <strong class="text-dark">PHP0.00</strong>
                                </div>
                                <div class="col-6">
                                    <small class="text-muted d-block">Matching</small>
                                    <strong class="text-dark">PHP0.00</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Bottom Section with Tables -->
            <div class="row g-3">
                <!-- eWallet Transaction History -->
                <div class="col-lg-8 col-12">
                    <div class="card border-0 shadow-sm" style="border-radius: 12px;">
                        <div class="card-body p-4">
                            <h6 class="mb-3 fw-normal">EWALLET TRANSACTION HISTORY</h6>
                            <div class="table-responsive">
                                <table class="table table-hover mb-0">
                                    <thead style="background-color: #f8f9fa;">
                                        <tr>
                                            <th class="px-3 py-3 text-uppercase fw-normal" style="font-size: 0.75rem; color: #6c757d;">TRANS#</th>
                                            <th class="px-3 py-3 text-uppercase fw-normal" style="font-size: 0.75rem; color: #6c757d;">DATE</th>
                                            <th class="px-3 py-3 text-uppercase fw-normal" style="font-size: 0.75rem; color: #6c757d;">REMARKS</th>
                                            <th class="px-3 py-3 text-uppercase fw-normal text-end" style="font-size: 0.75rem; color: #6c757d;">AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="px-3 py-3">39174</td>
                                            <td class="px-3 py-3">
                                                <span class="badge" style="background: #8B5CF6; color: white; font-size: 0.7rem;">2025-07-31 21:01:05</span>
                                            </td>
                                            <td class="px-3 py-3">PERSONAL REBATES Bonus from JMDLONSO001</td>
                                            <td class="px-3 py-3 text-end">
                                                <span class="badge" style="background: #10B981; color: white;">+270.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-3">39171</td>
                                            <td class="px-3 py-3">
                                                <span class="badge" style="background: #8B5CF6; color: white; font-size: 0.7rem;">2025-07-31 20:46:06</span>
                                            </td>
                                            <td class="px-3 py-3">PERSONAL REBATES Bonus from JMDLONSO001</td>
                                            <td class="px-3 py-3 text-end">
                                                <span class="badge" style="background: #10B981; color: white;">+225.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-3">39170</td>
                                            <td class="px-3 py-3">
                                                <span class="badge" style="background: #8B5CF6; color: white; font-size: 0.7rem;">2025-07-31 20:37:06</span>
                                            </td>
                                            <td class="px-3 py-3">PERSONAL REBATES Bonus from JMDLONSO001</td>
                                            <td class="px-3 py-3 text-end">
                                                <span class="badge" style="background: #10B981; color: white;">+45.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-3">30859</td>
                                            <td class="px-3 py-3">
                                                <span class="badge" style="background: #8B5CF6; color: white; font-size: 0.7rem;">2025-07-11 18:52:09</span>
                                            </td>
                                            <td class="px-3 py-3">SALES MATCH from ITadmin</td>
                                            <td class="px-3 py-3 text-end">
                                                <span class="badge" style="background: #10B981; color: white;">+324.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-3">30858</td>
                                            <td class="px-3 py-3">
                                                <span class="badge" style="background: #8B5CF6; color: white; font-size: 0.7rem;">2025-07-11 18:51:09</span>
                                            </td>
                                            <td class="px-3 py-3">Referral Bonus ITadmin</td>
                                            <td class="px-3 py-3 text-end">
                                                <span class="badge" style="background: #10B981; color: white;">+450.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-3">23223</td>
                                            <td class="px-3 py-3">
                                                <span class="badge" style="background: #8B5CF6; color: white; font-size: 0.7rem;">2025-06-24 19:57:05</span>
                                            </td>
                                            <td class="px-3 py-3">Referral Bonus jmdlonso01</td>
                                            <td class="px-3 py-3 text-end">
                                                <span class="badge" style="background: #10B981; color: white;">+450.00</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td class="px-3 py-3">15904</td>
                                            <td class="px-3 py-3">
                                                <span class="badge" style="background: #8B5CF6; color: white; font-size: 0.7rem;">2025-05-20 15:30:03</span>
                                            </td>
                                            <td class="px-3 py-3">PERSONAL REBATES Bonus from JMDLONSO001</td>
                                            <td class="px-3 py-3 text-end">
                                                <span class="badge" style="background: #10B981; color: white;">+90.00</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getEpointsClaimProductsContent() {
  return `
    <div class="container-fluid px-3 px-md-4 py-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="fw-bold text-primary">
          <i class="fas fa-gift me-2"></i>ePoints Purchase
        </h2>
      </div>

      <!-- Form Fields -->
      <form>
        <div class="row g-3 mb-4">
          <div class="col-md-3">
            <label class="form-label">Account</label>
            <input type="text" class="form-control" value="JMDLONSOD01" readonly>
          </div>
          <div class="col-md-3">
            <label class="form-label">Available</label>
            <input type="text" class="form-control" value="PHP36.00" readonly>
          </div>
          <div class="col-md-3">
            <label class="form-label">Claim Value</label>
            <input type="text" class="form-control" value="0" readonly>
          </div>
          <div class="col-md-3">
            <label class="form-label">Pickup Branch</label>
            <select class="form-select">
              <option selected disabled>Select Pickup Branch</option>
              <option value="manila">Manila</option>
              <option value="quezon">Quezon City</option>
              <option value="makati">Makati</option>
              <option value="cebu">Cebu</option>
              <option value="davao">Davao</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" placeholder="Enter account password">
          </div>
        </div>

        <!-- Product Table -->
        <div class="table-responsive mb-4">
          <table class="table table-bordered align-middle">
            <thead class="table-light">
              <tr>
                <th>Package Code</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SGGUARD</td>
                <td>Synbiotic+Gutguard</td>
                <td>₱2,280.00</td>
                <td><input type="number" class="form-control" min="0" value="0"></td>
              </tr>
              <tr>
                <td>BPGUARD</td>
                <td>Synbiotic+Gutguard BPGUARD*1.00</td>
                <td>₱780.00</td>
                <td><input type="number" class="form-control" min="0" value="0"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Action Buttons -->
        <div class="d-flex justify-content-end gap-3">
          <button type="submit" class="btn btn-primary px-4">
            <i class="fas fa-paper-plane me-2"></i>Submit
          </button>
          <button type="button" class="btn btn-warning px-4">
            <i class="fas fa-times me-2"></i>Close
          </button>
        </div>
      </form>
    </div>
  `;
}

/* ----------------- ADMIN PAGE CONTENT FUNCTIONS ----------------- */


// Dashboard
function getAdminDashboardContent() {
    return `
        <div class="container-fluid py-3" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
            <!-- Page Title -->
            <div class="mb-4">
                <h2 class="fw-bold">Dashboard</h2>
                <h5 class="text-muted">Store Manager</h5>
            </div>

            <!-- 🧑‍💼 Admin Info Card -->
            <div class="card shadow-sm mb-4 p-3 d-flex flex-row justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                <i class="bi bi-person-fill fs-2 me-3"></i>
                <div>
                    <div class="fw-bold text-uppercase">User ID: GGLOBAL</div>
                    <div class="text-muted small">Last Login: 2025-09-02 20:11:19</div>
                </div>
                </div>
                <span class="badge text-bg-purple text-uppercase px-3 py-2" style="background-color: purple;">SYSTEM ADMIN</span>
            </div>

            <!-- Card Container -->
            <div class="card shadow-sm">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span><i class="fa fa-store me-2"></i> Store Manager</span>
                    <div class="d-flex">
                        <!-- Search -->
                        <input type="text" class="form-control form-control-sm me-2" placeholder="Search..." id="storeSearch" style="width: 200px;">
                        <!-- Entries per page -->
                        <select class="form-select form-select-sm" id="entriesPerPage" style="width: 100px;">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>

                <!-- Table -->
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>IDNO#</th>
                                <th>STORE_NAME</th>
                                <th>USER</th>
                                <th>REGISTERED</th>
                                <th>TYPE</th>
                                <th class="text-center">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>OROMOOS GLOBAL</td>
                                <td>OLAD OROMOOS</td>
                                <td>2023-07-04</td>
                                <td>Country Hub</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>GROCERYN</td>
                                <td>OLAD OROMOOS</td>
                                <td>2023-07-04</td>
                                <td>Country Hub</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Mega Mega Grocery Store - Jemima Enyass</td>
                                <td>jemima enyass</td>
                                <td>2023-07-04</td>
                                <td>Store</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Mega Mega Religious Outreach Center - Jemima Enyass</td>
                                <td>jemima enyass</td>
                                <td>2023-07-04</td>
                                <td>Store</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Mega Mega Grocery Store - Olad Oromoos</td>
                                <td>OLAD OROMOOS</td>
                                <td>2023-07-04</td>
                                <td>Store</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>Mega Mega Grocery (CCO) Inc. - Jenny Simico</td>
                                <td>JENNY SIMICO</td>
                                <td>2023-07-04</td>
                                <td>Store</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>7</td>
                                <td>Mega Mega Grocery Company - Jenny Simico</td>
                                <td>JENNY SIMICO</td>
                                <td>2023-07-04</td>
                                <td>Store</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>8</td>
                                <td>Mega Mega Grocery Company - Jewelyn Cuamenco</td>
                                <td>Jewelyn Cuamenco</td>
                                <td>2023-07-04</td>
                                <td>Store</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                            <tr>
                                <td>9</td>
                                <td>Mega Mega Grocery Company - Virgilio Bandalan</td>
                                <td>Virgilio Bandalan</td>
                                <td>2023-07-04</td>
                                <td>Store</td>
                                <td class="text-center">
                                    <a href="#" class="text-primary me-2" title="View"><i class="fa fa-eye"></i></a>
                                    <a href="#" class="text-success me-2" title="Edit"><i class="fa fa-pencil-alt"></i></a>
                                    <a href="#" class="text-danger" title="Delete"><i class="fa fa-trash"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <small class="text-muted">Showing 1 to 9 of 9 entries</small>
                    <nav>
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled"><a class="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}

/* Accounts */
function getAdminAccountsManagerContent() {
    return `
    <div class="container-fluid bg-white p-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">

      <!-- 📊 Binary Accounts Section -->
      <div class="mb-3">
        <h4 class="fw-bold">Binary Accounts</h4>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div>
            <button class="btn btn-light btn-sm">Copy</button>
            <button class="btn btn-light btn-sm">CSV</button>
            <button class="btn btn-light btn-sm">Excel</button>
            <button class="btn btn-light btn-sm">PDF</button>
            <button class="btn btn-light btn-sm">Print</button>
          </div>
          <input type="text" class="form-control form-control-sm w-25" placeholder="Search:" />
        </div>
        <div class="mb-2">
          <label>Show 
            <select class="form-select form-select-sm d-inline w-auto">
              <option selected>5</option>
              <option>10</option>
              <option>25</option>
            </select> entries
          </label>
        </div>

        <!-- 📋 Table Structure -->
        <table class="table table-bordered">
          <thead class="table-light fw-bold">
            <tr>
              <th>ID#</th>
              <th>REGISTERED</th>
              <th>NAME</th>
              <th>USERNAME</th>
              <th>PASSWORD</th>
              <th>SPONSORED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${[1,2,3,4,5].map(i => {
              const username = `GGUILD0${i}`;
              const password = i === 1 ? 'P@ss@123' : i === 2 ? 'Abc@123' : '';
              const storeBtn = i <= 3 
                ? `<button class="btn btn-success btn-sm">Store</button>` 
                : `<button class="btn btn-primary btn-sm">Set as Store</button>`;
              return `
              <tr>
                <td>${i}</td>
                <td>25-01-31 00:00:00</td>
                <td>
                  GRINDERS, GUILD<br>
                  <span class="badge bg-success">AC</span>
                  <span class="badge bg-warning text-dark">EXT</span>
                  <span class="badge bg-primary">PS</span>
                  <span class="badge bg-primary">PLATINUM</span>
                </td>
                <td>${username}</td>
                <td>${password}</td>
                <td>0</td>
                <td>
                  <i class="bi bi-search text-primary me-2"></i>
                  <i class="bi bi-lock text-primary me-2"></i>
                  ${storeBtn}
                  <i class="bi bi-person-fill text-primary ms-2"></i>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>

        <!-- 📈 Footer -->
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">Showing 1 to 5 of 5,213 entries</small>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item"><a class="page-link" href="#">4</a></li>
              <li class="page-item"><a class="page-link" href="#">5</a></li>
              <li class="page-item disabled"><span class="page-link">...</span></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    `;
}

function getAdminAccountsCdContent() {
    return `
    <div class="container-fluid bg-white p-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
        <!-- 💰 Summary Panels -->
        <div class="row mb-4 text-white">
        <div class="col-md-4 mb-2">
            <div class="card bg-primary p-3">
            <h5>Total Deductions</h5>
            <h2>PHP 2,071.80</h2>
            <small>PHP 2,071.80</small>
            </div>
        </div>
        <div class="col-md-4 mb-2">
            <div class="card bg-danger p-3">
            <h5>USED</h5>
            <h2>PHP 0.00</h2>
            <small>PHP 0.00</small>
            </div>
        </div>
        <div class="col-md-4 mb-2">
            <div class="card bg-success p-3">
            <h5>UNUSED</h5>
            <h2>PHP 2,071.80</h2>
            <small>PHP 2,071.80</small>
            </div>
        </div>
        </div>

        <!-- 📋 CD Accounts Table Section -->
        <h4 class="fw-bold mb-3">CD Accounts</h4>
        <div class="d-flex justify-content-between align-items-center mb-2">
        <div>
            <button class="btn btn-light btn-sm">Copy</button>
            <button class="btn btn-light btn-sm">CSV</button>
            <button class="btn btn-light btn-sm">Excel</button>
            <button class="btn btn-light btn-sm">PDF</button>
            <button class="btn btn-light btn-sm">Print</button>
        </div>
        <input type="text" class="form-control form-control-sm w-25" placeholder="Search:" />
        </div>
        <div class="mb-2">
        <label>Show 
            <select class="form-select form-select-sm d-inline w-auto">
            <option selected>5</option>
            <option>10</option>
            <option>25</option>
            </select> entries
        </label>
        </div>

        <!-- 📊 Table -->
        <table class="table table-bordered table-striped">
        <thead class="table-light fw-bold">
            <tr>
            <th>SQ#</th>
            <th>ID#</th>
            <th>TYPE</th>
            <th>NAME</th>
            <th>%</th>
            <th>CD_AMOUNT</th>
            <th>DEDUCTIONS</th>
            <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody>
            ${[
            {sq: 1, id: 3988, name: "Ballares, Richard", user: "rayz08"},
            {sq: 2, id: 4471, name: "Coloma, Jack Jerry", user: "jjc05"},
            {sq: 3, id: 4200, name: "Alcaraz, Anberlin", user: "anberj24"},
            {sq: 4, id: 3989, name: "Mangulabnan, Randy", user: "randz03"},
            {sq: 5, id: 3990, name: "Gamurot, Junnel", user: "jcg07"}
            ].map(entry => `
            <tr>
                <td>${entry.sq}</td>
                <td>${entry.id}</td>
                <td>PLATINUM</td>
                <td>${entry.name} (${entry.user})</td>
                <td>1</td>
                <td>2,071.80</td>
                <td>20.72</td>
                <td>
                <i class="bi bi-eye text-primary me-2"></i>
                <i class="bi bi-pencil text-success me-2"></i>
                <i class="bi bi-share text-info"></i>
                </td>
            </tr>
            `).join('')}
        </tbody>
        </table>

        <!-- 📈 Footer -->
        <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">Showing 1 to 5 of 5 entries</small>
        <nav>
            <ul class="pagination pagination-sm mb-0">
            <li class="page-item"><a class="page-link" href="#">«</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
            </ul>
        </nav>
        </div>
    </div>
    `;
}

/* Promos */
function getAdminPromo2fastContent() {
  return `
  <div class="container-fluid bg-white p-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 💸 Promo Summary Section -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
      <div>
        <h4 class="fw-bold text-dark mb-1">Total Credits Promo</h4>
        <h5 class="fw-bold text-dark">2 Fast 2 Furious</h5>
      </div>
      <div class="text-end">
        <h2 class="fw-bold text-purple" style="color: purple;">29,250.00</h2>
      </div>
    </div>

    <!-- 📋 Table Controls -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2">
      <div class="mb-2 mb-md-0">
        <label>Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>10</option>
            <option>25</option>
            <option>50</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25" placeholder="Search:" />
    </div>

    <!-- 📊 Qualification Table -->
    <div class="table-responsive shadow-sm">
      <table class="table table-bordered table-striped">
        <thead class="table-light fw-bold">
          <tr>
            <th>USER</th>
            <th>SPONSORED</th>
            <th>Qualification Status</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {user: "Acido.Judy[AcidoJUDY][2023-05-01]", sponsored: "Acido.Judy[AcidoJUDY][2023-05-01]", sales: "500000.00", status: "NOT QUALIFIED"},
            {user: "Acido.Judy[AcidoJUDY][2023-05-01]", sponsored: "Valenzona.Michael[ValenzonaMICHAEL][2023-05-01]", sales: "500000.00", status: "NOT QUALIFIED"},
            {user: "Acido.Judy[AcidoJUDY][2023-05-01]", sponsored: "ASISANA.Gemma[ASISANAGEMMA][2023-05-01]", sales: "500000.00", status: "Qualified"},
            {user: "Agunod.Jonathan[AgunodJONATHAN][2023-05-01]", sponsored: "Lumaban.JOSEPH[LumabanJOSEPH][2023-05-01]", sales: "500000.00", status: "Qualified"},
            {user: "Agunod.Jonathan[AgunodJONATHAN][2023-05-01]", sponsored: "Balce.John[BalceJOHN][2023-05-01]", sales: "500000.00", status: "NOT QUALIFIED"},
            {user: "Agunod.Jonathan[AgunodJONATHAN][2023-05-01]", sponsored: "Lumaban.JOSEPH[LumabanJOSEPH][2023-05-01]", sales: "500000.00", status: "Qualified"},
            {user: "ALFARERO.Michael[ALFAREROMICHAEL][2023-05-01]", sponsored: "Balce.John[BalceJOHN][2023-05-01]", sales: "500000.00", status: "NOT QUALIFIED"},
            {user: "ALFARERO.Michael[ALFAREROMICHAEL][2023-05-01]", sponsored: "Lumaban.JOSEPH[LumabanJOSEPH][2023-05-01]", sales: "500000.00", status: "Qualified"},
            {user: "ALFARERO.Michael[ALFAREROMICHAEL][2023-05-01]", sponsored: "Alvarado.Mendy[AlvaradoMENDY][2023-05-01]", sales: "500000.00", status: "NOT QUALIFIED"},
            {user: "ALFARERO.Michael[ALFAREROMICHAEL][2023-05-01]", sponsored: "JAIMER.MARJORIE[JAIMERMARJORIE][2023-05-01]", sales: "500000.00", status: "Qualified"}
          ].map(entry => `
            <tr>
              <td style="word-break: break-word;">${entry.user}</td>
              <td style="word-break: break-word;">${entry.sponsored} (Sales: ${entry.sales})</td>
              <td>
                <span class="badge ${entry.status === 'Qualified' ? 'bg-success' : 'bg-warning text-dark'}">${entry.status}</span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 10 of 10 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item disabled"><span class="page-link">...</span></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminPromoPearlfarmContent() {
    return `<div class="card"><div class="card-body">Pearl Farm Promo Page</div></div>`;
}
function getAdminPromoListContent() {
    return `<div class="card"><div class="card-body">Other Promos Page</div></div>`;
}

/* Store */
function getAdminStoreAddContent() {
  return `
  <!-- Sticky Transparent Navbar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-transparent fixed-top shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand fw-bold" href="#">Store Manager</a>
    </div>
  </nav>

  <!-- Form Container with Adjusted Top Spacing -->
  <div class="container-fluid pt-4 mt-3 d-flex justify-content-center align-items-start">
    <div class="card shadow p-4" style="max-width: 600px; width: 100%;">
      <!-- 🧩 Header -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="fw-bold text-dark mb-0">Add New Store</h4>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>

      <!-- 📝 Form -->
      <form>
        <div class="mb-3">
          <label class="form-label" style="color: #ff5722;">Username</label>
          <input type="text" class="form-control" placeholder="Enter Account USERNAME">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted">Account Name</label>
          <input type="text" class="form-control" placeholder="Account Name">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted">Company Name</label>
          <input type="text" class="form-control" placeholder="Company Name">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted">Store Type</label>
          <select class="form-select">
            <option selected disabled>Select Stockist Type</option>
            <option>Retail</option>
            <option>Wholesale</option>
            <option>Distributor</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label text-muted">Store Name</label>
          <input type="text" class="form-control" placeholder="Stockist Name">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted">Contact No</label>
          <input type="text" class="form-control" placeholder="Contact Number">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted">User Name</label>
          <input type="text" class="form-control" placeholder="User Name">
        </div>
        <div class="mb-3">
          <label class="form-label text-muted">Password</label>
          <input type="password" class="form-control" placeholder="Password">
        </div>
        <div class="mb-4">
          <label class="form-label text-muted">Confirm Password</label>
          <input type="password" class="form-control" placeholder="Confirm Password">
        </div>

        <!-- 🎯 Action Buttons -->
        <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
          <button type="submit" class="btn btn-primary w-100 w-md-auto">
            <i class="fas fa-plus me-1"></i>Add Store
          </button>
          <button type="button" class="btn btn-warning text-white w-100 w-md-auto">
            <i class="fas fa-times me-1"></i>Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
  `;
}

function getAdminStoreManagerContent() {
  return `
  <div class="container-fluid bg-light p-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🧩 Title -->
    <h4 class="fw-bold text-dark mb-3">Store Manager</h4>

    <!-- 🔍 Controls -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>10</option>
            <option>25</option>
            <option>50</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- 📋 Table -->
    <div class="table-responsive shadow-sm">
      <table class="table table-bordered table-striped bg-white">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>IDNO</th>
            <th>STORE_NAME</th>
            <th>USER</th>
            <th>REGISTERED</th>
            <th>TYPE</th>
            <th>STATUS</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {id: 1, name: "GRINDSKEDGLOBAL", user: "GRIND GRINDSKED", reg: "25-06-2020 09:06:04", type: "admin"},
            {id: 1000, name: "GRINDSKED", user: "GRIND GRINDSKED", reg: "25-06-2020 09:06:04", type: "Country Hub"},
            {id: 1014, name: "DIANA BAMACA", user: "DIANA BAMACA", reg: "25-06-2020 09:06:04", type: "Branch"},
            {id: 1015, name: "Vigan-Arangcasi Bantay City - Joanne Agatep", user: "joanna agatep", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA"},
            {id: 1016, name: "Vigan-Cabaroan Bantay City - Jaeilyn Doronal", user: "jaeilyn doronal", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA"},
            {id: 1017, name: "Vigan-Cabaroan Bantay City - Princess Uy", user: "princess Uy", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA"},
            {id: 1025, name: "Vigan-Poblacion Norte City - Ma. Janicy Simaco", user: "MA. JANICY SIMACO", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA"},
            {id: 1026, name: "Vigan-Poblacion Norte City - Nickoel Valico", user: "Nickoel Valico", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA"},
            {id: 1027, name: "Vigan-Mira Hills City - Jaeilyn Caragao", user: "Jaeilyn Caragao", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA"},
            {id: 1028, name: "Vigan-Mira Hills City - Vangie Sordan", user: "Vangie Sordan", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA"}
          ].map(entry => `
            <tr>
              <td>${entry.id}</td>
              <td>${entry.name}</td>
              <td>${entry.user}</td>
              <td>${entry.reg}</td>
              <td>${entry.type}</td>
              <td><span class="badge bg-success">Active</span></td>
              <td>
                <i class="bi bi-eye text-primary me-2" title="View"></i>
                <i class="bi bi-pencil text-primary me-2" title="Edit"></i>
                <i class="bi bi-trash text-primary me-2" title="Delete"></i>
                <i class="bi bi-person text-primary" title="Manage Users"></i>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 10 of 60 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item"><a class="page-link" href="#">6</a></li>
          <li class="page-item disabled"><span class="page-link">...</span></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminStoreUserManagerContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🧩 Controls -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
      <!-- Export Buttons -->
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
        <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
        <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
      </div>
    </div>

    <!-- 🔍 Entries + Search Row -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>5</option>
            <option>10</option>
            <option>25</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- 📋 Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>REGISTERED</th>
            <th>POSITION</th>
            <th>NAME</th>
            <th>USERNAME</th>
            <th>PASSWORD</th>
            <th>STORE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {
              reg: "2023-07-10 10:25:25",
              pos: "System, Administrator Main",
              name: "superadmin_main",
              user: "superadmin_main",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },
            {
              reg: "2023-07-10 10:25:25",
              pos: "Logistics",
              name: "Tomas, Kenneth G",
              user: "kenneth",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },
            {
              reg: "2005-09-19 22:05:28",
              pos: "FINANCE",
              name: "Tomas, Kenneth G",
              user: "gposktofinance",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },
            {
              reg: "2005-09-19 22:05:28",
              pos: "FINANCE",
              name: "Tomas, Kenneth G",
              user: "gposktofinance1",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },
            {
              reg: "2023-07-10 10:25:25",
              pos: "Logistics, Logistics 1",
              name: "Tomas, Kenneth G",
              user: "countryadmin",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },
            {
              reg: "2023-07-10 10:25:25",
              pos: "Logistics",
              name: "Tomas, Kenneth G",
              user: "countryadmin",
              pass: "Abc@123",
              store: "GPOSDEBPH"
            }
          ].map(entry => `
            <tr>
              <td>${entry.reg}</td>
              <td>${entry.pos}</td>
              <td>${entry.name}</td>
              <td>${entry.user}</td>
              <td>${entry.pass}</td>
              <td>${entry.store}</td>
              <td>
                <i class="bi bi-pencil text-primary me-2" title="Edit"></i>
                <i class="bi bi-trash text-primary" title="Delete"></i>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 6 of 6 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item disabled"><span class="page-link">»</span></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}


/* Sales */
function getAdminSalesManagerContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🧩 Export Buttons -->
    <div class="d-flex flex-wrap justify-content-start gap-2 mb-3">
      <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
      <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
      <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
    </div>

    <!-- 🔍 Controls Row -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>5</option>
            <option>10</option>
            <option>25</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- 📋 Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>TRANS#</th>
            <th>STORE</th>
            <th>CASHIER</th>
            <th>DATE</th>
            <th>USER</th>
            <th>CUSTOMER</th>
            <th>STATUS</th>
            <th>AMOUNT</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          ${[100057, 100056, 100055, 100054, 100053].map(trans => `
            <tr>
              <td class="text-danger fw-bold">${trans}</td>
              <td>CONCORD2Ph</td>
              <td>Torres, Kenneth (KH)</td>
              <td>2023-05-21</td>
              <td>MARPAS ANGOLD</td>
              <td>GRIGGS GOLD</td>
              <td>
                <span class="badge bg-success mb-1">COMPLETED</span><br>
                <span class="badge bg-success mb-1">PAID</span><br>
                <span class="badge bg-primary">CASH</span>
              </td>
              <td>0.00</td>
              <td>
                <i class="bi bi-receipt text-primary" title="View Receipt"></i>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 5 of 3,759 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item disabled"><span class="page-link">...</span></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminSalesMonthlyContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🔷 Top Metrics Section -->
    <div class="row text-white mb-4 g-3">
      <!-- ...existing code... -->
    </div>

    <!-- 📋 Monthly Sales Summary Table -->
    <h4 class="fw-bold mb-3">Monthly Sales Summary</h4>

    <!-- Export Buttons -->
    <div class="d-flex flex-wrap gap-2 mb-3">
      <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
      <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
      <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
    </div>

    <!-- Controls Row -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>5</option>
            <option>10</option>
            <option>25</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>DATE</th>
            <th>PENDING</th>
            <th>STORE</th>
            <th>PERSONAL</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {date: "2025-01", pending: "0.00", store: "51,732,690.00", personal: "11,241,480.00", total: "62,974,170.00"},
            {date: "2025-02", pending: "0.00", store: "0.00", personal: "0.00", total: "0.00"},
            {date: "2025-03", pending: "0.00", store: "0.00", personal: "0.00", total: "0.00"},
            {date: "2025-04", pending: "0.00", store: "0.00", personal: "0.00", total: "0.00"},
            {date: "2025-05", pending: "0.00", store: "0.00", personal: "0.00", total: "0.00"},
            {date: "2025-06", pending: "0.00", store: "0.00", personal: "0.00", total: "0.00"}
          ].map(entry => `
            <tr>
              <td>${entry.date}</td>
              <td>${entry.pending}</td>
              <td>${entry.store}</td>
              <td>${entry.personal}</td>
              <td>${entry.total}</td>
              <td><button class="btn btn-sm btn-primary"><i class="fas fa-eye me-1"></i>View Details</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 6 of 6 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item disabled"><span class="page-link">...</span></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminSalesDailyContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🔷 Top Metrics Section -->
    <div class="row text-white mb-4 g-3">
      <!-- ...existing code... -->
    </div>

    <!-- 📋 Daily Sales Summary Table -->
    <h4 class="fw-bold mb-3">Daily Sales Summary</h4>

    <!-- Export Buttons -->
    <div class="d-flex flex-wrap gap-2 mb-3">
      <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
      <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
      <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
    </div>

    <!-- Controls Row -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>5</option>
            <option>10</option>
            <option>25</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>DATE #</th>
            <th>PENDING</th>
            <th>STORE</th>
            <th>PERSONAL</th>
            <th>TOTAL</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {date: "2025-09-01", pending: "0.00", store: "44,320.00", personal: "6,820.00", total: "48,780.00"},
            {date: "2025-09-02", pending: "0.00", store: "45,700.00", personal: "11,700.00", total: "57,400.00"},
            {date: "2025-09-03", pending: "0.00", store: "45,700.00", personal: "11,700.00", total: "57,400.00"}
          ].map(entry => `
            <tr>
              <td>${entry.date}</td>
              <td>${entry.pending}</td>
              <td>${entry.store}</td>
              <td>${entry.personal}</td>
              <td>${entry.total}</td>
              <td><button class="btn btn-sm btn-primary"><i class="fas fa-eye me-1"></i>View Details</button></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 3 of 3 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item disabled"><span class="page-link">»</span></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}


/* Item */
function getAdminItemAddContent() {
    return `
        <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="card shadow p-4" style="max-width: 600px; width: 100%;">
                <!-- 🧩 Header -->
                <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="fw-bold text-dark mb-0">Add Item</h4>
                <button type="button" class="btn-close" aria-label="Close"></button>
                </div>

                <!-- 📝 Form -->
                <form>
                <div class="mb-3">
                    <label class="form-label text-muted">SKU</label>
                    <input type="text" class="form-control" placeholder="Product SKU">
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted">Name</label>
                    <input type="text" class="form-control" placeholder="Product Name">
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted">Description</label>
                    <textarea class="form-control" rows="3" placeholder="Product Description"></textarea>
                </div>

                <div class="mb-3">
                    <label class="form-label text-muted">Unit Code</label>
                    <select class="form-select">
                    <option selected disabled>Select Unit</option>
                    <option>Piece</option>
                    <option>Box</option>
                    <option>Pack</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="form-label text-muted">Category</label>
                    <select class="form-select">
                    <option selected disabled>Select Category</option>
                    <option>Electronics</option>
                    <option>Apparel</option>
                    <option>Food</option>
                    </select>
                </div>

                <!-- 🎯 Action Buttons -->
                <div class="d-flex flex-column flex-md-row justify-content-between gap-2">
                    <button type="submit" class="btn btn-primary w-100 w-md-auto">
                    <i class="bi bi-save me-1"></i> Add Item
                    </button>
                    <button type="button" class="btn btn-warning text-white w-100 w-md-auto">
                    <i class="bi bi-x-lg me-1"></i> Close
                    </button>
                </div>
                </form>
            </div>
        </div>
    `;
}

function getAdminItemTableContent() {
    return `
        <div class="card shadow-sm">
            <div class="card-header bg-light d-flex justify-content-between align-items-center">
                <div>
                    <label class="me-2">Show</label>
                    <select class="form-select form-select-sm d-inline-block" style="width: 80px;">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="ms-2">entries</span>
                </div>
                <input type="text" class="form-control form-control-sm" placeholder="Search..." style="width: 200px;">
            </div>

            <div class="table-responsive">
                <table class="table table-bordered table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>ITEM #</th>
                            <th>CODE</th>
                            <th>DESC</th>
                            <th>CAT</th>
                            <th>UNIT</th>
                            <th>S.P</th>
                            <th>MRP</th>
                            <th>DP</th>
                            <th>CENTER</th>
                            <th>MOBILE</th>
                            <th>ITEM INFO</th>
                            <th>COMPONENTS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${[
                            {
                                id: 1, code: 'SILVER', desc: 'PKG SILVER SGB/SAPPHIRE/100', cat: 'Entry Package', unit: 'PACK',
                                sp: '25000.00', mrp: '25000.00', dp: '25000.00', center: 'DS0000001', mobile: '09123456789',
                                info: 'DR500.00, MATCHING100.00, UNBV0.00, MLMBBV0.00, CBV0.00, IDR0.00', components: 'WITH COMPONENTS'
                            },
                            {
                                id: 2, code: 'GOLD', desc: 'PKG GOLD SGB/SAPPHIRE/100', cat: 'Entry Package', unit: 'PACK',
                                sp: '35000.00', mrp: '35000.00', dp: '35000.00', center: 'DS0000001', mobile: '09123456789',
                                info: 'DR500.00, MATCHING100.00, UNBV0.00, MLMBBV0.00, CBV0.00, IDR0.00', components: 'WITH COMPONENTS'
                            },
                            {
                                id: 3, code: 'PLATINUM', desc: 'PKG PLATINUM SGB/SAPPHIRE/100', cat: 'Entry Package', unit: 'PACK',
                                sp: '45000.00', mrp: '45000.00', dp: '45000.00', center: 'DS0000001', mobile: '09123456789',
                                info: 'DR500.00, MATCHING100.00, UNBV0.00, MLMBBV0.00, CBV0.00, IDR0.00', components: 'WITH COMPONENTS'
                            },
                            {
                                id: 4, code: 'CSGR', desc: 'CS SILVER', cat: 'Entry Package', unit: 'PACK',
                                sp: '25000.00', mrp: '25000.00', dp: '25000.00', center: 'DS0000001', mobile: '09123456789',
                                info: 'DR500.00, MATCHING100.00, UNBV0.00, MLMBBV0.00, CBV0.00, IDR0.00', components: 'NO COMPONENTS'
                            },
                            {
                                id: 5, code: 'CSGOLD', desc: 'CS GOLD', cat: 'Entry Package', unit: 'PACK',
                                sp: '35000.00', mrp: '35000.00', dp: '35000.00', center: 'DS0000001', mobile: '09123456789',
                                info: 'DR500.00, MATCHING100.00, UNBV0.00, MLMBBV0.00, CBV0.00, IDR0.00', components: 'NO COMPONENTS'
                            }
                        ].map(item => `
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.code}</td>
                                <td>${item.desc}</td>
                                <td>${item.cat}</td>
                                <td>${item.unit}</td>
                                <td>${item.sp}</td>
                                <td>${item.mrp}</td>
                                <td>${item.dp}</td>
                                <td>${item.center}</td>
                                <td>${item.mobile}</td>
                                <td>${item.info}</td>
                                <td>
                                    <span class="badge ${item.components === 'WITH COMPONENTS' ? 'bg-success' : 'bg-danger'}">
                                        ${item.components}
                                    </span>
                                    <button class="btn btn-sm btn-outline-primary ms-2"><i class="fas fa-search"></i></button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 1 to 5 of 14 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">»</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    `;
}

function getAdminItemManageContent() {
    return `
        <div class="container-fluid py-3" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="fw-bold text-dark mb-0">Item Manager</h4>
                <button class="btn btn-primary" onclick="loadAdminModule('add-item')">
                    <i class="fas fa-plus-circle me-2"></i> Add Item
                </button>
            </div>
            ${getAdminItemTableContent()}
        </div>
    `;
}

function getAdminItemSalesReportContent() {
    return `
        <div class="container-fluid bg-white shadow-sm p-4 rounded" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
            <!-- 🔷 Top Summary Section -->
            <div class="row text-white mb-4 g-3">
                <div class="col-md-3 col-12">
                <div class="bg-primary p-3 rounded text-center">
                    <h6 class="mb-1">Month</h6>
                    <h4 class="fw-bold">September 2025</h4>
                </div>
                </div>
                <div class="col-md-3 col-12">
                <div class="bg-primary p-3 rounded text-center">
                    <h6 class="mb-1">Total Sales</h6>
                    <h5 class="fw-bold">698,980.00</h5>
                </div>
                </div>
                <div class="col-md-3 col-12">
                <div class="bg-primary p-3 rounded text-center">
                    <h6 class="mb-1">Total Store Sales</h6>
                    <h5 class="fw-bold">571,500.00</h5>
                </div>
                </div>
                <div class="col-md-3 col-12">
                <div class="bg-primary p-3 rounded text-center">
                    <h6 class="mb-1">Total Personal Sales</h6>
                    <h5 class="fw-bold">127,480.00</h5>
                </div>
                </div>
            </div>

            <!-- 📋 Item Sales Report Table -->
            <h4 class="fw-bold text-dark mb-3">Item Sales Report</h4>

            <!-- Export Buttons -->
            <div class="d-flex flex-wrap gap-2 mb-3">
                <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
                <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
                <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
                <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
                <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
            </div>

            <!-- Controls Row -->
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
                <div>
                <label class="form-label mb-0">Show 
                    <select class="form-select form-select-sm d-inline w-auto">
                    <option selected>5</option>
                    <option>10</option>
                    <option>25</option>
                    </select> entries
                </label>
                </div>
                <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
            </div>

            <!-- Table -->
            <div class="table-responsive">
                <table class="table table-bordered table-striped">
                <thead class="table-light text-dark fw-bold">
                    <tr>
                    <th>#</th>
                    <th>SKU</th>
                    <th>NAME</th>
                    <th>STORE_QTY</th>
                    <th>STORE_AMOUNT</th>
                    <th>PERSONAL_QTY</th>
                    <th>PERSONAL_AMOUNT</th>
                    <th>TOTAL_QTY</th>
                    <th>TOTAL_AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    ${[
                    {id: 1, sku: "PAD SILVER", name: "SILVER", sq: 11, sa: "115,500.00", pq: 20, pa: "70,000.00", tq: 54, ta: "185,500.00"},
                    {id: 2, sku: "PAD GOLD", name: "GOLD", sq: 13, sa: "195,000.00", pq: 8, pa: "56,000.00", tq: 21, ta: "251,000.00"},
                    {id: 3, sku: "PAD PLATINUM", name: "PLATINUM", sq: 8, sa: "200,000.00", pq: 2, pa: "50,000.00", tq: 10, ta: "250,000.00"},
                    {id: 4, sku: "CS SILVER", name: "CS SILVER", sq: 0, sa: "0.00", pq: 1, pa: "1,480.00", tq: 1, ta: "1,480.00"},
                    {id: 5, sku: "CS GOLD", name: "CS GOLD", sq: 0, sa: "0.00", pq: 1, pa: "1,000.00", tq: 1, ta: "1,000.00"}
                    ].map(row => `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row.sku}</td>
                        <td>${row.name}</td>
                        <td>${row.sq}</td>
                        <td>${row.sa}</td>
                        <td>${row.pq}</td>
                        <td>${row.pa}</td>
                        <td>${row.tq}</td>
                        <td>${row.ta}</td>
                    </tr>
                    `).join('')}
                </tbody>
                </table>
            </div>

            <!-- 📈 Footer -->
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
                <small class="text-muted">Showing 1 to 5 of 9 entries</small>
                <nav>
                <ul class="pagination pagination-sm mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">»</a></li>
                </ul>
                </nav>
            </div>
            </div>

    `;
}

/* Activation */
function getAdminActivationSummaryContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🔷 Top Summary Section -->
    <div class="row text-white mb-4 g-3">
      <div class="col-md-3 col-12">
        <div class="bg-primary p-3 rounded text-center">
          <h6 class="mb-1">Total Activation</h6>
          <h4 class="fw-bold">6,670</h4>
        </div>
      </div>
      <div class="col-md-3 col-12">
        <div class="bg-dark p-3 rounded text-center">
          <h6 class="mb-1">Used</h6>
          <h4 class="fw-bold">5,391</h4>
        </div>
      </div>
      <div class="col-md-3 col-12">
        <div class="bg-warning p-3 rounded text-center text-dark">
          <h6 class="mb-1">Inactive</h6>
          <h4 class="fw-bold">0</h4>
        </div>
      </div>
      <div class="col-md-3 col-12">
        <div class="bg-success p-3 rounded text-center">
          <h6 class="mb-1">Active</h6>
          <h4 class="fw-bold">1,279</h4>
        </div>
      </div>
    </div>

    <!-- 📋 Activation Summary Table -->
    <h4 class="fw-bold text-dark mb-3">Activation Summary</h4>

    <!-- Export Buttons -->
    <div class="d-flex flex-wrap gap-2 mb-3">
      <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
      <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
      <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
    </div>

    <!-- Controls Row -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>10</option>
            <option>25</option>
            <option>50</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>Type #</th>
            <th>Type</th>
            <th>Total #</th>
            <th>Voided</th>
            <th>Used</th>
            <th>Active</th>
            <th>Inactive</th>
            <th>PAID</th>
            <th>FS</th>
            <th>CD</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {id: 1, type: "SHADOW", total: 0, voided: 0, used: 0, active: 0, inactive: 0, paid: 0, fs: 0, cd: 0},
            {id: 2, type: "SILVER", total: 3667, voided: 0, used: 3042, active: 625, inactive: 0, paid: 2496, fs: 1241, cd: 10},
            {id: 3, type: "GOLD", total: 1694, voided: 0, used: 1124, active: 570, inactive: 0, paid: 1014, fs: 680, cd: 14},
            {id: 4, type: "PLATINUM", total: 1309, voided: 0, used: 1127, active: 182, inactive: 0, paid: 880, fs: 935, cd: 5}
          ].map(row => `
            <tr>
              <td>${row.id}</td>
              <td>${row.type}</td>
              <td>${row.total}</td>
              <td>${row.voided}</td>
              <td>${row.used}</td>
              <td>${row.active}</td>
              <td>${row.inactive}</td>
              <td>${row.paid}</td>
              <td>${row.fs}</td>
              <td>${row.cd}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 4 of 4 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item disabled"><span class="page-link">»</span></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminActivationSearchContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;"">
    <!-- 🔷 Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="fw-bold text-dark mb-0">Activation Code</h4>
      <button class="btn btn-primary rounded">
        <i class="fas fa-cogs me-2"></i>Configure
      </button>
    </div>

    <!-- 🔍 Controls -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>10</option>
            <option>25</option>
            <option>50</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- 📋 Activation Code Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light text-dark fw-bold text-uppercase">
          <tr>
            <th>CTR#</th>
            <th>TRANS#</th>
            <th>STATUS</th>
            <th>PAYMENT</th>
            <th>TYPE</th>
            <th>CODE</th>
            <th>PIN</th>
            <th>USERID</th>
            <th>USED</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {
              ctr: 2297, trans: 74, status: "USED", payment: "FS", type: "SILVER",
              code: "FSS-1000-2297", pin: "PIN2297", user: "Elaine Pasod[elainepnos]", used: "2020-02-26"
            },
            {
              ctr: 2296, trans: 75, status: "USED", payment: "PD", type: "GOLD",
              code: "FSG-1000-2296", pin: "PIN2296", user: "Gerlie Mondejar[Geramondejar21]", used: "2020-03-01"
            },
            {
              ctr: 2295, trans: 76, status: "USED", payment: "FS", type: "PLATINUM",
              code: "PDS-1021-2295", pin: "PIN2295", user: "ROSITA C CICHOSA[okinawa001]", used: "2020-04-15"
            }
          ].map(row => `
            <tr>
              <td>${row.ctr}</td>
              <td>${row.trans}</td>
              <td>${row.status}</td>
              <td><span class="badge bg-primary">${row.payment}</span></td>
              <td>${row.type}</td>
              <td>${row.code}</td>
              <td>${row.pin}</td>
              <td><span class="badge bg-primary">${row.user}</span></td>
              <td><span class="badge bg-primary">${row.used}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 10 of 112 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminActivationTrackerContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🔷 Top Metrics Section -->
    <div class="container-fluid bg-white shadow-sm p-4 rounded">
        <div class="row g-3">
            <!-- Row 1 -->
            <div class="col-md-4 col-12">
            <div class="card bg-light p-3 text-center">
                <h6 class="text-muted mb-1">Sales (ex. ROAS/Ad)</h6>
                <h5 class="fw-bold text-primary">24,656,000.00 <small>(3.05)</small></h5>
            </div>
            </div>
            <div class="col-md-4 col-12">
            <div class="card bg-light p-3 text-center">
                <h6 class="text-muted mb-1">BV</h6>
                <h5 class="fw-bold text-primary">70,000.00</h5>
            </div>
            </div>
            <div class="col-md-4 col-12">
            <div class="card bg-light p-3 text-center">
                <h6 class="text-muted mb-1">Dp Cost</h6>
                <h5 class="fw-bold text-primary">7,764,980.00</h5>
            </div>
            </div>

            <!-- Row 2 -->
            <div class="col-md-4 col-12">
            <div class="card bg-light p-3 text-center">
                <h6 class="text-muted mb-1">Gross Profit</h6>
                <h5 class="fw-bold text-primary">16,791,020.00 <small>(65.83/83.33%)</small></h5>
            </div>
            </div>
            <div class="col-md-4 col-12">
            <div class="card bg-light p-3 text-center">
                <h6 class="text-muted mb-1">Estimated Product Costs (20%)</h6>
                <h5 class="fw-bold text-danger">10,230.00</h5>
            </div>
            </div>
            <div class="col-md-4 col-12">
            <div class="card bg-light p-3 text-center">
                <h6 class="text-muted mb-1">Net Profit</h6>
                <h5 class="fw-bold text-primary">16,759,070.00 <small>(62.92%)</small></h5>
            </div>
            </div>
        </div>
        </div>


    <!-- 📋 Activation Code Payout History Table -->
    <h4 class="fw-bold text-dark mb-3">Activation Code Payout History</h4>

    <!-- Export Buttons -->
    <div class="d-flex flex-wrap gap-2 mb-3">
      <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
      <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
      <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
      <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
    </div>

    <!-- Controls Row -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 gap-2">
      <div>
        <label class="form-label mb-0">Show 
          <select class="form-select form-select-sm d-inline w-auto">
            <option selected>5</option>
            <option>10</option>
            <option>25</option>
          </select> entries
        </label>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-striped">
        <thead class="table-light text-dark fw-bold text-uppercase">
          <tr>
            <th>CT #</th>
            <th>Registered</th>
            <th>Name</th>
            <th>Price</th>
            <th>BV</th>
            <th>Payout</th>
            <th>IR</th>
            <th>Remarker</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {
              ct: "1", date: "25-Apr-2023", name: "MARC PEREZ (COACHMARC)",
              price: "7,800.00", bv: "20", payout: "2,340.00",
              ir: "1.1 BENJAMIN ORDOÑO (BENJAMIN)",
              remarker: "1.1 BENJAMIN ORDOÑO (BENJAMIN) → 1.1.1 JONAVEN JUMAWAN (JONAVEN)"
            },
            {
              ct: "2", date: "26-Apr-2023", name: "JANE DOE (JANED)",
              price: "10,500.00", bv: "25", payout: "3,200.00",
              ir: "1.2 JOHN SMITH (JOHNS)",
              remarker: "1.2 JOHN SMITH (JOHNS) → 1.2.1 LISA RAY (LISAR)"
            }
          ].map(row => `
            <tr>
              <td>${row.ct}</td>
              <td>${row.date}</td>
              <td>${row.name}</td>
              <td>${row.price}</td>
              <td>${row.bv}</td>
              <td>${row.payout}</td>
              <td>${row.ir}</td>
              <td>${row.remarker}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 5 of 3185 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}


/* eWallet */
function getAdminWalletBalanceSummaryContent() {
  return `
  <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🔷 Summary Cards -->
    <div class="row g-3 mb-4">
      ${[
        {label: "Total Wallet", value: "PHP 13,080,220.88"},
        {label: "Withdrawals", value: "PHP 10,269,828.57"},
        {label: "Available", value: "PHP 2,810,392.30"}
      ].map(card => `
        <div class="col-md-4 col-12">
          <div class="card bg-light p-3 text-center">
            <h6 class="text-muted mb-1">${card.label}</h6>
            <h4 class="fw-bold text-primary">${card.value}</h4>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- 📊 Wallet Summary Section -->
    <h4 class="fw-bold mb-3">Wallet Summary</h4>

    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center flex-wrap mb-3 gap-2">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
        <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
        <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- 📋 Wallet Table -->
    <div class="table-responsive">
    <table class="table table-hover table-bordered">
        <thead class="table-light text-dark fw-bold">
        <tr>
            <th>ID #</th>
            <th>Account</th>
            <th>Rebates</th>
            <th>Total Debit</th>
            <th>Balance</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        ${[
            {id: 1, account: "GUILD GRINDERS[GUILD001]", rebates: "0.00", debit: "0.00", balance: "13,044,078.00"},
            {id: 2, account: "GUILD GRINDERS[GUILD002]", rebates: "948.01", debit: "0.00", balance: "948.01"},
            {id: 3, account: "GUILD GRINDERS[GUILD003]", rebates: "5.00", debit: "0.00", balance: "5.00"},
            {id: 4, account: "GUILD GRINDERS[GUILD004]", rebates: "5.00", debit: "0.00", balance: "5.00"},
            {id: 5, account: "GUILD GRINDERS[GUILD006]", rebates: "5.00", debit: "0.00", balance: "5.00"}
        ].map(row => `
            <tr>
            <td>${row.id}</td>
            <td>${row.account}</td>
            <td>${row.rebates}</td>
            <td>${row.debit}</td>
            <td>${row.balance}</td>
            <td>
                <button class="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
                title="View Profile"
                style="width: 32px; height: 32px; background-color: #f8cba6;">
                <i class="bi bi-person-fill text-white"></i>
                </button>
            </td>
            </tr>
        `).join('')}
        </tbody>
    </table>
    </div>


    <!-- 🔁 Pagination -->
    <div class="d-flex justify-content-end mt-3">
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminWalletCreditHistoryContent() {
  return `
  <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🧱 Summary Cards -->
    <div class="row row-cols-1 row-cols-md-2 g-3 mb-4">
      <div class="col">
        <div class="card bg-light p-3 text-center">
          <h6 class="text-muted mb-1">Credit History</h6>
          <h4 class="fw-bold text-primary">PHP 13,080,220.88</h4>
        </div>
      </div>
      <div class="col">
        <div class="card bg-light p-3 text-center">
          <h6 class="text-muted mb-1">PHP Transactions</h6>
          <h4 class="fw-bold text-primary">PHP 2,656,404.67</h4>
        </div>
      </div>
    </div>

    <!-- 📋 Table Section -->
    <h4 class="fw-bold mb-3">eWallet Credit History</h4>

    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center flex-wrap mb-3 gap-2">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
        <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
        <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>EXP</th>
            <th>Date</th>
            <th>Account</th>
            <th>Remarks</th>
            <th>Credit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {
              id: 1,
              date: "2023-07-21 17:56:25",
              account: "ROWENA ALBARAN (SARAU)",
              remarks: ["[500] Direct Referral Bonus"],
              credit: "₱500.00"
            },
            {
              id: 2,
              date: "2023-07-21 17:56:25",
              account: "ROWENA ALBARAN (SARAU)",
              remarks: [
                "CHANGE UPLINE",
                "GCASH DEPOSIT",
                "POKER DEPOSIT/BOUNTY/BONUS/BUTAL BONUS ROROBON01",
                "POKER_JACKPOT/STARTER",
                "POKER_JACKPOT/STARTER/BUTAL BONUS ROROBON01"
              ],
              credit: "₱2,000.00"
            },
            {
              id: 5,
              date: "2025-07-21 19:25:04",
              account: "WOMEN IN AGRIBUSINESS (WIA)",
              remarks: [
                "CONFLICT_JOBCREATORSHIP",
                "POLICY BRAND/CompanyPreferred Sonus GLOBAL01",
                "97200",
                "CHANGE-FARMING",
                "NAMESEARCH",
                "ACCOUNT_JOBCREATORSHIP",
                "POLICY BRAND/CompanySalesMatch from GLOBAL01"
              ],
              credit: "₱97,200.00"
            },
            {
              id: 7,
              date: "2025-07-21 19:25:15",
              account: "CLARK KENNETH-CEO DIRECTOR (SHAREHOLDER)",
              remarks: [
                "CONFLICT_leadership",
                "NAMESEARCH",
                "ACCOUNT_JOBCREATORSHIP",
                "POLICY BRAND/CompanyPreferred Sonus GLOBAL01 Bonus from GLOBAL01"
              ],
              credit: "₱97,200.00"
            },
            {
              id: 8,
              date: "2025-07-21 19:25:21",
              account: "GEORGE WILLIAM III (SHAREHOLDER)",
              remarks: [
                "[5000 Direct Referral Bonus]",
                "CHANGE-BANK",
                "NAMESEARCH",
                "ACCOUNT_JOCR",
                "POLICY BRAND/CompanyPreferred Sonus II NE020"
              ],
              credit: "₱45,000.00"
            }
          ].map(row => `
            <tr>
              <td>${row.id}</td>
              <td>${row.date}</td>
              <td>${row.account}</td>
              <td>
                <ul class="mb-0 ps-3">
                  ${row.remarks.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </td>
              <td>${row.credit}</td>
              <td>
                <button class="btn btn-sm btn-danger" title="Remove">
                  <i class="bi bi-x-circle"></i>
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 🔁 Pagination -->
    <div class="d-flex justify-content-end mt-3">
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminWalletDebitHistoryContent() {
  return `
  <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
    <!-- 🧱 Summary Cards -->
    <div class="row row-cols-1 row-cols-md-2 g-3 mb-4">
      <div class="col">
        <div class="card bg-light p-3 text-center">
          <h6 class="text-muted mb-1">Debit History</h6>
          <h4 class="fw-bold text-primary">PHP 10,272,414.57</h4>
        </div>
      </div>
      <div class="col">
        <div class="card bg-light p-3 text-center">
          <h6 class="text-muted mb-1">PSP Transactions</h6>
          <h4 class="fw-bold text-primary">PHP 2,656,404.67</h4>
        </div>
      </div>
    </div>

    <!-- 📋 Table Section -->
    <h4 class="fw-bold mb-3">eWallet Debit History</h4>

    <!-- Toolbar -->
    <div class="d-flex justify-content-between align-items-center flex-wrap mb-3 gap-2">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
        <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
        <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
      </div>
      <input type="text" class="form-control form-control-sm w-100 w-md-25 rounded" placeholder="Search:" />
    </div>

    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover table-bordered">
        <thead class="table-light text-dark fw-bold">
          <tr>
            <th>ID#</th>
            <th>Date</th>
            <th>Account</th>
            <th>Remarks</th>
            <th>Debit</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${[
            {
              id: 36,
              date: "2023-07-28",
              account: "ROMEL P. ABUNDA",
              remarks: [
                "[GGR-F2F-PAYOUT]",
                "NAME: ROMEL P. ABUNDA",
                "CN: NAIA-GGR-07-28-23",
                "AMOUNT: PHP 2,000.00",
                "FROM: GGROUP/SALES MATCH",
                "TO: ROMEL P. ABUNDA"
              ],
              debit: "PHP 2,000.00",
              status: "CLAIMED"
            },
            {
              id: 37,
              date: "2023-07-28",
              account: "ROMEL P. ABUNDA",
              remarks: [
                "[GGR-F2F-PAYOUT]",
                "NAME: ROMEL P. ABUNDA",
                "CN: NAIA-GGR-07-28-23",
                "AMOUNT: PHP 1,000.00",
                "TRANSFERRED FROM: GGROUP/SALES MATCH",
                "FROM: GGROUP"
              ],
              debit: "PHP 1,000.00",
              status: "PROCESSED"
            },
            {
              id: 42,
              date: "2023-07-28",
              account: "GOLDI GINGERS GOLDELICIOUS",
              remarks: [
                "[GGR-F2F-PAYOUT]",
                "NAME: GOLDI GINGERS GOLDELICIOUS",
                "CN: NAIA-GGR-07-28-23",
                "AMOUNT: PHP 1,000.00",
                "TRANSFERRED FROM: GGROUP/SALES MATCH",
                "FROM: GGROUP"
              ],
              debit: "PHP 1,000.00",
              status: "CLAIMED"
            },
            {
              id: 46,
              date: "2023-05-26 19:26:58",
              account: "GUILD GINDERS (GUILD04)",
              remarks: [
                "CHANNEL: 2PP-OUT",
                "NAME: GUILD04",
                "ACCOUNT_ID: GUILD04",
                "TYPE: credit",
                "POLICY BRANCH: CompanyAUTO-AUTO",
                "TRANSFERRED FROM GUILD04: 2PP-OUT Bonus Gm: GUILD04"
              ],
              debit: "PHP 2,920.00",
              status: "PROCESSED"
            },
            {
              id: 45,
              date: "2023-05-26 19:26:58",
              account: "Cynthia Do (Socom) (ChrisCodes001)",
              remarks: [
                "CHANNEL: 2PP-OUT",
                "NAME: ChrisCodes001",
                "ACCOUNT_ID: ChrisCodes001",
                "TYPE: credit",
                "POLICY BRANCH: CompanyAUTO-AUTO",
                "TRANSFERRED Bonus ChrisCodes001"
              ],
              debit: "PHP 4,500.00",
              status: "DELETE"
            }
          ].map(row => `
            <tr>
              <td>${row.id}</td>
              <td>${row.date}</td>
              <td>${row.account}</td>
              <td>
                <ul class="mb-0 ps-3">
                  ${row.remarks.map(r => `<li>${r}</li>`).join('')}
                </ul>
              </td>
              <td class="text-end">${row.debit}</td>
              <td>
                <button class="btn btn-sm ${row.status === 'CLAIMED' ? 'btn-success' : row.status === 'PROCESSED' ? 'btn-success' : 'btn-danger'}">
                  ${row.status}
                </button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 🔁 Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
      <small class="text-muted">Showing 1 to 5 of 8,061 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#">5</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function getAdminWalletDebitProcessContent() {
    return `
        <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
            <!-- 🧱 Toolbar -->
            <div class="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-2">
            <div class="d-flex flex-wrap gap-2">
                <h4 class="fw-bold mb-0">Process Vouchers/Withdrawals</h4>
                <button class="btn btn-primary btn-sm">+ Process Withdrawals</button>
                <select class="form-select form-select-sm w-auto">
                <option selected>10 entries per page</option>
                <option>25</option>
                <option>50</option>
                </select>
            </div>
            <div class="d-flex align-items-center gap-2">
                <span class="fw-bold text-success">Total: 10,971.00</span>
                <input type="text" class="form-control form-control-sm rounded" placeholder="Search:" />
            </div>
            </div>

            <!-- 📋 Table -->
            <div class="table-responsive">
            <table class="table table-hover table-bordered">
                <thead class="table-light text-dark fw-bold">
                <tr>
                    <th>Ctrl#</th>
                    <th>User</th>
                    <th>PinCode</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Remarks</th>
                    <th class="text-end">Gross</th>
                    <th class="text-end">Fee</th>
                    <th class="text-end">Admin</th>
                    <th class="text-end">Tax</th>
                    <th class="text-end">Net</th>
                </tr>
                </thead>
                <tbody>
                ${[
                    {
                    id: 25804,
                    user: "Jesster Recadio (jesster)",
                    pin: "V9C3Pz-wuycomA",
                    date: "2023-05-03 12:42:42",
                    status: "In Process",
                    remarks: [
                        "CHANNEL: CASH",
                        "NAME: Jesster Recadio",
                        "AMOUNT: 12400.00",
                        "REMARKS: JessterRecadioCASH",
                        "TYPE: CASH"
                    ],
                    gross: "12400",
                    fee: "0",
                    admin: "0",
                    tax: "0",
                    net: "12400"
                    },
                    {
                    id: 25803,
                    user: "Editha Valenzuela (edzchui21)",
                    pin: "F2nm7c-dFy3FgF",
                    date: "2023-05-03 12:41:44",
                    status: "In Process",
                    remarks: [
                        "CHANNEL: GOTIME",
                        "NAME: Editha Valenzuela",
                        "AMOUNT: 10000.00",
                        "REMARKS: EdithaValenzuelaGOTIME",
                        "TYPE: GOTIME"
                    ],
                    gross: "10000",
                    fee: "0",
                    admin: "0",
                    tax: "0",
                    net: "10000"
                    },
                    {
                    id: 586840,
                    user: "Ronald Cenojales (CenojalesR)",
                    pin: "C3yFhg7JoNwke",
                    date: "2023-09-03 13:22:28",
                    status: "In Process",
                    remarks: [
                        "CHANNEL: 6GOTME",
                        "NAME: Ronald Cenojales",
                        "ACCOUNT: JJC0923R6745",
                        "PICKUP BRANCH: 6GOTME",
                        "TYPE: CGASH"
                    ],
                    gross: "0.00",
                    fee: "0.00",
                    admin: "0.00",
                    tax: "0.00",
                    net: "0.00"
                    }
                ].map(row => `
                    <tr>
                    <td>${row.id}</td>
                    <td>${row.user}</td>
                    <td>${row.pin}</td>
                    <td>${row.date}</td>
                    <td>
                        <div class="d-flex flex-column gap-1">
                        <button class="btn btn-sm btn-warning text-white">SET TO CLAIMED</button>
                        <button class="btn btn-sm btn-primary">For Process</button>
                        </div>
                    </td>
                    <td>
                        <ul class="mb-0 ps-3">
                        ${row.remarks.map(r => `<li>${r}</li>`).join('')}
                        </ul>
                    </td>
                    <td class="text-end">${row.gross}</td>
                    <td class="text-end">${row.fee}</td>
                    <td class="text-end">${row.admin}</td>
                    <td class="text-end">${row.tax}</td>
                    <td class="text-end">${row.net}</td>
                    </tr>

                    <!-- 🧾 Modal -->
                    <div class="modal fade" id="claimModal-${row.id}" tabindex="-1" aria-labelledby="claimModalLabel-${row.id}" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="claimModalLabel-${row.id}">Set Voucher to Claimed?</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            This will set the VOUCHER <strong>${row.id}</strong> to CLAIMED STATUS, meaning that this is already claimed.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No, cancel pls!</button>
                            <button type="button" class="btn btn-primary">Yes!</button>
                        </div>
                        </div>
                    </div>
                    </div>
                `).join('')}
                </tbody>
            </table>
            </div>

            <!-- 🔁 Pagination -->
            <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
            <small class="text-muted">Showing 1 to 6 of 6 entries</small>
            <nav>
                <ul class="pagination pagination-sm mb-0">
                <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">»</a></li>
                </ul>
            </nav>
            </div>
        </div>
    `;
}
function getAdminWalletDebitProcessCdContent() {
  const rows = [
    {
      id: 25804,
      user: "Jesster Recadio (jesster)",
      pin: "V9C3Pz-wuycomA",
      date: "2023-05-03 12:42:42",
      remarks: [
        "CHANNEL: CASH",
        "NAME: Jesster Recadio",
        "AMOUNT: 12400.00",
        "REMARKS: JessterRecadioCASH",
        "TYPE: CASH"
      ],
      gross: "12400",
      fee: "0",
      admin: "0",
      tax: "0",
      net: "12400"
    },
    {
      id: 25803,
      user: "Editha Valenzuela (edzchui21)",
      pin: "F2nm7c-dFy3FgF",
      date: "2023-05-03 12:41:44",
      remarks: [
        "CHANNEL: GOTIME",
        "NAME: Editha Valenzuela",
        "AMOUNT: 10000.00",
        "REMARKS: EdithaValenzuelaGOTIME",
        "TYPE: GOTIME"
      ],
      gross: "10000",
      fee: "0",
      admin: "0",
      tax: "0",
      net: "10000"
    },
    {
      id: 25805,
      user: "Luciana Lilo (lilowarrior)",
      pin: "yF52k1-W4FJmM",
      date: "2023-05-03 12:40:42",
      remarks: [
        "CHANNEL: GOTIME",
        "NAME: Luciana Lilo",
        "AMOUNT: 10000.00",
        "REMARKS: LucianaLiloGOTIME",
        "TYPE: GOTIME"
      ],
      gross: "10000",
      fee: "0",
      admin: "0",
      tax: "0",
      net: "10000"
    },
    {
      id: 25806,
      user: "Ronald Cangipe (ronaldcangipe)",
      pin: "5F3kFy-AhWke",
      date: "2023-05-03 12:39:41",
      remarks: [
        "CHANNEL: GOTIME",
        "NAME: Ronald Cangipe",
        "AMOUNT: 10000.00",
        "REMARKS: RonaldCangipeGOTIME",
        "TYPE: GOTIME"
      ],
      gross: "10000",
      fee: "0",
      admin: "0",
      tax: "0",
      net: "10000"
    },
    {
      id: 25807,
      user: "Susano Gocoton (gocotonsusano1)",
      pin: "fH5rH1vn5tGwC",
      date: "2023-09-03 13:22:28",
      remarks: [
        "CHANNEL: 6GOTME",
        "NAME: Susano Gocoton",
        "ACCOUNT: JJC0923R6745",
        "PICKUP BRANCH: 6GOTME",
        "TYPE: CGASH"
      ],
      gross: "0.00",
      fee: "0.00",
      admin: "0.00",
      tax: "0.00",
      net: "0.00"
    },
    {
      id: 25808,
      user: "Edward Esag (esag3)",
      pin: "V6dzN7z-ubmrrZ8E",
      date: "2023-09-03 13:22:28",
      remarks: [
        "CHANNEL: 6GOTME",
        "NAME: Edward Esag",
        "ACCOUNT: JJC0923R6745",
        "PICKUP BRANCH: 6GOTME",
        "TYPE: CGASH"
      ],
      gross: "0.00",
      fee: "0.00",
      admin: "0.00",
      tax: "0.00",
      net: "0.00"
    },
    {
      id: 25809,
      user: "Master Recado (masterrecado)",
      pin: "V3CP3-wuyocmA",
      date: "2023-03-03",
      remarks: [
        "CHANNEL: CASH",
        "NAME: Master Recado",
        "AMOUNT: 12400",
        "REMARKS: MasterRecadoCASH",
        "TYPE: CASH"
      ],
      gross: "12400",
      fee: "0",
      admin: "0",
      tax: "0",
      net: "12400"
    }
  ];

  const tableRows = rows.map(row => `
    <tr>
      <td>${row.id}</td>
      <td>${row.user}</td>
      <td>${row.pin}</td>
      <td>${row.date}</td>
      <td>
        <div class="d-flex flex-column gap-1">
          <button class="btn btn-sm btn-warning text-white">SET TO CLAIMED</button>
          <button class="btn btn-sm btn-primary">For Process</button>
        </div>
      </td>
      <td>
        <ul class="mb-0 ps-3">
          ${row.remarks.map(r => `<li>${r}</li>`).join("")}
        </ul>
      </td>
      <td class="text-end">${row.gross}</td>
      <td class="text-end">${row.fee}</td>
      <td class="text-end">${row.admin}</td>
      <td class="text-end">${row.tax}</td>
      <td class="text-end">${row.net}</td>
    </tr>
  `).join("");

  return `
    <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
      <div class="d-flex justify-content-between align-items-center flex-wrap mb-4 gap-2">
        <div class="d-flex flex-wrap gap-2">
          <h4 class="fw-bold mb-0">Process Vouchers/Withdrawals</h4>
          <button class="btn btn-primary btn-sm">+ Process Withdrawals</button>
          <select class="form-select form-select-sm w-auto">
            <option selected>10 entries per page</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="fw-bold text-success">Total: 10,971.00</span>
          <input type="text" class="form-control form-control-sm rounded" placeholder="Search:" />
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead class="table-light text-dark fw-bold">
            <tr>
              <th>Ctrl#</th>
              <th>User</th>
              <th>PinCode</th>
              <th>Date</th>
              <th>Status</th>
              <th>Remarks</th>
              <th class="text-end">Gross</th>
              <th class="text-end">Fee</th>
              <th class="text-end">Admin</th>
              <th class="text-end">Tax</th>
              <th class="text-end">Net</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        <small class="text-muted">Showing 1 to ${rows.length} of ${rows.length} entries</small>
        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
          </ul>
        </nav>
      </div>
    </div>
  `;
}

function getAdminWalletDebitSummaryContent() {
  const data = [
    {
      sqa: 1,
      trans: 362,
      date: "2023-05-10 12:00:01",
      user: "GGJUB01",
      gross: 72040.00,
      mf: 10200.00,
      admin: 1020.00,
      tax: 1020.00,
      tf: 720.40,
      net: 59079.60,
      claimed: 0.00,
      pending: 59079.60
    },
    {
      sqa: 2,
      trans: 363,
      date: "2023-05-11 14:22:10",
      user: "GGJLD01",
      gross: 50000.00,
      mf: 8000.00,
      admin: 500.00,
      tax: 500.00,
      tf: 500.00,
      net: 40500.00,
      claimed: 10000.00,
      pending: 30500.00
    }
  ];

  const formatMoney = val => parseFloat(val).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const tableRows = data.map(row => `
    <tr>
      <td>${row.sqa}</td>
      <td>${row.trans}</td>
      <td>${row.date}</td>
      <td>${row.user}</td>
      <td class="text-end">${formatMoney(row.gross)}</td>
      <td class="text-end">${formatMoney(row.mf)}</td>
      <td class="text-end">${formatMoney(row.admin)}</td>
      <td class="text-end">${formatMoney(row.tax)}</td>
      <td class="text-end">${formatMoney(row.tf)}</td>
      <td class="text-end">${formatMoney(row.net)}</td>
      <td class="text-end">${formatMoney(row.claimed)}</td>
      <td class="text-end">${formatMoney(row.pending)}</td>
      <td>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-outline-primary" aria-label="View"><i class="bi bi-eye"></i></button>
          <button class="btn btn-sm btn-outline-success" aria-label="Edit"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" aria-label="Delete"><i class="bi bi-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join("");

  return `
    <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
      <!-- 📌 Header -->
      <h4 class="fw-bold mb-3">Voucher/Withdrawal Summary</h4>

      <!-- 🧰 Toolbar -->
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-light btn-sm fw-bold">Copy</button>
          <button class="btn btn-light btn-sm fw-bold">Export CSV</button>
          <button class="btn btn-light btn-sm fw-bold">Export Excel</button>
          <button class="btn btn-light btn-sm fw-bold">Export PDF</button>
          <button class="btn btn-light btn-sm fw-bold">Print</button>
        </div>
        <div class="d-flex align-items-center gap-2">
          <label class="form-label mb-0">Search:</label>
          <input type="text" class="form-control form-control-sm" aria-label="Search transactions">
        </div>
      </div>

      <!-- 📊 Table -->
      <div class="table-responsive">
        <table class="table table-hover table-bordered">
          <thead class="table-light fw-bold">
            <tr>
              <th>SQA#</th>
              <th>TRANS#</th>
              <th>DATE</th>
              <th>USER</th>
              <th class="text-end">GROSS</th>
              <th class="text-end">MFEE</th>
              <th class="text-end">ADMIN</th>
              <th class="text-end">TAX</th>
              <th class="text-end">TFEE</th>
              <th class="text-end">NET</th>
              <th class="text-end">CLAIMED</th>
              <th class="text-end">PENDING</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>

      <!-- 🔁 Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        <small class="text-muted">Showing 1 to ${data.length} of 123 entries</small>
        <nav>
          <ul class="pagination pagination-sm mb-0 justify-content-end">
            <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
            <li class="page-item active"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">»</a></li>
          </ul>
        </nav>
      </div>
    </div>
  `;
}


/* Configurations */
function getAdminSettingsCategoryContent() {
  const data = [
    { id: 1, code: "PRODLINE", name: "Product Lines", desc: "Product Lines" },
    { id: 2, code: "ENTRYPACK", name: "Entry Package", desc: "Entry Package" },
    { id: 3, code: "STOREPACK", name: "Store/Stockist Packages", desc: "Store/Stockist Packages" },
    { id: 4, code: "UNILEVPACK", name: "Loose Product Packages", desc: "Loose Product Packages" },
    { id: 5, code: "ITEMS", name: "Items", desc: "Items for Inventory" }
  ];

  const getCategoryHeader = () => `
    <h4 class="fw-bold mb-3">Category</h4>
  `;

  const getCategoryToolbar = () => `
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
      <div>
        <select class="form-select form-select-sm" aria-label="Entries per page">
          <option selected>10 entries per page</option>
          <option>25 entries per page</option>
          <option>50 entries per page</option>
        </select>
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="form-label mb-0">Search:</label>
        <input type="text" class="form-control form-control-sm" aria-label="Search categories">
      </div>
    </div>
  `;

  const getCategoryTable = (data) => {
    const rows = data.map(row => `
      <tr>
        <td class="text-center">${row.id}</td>
        <td>${row.code}</td>
        <td>${row.name}</td>
        <td>${row.desc}</td>
      </tr>
    `).join("");

    return `
      <div class="table-responsive">
        <table class="table table-hover table-striped table-bordered">
          <thead class="table-light fw-bold">
            <tr>
              <th class="text-center">ID</th>
              <th>CODE</th>
              <th>NAME</th>
              <th>DESC</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  };

  const getCategoryPagination = (currentPage = 1, totalPages = 1) => `
    <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
      <small class="text-muted">Showing 1 to ${data.length} of ${data.length} entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0 justify-content-end">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">${currentPage}</a></li>
          <li class="page-item disabled"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  `;

  return `
    <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
      ${getCategoryHeader()}
      ${getCategoryToolbar()}
      ${getCategoryTable(data)}
      ${getCategoryPagination()}
    </div>
  `;
}

function getAdminSettingsPayoutContent() {
  const data = [
    { id: 1, type: "BDO", code: "9004", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 2, type: "BPI", code: "9005", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 3, type: "MBTC", code: "9006", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 4, type: "SBC", code: "9007", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 5, type: "PSBANK", code: "9008", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 6, type: "CHINABANK", code: "9009", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 7, type: "EASTWEST", code: "9010", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 8, type: "UCPB", code: "9011", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 9, type: "AUB", code: "8013", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "ACTIVE" },
    { id: 10, type: "PALAWAN", code: "9003", remarks: "60 Fee", min: 500.00, max: 100000.00, admin: 10000.00, withdrawal: 0.00, tax: 0.00, status: "INACTIVE" }
  ];

  const formatMoney = val => parseFloat(val).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const getPayoutHeader = () => `
    <h4 class="fw-bold mb-3">Payout Options</h4>
  `;

  const getPayoutToolbar = () => `
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
      <div>
        <select class="form-select form-select-sm" aria-label="Entries per page">
          <option selected>10 entries per page</option>
          <option>25 entries per page</option>
          <option>50 entries per page</option>
        </select>
      </div>
      <div class="d-flex align-items-center gap-2">
        <label class="form-label mb-0">Search:</label>
        <input type="text" class="form-control form-control-sm" aria-label="Search payout options">
      </div>
    </div>
  `;

  const getPayoutTable = (data) => {
    const rows = data.map(row => `
      <tr>
        <td class="text-center">${row.id}</td>
        <td>${row.type}</td>
        <td>${row.code}</td>
        <td>${row.remarks}</td>
        <td class="text-center">${formatMoney(row.min)}</td>
        <td class="text-center">${formatMoney(row.max)}</td>
        <td class="text-center">${formatMoney(row.admin)}</td>
        <td class="text-center">${formatMoney(row.withdrawal)}</td>
        <td class="text-center">${formatMoney(row.tax)}</td>
        <td>
          <span class="badge ${row.status === "ACTIVE" ? "bg-success" : "bg-warning text-dark"} rounded-pill px-3 py-1">
            ${row.status}
          </span>
        </td>
      </tr>
    `).join("");

    return `
      <div class="table-responsive">
        <table class="table table-hover table-striped table-bordered">
          <thead class="table-light fw-bold text-uppercase">
            <tr>
              <th class="text-center">ID#</th>
              <th>Type</th>
              <th>Code</th>
              <th>Remarks</th>
              <th class="text-center">Min</th>
              <th class="text-center">Max</th>
              <th class="text-center">Admin</th>
              <th class="text-center">Withdrawal</th>
              <th class="text-center">Tax</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  };

  const getPayoutPagination = (currentPage = 1, totalPages = 2) => `
    <div class="d-flex justify-content-between align-items-center mt-3 flex-wrap">
      <small class="text-muted">Showing 1 to 10 of 19 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0 justify-content-end">
          <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="#">«</a>
          </li>
          ${Array.from({ length: totalPages }, (_, i) => `
            <li class="page-item ${currentPage === i + 1 ? "active" : ""}">
              <a class="page-link" href="#">${i + 1}</a>
            </li>
          `).join("")}
          <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="#">»</a>
          </li>
        </ul>
      </nav>
    </div>
  `;

  return `
    <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
      <div class="card bg-white shadow-sm rounded-3 p-3">
        ${getPayoutHeader()}
        ${getPayoutToolbar()}
        ${getPayoutTable(data)}
        ${getPayoutPagination()}
      </div>
    </div>
  `;
}

function getAdminSettingsPackageContent() {
  let data = [
    { id: 1, userType: "SHADOW", product: "SILVER", price: 3500.00, cdPrice: 3500, pairing: 0.00, bv: 10.00, maxCycle: 10, maxPoints: 1250.00 },
    { id: 2, userType: "SILVER", product: "SILVER", price: 3500.00, cdPrice: 3500, pairing: 0.00, bv: 10.00, maxCycle: 10, maxPoints: 1250.00 },
    { id: 3, userType: "GOLD", product: "GOLD", price: 10500.00, cdPrice: 10500, pairing: 350.00, bv: 30.00, maxCycle: 30, maxPoints: 4000.00 },
    { id: 4, userType: "PLATINUM", product: "PLATINUM", price: 20500.00, cdPrice: 20500, pairing: 1050.00, bv: 50.00, maxCycle: 50, maxPoints: 8000.00 }
  ];

  let currentPage = 1;
  const rowsPerPage = 5;

  const formatMoney = val => parseFloat(val).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const getPackageHeader = () => `
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="fw-bold">Package Settings</h4>
      <button class="btn btn-success btn-sm" onclick="addPackageRow()">
        <i class="bi bi-plus-circle"></i> Add Package
      </button>
    </div>
  `;

  const getPackageTable = () => {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    const rows = pageData.map(pkg => getPackageRow(pkg)).join("");

    return `
      <div class="table-responsive">
        <table class="table table-hover table-striped table-bordered">
          <thead class="table-light fw-bold text-uppercase">
            <tr>
              <th class="text-center">ID</th>
              <th>User Type</th>
              <th>Linked Product</th>
              <th class="text-end">Price</th>
              <th class="text-end">CD Price</th>
              <th class="text-end">Base Pairing</th>
              <th class="text-end">Base BV</th>
              <th class="text-end">Max Cycle Pair</th>
              <th class="text-end">Max Level Points</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      ${getPagination()}
    `;
  };

  const getPackageRow = (pkg) => `
    <tr id="row-${pkg.id}">
      <td class="text-center">${pkg.id}</td>
      <td contenteditable="true">${pkg.userType}</td>
      <td contenteditable="true">${pkg.product}</td>
      <td class="text-end" contenteditable="true">${formatMoney(pkg.price)}</td>
      <td class="text-end" contenteditable="true">${formatMoney(pkg.cdPrice)}</td>
      <td class="text-end" contenteditable="true">${formatMoney(pkg.pairing)}</td>
      <td class="text-end" contenteditable="true">${formatMoney(pkg.bv)}</td>
      <td class="text-end" contenteditable="true">${pkg.maxCycle}</td>
      <td class="text-end" contenteditable="true">${formatMoney(pkg.maxPoints)}</td>
      <td class="text-center">
        <button class="btn btn-sm btn-primary" onclick="saveRow(${pkg.id})">
          <i class="bi bi-save"></i>
        </button>
        <button class="btn btn-sm btn-danger" onclick="deleteRow(${pkg.id})">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  `;

  const getPagination = () => {
    const totalPages = Math.ceil(data.length / rowsPerPage);

    let buttons = "";
    for (let i = 1; i <= totalPages; i++) {
      buttons += `
        <button class="btn btn-sm ${i === currentPage ? "btn-primary" : "btn-outline-primary"} me-1" onclick="goToPage(${i})">
          ${i}
        </button>
      `;
    }

    return `
      <div class="d-flex justify-content-center mt-3">
        ${buttons}
      </div>
    `;
  };

  // Attach helper functions globally
  window.goToPage = (page) => {
    currentPage = page;
    render();
  };

  window.addPackageRow = () => {
    const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    data.push({ id: newId, userType: "NEW", product: "NEW", price: 0, cdPrice: 0, pairing: 0, bv: 0, maxCycle: 0, maxPoints: 0 });
    render();
  };

  window.deleteRow = (id) => {
    data = data.filter(pkg => pkg.id !== id);
    render();
  };

  window.saveRow = (id) => {
    const row = document.querySelector(`#row-${id}`);
    const cells = row.querySelectorAll("td");

    data = data.map(pkg => {
      if (pkg.id === id) {
        return {
          id: id,
          userType: cells[1].innerText,
          product: cells[2].innerText,
          price: parseFloat(cells[3].innerText.replace(/,/g, "")) || 0,
          cdPrice: parseFloat(cells[4].innerText.replace(/,/g, "")) || 0,
          pairing: parseFloat(cells[5].innerText.replace(/,/g, "")) || 0,
          bv: parseFloat(cells[6].innerText.replace(/,/g, "")) || 0,
          maxCycle: parseInt(cells[7].innerText) || 0,
          maxPoints: parseFloat(cells[8].innerText.replace(/,/g, "")) || 0,
        };
      }
      return pkg;
    });

    render();
  };

  function render() {
    document.getElementById("admin-settings-container").innerHTML = `
      <div class="container-fluid py-4" style="background-color: #ffffff; padding: 3rem; border-radius: 1rem;">
        <div class="card bg-white shadow-sm rounded-3 p-3">
          ${getPackageHeader()}
          ${getPackageTable()}
        </div>
      </div>
    `;
  }

  // Initial render
  setTimeout(render, 0);
  return `<div id="admin-settings-container"></div>`;
}


function getAdminSettingsSuperadminContent() {
  const getRecodeButton = (label, action) => `
    <button class="btn btn-primary btn-lg w-100 mb-3 rounded-pill shadow-sm fw-semibold"
            onclick="${action}" aria-label="${label}">
      ${label}
    </button>
  `;

  const getRecodeCard = (buttons) => `
      <div class="d-flex justify-content-center">
        <div class="card bg-white shadow rounded-4 p-4" style="max-width: 400px; width: 100%;">
          <h5 class="fw-bold text-center mb-4">Recode Listing Actions</h5>
          <p class="text-muted text-center mb-4">
            Use these tools to regenerate Unilevel and Binary listings. This is useful after major updates to user packages, pairing logic, or network structure.
          </p>
          ${buttons.join("")}
          <div class="text-center text-muted mt-3" style="font-size: 0.875rem;">
            Ensure data integrity before triggering recode actions. These operations may affect downstream reports.
          </div>
        </div>
      </div>
  `;

  const buttons = [
    getRecodeButton("Recode Unilevel Listing", "handleRecodeUnilevel()"),
    getRecodeButton("Recode Binary Listing", "handleRecodeBinary()")
  ];

  return getRecodeCard(buttons);
}


function getAdminSettingsMaintenanceContent() {
  const settings = [
    { id: 1, title: "Auto compute binary income [1]", status: "NO PENDING", isActive: true },
    { id: 2, title: "Auto compute unilevel income [2]", status: "NO PENDING", isActive: true },
    { id: 3, title: "Auto Credit Binary Matching Bonus [4]", status: "NO PENDING", isActive: true },
    { id: 4, title: "Auto Credit Unilevel Income [5]", status: "NO PENDING", isActive: true },
    { id: 5, title: "Auto Credit Direct Referrals [6]", status: "NO PENDING", isActive: true },
    { id: 6, title: "Dashboard Panel [1]", status: "—", isActive: true },
    { id: 7, title: "Registration Panel [2]", status: "—", isActive: true },
    { id: 8, title: "Store Panel [3]", status: "—", isActive: true },
    { id: 9, title: "SYSTEM MAINTENANCE [10]", status: "—", isActive: true },
    { id: 10, title: "Auto compute Personal Sales Rebates [9]", status: "NO PENDING", isActive: true },
    { id: 11, title: "Auto Credit Personal Sales Rebates [20]", status: "NO PENDING", isActive: true },
    { id: 12, title: "Error Reporting SMS/Telegram SMS [10]", status: "—", isActive: true },
    { id: 13, title: "Force updating of address for PH based user [23]", status: "—", isActive: true },
    { id: 14, title: "Card BG Style [24]", status: "—", isActive: false },
    { id: 15, title: "Auto Credit Finders Fee [1]", status: "—", isActive: true },
    { id: 16, title: "Auto Process LEADERSHIP [6]", status: "—", isActive: true },
    { id: 17, title: "Auto Credit LEADERSHIP [1]", status: "—", isActive: true },
    { id: 18, title: "Too Fast too Furious [25]", status: "—", isActive: false },
    { id: 19, title: "Pearl Form Promo [26]", status: "—", isActive: true },
    { id: 20, title: "Bypass Reg Api Key [27]", status: "—", isActive: true }
  ];

  const getSystemToggleCard = ({ title, id, status, isActive }) => `
    <div class="col">
      <div class="card bg-white shadow-sm rounded-3 p-3 h-100 d-flex flex-column justify-content-between">
        <h6 class="fw-bold mb-2">${title}</h6>
        <div class="d-flex gap-2 mb-2">
          <button class="btn btn-sm fw-bold px-3 ${isActive ? 'btn-success' : 'btn-outline-success'}">ON</button>
          <button class="btn btn-sm fw-bold px-3 ${!isActive ? 'btn-secondary' : 'btn-outline-secondary'}">TURN OFF</button>
        </div>
        <div class="text-muted text-uppercase small">${status}</div>
      </div>
    </div>
  `;

  const getSystemToggleGrid = (cards) => `
      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        ${cards.map(getSystemToggleCard).join("")}
      </div>
  `;

  return getSystemToggleGrid(settings);
}


/* SMS Server */
function getAdminSmsOtpContent() {
  const getOtpSummaryCard = (title, icon, count = 0) => `
    <div class="col">
      <div class="card shadow-sm rounded-3 p-3 text-center">
        ${icon ? `<div class="mb-2 text-secondary"><i class="${icon} fs-4"></i></div>` : ""}
        <h6 class="fw-bold text-muted">${title}</h6>
        <h3 class="text-primary fw-bold">${count}</h3>
      </div>
    </div>
  `;

  const getOtpExportControls = () => `
    <div class="mb-3 d-flex align-items-center justify-content-between flex-wrap">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-outline-secondary btn-sm" title="Copy">Copy</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export CSV">CSV</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export Excel">Excel</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export PDF">PDF</button>
        <button class="btn btn-outline-secondary btn-sm" title="Print">Print</button>
      </div>
      <div class="d-flex align-items-center gap-2">
        <select class="form-select form-select-sm w-auto">
          <option>5</option>
          <option>10</option>
          <option>25</option>
        </select>
        <input type="search" class="form-control form-control-sm w-auto" placeholder="Search">
      </div>
    </div>
  `;

  const getOtpTable = () => `
    <table class="table table-bordered table-hover table-sm text-center">
      <thead class="table-light">
        <tr>
          <th>CTL#</th>
          <th>DATE</th>
          <th>REFERENCE#</th>
          <th>MESSAGE</th>
          <th>OTP</th>
          <th>AMOUNT</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="7" class="text-muted">No data available in table</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted">Showing 0 to 0 of 0 entries</small>
      <ul class="pagination pagination-sm mb-0">
        <li class="page-item disabled"><a class="page-link">Previous</a></li>
        <li class="page-item disabled"><a class="page-link">Next</a></li>
      </ul>
    </div>
  `;

  return `
      <div class="bg-white rounded-4 shadow-sm p-4">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-3 mb-4">
          ${getOtpSummaryCard("Total OTP", "bi-key")}
          ${getOtpSummaryCard("Expired", "bi-clock")}
          ${getOtpSummaryCard("Max Retry", "bi-arrow-repeat")}
          ${getOtpSummaryCard("Completed", "bi-check-circle")}
        </div>
        <section>
          <h5 class="fw-bold text-uppercase mb-3">OTP LIST</h5>
          ${getOtpExportControls()}
          ${getOtpTable()}
        </section>
      </div>
  `;
}

function getAdminSmsOtpMobileContent() {
  const getOtpExportControls = () => `
    <div class="mb-3 d-flex align-items-center justify-content-between flex-wrap">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-outline-secondary btn-sm" title="Copy">Copy</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export CSV">CSV</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export Excel">Excel</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export PDF">PDF</button>
        <button class="btn btn-outline-secondary btn-sm" title="Print">Print</button>
      </div>
      <div class="d-flex align-items-center gap-2">
        <select class="form-select form-select-sm w-auto">
          <option>5</option>
          <option>10</option>
          <option>25</option>
        </select>
        <input type="search" class="form-control form-control-sm w-auto" placeholder="Search">
      </div>
    </div>
  `;

  const getOtpTable = (rows = []) => {
    const headers = ["CTLF #", "DATE", "REFERENCE #", "CONTACT #", "OTP #", "STATUS", "RETRY", "VOID"];
    const headerRow = headers.map(h => `<th>${h}</th>`).join("");

    const bodyRows = rows.length
      ? rows.map(row => `
          <tr>
            <td>${row.ctlf}</td>
            <td>${row.date}</td>
            <td>${row.reference}</td>
            <td>${row.contact}</td>
            <td>${row.otp}</td>
            <td>${row.status}</td>
            <td>${row.retry}</td>
            <td>${row.void}</td>
          </tr>
        `).join("")
      : `<tr><td colspan="${headers.length}" class="text-muted">No data available in table</td></tr>`;

    return `
      <table class="table table-bordered table-hover table-sm text-center">
        <thead class="table-light sticky-top">
          <tr>${headerRow}</tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
      <div class="d-flex justify-content-between align-items-center">
        <small class="text-muted">Showing 1 to 5 of 3764 entries</small>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item"><a class="page-link">Previous</a></li>
          <li class="page-item active"><a class="page-link">1</a></li>
          <li class="page-item"><a class="page-link">2</a></li>
          <li class="page-item"><a class="page-link">3</a></li>
          <li class="page-item"><a class="page-link">Next</a></li>
        </ul>
      </div>
    `;
  };

  const mockRows = [
    { ctlf: 3, date: "2025-02-06 05:33:31", reference: "1250206053391", contact: "639772153385", otp: "069252", status: 0, retry: 0, void: 0 },
    { ctlf: 4, date: "2025-02-06 05:33:31", reference: "1250206053391", contact: "639772153385", otp: "069252", status: 0, retry: 0, void: 0 },
    { ctlf: 18, date: "2025-02-06 05:33:45", reference: "1250206053395", contact: "639772153385", otp: "321096", status: 0, retry: 0, void: 0 },
    { ctlf: 20, date: "2025-02-06 05:33:49", reference: "1250206053396", contact: "639772153385", otp: "613267", status: 0, retry: 0, void: 0 },
    { ctlf: 21, date: "2025-02-06 05:33:52", reference: "1425202203221", contact: "639772153385", otp: "613267", status: 0, retry: 0, void: 0 }
  ];

  return `
      <div class="bg-white rounded-4 shadow-sm p-4">
        <section>
          <h5 class="fw-bold text-uppercase mb-3">Mobile Verification OTP List</h5>
          ${getOtpExportControls()}
          ${getOtpTable(mockRows)}
        </section>
      </div>
  `;
}


/* Reports */
function getAdminReportSponsoringContent() {
  const getDateCoverageHeader = () => `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="fw-bold"><i class="bi bi-folder me-2"></i> Date Coverage</h5>
      <h4 class="fw-bold text-primary">September <span class="text-warning">2025</span> Config</h4>
    </div>
    <h6 class="fw-bold text-uppercase mb-3">User with Sponsored DOWNlines</h6>
  `;

  const getDateCoverageControls = () => `
    <div class="mb-3 d-flex justify-content-between flex-wrap">
      <div class="d-flex align-items-center gap-2">
        <label class="form-label mb-0">Show</label>
        <select class="form-select form-select-sm w-auto">
          <option>5</option>
          <option>10</option>
          <option>25</option>
        </select>
        <label class="form-label mb-0">entries</label>
      </div>
      <input type="search" class="form-control form-control-sm w-auto" placeholder="Search">
    </div>
  `;

  const getDateCoverageTable = () => {
    const headers = ["USER", "BONUS", "DATES", "SPONSORED", "COMMON", "CLASSIC", "PREMIUM", "ULTIMATE"];
    const headerRow = headers.map(h => `<th>${h}</th>`).join("");

    const rows = [
      {
        user: "Ala, Hope Brand[4250][hopewants][ULTIMATE]",
        bonus: "0.00",
        dates: [
          "Herenttana, [anon][anonherenttana][2025-09-01][cs.c]",
          "Esaa, [anon][anonessaa][2025-09-01][cs.c]",
          "Jone, [anon][anonjone][2025-09-01][cs.c]"
        ],
        sponsored: 3, common: 0, classic: 0, premium: 0, ultimate: 0
      },
      {
        user: "CODIV, WINNE[4250][winne4][ULTIMATE]",
        bonus: "24.00",
        dates: [
          "Converce, [anon][anonconverce][2025-09-01][cs.c]",
          "Henerenttana, [anon][anonhenerenttana][2025-09-01][cs.c]",
          "Esaa, [anon][anonessaa][2025-09-01][cs.c]",
          "Jone, [anon][anonjone][2025-09-01][cs.c]",
          "Mergana, [anon][anonmergana][2025-09-01][cs.c]",
          "Vergana, [anon][anonvergana][2025-09-01][cs.c]",
          "Mone, [anon][anonmone][2025-09-01][cs.c]",
          "Kone, [anon][anonkone][2025-09-01][cs.c]"
        ],
        sponsored: 8, common: 0, classic: 0, premium: 0, ultimate: 0
      },
      {
        user: "Inoa, Brand[4250][inoaonlines][ULTIMATE]",
        bonus: "0.00",
        dates: [
          "Inoa, Brand[inoaonlines][2025-09-01][cs.c]",
          "Rona, Kong[ronakong][2025-09-01][cs.c]",
          "Dumque, Konia[catinquequest][2025-09-01][cs.c]"
        ],
        sponsored: 3, common: 0, classic: 0, premium: 0, ultimate: 0
      }
    ];

    const bodyRows = rows.map(row => `
      <tr>
        <td>${row.user}</td>
        <td><span title="Bonus amount" class="text-success fw-bold">${row.bonus}</span></td>
        <td>
          <details>
            <summary class="text-primary">View ${row.dates.length} entries</summary>
            <ul class="mb-0 ps-3 small text-muted">
              ${row.dates.map(d => `<li>${d}</li>`).join("")}
            </ul>
          </details>
        </td>
        <td>${row.sponsored}</td>
        <td>${row.common}</td>
        <td>${row.classic}</td>
        <td>${row.premium}</td>
        <td>${row.ultimate}</td>
      </tr>
    `).join("");

    return `
      <table class="table table-bordered table-hover table-sm text-start">
        <thead class="table-light">
          <tr>${headerRow}</tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    `;
  };

  const getDateCoveragePagination = () => `
    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted">Showing 1 to 3 of 3 entries</small>
      <ul class="pagination pagination-sm mb-0">
        <li class="page-item disabled"><a class="page-link">Previous</a></li>
        <li class="page-item active"><a class="page-link">1</a></li>
        <li class="page-item disabled"><a class="page-link">Next</a></li>
      </ul>
    </div>
  `;

  return `
    <div class="bg-white rounded-4 shadow-sm p-4">
      ${getDateCoverageHeader()}
      ${getDateCoverageControls()}
      ${getDateCoverageTable()}
      ${getDateCoveragePagination()}
    </div>
  `;
}

function getAdminReportFlushoutContent() {
  const getConfigReportHeader = () => `
    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <div class="card bg-primary text-white rounded-3 p-3 text-center h-100">
          <h5 class="fw-bold mb-1">Config Live Report</h5>
          <h6 class="mb-0">September 2025</h6>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card bg-primary text-white rounded-3 p-3 text-center h-100">
          <h5 class="fw-bold mb-1">Total Flushout</h5>
          <h3 class="mb-0 fw-bold" title="Total flushout amount">0.00</h3>
        </div>
      </div>
    </div>
  `;

  const getMatchingDetailsControls = () => `
    <h5 class="fw-bold text-uppercase mb-3">Matching Details</h5>
    <div class="mb-3 d-flex justify-content-between flex-wrap">
      <div class="d-flex align-items-center gap-2">
        <label class="form-label mb-0">Show</label>
        <select class="form-select form-select-sm w-auto">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <label class="form-label mb-0">entries</label>
      </div>
      <input type="search" class="form-control form-control-sm w-auto" placeholder="Search">
    </div>
  `;

  const getMatchingDetailsTable = () => {
    const headers = [
      "CTR#", "DATE", "USER", "REMARKS", "DBA", "DBB", "EAA", "EBB",
      "PAIR", "PAID", "AMT", "MAX", "FO", "STATUS"
    ];

    const headerRow = headers.map(h => `<th>${h}</th>`).join("");

    return `
      <table class="table table-bordered table-hover table-sm text-center">
        <thead class="table-light">
          <tr>${headerRow}</tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="${headers.length}" class="text-muted">No data available in table</td>
          </tr>
        </tbody>
      </table>
    `;
  };

  const getMatchingDetailsPagination = () => `
    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted">Showing 0 to 0 of 0 entries</small>
      <ul class="pagination pagination-sm mb-0">
        <li class="page-item disabled"><a class="page-link">Previous</a></li>
        <li class="page-item active"><a class="page-link">1</a></li>
        <li class="page-item disabled"><a class="page-link">Next</a></li>
      </ul>
    </div>
  `;

  return `
    <div class="bg-white rounded-4 shadow-sm p-4">
      ${getConfigReportHeader()}
      ${getMatchingDetailsControls()}
      ${getMatchingDetailsTable()}
      ${getMatchingDetailsPagination()}
    </div>
  `;
}


/* Logs */
function getAdminLogsUserLoginContent() {
  const getLoginLogsHeader = () => `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h5 class="fw-bold"><i class="bi bi-shield-lock me-2"></i> Accounts Login Logs</h5>
      <h6 class="fw-bold text-success text-uppercase">"Agreed with Terms"</h6>
    </div>
  `;

  const getLoginLogsControls = () => `
    <div class="mb-3 d-flex align-items-center justify-content-between flex-wrap">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-outline-secondary btn-sm" title="Copy">Copy</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export CSV">CSV</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export Excel">Excel</button>
        <button class="btn btn-outline-secondary btn-sm" title="Export PDF">PDF</button>
        <button class="btn btn-outline-secondary btn-sm" title="Print">Print</button>
      </div>
      <div class="d-flex align-items-center gap-2">
        <select class="form-select form-select-sm w-auto">
          <option>5</option>
          <option>10</option>
          <option>25</option>
        </select>
        <input type="search" class="form-control form-control-sm w-auto" placeholder="Search">
      </div>
    </div>
  `;

  const getLoginLogsTable = () => {
    const headers = ["ID#", "DATE", "USERNAME", "IP ADDRESS"];
    const headerRow = headers.map(h => `<th>${h}</th>`).join("");

    const mockRows = [
      { id: 1, date: "25-Apr-18 10:28:28", username: "GSULIUDI", ip: "42.145.232.200" },
      { id: 2, date: "25-Apr-18 10:28:31", username: "GSULIUDI", ip: "10.22.68.51" },
      { id: 3, date: "25-Apr-18 10:28:34", username: "GSULIUDI", ip: "42.145.232.200" },
      { id: 4, date: "25-Apr-18 10:28:37", username: "GSULIUDI", ip: "10.22.68.51" },
      { id: 5, date: "25-Apr-18 10:28:54", username: "GSULIUDI", ip: "42.145.232.200" }
    ];

    const bodyRows = mockRows.map(row => `
      <tr>
        <td>${row.id}</td>
        <td>${row.date}</td>
        <td>${row.username}</td>
        <td>${row.ip}</td>
      </tr>
    `).join("");

    return `
      <table class="table table-bordered table-hover table-sm text-center">
        <thead class="table-light sticky-top">
          <tr>${headerRow}</tr>
        </thead>
        <tbody>${bodyRows}</tbody>
      </table>
    `;
  };

  const getLoginLogsPagination = () => `
    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted">Showing 1 to 5 of 3376 entries</small>
      <ul class="pagination pagination-sm mb-0">
        <li class="page-item disabled"><a class="page-link">Previous</a></li>
        <li class="page-item active"><a class="page-link">1</a></li>
        <li class="page-item"><a class="page-link">2</a></li>
        <li class="page-item"><a class="page-link">3</a></li>
        <li class="page-item"><a class="page-link">Next</a></li>
      </ul>
    </div>
  `;

  return `
      <div class="bg-white rounded-4 shadow-sm p-4">
        ${getLoginLogsHeader()}
        ${getLoginLogsControls()}
        ${getLoginLogsTable()}
        ${getLoginLogsPagination()}
      </div>
  `;
}





// Set PIN function
function setPinSubmit() {
    const currentPassword = document.getElementById("currentPassword").value;
    const withdrawalPin = document.getElementById("withdrawalPin").value;
    const confirmPin = document.getElementById("confirmPin").value;

    // Validation
    if (!currentPassword || !withdrawalPin || !confirmPin) {
        showAlert("Please fill in all fields", "warning");
        return;
    }

    if (withdrawalPin.length !== 6 || !/^\d{6}$/.test(withdrawalPin)) {
        showAlert("PIN must be exactly 6 digits", "warning");
        return;
    }

    if (withdrawalPin !== confirmPin) {
        showAlert("PIN confirmation does not match", "warning");
        return;
    }

    // Simulate PIN setting (in real app, this would validate password and set PIN)
    showAlert("Withdrawal PIN has been set successfully!", "success");

    // Close modal
    const modal = bootstrap.Modal.getInstance(
        document.getElementById("setPinModal"),
    );
    if (modal) modal.hide();

    // Clear form
    document.getElementById("setPinForm").reset();
}

// REMOVED: getEpointsModulePage - using original getEpointsContent

// REMOVED: getReportsModulePage - using original getReportsContent

// REMOVED: getShopModulePage - using original getShopContent

// REMOVED: getAccountSettingModulePage - using original getUserSettingsContent

// REMOVED: Helper functions - mapping modules directly in loadUserModule

// Sign out function
function signOut() {
    if (confirm("Are you sure you want to sign out?")) {
        // Clear any stored session data
        localStorage.clear();
        sessionStorage.clear();

        // Show confirmation and redirect to home
        showAlert("Successfully signed out!", "success");

        // Redirect to home page after a short delay
        setTimeout(() => {
            loadPageContent("home");
        }, 1500);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM LOADED - Starting initialization...");

    // Set default page
    loadPageContent("home");

    // Initialize products and orders
    // Initialize with mock data for demonstration
    products = [...mockData.products];
    orders = [...mockData.orders];

    // Initialize responsive design
    // Initialize user sidebar only when user page becomes visible
    // This will be called when showPage('user') is executed

    // REMOVED: initializeSidebarBehavior - sidebar now static
});

// REMOVED: initializeSidebarBehavior - sidebar now static

// UNIFIED SIDEBAR STATE MANAGEMENT
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

    // Trigger responsive layout adjustments
    adjustCardLayout();
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

// REMOVED: Sidebar synchronization functions - sidebar now static

// Desktop Sidebar State Management
function restoreDesktopSidebarState() {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector(".main-content");
    if (sidebar && !isMobileView) {
        const isCollapsed =
            localStorage.getItem("sidebar-collapsed") === "true";
        if (isCollapsed) {
            sidebar.classList.add("collapsed");
            if (mainContent) mainContent.classList.add("collapsed");
        } else {
            sidebar.classList.remove("collapsed");
            if (mainContent) mainContent.classList.remove("collapsed");
        }
    }
}

// Initialize desktop sidebar behavior
function initializeDesktopSidebar() {
    if (!isMobileView) {
        restoreDesktopSidebarState();
    }
}

// REMOVED: syncSidebarActiveState - sidebar now static

// Enhanced Desktop Dropdown Event Listeners
// PLACEHOLDER: DESKTOP DROPDOWN EVENT LISTENERS
function attachDesktopDropdownListeners() {
    console.log(
        "Desktop dropdown listeners disabled - ready for clean implementation",
    );

    // TODO: Implement dropdown toggle event listeners
    // TODO: Implement dropdown item click handlers
    // TODO: Implement active state management
    // TODO: Implement onclick function execution
}

// PLACEHOLDER: TAB BAR SYNCHRONIZATION EVENT LISTENERS
function attachTabBarSyncListeners() {
    console.log(
        "Tab bar sync listeners disabled - ready for clean implementation",
    );

    // TODO: Implement tab button click event listeners
    // TODO: Implement tab active state management
    // TODO: Implement tab bar to sidebar synchronization
}

// PLACEHOLDER: DESKTOP SIDEBAR INITIALIZATION
function initializeDesktopSidebar() {
    console.log(
        "Desktop sidebar initialization disabled - ready for clean implementation",
    );

    // TODO: Initialize desktop sidebar dropdown functionality
    // TODO: Attach dropdown toggle event listeners
    // TODO: Attach dropdown item click handlers
    // TODO: Implement active state management
}

// PLACEHOLDER: TAB BAR SYNCHRONIZATION INITIALIZATION
function initializeTabBarSync() {
    console.log(
        "Tab bar synchronization disabled - ready for clean implementation",
    );

    // TODO: Initialize tab bar click event listeners
    // TODO: Implement tab active state management
    // TODO: Implement tab bar to sidebar synchronization
}

// PLACEHOLDER: UNIFIED STATE MANAGEMENT FUNCTIONS
function updateGlobalActiveState(clickedItem, onclickAttr) {
    console.log(
        "Global state management disabled - ready for clean implementation",
    );

    // TODO: Implement global active state management
    // TODO: Update currentActivePage variable
}

function updateTabActiveState(clickedTab) {
    console.log(
        "Tab active state management disabled - ready for clean implementation",
    );

    // TODO: Implement tab active state management
    // TODO: Clear all tab states and set clicked tab as active
}

function syncSidebarToTabBar(moduleName) {
    console.log("Syncing sidebar to tab bar for:", moduleName);
    const allTabs = document.querySelectorAll(".tab-btn");
    console.log("Found tabs:", allTabs.length);

    allTabs.forEach((tab) => {
        tab.classList.remove("active", "btn-primary");
        tab.classList.add("btn-outline-primary");
    });

    // Find matching tab with enhanced debugging
    const matchingTab = Array.from(allTabs).find((tab) => {
        const tabModule =
            tab.getAttribute("data-module") ||
            tab.textContent.trim().toLowerCase().replace(/\s+/g, "-");
        const isMatch =
            tabModule.includes(moduleName) ||
            moduleName.includes(tabModule) ||
            (moduleName === "account-summary" &&
                tabModule.includes("summary")) ||
            (moduleName.includes("wallet") && tabModule.includes("wallet"));

        console.log(
            "Checking tab:",
            tabModule,
            "against module:",
            moduleName,
            "match:",
            isMatch,
        );
        return isMatch;
    });

    if (matchingTab) {
        matchingTab.classList.add("active", "btn-primary");
        matchingTab.classList.remove("btn-outline-primary");
    } else {
    }
}

function syncTabBarToSidebar(tabModule) {
    // Sync across all sidebars
    const allSidebars = [
        document.querySelector("#userSidebar"),
        document.querySelector("#mobileSidebar"),
        document.querySelector("body > .sidebar"),
    ].filter((s) => s);

    allSidebars.forEach((sidebar) => {
        // Clear all active items
        sidebar.querySelectorAll(".dropdown-item").forEach((item) => {
            item.classList.remove("active");
        });

        // Find and activate matching item
        const matchingItem = Array.from(
            sidebar.querySelectorAll(".dropdown-item"),
        ).find((item) => {
            const onclick = item.getAttribute("onclick");
            const itemText = item.textContent.trim().toLowerCase();

            return (
                (onclick && onclick.toLowerCase().includes(tabModule)) ||
                itemText.includes(tabModule) ||
                tabModule.includes(itemText) ||
                (tabModule === "account-summary" &&
                    onclick &&
                    onclick.includes("account-summary"))
            );
        });

        if (matchingItem) {
            matchingItem.classList.add("active");
        }
    });

    console.log("Synced tab bar to sidebar:", tabModule);
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

function handleDropdownToggle(event) {
    event.preventDefault();
    event.stopPropagation();

    const clickedToggle = event.currentTarget;
    const dropdownName = clickedToggle.getAttribute("data-dropdown");
    const parentSidebar = clickedToggle.closest(".sidebar");

    if (!parentSidebar || !dropdownName) return;

    const dropdownMenu = parentSidebar.querySelector(
        `[data-dropdown-menu="${dropdownName}"]`,
    );
    if (!dropdownMenu) return;

    const isCurrentlyOpen = dropdownMenu.classList.contains("show");

    // Close all other dropdowns in this sidebar
    closeOtherDropdowns(parentSidebar, dropdownName);

    // Toggle current dropdown
    if (isCurrentlyOpen) {
        closeDropdown(clickedToggle, dropdownMenu);
    } else {
        openDropdown(clickedToggle, dropdownMenu);
        sidebarState.openDropdown = dropdownName;
    }

    // Sync across all sidebars
    syncDropdownsAcrossSidebars(dropdownName, !isCurrentlyOpen);
}

function openDropdown(toggle, menu) {
    menu.classList.add("show");
    toggle.setAttribute("aria-expanded", "true");
    toggle.classList.add("active");

    // Animate arrow
    const arrow = toggle.querySelector(".fa-chevron-down");
    if (arrow) {
        arrow.style.transform = "rotate(180deg)";
        arrow.style.transition = "transform 0.3s ease";
    }
}

function closeDropdown(toggle, menu) {
    menu.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("active");

    // Animate arrow
    const arrow = toggle.querySelector(".fa-chevron-down");
    if (arrow) {
        arrow.style.transform = "rotate(0deg)";
        arrow.style.transition = "transform 0.3s ease";
    }
}

function closeOtherDropdowns(currentSidebar, exceptDropdown) {
    const allDropdowns = currentSidebar.querySelectorAll(
        "[data-dropdown-menu]",
    );
    const allToggles = currentSidebar.querySelectorAll("[data-dropdown]");

    allDropdowns.forEach((dropdown) => {
        const dropdownName = dropdown.getAttribute("data-dropdown-menu");
        if (dropdownName !== exceptDropdown) {
            const toggle = currentSidebar.querySelector(
                `[data-dropdown="${dropdownName}"]`,
            );
            if (toggle) {
                closeDropdown(toggle, dropdown);
            }
        }
    });
}

function syncDropdownsAcrossSidebars(dropdownName, shouldBeOpen) {
    // Get all sidebars
    const allSidebars = [
        document.querySelector("#userSidebar"),
        document.querySelector("#mobileSidebar"),
        document.querySelector("body > .sidebar"),
    ].filter((sidebar) => sidebar);

    allSidebars.forEach((sidebar) => {
        const toggle = sidebar.querySelector(
            `[data-dropdown="${dropdownName}"]`,
        );
        const menu = sidebar.querySelector(
            `[data-dropdown-menu="${dropdownName}"]`,
        );

        if (toggle && menu) {
            if (shouldBeOpen) {
                openDropdown(toggle, menu);
                // Close other dropdowns in this sidebar
                closeOtherDropdowns(sidebar, dropdownName);
            } else {
                closeDropdown(toggle, menu);
            }
        }
    });
}

// SYNCHRONIZATION SYSTEM - Clean Implementation
function initializeSynchronization() {
    // Initialize dropdown item listeners
    initializeDropdownItems();

    // Initialize tab bar listeners
    initializeTabBarButtons();

    console.log("Synchronization system initialized");
}

function initializeDropdownItems() {
    const allDropdownItems = document.querySelectorAll(
        ".dropdown-item[onclick]",
    );

    // Don't add event listeners - let original onclick work
    // Instead, enhance the original functions to call our sync
    allDropdownItems.forEach((item) => {
        const originalOnclick = item.getAttribute("onclick");
        if (originalOnclick) {
            // Modify onclick to include our synchronization
            const moduleMatch = originalOnclick.match(/['"]([^'"]+)['"]/);
            const moduleName = moduleMatch ? moduleMatch[1] : null;

            if (moduleName) {
                // Replace onclick with enhanced version
                item.setAttribute(
                    "onclick",
                    `
                    ${originalOnclick};
                    handleItemSync('${moduleName}', this);
                `,
                );
            }
        }
    });

    console.log(
        `Enhanced ${allDropdownItems.length} dropdown items for synchronization`,
    );
}

// Global function that can be called from onclick attributes
window.handleItemSync = function (moduleName, clickedItem) {
    // Clear all active states immediately
    clearAllActiveStates();

    // Set this item as active immediately
    clickedItem.classList.add("active");

    sidebarState.activeItem = moduleName;

    // Sync with tab bar immediately
    syncSidebarToTabBar(moduleName);

    // Auto-close mobile sidebar if needed
    handleMobileAutoClose();
};

function initializeTabBarButtons() {
    // Initialize immediately - no delay needed
    const tabButtons = document.querySelectorAll(".tab-btn");

    tabButtons.forEach((button) => {
        button.addEventListener("click", handleTabButtonClick);
    });

    console.log(`Initialized ${tabButtons.length} tab bar buttons`);

    // Also initialize any tab buttons that load later
    setTimeout(() => {
        const laterTabButtons = document.querySelectorAll(
            ".tab-btn:not([data-listener-attached])",
        );
        laterTabButtons.forEach((button) => {
            button.addEventListener("click", handleTabButtonClick);
            button.setAttribute("data-listener-attached", "true");
        });
        if (laterTabButtons.length > 0) {
            console.log(
                `Initialized ${laterTabButtons.length} additional tab buttons`,
            );
        }
    }, 100);
}

function handleTabButtonClick(event) {
    const clickedTab = event.currentTarget;
    const tabText = clickedTab.textContent.trim().toLowerCase();
    const tabModule =
        clickedTab.getAttribute("data-module") || tabText.replace(/\s+/g, "-");

    // Update tab active states
    updateTabActiveStates(clickedTab);

    // Sync with sidebar
    syncTabBarToSidebar(tabModule);

    sidebarState.activeItem = tabModule;
}

function syncSidebarToTabBar(moduleName) {
    // Use requestAnimationFrame for immediate visual update
    requestAnimationFrame(() => {
        const allTabButtons = document.querySelectorAll(".tab-btn");

        // Clear all tab states
        allTabButtons.forEach((tab) => {
            tab.classList.remove("active", "btn-primary");
            tab.classList.add("btn-outline-primary");
        });

        // Find and activate matching tab
        const matchingTab = Array.from(allTabButtons).find((tab) => {
            const tabText = tab.textContent.trim().toLowerCase();
            const tabModule =
                tab.getAttribute("data-module") || tabText.replace(/\s+/g, "-");

            return (
                matchesModule(tabModule, moduleName) ||
                matchesModule(tabText, moduleName)
            );
        });

        if (matchingTab) {
            matchingTab.classList.add("active", "btn-primary");
            matchingTab.classList.remove("btn-outline-primary");
            console.log(`Synced sidebar to tab: ${moduleName}`);
        }
    });
}

function syncTabBarToSidebar(tabModule) {
    // Use requestAnimationFrame for immediate visual update
    requestAnimationFrame(() => {
        // Clear all sidebar active states
        clearAllActiveStates();

        // Find and activate matching sidebar items across all sidebars
        const allSidebars = [
            document.querySelector("#userSidebar"),
            document.querySelector("#mobileSidebar"),
            document.querySelector("body > .sidebar"),
        ].filter((s) => s);

        allSidebars.forEach((sidebar) => {
            const matchingItem = Array.from(
                sidebar.querySelectorAll(".dropdown-item"),
            ).find((item) => {
                const onclick = item.getAttribute("onclick");
                const itemText = item.textContent.trim().toLowerCase();

                if (onclick) {
                    const moduleMatch = onclick.match(/['"]([^'"]+)['"]/);
                    const moduleName = moduleMatch ? moduleMatch[1] : null;
                    if (moduleName && matchesModule(moduleName, tabModule)) {
                        return true;
                    }
                }

                return matchesModule(itemText, tabModule);
            });

            if (matchingItem) {
                matchingItem.classList.add("active");
            }
        });

        console.log(`Synced tab to sidebar: ${tabModule}`);
    });
}

function matchesModule(text1, text2) {
    const normalize = (str) => str.toLowerCase().replace(/[-_\s]/g, "");
    const norm1 = normalize(text1);
    const norm2 = normalize(text2);

    return (
        norm1.includes(norm2) ||
        norm2.includes(norm1) ||
        (norm1.includes("summary") && norm2.includes("summary")) ||
        (norm1.includes("wallet") && norm2.includes("wallet"))
    );
}

function clearAllActiveStates() {
    document.querySelectorAll(".dropdown-item").forEach((item) => {
        item.classList.remove("active");
    });
}

function updateTabActiveStates(activeTab) {
    document.querySelectorAll(".tab-btn").forEach((tab) => {
        tab.classList.remove("active", "btn-primary");
        tab.classList.add("btn-outline-primary");
    });

    activeTab.classList.add("active", "btn-primary");
    activeTab.classList.remove("btn-outline-primary");
}

function syncDropdownState(dropdownName, isOpen) {
    // Get the sidebar that wasn't clicked
    const desktopSidebar = document.querySelector("#userSidebar");
    const mobileSidebar =
        document.querySelector("#mobileSidebar") ||
        document.querySelector("body > .sidebar");

    // Determine which sidebar to sync to
    const targetSidebars = [];
    if (desktopSidebar) targetSidebars.push(desktopSidebar);
    if (mobileSidebar && mobileSidebar !== desktopSidebar)
        targetSidebars.push(mobileSidebar);

    targetSidebars.forEach((sidebar) => {
        const menuItem = sidebar.querySelector(
            `[data-dropdown="${dropdownName}"]`,
        );
        const dropdownMenu = sidebar.querySelector(
            `[data-dropdown-menu="${dropdownName}"]`,
        );

        if (menuItem && dropdownMenu) {
            // Skip if this is the originating sidebar (avoid infinite loop)
            if (sidebar.contains(event?.target)) return;

            if (isOpen) {
                dropdownMenu.classList.add("show");
                menuItem.setAttribute("aria-expanded", "true");
            } else {
                dropdownMenu.classList.remove("show");
                menuItem.setAttribute("aria-expanded", "false");
            }

            // Update chevron
            const chevron = menuItem.querySelector(".fa-chevron-down");
            if (chevron) {
                chevron.style.transform = isOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)";
                chevron.style.transition = "transform 0.3s ease";
            }
        }
    });
}

function updateTabBarSimple(page) {
    const tabButtons = document.querySelectorAll("#user-tab-bar .btn");

    // Remove active from all
    tabButtons.forEach((btn) => {
        btn.classList.remove("active", "btn-primary");
        btn.classList.add("btn-outline-primary");
    });

    // Page to tab mapping
    const pageToTabMap = {
        "account-summary": "Account Summary",
        dashboard: "Dashboard",
        "code-bank": "Code Bank",
    };

    const tabText = pageToTabMap[page];
    if (tabText) {
        const activeTab = Array.from(tabButtons).find((btn) =>
            btn.textContent.trim().includes(tabText),
        );

        if (activeTab) {
            activeTab.classList.add("active", "btn-primary");
            activeTab.classList.remove("btn-outline-primary");
        }
    }
}

function addMobileOverlay() {
    // Remove existing overlay if any
    removeMobileOverlay();

    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "mobile-sidebar-overlay";
    overlay.style.cssText = `
        position: fixed;
        top: 60px;
        left: 0;
        width: 100vw;
        height: calc(100vh - 60px);
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1049;
        display: block;
    `;

    document.body.appendChild(overlay);
}

function removeMobileOverlay() {
    const overlay = document.querySelector(".mobile-sidebar-overlay");
    if (overlay) {
        overlay.remove();
    }
}

function handleMobileOverlayClick(event) {
    if (!isMobileView) return;

    const overlay = event.target.closest(".mobile-sidebar-overlay");
    if (overlay) {
        // Close sidebar when overlay is clicked
        toggleMobileSidebar();
    }
}

// Utility function for debouncing resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle responsive card grid adjustments
function adjustCardLayout() {
    const screenWidth = window.innerWidth;
    console.log("Adjusting card layout for width:", screenWidth);

    // Fix card heights for different screen sizes
    const cards = document.querySelectorAll('.card[style*="height"]');
    cards.forEach((card) => {
        const originalHeight = card.style.height;

        if (screenWidth < 576) {
            // Extra small screens
            if (originalHeight.includes("72px")) {
                card.style.height = "70px";
            } else if (originalHeight.includes("160px")) {
                card.style.height = "auto";
                card.style.minHeight = "100px";
            } else if (originalHeight.includes("240px")) {
                card.style.height = "auto";
                card.style.minHeight = "140px";
            }
        } else if (screenWidth < 768) {
            // Small screens
            if (originalHeight.includes("72px")) {
                card.style.height = "80px";
            } else if (originalHeight.includes("160px")) {
                card.style.height = "auto";
                card.style.minHeight = "120px";
            } else if (originalHeight.includes("240px")) {
                card.style.height = "auto";
                card.style.minHeight = "180px";
            }
        }
    });

    // Apply responsive typography scaling to all cards
    const cardBodies = document.querySelectorAll(".card-body");
    cardBodies.forEach((cardBody) => {
        if (screenWidth >= 992 && screenWidth <= 1199) {
            // Desktop scaling
            cardBody.style.padding = "1rem";
            const h1Elements = cardBody.querySelectorAll("h1, .h1");
            h1Elements.forEach((el) => (el.style.fontSize = "1.75rem"));
            const h2Elements = cardBody.querySelectorAll("h2, .h2");
            h2Elements.forEach((el) => (el.style.fontSize = "1.5rem"));
            const h3Elements = cardBody.querySelectorAll("h3, .h3");
            h3Elements.forEach((el) => (el.style.fontSize = "1.25rem"));
            const displayElements = cardBody.querySelectorAll(
                ".display-4, .display-5, .display-6",
            );
            displayElements.forEach((el) => {
                if (el.classList.contains("display-4"))
                    el.style.fontSize = "2rem";
                if (el.classList.contains("display-5"))
                    el.style.fontSize = "1.75rem";
                if (el.classList.contains("display-6"))
                    el.style.fontSize = "1.5rem";
            });
        } else if (screenWidth >= 768 && screenWidth <= 991) {
            // Tablet scaling
            cardBody.style.padding = "0.875rem";
            const h1Elements = cardBody.querySelectorAll("h1, .h1");
            h1Elements.forEach((el) => (el.style.fontSize = "1.5rem"));
            const h2Elements = cardBody.querySelectorAll("h2, .h2");
            h2Elements.forEach((el) => (el.style.fontSize = "1.25rem"));
            const h3Elements = cardBody.querySelectorAll("h3, .h3");
            h3Elements.forEach((el) => (el.style.fontSize = "1.125rem"));
            const displayElements = cardBody.querySelectorAll(
                ".display-4, .display-5, .display-6",
            );
            displayElements.forEach((el) => {
                if (el.classList.contains("display-4"))
                    el.style.fontSize = "1.75rem";
                if (el.classList.contains("display-5"))
                    el.style.fontSize = "1.5rem";
                if (el.classList.contains("display-6"))
                    el.style.fontSize = "1.25rem";
            });
        } else if (screenWidth >= 576 && screenWidth <= 767) {
            // Mobile scaling
            cardBody.style.padding = "0.8rem";
            const h1Elements = cardBody.querySelectorAll("h1, .h1");
            h1Elements.forEach((el) => (el.style.fontSize = "1.4rem"));
            const h2Elements = cardBody.querySelectorAll("h2, .h2");
            h2Elements.forEach((el) => (el.style.fontSize = "1.2rem"));
            const h3Elements = cardBody.querySelectorAll("h3, .h3");
            h3Elements.forEach((el) => (el.style.fontSize = "1rem"));
            const displayElements = cardBody.querySelectorAll(
                ".display-4, .display-5, .display-6",
            );
            displayElements.forEach((el) => {
                if (el.classList.contains("display-4"))
                    el.style.fontSize = "1.6rem";
                if (el.classList.contains("display-5"))
                    el.style.fontSize = "1.4rem";
                if (el.classList.contains("display-6"))
                    el.style.fontSize = "1.2rem";
            });
        } else if (screenWidth < 576) {
            // Extra small scaling
            cardBody.style.padding = "0.75rem";
            const h1Elements = cardBody.querySelectorAll("h1, .h1");
            h1Elements.forEach((el) => (el.style.fontSize = "1.25rem"));
            const h2Elements = cardBody.querySelectorAll("h2, .h2");
            h2Elements.forEach((el) => (el.style.fontSize = "1.125rem"));
            const h3Elements = cardBody.querySelectorAll("h3, .h3");
            h3Elements.forEach((el) => (el.style.fontSize = "1rem"));
            const displayElements = cardBody.querySelectorAll(
                ".display-4, .display-5, .display-6",
            );
            displayElements.forEach((el) => {
                if (el.classList.contains("display-4"))
                    el.style.fontSize = "1.5rem";
                if (el.classList.contains("display-5"))
                    el.style.fontSize = "1.25rem";
                if (el.classList.contains("display-6"))
                    el.style.fontSize = "1.125rem";
            });
        }
    });

    // Force responsive genealogy layout on tablets
    if (screenWidth >= 768 && screenWidth <= 991) {
        const orgCards = document.querySelectorAll(".org-card");
        orgCards.forEach((card) => {
            card.style.width = "160px";
            card.style.minHeight = "200px";
            card.style.padding = "10px";
        });

        const orgLogos = document.querySelectorAll(".org-logo");
        orgLogos.forEach((logo) => {
            logo.style.width = "40px";
            logo.style.height = "40px";
        });

        const logoTexts = document.querySelectorAll(".logo-text");
        logoTexts.forEach((text) => {
            text.style.fontSize = "16px";
        });

        const orgNames = document.querySelectorAll(".org-name");
        orgNames.forEach((name) => {
            name.style.fontSize = "14px";
        });

        const orgUsernames = document.querySelectorAll(".org-username");
        orgUsernames.forEach((username) => {
            username.style.fontSize = "12px";
        });
    }

    // Fix search bar and form responsiveness
    const cardHeaders = document.querySelectorAll(".card-header");
    cardHeaders.forEach((header) => {
        const searchInputs = header.querySelectorAll(
            'input[type="search"], input[placeholder*="Search"]',
        );
        const selectElements = header.querySelectorAll("select.form-select-sm");

        if (screenWidth >= 992) {
            // Desktop - larger search bars
            searchInputs.forEach((input) => {
                input.style.height = "38px";
                input.style.maxWidth = "250px";
                input.style.minWidth = "200px";
            });
            selectElements.forEach((select) => {
                select.style.height = "38px";
                select.style.width = "140px";
            });
        } else if (screenWidth >= 768 && screenWidth <= 991) {
            // Tablet - align search and select
            searchInputs.forEach((input) => {
                input.style.height = "34px";
                input.style.maxWidth = "200px";
                input.style.minWidth = "180px";
            });
            selectElements.forEach((select) => {
                select.style.height = "34px";
                select.style.width = "120px";
            });
        } else if (screenWidth < 768) {
            // Mobile - stack elements
            searchInputs.forEach((input) => {
                input.style.maxWidth = "100%";
                input.style.marginBottom = "0.5rem";
                input.style.height = "34px";
            });
            selectElements.forEach((select) => {
                select.style.width = "auto";
                select.style.minWidth = "100px";
                select.style.height = "34px";
            });
        }
    });
}

// Handle responsive table adjustments
function adjustTableLayout() {
    const tables = document.querySelectorAll(".table-responsive");
    const screenWidth = window.innerWidth;

    tables.forEach((table) => {
        if (screenWidth < 576) {
            table.style.fontSize = "0.75rem";
        } else if (screenWidth < 768) {
            table.style.fontSize = "0.875rem";
        } else {
            table.style.fontSize = "";
        }
    });
}

// Auto-adjust layouts on content changes
function autoAdjustResponsiveLayout() {
    if (isMobileView) {
        setTimeout(() => {
            adjustCardLayout();
            adjustTableLayout();
        }, 100);
    }
}

// User Module Function - Routes navigation to correct content functions
function loadUserModule(moduleId) {
    console.log("loadUserModule called with:", moduleId);
    
    const userPageContainer = document.querySelector("#user-page-container");
    if (!userPageContainer) return;
    
    let content = '';
    
    // Map moduleId to the correct content functions
    switch(moduleId) {
        case 'account-summary':
            content = getAccountSummaryContent();
            break;
        case 'dashboard':
            content = getUserDashboardContent();
            break;
        case 'codebank':
        case 'code-bank':
            content = getCodeBankContent();
            break;
        default:
            console.log(`No content function found for module: ${moduleId}`);
            // Fallback to loadUserPage for other modules
            loadUserPage(moduleId);
            return;
    }
    
    // Load the content if found
    if (content) {
        userPageContainer.innerHTML = content;
        console.log(`Loaded content for module: ${moduleId}`);
    }
}

const originalLoadAdminModule = loadAdminModule;
loadAdminModule = function (moduleId) {
    const result = originalLoadAdminModule.call(this, moduleId);
    autoAdjustResponsiveLayout();
    return result;
};

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


// Remove duplicate - using existing toggleMobileSidebar function above

// ====================================
// FUNCTIONAL FIXES FOR DROPDOWN BEHAVIOR
// ====================================

// REMOVED: Duplicate function - using the one at line 3380

// Fix for Step 3: Synchronized highlights
function syncWithTabBar(sectionName, moduleName) {
    // Update global active page
    activePage = moduleName || sectionName;

    // Find corresponding tab bar button and activate it
    const tabButtons = document.querySelectorAll(
        '.tab-btn[data-module="' + activePage + '"]',
    );
    tabButtons.forEach((btn) => {
        // Remove active from all tab buttons first
        document
            .querySelectorAll(".tab-btn")
            .forEach((tab) => tab.classList.remove("active"));
        // Add active to matching button
        btn.classList.add("active");
    });
}

// SIDEBAR HIGHLIGHT SYNC REMOVED

// Fix for Step 4: CodeBank navigation mismatch
function fixCodeBankNavigation() {
    // Ensure both sidebar and tab bar use the same navigation for CodeBank
    // Update any legacy getCodeBankContent() calls to use showUserModule('code-bank', 'dashboard')
    const codeBankElements = document.querySelectorAll(
        '[onclick*="getCodeBankContent"]',
    );
    codeBankElements.forEach((element) => {
        element.setAttribute(
            "onclick",
            "showUserModule('code-bank', 'dashboard')",
        );
    });
}

// Enhanced tab bar click handler with synchronization
function handleTabBarClick(moduleName) {
    // Load the module content using original method
    showUserModule(moduleName, "dashboard");

    // SIDEBAR SYNC REMOVED

    // Update active tab
    document
        .querySelectorAll(".tab-btn")
        .forEach((btn) => btn.classList.remove("active"));
    document
        .querySelector(`.tab-btn[data-module="${moduleName}"]`)
        ?.classList.add("active");
}

// Enhanced dropdown item click handler with synchronization
function handleDropdownItemClick(moduleName, sectionName) {
    // Load the module content using original method
    showUserModule(moduleName, sectionName);

    // Sync with tab bar
    syncWithTabBar(sectionName, moduleName);

    // SIDEBAR HIGHLIGHTING REMOVED
}

// UNIVERSAL DEFAULT PAGE INITIALIZATION - Dashboard Account Summary
function initializeDefaultPage() {
    console.log('Universal initialization: Dashboard - Account Summary');
    
    // Set global active page
    activePage = { module: 'dashboard', subModule: 'account-summary' };
    
    // Close all dropdowns first
    closeAllDropdowns();
    
    // Open Dashboard dropdown and set active states using data attributes
    const dashboardToggle = document.querySelector('[data-dropdown="dashboard"]');
    const dashboardDropdown = document.querySelector('[data-dropdown-menu="dashboard"]');
    
    if (dashboardToggle && dashboardDropdown) {
        // Activate Dashboard dropdown
        dashboardToggle.classList.add('active');
        dashboardDropdown.classList.add('show');
        
        const arrow = dashboardToggle.querySelector('.dropdown-arrow');
        if (arrow) {
            arrow.classList.add('rotated');
        }
        
        // Find and activate Account Summary item
        const accountSummaryItem = dashboardDropdown.querySelector('[onclick*="account-summary"]');
        if (accountSummaryItem) {
            accountSummaryItem.classList.add('active');
            
            // Sync with tab bar
            syncWithTabBar('dashboard', 'account-summary');
            
            // Load content
            loadSpecificModule('account-summary', 'dashboard');
        }
    }
    
    console.log('Default initialization complete: Dashboard → Account Summary');
    }

    /*
  Register page step handling
  - clicking Next on validation step swaps the right panel content to the registration form
  - Back button returns to validation step
  - keeps user on same page (no navigation)
*/
// ...existing code...
function _registerTemplates() {
    const validation = `
        <h3 class="mb-4">Validation Code</h3>
        <form id="register-validation-form" class="mb-4" onsubmit="return false;">
            <div class="mb-3">
                <label class="form-label">Activation Code</label>
                <input id="activation-code" type="text" class="form-control" placeholder="Enter code here" aria-label="Activation Code">
            </div>
            <div class="mb-3">
                <label class="form-label">Activation PIN</label>
                <input id="activation-pin" type="password" class="form-control" placeholder="Enter pin here" aria-label="Activation PIN">
            </div>
            <button id="register-next-btn" type="button" class="btn btn-primary w-100">Next</button>
        </form>

        <div class="text-center">
            <small class="text-muted">Stay connected on social media for updates</small>
            <div class="d-flex justify-content-center gap-2 mt-3">
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="telegram">
                    <i class="fab fa-telegram-plane"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="youtube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
            <p class="mb-0">
                Already have an account? 
                <a href="#" onclick="showRegisterStep('success')">Sign In</a>
            </p>

        </div>
    `;

    const details = (code = '', pin = '') => `
        <h3 class="text-center mb-4">Personal Details</h3>
        <form id="register-details-form" onsubmit="return false;">
            <div class="mb-3">
                <label class="form-label">First Name</label>
                <input id="reg-firstname" type="text" class="form-control" placeholder="Enter your first name">
            </div>

            <div class="mb-3">
                <label class="form-label">Middle Name</label>
                <input id="reg-middlename" type="text" class="form-control" placeholder="Enter your middle name">
            </div>

            <div class="mb-3">
                <label class="form-label">Last Name</label>
                <input id="reg-lastname" type="text" class="form-control" placeholder="Enter your last name">
            </div>

            <div class="mb-3">
                <label class="form-label">Gender</label>
                <select id="reg-gender" class="form-select">
                    <option selected>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="d-flex gap-2 mt-4">
                <button id="register-back-btn" type="button" class="btn btn-outline-primary">Previous</button>
                <button id="register-submit-btn" type="button" class="btn btn-primary ms-auto">Next</button>
            </div>
        </form>

        <div class="text-center mt-4">
            <hr>
            <small class="text-muted d-block mb-3">Stay connected on social media for updates</small>
            <div class="d-flex justify-content-center gap-2 mb-3">
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="telegram">
                    <i class="fab fa-telegram-plane"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="youtube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
                <p class="mb-0">
                    Already have an account? 
                    <a href="#" onclick="showRegisterStep('success')">Sign In</a>
                </p>

        </div>
    `;

    // CONTACT: made mobile optional (no required)
    const contact = (prefill = {}) => `
        <h3 class="text-center mb-4">Contact Details</h3>
        <form id="register-contact-form" onsubmit="return false;">
            <div class="mb-3">
                <label class="form-label">Mobile Number</label>
                <input id="reg-mobile" type="tel" class="form-control" placeholder="+63" value="${prefill.mobile || '+63'}">
            </div>

            <div class="d-flex gap-2 mt-4">
                <button id="register-contact-back-btn" type="button" class="btn btn-outline-primary">Previous</button>
                <button id="register-contact-next-btn" type="button" class="btn btn-primary ms-auto">Next</button>
            </div>
        </form>

        <div class="text-center mt-4">
            <hr>
            <small class="text-muted d-block mb-3">Stay connected on social media for updates</small>
            <div class="d-flex justify-content-center gap-2 mb-3">
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="telegram">
                    <i class="fab fa-telegram-plane"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="youtube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
                <p class="mb-0">
                    Already have an account? 
                    <a href="#" onclick="showRegisterStep('success')">Sign In</a>
                </p>

        </div>
    `;

    const network = (prefill = {}) => `
        <h3 class="text-center mb-4">Network Details</h3>
        <form id="register-network-form" onsubmit="return false;">
            <div class="mb-3">
                <label class="form-label">Direct Sponsor</label>
                <input id="reg-sponsor" type="text" class="form-control" placeholder="Enter sponsor user name" value="${prefill.sponsor || ''}">
            </div>

            <div class="mb-3">
                <label class="form-label">Network Placement</label>
                <input id="reg-placement" type="text" class="form-control" placeholder="Enter upline user name" value="${prefill.placement || ''}">
            </div>

            <div class="mb-3">
                <label class="form-label">Network Position</label>
                <select id="reg-position" class="form-select">
                    <option selected>Select Position</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                </select>
            </div>

            <div class="d-flex gap-2 mt-4">
                <button id="register-network-back-btn" type="button" class="btn btn-outline-primary">Previous</button>
                <button id="register-network-next-btn" type="button" class="btn btn-primary ms-auto">Next</button>
            </div>
        </form>

        <div class="text-center mt-4">
            <hr>
            <small class="text-muted d-block mb-3">Stay connected on social media for updates</small>
            <div class="d-flex justify-content-center gap-2 mb-3">
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="telegram">
                    <i class="fab fa-telegram-plane"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="youtube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div><p class="mb-0">
                Already have an account? 
                <a href="#" onclick="showRegisterStep('success')">Sign In</a>
            </p>
        </div>
    `;

    const loginDetailsStep = `
    <h3 class="text-center mb-4">Login Details</h3>
    <form id="register-login-form" onsubmit="return false;">
        <div class="mb-3">
            <label class="form-label">User Name</label>
            <input id="reg-username" type="text" class="form-control" placeholder="Enter username" value="">
        </div>

        <div class="mb-3 position-relative">
            <label class="form-label">Password</label>
            <input id="reg-password" type="password" class="form-control" placeholder="Enter password" value="">
        </div>

        <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" id="agreeTerms">
            <label class="form-check-label" for="agreeTerms">
                I agree to the Terms and Privacy Policy.
            </label>
        </div>

        <div class="d-flex gap-2 mt-4">
            <button id="register-login-back-btn" type="button" class="btn btn-outline-primary">Previous</button>
            <button id="register-login-next-btn" type="button" class="btn btn-primary ms-auto">Sign Up</button>
        </div>
    </form>

   <div class="text-center mt-4">
        <hr>
            <small class="text-muted d-block mb-3">Stay connected on social media for updates</small>
            <div class="d-flex justify-content-center gap-2 mb-3">
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="telegram">
                    <i class="fab fa-telegram-plane"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="youtube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
        <p class="mb-0">
            Already have an account? 
            <a href="#" onclick="showRegisterStep('success')">Sign In</a>
        </p>
    </div>
    `;

    const success = (name = '') => `
        <h3 class="text-center mb-4">Back Office V1.7</h3>
        <form id="register-success-form" onsubmit="return false;">
            <div class="mb-3">
                <label class="form-label">User ID</label>
                <input type="text" class="form-control" placeholder="Enter Username" value="${name}">
            </div>

            <div class="mb-3 position-relative">
                <label class="form-label">Password</label>
                <input type="password" class="form-control" placeholder="Enter Password">
                <span class="position-absolute top-50 end-0 translate-middle-y me-3">
            </div>

            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" id="rememberMe">
                <label class="form-check-label" for="rememberMe">
                    Remember Me
                </label>
            </div>

            <div class="d-grid mb-4">
                <button id="register-done-btn" class="btn btn-primary">Log In</button>
            </div>
        </form>

        <div class="text-center mt-4">
        <hr>
            <small class="text-muted d-block mb-3">Stay connected on social media for updates</small>
            <div class="d-flex justify-content-center gap-2 mb-3">
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="facebook">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="telegram">
                    <i class="fab fa-telegram-plane"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="youtube">
                    <i class="fab fa-youtube"></i>
                </a>
                <a class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width:40px;height:40px" href="#" aria-label="whatsapp">
                    <i class="fab fa-whatsapp"></i>
                </a>
            </div>
            <p class="mb-0">
                Don't have an account? 
                <a href="#" onclick="showPage('register-page'); showRegisterStep('validation');">Sign Up</a>
            </p>
    </div>
    `;


    return { validation, details, contact, network, loginDetailsStep, success };
}

// Replace showRegisterStep to remove validation blocking and allow progression even with empty fields
function showRegisterStep(step, extras = {}) {
    const panel = document.getElementById('register-right-panel');
    if (!panel) return;
    const tpl = _registerTemplates();

    if (step === 'validation') {
        panel.innerHTML = tpl.validation;
        const nextBtn = document.getElementById('register-next-btn');
        if (nextBtn) nextBtn.addEventListener('click', () => {
            const code = document.getElementById('activation-code')?.value || '';
            const pin = document.getElementById('activation-pin')?.value || '';
            // allow proceeding regardless of values
            showRegisterStep('details', { code, pin });
        });
    } else if (step === 'details') {
        panel.innerHTML = tpl.details(extras.code, extras.pin);
        const backBtn = document.getElementById('register-back-btn');
        const submitBtn = document.getElementById('register-submit-btn');

        if (backBtn) backBtn.addEventListener('click', () => showRegisterStep('validation'));

        if (submitBtn) submitBtn.addEventListener('click', () => {
            // collect values but DO NOT enforce validation — allow progression
            const name = document.getElementById('reg-firstname')?.value || '';
            const middlename = document.getElementById('reg-middlename')?.value || '';
            const lastname = document.getElementById('reg-lastname')?.value || '';
            const gender = document.getElementById('reg-gender')?.value || '';
            // proceed to contact step carrying collected data
            showRegisterStep('contact', { ...extras, name, middlename, lastname, gender });
        });
    } else if (step === 'contact') {
        panel.innerHTML = tpl.contact(extras);
        const backBtn = document.getElementById('register-contact-back-btn');
        const nextBtn = document.getElementById('register-contact-next-btn');

        if (backBtn) backBtn.addEventListener('click', () => showRegisterStep('details', extras));

        if (nextBtn) nextBtn.addEventListener('click', () => {
            // collect mobile but do not block
            const mobile = document.getElementById('reg-mobile')?.value || '';
            // proceed to network step carrying collected data
            showRegisterStep('network', { ...extras, mobile });
        });
    } else if (step === 'network') {
        panel.innerHTML = tpl.network(extras);
        const backBtn = document.getElementById('register-network-back-btn');
        const nextBtn = document.getElementById('register-network-next-btn');

        if (backBtn) backBtn.addEventListener('click', () => showRegisterStep('contact', extras));

        if (nextBtn) nextBtn.addEventListener('click', () => {
            // collect network fields (no blocking)
            const sponsor = document.getElementById('reg-sponsor')?.value || '';
            const placement = document.getElementById('reg-placement')?.value || '';
            const position = document.getElementById('reg-position')?.value || '';
            // proceed to success (pass name if available)
            showRegisterStep('login-details', { name: extras.name || '', sponsor, placement, position, mobile: extras.mobile || '' });
        });
    } else if (step === 'login-details') {
        panel.innerHTML = tpl.loginDetailsStep;

        const backBtn = document.getElementById('register-network-back-btn');
        const nextBtn = document.getElementById('register-login-next-btn'); // ✅ fix

        if (backBtn) {
            backBtn.addEventListener('click', () => showRegisterStep('network', extras));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const username = document.getElementById('reg-username')?.value || '';
                const password = document.getElementById('reg-password')?.value || '';
                showRegisterStep('success', { ...extras, name: extras.name || '', username, password });
            });
        }
    }
    
    else if (step === 'success') {
    panel.innerHTML = tpl.success(extras.username || extras.name || '');
    const doneBtn = document.getElementById('register-done-btn');
    if (doneBtn) {
        doneBtn.addEventListener('click', (e) => {
            e.preventDefault(); // stop form submission refresh
            showPage('account-summary'); // ✅ navigate to account-summary
        });
        }
    }
}

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

