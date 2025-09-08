// MOCK DATA FOR PRODUCTS (Dynamic Categories & Items)
const productData = [
    {
        category: "Products Lines",
        products: [
            { sku: "SGGUARD", description: "Synbiotic+Gutguard", price: 2090, stock: 24 },
            { sku: "BPGUARD", description: "Synbiotic+Gutguard BPGUARD*1.00", price: 1299, stock: 10 },
        ],
    },
    {
        category: "Entry Packages",
        products: [
            { sku: "SILVER", description: "PAID SILVER", price: 3450, stock: 5 },
            { sku: "GOLD", description: "PAID GOLD", price: 10350, stock: 3 },
            { sku: "PLATINUM", description: "PAID PLATINUM", price: 34500, stock: 2 },
        ],
    },
    {
        category: "Unilevel Packages",
        products: [
            { sku: "Synbiotic+ MM", description: "Monthly Maintenance", price: 2090, stock: 15 },
        ],
    },
    {
        category: "Other Items",
        products: [],
    },
];
// Mock data (replace with API later)
// MOCK DATA FOR ORDERS
const OrderSummmaryContextMockOrder = [
    {
        transNo: 1,
        refNo: "20250326-10232",
        store: "DAVAO BRANCH",
        cashier: "Guild, Grinders [98293]",
        date: "2025-03-26 14:40:55",
        status: "PAID / COMPLETED",
        statusClass: "success",
        amount: 7638,
        dateCreated: "2025-03-26 12:00:00",
        poTo: "DAVAO SUPPLY CENTER",
        totalAmount: 7638,
        products: [
            {
                ...productData[0].products[0], // Synbiotic+Gutguard
                quantity: 2,
            },
            {
                ...productData[0].products[1], // Synbiotic+Gutguard BPGUARD
                quantity: 1,
            }
        ]
    },
    {
        transNo: 47,
        refNo: "20250330-10231",
        store: "DAVAO BRANCH",
        cashier: "Guild, Grinders [98293]",
        date: "2025-03-30 16:25:26",
        status: "PAID / COMPLETED",
        statusClass: "success",
        amount: 10350,
        dateCreated: "2025-03-30 15:00:00",
        poTo: "GAMER TECH SUPPLIES",
        totalAmount: 10350,
        products: [
            {
                ...productData[1].products[1], // GOLD Package
                quantity: 1,
            }
        ]
    },
    {
        transNo: 50,
        refNo: "20250401-10231",
        store: "DAVAO BRANCH",
        cashier: "Guild, Grinders [98293]",
        date: "2025-04-01 01:31:41",
        status: "PAID / COMPLETED",
        statusClass: "success",
        amount: 13840,
        dateCreated: "2025-04-01 00:10:00",
        poTo: "TECHNO HUB DAVAO",
        totalAmount: 13840,
        products: [
            {
                ...productData[1].products[0], // SILVER Package
                quantity: 2,
            },
            {
                ...productData[2].products[0], // Monthly Maintenance
                quantity: 1,
            }
        ]
    },
    {
        transNo: 25,
        refNo: "20350322-104302",
        store: "DAVAO BRANCH",
        cashier: "System",
        date: "2025-03-22 11:00:00",
        status: "VOIDED",
        statusClass: "danger",
        amount: 0.00,
        dateCreated: "2025-03-22 10:20:00",
        poTo: "N/A",
        totalAmount: 0.00,
        products: []
    }
];

