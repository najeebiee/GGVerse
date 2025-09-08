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

