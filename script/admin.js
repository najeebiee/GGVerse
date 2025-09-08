
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