// --- PERSONAL SALES MOCK DATA ---
const PersonalSalesMockData = [
    {
        transNo: 'PS158',
        customer: 'ADSUARA, ROMELYN [HEIDI]',
        dateCreated: '2023-05-14 09:29:40',
        status: 'PENDING / SETTLED CLAIMED PERSONAL',
        statusClass: 'warning',
        totalAmount: 45600.00,
        payment: 45600.00,
        cashier: 'JESSYLE MAE, DLONSOD',
        products: [
            { sku: 'GOLD', price: 10500.00, pts: 30.00, quantity: 1, total: 10500.00 },
            { sku: 'PLATINUM', price: 35000.00, pts: 100.00, quantity: 1, total: 35000.00 }
        ]
    },
    {
        transNo: 'PS159',
        customer: 'Salanggang, Grace [Gracious01]',
        dateCreated: '2023-05-14 11:17:38',
        status: 'PENDING / SETTLED CLAIMED PERSONAL',
        statusClass: 'warning',
        totalAmount: 7000.00,
        payment: 7000.00,
        cashier: 'JESSYLE MAE, DLONSOD',
        products: [
            { sku: 'GOLD', price: 7000.00, pts: 20.00, quantity: 1, total: 7000.00 }
        ]
    },
    {
        transNo: 'PS163',
        customer: 'Salanggang, Grace [Gracious01]',
        dateCreated: '2023-05-14 16:52:23',
        status: 'PENDING / SETTLED CLAIMED PERSONAL',
        statusClass: 'warning',
        totalAmount: 1500.00,
        payment: 1500.00,
        cashier: 'JESSYLE MAE, DLONSOD',
        products: [
            { sku: 'SILVER', price: 1500.00, pts: 10.00, quantity: 1, total: 1500.00 }
        ]
    },
    {
        transNo: 'PS148',
        customer: 'ASIDIGBAH IPOMELYN (PEDRO)',
        dateCreated: '2023-03-14 00:22:50',
        status: 'PENDING / INCOMPLETE CLAIMS PERSONAL',
        statusClass: 'success',
        totalAmount: 4200.00,
        payment: 4200.00,
        cashier: 'JESSYLE MAE, DLONSOD',
        products: [
            { sku: 'SGGUARD', price: 2100.00, pts: 5.00, quantity: 2, total: 4200.00 }
        ]
    }
    // Add more mock sales as needed
];

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

