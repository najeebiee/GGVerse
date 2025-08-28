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
    // Handle account-summary direct access
    if (pageId === 'account-summary') {
        // Show user page and load account summary directly
        document.querySelectorAll(".page-content").forEach((page) => {
            page.classList.add("d-none");
        });
        
        const targetPage = document.getElementById("user-page");
        if (targetPage) {
            targetPage.classList.remove("d-none");
            currentPage = 'user';
            // Load account summary content directly
            loadUserPage('account-summary');
            
            // Initialize user sidebar navigation
            setTimeout(() => {
                initializeUserSidebarNavigation();
            }, 100);
        }
        
        // Update navigation active state
        document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
            link.classList.remove("active");
        });
        
        const currentNavLink = document.querySelector(`[onclick="showPage('account-summary')"]`);
        if (currentNavLink) {
            currentNavLink.classList.add('active');
        }
        return;
    }
    
    // Hide all pages
    document.querySelectorAll(".page-content").forEach((page) => {
        page.classList.add("d-none");
    });

    // Show selected page
    const targetPage = document.getElementById(pageId + "-page");
    if (targetPage) {
        targetPage.classList.remove("d-none");
        currentPage = pageId;

        // Load page content
        loadPageContent(pageId);
        
        // Initialize user sidebar navigation when user page is shown
        if (pageId === "user") {
            setTimeout(() => {
                initializeUserSidebarNavigation();
            }, 100); // Small delay to ensure DOM is ready
        }
    }

    // Update navigation active state
    document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
        link.classList.remove("active");
    });

    if (event && event.target) {
        event.target.classList.add("active");
    }
}

function loadPageContent(pageId) {
    switch (pageId) {
        case "admin":
            loadAdminModule("dashboard");
            break;
        case "user":
            showUserPage();
            break;
        case "pos":
            loadPosContent();
            break;
    }
}

// Admin Module Functions
function showAdminModule(moduleId) {
    currentAdminModule = moduleId;

    // Hide all admin module contents
    const adminContents = [
        "admin-dashboard-content",
        "admin-accounts-content",
        "admin-promo-content",
        "admin-store-content",
        "admin-sales-content",
        "admin-reports-content",
        "admin-items-content",
        "admin-activation-content",
        "admin-wallet-content",
        "admin-settings-content",
        "admin-sms-content",
    ];

    // First show the main content div and hide all submodules
    const mainContent = document.getElementById("admin-dashboard-main");
    if (mainContent)
        mainContent.style.display = moduleId === "dashboard" ? "block" : "none";

    adminContents.forEach((contentId) => {
        const element = document.getElementById(contentId);
        if (element) element.classList.add("d-none");
    });

    // Clear admin-module-content when switching to dashboard
    const moduleContentDiv = document.getElementById("admin-module-content");
    if (moduleId === "dashboard" && moduleContentDiv) {
        moduleContentDiv.innerHTML = "";
        loadAdminModule("dashboard");
    } else if (moduleId !== "dashboard") {
        // Show selected module content (for new modules)
        const targetContent = document.getElementById(
            `admin-${moduleId}-content`,
        );
        if (targetContent) {
            targetContent.classList.remove("d-none");
        } else {
            // Load content for old modules
            loadAdminModule(moduleId);
        }
    }

    // Update sidebar active state
    document
        .querySelectorAll("#admin-page .sidebar .nav-link")
        .forEach((link) => {
            link.classList.remove("active");
        });
    // Find the clicked link and make it active
    const clickedLink = document.querySelector(
        `#admin-page .sidebar .nav-link[onclick*="${moduleId}"]`,
    );
    if (clickedLink) clickedLink.classList.add("active");
}

function loadAdminModule(moduleId) {
    if (moduleId === "dashboard") {
        const dashboardMainDiv = document.getElementById(
            "admin-dashboard-main",
        );
        if (dashboardMainDiv) {
            dashboardMainDiv.innerHTML = getAdminDashboardContent();
        }
        return;
    }

    const contentDiv = document.getElementById("admin-module-content");
    if (!contentDiv) return;

    const moduleContents = {
        accounts: getAccountsContent(),
        promo: getPromoContent(),
        store: getStoreContent(),
        sales: getSalesContent(),
        reports: getReportsContent(),
        items: getItemsContent(),
        activation: getActivationContent(),
        wallet: getWalletContent(),
        settings: getSettingsContent(),
        sms: getSmsContent(),
    };

    if (moduleContents[moduleId]) {
        contentDiv.innerHTML = moduleContents[moduleId];
    }
}

function getAdminDashboardContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-tachometer-alt me-2"></i>Dashboard</h2>
        </div>
        
        <!-- Main Content Grid -->
        <div class="row g-4 mb-4">
            <!-- Left Column: Financial Cards -->
            <div class="col-xl-8 col-lg-8 col-md-12">
                <!-- Top Row: Primary Cards -->
                <div class="row g-3 mb-4">
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad); min-height: 120px;">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h6 class="card-title text-white-50 mb-2">CURRENT ACCOUNT</h6>
                                <h4 class="mb-0 fw-bold">JMDLONSO01 <i class="fas fa-share-alt ms-2"></i></h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card text-white" style="background: linear-gradient(135deg, #f7b801, #ffa726); min-height: 120px;">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h6 class="card-title text-white-50 mb-2">TOTAL EARNINGS</h6>
                                <h4 class="mb-0 fw-bold">PHP1,854.00</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card text-white" style="background: linear-gradient(135deg, #20c997, #17a2b8); min-height: 120px;">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h6 class="card-title text-white-50 mb-2">EPOINTS BALANCE</h6>
                                <h4 class="mb-0 fw-bold">PHP36.00</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card" style="background: #f8f9fa; border: 1px solid #dee2e6; min-height: 120px;">
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6 class="card-title text-muted mb-0">TOTAL SALES MATCH</h6>
                                    <i class="fas fa-dollar-sign text-warning"></i>
                                </div>
                                <h4 class="mb-0 fw-bold text-dark">PHP324.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Second Row: Additional Metrics -->
                <div class="row g-3">
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card" style="background: #f8f9fa; border: 1px solid #dee2e6; min-height: 100px;">
                            <div class="card-body">
                                <h6 class="card-title text-muted mb-2">TOTAL LEADERSHIP</h6>
                                <h4 class="mb-0 fw-bold text-dark">PHP0.00</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card" style="background: #f8f9fa; border: 1px solid #dee2e6; min-height: 100px;">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6 class="card-title text-muted mb-0">TOTAL DIRECT REFERRAL</h6>
                                    <i class="fas fa-dollar-sign text-warning"></i>
                                </div>
                                <h4 class="mb-0 fw-bold text-dark">PHP900.00</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card" style="background: #f8f9fa; border: 1px solid #dee2e6; min-height: 100px;">
                            <div class="card-body">
                                <h6 class="card-title text-muted mb-2">TOTAL UNILEVEL+PSR</h6>
                                <h4 class="mb-0 fw-bold text-dark">PHP630.00</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="card" style="background: #f8f9fa; border: 1px solid #dee2e6; min-height: 100px;">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h6 class="card-title text-muted mb-0">OTHER EARNINGS</h6>
                                    <i class="fas fa-dollar-sign text-warning"></i>
                                </div>
                                <h4 class="mb-0 fw-bold text-dark">PHP0.00</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right Column: Promotion Card -->
            <div class="col-xl-4 col-lg-4 col-md-12">
                <div class="card text-white" style="background: linear-gradient(135deg, #20c997, #17a2b8); min-height: 320px;">
                    <div class="card-body d-flex flex-column">
                        <div class="mb-3">
                            <i class="fas fa-leaf fa-2x mb-3 text-white-50"></i>
                            <h5 class="fw-bold mb-2">GRINDERS GUILD</h5>
                        </div>
                        <h6 class="mb-2">Radiating Wellness, Transforming Lives</h6>
                        <p class="small text-white-50 mb-0">Promoting wellness sparks positive transformations across multiple life dimensions, and stretching beyond physical health.</p>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Transaction History & Network Status -->
        <div class="row g-4">
            <!-- Left: Transaction History -->
            <div class="col-xl-8 col-lg-8 col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h5 class="mb-0"><i class="fas fa-wallet me-2"></i>EWALLET TRANSACTION HISTORY</h5>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover mb-0">
                                <thead style="background: #f8f9fa;">
                                    <tr>
                                        <th class="px-3 py-3">TRANS# <i class="fas fa-sort-down ms-1 text-muted"></i></th>
                                        <th class="px-3 py-3">DATE <i class="fas fa-sort-down ms-1 text-muted"></i></th>
                                        <th class="px-3 py-3">REMARKS <i class="fas fa-sort-down ms-1 text-muted"></i></th>
                                        <th class="px-3 py-3 text-end">AMOUNT <i class="fas fa-sort-down ms-1 text-muted"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="px-3 py-3"><strong>39174</strong></td>
                                        <td class="px-3 py-3">
                                            <span class="badge bg-primary rounded-pill">2025-07-31 20:05:03</span>
                                        </td>
                                        <td class="px-3 py-3">
                                            <small class="text-muted">PERSONAL REBATES Bonus from JMDLONSO001</small>
                                        </td>
                                        <td class="px-3 py-3 text-end">
                                            <span class="badge bg-success rounded-pill">+375.00</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-3 py-3"><strong>39171</strong></td>
                                        <td class="px-3 py-3">
                                            <span class="badge bg-primary rounded-pill">2025-07-31 20:04:06</span>
                                        </td>
                                        <td class="px-3 py-3">
                                            <small class="text-muted">PERSONAL REBATES Bonus from JMDLONSO001</small>
                                        </td>
                                        <td class="px-3 py-3 text-end">
                                            <span class="badge bg-success rounded-pill">+324.00</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-3 py-3"><strong>39170</strong></td>
                                        <td class="px-3 py-3">
                                            <span class="badge bg-primary rounded-pill">2025-07-31 20:03:02</span>
                                        </td>
                                        <td class="px-3 py-3">
                                            <small class="text-muted">PERSONAL REBATES Bonus from JMDLONSO001</small>
                                        </td>
                                        <td class="px-3 py-3 text-end">
                                            <span class="badge bg-success rounded-pill">+346.00</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-3 py-3"><strong>30859</strong></td>
                                        <td class="px-3 py-3">
                                            <span class="badge bg-primary rounded-pill">2025-07-31 19:02:03</span>
                                        </td>
                                        <td class="px-3 py-3">
                                            <small class="text-muted">SALES MATCH from ITadmin</small>
                                        </td>
                                        <td class="px-3 py-3 text-end">
                                            <span class="badge bg-success rounded-pill">+324.00</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="px-3 py-3"><strong>30858</strong></td>
                                        <td class="px-3 py-3">
                                            <span class="badge bg-primary rounded-pill">2025-07-31 18:05:02</span>
                                        </td>
                                        <td class="px-3 py-3">
                                            <small class="text-muted">Referral Bonus ITadmin</small>
                                        </td>
                                        <td class="px-3 py-3 text-end">
                                            <span class="badge bg-success rounded-pill">+859.00</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Right: Network Status -->
            <div class="col-xl-4 col-lg-4 col-md-12">
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
                        
                        <div class="mt-3 p-2 bg-light rounded">
                            <small class="text-muted">Utilize the capability to monitor your network account status comprehensively. This encompasses essential details such as your accounts, direct sponsor, and binary downlines. Stay informed and in control of your network's dynamics.</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}


function getPromoContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-bullhorn me-2"></i>Promotional Campaigns</h2>
            <button class="btn btn-primary" onclick="showAlert('Create New Campaign feature coming soon!', 'info')">
                <i class="fas fa-plus me-2"></i>Create Campaign
            </button>
        </div>
        
        <div class="row g-4">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Summer Sale 2024</h5>
                        <p class="text-muted">20% off all supplements</p>
                        <span class="badge bg-success">Active</span>
                        <div class="mt-3">
                            <small class="text-muted">Valid until: Dec 31, 2024</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5>New Member Bonus</h5>
                        <p class="text-muted">₱500 welcome bonus</p>
                        <span class="badge bg-primary">Scheduled</span>
                        <div class="mt-3">
                            <small class="text-muted">Starts: Jan 1, 2025</small>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5>Loyalty Rewards</h5>
                        <p class="text-muted">Extra points for repeat customers</p>
                        <span class="badge bg-warning">Pending</span>
                        <div class="mt-3">
                            <small class="text-muted">Under review</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getStoreContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-store me-2"></i>Store Management</h2>
            <button class="btn btn-primary" onclick="showAlert('Add New Product feature coming soon!', 'info')">
                <i class="fas fa-plus me-2"></i>Add Product
            </button>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.products
                                .map(
                                    (product) => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <i class="${product.icon} me-2"></i>
                                            ${product.name}
                                        </div>
                                    </td>
                                    <td><span class="badge bg-secondary">${product.category}</span></td>
                                    <td>${formatCurrency(product.price)}</td>
                                    <td>
                                        <span class="badge ${product.stock > 10 ? "bg-success" : "bg-warning"}">${product.stock}</span>
                                    </td>
                                    <td><span class="badge bg-success">Active</span></td>
                                    <td>
                                        <button class="btn btn-sm btn-outline-primary me-1" 
                                                onclick="showAlert('Edit product feature coming soon!', 'info')">Edit</button>
                                        <button class="btn btn-sm btn-outline-danger" 
                                                onclick="showAlert('Delete product feature coming soon!', 'warning')">Delete</button>
                                    </td>
                                </tr>
                            `,
                                )
                                .join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getSalesContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-chart-bar me-2"></i>Sales Analytics</h2>
            <div class="btn-group">
                <button class="btn btn-outline-primary active">Today</button>
                <button class="btn btn-outline-primary">Week</button>
                <button class="btn btn-outline-primary">Month</button>
            </div>
        </div>
        
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>₱45,230</h3>
                        <p class="mb-0">Today's Sales</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>₱312,450</h3>
                        <p class="mb-0">This Week</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>₱1,234,560</h3>
                        <p class="mb-0">This Month</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>156</h3>
                        <p class="mb-0">Orders</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5><i class="fas fa-chart-line me-2"></i>Sales Trend</h5>
            </div>
            <div class="card-body">
                <div class="text-center p-4">
                    <i class="fas fa-chart-area fa-3x text-primary mb-3"></i>
                    <p class="text-muted">Sales trend chart would appear here</p>
                </div>
            </div>
        </div>
    `;
}

function getItemsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-boxes me-2"></i>Item Management</h2>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="showAlert('Add Item feature coming soon!', 'info')">
                    <i class="fas fa-plus me-2"></i>Add Item
                </button>
                <button class="btn btn-outline-primary" onclick="showAlert('Import Items feature coming soon!', 'info')">
                    <i class="fas fa-upload me-2"></i>Import
                </button>
            </div>
        </div>
        
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>24</h3>
                        <p class="mb-0">Total Items</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>18</h3>
                        <p class="mb-0">In Stock</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>6</h3>
                        <p class="mb-0">Low Stock</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>2</h3>
                        <p class="mb-0">Out of Stock</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <input type="text" class="form-control" placeholder="Search items...">
                    </div>
                    <div class="col-md-3">
                        <select class="form-select">
                            <option>All Categories</option>
                            <option>Supplements</option>
                            <option>Wellness</option>
                            <option>Beauty</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <select class="form-select">
                            <option>All Status</option>
                            <option>In Stock</option>
                            <option>Low Stock</option>
                            <option>Out of Stock</option>
                        </select>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>SKU</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${mockData.products
                                .map(
                                    (product) => `
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <i class="${product.icon} me-2"></i>
                                            <div>
                                                <div class="fw-bold">${product.name}</div>
                                                <small class="text-muted">${product.description}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td><code>${product.id.toUpperCase()}</code></td>
                                    <td><span class="badge bg-secondary">${product.category}</span></td>
                                    <td>${formatCurrency(product.price)}</td>
                                    <td>
                                        <span class="badge ${product.stock > 10 ? "bg-success" : product.stock > 0 ? "bg-warning" : "bg-danger"}">
                                            ${product.stock}
                                        </span>
                                    </td>
                                    <td>
                                        <span class="badge ${product.stock > 0 ? "bg-success" : "bg-danger"}">
                                            ${product.stock > 0 ? "Available" : "Out of Stock"}
                                        </span>
                                    </td>
                                    <td>
                                        <div class="btn-group">
                                            <button class="btn btn-sm btn-outline-primary" 
                                                    onclick="showAlert('Edit item feature coming soon!', 'info')">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-success" 
                                                    onclick="showAlert('Restock feature coming soon!', 'info')">
                                                <i class="fas fa-plus"></i>
                                            </button>
                                            <button class="btn btn-sm btn-outline-danger" 
                                                    onclick="showAlert('Delete item feature coming soon!', 'warning')">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `,
                                )
                                .join("")}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function getActivationContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-key me-2"></i>Account Activation</h2>
            <button class="btn btn-primary" onclick="showAlert('Generate Activation Code feature coming soon!', 'info')">
                <i class="fas fa-plus me-2"></i>Generate Code
            </button>
        </div>
        
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>47</h3>
                        <p class="mb-0">Pending Activations</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>234</h3>
                        <p class="mb-0">Active Users</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>12</h3>
                        <p class="mb-0">Expired Codes</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>156</h3>
                        <p class="mb-0">Total Codes</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-list me-2"></i>Activation Codes</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Code</th>
                                        <th>Type</th>
                                        <th>Created</th>
                                        <th>Expires</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>GGV-2024-ABCD</code></td>
                                        <td><span class="badge bg-primary">Standard</span></td>
                                        <td>Jan 15, 2024</td>
                                        <td>Feb 15, 2024</td>
                                        <td><span class="badge bg-warning">Active</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger" 
                                                    onclick="showAlert('Deactivate code feature coming soon!', 'warning')">
                                                Deactivate
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>GGV-2024-EFGH</code></td>
                                        <td><span class="badge bg-success">Premium</span></td>
                                        <td>Jan 10, 2024</td>
                                        <td>Mar 10, 2024</td>
                                        <td><span class="badge bg-success">Used</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-secondary" disabled>
                                                Used
                                            </button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><code>GGV-2024-IJKL</code></td>
                                        <td><span class="badge bg-primary">Standard</span></td>
                                        <td>Dec 20, 2023</td>
                                        <td>Jan 20, 2024</td>
                                        <td><span class="badge bg-danger">Expired</span></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-primary" 
                                                    onclick="showAlert('Extend code feature coming soon!', 'info')">
                                                Extend
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-plus me-2"></i>Quick Generate</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Code Type</label>
                                <select class="form-select">
                                    <option>Standard</option>
                                    <option>Premium</option>
                                    <option>Trial</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Expiry Days</label>
                                <select class="form-select">
                                    <option>30 Days</option>
                                    <option>60 Days</option>
                                    <option>90 Days</option>
                                    <option>Never</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Quantity</label>
                                <input type="number" class="form-control" value="1" min="1" max="100">
                            </div>
                            <button type="button" class="btn btn-primary w-100" 
                                    onclick="showAlert('Generate codes feature coming soon!', 'info')">
                                <i class="fas fa-magic me-2"></i>Generate
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// eWallet Summary Content Function
function getEwalletSummaryContent() {
  return `
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2><i class="fas fa-wallet me-2"></i>eWallet Summary</h2>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-lg-4 col-md-6 col-12">
        <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); border-radius: 12px;">
          <div class="card-body py-3">
            <h6 class="text-white-75 mb-2">Available eWallet</h6>
            <h1 class="mb-0 fw-bold">PHP1,854.00</h1>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-12">
        <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #F87171 0%, #EF4444 100%); border-radius: 12px;">
          <div class="card-body py-3">
            <h6 class="text-white-75 mb-2">Debit</h6>
            <h1 class="mb-0 fw-bold">PHP0.00</h1>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12 col-12">
        <div class="card text-white border-0 shadow-sm" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 12px;">
          <div class="card-body py-3">
            <h6 class="text-white-75 mb-2">Total eWallet</h6>
            <h1 class="mb-0 fw-bold">PHP1,854.00</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="card border-0 shadow-sm" style="border-radius: 12px;">
      <div class="card-body p-0">
        <div class="px-4 pt-4 pb-3 d-flex justify-content-between align-items-center">
          <h5 class="mb-0">eWallet</h5>
          <div class="input-group" style="max-width: 300px;">
            <span class="input-group-text bg-light"><i class="fas fa-search text-muted"></i></span>
            <input type="text" class="form-control bg-light" placeholder="Search">
          </div>
        </div>
        <div class="table-responsive px-4 pb-4">
            <table class="table table-hover mb-0">
                <thead style="background-color: #f3f0ff; font-weight: 600;">
                <tr>
                    <th class="text-start">TRANS#</th>
                    <th class="text-start">DATE</th>
                    <th class="text-start">ACCOUNT_CODE</th>
                    <th class="text-start">DESCRIPTION</th>
                    <th class="text-end">AMOUNT</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td><strong>39174</strong></td>
                    <td><span class="badge bg-primary">2025-07-31 21:01:05</span></td>
                    <td>PSR</td>
                    <td>
                    <small class="text-muted">
                        NAME: JMDLONSO001<br>
                        ACCOUNT_NO: PERSONAL REBATES<br>
                        TYPE: E-WALLET<br>
                        CONTACT_NO: 639306070965<br>
                        PERSONAL REBATES Bonus from JMDLONSO001
                    </small>
                    </td>
                    <td class="text-end"><span class="badge bg-success">+270.00</span></td>
                </tr>
                <tr>
                    <td><strong>39171</strong></td>
                    <td><span class="badge bg-primary">2025-07-31 20:46:06</span></td>
                    <td>PSR</td>
                    <td>
                    <small class="text-muted">
                        NAME: JMDLONSO001<br>
                        ACCOUNT_NO: PERSONAL REBATES<br>
                        TYPE: E-WALLET<br>
                        CONTACT_NO: 639306070965<br>
                        PERSONAL REBATES Bonus from JMDLONSO001
                    </small>
                    </td>
                    <td class="text-end"><span class="badge bg-success">+225.00</span></td>
                </tr>
                <tr>
                    <td><strong>39170</strong></td>
                    <td><span class="badge bg-primary">2025-07-31 20:37:06</span></td>
                    <td>PSR</td>
                    <td>
                    <small class="text-muted">
                        NAME: JMDLONSO001<br>
                        ACCOUNT_NO: PERSONAL REBATES<br>
                        TYPE: E-WALLET<br>
                        CONTACT_NO: 639306070965<br>
                        PERSONAL REBATES Bonus from JMDLONSO001
                    </small>
                    </td>
                    <td class="text-end"><span class="badge bg-success">+45.00</span></td>
                </tr>
                </tbody>
            </table>

            <!-- Pagination Footer -->
            <div class="d-flex justify-content-between align-items-center px-4 py-3 border-top">
                <small class="text-muted">Showing 1 to 3 of 3 entries</small>
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
      </div>
    </div>
  `;
}


function getWalletContent() {
    return getEwalletSummaryContent(); // Use the same content for admin wallet
}

function getSettingsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-cogs me-2"></i>System Settings</h2>
            <button class="btn btn-primary" onclick="showAlert('Save Settings feature coming soon!', 'info')">
                <i class="fas fa-save me-2"></i>Save Changes
            </button>
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-sliders-h me-2"></i>General Settings</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Company Name</label>
                                        <input type="text" class="form-control" value="GGVerse MLM Platform">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Currency</label>
                                        <select class="form-select">
                                            <option selected>Philippine Peso (₱)</option>
                                            <option>US Dollar ($)</option>
                                            <option>Euro (€)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Time Zone</label>
                                        <select class="form-select">
                                            <option selected>Asia/Manila</option>
                                            <option>UTC</option>
                                            <option>America/New_York</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Date Format</label>
                                        <select class="form-select">
                                            <option>MM/DD/YYYY</option>
                                            <option selected>DD/MM/YYYY</option>
                                            <option>YYYY-MM-DD</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-header">
                        <h5><i class="fas fa-percentage me-2"></i>Commission Settings</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Level 1 Commission (%)</label>
                                        <input type="number" class="form-control" value="15" min="0" max="100">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Level 2 Commission (%)</label>
                                        <input type="number" class="form-control" value="10" min="0" max="100">
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="mb-3">
                                        <label class="form-label">Level 3 Commission (%)</label>
                                        <input type="number" class="form-control" value="5" min="0" max="100">
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Minimum Payout</label>
                                        <input type="number" class="form-control" value="1000" min="0">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="mb-3">
                                        <label class="form-label">Payout Schedule</label>
                                        <select class="form-select">
                                            <option>Daily</option>
                                            <option selected>Weekly</option>
                                            <option>Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-bell me-2"></i>Notifications</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="emailNotif" checked>
                            <label class="form-check-label" for="emailNotif">Email Notifications</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="smsNotif" checked>
                            <label class="form-check-label" for="smsNotif">SMS Notifications</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="pushNotif">
                            <label class="form-check-label" for="pushNotif">Push Notifications</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="weeklyReports" checked>
                            <label class="form-check-label" for="weeklyReports">Weekly Reports</label>
                        </div>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-header">
                        <h5><i class="fas fa-shield-alt me-2"></i>Security</h5>
                    </div>
                    <div class="card-body">
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="twoFactor" checked>
                            <label class="form-check-label" for="twoFactor">Two-Factor Authentication</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="loginAlerts" checked>
                            <label class="form-check-label" for="loginAlerts">Login Alerts</label>
                        </div>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="sessionTimeout" checked>
                            <label class="form-check-label" for="sessionTimeout">Auto Session Timeout</label>
                        </div>
                        <button class="btn btn-outline-danger w-100 mt-3" 
                                onclick="showAlert('Change Password feature coming soon!', 'info')">
                            <i class="fas fa-key me-2"></i>Change Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getSmsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-sms me-2"></i>SMS Management</h2>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="showAlert('Compose SMS feature coming soon!', 'info')">
                    <i class="fas fa-edit me-2"></i>Compose SMS
                </button>
                <button class="btn btn-outline-primary" onclick="showAlert('Bulk SMS feature coming soon!', 'info')">
                    <i class="fas fa-users me-2"></i>Bulk SMS
                </button>
            </div>
        </div>
        
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>1,247</h3>
                        <p class="mb-0">Total Sent</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>1,189</h3>
                        <p class="mb-0">Delivered</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>58</h3>
                        <p class="mb-0">Failed</p>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card">
                    <div class="card-body text-center">
                        <h3>₱3,450</h3>
                        <p class="mb-0">Credits Used</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-history me-2"></i>SMS History</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Recipient</th>
                                        <th>Message</th>
                                        <th>Status</th>
                                        <th>Cost</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Jan 15, 2024</td>
                                        <td>+639XXXXXXXXX</td>
                                        <td>Welcome to GGVerse! Your account has been activated.</td>
                                        <td><span class="badge bg-success">Delivered</span></td>
                                        <td>₱2.50</td>
                                    </tr>
                                    <tr>
                                        <td>Jan 15, 2024</td>
                                        <td>+639XXXXXXXXX</td>
                                        <td>Your order #ORD001 has been confirmed.</td>
                                        <td><span class="badge bg-success">Delivered</span></td>
                                        <td>₱2.50</td>
                                    </tr>
                                    <tr>
                                        <td>Jan 14, 2024</td>
                                        <td>+639XXXXXXXXX</td>
                                        <td>Commission payment of ₱2,500 has been processed.</td>
                                        <td><span class="badge bg-danger">Failed</span></td>
                                        <td>₱0.00</td>
                                    </tr>
                                    <tr>
                                        <td>Jan 14, 2024</td>
                                        <td>+639XXXXXXXXX</td>
                                        <td>Special promo: 20% off all supplements this week!</td>
                                        <td><span class="badge bg-success">Delivered</span></td>
                                        <td>₱2.50</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h5><i class="fas fa-edit me-2"></i>Quick Send</h5>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label class="form-label">Recipient</label>
                                <input type="tel" class="form-control" placeholder="+639XXXXXXXXX">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Message</label>
                                <textarea class="form-control" rows="4" placeholder="Type your message here..."></textarea>
                                <div class="form-text">160 characters remaining</div>
                            </div>
                            <button type="button" class="btn btn-primary w-100" 
                                    onclick="showAlert('Send SMS feature coming soon!', 'info')">
                                <i class="fas fa-paper-plane me-2"></i>Send SMS
                            </button>
                        </form>
                    </div>
                </div>
                
                <div class="card mt-4">
                    <div class="card-header">
                        <h5><i class="fas fa-templates me-2"></i>SMS Templates</h5>
                    </div>
                    <div class="card-body">
                        <div class="list-group list-group-flush">
                            <button class="list-group-item list-group-item-action" 
                                    onclick="showAlert('Load template feature coming soon!', 'info')">
                                Welcome Message
                            </button>
                            <button class="list-group-item list-group-item-action" 
                                    onclick="showAlert('Load template feature coming soon!', 'info')">
                                Order Confirmation
                            </button>
                            <button class="list-group-item list-group-item-action" 
                                    onclick="showAlert('Load template feature coming soon!', 'info')">
                                Payment Notification
                            </button>
                            <button class="list-group-item list-group-item-action" 
                                    onclick="showAlert('Load template feature coming soon!', 'info')">
                                Promotional Offer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
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

// USER DASHBOARD CONTENT FUNCTION REMOVED

// EWALLET CONTENT FUNCTION REMOVED






// POS Module Functions
function loadPosContent() {
    const contentDiv = document.getElementById("pos-module-content");
    if (!contentDiv) return;

    contentDiv.innerHTML = getPosContent();
    loadProducts();
    updateCartDisplay();
}

function getPosContent() {
    return `
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-8">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h2><i class="fas fa-cash-register me-2"></i>Point of Sale</h2>
                        <div class="input-group" style="max-width: 300px;">
                            <input type="text" class="form-control" placeholder="Search products..." id="product-search">
                            <button class="btn btn-outline-secondary" onclick="searchProducts()">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <div class="btn-group" role="group">
                            <button class="btn btn-outline-primary active" onclick="filterProducts('all')">All</button>
                            <button class="btn btn-outline-primary" onclick="filterProducts('supplements')">Supplements</button>
                            <button class="btn btn-outline-primary" onclick="filterProducts('wellness')">Wellness</button>
                            <button class="btn btn-outline-primary" onclick="filterProducts('beauty')">Beauty</button>
                        </div>
                    </div>
                    
                    <div id="products-grid" class="row g-3">
                        <!-- Products will be loaded here -->
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="card sticky-top">
                        <div class="card-header">
                            <h5><i class="fas fa-shopping-cart me-2"></i>Shopping Cart</h5>
                        </div>
                        <div class="card-body">
                            <div id="cart-items" class="mb-3" style="max-height: 400px; overflow-y: auto;">
                                <!-- Cart items will be displayed here -->
                            </div>
                            
                            <div class="border-top pt-3">
                                <div class="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span id="cart-subtotal">₱0.00</span>
                                </div>
                                <div class="d-flex justify-content-between mb-2">
                                    <span>Tax (12%):</span>
                                    <span id="cart-tax">₱0.00</span>
                                </div>
                                <div class="d-flex justify-content-between mb-3 fw-bold">
                                    <span>Total:</span>
                                    <span id="cart-total">₱0.00</span>
                                </div>
                                
                                <div class="d-grid gap-2">
                                    <button class="btn btn-success btn-lg" onclick="processPayment()" id="checkout-btn" disabled>
                                        <i class="fas fa-credit-card me-2"></i>Process Payment
                                    </button>
                                    <button class="btn btn-outline-danger" onclick="clearCart()">
                                        <i class="fas fa-trash me-2"></i>Clear Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
                <div class="px-4 py-3 border-top d-flex flex-column flex-md-row justify-content-between align-items-center">
                    <div class="text-muted small mb-2 mb-md-0">Showing 1 to 10 of 14 entries</div>
                    <nav>
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <i class="fas fa-chevron-left"></i>
                                </a>
                            </li>
                            <li class="page-item active"><a class="page-link bg-primary border-primary" href="#">1</a></li>
                            <li class="page-item"><a class="page-link" href="#">2</a></li>
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <i class="fas fa-chevron-right"></i>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    `;
}

// eWallet sub-module functions


function getEncashWalletContent() {
    return `
        <div class="container-fluid px-3 px-md-4 py-3">
            <!-- Page Header -->
            <div class="row mb-4">
                <div class="col-12">
                <h2 class="fw-bold mb-0"><i class="fas fa-wallet me-2"></i>Encash eWallet</h2>
                </div>
            </div>

            <!-- Form Card -->
            <div class="row justify-content-center">
                <div class="col-12 col-xl-8">
                <div class="card border-0 shadow-sm" style="border-radius: 12px;">
                    <div class="card-body p-3 p-md-5">
                    <h5 class="mb-4 fw-normal">eWallet Encashment Form</h5>

                    <form>
                        <!-- Payout Option -->
                        <div class="mb-4">
                        <label class="form-label text-muted mb-2">Payout Option:</label>
                        <button type="button" class="btn btn-primary w-100 py-3" style="border-radius: 8px;">
                            Add Payout Option
                        </button>
                        </div>

                        <!-- Account Info -->
                        <div class="mb-4">
                        <label for="accountName" class="form-label text-muted mb-2">Account:</label>
                        <input type="text" class="form-control form-control-lg" id="accountName" value="JMDLONSO001" readonly>
                        </div>

                        <!-- Available & Amount -->
                        <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label for="availableBalance" class="form-label text-muted mb-2">Available:</label>
                            <input type="text" class="form-control form-control-lg" id="availableBalance" value="PHP1,854.00" readonly>
                        </div>
                        <div class="col-md-6">
                            <label for="withdrawAmount" class="form-label text-muted mb-2">Amount to Withdraw:</label>
                            <input type="number" class="form-control form-control-lg" id="withdrawAmount" placeholder="500" min="100" step="0.01">
                        </div>
                        </div>

                        <!-- Branch & PIN -->
                        <div class="row g-3 mb-4">
                        <div class="col-md-6">
                            <label for="pickupBranch" class="form-label text-muted mb-2">Pickup Branch:</label>
                            <select class="form-select form-select-lg" id="pickupBranch">
                            <option value="">Select Pickup Branch</option>
                            <option value="manila">Manila Branch</option>
                            <option value="quezon">Quezon City Branch</option>
                            <option value="makati">Makati Branch</option>
                            <option value="cebu">Cebu Branch</option>
                            <option value="davao">Davao Branch</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="withdrawalPin" class="form-label text-muted mb-2">Withdrawal PIN:</label>
                            <div class="d-flex gap-2 flex-wrap">
                            <input type="password" class="form-control form-control-lg flex-grow-1" id="withdrawalPin" placeholder="Enter PIN">
                            <button type="button" class="btn btn-info px-3 py-2" style="border-radius: 8px;">Set withdrawal PIN</button>
                            </div>
                        </div>
                        </div>

                        <!-- Warning Message -->
                        <div class="alert alert-warning d-flex align-items-center mb-4" style="border-radius: 8px;">
                        <i class="fas fa-exclamation-triangle me-3 text-warning"></i>
                        <span class="flex-grow-1 text-warning">
                            <strong>Warning!</strong> Mobile number not verified! Please verify to proceed.
                        </span>
                        <button type="button" class="btn-close ms-2" aria-label="Close"></button>
                        </div>

                        <!-- Action Buttons -->
                        <div class="d-flex flex-column flex-md-row gap-3 justify-content-md-end mt-5">
                        <button type="button" class="btn btn-outline-info px-4 py-2">Reload page</button>
                        <button type="submit" class="btn btn-success px-4 py-2">Submit Request</button>
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

function getWithdrawalPinContent() {
  return `
    <div class="card mx-auto" style="max-width: 500px;">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0"><i class="fas fa-key me-2"></i>Set Withdrawal PIN</h5>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="card-body">
        <form>
          <div class="mb-3">
            <label for="currentPasswordPIN" class="form-label">Current Password:</label>
            <input type="password" class="form-control" id="currentPasswordPIN" placeholder="Current Password">
          </div>
          <div class="mb-4">
            <label for="withdrawalPINSet" class="form-label">Withdrawal PIN:</label>
            <input type="password" class="form-control" id="withdrawalPINSet" placeholder="Enter withdrawal PIN here">
          </div>
          <div class="d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-info">
              <i class="fas fa-shield-alt me-2"></i>Set PIN
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


// Global state for tracking active page
let activePage = null;

// ====================================
// UNIVERSAL DROPDOWN SYSTEM - REBUILT
// ====================================
// One universal system for ALL 7 dropdowns: Dashboard, eWallet, ePoints, Organization, Reports, Shop, Account Setting

// SIDEBAR TOGGLE FUNCTION REMOVED

// SIDEBAR DROPDOWN FUNCTION REMOVED

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(d => d.classList.remove('show'));
    document.querySelectorAll('.dropdown-arrow').forEach(arrow => arrow.classList.remove('rotated'));
}

function handleDropdownItemClick(moduleId, dropdownType = null) {
    // Remove active from all dropdown items
    document.querySelectorAll('.dropdown-item').forEach(item => item.classList.remove('active'));
    
    // Add active to clicked item
    event?.target?.classList.add('active');
    
    // Load the content
    showUserModule(moduleId, dropdownType);
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


function getDirectSponsorsContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
                <h4 class="mb-0 me-3">Direct Sponsored</h4>
                <span class="badge bg-info text-white">JMDLONSO001</span>
            </div>
        </div>
        
        <!-- Direct Sponsors Table -->
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
                                <th>DATE <i class="fas fa-sort"></i></th>
                                <th>USERNAME <i class="fas fa-sort"></i></th>
                                <th>NAME <i class="fas fa-sort"></i></th>
                                <th>TYPE <i class="fas fa-sort"></i></th>
                                <th class="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-06-24 19:56:12</td>
                                <td>jmdlonsod</td>
                                <td>Dlonsod, Jesher Charles [jmdlonsod]</td>
                                <td>
                                    <span class="badge bg-success">SILVER</span>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-info">
                                        <i class="fas fa-arrow-up"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2025-07-11 18:50:37</td>
                                <td>ITadmin</td>
                                <td>Admin, IT [ITadmin]</td>
                                <td>
                                    <span class="badge bg-success">SILVER</span>
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

function getBinaryListContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="d-flex align-items-center">
                <h4 class="mb-0 me-3">Binary List</h4>
                <span class="badge bg-info text-white">JMDLONSO001</span>
            </div>
        </div>
        
        <!-- Binary List Table -->
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
                                <th>TYPE <i class="fas fa-sort"></i></th>
                                <th class="text-center">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>2025-03-04 19:19:21</td>
                                <td>JMDLONSO001</td>
                                <td>
                                    Admin, IT<br>
                                    <small class="text-muted">**********</small>
                                </td>
                                <td>
                                    <span class="badge bg-warning text-dark">PLATINUM</span><br>
                                    <span class="badge bg-success mt-1">ACTIVE</span>
                                </td>
                                <td class="text-center">
                                    <button class="btn btn-sm btn-info">
                                        <i class="fas fa-arrow-up"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>2025-06-24 19:56:12</td>
                                <td>jmdlonsod</td>
                                <td>
                                    Dlonsod, Jesher Charles<br>
                                    <small class="badge bg-info text-white">ACCOUNT Admin [JMDLONSO001]</small>
                                </td>
                                <td>
                                    <span class="badge bg-success">SILVER</span><br>
                                    <span class="badge bg-success mt-1">ACTIVE</span>
                                </td>
                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-1">
                                        <span class="badge bg-purple text-white">LA</span>
                                        <span class="badge bg-secondary text-white">1B</span>
                                        <button class="btn btn-sm btn-info">
                                            <i class="fas fa-arrow-up"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>2025-07-11 18:50:37</td>
                                <td>ITadmin</td>
                                <td>
                                    Admin, IT<br>
                                    <small class="badge bg-info text-white">ACCOUNT Admin [JMDLONSO001]</small>
                                </td>
                                <td>
                                    <span class="badge bg-success">SILVER</span><br>
                                    <span class="badge bg-success mt-1">ACTIVE</span>
                                </td>
                                <td class="text-center">
                                    <div class="d-flex justify-content-center gap-1">
                                        <span class="badge bg-purple text-white">LA</span>
                                        <span class="badge bg-secondary text-white">1B</span>
                                        <button class="btn btn-sm btn-info">
                                            <i class="fas fa-arrow-up"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 1 to 3 of 3 entries</small>
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

// Missing content functions for all sidebar items
function getEPointsSummaryContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-coins me-2"></i>ePoints Summary</h2>
            <div class="text-muted">${formatDateTime(new Date())}</div>
        </div>
        
        <div class="row mb-4">
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h5>Available Points</h5>
                        <h3>1,537 PTS</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-success">
                    <div class="card-body">
                        <h5>Total Earned</h5>
                        <h3>8,450 PTS</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-info">
                    <div class="card-body">
                        <h5>Total Redeemed</h5>
                        <h3>6,913 PTS</h3>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <div class="card-header">
                <h5>Points Transaction History</h5>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Transaction</th>
                                <th>Points</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>2025-01-22</td>
                                <td>Purchase Reward</td>
                                <td class="text-success">+250</td>
                                <td>1,537</td>
                            </tr>
                            <tr>
                                <td>2025-01-20</td>
                                <td>Referral Bonus</td>
                                <td class="text-success">+500</td>
                                <td>1,287</td>
                            </tr>
                        </tbody>
                    </table>
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
        
        <div class="row mb-4">
            <div class="col-md-6">
                <div class="card text-white bg-success">
                    <div class="card-body">
                        <h5>Left Leg</h5>
                        <h3>124 Members</h3>
                        <p>Total Volume: ₱45,600</p>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white bg-info">
                    <div class="card-body">
                        <h5>Right Leg</h5>
                        <h3>98 Members</h3>
                        <p>Total Volume: ₱38,200</p>
                    </div>
                </div>
            </div>
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

function getCheckoutContent() {
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-credit-card me-2"></i>Checkout</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <h5>Order Summary</h5>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Wellness Pack</td>
                                <td>2</td>
                                <td>₱2,500</td>
                                <td>₱5,000</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="3">Total:</th>
                                <th>₱5,000</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <button class="btn btn-success">Complete Purchase</button>
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
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-lock me-2"></i>Change Password</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label class="form-label">Current Password</label>
                        <input type="password" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">New Password</label>
                        <input type="password" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Confirm New Password</label>
                        <input type="password" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-primary">Change Password</button>
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
        "withdrawal-pin": getWithdrawalPinContent(),
        "claim-products": getClaimProductsContent(),
        "direct-referral": getDirectReferralContent(),
        "sales-match-bonus": getSalesMatchBonusContent(),
        "leadership-bonus": getLeadershipBonusContent(),
        "personal-rebates": getPersonalRebatesContent(),
        "unilevel-bonus": getUnilevelBonusContent(),
        "shop-now": getShopNowContent(),
        checkout: getCheckoutContent(),
        transactions: getTransactionsContent(),
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
                            <button class="btn btn-warning">Continue Shopping</button>
                            <button class="btn btn-primary">Place Order</button>
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

function getChangePasswordContent() {
    return `
        <div class="card mx-auto" style="max-width: 500px;">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Update Password</h5>
                <button type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="card-body">
                <form>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username:</label>
                        <input type="text" class="form-control" id="username" value="JMDLONSOD01" readonly>
                    </div>
                    
                    <div class="mb-3">
                        <label for="currentPasswordChange" class="form-label">Current Password:</label>
                        <input type="password" class="form-control" id="currentPasswordChange" placeholder="Current Password">
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
function getEpointsSummaryContent() {
    return getAccountSummaryContent(); // Use the same content for now
}

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
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-gift me-2"></i>ePoints Purchase</h2>
        </div>
        
        <div class="card">
            <div class="card-body">
                <!-- Account and Claim Information -->
                <div class="row mb-4">
                    <div class="col-md-6">
                        <label class="form-label">Account:</label>
                        <input type="text" class="form-control" value="JMDLONSO001" readonly>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Claim Value:</label>
                        <input type="number" class="form-control" value="0" min="0">
                    </div>
                </div>
                
                <div class="row mb-4">
                    <div class="col-md-6">
                        <label class="form-label">Available:</label>
                        <input type="text" class="form-control" value="PHP36.00" readonly>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Password:</label>
                        <input type="password" class="form-control" placeholder="Account Password">
                    </div>
                </div>
                
                <div class="row mb-4">
                    <div class="col-md-6">
                        <label class="form-label">Pickup Branch:</label>
                        <select class="form-select">
                            <option>Select Pickup Branch</option>
                            <option>Main Branch</option>
                            <option>North Branch</option>
                            <option>South Branch</option>
                        </select>
                    </div>
                </div>
                
                <!-- Products Table -->
                <div class="table-responsive mb-4">
                    <table class="table table-bordered">
                        <thead class="table-light">
                            <tr>
                                <th style="width: 50px;">#</th>
                                <th>Package Code</th>
                                <th>Description</th>
                                <th class="text-end">PRICE</th>
                                <th style="width: 100px;">Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">1</td>
                                <td>SGGUARD</td>
                                <td>Synbiotic+Gutguard</td>
                                <td class="text-end">2280.00</td>
                                <td>
                                    <input type="number" class="form-control form-control-sm" value="0" min="0">
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">2</td>
                                <td>BPGUARD</td>
                                <td>Synbiotic+Gutguard BPGUARD*100</td>
                                <td class="text-end">520.00</td>
                                <td>
                                    <input type="number" class="form-control form-control-sm" value="0" min="0">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <!-- Action Buttons -->
                <div class="d-flex justify-content-end gap-2">
                    <button type="button" class="btn btn-info">
                        <i class="fas fa-paper-plane me-2"></i>Submit
                    </button>
                    <button type="button" class="btn btn-warning">
                        <i class="fas fa-times me-2"></i>Close
                    </button>
                </div>
            </div>
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

function initializeUserSidebarNavigation() {
    // Only initialize when user page is visible
    const userPage = document.querySelector("#user-page");
    if (!userPage || userPage.classList.contains("d-none")) return;
    
    // Initialize dropdown toggles for user sidebar
    initializeUserDropdowns();
    
    // Initialize outside click handler for mobile
    initializeUserMobileOverlay();
    
    // Initialize default user page content
    loadUserPage('welcome');
    
    console.log("User sidebar navigation initialized");
}

// Toggle dropdowns in user sidebar
function initializeUserDropdowns() {
    const userSidebar = document.querySelector(".user-sidebar");
    if (!userSidebar) return;
    
    const menuToggleButtons = userSidebar.querySelectorAll(".menu-toggle");
    console.log(`Initialized ${menuToggleButtons.length} dropdown toggles`);
    
    menuToggleButtons.forEach(button => {
        // Remove any existing event listeners
        button.replaceWith(button.cloneNode(true));
    });
    
    // Re-select and add fresh event listeners for dropdown toggles
    userSidebar.querySelectorAll(".menu-toggle").forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const menuSection = button.parentElement;
            
            // Just toggle the clicked dropdown (no accordion behavior on toggle)
            menuSection.classList.toggle("open");
            
            console.log(`User dropdown ${button.textContent} toggled`);
        });
    });
    
    // ADD ACCORDION BEHAVIOR FOR SUBMENU ITEMS
    const submenuItems = userSidebar.querySelectorAll(".submenu li a");
    console.log(`Found ${submenuItems.length} submenu items in user sidebar`);
    
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
            
            userSidebar.querySelectorAll(".menu-section").forEach(section => {
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

            // Remove 'active' from all submenu links
            document.querySelectorAll(".submenu li a").forEach(l => {
                l.classList.remove("active");
            });

            // Add 'active' to clicked link
            link.classList.add("active");
            console.log(`Added active to:`, link.textContent.trim(), `Has active class:`, link.classList.contains('active'));

            // Execute original onclick if it existed (for content loading)
            if (originalOnclick) {
                try {
                    console.log(`Executing original onclick: ${originalOnclick}`);
                    eval(originalOnclick);
                } catch (error) {
                    console.log("Error executing original onclick:", error);
                    // Fallback to loadUserModule for main pages
                    const pageName = link.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                    if (['account-summary', 'dashboard', 'codebank'].includes(pageName)) {
                        loadUserModule(pageName);
                    } else {
                        loadUserPage(pageName);
                    }
                }
            } else {
                // No original onclick - use navigation based on page name
                const pageName = link.textContent.trim().toLowerCase().replace(/\s+/g, '-');
                console.log(`No original onclick, navigating to: ${pageName}`);
                if (['account-summary', 'dashboard', 'codebank'].includes(pageName)) {
                    loadUserModule(pageName);
                } else {
                    loadUserPage(pageName);
                }
            }

            console.log(`Submenu item processing complete for: ${link.textContent.trim()}`);
        });
    });
}

// Mobile user sidebar toggle with floating button animation
function toggleUserSidebar() {
    const userSidebar = document.querySelector(".user-sidebar");
    const floatingToggle = document.getElementById("floatingToggle");
    
    if (userSidebar && floatingToggle) {
        const isOpening = !userSidebar.classList.contains("open");
        
        if (isOpening) {
            // Opening sidebar - hide floating button
            userSidebar.classList.add("open");
            floatingToggle.classList.add("hide");
            floatingToggle.classList.remove("show");
        } else {
            // Closing sidebar - show floating button
            userSidebar.classList.remove("open");
            floatingToggle.classList.remove("hide");
            floatingToggle.classList.add("show");
        }
        
        console.log("User sidebar toggled:", isOpening ? "opening" : "closing");
    }
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
    
    // Check if this is a special page with custom content
    if (pageName === 'ewallet-summary') {
        userPageContainer.innerHTML = getEwalletSummaryContent();
        console.log(`Loaded eWallet Summary page`);
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
    if (pageName === 'dashboard') {
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