function openModal(type) {
    if (type === "newPO") {
        createNewPO();
    } else if (type === "summary") {
        loadPosModule('orders-summary')
    } else if (type == "pending") {
        loadPosModule('orders-pending')
    } else if (type == "personal-sales-summary") {
        loadPosModule('sales-summary')
    } else if (type == "new-personal-sales") {
        createNewPersonalSales();
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
                                        <button onclick="openModal('summary')" class="btn btn-sm btn-light border" title="Summary">
                                            <i class="fas fa-list"></i>
                                        </button>

                                        <button onclick="openModal('newPO')" class="btn btn-sm btn-success">
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
                                    <button onclick="openModal('pending')" class="btn btn-sm btn-light border" title="Pending list">
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
                                    <button onclick="loadPosModule('sales-summary')" class="btn btn-sm btn-success">
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
                                <button onClick="loadPosModule('sales-summary')" class="btn btn-light btn-sm border" title="Summary">
                                    <i class="fas fa-list"></i>
                                </button>
                                <button onclick="openModal('new-personal-sales')" class="btn btn-success btn-sm">
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
                                <button onClick="loadPosModule('sales-pending')" class="btn btn-light btn-sm border" title="Pending list">
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
// Function to get dynamic HTML
function getOrdersSummaryContent() {
    // Generate dynamic rows
    const rows = OrderSummmaryContextMockOrder.map((order, index) => `
        <tr>
            <td>${order.transNo}</td>
            <td>${order.refNo}</td>
            <td>${order.store}</td>
            <td>${order.cashier}</td>
            <td>${order.date}</td>
            <td><span class="badge bg-${order.statusClass}">${order.status}</span></td>
            <td>₱${order.amount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
            <td class="text-center">
                ${order.statusClass === "danger"
                    ? `<button onclick="confirmDeleteTransaction(${index})" class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>`
                    : `
                        <button class="btn btn-sm btn-outline-secondary me-1" onclick="openSearchOrderDetails(${OrderSummmaryContextMockOrder.indexOf(order)})">
                            <i class="fas fa-search"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-secondary" onclick="viewItemCheckList(OrderSummmaryContextMockOrder[${index}])">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                    `
                }
            </td>
        </tr>
    `).join("");

    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Summary Cards -->
            <div class="row g-3 mb-4">
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #28a745, #218838);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Completed Orders</h6>
                            <h4 class="fw-bold">₱${getTotalByStatus("success").toLocaleString("en-PH", { minimumFractionDigits: 2 })}</h4>
                            <small>${getCountByStatus("success")} orders</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #dc3545, #c82333);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Voided Orders</h6>
                            <h4 class="fw-bold">₱${getTotalByStatus("danger").toLocaleString("en-PH", { minimumFractionDigits: 2 })}</h4>
                            <small>${getCountByStatus("danger")} orders</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-dark" style="background: linear-gradient(135deg, #ffc107, #e0a800);">
                        <div class="card-body text-center">
                            <h6 class="text-dark-50">Pending Orders</h6>
                            <h4 class="fw-bold">₱${getTotalByStatus("warning").toLocaleString("en-PH", { minimumFractionDigits: 2 })}</h4>
                            <small>${getCountByStatus("warning")} orders</small>
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
                                ${rows}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Pagination Footer -->
                <div class="card-footer d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                    <small class="text-muted mb-2 mb-md-0">
                        Showing ${OrderSummmaryContextMockOrder.length > 0 ? `1 to ${OrderSummmaryContextMockOrder.length}` : 0} of ${OrderSummmaryContextMockOrder.length} entries
                    </small>
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

// Helper functions for totals & counts
function getTotalByStatus(statusClass) {
    return OrderSummmaryContextMockOrder
        .filter(order => order.statusClass === statusClass)
        .reduce((sum, order) => sum + order.amount, 0);
}

function getCountByStatus(statusClass) {
    return OrderSummmaryContextMockOrder.filter(order => order.statusClass === statusClass).length;
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
                        <button onclick="openModal('newPO')" class="btn btn-success btn-sm">
                            <i class="fas fa-plus me-1"></i> NEW PO
                        </button>
                        <button onclick="openModal('summary')" class="btn btn-outline-secondary btn-sm">
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
    // Calculate summary stats
    const totalSales = PersonalSalesMockData.reduce((sum, sale) => sum + sale.totalAmount, 0);
    const totalVoided = 2280.00; // Example static, replace with actual if needed
    const totalPending = PersonalSalesMockData.filter(sale => sale.statusClass === 'warning').reduce((sum, sale) => sum + sale.totalAmount, 0);

    const rows = PersonalSalesMockData.map(sale => `
        <tr>
            <td>${sale.transNo}</td>
            <td>${sale.customer}</td>
            <td>${sale.dateCreated}</td>
            <td><span class="badge bg-${sale.statusClass} text-dark">${sale.status}</span></td>
            <td>₱${sale.totalAmount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
            <td class="text-center">
                <button class="btn btn-sm btn-outline-primary me-1" onclick='viewPersonalSalesDetails(${JSON.stringify(sale)})'><i class="fas fa-eye"></i></button>
                <button class="btn btn-sm btn-outline-secondary"><i class="fas fa-print"></i></button>
            </td>
        </tr>
    `).join("");

    return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Summary Cards -->
            <div class="row g-3 mb-4">
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #198754, #157347);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Total Sales</h6>
                            <h4 class="fw-bold">₱${totalSales.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</h4>
                            <small>${PersonalSalesMockData.length} transactions</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-white" style="background: linear-gradient(135deg, #dc3545, #b02a37);">
                        <div class="card-body text-center">
                            <h6 class="text-white-50">Voided Sales</h6>
                            <h4 class="fw-bold">₱${totalVoided.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</h4>
                            <small>1 transaction</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <div class="card shadow-sm text-dark" style="background: linear-gradient(135deg, #ffc107, #e0a800);">
                        <div class="card-body text-center">
                            <h6 class="text-dark-50">Pending Sales</h6>
                            <h4 class="fw-bold">₱${totalPending.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</h4>
                            <small>${PersonalSalesMockData.filter(sale => sale.statusClass === 'warning').length} transactions</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Personal Sales Table -->
            <div class="card shadow-sm">
                <div class="card-header bg-success text-white">
                    <h5 class="mb-0"><i class="fas fa-hand-holding-usd me-2"></i> Personal Sales</h5>
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
                                ${rows}
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

function createNewPO() {
    if (document.getElementById("newPOModal")) {
        document.getElementById("newPOModal").style.display = "flex";
        setTimeout(() => {
            document.querySelector('.modal-content-right').classList.add('show');
        }, 10);
        return;
    }

    // Generate Product Table HTML Dynamically
    let productTableHTML = `
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE (₱)</th>
                    <th>QUANTITY</th>
                </tr>
            </thead>
            <tbody>
    `;

    productData.forEach(category => {
        productTableHTML += `
            <tr>
                <td colspan="4" class="category-header">${category.category}</td>
            </tr>
        `;

        if (category.products.length === 0) {
            productTableHTML += `
                <tr>
                    <td colspan="4" class="no-items">NO ITEMS FOR THIS CATEGORY</td>
                </tr>
            `;
        } else {
            category.products.forEach(product => {
                productTableHTML += `
                    <tr>
                        <td>${product.sku}</td>
                        <td>${product.description}</td>
                        <td class="price">${product.price.toFixed(2)}</td>
                        <td>
                            <input type="number" class="form-control qty" value="0" min="0" style="width: 80px;">
                        </td>
                    </tr>
                `;
            });
        }
    });

    productTableHTML += `</tbody></table>`;

    // Create the HTML Content for the Modal
    const htmlContent = `
        <div id="newPOModal" class="modal-overlay-right">
            <div class="modal-content-right">

                <!-- NEW TOP HEADER -->
                <div style="background-color: #28a745; color: white; padding: 12px; text-align: center; font-size: 1.3rem; font-weight: bold; border-radius: 6px 6px 0 0;">
                    My New Purchase Order
                </div>

                <div class="modal-header-right">
                    <span>My New Purchase Order</span>
                    <button type="button" class="btn-close btn-close-white" id="modalHeaderCloseBtn" aria-label="Close"></button>
                </div>

                <div class="modal-body-right">
                    <form id="newPOForm" onsubmit="return false;">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="poTo" class="form-label">PO TO:</label>
                                <select class="form-select" id="poTo" required>
                                    <option value="">Select Store...</option>
                                    <option value="davao_sur">MEGA CENTER - Depot - Davao del Sur</option>
                                    <option value="davao_branch">Branch - Davao Branch</option>
                                    <option value="davao_norte">MEGA CENTER - Depot - Davao del Norte</option>
                                    <option value="misamis_oriental">MEGA CENTER - Depot - Misamis Oriental</option>
                                    <option value="grinderph">Country Hub - GRINDERPH</option>
                                </select>
                            </div>
                            <div class="col-md-6">
                                <label for="totalAmount" class="form-label">Total Amount:</label>
                                <input type="text" class="form-control" id="totalAmount" value="0.00" readonly>
                            </div>
                        </div>
                        ${productTableHTML}
                        <div class="footer-buttons">
                            <button type="button" class="btn-save" id="saveOrder">Save Order</button>
                            <button type="button" class="btn-close-custom" id="modalFooterCloseBtn">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Append Modal HTML
    document.body.insertAdjacentHTML("beforeend", htmlContent);

    const modal = document.getElementById("newPOModal");
    const modalContent = document.querySelector(".modal-content-right");

    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("show");
        modalContent.classList.add("show");
    }, 10);

    // Close when clicking outside modal content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeNewPOModal();
        }
    });

    // Attach live calculation listener (limit to this modal)
    modal.querySelectorAll(".qty").forEach(input => {
        input.addEventListener("input", updateTotals);
    });

    // Attach close handlers
    document.getElementById("modalHeaderCloseBtn").addEventListener("click", closeNewPOModal);
    document.getElementById("modalFooterCloseBtn").addEventListener("click", closeNewPOModal);

    // Save order button
    document.getElementById("saveOrder").addEventListener("click", submitNewPO);
}


// Function to close/remove the modal
function closeNewPOModal() {
    const modal = document.getElementById("newPOModal");
    const modalContent = document.querySelector(".modal-content-right");
    if (modal && modalContent) {
        modal.classList.remove("show");
        modalContent.classList.remove("show");
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Update Total Amount Dynamically (scoped to modal)
function updateTotals() {
    let total = 0;
    const modal = document.getElementById("newPOModal");
    if (!modal) return;

    modal.querySelectorAll("tbody tr").forEach(row => {
        const priceElement = row.querySelector(".price");
        const qtyElement = row.querySelector(".qty");
        if (priceElement && qtyElement) {
            const price = parseFloat(priceElement.textContent) || 0;
            const qty = parseFloat(qtyElement.value) || 0;
            total += price * qty;
            // Update subtotal cell if you want to show a subtotal column later
            // const subtotalCell = row.querySelector('.subtotal');
            // if (subtotalCell) subtotalCell.textContent = (price*qty).toFixed(2);
        }
    });
    const totalAmountField = document.getElementById("totalAmount");
    if (totalAmountField) totalAmountField.value = total.toFixed(2);
}

// Handle Save Order
function submitNewPO() {
    const storeSelect = document.getElementById("poTo");
    const store = storeSelect ? storeSelect.value : "";
    const totalField = document.getElementById("totalAmount");
    const total = totalField ? parseFloat(totalField.value) : 0;

    if (!store || total <= 0) {
        alert("Please select a store and add at least one product.");
        return;
    }

    // Build order items from modal
    const modal = document.getElementById("newPOModal");
    const items = [];
    if (modal) {
        modal.querySelectorAll("tbody tr").forEach(row => {
            const sku = row.querySelector("td:nth-child(1)")?.textContent?.trim();
            const desc = row.querySelector("td:nth-child(2)")?.textContent?.trim();
            const priceText = row.querySelector(".price")?.textContent?.trim();
            const qtyInput = row.querySelector(".qty");
            if (sku && priceText && qtyInput) {
                const price = parseFloat(priceText) || 0;
                const qty = parseInt(qtyInput.value) || 0;
                if (qty > 0) {
                    items.push({ sku, description: desc, price, quantity: qty, subtotal: price * qty });
                }
            }
        });
    }

    if (items.length === 0) {
        alert("Please select at least one product!");
        return;
    }

    // For now we just log — replace with your AJAX call as needed
    console.log("Purchase Order saved:", {
        store,
        total,
        items
    });

    alert(`Purchase Order saved!\nStore: ${storeSelect.selectedOptions[0].text}\nTotal: ₱${total.toLocaleString()}`);
    closeNewPOModal();
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('newPOModal')) {
        closeNewPOModal();
    }
});

function createNewPersonalSales() {
    // If modal already exists, open it
    if (document.getElementById("newPersonalSalesModal")) {
        document.getElementById("newPersonalSalesModal").style.display = "flex";
        setTimeout(() => {
            document.querySelector('.modal-content-right').classList.add('show');
        }, 10);
        return;
    }

    // Generate Product Table HTML Dynamically
    let productTableHTML = `
        <table class="table table-bordered table-striped">
            <thead style="background-color: #6c757d; color: white;">
                <tr>
                    <th>SKU</th>
                    <th>STOCK</th>
                    <th>PRICE</th>
                    <th>QUANTITY</th>
                </tr>
            </thead>
            <tbody>
    `;

    productData.forEach(category => {
        productTableHTML += `
            <tr>
                <td colspan="4" class="category-header" style="background-color: #6c757d; color: white; font-weight: bold; padding: 6px;">
                    ${category.category}
                </td>
            </tr>
        `;

        if (category.products.length === 0) {
            productTableHTML += `
                <tr>
                    <td colspan="4" style="text-align: center; font-style: italic; padding: 10px;">NO ITEMS FOR THIS CATEGORY</td>
                </tr>
            `;
        } else {
            category.products.forEach(product => {
                productTableHTML += `
                    <tr>
                        <td>${product.sku}</td>
                        <td>${product.stock}</td>
                        <td class="price">${product.price.toFixed(2)}</td>
                        <td>
                            <input type="number" class="form-control qty" value="0" min="0" style="width: 80px;">
                        </td>
                    </tr>
                `;
            });
        }
    });

    productTableHTML += `</tbody></table>`;

    // Create Modal HTML Content
    const htmlContent = `
        <div id="newPersonalSalesModal" class="modal-overlay-right">
            <div class="modal-content-right">

                <!-- HEADER -->
                <div style="background-color: #28a745; color: white; padding: 12px; text-align: center; font-size: 1.3rem; font-weight: bold; border-radius: 6px 6px 0 0;">
                    New Personal Sales
                </div>

                <div class="modal-body-right">
                    <form id="newPersonalSalesForm" onsubmit="return false;">
                        <!-- Top Section -->
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <label for="username" class="form-label">USERNAME:</label>
                                <input type="text" class="form-control" id="username" placeholder="Type username here" required>
                            </div>
                            <div class="col-md-4">
                                <label for="accountName" class="form-label">Account name</label>
                                <input type="text" class="form-control" id="accountName" placeholder="Account name" readonly>
                            </div>
                            <div class="col-md-4">
                                <label for="totalAmount" class="form-label">Total Amount:</label>
                                <input type="text" class="form-control" id="totalAmount" value="0.00" readonly style="font-weight: bold; text-align: right;">
                            </div>
                        </div>

                        <!-- Product Table -->
                        ${productTableHTML}

                        <!-- Footer Buttons -->
                        <div class="footer-buttons" style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px;">
                            <button type="button" class="btn btn-success" id="placeOrderBtn">Place Order</button>
                            <button type="button" class="btn btn-warning" id="modalFooterCloseBtn">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Append Modal HTML to Body
    document.body.insertAdjacentHTML("beforeend", htmlContent);

    const modal = document.getElementById("newPersonalSalesModal");
    const modalContent = document.querySelector(".modal-content-right");

    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("show");
        modalContent.classList.add("show");
    }, 10);

    // Close when clicking outside modal
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeNewPersonalSalesModal();
        }
    });

    // Attach live calculation listener
    modal.querySelectorAll(".qty").forEach(input => {
        input.addEventListener("input", updatePersonalSalesTotal);
    });

    // Attach close handlers
    document.getElementById("modalFooterCloseBtn").addEventListener("click", closeNewPersonalSalesModal);

    // Place Order Button
    document.getElementById("placeOrderBtn").addEventListener("click", submitNewPersonalSales);
}

// Function to close modal
function closeNewPersonalSalesModal() {
    const modal = document.getElementById("newPersonalSalesModal");
    const modalContent = document.querySelector(".modal-content-right");
    if (modal && modalContent) {
        modal.classList.remove("show");
        modalContent.classList.remove("show");
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Update Total Amount Dynamically
function updatePersonalSalesTotal() {
    let total = 0;
    const modal = document.getElementById("newPersonalSalesModal");
    if (!modal) return;

    modal.querySelectorAll("tbody tr").forEach(row => {
        const priceElement = row.querySelector(".price");
        const qtyElement = row.querySelector(".qty");
        if (priceElement && qtyElement) {
            const price = parseFloat(priceElement.textContent) || 0;
            const qty = parseFloat(qtyElement.value) || 0;
            total += price * qty;
        }
    });
    const totalAmountField = document.getElementById("totalAmount");
    if (totalAmountField) totalAmountField.value = total.toFixed(2);
}

// Handle Submit Order
function submitNewPersonalSales() {
    const username = document.getElementById("username").value.trim();
    const accountName = document.getElementById("accountName").value.trim();
    const totalField = document.getElementById("totalAmount");
    const total = totalField ? parseFloat(totalField.value) : 0;

    if (!username || total <= 0) {
        alert("Please enter a username and add at least one product.");
        return;
    }

    // Collect products
    const modal = document.getElementById("newPersonalSalesModal");
    const items = [];
    if (modal) {
        modal.querySelectorAll("tbody tr").forEach(row => {
            const sku = row.querySelector("td:nth-child(1)")?.textContent?.trim();
            const priceText = row.querySelector(".price")?.textContent?.trim();
            const qtyInput = row.querySelector(".qty");
            if (sku && priceText && qtyInput) {
                const price = parseFloat(priceText) || 0;
                const qty = parseInt(qtyInput.value) || 0;
                if (qty > 0) {
                    items.push({ sku, price, quantity: qty, subtotal: price * qty });
                }
            }
        });
    }

    if (items.length === 0) {
        alert("Please select at least one product!");
        return;
    }

    // Log for testing, replace with AJAX later
    console.log("Personal Sales saved:", {
        username,
        accountName,
        total,
        items
    });

    alert(`Personal Sales saved!\nUsername: ${username}\nTotal: ₱${total.toLocaleString()}`);
    closeNewPersonalSalesModal();
}

// View Item Check List Modal
function viewItemCheckList(orderData) {
    if (document.getElementById("orderDetailsModal")) {
        document.getElementById("orderDetailsModal").style.display = "flex";
        setTimeout(() => {
            document.querySelector('.modal-content-right').classList.add('show');
        }, 10);
        return;
    }

    // Generate Product Table HTML Dynamically
    let productTableHTML = `
        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>DESCRIPTION</th>
                    <th>PRICE (₱)</th>
                    <th>QUANTITY</th>
                </tr>
            </thead>
            <tbody>
    `;

    orderData.products.forEach(product => {
        productTableHTML += `
            <tr>
                <td>${product.sku}</td>
                <td>${product.description}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
            </tr>
        `;
    });

    productTableHTML += `</tbody></table>`;

    // Create the HTML Content for the Modal
    const htmlContent = `
        <div id="orderDetailsModal" class="modal-overlay-right">
            <div class="modal-content-right">

                <!-- HEADER -->
                <div style="background-color: #007bff; color: white; padding: 12px; text-align: center; font-size: 1.3rem; font-weight: bold; border-radius: 6px 6px 0 0;">
                    Item Check List
                </div>

                <div class="modal-header-right">
                    <span>Item Check List</span>
                    <button type="button" class="btn-close btn-close-white" id="orderDetailsHeaderCloseBtn" aria-label="Close"></button>
                </div>

                <div class="modal-body-right">
                    <form id="orderDetailsForm" onsubmit="return false;">
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label"><strong>TRANS#:</strong></label>
                                <input type="text" class="form-control" value="${orderData.transNo}" readonly>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><strong>Date Created:</strong></label>
                                <input type="text" class="form-control" value="${orderData.dateCreated}" readonly>
                            </div>
                        </div>

                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label class="form-label"><strong>PO TO:</strong></label>
                                <input type="text" class="form-control" value="${orderData.poTo}" readonly>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label"><strong>Total Amount:</strong></label>
                                <input type="text" class="form-control" value="₱${orderData.totalAmount.toFixed(2)}" readonly>
                            </div>
                        </div>

                        ${productTableHTML}

                        <div class="footer-buttons">
                            <button type="button" class="btn-close-custom" id="orderDetailsFooterCloseBtn">Close</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // Append Modal HTML
    document.body.insertAdjacentHTML("beforeend", htmlContent);

    const modal = document.getElementById("orderDetailsModal");
    const modalContent = document.querySelector(".modal-content-right");

    modal.style.display = "flex";
    setTimeout(() => {
        modal.classList.add("show");
        modalContent.classList.add("show");
    }, 10);

    // Close when clicking outside modal content
    modal.addEventListener("click", function (e) {
        if (e.target === modal) {
            closeOrderDetails();
        }
    });

    // Attach close handlers
    document.getElementById("orderDetailsHeaderCloseBtn").addEventListener("click", closeOrderDetails);
    document.getElementById("orderDetailsFooterCloseBtn").addEventListener("click", closeOrderDetails);
}

function closeOrderDetails() {
    const modal = document.getElementById("orderDetailsModal");
    const modalContent = modal?.querySelector(".modal-content-right");
    if (modal && modalContent) {
        modal.classList.remove("show");
        modalContent.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
    }
}

function openSearchOrderDetails(index) {
    console.log("Open Search Order Details for index:", index);
    const order = OrderSummmaryContextMockOrder[index];
    if (!order) {
        alert("Order not found!");
        return;
    }

    // Build Product Rows
    let productRows = "";
    if (order.products && order.products.length > 0) {
        productRows = order.products.map(p => `
            <tr>
                <td>${p.sku}</td>
                <td>${p.description}</td>
                <td>₱${p.price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</td>
                <td>${p.quantity}</td>
            </tr>
        `).join("");
    } else {
        productRows = `<tr><td colspan="4" class="text-center text-muted">No products found</td></tr>`;
    }

    // Build Modal HTML
    const modalHTML = `
        <div id="searchOrderModal" class="modal-overlay-right">
            <div class="modal-content-right">

                <!-- HEADER -->
                <div style="background-color: #007bff; color: white; padding: 12px; text-align: center; font-size: 1.3rem; font-weight: bold; border-radius: 6px 6px 0 0;">
                    My Order Details
                </div>

                <div class="modal-header-right">
                    <span>My Order Details</span>
                    <button type="button" class="btn-close btn-close-white" onclick="closeSearchOrderDetails()" aria-label="Close"></button>
                </div>

                <!-- BODY -->
                <div class="modal-body-right">
                    <div class="mb-2"><strong>TRANS#:</strong> ${order.transNo}</div>
                    <div class="mb-2"><strong>Date Created:</strong> ${order.dateCreated}</div>
                    <div class="mb-2"><strong>PO TO:</strong> ${order.poTo}</div>
                    <div class="mb-3"><strong>Total Amount:</strong> ₱${order.totalAmount.toLocaleString("en-PH", { minimumFractionDigits: 2 })}</div>
                    
                    <!-- PRODUCT TABLE -->
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>SKU</th>
                                <th>Description</th>
                                <th>PRICE</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${productRows}
                        </tbody>
                    </table>
                </div>

                <!-- FOOTER -->
                <div class="footer-buttons">
                    <button class="btn-close-custom" onclick="closeSearchOrderDetails()">Close</button>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal before appending
    const existingModal = document.getElementById("searchOrderModal");
    if (existingModal) existingModal.remove();

    // Append new modal
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Animate modal open
    const modal = document.getElementById("searchOrderModal");
    const modalContent = modal.querySelector(".modal-content-right");
    setTimeout(() => {
        modal.classList.add("show");
        modalContent.classList.add("show");
    }, 10);
}

function closeSearchOrderDetails() {
    const modal = document.getElementById("searchOrderModal");
    const modalContent = modal?.querySelector(".modal-content-right");
    if (modal && modalContent) {
        modal.classList.remove("show");
        modalContent.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
    }
}

// Function to open delete confirmation modal
function confirmDeleteTransaction(transactionId) {
    Swal.fire({
        title: '<span style="font-size:22px; font-weight:bold;">Delete Transaction</span>',
        html: `
            <p style="font-size:16px; margin:10px 0;">
                Are you sure you want to <b style="color:#e74c3c;">DELETE</b> this transaction?<br>
                <span style="color:#555;">You have to be an <b>ADMIN</b> to continue this transaction.</span>
            </p>
        `,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Continue!',
        cancelButtonText: 'Cancel',
        focusConfirm: false,
        reverseButtons: true,
        customClass: {
            popup: 'delete-transaction-popup',
            confirmButton: 'btn-continue',
            cancelButton: 'btn-cancel'
        },
        buttonsStyling: false
    }).then((result) => {
        if (result.isConfirmed) {
            // ✅ MOCK DELETE FOR NOW (Replace this with API call later)
            deleteTransaction(transactionId);
        }
    });
}

// Function to actually delete the transaction
function deleteTransaction(transactionId) {
    // Find index based on the ID
    const index = OrderSummmaryContextMockOrder.findIndex(order => order.transNo === transactionId);

    if (index !== -1) {
        // Remove it from mock data
        OrderSummmaryContextMockOrder.splice(index, 1);

        // Remove the corresponding table row from the DOM
        const row = document.querySelector(`[data-trans-id="${transactionId}"]`);
        if (row) row.remove();

        // Success alert
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: `Transaction ${transactionId} has been successfully deleted.`,
            timer: 2000,
            showConfirmButton: false
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Not Found!',
            text: 'The transaction could not be found.',
            confirmButtonText: 'OK'
        });
    }
}
// Confirm Delete Transaction Modal
function confirmDeleteTransaction(index) {
    const order = OrderSummmaryContextMockOrder[index];
    if (!order) {
        alert("Order not found!");
        return;
    }

    // Modal HTML
    const modalHTML = `
        <div id="deleteTransactionModal" class="modal-overlay">
            <div class="modal-box">
                <!-- ICON -->
                <div class="icon-container">
                    <i class="fas fa-info-circle"></i>
                </div>

                <!-- TITLE -->
                <h4 class="modal-title">Delete Transaction</h4>

                <!-- MESSAGE -->
                <p class="modal-message">
                    Are you sure you want to <b>DELETE</b> this transaction (<b>${order.transNo}</b>)? <br>
                    You have to be an <b>ADMIN</b> to continue this transaction.
                </p>

                <!-- BUTTONS -->
                <div class="button-group">
                    <button class="btn-continue" onclick="deleteTransaction('${order.transNo}')">Continue!</button>
                    <button class="btn-cancel" onclick="closeDeleteTransactionModal()">Cancel</button>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if already open
    const existingModal = document.getElementById("deleteTransactionModal");
    if (existingModal) existingModal.remove();

    // Append modal to body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Animate open
    setTimeout(() => {
        document.querySelector(".modal-box").classList.add("show");
    }, 10);
}

// Close Delete Modal
function closeDeleteTransactionModal() {
    const modal = document.getElementById("deleteTransactionModal");
    const modalBox = modal?.querySelector(".modal-box");
    if (modal && modalBox) {
        modalBox.classList.remove("show");
        setTimeout(() => modal.remove(), 300);
    }
}

// Handle Delete Action (Mock)
function deleteTransaction(transNo) {
    const index = OrderSummmaryContextMockOrder.findIndex(o => o.transNo === transNo);
    if (index !== -1) {
        OrderSummmaryContextMockOrder.splice(index, 1);
        closeDeleteTransactionModal();
        alert(`Transaction ${transNo} deleted successfully!`);
        refreshOrdersTable();
    }
}
