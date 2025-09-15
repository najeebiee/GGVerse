
/* ----------------- ADMIN PAGE CONTENT FUNCTIONS ----------------- */


/*

  Dashboard Content

*/ 
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
                                <th>STATUS</th>
                                <th>TOOLS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${[
                              {id:1, name:'OROMOOS GLOBAL', user:'OLAD OROMOOS', reg:'2023-07-04', type:'Country Hub', status:'Active'},
                              {id:2, name:'GROCERYN', user:'OLAD OROMOOS', reg:'2023-07-04', type:'Country Hub', status:'Active'},
                              {id:3, name:'Mega Mega Grocery Store - Jemima Enyass', user:'jemima enyass', reg:'2023-07-04', type:'Store', status:'Active'},
                              {id:4, name:'Mega Mega Religious Outreach Center - Jemima Enyass', user:'jemima enyass', reg:'2023-07-04', type:'Store', status:'Active'},
                              {id:5, name:'Mega Mega Grocery Store - Olad Oromoos', user:'OLAD OROMOOS', reg:'2023-07-04', type:'Store', status:'Active'},
                              {id:6, name:'Mega Mega Grocery (CCO) Inc. - Jenny Simico', user:'JENNY SIMICO', reg:'2023-07-04', type:'Store', status:'Active'},
                              {id:7, name:'Mega Mega Grocery Company - Jenny Simico', user:'JENNY SIMICO', reg:'2023-07-04', type:'Store', status:'Active'},
                              {id:8, name:'Mega Mega Grocery Company - Jewelyn Cuamenco', user:'Jewelyn Cuamenco', reg:'2023-07-04', type:'Store', status:'Active'},
                              {id:9, name:'Mega Mega Grocery Company - Virgilio Bandalan', user:'Virgilio Bandalan', reg:'2023-07-04', type:'Store', status:'Active'}
                            ].map(row => `
                            <tr>
                                <td>${row.id}</td>
                                <td style="white-space:normal; word-break:break-word;">${row.name}</td>
                                <td>${row.user}</td>
                                <td>${row.reg}</td>
                                <td>${row.type}</td>

                                <!-- STATUS: actionable toggle button -->
                                <td>
                                    <button
                                        class="btn btn-sm ${row.status === 'Active' ? 'btn-success' : 'btn-danger'} status-toggle"
                                        data-id="${row.id}"
                                        data-state="${row.status === 'Active' ? 'active' : 'inactive'}"
                                        aria-pressed="${row.status === 'Active'}"
                                    >
                                        ${row.status === 'Active' ? 'Active' : 'Deactivate'}
                                    </button>
                                </td>

                                <!-- TOOLS: search / users / key -->
                                <td>
                                    <div class="btn-group" role="group" aria-label="row-tools">
                                        <button class="btn btn-info btn-sm btn-view-stock" data-id="${row.id}" title="View Stocklist Details">
                                            <i class="fa fa-search"></i>
                                        </button>
                                        <button class="btn btn-info btn-sm btn-view-users" data-id="${row.id}" title="View Users">
                                            <i class="fa fa-users"></i>
                                        </button>
                                        <button class="btn btn-info btn-sm btn-change-pass" data-id="${row.id}" title="Change Password">
                                            <i class="fa fa-key"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            `).join('')}
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

        <!-- Inline behavior for status toggle and tools (keeps logic local to this module) -->
        <script>
        (function () {
            // avoid stacking multiple identical listeners: attach once using a symbol on window
            if (!window.__adminDashboardHandlersAttached) {
                window.__adminDashboardHandlersAttached = true;

                document.addEventListener('click', function (ev) {
                    // STATUS toggle
                    const statusBtn = ev.target.closest('.status-toggle');
                    if (statusBtn) {
                        ev.preventDefault();
                        const id = statusBtn.dataset.id;
                        const current = statusBtn.dataset.state === 'active' ? 'active' : 'inactive';

                        if (current === 'active') {
                            const ok = confirm('Are you sure you want to deactivate this store?');
                            if (!ok) return;
                            statusBtn.dataset.state = 'inactive';
                            statusBtn.classList.remove('btn-success');
                            statusBtn.classList.add('btn-danger');
                            statusBtn.textContent = 'Deactivate';
                            statusBtn.setAttribute('aria-pressed', 'false');
                            // TODO: send server update here (fetch/axios)
                            console.log('Store', id, 'deactivated');
                            return;
                        }

                        // currently inactive -> activate
                        const ok2 = confirm('Activate this store?');
                        if (!ok2) return;
                        statusBtn.dataset.state = 'active';
                        statusBtn.classList.remove('btn-danger');
                        statusBtn.classList.add('btn-success');
                        statusBtn.textContent = 'Active';
                        statusBtn.setAttribute('aria-pressed', 'true');
                        // TODO: send server update here
                        console.log('Store', id, 'activated');
                        return;
                    }

                    // TOOL buttons
                    const viewStock = ev.target.closest('.btn-view-stock');
                    if (viewStock) {
                        ev.preventDefault();
                        const id = viewStock.dataset.id;
                        // wire up modal or navigation here
                        alert('View Stocklist Details for ID: ' + id);
                        return;
                    }

                    const viewUsers = ev.target.closest('.btn-view-users');
                    if (viewUsers) {
                        ev.preventDefault();
                        const id = viewUsers.dataset.id;
                        alert('View Users for ID: ' + id);
                        return;
                    }

                    const changePass = ev.target.closest('.btn-change-pass');
                    if (changePass) {
                        ev.preventDefault();
                        const id = changePass.dataset.id;
                        alert('Change password for ID: ' + id);
                        return;
                    }
                }, false);
            }
        })();
        </script>
    `;
}

(function patchStatusToggleConfirmHandler() {
    if (window.__ggv_status_toggle_confirm_patched) return;
    window.__ggv_status_toggle_confirm_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.status-toggle, .user-status-toggle');
        if (!btn) return;
        ev.preventDefault();
        ev.stopImmediatePropagation();

        const isUserToggle = btn.classList.contains('user-status-toggle');
        const idAttr = isUserToggle ? (btn.dataset.userId || btn.getAttribute('data-user-id')) : (btn.dataset.id || btn.getAttribute('data-id'));
        const currentState = (btn.dataset.state || btn.getAttribute('data-state') || '').toLowerCase();
        const isActive = currentState === 'active';

        const modalId = isUserToggle ? 'confirmUserStatusModal' : 'confirmStoreStatusModal';
        const confirmBtnId = modalId + 'Btn';

        const title = isActive ? 'Deactivate Account?' : 'Activate Account?';
        const message = isActive
            ? 'Are you sure you want to deactivate this account?'
            : 'Are you sure you want to activate this account?';
        const confirmText = isActive ? (isUserToggle ? 'Deactivate User' : 'Deactivate') : (isUserToggle ? 'Activate User' : 'Activate');

        // ensure container present
        let container = document.getElementById('ggvStoreModalContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'ggvStoreModalContainer';
            document.body.appendChild(container);
        }

        // remove existing same modal and insert new
        container.querySelector('#' + modalId)?.remove();
        container.insertAdjacentHTML('beforeend', buildConfirmModalHtml(modalId, title, message, confirmText, confirmBtnId));

        const modalEl = container.querySelector('#' + modalId);
        let bsModal;
        function cleanup() {
            try { if (bsModal) bsModal.dispose(); } catch (e) {}
            container.querySelector('#' + modalId)?.remove();
            document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
            document.body.classList.remove('modal-open');
        }

        if (typeof bootstrap !== 'undefined' && modalEl) {
            bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
            modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
            bsModal.show();
        } else if (modalEl) {
            modalEl.classList.add('show');
            modalEl.style.display = 'block';
            if (!document.querySelector('.modal-backdrop')) {
                const bd = document.createElement('div');
                bd.className = 'modal-backdrop fade show';
                document.body.appendChild(bd);
                document.body.classList.add('modal-open');
            }
            modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(b => b.addEventListener('click', cleanup, { once: true }));
        }

        const confirmBtn = container.querySelector('#' + confirmBtnId);
        if (!confirmBtn) return;
        confirmBtn.addEventListener('click', function handler() {
            try {
                // Toggle button appearance/state
                if (isActive) {
                    btn.dataset.state = 'inactive';
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-danger');
                    btn.setAttribute('aria-pressed', 'false');
                    btn.textContent = isUserToggle ? 'Deactivate' : 'Deactivate';
                } else {
                    btn.dataset.state = 'active';
                    btn.classList.remove('btn-danger');
                    btn.classList.add('btn-success');
                    btn.setAttribute('aria-pressed', 'true');
                    btn.textContent = isUserToggle ? 'Active' : 'Active';
                }

                // try to persist to mock data if present
                if (isUserToggle) {
                    const uid = Number(idAttr);
                    for (const sid in __ggv_store_users_mock) {
                        const arr = __ggv_store_users_mock[sid] || [];
                        const found = arr.find(u => Number(u.id) === uid);
                        if (found) {
                            found.status = (isActive ? 'Inactive' : 'Active');
                            break;
                        }
                    }
                } else {
                    const sid = Number(idAttr);
                    // update __ggv_store_mock if exists
                    if (typeof __ggv_store_mock !== 'undefined') {
                        const found = (__ggv_store_mock || []).find(s => Number(s.id) === sid);
                        if (found) {
                            found.status = (isActive ? 'Inactive' : 'Active');
                        }
                    }
                }

                // optional small console and user feedback
                console.log(`${isUserToggle ? 'User' : 'Store'} ${idAttr} ${isActive ? 'deactivated' : 'activated'} (mock)`);
            } catch (e) {
                console.error(e);
            }

            // close modal
            if (bsModal) bsModal.hide(); else cleanup();

            alert(`${isActive ? 'Deactivated' : 'Activated'} (mock).`);
        }, { once: true });

    }, true); // capture to preempt existing handlers
})();

/* View Store Details */
if (!window.__adminDashboardGlobalHandlers) {
    window.__adminDashboardGlobalHandlers = true;

    document.addEventListener('click', function (ev) {
        // STATUS toggle
        const statusBtn = ev.target.closest('.status-toggle');
        if (statusBtn) {
            ev.preventDefault();
            const id = statusBtn.dataset.id;
            const current = statusBtn.dataset.state === 'active' ? 'active' : 'inactive';

            if (current === 'active') {
                const ok = confirm('Are you sure you want to deactivate this store?');
                if (!ok) return;
                statusBtn.dataset.state = 'inactive';
                statusBtn.classList.remove('btn-success');
                statusBtn.classList.add('btn-danger');
                statusBtn.textContent = 'Deactivate';
                statusBtn.setAttribute('aria-pressed', 'false');
                // TODO: send server update here (fetch/axios)
                console.log('Store', id, 'deactivated');
                return;
            }

            // currently inactive -> activate
            const ok2 = confirm('Activate this store?');
            if (!ok2) return;
            statusBtn.dataset.state = 'active';
            statusBtn.classList.remove('btn-danger');
            statusBtn.classList.add('btn-success');
            statusBtn.textContent = 'Active';
            statusBtn.setAttribute('aria-pressed', 'true');
            // TODO: send server update here
            console.log('Store', id, 'activated');
            return;
        }

        // TOOL buttons
        const viewStock = ev.target.closest('.btn-view-stock');
        if (viewStock) {
            ev.preventDefault();
            const id = viewStock.dataset.id;
            alert('View Stocklist Details for ID: ' + id);
            return;
        }

        const viewUsers = ev.target.closest('.btn-view-users');
        if (viewUsers) {
            ev.preventDefault();
            const id = viewUsers.dataset.id;
            alert('View Users for ID: ' + id);
            return;
        }

        const changePass = ev.target.closest('.btn-change-pass');
        if (changePass) {
            ev.preventDefault();
            const id = changePass.dataset.id;
            alert('Change password for ID: ' + id);
            return;
        }
    }, false);
}

const __ggv_store_mock = [
    { id: 1, personalAccount: "GGUILD01", accountName: "GUILD GRINDERS", storeName: "GRINDERSGUILDGLOBAL", companyName: "GRINDERS GLOBAL", stockistType: "admin", contactNo: "63917111111", username: "GGGLOBAL", password: "321@ss@P", country: "Philippines", region: "REGION XI (DAVAO REGION)", province: "DAVAO DEL SUR", city: "CITY OF DIGOS (Capital)", barangay: "Aplaya" },
    { id: 2, personalAccount: "GGUILD02", accountName: "GROCERYN CO", storeName: "GROCERYN", companyName: "GROCERYN INC", stockistType: "Country Hub", contactNo: "63917112222", username: "GROCERYN", password: "pass123", country: "Philippines", region: "", province: "", city: "", barangay: "" },
    // ... add more mocks as needed ...
];

function getStoreMockById(id) {
    return __ggv_store_mock.find(s => Number(s.id) === Number(id)) || {
        id, personalAccount: "", accountName: "", storeName: "", companyName: "", stockistType: "", contactNo: "", username: "", password: "", country: "", region: "", province: "", city: "", barangay: ""
    };
}

function buildStoreModalHtml(store) {
    return `
    <div class="modal fade" id="storeDetailsModal" tabindex="-1" aria-labelledby="storeDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="storeDetailsModalLabel">View Store Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="storeDetailsForm" class="row g-3">
              <div class="col-12 col-md-6">
                <label class="form-label small">Personal Account</label>
                <input type="text" class="form-control form-control-sm" name="personalAccount" value="${store.personalAccount || ""}">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label small">Account Name</label>
                <input type="text" class="form-control form-control-sm" name="accountName" value="${store.accountName || ""}">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label small">Store Name</label>
                <input type="text" class="form-control form-control-sm" name="storeName" value="${store.storeName || ""}">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label small">Company Name</label>
                <input type="text" class="form-control form-control-sm" name="companyName" value="${store.companyName || ""}">
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label small">Stockist Type</label>
                <select class="form-select form-select-sm" name="stockistType">
                  <option ${store.stocklistType === "admin" ? "selected" : ""}>admin</option>
                  <option ${store.stocklistType === "Country Hub" ? "selected" : ""}>Country Hub</option>
                  <option ${store.stocklistType === "Store" ? "selected" : ""}>Store</option>
                </select>
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label small">Contact No</label>
                <input type="text" class="form-control form-control-sm" name="contactNo" value="${store.contactNo || ""}">
              </div>

              <div class="col-12 col-md-4">
                <label class="form-label small">Username</label>
                <input type="text" class="form-control form-control-sm" name="username" value="${store.username || ""}">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label small">Password</label>
                <input type="text" class="form-control form-control-sm" name="password" value="${store.password || ""}">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label small">Country</label>
                <input type="text" class="form-control form-control-sm" name="country" value="${store.country || ""}">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label small">Region</label>
                <input type="text" class="form-control form-control-sm" name="region" value="${store.region || ""}">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label small">Province</label>
                <input type="text" class="form-control form-control-sm" name="province" value="${store.province || ""}">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label small">City</label>
                <input type="text" class="form-control form-control-sm" name="city" value="${store.city || ""}">
              </div>

              <div class="col-12 col-md-6">
                <label class="form-label small">Barangay</label>
                <input type="text" class="form-control form-control-sm" name="barangay" value="${store.barangay || ""}">
              </div>

            </form>
          </div>

          <div class="modal-footer d-flex gap-2">
            <!-- Send Credentials button added -->
            <button type="button"
                    class="btn btn-info btn-sm btn-account-send-sms"
                    data-sms-type="credentials"
                    data-contact="${store.contactNo || ''}"
                    data-complete-name="${(store.storeName || store.accountName || '').replace(/"/g,'&quot;')}"
                    data-user="${store.username || ''}">
              <i class="fa fa-mobile me-1"></i> Send Credentials
            </button>

            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary btn-sm" id="storeDetailsSaveBtn">Update</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function showStoreDetailsModal(id) {
    // ensure single modal container
    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    const store = getStoreMockById(id);
    container.innerHTML = buildStoreModalHtml(store);

    const modalEl = container.querySelector('#storeDetailsModal');
    let bsModal;

    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        if (modalEl) {
            modalEl.removeEventListener('hidden.bs.modal', cleanup);
        }
        // remove DOM modal and any backdrops
        if (container) container.innerHTML = '';
        document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
        document.body.classList.remove('modal-open');
    }

    // show modal via bootstrap API if available
    if (typeof bootstrap !== "undefined" && modalEl) {
        bsModal = bootstrap.Modal.getOrCreateInstance(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup);
        bsModal.show();
    } else if (modalEl) {
        // fallback: make visible and create backdrop
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        // create backdrop if not present
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        // wire close buttons to cleanup
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', function () {
                cleanup();
            }, { once: true });
        });
    }

    // wire save button
    const saveBtn = container.querySelector('#storeDetailsSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const form = container.querySelector('#storeDetailsForm');
            const formData = {};
            if (form) {
                new FormData(form).forEach((v, k) => formData[k] = v);
            }
            // TODO: send formData to server (fetch/axios)
            console.log('Store update', id, formData);
            // close modal
            if (bsModal) bsModal.hide();
            else cleanup();
            // optional: show a confirmation toast/alert
            alert('Store updated (mock): ' + id);
        }, { once: true });
    }
}

/* View Users */
// --- Mock user data per store (minimal) ---
const __ggv_store_users_mock = {
    1: [
        { id: 8, branch: "GRINDERSGUILDGLOBAL", name: "System, Administrator Main", contact: "639999999999", created: "2024-07-06 20:59:20", hired: "2024-07-06 20:59:20", user: "superadmin_main", pass: "Abc@@@1", lastVisit: "2025-02-04 04:15:52", status: "Active" },
        { id: 999, branch: "GRINDERSGUILDGLOBAL", name: "Torres, Kenneth G", contact: "639171231231", created: "2024-10-26 11:37:15", hired: "2024-10-26 11:37:15", user: "globaladmin", pass: "Abc@321", lastVisit: "2025-02-11 12:41:17", status: "Active" },
        { id: 111, branch: "GRINDERSGUILDGLOBAL", name: "Finance, Finance X", contact: "", created: "2024-11-20 22:51:51", hired: "2024-11-20 22:51:51", user: "ggglobalfinance", pass: "123456", lastVisit: "2024-11-20 22:53:58", status: "Active" }
    ],
    2: [
        { id: 222, branch: "GROCERYN", name: "Logistics, Logistics X", contact: "639171231231", created: "2025-01-09 16:31:19", hired: "2025-01-09 16:31:19", user: "gggloballogistics", pass: "Abc@123", lastVisit: "2025-01-09 16:31:19", status: "Active" }
    ]
};

function getStoreUsersMockById(storeId) {
    return __ggv_store_users_mock[Number(storeId)] || [];
}

function buildStoreUsersModalHtml(storeId, users) {
    const rows = users.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${u.branch}</td>
            <td style="width:40%; white-space:normal; word-break:break-word;">${u.name}</td>
            <td>${u.contact || ""}</td>
            <td>${u.created || ""}</td>
            <td>${u.hired || ""}</td>
            <td>${u.user || ""}</td>
            <td>${u.pass || ""}</td>
            <td>${u.lastVisit || ""}</td>
            <td>
                <button
                    class="btn btn-sm ${u.status === 'Active' ? 'btn-success' : 'btn-danger'} user-status-toggle rounded-pill px-3 py-1"
                    data-user-id="${u.id}"
                    data-state="${u.status === 'Active' ? 'active' : 'inactive'}"
                    aria-pressed="${u.status === 'Active'}"
                    title="Toggle user status"
                >
                    ${u.status}
                </button>
            </td>
            <td>
                <div class="d-flex gap-1">
                    <!-- view (opens user detail) -->
                    <button class="btn btn-info btn-sm btn-view-stock py-1" style="height:30px; padding:4px 8px; font-size:0.78rem;" data-user-id="${u.id}" data-store-id="${storeId}" title="View">
                        <i class="fa fa-search"></i>
                    </button>
                    <button class="btn btn-info btn-sm btn-set-default py-1" style="height:30px; padding:4px 10px; min-width:120px; font-size:0.72rem;" data-id="${u.id}" title="Set Default">set default</button>
                    <button class="btn btn-info btn-sm btn-sms-admin py-1" style="height:30px; padding:4px 10px; min-width:120px; font-size:0.72rem;" data-id="${u.id}" title="Set SMS Admin">set sms admin</button>
                </div>
            </td>
        </tr>
    `).join('');

    return `
    <div class="modal fade" id="storeUsersModal" tabindex="-1" aria-labelledby="storeUsersModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" style="max-width:95%; width:95%;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="storeUsersModalLabel">View Store User - ${users.length ? users[0].branch : 'Store ' + storeId}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-0">
            <div class="table-responsive">
              <table class="table table-borderless mb-0">
                <thead class="table-light small text-uppercase">
                  <tr>
                    <th>ID#</th>
                    <th>BRANCH</th>
                    <th style="width:40%;">NAME</th>
                    <th>CONTACT#</th>
                    <th>CREATED</th>
                    <th>HIRED</th>
                    <th>USER</th>
                    <th>PASS</th>
                    <th>LAST VISIT</th>
                    <th>STATUS</th>
                    <th style="width:260px;">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  ${rows || `<tr><td colspan="11" class="text-center text-muted">No users found</td></tr>`}
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer d-flex flex-column gap-2">
            <div class="w-100">
              <button class="btn btn-primary w-100 btn-add-store-user" data-store-id="${storeId}"><i class="fa fa-user-plus me-2"></i> Add New User</button>
            </div>
            <div class="w-100">
              <button type="button" class="btn btn-warning w-100" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
}

function buildSetSmsAdminModalHtml(user, storeName) {
    const uname = user?.name || `ID ${user?.id || ''}`;
    return `
    <div class="modal fade" id="setSmsAdminModal" tabindex="-1" aria-labelledby="setSmsAdminModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width:420px; width:92%; margin-top:5rem;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="setSmsAdminModalLabel">Set Default BRANCH SMS ADMIN</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div class="mb-3"><i class="fa fa-info-circle fs-1 text-muted"></i></div>
            <p class="small text-muted">
              This will set this user as the Store DEFAULT SMS ADMIN for online ECOM sales.
              User will be notified everytime there is a new sale on ECOM DASHBOARD.
              Continue setting <strong>${uname}</strong> as SMS ADMIN for <strong>${storeName || ''}</strong>?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" id="confirmSetSmsAdminBtn">Set as Default</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showSetSmsAdminModal(userId) {
    const entry = findUserEntry(userId);
    if (!entry) {
        alert('User not found.');
        return;
    }
    const { storeId, user, usersArray } = entry;

    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    // remove any previous modal with same id
    container.querySelector('#setSmsAdminModal')?.remove();
    container.insertAdjacentHTML('beforeend', buildSetSmsAdminModalHtml(user, user.branch || (getStoreMockById(storeId) || {}).storeName));

    const modalEl = container.querySelector('#setSmsAdminModal');
    let bsModal;
    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        container.querySelector('#setSmsAdminModal')?.remove();
        document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== 'undefined' && modalEl) {
        bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', cleanup, { once: true });
        });
    }

    const confirmBtn = container.querySelector('#confirmSetSmsAdminBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            // clear existing sms admin flags in this store then set the chosen user
            usersArray.forEach(u => { u.isSmsAdmin = false; });
            const found = usersArray.find(u => Number(u.id) === Number(userId));
            if (found) found.isSmsAdmin = true;

            // close modal
            if (bsModal) bsModal.hide(); else cleanup();

            // refresh the store users modal so table updates
            setTimeout(() => { showStoreUsersModal(storeId); }, 50);
        }, { once: true });
    }
}

// delegate .btn-sms-admin clicks to open set-sms-admin modal
(function patchSmsAdminHandler() {
    if (window.__ggv_sms_admin_patched) return;
    window.__ggv_sms_admin_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-sms-admin');
        if (!btn) return;
        ev.preventDefault();
        const uid = btn.dataset.id || btn.getAttribute('data-id');
        if (!uid) return;
        showSetSmsAdminModal(uid);
    }, false);
})();

function findUserEntry(userId) {
    const id = Number(userId);
    for (const sid in __ggv_store_users_mock) {
        const arr = __ggv_store_users_mock[sid] || [];
        const found = arr.find(u => Number(u.id) === id);
        if (found) return { storeId: Number(sid), user: found, usersArray: arr };
    }
    return null;
}

function buildSetDefaultModalHtml(user, storeName) {
    const uname = user?.name || `ID ${user?.id || ''}`;
    return `
    <div class="modal fade" id="setDefaultModal" tabindex="-1" aria-labelledby="setDefaultModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width:420px; width:92%; margin-top:5rem;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="setDefaultModalLabel">Set Default</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center mb-3">
              <i class="fa fa-info-circle fs-1 text-muted"></i>
            </div>
            <p class="small text-muted">
              This will set this user as the Store DEFAULT user. Transaction on creating Sales under this account will record this default user as the creator.
              Continue setting <strong>${uname}</strong> as default user for <strong>${storeName || ''}</strong>?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" id="confirmSetDefaultBtn">Set as Default</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showSetDefaultModal(userId) {
    const entry = findUserEntry(userId);
    if (!entry) {
        alert('User not found.');
        return;
    }
    const { storeId, user, usersArray } = entry;

    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    // remove any previous modal with same id
    container.querySelector('#setDefaultModal')?.remove();
    container.insertAdjacentHTML('beforeend', buildSetDefaultModalHtml(user, user.branch || (getStoreMockById(storeId) || {}).storeName));

    const modalEl = container.querySelector('#setDefaultModal');
    let bsModal;
    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        container.querySelector('#setDefaultModal')?.remove();
        document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== 'undefined' && modalEl) {
        bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', cleanup, { once: true });
        });
    }

    const confirmBtn = container.querySelector('#confirmSetDefaultBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            // clear existing defaults in this store then set the chosen user
            usersArray.forEach(u => { u.isDefault = false; });
            const found = usersArray.find(u => Number(u.id) === Number(userId));
            if (found) found.isDefault = true;

            // close modal
            if (bsModal) bsModal.hide(); else cleanup();

            // refresh the store users modal so table updates (keeps container id consistent)
            setTimeout(() => { showStoreUsersModal(storeId); }, 50);
        }, { once: true });
    }
}

(function patchSetDefaultHandler() {
    if (window.__ggv_set_default_patched) return;
    window.__ggv_set_default_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-set-default');
        if (!btn) return;
        ev.preventDefault();
        const uid = btn.dataset.id || btn.getAttribute('data-id');
        if (!uid) return;
        showSetDefaultModal(uid);
    }, false);
})();

if (!window.__ggv_user_status_handlers_attached) {
    window.__ggv_user_status_handlers_attached = true;

    document.addEventListener('click', function (ev) {
        const userBtn = ev.target.closest('.user-status-toggle');
        if (!userBtn) return;

        ev.preventDefault();
        const uid = userBtn.dataset.userId;
        const current = userBtn.dataset.state === 'active' ? 'active' : 'inactive';
        const uidNum = Number(uid);

        const persistStatus = (newStatus) => {
            // update mock data array so changes persist across modal re-renders
            for (const sid in __ggv_store_users_mock) {
                const arr = __ggv_store_users_mock[sid] || [];
                const found = arr.find(x => Number(x.id) === uidNum);
                if (found) {
                    // store status as 'Active' / 'Inactive' to match existing mocks
                    found.status = newStatus === 'active' ? 'Active' : 'Inactive';
                    break;
                }
            }
        };

        if (current === 'active') {
            const ok = confirm('Are you sure you want to deactivate this user?');
            if (!ok) return;
            userBtn.dataset.state = 'inactive';
            userBtn.classList.remove('btn-success');
            userBtn.classList.add('btn-danger');
            userBtn.textContent = 'Deactivate';
            userBtn.setAttribute('aria-pressed', 'false');
            persistStatus('inactive');
            console.log('User', uid, 'deactivated (mock)');
            return;
        }

        // inactive -> activate
        const ok2 = confirm('Activate this user?');
        if (!ok2) return;
        userBtn.dataset.state = 'active';
        userBtn.classList.remove('btn-danger');
        userBtn.classList.add('btn-success');
        userBtn.textContent = 'Active';
        userBtn.setAttribute('aria-pressed', 'true');
        persistStatus('active');
        console.log('User', uid, 'activated (mock)');
    }, false);
}

function buildAddUserModalHtml(storeId, storeName) {
    return `
    <div class="modal fade" id="addStoreUserModal" tabindex="-1" aria-labelledby="addStoreUserModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width:480px; width:90%; margin-top:4rem;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addStoreUserModalLabel">Add New Store User - ${storeName || ''}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="addStoreUserForm" class="row g-3">
              <div class="col-12">
                <label class="form-label small">Assigned ID#</label>
                <input type="text" class="form-control form-control-sm" name="assignedId" placeholder="Enter ID No">
              </div>
              <div class="col-4">
                <label class="form-label small">Last</label>
                <input type="text" class="form-control form-control-sm" name="last" placeholder="Enter Last Name" required>
              </div>
              <div class="col-4">
                <label class="form-label small">First</label>
                <input type="text" class="form-control form-control-sm" name="first" placeholder="Enter First Name" required>
              </div>
              <div class="col-4">
                <label class="form-label small">Middle</label>
                <input type="text" class="form-control form-control-sm" name="middle" placeholder="Enter Middle Name">
              </div>
              <div class="col-6">
                <label class="form-label small">Contact No</label>
                <input type="text" class="form-control form-control-sm" name="contact" placeholder="Contact Number">
              </div>
              <div class="col-6">
                <label class="form-label small">Address</label>
                <input type="text" class="form-control form-control-sm" name="address" placeholder="Address">
              </div>
              <div class="col-6">
                <label class="form-label small">Position</label>
                <select class="form-select form-select-sm" name="position">
                  <option>OTHER</option>
                  <option>ADMIN</option>
                  <option>LOGISTICS</option>
                </select>
              </div>
              <div class="col-6">
                <label class="form-label small">User Name</label>
                <input type="text" class="form-control form-control-sm" name="username" placeholder="Username">
              </div>
              <div class="col-6">
                <label class="form-label small">Password</label>
                <input type="password" class="form-control form-control-sm" name="password" placeholder="Password">
              </div>
              <div class="col-6">
                <label class="form-label small">Confirm Password</label>
                <input type="password" class="form-control form-control-sm" name="confirmPassword" placeholder="Confirm Password">
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex gap-2">
            <button type="button" class="btn btn-primary btn-sm" id="addStoreUserSaveBtn">Add User</button>
            <button type="button" class="btn btn-warning btn-sm" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

(function replaceAddUserSaveHandler() {
    // find save button (this runs right after add modal inserted in showStoreUsersModal)
    const saveBtn = document.querySelector('#ggvStoreModalContainer #addStoreUserSaveBtn');
    if (!saveBtn) return;
    // ensure idempotent: if already wired, skip
    if (saveBtn.__ggv_bound) return;
    saveBtn.__ggv_bound = true;

    saveBtn.addEventListener('click', function () {
        const container = document.getElementById('ggvStoreModalContainer');
        const form = container?.querySelector('#addStoreUserForm');
        if (!form) return;
        const fd = Object.fromEntries(new FormData(form).entries());

        // Basic required fields
        if (!fd.last || !fd.first) {
            alert('Please enter first and last name.');
            return;
        }
        if (!fd.username || !fd.username.trim()) {
            alert('Please enter a username.');
            return;
        }
        if ((fd.password || fd.confirmPassword) && fd.password !== fd.confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
        }

        // determine store id (safeguard)
        const sid = container.querySelector('#addStoreUserModal')?.getAttribute('data-store-id') || container.querySelector('.btn-add-store-user')?.dataset.storeId;
        const arr = __ggv_store_users_mock[Number(sid)] || [];
        const maxId = arr.reduce((m, x) => Math.max(m, Number(x.id || 0)), 0);
        const newId = fd.assignedId && Number(fd.assignedId) ? Number(fd.assignedId) : (maxId + 1 || Date.now());
        const nameParts = `${fd.last}${fd.first ? ', ' + fd.first : ''}${fd.middle ? ' ' + fd.middle : ''}`;

        const newUser = {
            id: newId,
            branch: (arr[0] && arr[0].branch) || (getStoreMockById(sid) || {}).storeName || '',
            name: nameParts,
            contact: fd.contact || '',
            created: new Date().toISOString().slice(0,19).replace('T',' '),
            hired: new Date().toISOString().slice(0,19).replace('T',' '),
            user: fd.username || '',
            pass: fd.password || '',
            lastVisit: '',
            status: 'Active',
            position: fd.position || 'OTHER',
            address: fd.address || ''
        };

        if (!__ggv_store_users_mock[Number(sid)]) __ggv_store_users_mock[Number(sid)] = [];
        __ggv_store_users_mock[Number(sid)].push(newUser);

        // close add modal then re-render store users modal (recreate container content)
        const addModalEl = container.querySelector('#addStoreUserModal');
        if (addModalEl) {
            try { const bs = bootstrap.Modal.getInstance(addModalEl); if (bs) bs.hide(); } catch (e) { addModalEl.remove(); }
        }

        // refresh users modal
        container.innerHTML = '';
        setTimeout(() => {
            showStoreUsersModal(sid);
        }, 50);
    }, { once: true });
})();

function showStoreUsersModal(storeId) {
    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    const users = getStoreUsersMockById(storeId);
    container.innerHTML = buildStoreUsersModalHtml(storeId, users);

    const modalEl = container.querySelector('#storeUsersModal');
    let bsModal;
    if (typeof bootstrap !== "undefined" && modalEl) {
        bsModal = bootstrap.Modal.getOrCreateInstance(modalEl, { backdrop: 'static' });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
    }

    // wire add new user button to open add-user modal
    const addBtn = container.querySelector('.btn-add-store-user');
    if (addBtn) {
        addBtn.addEventListener('click', function (ev) {
            ev.preventDefault();
            const sid = this.dataset.storeId;
            // render add-user modal next to storeUsersModal in same container
            const storeName = (getStoreMockById(sid) || {}).storeName || '';
            // ensure any existing add modal removed
            container.querySelector('#addStoreUserModal')?.remove();
            container.insertAdjacentHTML('beforeend', buildAddUserModalHtml(sid, storeName));

            const addModalEl = container.querySelector('#addStoreUserModal');
            let addBs;
            if (typeof bootstrap !== "undefined" && addModalEl) {
                addBs = new bootstrap.Modal(addModalEl, { backdrop: 'static' });
                addModalEl.addEventListener('hidden.bs.modal', function () {
                    // cleanup modal DOM when closed
                    addModalEl.remove();
                }, { once: true });
                addBs.show();
            } else if (addModalEl) {
                addModalEl.classList.add('show');
                addModalEl.style.display = 'block';
                if (!document.querySelector('.modal-backdrop')) {
                    const bd = document.createElement('div');
                    bd.className = 'modal-backdrop fade show';
                    document.body.appendChild(bd);
                    document.body.classList.add('modal-open');
                }
            }

            // Add button handler: collect form and inject new user then re-open users modal
            const saveBtn = container.querySelector('#addStoreUserSaveBtn');
            if (saveBtn) {
                saveBtn.addEventListener('click', function () {
                    const form = container.querySelector('#addStoreUserForm');
                    if (!form) return;
                    const fd = Object.fromEntries(new FormData(form).entries());
                    // basic validation
                    if (!fd.last || !fd.first) {
                        alert('Please enter first and last name.');
                        return;
                    }
                    // determine id
                    const arr = __ggv_store_users_mock[Number(sid)] || [];
                    const maxId = arr.reduce((m, x) => Math.max(m, Number(x.id || 0)), 0);
                    const newId = fd.assignedId && Number(fd.assignedId) ? Number(fd.assignedId) : (maxId + 1 || Date.now());
                    const nameParts = `${fd.last}${fd.first ? ', ' + fd.first : ''}${fd.middle ? ' ' + fd.middle : ''}`;
                    const newUser = {
                        id: newId,
                        branch: (arr[0] && arr[0].branch) || (getStoreMockById(sid) || {}).storeName || '',
                        name: nameParts,
                        contact: fd.contact || '',
                        created: new Date().toISOString().slice(0,19).replace('T',' '),
                        hired: new Date().toISOString().slice(0,19).replace('T',' '),
                        user: fd.username || '',
                        pass: fd.password || '',
                        lastVisit: '',
                        status: 'Active',
                        position: fd.position || 'OTHER',
                        address: fd.address || ''
                    };
                    // ensure array exists
                    if (!__ggv_store_users_mock[Number(sid)]) __ggv_store_users_mock[Number(sid)] = [];
                    __ggv_store_users_mock[Number(sid)].push(newUser);

                    // close add modal then re-render store users modal (recreate container content)
                    if (addBs) addBs.hide();
                    else container.querySelector('#addStoreUserModal')?.remove();

                    // remove existing storeUsersModal from container then re-open to refresh table
                    container.innerHTML = '';
                    // small timeout to allow backdrop removal
                    setTimeout(() => {
                        showStoreUsersModal(sid);
                    }, 50);
                }, { once: true });
            }

        }, { once: true });
    }
}

(function patchViewUsersHandler() {
    if (window.__ggv_shop_users_modal_patched) return;
    window.__ggv_shop_users_modal_patched = true;

    document.addEventListener('click', function (ev) {
        const viewUsers = ev.target.closest('.btn-view-users');
        if (viewUsers) {
            ev.preventDefault();
            const id = viewUsers.dataset.id;
            showStoreUsersModal(id);
            ev.stopImmediatePropagation();
            return;
        }
    }, true); // capture to run before bubble handlers that show alerts
})();

if (!window.__ggv_user_status_handlers_attached) {
    window.__ggv_user_status_handlers_attached = true;

    document.addEventListener('click', function (ev) {
        const userBtn = ev.target.closest('.user-status-toggle');
        if (!userBtn) return;

        ev.preventDefault();
        const uid = userBtn.dataset.userId;
        const current = userBtn.dataset.state === 'active' ? 'active' : 'inactive';

        if (current === 'active') {
            const ok = confirm('Are you sure you want to deactivate this user?');
            if (!ok) return;
            userBtn.dataset.state = 'inactive';
            userBtn.classList.remove('btn-success');
            userBtn.classList.add('btn-danger');
            userBtn.textContent = 'Deactivate';
            userBtn.setAttribute('aria-pressed', 'false');
            // TODO: call backend to update user status
            console.log('User', uid, 'deactivated (mock)');
            return;
        }

        // inactive -> activate
        const ok2 = confirm('Activate this user?');
        if (!ok2) return;
        userBtn.dataset.state = 'active';
        userBtn.classList.remove('btn-danger');
        userBtn.classList.add('btn-success');
        userBtn.textContent = 'Active';
        userBtn.setAttribute('aria-pressed', 'true');
        // TODO: call backend to update user status
        console.log('User', uid, 'activated (mock)');
    }, false);
}

function getUserMockById(userId) {
    userId = Number(userId);
    for (const sid in __ggv_store_users_mock) {
        const found = (__ggv_store_users_mock[sid] || []).find(u => Number(u.id) === userId);
        if (found) return found;
    }
    return null;
}

function buildUserDetailModalHtml(user) {
    const u = user || {};
    return `
    <div class="modal fade" id="userDetailModal" tabindex="-1" aria-labelledby="userDetailModalLabel" aria-hidden="true">
      <!-- remove vertical centering and apply a top margin so modal header clears the fixed navbar -->
      <div class="modal-dialog" style="max-width:480px; width:90%; margin:6rem auto 2rem;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userDetailModalLabel">View Store User${u.branch ? ' - ' + u.branch : ''}${u.name ? ' - ' + u.name : ''}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="userDetailForm" class="row g-3">
              <div class="col-12">
                <label class="form-label small">Store</label>
                <input type="text" class="form-control form-control-sm" name="store" value="${u.branch || ''}">
              </div>

              <div class="col-6">
                <label class="form-label small">Assigned ID#</label>
                <input type="text" class="form-control form-control-sm" name="assignedId" value="${u.id || ''}">
              </div>

              <div class="col-6">
                <label class="form-label small">Status</label>
                <div class="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    class="btn btn-sm ${u.status === 'Active' ? 'btn-success' : 'btn-danger'} user-status-toggle"
                    data-user-id="${u.id || ''}"
                    data-state="${u.status === 'Active' ? 'active' : 'inactive'}"
                    aria-pressed="${u.status === 'Active'}"
                    title="Toggle user status"
                  >
                    ${u.status || 'Inactive'}
                  </button>
                  <button type="button" class="btn btn-info btn-sm btn-sms-admin" data-id="${u.id || ''}">SET SMS ADMIN</button>
                </div>
              </div>

              <div class="col-4">
                <label class="form-label small">Last</label>
                <input type="text" class="form-control form-control-sm" name="last" value="${(u.name || '').split(',')[0] || ''}">
              </div>
              <div class="col-4">
                <label class="form-label small">First</label>
                <input type="text" class="form-control form-control-sm" name="first" value="${(u.name || '').split(',')[1] ? u.name.split(',')[1].trim() : ''}">
              </div>
              <div class="col-4">
                <label class="form-label small">Middle</label>
                <input type="text" class="form-control form-control-sm" name="middle" value="${u.middle || ''}">
              </div>

              <div class="col-12">
                <label class="form-label small">Contact No</label>
                <input type="text" class="form-control form-control-sm" name="contact" value="${u.contact || ''}">
              </div>

              <div class="col-12">
                <label class="form-label small">Address</label>
                <input type="text" class="form-control form-control-sm" name="address" value="${u.address || u.city || ''}">
              </div>

              <div class="col-6">
                <label class="form-label small">Position</label>
                <select class="form-select form-select-sm" name="position">
                  <option ${u.position === 'ADMIN' ? 'selected' : ''}>ADMIN</option>
                  <option ${u.position === 'LOGISTICS' ? 'selected' : ''}>LOGISTICS</option>
                  <option ${!u.position ? 'selected' : ''}>OTHER</option>
                </select>
              </div>

              <div class="col-6">
                <label class="form-label small">User Name</label>
                <input type="text" class="form-control form-control-sm" name="username" value="${u.user || ''}">
              </div>

              <div class="col-6">
                <label class="form-label small">Password</label>
                <input type="text" class="form-control form-control-sm" name="password" value="${u.pass || ''}">
              </div>

              <div class="col-6">
                <label class="form-label small">Last Login</label>
                <input type="text" class="form-control form-control-sm" name="lastLogin" value="${u.lastVisit || ''}">
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" id="userDetailSaveBtn"><i class="fa fa-save me-1"></i> Update</button>
            <button type="button" class="btn btn-warning btn-sm" data-bs-dismiss="modal"><i class="fa fa-times me-1"></i> Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showUserDetailModal(userId) {
    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    const user = getUserMockById(userId) || { id: userId };
    container.innerHTML = buildUserDetailModalHtml(user);

    const modalEl = container.querySelector('#userDetailModal');
    let bsModal;

    function cleanupUser() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        if (modalEl) {
            modalEl.removeEventListener('hidden.bs.modal', cleanupUser);
        }
        if (container) container.innerHTML = '';
        document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== "undefined" && modalEl) {
        bsModal = bootstrap.Modal.getOrCreateInstance(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanupUser);
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', function () {
                cleanupUser();
            }, { once: true });
        });
    }

    // save handler (mock)
    const saveBtn = container.querySelector('#userDetailSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const form = container.querySelector('#userDetailForm');
            const payload = {};
            if (form) new FormData(form).forEach((v, k) => payload[k] = v);
            console.log('Save user (mock)', userId, payload);
            if (bsModal) bsModal.hide();
            else cleanupUser();
            alert('User updated (mock): ' + userId);
        }, { once: true });
    }
}

(function patchViewStockHandler() {
    // idempotent single capture-phase handler: prefer userId, fallback to storeId
    if (window.__ggv_shop_modal_patched) return;
    window.__ggv_shop_modal_patched = true;

    document.addEventListener('click', function (ev) {
        const viewStock = ev.target.closest('.btn-view-stock');
        if (!viewStock) return;

        ev.preventDefault();

        // Prefer user id on the button (users table). If present, open user modal.
        const userId = viewStock.dataset.userId || viewStock.dataset.userid || viewStock.getAttribute('data-user-id');
        if (userId) {
            if (typeof showUserDetailModal === 'function') {
                showUserDetailModal(userId);
            }
            ev.stopImmediatePropagation();
            return;
        }

        // Fallback to store id (main table)
        const storeId = viewStock.dataset.id || viewStock.dataset.storeId || viewStock.getAttribute('data-id') || viewStock.getAttribute('data-store-id');
        if (storeId) {
            if (typeof showStoreDetailsModal === 'function') {
                showStoreDetailsModal(storeId);
            }
            ev.stopImmediatePropagation();
            return;
        }

        // otherwise let other handlers run
    }, true); // capture phase so runs before bubble handlers
})();

/* Password change modal */

function buildChangePasswordModalHtml(store) {
    const s = store || {};
    return `
    <div class="modal fade" id="changePasswordModal" tabindex="-1" aria-labelledby="changePasswordModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width:520px; width:92%; margin-top:4rem;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="changePasswordModalLabel">Update Store Username / Password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="changePasswordForm" class="row g-3">
              <div class="col-12 col-md-12">
                <label class="form-label small">Store</label>
                <input type="text" class="form-control form-control-sm" name="storeName" value="${s.storeName || s.store || ''}" readonly>
              </div>
              <div class="col-12 col-md-12">
                <label class="form-label small">Username</label>
                <input type="text" class="form-control form-control-sm" name="username" value="${s.username || ''}">
              </div>
              <div class="col-12 col-md-12">
                <label class="form-label small">Old Password</label>
                <input type="password" class="form-control form-control-sm" name="oldPassword" placeholder="Old Password">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label small">New Password</label>
                <input type="password" class="form-control form-control-sm" name="newPassword" placeholder="New Password">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label small">Retype Password</label>
                <input type="password" class="form-control form-control-sm" name="confirmPassword" placeholder="Retype Password">
              </div>
            </form>
          </div>
          <div class="modal-footer d-flex flex-column gap-2">
            <!-- Send Credentials button -->
            <button type="button"
                    class="btn btn-info w-100 btn-sm btn-account-send-sms"
                    data-sms-type="credentials"
                    data-contact="${s.contactNo || ''}"
                    data-complete-name="${(s.storeName || s.accountName || '').replace(/"/g,'&quot;')}"
                    data-user="${s.username || ''}">
              <i class="fa fa-mobile me-1"></i> Send Credentials
            </button>

            <button type="button" class="btn btn-primary w-100" id="changePasswordSaveBtn"><i class="fa fa-save me-1"></i> Update Password</button>
            <button type="button" class="btn btn-warning w-100" data-bs-dismiss="modal">✖ Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showChangePasswordModal(storeId) {
    const store = getStoreMockById(storeId);
    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    // remove any existing modal with that id
    container.querySelector('#changePasswordModal')?.remove();
    container.insertAdjacentHTML('beforeend', buildChangePasswordModalHtml(store));

    const modalEl = container.querySelector('#changePasswordModal');
    let bsModal;

    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        container.querySelector('#changePasswordModal')?.remove();
        document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== 'undefined' && modalEl) {
        bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', cleanup, { once: true });
        });
    }

    // Save handler: validate and persist to mock
    const saveBtn = container.querySelector('#changePasswordSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            const form = container.querySelector('#changePasswordForm');
            if (!form) return;
            const fd = Object.fromEntries(new FormData(form).entries());
            // basic validation
            if (!fd.username || !fd.username.trim()) { alert('Please enter a username.'); return; }
            if (fd.newPassword && fd.newPassword !== fd.confirmPassword) { alert('Password and Confirm Password do not match.'); return; }

            // verify old password if store has a password
            const mock = getStoreMockById(storeId);
            if (mock.password && fd.oldPassword && mock.password !== fd.oldPassword) {
                alert('Old password is incorrect.');
                return;
            }

            // persist to mock
            if (mock) {
                mock.username = fd.username;
                if (fd.newPassword) mock.password = fd.newPassword;
            }

            // hide and cleanup
            try { if (bsModal) bsModal.hide(); } catch (e) { cleanup(); }
            alert('Store credentials updated (mock).');

            // optional: refresh store details modal if it is open
            setTimeout(() => {
                // if store details modal open, re-render it
                if (document.getElementById('storeDetailsModal')) {
                    showStoreDetailsModal(storeId);
                }
            }, 50);
        }, { once: true });
    }
}

(function patchChangePassHandler() {
    if (window.__ggv_change_pass_patched) return;
    window.__ggv_change_pass_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-change-pass');
        if (!btn) return;
        ev.preventDefault();
        const id = btn.dataset.id || btn.getAttribute('data-id');
        if (!id) return;
        showChangePasswordModal(id);
    }, false);
})();

/* 

    Accounts

*/
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
              // sample contact for SMS button
              const contact = '6391711' + (100 + i);
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
                  <div class="btn-group btn-xs" role="group" aria-label="row-tools">
                    <a href="javascript:void(0)" class="btn btn-success btn-modal-pop" data-target="modal-user-view" data-page="user.view.details" title="View Account Details" data-id="${i}">
                      <i class="fa fa-search"></i>
                    </a>
                    <a href="javascript:void(0)" class="btn btn-info btn-account-send-sms" title="Send credential VIA SMS" data-sms-type="credentials" data-contact="${contact}" data-complete-name="GUILD GRINDERS" data-user="${username}">
                      <i class="fa fa-mobile"></i>
                    </a>
                    <a href="javascript:void(0)" class="btn btn-success btn-modal-pop" data-target="modal-user-view-pass" data-page="user.view.pass" title="Username &amp; Password" data-id="${i}">
                      <i class="fa fa-key"></i>
                    </a>
                    <a href="javascript:void(0)" class="btn btn-success btn-modal-pop" data-target="modal-store" data-page="store.view" title="View Store Details" data-id="${i}">
                      Store
                    </a>
                    <a href="https://secure.onegrindersguild.com/instalogin.php?loghash=314e5a53d4d2459241745fdd6eebf887" target="_blank" class="btn btn-success" title="Insta LOGIN">
                      <i class="fa fa-user"></i>
                    </a>
                  </div>
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

(function patchModalPopHandler() {
    if (window.__ggv_modal_pop_patched_v2) return;
    window.__ggv_modal_pop_patched_v2 = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-modal-pop');
        if (!btn) return;
        ev.preventDefault();

        const target = (btn.dataset.target || btn.getAttribute('data-target') || '').trim();
        const page = (btn.dataset.page || btn.getAttribute('data-page') || '').trim();
        const id = btn.dataset.id || btn.getAttribute('data-id');

        // Primary: open Large User View (tabbed)
        if (target === 'modal-user-view' || page === 'user.view.details') {
            if (!id) {
                console.warn('modal-pop: missing data-id for user view');
                return;
            }
            showUserViewModal(id);
            // stop further handlers from opening other modals (e.g. store modal)
            ev.stopImmediatePropagation();
            return;
        }

        // user password view -> reuse change-password modal
        if (target === 'modal-user-view-pass' || page === 'user.view.pass') {
            if (!id) return;
            if (typeof showChangePasswordModal === 'function') {
                showChangePasswordModal(id);
            }
            ev.stopImmediatePropagation();
            return;
        }

        // store view kept but only for explicit modal-store target
        if (target === 'modal-store' || page === 'store.view') {
            if (!id) {
                console.warn('modal-pop: missing data-id for store');
                return;
            }
            if (typeof showStoreDetailsModal === 'function') {
                showStoreDetailsModal(id);
            }
            ev.stopImmediatePropagation();
            return;
        }

        // fallback: nothing
    }, true); // use capture so we preempt other listeners
})();

(function patchAccountSendSmsHandler() {
    if (window.__ggv_account_send_sms_patched) return;
    window.__ggv_account_send_sms_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-account-send-sms');
        if (!btn) return;
        ev.preventDefault();

        const contact = btn.dataset.contact || btn.getAttribute('data-contact') || '';
        const fullname = btn.dataset.completeName || btn.getAttribute('data-complete-name') || '';
        const user = btn.dataset.user || btn.getAttribute('data-user') || '';
        const smsType = btn.dataset.smsType || btn.getAttribute('data-sms-type') || '';

        // show modal and pass details
        showSendSmsModal({ contact, fullname, user, smsType });
    }, false);
})();

function buildSendSmsModalHtml(contact, fullname, user) {
    return `
    <div class="modal fade" id="sendSmsModal" tabindex="-1" aria-labelledby="sendSmsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" style="max-width:420px; width:92%; margin-top:5rem;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="sendSmsModalLabel">Send SMS?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <div class="mb-3"><i class="fa fa-info-circle fs-1 text-muted"></i></div>
            <p class="small text-muted">
              This will send SMS to the registered number of <strong>${(fullname || user) || 'the account'}</strong>
              <br><small class="text-primary">${contact || 'No contact provided'}</small>
            </p>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary btn-sm" id="confirmSendSmsBtn">Send!</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showSendSmsModal(opts) {
    const contact = opts?.contact || '';
    const fullname = opts?.fullname || opts?.completeName || '';
    const user = opts?.user || '';

    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    // remove existing modal if any
    container.querySelector('#sendSmsModal')?.remove();
    container.insertAdjacentHTML('beforeend', buildSendSmsModalHtml(contact, fullname, user));

    const modalEl = container.querySelector('#sendSmsModal');
    let bsModal;

    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        container.querySelector('#sendSmsModal')?.remove();
        document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== 'undefined' && modalEl) {
        bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', cleanup, { once: true });
        });
    }

    const confirmBtn = container.querySelector('#confirmSendSmsBtn');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function () {
            // replace with real API call as needed
            if (!contact) {
                alert('No contact number available.');
                return;
            }
            // mock send
            console.log('Sending SMS (mock) to', contact, { fullname, user });
            alert(`SMS sent to ${contact} (mock).`);

            if (bsModal) bsModal.hide();
            else cleanup();
        }, { once: true });
    }
}

function buildUserViewModalHtml(user) {
  return `
    <div class="modal fade" id="userViewModal" tabindex="-1" aria-labelledby="userViewModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Account Details - ${user.name || 'ID ' + user.id}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ul class="nav nav-tabs" id="uv-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="nav-link active" id="uv-tab-personal" data-bs-toggle="tab" data-bs-target="#uv-personal" type="button" role="tab" aria-controls="uv-personal" aria-selected="true">Personal Details</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="uv-tab-accounts" data-bs-toggle="tab" data-bs-target="#uv-accounts" type="button" role="tab" aria-controls="uv-accounts" aria-selected="false">Accounts</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="uv-tab-sponsored" data-bs-toggle="tab" data-bs-target="#uv-sponsored" type="button" role="tab" aria-controls="uv-sponsored" aria-selected="false">Sponsored</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="uv-tab-binary-downlines" data-bs-toggle="tab" data-bs-target="#uv-binary-downlines" type="button" role="tab" aria-controls="uv-binary-downlines" aria-selected="false">Binary Downlines</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="uv-tab-binary-uplines" data-bs-toggle="tab" data-bs-target="#uv-binary-uplines" type="button" role="tab" aria-controls="uv-binary-uplines" aria-selected="false">Binary Uplines</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="uv-tab-unilevel-downlines" data-bs-toggle="tab" data-bs-target="#uv-unilevel-downlines" type="button" role="tab" aria-controls="uv-unilevel-downlines" aria-selected="false">Unilevel Downlines</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="nav-link" id="uv-tab-unilevel-uplines" data-bs-toggle="tab" data-bs-target="#uv-unilevel-uplines" type="button" role="tab" aria-controls="uv-unilevel-uplines" aria-selected="false">Unilevel Uplines</button>
              </li>
            </ul>

            <div class="tab-content mt-3" id="uv-tabContent">
              ${buildUserPersonalDetailsTab(user)}
              ${buildUserAccountsTab(user)}
              ${buildUserSponsoredTab(user)}
              ${buildUserBinaryDownlinesTab(user)}
              ${buildUserBinaryUplinesTab(user)}
              ${buildUserUnilevelDownlinesTab(user)}
              ${buildUserUnilevelUplinesTab(user)}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function showUserViewModal(userId) {
  const user = getUserMockById(userId) || { id: userId };
  let container = document.getElementById('ggvStoreModalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ggvStoreModalContainer';
    document.body.appendChild(container);
  }

  container.querySelector('#userViewModal')?.remove();
  container.insertAdjacentHTML('beforeend', buildUserViewModalHtml(user));

  const modalEl = container.querySelector('#userViewModal');
  if (typeof bootstrap !== 'undefined' && modalEl) {
    const bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    bsModal.show();
  }
}

function buildConfirmModalHtml(id, title, message, confirmText, confirmId) {
  return `
  <div class="modal fade" id="${id}" tabindex="-1" aria-labelledby="${id}Label" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" style="max-width:420px; width:92%; margin-top:5rem;">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="${id}Label">${title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-center">
          <div class="mb-3"><i class="fa fa-info-circle fs-1 text-muted"></i></div>
          <p class="small text-muted">${message}</p>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger btn-sm" id="${confirmId}">${confirmText}</button>
        </div>
      </div>
    </div>
  </div>
  `;
}

(function patchAccountActiveToggleHandler() {
    if (window.__ggv_account_active_toggle_patched) return;
    window.__ggv_account_active_toggle_patched = true;

    // Delegate clicks for the account active button inside user view modal
    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-account-active');
        if (!btn) return;
        ev.preventDefault();
        ev.stopImmediatePropagation();

        const userId = btn.dataset.userId || btn.getAttribute('data-user-id') || '';
        const state = (btn.dataset.state || 'active').toLowerCase();

        const modalId = 'confirmDeactivateModal';
        const confirmBtnId = 'confirmDeactivateBtn';
        const userLabel = userId ? (`ID ${userId}`) : 'this account';

        // Build appropriate title/message depending on current state
        const isActive = state === 'active';
        const title = isActive ? 'Deactivate Account?' : 'Activate Account?';
        const message = isActive
          ? `Are you sure you want to deactivate this account?`
          : `Are you sure you want to activate this account?`;

        // ensure container exists
        let container = document.getElementById('ggvStoreModalContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'ggvStoreModalContainer';
            document.body.appendChild(container);
        }

        // remove any existing confirm modal and insert a fresh one
        container.querySelector('#' + modalId)?.remove();
        container.insertAdjacentHTML('beforeend', buildConfirmModalHtml(modalId, title, message, isActive ? 'Deactivate Account!' : 'Activate Account', confirmBtnId));

        const modalEl = container.querySelector('#' + modalId);
        let bsModal;
        function cleanup() {
            try { if (bsModal) bsModal.dispose(); } catch (e) {}
            container.querySelector('#' + modalId)?.remove();
            document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
            document.body.classList.remove('modal-open');
        }

        if (typeof bootstrap !== 'undefined' && modalEl) {
            bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
            modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
            bsModal.show();
        } else if (modalEl) {
            modalEl.classList.add('show');
            modalEl.style.display = 'block';
            if (!document.querySelector('.modal-backdrop')) {
                const bd = document.createElement('div');
                bd.className = 'modal-backdrop fade show';
                document.body.appendChild(bd);
                document.body.classList.add('modal-open');
            }
            modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(b => b.addEventListener('click', cleanup, { once: true }));
        }

        // wire confirm button
        const confirmBtn = container.querySelector('#' + confirmBtnId);
        if (!confirmBtn) return;
        confirmBtn.addEventListener('click', function handler() {
            // Toggle visual state of the clicked button
            try {
                // update state and classes/text
                if (isActive) {
                    btn.dataset.state = 'inactive';
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-danger');
                    btn.setAttribute('aria-pressed', 'false');
                    btn.innerHTML = '<i class="fa fa-times-circle me-2"></i> Deactivate';
                    console.log('Account', userId, 'deactivated (mock)');
                } else {
                    btn.dataset.state = 'active';
                    btn.classList.remove('btn-danger');
                    btn.classList.add('btn-success');
                    btn.setAttribute('aria-pressed', 'true');
                    btn.innerHTML = '<i class="fa fa-check-circle me-2"></i> Account Active';
                    console.log('Account', userId, 'activated (mock)');
                }
            } catch (e) {
                console.error(e);
            }

            // close modal
            if (bsModal) bsModal.hide(); else cleanup();

            // optional toast/alert
            alert(`${isActive ? 'Account deactivated' : 'Account activated'} (mock).`);
        }, { once: true });
    }, true); // capture phase to preempt other handlers
})();

/* --------------- Tabs For Build User View Modal --------------- */
// Personal Details Tab (left form + right buttons) 
function buildUserPersonalDetailsTab(user) {
  const u = user || {};
  return `
    <div class="tab-pane fade show active" id="uv-personal" role="tabpanel" aria-labelledby="uv-tab-personal">
      <div class="row g-3">
        <div class="col-12 col-lg-8">
          <div class="row g-3">
            <div class="col-12 col-md-3">
              <label class="form-label small text-muted">USERID:</label>
              <input class="form-control form-control-sm" name="userid" readonly value="${u.id || ''}">
            </div>
            <div class="col-12 col-md-3">
              <label class="form-label small text-muted">ID#:</label>
              <input class="form-control form-control-sm" name="idno" readonly value="${u.idno || ''}">
            </div>
            <div class="col-12 col-md-3">
              <label class="form-label small text-muted">Username:</label>
              <input class="form-control form-control-sm" name="username" readonly value="${u.user || ''}">
            </div>
            <div class="col-12 col-md-3">
              <label class="form-label small text-muted">Password:</label>
              <input type="text" class="form-control form-control-sm" name="password" readonly value="${u.pass || u.password || ''}">
            </div>

            <div class="col-12 col-md-6">
              <label class="form-label small text-muted">Registered:</label>
              <input class="form-control form-control-sm" name="registered" readonly value="${u.created || u.registered || ''}">
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label small text-muted">Account Type:</label>
              <input class="form-control form-control-sm" name="accountType" readonly value="${u.accountType || u.package || ''}">
            </div>

            <div class="col-12 col-md-6">
              <label class="form-label small text-muted">Last:</label>
              <input class="form-control form-control-sm" name="last" value="${(u.name||'').split(',')[0] || ''}">
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label small text-muted">First / Middle:</label>
              <div class="d-flex gap-2">
                <input class="form-control form-control-sm" name="first" value="${(u.name||'').split(',')[1] ? u.name.split(',')[1].trim() : ''}">
                <input class="form-control form-control-sm" name="middle" value="${u.middle || ''}">
              </div>
            </div>

            <div class="col-12 col-md-4">
              <label class="form-label small text-muted">Gender:</label>
              <select class="form-select form-select-sm" name="gender">
                <option ${u.gender === 'Male' ? 'selected' : ''}>Male</option>
                <option ${u.gender === 'Female' ? 'selected' : ''}>Female</option>
                <option ${!u.gender ? 'selected' : ''}>Other</option>
              </select>
            </div>
            <div class="col-12 col-md-8">
              <label class="form-label small text-muted">Contact # <small class="text-success">VERIFIED</small></label>
              <input class="form-control form-control-sm" name="contact" value="${u.contact || ''}">
            </div>

            <div class="col-12">
              <label class="form-label small text-muted">Complete Address</label>
              <input class="form-control form-control-sm" name="address" value="${u.address || ''}">
            </div>

            <div class="col-12 col-md-4">
              <label class="form-label small text-muted">Country</label>
              <input class="form-control form-control-sm" name="country" value="${u.country || 'Philippines'}">
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label small text-muted">Barangay</label>
              <input class="form-control form-control-sm" name="barangay" value="${u.barangay || ''}">
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label small text-muted">Region / Province / City</label>
              <input class="form-control form-control-sm" name="region" value="${u.region || ''}">
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="d-grid gap-2">
            <button type="button"
                    class="btn btn-success btn-sm text-white d-flex align-items-center justify-content-start btn-account-active"
                    data-user-id="${u.id || ''}"
                    data-state="active"
                    style="padding:12px 16px;"
                    title="Account Active">
              <i class="fa fa-check-circle me-2"></i> Account Active
            </button>

            <button type="button" class="btn btn-info btn-sm text-white d-flex align-items-center justify-content-start btn-matching-report" data-user-id="${u.id || ''}" style="padding:12px 16px;" title="Matching Report">
              <i class="fa fa-sitemap me-2"></i> Matching Report
            </button>

            <button type="button" class="btn btn-primary btn-sm text-white d-flex align-items-center justify-content-start btn-personal-sales-report" data-user-id="999" style="padding:12px 16px;" title="Personal Sales Report">
              <i class="fa fa-shopping-cart me-2"></i> Personal Sales Report
            </button>

            <button type="button" class="btn btn-primary btn-sm text-white d-flex align-items-center justify-content-start btn-group-sales-report" data-user-id="GGUILD01" style="padding:12px 16px;" title="Group Sales Report">
              <i class="fa fa-users me-2"></i> Group Sales Report
            </button>

            <button type="button" class="btn btn-danger btn-sm text-white d-flex align-items-center justify-content-start btn-delete-pin" data-user-id="999" style="padding:12px 16px;" title="Delete Withdrawal PIN">
              <i class="fa fa-trash me-2"></i> Delete Withdrawal PIN
            </button>


            <button type="button" class="btn btn-info btn-sm text-white d-flex align-items-center justify-content-start btn-resend-welcome" data-user-id="999" style="padding:12px 16px;" title="Resend Welcome Message">
              <i class="fa fa-envelope-open-o me-2"></i> Resend Welcome Message
            </button>


            <button type="button" class="btn btn-info btn-sm text-white d-flex align-items-center justify-content-start btn-send-credentials" data-user-id="999" style="padding:12px 16px;" title="Send Credentials">
              <i class="fa fa-mobile me-2"></i> Send Credentials
            </button>


            <button type="button" class="btn btn-warning btn-lg w-100 text-white btn-update-account" data-user-id="999" style="padding:14px 18px;" title="Update Account">
              <i class="fa fa-save me-2"></i> Update Account
            </button>

          </div>
        </div>
      </div>
    </div>
  `;
}
// Accounts Tab (table of accounts)
function buildUserAccountsTab(user) {
  // --- Data Handling and Fallbacks ---
  // If `user.accounts` is missing or not in the correct format,
  // we provide a default structure to prevent errors.
  const defaultAccountsInfo = {
    data: [
      { username: 'GGUILD01', registered: '2025-01-31 00:00:00', type: 'PLATINUM', status: 'ACTIVE' },
      { username: 'GGUILD02', registered: '2025-01-31 00:00:00', type: 'PLATINUM', status: 'ACTIVE' },
      { username: 'GGUILD03', registered: '2025-01-31 00:00:00', type: 'PLATINUM', status: 'ACTIVE' },
      { username: 'GGUILD04', registered: '2025-01-31 00:00:00', type: 'PLATINUM', status: 'ACTIVE' },
      { username: 'GGUILD05', registered: '2025-01-31 00:00:00', type: 'PLATINUM', status: 'ACTIVE' }
    ],
    totalEntries: 63, // Example total
    showingFrom: 1,
    showingTo: 5
  };

  // Use the provided user accounts info, or fall back to the default mock data.
  const accountsInfo = user?.accounts && user.accounts.data ? user.accounts : defaultAccountsInfo;

  // Destructure the properties for cleaner access.
  const { data: accounts, totalEntries, showingFrom, showingTo } = accountsInfo;

  // --- Dynamic HTML Generation ---

  // Generate table rows from the account data.
  const rows = accounts.map(acc => `
    <tr>
      <td>${acc.username}</td>
      <td>${acc.registered}</td>
      <td>${acc.type}</td>
      <td><span class="badge bg-success">${acc.status}</span></td>
    </tr>
  `).join('');

  // Generate the pagination summary text dynamically.
  // This now correctly uses the data from the `accountsInfo` object.
  const paginationInfo = `Showing ${showingFrom} to ${showingTo} of ${totalEntries} entries`;

  // --- Final HTML Template ---
  // I've also corrected the HTML for the pagination links to be valid Bootstrap 5.
  return `
    <div class="tab-pane fade" id="uv-accounts" role="tabpanel" aria-labelledby="uv-tab-accounts">
      <div class="mb-3 d-flex justify-content-between align-items-center">
        <div>
          <button class="btn btn-sm btn-outline-secondary">Copy</button>
          <button class="btn btn-sm btn-outline-secondary">CSV</button>
          <button class="btn btn-sm btn-outline-secondary">Excel</button>
          <button class="btn btn-sm btn-outline-secondary">PDF</button>
          <button class="btn btn-sm btn-outline-secondary">Print</button>
        </div>
        <div class="d-flex align-items-center">
          <label class="form-label me-2 mb-0 small">Show</label>
          <select class="form-select form-select-sm d-inline-block w-auto">
            <option>5</option>
            <option>10</option>
            <option>25</option>
          </select>
          <label class="form-label ms-2 mb-0 small">entries</label>
        </div>
        <div>
          <input type="search" class="form-control form-control-sm" placeholder="Search...">
        </div>
      </div>

      <table class="table table-bordered table-sm">
        <thead class="table-light">
          <tr>
            <th>Username</th>
            <th>Registered</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <div class="mt-3 d-flex justify-content-between align-items-center">
        <div class="small text-muted">
           ${paginationInfo}
        </div>
        <nav>
          <ul class="pagination pagination-sm justify-content-end mb-0">
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
// Sponsored Tab (table of sponsored users)
function buildUserSponsoredTab(user) {
  const defaultSponsoredInfo = {
    data: [
        { username: 'GGUILD02', fullName: 'USER TWO', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
        { username: 'GGUILD03', fullName: 'USER THREE', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
        { username: 'GGUILD04', fullName: 'USER FOUR', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
        { username: 'GGUILD05', fullName: 'USER FIVE', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
        { username: 'GGUILD06', fullName: 'USER SIX', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
    ],
    totalEntries: 21,
    showingFrom: 1,
    showingTo: 10
  };

  const sponsoredInfo = user?.sponsored && user.sponsored.data ? user.sponsored : defaultSponsoredInfo;
  const { data: sponsored, totalEntries, showingFrom, showingTo } = sponsoredInfo;

  const rows = sponsored.map(s => `
    <tr>
        <td>${s.username}</td>
        <td>${s.fullName}</td>
        <td>${s.registered}</td>
        <td>${s.package}</td>
        <td>${s.uplineId}</td>
    </tr>
  `).join('');

  const paginationInfo = `Showing ${showingFrom} to ${showingTo} of ${totalEntries} entries`;

  return `
    <div class="tab-pane fade" id="uv-sponsored" role="tabpanel" aria-labelledby="uv-tab-sponsored">
        <div class="mb-3 d-flex justify-content-between align-items-center">
            <div>
                <button class="btn btn-sm btn-outline-secondary">Copy</button>
                <button class="btn btn-sm btn-outline-secondary">CSV</button>
                <button class="btn btn-sm btn-outline-secondary">Excel</button>
                <button class="btn btn-sm btn-outline-secondary">PDF</button>
                <button class="btn btn-sm btn-outline-secondary">Print</button>
            </div>
            <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0 small">Show</label>
                <select class="form-select form-select-sm d-inline-block w-auto">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                <label class="form-label ms-2 mb-0 small">entries</label>
            </div>
            <div>
                <input type="search" class="form-control form-control-sm" placeholder="Search...">
            </div>
        </div>
        <table class="table table-bordered table-sm">
            <thead class="table-light">
                <tr>
                    <th>Username</th>
                    <th>Full Name</th>
                    <th>Registered</th>
                    <th>Package</th>
                    <th>Upline ID</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        <div class="mt-3 d-flex justify-content-between align-items-center">
            <div class="small text-muted">
                ${paginationInfo}
            </div>
            <nav>
                <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>`;
}

function buildUserBinaryDownlinesTab(user) {
  const defaultDownlinesInfo = {
    data: [
      { level: 1, username: 'GGUILD02', fullName: 'USER TWO', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
      { level: 1, username: 'GGUILD03', fullName: 'USER THREE', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
      { level: 2, username: 'GGUILD04', fullName: 'USER FOUR', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD02' },
      { level: 2, username: 'GGUILD05', fullName: 'USER FIVE', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD02' },
      { level: 2, username: 'GGUILD06', fullName: 'USER SIX', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD03' },
    ],
    totalEntries: 21,
    showingFrom: 1,
    showingTo: 10
  };

  const downlinesInfo = user?.binaryDownlines && user.binaryDownlines.data ? user.binaryDownlines : defaultDownlinesInfo;
  const { data: downlines, totalEntries, showingFrom, showingTo } = downlinesInfo;

  const rows = downlines.map(d => `
    <tr>
        <td>${d.level}</td>
        <td>${d.username}</td>
        <td>${d.fullName}</td>
        <td>${d.registered}</td>
        <td>${d.package}</td>
        <td>${d.uplineId}</td>
    </tr>
  `).join('');

  const paginationInfo = `Showing ${showingFrom} to ${showingTo} of ${totalEntries} entries`;

  return `
    <div class="tab-pane fade" id="uv-binary-downlines" role="tabpanel" aria-labelledby="uv-tab-binary-downlines">
        <div class="mb-3 d-flex justify-content-between align-items-center">
            <div>
                <button class="btn btn-sm btn-outline-secondary">Copy</button>
                <button class="btn btn-sm btn-outline-secondary">CSV</button>
                <button class="btn btn-sm btn-outline-secondary">Excel</button>
                <button class="btn btn-sm btn-outline-secondary">PDF</button>
                <button class="btn btn-sm btn-outline-secondary">Print</button>
            </div>
            <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0 small">Show</label>
                <select class="form-select form-select-sm d-inline-block w-auto">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                <label class="form-label ms-2 mb-0 small">entries</label>
            </div>
            <div>
                <input type="search" class="form-control form-control-sm" placeholder="Search...">
            </div>
        </div>
        <table class="table table-bordered table-sm">
            <thead class="table-light">
                <tr>
                    <th>SQ#</th>
                    <th>USERNAME</th>
                    <th>FULL NAME</th>
                    <th>REGISTERED</th>
                    <th>PACKAGE</th>
                    <th>UPLINE ID</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        <div class="mt-3 d-flex justify-content-between align-items-center">
            <div class="small text-muted">
                ${paginationInfo}
            </div>
            <nav>
                <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>`;
}

function buildUserBinaryUplinesTab(user) {
  return `
    <div class="tab-pane fade" id="uv-binary-uplines" role="tabpanel" aria-labelledby="uv-tab-binary-uplines">
        <div class="mb-3 d-flex justify-content-between align-items-center">
            <div>
                <button class="btn btn-sm btn-outline-secondary">Copy</button>
                <button class="btn btn-sm btn-outline-secondary">CSV</button>
                <button class="btn btn-sm btn-outline-secondary">Excel</button>
                <button class="btn btn-sm btn-outline-secondary">PDF</button>
                <button class="btn btn-sm btn-outline-secondary">Print</button>
            </div>
            <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0 small">Show</label>
                <select class="form-select form-select-sm d-inline-block w-auto">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                <label class="form-label ms-2 mb-0 small">entries</label>
            </div>
            <div>
                <input type="search" class="form-control form-control-sm" placeholder="Search...">
            </div>
        </div>
        <table class="table table-bordered table-sm">
            <thead class="table-light">
                <tr>
                    <th>LEVEL</th>
                    <th>USERNAME</th>
                    <th>FULL NAME</th>
                    <th>REGISTERED</th>
                    <th>PACKAGE</th>
                    <th>UPLINE ID</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6" class="text-center">No data available in table</td>
                </tr>
            </tbody>
        </table>
        <div class="mt-3 d-flex justify-content-between align-items-center">
            <div class="small text-muted">
                Showing 0 to 0 of 0 entries
            </div>
            <nav>
                <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item disabled"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>`;
}

function buildUserUnilevelDownlinesTab(user) {
  const defaultDownlinesInfo = {
    data: [
      { level: 1, username: 'GGUILD02', fullName: 'USER TWO', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD01' },
      { level: 2, username: 'GGUILD04', fullName: 'USER FOUR', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD02' },
      { level: 2, username: 'GGUILD05', fullName: 'USER FIVE', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD02' },
      { level: 3, username: 'GGUILD07', fullName: 'USER SEVEN', registered: '2025-01-31 00:00:00', package: 'PLATINUM', uplineId: 'GGUILD04' },
    ],
    totalEntries: 4,
    showingFrom: 1,
    showingTo: 10
  };

  const downlinesInfo = user?.unilevelDownlines && user.unilevelDownlines.data ? user.unilevelDownlines : defaultDownlinesInfo;
  const { data: downlines, totalEntries, showingFrom, showingTo } = downlinesInfo;

  const rows = downlines.map(d => `
    <tr>
        <td>${d.level}</td>
        <td>${d.username}</td>
        <td>${d.fullName}</td>
        <td>${d.registered}</td>
        <td>${d.package}</td>
        <td>${d.uplineId}</td>
    </tr>
  `).join('');

  const paginationInfo = `Showing ${showingFrom} to ${Math.min(showingTo, totalEntries)} of ${totalEntries} entries`;

  return `
    <div class="tab-pane fade" id="uv-unilevel-downlines" role="tabpanel" aria-labelledby="uv-tab-unilevel-downlines">
        <div class="mb-3 d-flex justify-content-between align-items-center">
            <div>
                <button class="btn btn-sm btn-outline-secondary">Copy</button>
                <button class="btn btn-sm btn-outline-secondary">CSV</button>
                <button class="btn btn-sm btn-outline-secondary">Excel</button>
                <button class="btn btn-sm btn-outline-secondary">PDF</button>
                <button class="btn btn-sm btn-outline-secondary">Print</button>
            </div>
            <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0 small">Show</label>
                <select class="form-select form-select-sm d-inline-block w-auto">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                <label class="form-label ms-2 mb-0 small">entries</label>
            </div>
            <div>
                <input type="search" class="form-control form-control-sm" placeholder="Search...">
            </div>
        </div>
        <table class="table table-bordered table-sm">
            <thead class="table-light">
                <tr>
                    <th>LEVEL</th>
                    <th>USERNAME</th>
                    <th>FULL NAME</th>
                    <th>REGISTERED</th>
                    <th>PACKAGE</th>
                    <th>UPLINE ID</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        <div class="mt-3 d-flex justify-content-between align-items-center">
            <div class="small text-muted">
                ${paginationInfo}
            </div>
            <nav>
                <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>`;
}

function buildUserUnilevelUplinesTab(user) {
  return `
    <div class="tab-pane fade" id="uv-unilevel-uplines" role="tabpanel" aria-labelledby="uv-tab-unilevel-uplines">
      <div class="mb-3 d-flex justify-content-between align-items-center">
            <div>
                <button class="btn btn-sm btn-outline-secondary">Copy</button>
                <button class="btn btn-sm btn-outline-secondary">CSV</button>
                <button class="btn btn-sm btn-outline-secondary">Excel</button>
                <button class="btn btn-sm btn-outline-secondary">PDF</button>
                <button class="btn btn-sm btn-outline-secondary">Print</button>
            </div>
            <div class="d-flex align-items-center">
                <label class="form-label me-2 mb-0 small">Show</label>
                <select class="form-select form-select-sm d-inline-block w-auto">
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                </select>
                <label class="form-label ms-2 mb-0 small">entries</label>
            </div>
            <div>
                <input type="search" class="form-control form-control-sm" placeholder="Search...">
            </div>
        </div>
        <table class="table table-bordered table-sm">
            <thead class="table-light">
                <tr>
                    <th>LEVEL</th>
                    <th>USERNAME</th>
                    <th>FULL NAME</th>
                    <th>REGISTERED</th>
                    <th>PACKAGE</th>
                    <th>UPLINE ID</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td colspan="6" class="text-center">No data available in table</td>
                </tr>
            </tbody>
        </table>
        <div class="mt-3 d-flex justify-content-between align-items-center">
            <div class="small text-muted">
                Showing 0 to 0 of 0 entries
            </div>
            <nav>
                <ul class="pagination pagination-sm justify-content-end mb-0">
                    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                    <li class="page-item disabled"><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    </div>`;
}

/* Matching Report Modal */

function buildMatchingReportModalHtml(user) {
    const u = user || {};
    const matchingData = [
        { ctrn: '105564', date: '2025-09-01 08:40:46', remarks: 'Hementera, Jonah[JonaHhementera01]<br>TYPE:GOLD<br>SKU:GOLD<br>AMOUNT:10,500.00, BV:30.00', dba: '30.00', dbb: '0.00', ea: '68800.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105614', date: '2025-09-01 09:42:10', remarks: 'Tampipi, Arcel[Arcel02]<br>TYPE:SILVER<br>SKU:SILVER<br>AMOUNT:3,500.00, BV:10.00', dba: '10.00', dbb: '0.00', ea: '68810.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105665', date: '2025-09-01 09:45:30', remarks: 'Orbita, Mary Christine[Marychristine]<br>TYPE:SILVER<br>SKU:SILVER<br>AMOUNT:3,500.00, BV:10.00', dba: '10.00', dbb: '0.00', ea: '68820.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105717', date: '2025-09-01 09:49:25', remarks: 'Orbita, Ginaline[Ginaline01]<br>TYPE:SILVER<br>SKU:SILVER<br>AMOUNT:3,500.00, BV:10.00', dba: '10.00', dbb: '0.00', ea: '68830.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105748', date: '2025-09-01 10:05:45', remarks: 'Cornia, Precious Grace[Preciousgrace02]<br>TYPE:GOLD<br>SKU:GOLD<br>AMOUNT:10,500.00, BV:30.00', dba: '30.00', dbb: '0.00', ea: '68860.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' }
    ];

    return `
    <div class="modal fade" id="matchingReportModal" tabindex="-1" aria-labelledby="matchingReportModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="matchingReportModalLabel">Matching Report</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                <i class="fas fa-times"></i>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row bg-primary text-white p-3 rounded mb-3">
                <div class="col-md-4"><strong>Configure Report</strong></div>
                <div class="col-md-4 text-center"><strong>September 2025</strong></div>
                <div class="col-md-4 text-end"><strong>Account: GRINDERS, GUILD[GGUILD01]</strong></div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="bg-primary text-white p-3 rounded">
                    <h5>Total Matching</h5>
                    <p class="h3">0.00(0)</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="bg-primary text-white p-3 rounded">
                    <h5>Total Flushout</h5>
                    <p class="h3">0.00</p>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Matching Details</h5>
                  <div class="d-flex justify-content-between mb-3">
                    <div>
                      <button class="btn btn-sm btn-outline-secondary">Copy</button>
                      <button class="btn btn-sm btn-outline-secondary">CSV</button>
                      <button class="btn btn-sm btn-outline-secondary">Excel</button>
                      <button class="btn btn-sm btn-outline-secondary">PDF</button>
                      <button class="btn btn-sm btn-outline-secondary">Print</button>
                    </div>
                    <div class="d-flex align-items-center">
                      <select class="form-select form-select-sm me-2" style="width: 150px;">
                        <option value="5">5 entries per page</option>
                      </select>
                      <input type="search" class="form-control form-control-sm" placeholder="Search:">
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>CTR#</th>
                          <th>DATE</th>
                          <th>REMARKS</th>
                          <th>DBA</th>
                          <th>DBB</th>
                          <th>EA</th>
                          <th>EBB</th>
                          <th>PAIR</th>
                          <th>PAID</th>
                          <th>AMT</th>
                          <th>MAX</th>
                          <th>FO</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${matchingData.map(row => `
                          <tr>
                            <td>${row.ctrn}</td>
                            <td>${row.date}</td>
                            <td>${row.remarks}</td>
                            <td>${row.dba}</td>
                            <td>${row.dbb}</td>
                            <td>${row.ea}</td>
                            <td>${row.ebb}</td>
                            <td>${row.pair}</td>
                            <td>${row.paid}</td>
                            <td>${row.amt}</td>
                            <td>${row.max}</td>
                            <td>${row.fo}</td>
                            <td>${row.status}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <small>Showing 1 to 5 of 252 entries</small>
                    <nav>
                      <ul class="pagination">
                        <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">5</a></li>
                        <li class="page-item disabled"><span class="page-link">...</span></li>
                        <li class="page-item"><a class="page-link" href="#">51</a></li>
                        <li class="page-item"><a class="page-link" href="#">»</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showMatchingReportModal(userId) {
    const user = getUserMockById(userId) || { id: userId };
    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    container.querySelector('#matchingReportModal')?.remove();
    container.insertAdjacentHTML('beforeend', buildMatchingReportModalHtml(user));

    const modalEl = container.querySelector('#matchingReportModal');
    let bsModal;
    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        container.querySelector('#matchingReportModal')?.remove();
        document.querySelectorAll('.modal-backdrop').forEach(n=>n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== 'undefined' && modalEl) {
        bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', cleanup, { once: true });
        });
    }
}

(function patchMatchingReportHandler() {
    if (window.__ggv_matching_report_patched) return;
    window.__ggv_matching_report_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-matching-report');
        if (!btn) return;
        ev.preventDefault();
        const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
        if (!uid) return;
        showMatchingReportModal(uid);
    }, false);
})();

/* Personal Sales Report Modal */
function buildPersonalSalesReportModalHtml(user) {
  const u = user || {};
  const salesData = []; // Replace with actual data if available

  return `
<div class="modal fade" id="personalSalesReportModal" tabindex="-1" aria-labelledby="personalSalesReportModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="personalSalesReportModalLabel">Personal Sales Report</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">

          <!-- Top Header Row -->
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="bg-primary text-white p-3 rounded text-center">
                <strong>Configure Report</strong>
              </div>
            </div>
            <div class="col-md-4">
              <div class="bg-primary text-white p-3 rounded text-center">
                <strong>September 2025</strong>
              </div>
            </div>
            <div class="col-md-4">
              <div class="bg-primary text-white p-3 rounded text-center">
                <strong>Account<br>${u.name || 'GRINDERS, GUILD'}[${u.branch || 'GGUILD01'}]</strong>
              </div>
            </div>
          </div>

          <!-- Stats Row -->
          <div class="row mb-3">
            <div class="col-md-4">
              <div class="bg-primary text-white p-3 rounded text-center">
                <h5>Total Sales</h5>
                <p class="h3">0.00</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="bg-primary text-white p-3 rounded text-center">
                <h5>Total Store Sales</h5>
                <p class="h3">0.00</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="bg-primary text-white p-3 rounded text-center">
                <h5>Total Personal Sales</h5>
                <p class="h3">0.00</p>
              </div>
            </div>
          </div>

          <!-- Transaction Table -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Transaction Details</h5>
              <div class="d-flex justify-content-between mb-3">
                <div>
                  <button class="btn btn-sm btn-outline-secondary">Copy</button>
                  <button class="btn btn-sm btn-outline-secondary">CSV</button>
                  <button class="btn btn-sm btn-outline-secondary">Excel</button>
                  <button class="btn btn-sm btn-outline-secondary">PDF</button>
                  <button class="btn btn-sm btn-outline-secondary">Print</button>
                </div>
                <div class="d-flex align-items-center">
                  <select class="form-select form-select-sm me-2" style="width: 150px;">
                    <option value="5">5 entries per page</option>
                  </select>
                  <input type="search" class="form-control form-control-sm" placeholder="Search:">
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>DATE</th>
                      <th>STORE</th>
                      <th>SALES#</th>
                      <th>TYPE</th>
                      <th>USER</th>
                      <th>DETAILS</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${salesData.length ? salesData.map(row => `
                      <tr>
                        <td>${row.date}</td>
                        <td>${row.store}</td>
                        <td>${row.sales}</td>
                        <td>${row.type}</td>
                        <td>${row.user}</td>
                        <td>${row.details}</td>
                        <td>${row.amount}</td>
                      </tr>
                    `).join('') : `
                      <tr><td colspan="7" class="text-center">No data available in table</td></tr>
                    `}
                  </tbody>
                </table>
              </div>

              <div class="d-flex justify-content-between align-items-center mt-3">
                <small>Showing 0 to 0 of 0 entries</small>
                <nav>
                  <ul class="pagination mb-0">
                    <li class="page-item disabled"><a class="page-link">«</a></li>
                    <li class="page-item active"><a class="page-link">1</a></li>
                    <li class="page-item"><a class="page-link">2</a></li>
                    <li class="page-item"><a class="page-link">3</a></li>
                    <li class="page-item"><a class="page-link">4</a></li>
                    <li class="page-item"><a class="page-link">5</a></li>
                    <li class="page-item disabled"><span class="page-link">...</span></li>
                    <li class="page-item"><a class="page-link">10</a></li>
                    <li class="page-item"><a class="page-link">»</a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function showPersonalSalesReportModal(userId) {
  const user = getUserMockById(userId) || { id: userId };
  let container = document.getElementById('ggvStoreModalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ggvStoreModalContainer';
    document.body.appendChild(container);
  }

  container.querySelector('#personalSalesReportModal')?.remove();
  container.insertAdjacentHTML('beforeend', buildPersonalSalesReportModalHtml(user));

  const modalEl = container.querySelector('#personalSalesReportModal');
  let bsModal;

  function cleanup() {
    try { if (bsModal) bsModal.dispose(); } catch (e) {}
    container.querySelector('#personalSalesReportModal')?.remove();
    document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
    document.body.classList.remove('modal-open');
  }

  if (typeof bootstrap !== 'undefined' && modalEl) {
    bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
    bsModal.show();
  } else if (modalEl) {
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    if (!document.querySelector('.modal-backdrop')) {
      const bd = document.createElement('div');
      bd.className = 'modal-backdrop fade show';
      document.body.appendChild(bd);
      document.body.classList.add('modal-open');
    }
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });
  }
}

(function patchPersonalSalesReportHandler() {
  if (window.__ggv_personal_sales_report_patched) return;
  window.__ggv_personal_sales_report_patched = true;

  document.addEventListener('click', function (ev) {
    const btn = ev.target.closest('.btn-personal-sales-report');
    if (!btn) return;

    ev.preventDefault();
    const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
    if (!uid) return;

    showPersonalSalesReportModal(uid); // This must be defined
  }, false);
})();

/* Group Sales Report Modal */
function buildGroupSalesReportModalHtml(user) {
  const u = user || {};

  // Personal Sales Data
  const personalSalesData = [
    { date: '2025-09-01 09:24:13', store: 'MS - Zone 1 Poblacion Digos City - Doreen Del Rosa[BUSINESS HUB]', sales: 'PS2964', type: 'PERSONAL', user: 'Gabrillo, Rubilyn[Rubz03]', details: 'SILVER*3', amount: '10,500.00' },
    { date: '2025-09-01 11:08:25', store: 'MS - Brgy 37, San Jose, Tacloban City - AILEEN MOD[BUSINESS HUB]', sales: 'PS2965', type: 'PERSONAL', user: 'ADSUARA, ROMELYN[HERA01]', details: 'SILVER*2<br>GOLD*1', amount: '17,500.00' },
    { date: '2025-09-01 11:39:14', store: 'Depot - Davao Del Norte [MEGA CENTER]', sales: 'PS2966', type: 'PERSONAL', user: 'Gumia, Maria Razul[razul01]', details: 'SGGUARD*2', amount: '4,560.00' },
    { date: '2025-09-01 12:39:08', store: 'Depot - Davao Del Norte [MEGA CENTER]', sales: 'PS2967', type: 'PERSONAL', user: 'ISIDRO, NELSON[Nelson01]', details: 'GOLD*1', amount: '10,500.00' },
    { date: '2025-09-01 13:28:36', store: 'Depot - Davao Del Norte [MEGA CENTER]', sales: 'PS2968', type: 'PERSONAL', user: 'Peñaloga, Angiely[angiely01]', details: 'SGGUARD*4', amount: '9,120.00' }
  ];

  // Store Sales Data
  const storeSalesData = [
    { date: '2025-09-01 16:47:51', store: 'GRINDERPH[Country Hub]', sales: 'PS2983', type: 'PERSONAL', user: 'Lecias, Irene[prettywoman]', details: 'CDSILVER*10<br>CDGOLD*10', amount: '0.00' },
    { date: '2025-09-01 16:50:46', store: 'GRINDERPH[Country Hub]', sales: 'PS2984', type: 'PERSONAL', user: 'Quimson, Romar[Romar01]', details: 'CDGOLD*4<br>FSPLATINUM*2', amount: '0.00' },
    { date: '2025-09-03 21:14:23', store: 'GRINDERPH[Country Hub]', sales: 'PS3082', type: 'PERSONAL', user: 'VARIACION, MONCHITO[monvariacion01]', details: 'FSGOLD*70<br>FSPLATINUM*5', amount: '0.00' },
    { date: '2025-09-05 17:54:09', store: 'GRINDERPH[Country Hub]', sales: 'PS3138', type: 'PERSONAL', user: 'Bandilla, Edmon[marband]', details: 'FSPLATINUM*7', amount: '0.00' }
  ];

  return `
<div class="modal fade" id="groupSalesReportModal" tabindex="-1" aria-labelledby="groupSalesReportModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-fullscreen">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="groupSalesReportModalLabel">Group Sales Report</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">

          <!-- Top Cards Row -->
          <div class="row mb-3">
            <div class="col-md-3">
              <div class="bg-info text-white p-3 rounded text-center">
                <small>Configure Report</small>
                <h5><strong>September 2025</strong></h5>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bg-info text-white p-3 rounded text-center">
                <small>Account</small>
                <h5><strong>${u.name || 'GRINDERS, GUILD'}[${u.branch || 'GGUILD01'}]</strong></h5>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bg-info text-white p-3 rounded text-center">
                <small>Total Sales</small>
                <h5><strong>2,187,060.00</strong></h5>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bg-info text-white p-3 rounded text-center">
                <small>Total Store Sales</small>
                <h5><strong>0.00 (0.00 POINTS)</strong></h5>
              </div>
            </div>
          </div>

          <!-- Personal Sales Row -->
          <div class="row mb-3">
            <div class="col-md-12">
              <div class="bg-info text-white p-3 rounded text-center">
                <small>Total Personal Sales</small>
                <h5><strong>2,187,060.00 (66,750.00 POINTS)</strong></h5>
              </div>
            </div>
          </div>

          <!-- Personal Sales Table -->
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Personal Sales</h5>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>DATE</th>
                      <th>STORE</th>
                      <th>SALES#</th>
                      <th>TYPE</th>
                      <th>USER</th>
                      <th>DETAILS</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${personalSalesData.map(row => `
                      <tr>
                        <td>${row.date}</td>
                        <td>${row.store}</td>
                        <td>${row.sales}</td>
                        <td>${row.type}</td>
                        <td>${row.user}</td>
                        <td>${row.details}</td>
                        <td>${row.amount}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Store Sales Table -->
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Store Sales</h5>
              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>DATE</th>
                      <th>STORE</th>
                      <th>SALES#</th>
                      <th>TYPE</th>
                      <th>USER</th>
                      <th>DETAILS</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${storeSalesData.map(row => `
                      <tr>
                        <td>${row.date}</td>
                        <td>${row.store}</td>
                        <td>${row.sales}</td>
                        <td>${row.type}</td>
                        <td>${row.user}</td>
                        <td>${row.details}</td>
                        <td>${row.amount}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function showGroupSalesReportModal(userId) {
  const user = getUserMockById(userId) || { id: userId };
  let container = document.getElementById('ggvStoreModalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ggvStoreModalContainer';
    document.body.appendChild(container);
  }

  container.querySelector('#groupSalesReportModal')?.remove();
  container.insertAdjacentHTML('beforeend', buildGroupSalesReportModalHtml(user));

  const modalEl = container.querySelector('#groupSalesReportModal');
  let bsModal;
  function cleanup() {
    try { if (bsModal) bsModal.dispose(); } catch (e) {}
    container.querySelector('#groupSalesReportModal')?.remove();
    document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
    document.body.classList.remove('modal-open');
  }

  if (typeof bootstrap !== 'undefined' && modalEl) {
    bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
    bsModal.show();
  } else if (modalEl) {
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    if (!document.querySelector('.modal-backdrop')) {
      const bd = document.createElement('div');
      bd.className = 'modal-backdrop fade show';
      document.body.appendChild(bd);
      document.body.classList.add('modal-open');
    }
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });
  }
}

(function patchGroupSalesReportHandler() {
  if (window.__ggv_group_sales_report_patched) return;
  window.__ggv_group_sales_report_patched = true;

  document.addEventListener('click', function (ev) {
    const btn = ev.target.closest('.btn-group-sales-report');
    if (!btn) return;
    ev.preventDefault();
    const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
    if (!uid) return;
    showGroupSalesReportModal(uid);
  }, false);
})();

/* Delete Withdrawal PIN Modal */
function buildDeleteWithdrawalPinModalHtml(userId) {
  return `
<div class="modal fade" id="deleteWithdrawalPinModal" tabindex="-1" aria-labelledby="deleteWithdrawalPinModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center p-4">
      <div class="modal-body">
        <div class="mb-3">
          <i class="fas fa-info-circle fa-3x text-primary"></i>
        </div>
        <h4 class="mb-2">Remove PIN?</h4>
        <p>Are you sure you want to remove this account's PIN? User will be able to set a new Withdrawal PIN after this transaction is completed.</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-danger" id="confirmRemovePinBtn">Remove PIN!</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function showDeleteWithdrawalPinModal(userId) {
  let container = document.getElementById('ggvStoreModalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ggvStoreModalContainer';
    document.body.appendChild(container);
  }

  container.querySelector('#deleteWithdrawalPinModal')?.remove();
  container.insertAdjacentHTML('beforeend', buildDeleteWithdrawalPinModalHtml(userId));

  const modalEl = container.querySelector('#deleteWithdrawalPinModal');
  let bsModal;

  function cleanup() {
    try { if (bsModal) bsModal.dispose(); } catch (e) {}
    container.querySelector('#deleteWithdrawalPinModal')?.remove();
    document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
    document.body.classList.remove('modal-open');
  }

  if (typeof bootstrap !== 'undefined' && modalEl) {
    bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
    bsModal.show();
  } else if (modalEl) {
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    if (!document.querySelector('.modal-backdrop')) {
      const bd = document.createElement('div');
      bd.className = 'modal-backdrop fade show';
      document.body.appendChild(bd);
      document.body.classList.add('modal-open');
    }
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });
  }

  const confirmBtn = container.querySelector('#confirmRemovePinBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      alert(`PIN removed for user ${userId} (mock).`);
      if (bsModal) bsModal.hide();
      else cleanup();
    }, { once: true });
  }
}

(function patchDeleteWithdrawalPinHandler() {
  if (window.__ggv_delete_pin_patched) return;
  window.__ggv_delete_pin_patched = true;

  document.addEventListener('click', function (ev) {
    const btn = ev.target.closest('.btn-delete-pin');
    if (!btn) return;

    ev.preventDefault();
    const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
    if (!uid) return;

    showDeleteWithdrawalPinModal(uid);
  }, false);
})();

/* Resend Welcome Message Modal */
function buildResendWelcomeMessageModalHtml(contact, fullname) {
  return `
<div class="modal fade" id="resendWelcomeMessageModal" tabindex="-1" aria-labelledby="resendWelcomeMessageModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center p-4">
      <div class="modal-body">
        <div class="mb-3">
          <i class="fas fa-info-circle fa-3x text-primary"></i>
        </div>
        <h4 class="mb-2">Send SMS?</h4>
        <p>This will send SMS to the registered number of ${fullname || 'the account'} [${contact || 'No contact'}].</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-info text-white" id="confirmResendWelcomeBtn">Send!</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function showResendWelcomeMessageModal(userId) {
  const user = getUserMockById(userId) || {};
  const contact = user.contact || '';
  const fullname = user.name || '';

  let container = document.getElementById('ggvStoreModalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ggvStoreModalContainer';
    document.body.appendChild(container);
  }

  container.querySelector('#resendWelcomeMessageModal')?.remove();
  container.insertAdjacentHTML('beforeend', buildResendWelcomeMessageModalHtml(contact, fullname));

  const modalEl = container.querySelector('#resendWelcomeMessageModal');
  let bsModal;

  function cleanup() {
    try { if (bsModal) bsModal.dispose(); } catch (e) {}
    container.querySelector('#resendWelcomeMessageModal')?.remove();
    document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
    document.body.classList.remove('modal-open');
  }

  if (typeof bootstrap !== 'undefined' && modalEl) {
    bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
    bsModal.show();
  } else if (modalEl) {
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    if (!document.querySelector('.modal-backdrop')) {
      const bd = document.createElement('div');
      bd.className = 'modal-backdrop fade show';
      document.body.appendChild(bd);
      document.body.classList.add('modal-open');
    }
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });
  }

  const confirmBtn = container.querySelector('#confirmResendWelcomeBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      alert(`Welcome message sent to ${contact} (mock).`);
      if (bsModal) bsModal.hide();
      else cleanup();
    }, { once: true });
  }
}

(function patchResendWelcomeMessageHandler() {
  if (window.__ggv_resend_welcome_patched) return;
  window.__ggv_resend_welcome_patched = true;

  document.addEventListener('click', function (ev) {
    const btn = ev.target.closest('.btn-resend-welcome');
    if (!btn) return;

    ev.preventDefault();
    const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
    if (!uid) return;

    showResendWelcomeMessageModal(uid);
  }, false);
})();

/* Send Credentials Modal */
function buildSendCredentialsModalHtml(contact, fullname) {
  return `
<div class="modal fade" id="sendCredentialsModal" tabindex="-1" aria-labelledby="sendCredentialsModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center p-4">
      <div class="modal-body">
        <div class="mb-3">
          <i class="fas fa-info-circle fa-3x text-primary"></i>
        </div>
        <h4 class="mb-2">Send SMS?</h4>
        <p>This will send SMS to the registered number of ${fullname || 'the account'} [${contact || 'No contact'}].</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-info text-white" id="confirmSendCredentialsBtn">Send!</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function showSendCredentialsModal(userId) {
  const user = getUserMockById(userId) || {};
  const contact = user.contact || '';
  const fullname = user.name || '';

  let container = document.getElementById('ggvStoreModalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ggvStoreModalContainer';
    document.body.appendChild(container);
  }

  container.querySelector('#sendCredentialsModal')?.remove();
  container.insertAdjacentHTML('beforeend', buildSendCredentialsModalHtml(contact, fullname));

  const modalEl = container.querySelector('#sendCredentialsModal');
  let bsModal;

  function cleanup() {
    try { if (bsModal) bsModal.dispose(); } catch (e) {}
    container.querySelector('#sendCredentialsModal')?.remove();
    document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
    document.body.classList.remove('modal-open');
  }

  if (typeof bootstrap !== 'undefined' && modalEl) {
    bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
    bsModal.show();
  } else if (modalEl) {
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    if (!document.querySelector('.modal-backdrop')) {
      const bd = document.createElement('div');
      bd.className = 'modal-backdrop fade show';
      document.body.appendChild(bd);
      document.body.classList.add('modal-open');
    }
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });
  }

  const confirmBtn = container.querySelector('#confirmSendCredentialsBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      alert(`Credentials sent to ${contact} (mock).`);
      if (bsModal) bsModal.hide();
      else cleanup();
    }, { once: true });
  }
}

(function patchSendCredentialsHandler() {
  if (window.__ggv_send_credentials_patched) return;
  window.__ggv_send_credentials_patched = true;

  document.addEventListener('click', function (ev) {
    const btn = ev.target.closest('.btn-send-credentials');
    if (!btn) return;

    ev.preventDefault();
    const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
    if (!uid) return;

    showSendCredentialsModal(uid);
  }, false);
})();

/* Update Account Modal */
function buildUpdateAccountModalHtml(userId) {
  return `
<div class="modal fade" id="updateAccountModal" tabindex="-1" aria-labelledby="updateAccountModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content text-center p-4">
      <div class="modal-body">
        <div class="mb-3">
          <i class="fas fa-info-circle fa-3x text-primary"></i>
        </div>
        <h4 class="mb-2">Update Account?</h4>
        <p>Are you sure you want to update accounts?</p>
        <div class="d-flex justify-content-center gap-3 mt-4">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" class="btn btn-warning text-white" id="confirmUpdateAccountBtn">Yes Set Update Account!</button>
        </div>
      </div>
    </div>
  </div>
</div>
  `;
}

function showUpdateAccountModal(userId) {
  let container = document.getElementById('ggvStoreModalContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'ggvStoreModalContainer';
    document.body.appendChild(container);
  }

  container.querySelector('#updateAccountModal')?.remove();
  container.insertAdjacentHTML('beforeend', buildUpdateAccountModalHtml(userId));

  const modalEl = container.querySelector('#updateAccountModal');
  let bsModal;

  function cleanup() {
    try { if (bsModal) bsModal.dispose(); } catch (e) {}
    container.querySelector('#updateAccountModal')?.remove();
    document.querySelectorAll('.modal-backdrop').forEach(n => n.remove());
    document.body.classList.remove('modal-open');
  }

  if (typeof bootstrap !== 'undefined' && modalEl) {
    bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
    modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
    bsModal.show();
  } else if (modalEl) {
    modalEl.classList.add('show');
    modalEl.style.display = 'block';
    if (!document.querySelector('.modal-backdrop')) {
      const bd = document.createElement('div');
      bd.className = 'modal-backdrop fade show';
      document.body.appendChild(bd);
      document.body.classList.add('modal-open');
    }
    modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
      btn.addEventListener('click', cleanup, { once: true });
    });
  }

  const confirmBtn = container.querySelector('#confirmUpdateAccountBtn');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      alert(`Account updated for user ${userId} (mock).`);
      if (bsModal) bsModal.hide();
      else cleanup();
    }, { once: true });
  }
}

(function patchUpdateAccountHandler() {
  if (window.__ggv_update_account_patched) return;
  window.__ggv_update_account_patched = true;

  document.addEventListener('click', function (ev) {
    const btn = ev.target.closest('.btn-update-account');
    if (!btn) return;

    ev.preventDefault();
    const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
    if (!uid) return;

    showUpdateAccountModal(uid);
  }, false);
})();


function showUserViewModal(userId) {
    const user = getUserMockById(userId) || { id: userId };
    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    // remove any existing view modal and insert the new one
    container.querySelector('#userViewModal')?.remove();
    container.insertAdjacentHTML('beforeend', buildUserViewModalHtml(user));

    const modalEl = container.querySelector('#userViewModal');
    let bsModal;
    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        container.querySelector('#userViewModal')?.remove();
        document.querySelectorAll('.modal-backdrop').forEach(n=>n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== 'undefined' && modalEl) {
        bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', cleanup, { once: true });
        });
    }

    const saveBtn = container.querySelector('#userViewSaveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', function () {
            // mock save - update name/contact in mock and close
            const inputs = container.querySelectorAll('#userViewModal .modal-body input');
            const payload = {};
            inputs.forEach(inp => payload[inp.getAttribute('name')||inp.placeholder||inp.className] = inp.value);
            console.log('Mock save user', userId, payload);
            if (bsModal) bsModal.hide(); else cleanup();
            alert('User updated (mock): ' + userId);
        }, { once: true });
    }
}

function buildMatchingReportModalHtml(user) {
    const u = user || {};
    const matchingData = [
        { ctrn: '105564', date: '2025-09-01 08:40:46', remarks: 'Hementera, Jonah[JonaHhementera01]<br>TYPE:GOLD<br>SKU:GOLD<br>AMOUNT:10,500.00, BV:30.00', dba: '30.00', dbb: '0.00', ea: '68800.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105614', date: '2025-09-01 09:42:10', remarks: 'Tampipi, Arcel[Arcel02]<br>TYPE:SILVER<br>SKU:SILVER<br>AMOUNT:3,500.00, BV:10.00', dba: '10.00', dbb: '0.00', ea: '68810.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105665', date: '2025-09-01 09:45:30', remarks: 'Orbita, Mary Christine[Marychristine]<br>TYPE:SILVER<br>SKU:SILVER<br>AMOUNT:3,500.00, BV:10.00', dba: '10.00', dbb: '0.00', ea: '68820.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105717', date: '2025-09-01 09:49:25', remarks: 'Orbita, Ginaline[Ginaline01]<br>TYPE:SILVER<br>SKU:SILVER<br>AMOUNT:3,500.00, BV:10.00', dba: '10.00', dbb: '0.00', ea: '68830.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' },
        { ctrn: '105748', date: '2025-09-01 10:05:45', remarks: 'Cornia, Precious Grace[Preciousgrace02]<br>TYPE:GOLD<br>SKU:GOLD<br>AMOUNT:10,500.00, BV:30.00', dba: '30.00', dbb: '0.00', ea: '68860.00', ebb: '0.00', pair: '0.00', paid: '0.00', amt: '0.00', max: '100', fo: '0', status: '' }
    ];

    return `
    <div class="modal fade" id="matchingReportModal" tabindex="-1" aria-labelledby="matchingReportModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="matchingReportModalLabel">Matching Report</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row bg-primary text-white p-3 rounded mb-3">
                <div class="col-md-4"><strong>Configure Report</strong></div>
                <div class="col-md-4 text-center"><strong>September 2025</strong></div>
                <div class="col-md-4 text-end"><strong>Account: GRINDERS, GUILD[GGUILD01]</strong></div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <div class="bg-primary text-white p-3 rounded">
                    <h5>Total Matching</h5>
                    <p class="h3">0.00(0)</p>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="bg-primary text-white p-3 rounded">
                    <h5>Total Flushout</h5>
                    <p class="h3">0.00</p>
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Matching Details</h5>
                  <div class="d-flex justify-content-between mb-3">
                    <div>
                      <button class="btn btn-sm btn-outline-secondary">Copy</button>
                      <button class="btn btn-sm btn-outline-secondary">CSV</button>
                      <button class="btn btn-sm btn-outline-secondary">Excel</button>
                      <button class="btn btn-sm btn-outline-secondary">PDF</button>
                      <button class="btn btn-sm btn-outline-secondary">Print</button>
                    </div>
                    <div class="d-flex align-items-center">
                      <select class="form-select form-select-sm me-2" style="width: 150px;">
                        <option value="5">5 entries per page</option>
                      </select>
                      <input type="search" class="form-control form-control-sm" placeholder="Search:">
                    </div>
                  </div>
                  <div class="table-responsive">
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>CTR#</th>
                          <th>DATE</th>
                          <th>REMARKS</th>
                          <th>DBA</th>
                          <th>DBB</th>
                          <th>EA</th>
                          <th>EBB</th>
                          <th>PAIR</th>
                          <th>PAID</th>
                          <th>AMT</th>
                          <th>MAX</th>
                          <th>FO</th>
                          <th>STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${matchingData.map(row => `
                          <tr>
                            <td>${row.ctrn}</td>
                            <td>${row.date}</td>
                            <td>${row.remarks}</td>
                            <td>${row.dba}</td>
                            <td>${row.dbb}</td>
                            <td>${row.ea}</td>
                            <td>${row.ebb}</td>
                            <td>${row.pair}</td>
                            <td>${row.paid}</td>
                            <td>${row.amt}</td>
                            <td>${row.max}</td>
                            <td>${row.fo}</td>
                            <td>${row.status}</td>
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-3">
                    <small>Showing 1 to 5 of 252 entries</small>
                    <nav>
                      <ul class="pagination">
                        <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">4</a></li>
                        <li class="page-item"><a class="page-link" href="#">5</a></li>
                        <li class="page-item disabled"><span class="page-link">...</span></li>
                        <li class="page-item"><a class="page-link" href="#">51</a></li>
                        <li class="page-item"><a class="page-link" href="#">»</a></li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    `;
}

function showMatchingReportModal(userId) {
    const user = getUserMockById(userId) || { id: userId };
    let container = document.getElementById('ggvStoreModalContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'ggvStoreModalContainer';
        document.body.appendChild(container);
    }

    container.querySelector('#matchingReportModal')?.remove();
    container.insertAdjacentHTML('beforeend', buildMatchingReportModalHtml(user));

    const modalEl = container.querySelector('#matchingReportModal');
    let bsModal;
    function cleanup() {
        try { if (bsModal) bsModal.dispose(); } catch (e) {}
        container.querySelector('#matchingReportModal')?.remove();
        document.querySelectorAll('.modal-backdrop').forEach(n=>n.remove());
        document.body.classList.remove('modal-open');
    }

    if (typeof bootstrap !== 'undefined' && modalEl) {
        bsModal = new bootstrap.Modal(modalEl, { backdrop: 'static' });
        modalEl.addEventListener('hidden.bs.modal', cleanup, { once: true });
        bsModal.show();
    } else if (modalEl) {
        modalEl.classList.add('show');
        modalEl.style.display = 'block';
        if (!document.querySelector('.modal-backdrop')) {
            const bd = document.createElement('div');
            bd.className = 'modal-backdrop fade show';
            document.body.appendChild(bd);
            document.body.classList.add('modal-open');
        }
        modalEl.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
            btn.addEventListener('click', cleanup, { once: true });
        });
    }
}

(function patchMatchingReportHandler() {
    if (window.__ggv_matching_report_patched) return;
    window.__ggv_matching_report_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-matching-report');
        if (!btn) return;
        ev.preventDefault();
        const uid = btn.dataset.userId || btn.getAttribute('data-user-id');
        if (!uid) return;
        showMatchingReportModal(uid);
    }, false);
})();


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
    <h4 class="fw-bold text-dark mb-3">Store Manager</h4>

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
            {id: 1, name: "GRINDSKEDGLOBAL", user: "GRIND GRINDSKED", reg: "25-06-2020 09:06:04", type: "admin", status: "Active"},
            {id: 1000, name: "GRINDSKED", user: "GRIND GRINDSKED", reg: "25-06-2020 09:06:04", type: "Country Hub", status: "Active"},
            {id: 1014, name: "DIANA BAMACA", user: "DIANA BAMACA", reg: "25-06-2020 09:06:04", type: "Branch", status: "Inactive"},
            {id: 1015, name: "Vigan-Arangcasi Bantay City - Joanne Agatep", user: "joanna agatep", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA", status: "Active"},
            {id: 1016, name: "Vigan-Cabaroan Bantay City - Jaeilyn Doronal", user: "jaeilyn doronal", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA", status: "Active"},
            {id: 1017, name: "Vigan-Cabaroan Bantay City - Princess Uy", user: "princess Uy", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA", status: "Active"},
            {id: 1025, name: "Vigan-Poblacion Norte City - Ma. Janicy Simaco", user: "MA. JANICY SIMACO", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA", status: "Inactive"},
            {id: 1026, name: "Vigan-Poblacion Norte City - Nickoel Valico", user: "Nickoel Valico", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA", status: "Active"},
            {id: 1027, name: "Vigan-Mira Hills City - Jaeilyn Caragao", user: "Jaeilyn Caragao", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA", status: "Active"},
            {id: 1028, name: "Vigan-Mira Hills City - Vangie Sordan", user: "Vangie Sordan", reg: "25-06-2020 09:06:04", type: "BUSINESS AREA", status: "Active"}
          ].map(entry => `
            <tr>
              <td>${entry.id}</td>
              <td>${entry.name}</td>
              <td>${entry.user}</td>
              <td>${entry.reg}</td>
              <td>${entry.type}</td>
              <td>
                <button
                    class="btn btn-sm ${entry.status === 'Active' ? 'btn-success' : 'btn-danger'} status-toggle"
                    data-id="${entry.id}"
                    data-state="${entry.status === 'Active' ? 'active' : 'inactive'}"
                    aria-pressed="${entry.status === 'Active'}"
                >
                    ${entry.status === 'Active' ? 'Active' : 'Deactivate'}
                </button>
              </td>
              <td>
                <div class="btn-group" role="group" aria-label="row-tools">
                    <button class="btn btn-info btn-sm btn-view-stock" data-id="${entry.id}" title="View Stocklist Details">
                        <i class="fa fa-search"></i>
                    </button>
                    <button class="btn btn-info btn-sm btn-view-users" data-id="${entry.id}" title="View Users">
                        <i class="fa fa-users"></i>
                    </button>
                    <button class="btn btn-info btn-sm btn-change-pass" data-id="${entry.id}" title="Change Password">
                        <i class="fa fa-key"></i>
                    </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

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
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-light btn-sm fw-bold rounded">Copy</button>
        <button class="btn btn-light btn-sm fw-bold rounded">CSV</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Excel</button>
        <button class="btn btn-light btn-sm fw-bold rounded">PDF</button>
        <button class="btn btn-light btn-sm fw-bold rounded">Print</button>
      </div>
    </div>

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
              id: 1, // Added ID for data retrieval
              reg: "2023-07-10 10:25:25",
              pos: "System, Administrator Main",
              name: "superadmin_main",
              user: "superadmin_main",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },
            {
              id: 2, // Added ID for data retrieval
              reg: "2023-07-10 10:25:25",
              pos: "Logistics",
              name: "Tomas, Kenneth G",
              user: "kenneth",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },
             {
              id: 3, // Added ID for data retrieval
              reg: "2005-09-19 22:05:28",
              pos: "FINANCE",
              name: "Tomas, Kenneth G",
              user: "gposktofinance",
              pass: "Abc@123",
              store: "GPOSDEBSLOC1DUB, GPOSDEBSLOC1DUB"
            },

          ].map(entry => `
            <tr>
              <td>${entry.reg}</td>
              <td>${entry.pos}</td>
              <td>${entry.name}</td>
              <td>${entry.user}</td>
              <td>${entry.pass}</td>
              <td>${entry.store}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Action Buttons">
                  <button class="btn btn-info btn-sm btn-view-stock py-1"
                    data-user-id="${entry.id}"
                    title="View Details">
                    <i class="fa fa-search"></i>
                  </button>

                  <a href="https://secure.onegrindersguild.com/instalogin.php?loghash=314e5a53d4d2459241745fdd6eebf887" target="_blank" class="btn btn-success btn-sm py-1" title="Insta LOGIN">
                    <i class="fa fa-user"></i>
                  </a>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

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
    
    <!-- 🔷 Top Metrics Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3 col-sm-6">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Configure Report</div>
          <div class="fw-bold fs-5">2025</div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Total Sales</div>
          <div class="fw-bold fs-5">66,087,440.00</div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Total Store Sales</div>
          <div class="fw-bold fs-5">54,053,160.00</div>
        </div>
      </div>
      <div class="col-md-3 col-sm-6">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Total Personal Sales</div>
          <div class="fw-bold fs-5">12,034,280.00</div>
        </div>
      </div>
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
              <td>
                <button class="btn btn-sm btn-primary" onclick="loadAdminModule('daily-sales')">
                  <i class="fas fa-eye me-1"></i>View Details
                </button>
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
    
    <!-- 🔷 Top Metrics Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-6 col-lg-3">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Configure Report</div>
          <div class="fw-bold fs-5">September 2025</div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Total Sales</div>
          <div class="fw-bold fs-5">3,845,850.00</div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Total Store Sales</div>
          <div class="fw-bold fs-5">2,914,230.00</div>
        </div>
      </div>
      <div class="col-md-6 col-lg-3">
        <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
          <div class="small">Total Personal Sales</div>
          <div class="fw-bold fs-5">931,620.00</div>
        </div>
      </div>
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
              <td class="d-flex gap-1">
                <button class="btn btn-sm btn-info btn-view-daily-detail" 
                  data-entry='${JSON.stringify(entry)}' 
                  title="View">
                  <i class="fas fa-search"></i>
                </button>
                <button class="btn btn-sm btn-warning" title="Print"><i class="fas fa-print"></i></button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- 📈 Footer with Proper Pagination -->
    <div class="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mt-3">
      <small class="text-muted">Showing 1 to 3 of 30 entries</small>
      <nav>
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><span class="page-link">...</span></li>
          <li class="page-item"><a class="page-link" href="#">10</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </nav>
    </div>
  </div>
  `;
}

function buildDailySalesDetailModalHtml(entry) {
  const e = entry || {};

  // Example dataset (expand as needed)
  const detailsData = [
    { date: "2025-09-01 11:48:34", store: "DAVAO BRANCH [Branch]", sales: "S5771", type: "STORE", user: "MS - Brgy 37, San Jose, Tacloban City - AILEEN MOD", details: "SILVER*2", amount: "6,900.00" },
    { date: "2025-09-01 11:51:10", store: "DAVAO BRANCH [Branch]", sales: "S5772", type: "STORE", user: "Depot - Davao Del Sur", details: "SILVER*3", amount: "10,500.00" },
    { date: "2025-09-01 13:05:46", store: "DAVAO BRANCH [Branch]", sales: "S5773", type: "STORE", user: "MS - Brgy Luvimin Kidapawan City - Ronel Jay Paroj", details: "SILVER*2, GOLD*7", amount: "79,350.00" },
    { date: "2025-09-01 14:02:21", store: "DAVAO BRANCH [Branch]", sales: "PS2969", type: "PERSONAL", user: "Licera, Rosel [SUCCESSFUL101]", details: "SILVER*1", amount: "3,500.00" },
    { date: "2025-09-01 14:37:58", store: "DAVAO BRANCH [Branch]", sales: "PS2970", type: "PERSONAL", user: "Gapasin, Annie [anne01]", details: "SILVER*1", amount: "3,500.00" },
    { date: "2025-09-01 15:24:32", store: "DAVAO BRANCH [Branch]", sales: "S5774", type: "STORE", user: "Depot - Davao Del Norte", details: "PLATINUM*1", amount: "35,000.00" },
    { date: "2025-09-01 15:42:13", store: "DAVAO BRANCH [Branch]", sales: "PS2975", type: "PERSONAL", user: "Llido, Hilario [Abundance57]", details: "Synbiotic+ MM*1", amount: "2,280.00" },
    { date: "2025-09-01 15:51:55", store: "DAVAO BRANCH [Branch]", sales: "PS2976", type: "PERSONAL", user: "Burlas, Pablito [Pablito1962]", details: "Synbiotic+ MM*1, SCGUARD*1", amount: "4,560.00" },
    { date: "2025-09-01 16:04:35", store: "GRINDERPH [Country Hub]", sales: "PS2977", type: "PERSONAL", user: "Quimson, Romar [Romar01]", details: "SCGUARD*1", amount: "2,280.00" },
    { date: "2025-09-01 16:14:45", store: "DAVAO BRANCH [Branch]", sales: "S5775", type: "STORE", user: "MS - Brgy Mulig Toril - Welhemina Juano", details: "Synbiotic+ MM*1", amount: "2,090.00" },
    { date: "2025-09-01 16:25:10", store: "DAVAO BRANCH [Branch]", sales: "PS2978", type: "PERSONAL", user: "Dela Cruz, Maricel [maricel_dc]", details: "SILVER*1, GOLD*2", amount: "9,800.00" },
    { date: "2025-09-01 16:40:22", store: "DAVAO BRANCH [Branch]", sales: "S5776", type: "STORE", user: "MS - Brgy San Roque, Panabo City - Jona Mae", details: "PLATINUM*1, Synbiotic+ MM*2", amount: "39,180.00" },
    { date: "2025-09-01 17:05:33", store: "GRINDERPH [Country Hub]", sales: "PS2979", type: "PERSONAL", user: "Torres, Alvin [alvintorres]", details: "SCGUARD*2", amount: "4,560.00" },
    { date: "2025-09-01 17:18:47", store: "DAVAO BRANCH [Branch]", sales: "PS2980", type: "PERSONAL", user: "Reyes, Carla [carla_r]", details: "Synbiotic+ MM*1, SILVER*1", amount: "5,590.00" },
    { date: "2025-09-01 17:30:12", store: "DAVAO BRANCH [Branch]", sales: "S5777", type: "STORE", user: "Depot - Compostela Valley", details: "GOLD*5", amount: "17,500.00" }


  ];

  // Pagination setup
  const pageSize = 10;
  const totalPages = Math.ceil(detailsData.length / pageSize);
  const firstPageRows = detailsData.slice(0, pageSize);

  return `
  <div class="modal fade" id="dailySalesDetailModal" tabindex="-1" aria-labelledby="dailySalesDetailModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title">Daily Sales - ${e.date || "N/A"}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="container-fluid">

            <!-- 🔷 Summary Cards -->
            <div class="row g-3 mb-4">
              <div class="col-md-6 col-lg-3">
                <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
                  <div class="small">Coverage</div>
                  <div class="fw-bold fs-5">${e.date || ''}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
                  <div class="small">Total Sales</div>
                  <div class="fw-bold fs-5">${e.total || '0.00'}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
                  <div class="small">Total Store Sales</div>
                  <div class="fw-bold fs-5">${e.store || '0.00'}</div>
                </div>
              </div>
              <div class="col-md-6 col-lg-3">
                <div class="p-3 text-white rounded" style="background-color:#03A9F4;">
                  <div class="small">Total Personal Sales</div>
                  <div class="fw-bold fs-5">${e.personal || '0.00'}</div>
                </div>
              </div>
            </div>

            <!-- 🔹 Table Controls -->
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

            <!-- 🔹 Details Table -->
            <div class="table-responsive">
              <table class="table table-bordered table-striped">
                <thead class="table-light text-dark fw-bold">
                  <tr>
                    <th>DATE</th>
                    <th>STORE</th>
                    <th>SALES#</th>
                    <th>TYPE</th>
                    <th>USER</th>
                    <th>DETAILS</th>
                    <th>AMOUNT</th>
                  </tr>
                </thead>
                <tbody id="daily-sales-tbody">
                  ${firstPageRows.map(d => `
                    <tr>
                      <td>${d.date}</td>
                      <td>${d.store}</td>
                      <td>${d.sales}</td>
                      <td>${d.type}</td>
                      <td>${d.user}</td>
                      <td>${d.details}</td>
                      <td>${d.amount}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <!-- 🔹 Pagination -->
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small>Showing 1 to ${firstPageRows.length} of ${detailsData.length} entries</small>
              <nav>
                <ul class="pagination pagination-sm mb-0" id="daily-sales-pagination">
                  <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                  ${Array.from({length: totalPages}, (_, i) => `
                    <li class="page-item ${i === 0 ? 'active' : ''}">
                      <a class="page-link" href="#" data-page="${i+1}">${i+1}</a>
                    </li>
                  `).join('')}
                  <li class="page-item ${totalPages === 1 ? 'disabled' : ''}">
                    <a class="page-link" href="#">»</a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-light btn-sm" onclick="window.print()">
            <i class="fa fa-print me-1"></i> Print
          </button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
            <i class="fa fa-times me-1"></i> Close
          </button>
        </div>

        <style>
          /* Print button green style */
          .btn-success.btn-sm i {
            font-size: 0.85rem;
          }

          /* Print modal contents only */
          @media print {
            body * {
              visibility: hidden;
            }
            #salesDetailModal,
            #salesDetailModal * {
              visibility: visible;
            }
            #salesDetailModal {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
            .modal-footer {
              display: none; /* hide buttons when printing */
            }
          }
        </style>

        <script>
          function printModalContent(modalId) {
            const modal = document.getElementById(modalId);
            if (!modal) return;
            window.print();
          }
        </script>


      </div>
    </div>
  </div>`;
}

(function patchViewDailyDetailHandler() {
    if (window.__ggv_daily_detail_modal_patched) return;
    window.__ggv_daily_detail_modal_patched = true;

    document.addEventListener('click', function (ev) {
        const btn = ev.target.closest('.btn-view-daily-detail');
        if (!btn) return;

        ev.preventDefault();

        let entry = {};
        try {
            entry = JSON.parse(btn.dataset.entry || '{}');
        } catch (e) {
            console.warn("Invalid entry JSON:", e);
        }

        // Remove existing modal if open
        const existingModal = document.getElementById('dailySalesDetailModal');
        if (existingModal) existingModal.remove();

        // Build & show modal
        if (typeof buildDailySalesDetailModalHtml === 'function') {
            document.body.insertAdjacentHTML('beforeend', buildDailySalesDetailModalHtml(entry));
            new bootstrap.Modal(document.getElementById('dailySalesDetailModal')).show();
        }

        ev.stopImmediatePropagation();
    }, true);
})();


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
  const items = [
    {
      id: 1, code: 'SILVER', desc: 'PAID SILVER SGGUARD*1.00', cat: 'Entry Package', unit: 'PACK',
      srp: '3500.00', dp: '3500.00', drp: '0.00', center: '3500.00', mobile: '3450.00',
      info: 'DR:500.00<br>MATCHING:10.00<br>UNBV:0.00<br>MLMBV:0.00<br>CBV:0.00<br>IDR:0.00',
      components: 'WITH COMPONENTS'
    },
    {
      id: 2, code: 'GOLD', desc: 'PAID GOLD SGGUARD*3.00', cat: 'Entry Package', unit: 'PACK',
      srp: '10500.00', dp: '10500.00', drp: '0.00', center: '10500.00', mobile: '10350.00',
      info: 'DR:1500.00<br>MATCHING:30.00<br>UNBV:0.00<br>MLMBV:0.00<br>CBV:0.00<br>IDR:0.00',
      components: 'WITH COMPONENTS'
    },
    {
      id: 3, code: 'PLATINUM', desc: 'PAID PLATINUM SGGUARD*10.00', cat: 'Entry Package', unit: 'PACK',
      srp: '35000.00', dp: '35000.00', drp: '0.00', center: '35000.00', mobile: '34500.00',
      info: 'DR:5000.00<br>MATCHING:100.00<br>UNBV:0.00<br>MLMBV:0.00<br>CBV:0.00<br>IDR:0.00',
      components: 'WITH COMPONENTS'
    },
    {
      id: 4, code: 'CDSILVER', desc: 'CD SILVER', cat: 'Entry Package', unit: 'PACK',
      srp: '0.00', dp: '0.00', drp: '0.00', center: '0.00', mobile: '0.00',
      info: 'DR:0.00<br>MATCHING:0.00<br>UNBV:0.00<br>MLMBV:0.00<br>CBV:0.00<br>IDR:0.00',
      components: 'WITH COMPONENTS'
    }
  ];

  return `
    <div class="card shadow-sm">
      <div class="card-header bg-light d-flex justify-content-between align-items-center">
        <div>
          <label class="me-2">Show</label>
          <select class="form-select form-select-sm d-inline-block" style="width: 80px;">
            <option selected>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span class="ms-2">entries</span>
        </div>
        <input type="text" class="form-control form-control-sm" placeholder="Search..." style="width: 200px;">
      </div>

      <div class="table-responsive">
        <table class="table table-sm table-bordered table-hover align-middle mb-0" style="font-size: 0.85rem;">
          <thead class="table-light">
            <tr>
              <th>ITEM#</th>
              <th>CODE</th>
              <th>DESC</th>
              <th>CAT</th>
              <th>UNIT</th>
              <th>SRP</th>
              <th>DP</th>
              <th>DRP</th>
              <th>CENTER</th>
              <th>MOBILE</th>
              <th>ITEM INFO</th>
              <th>COMPONENTS</th>
            </tr>
          </thead>
          <tbody>
            ${items.map(item => `
              <tr>
                <td>${item.id}</td>
                <td>${item.code}</td>
                <td>${item.desc}</td>
                <td>${item.cat}</td>
                <td>${item.unit}</td>
                <td>${item.srp}</td>
                <td>${item.dp}</td>
                <td>${item.drp}</td>
                <td>${item.center}</td>
                <td>${item.mobile}</td>
                <td>${item.info}</td>
                <td>
                  <span class="badge ${item.components === 'WITH COMPONENTS' ? 'bg-success' : 'bg-danger'}">
                  ${item.components}
                  </span>
                  </td>
                <td>
                  <button 
                    class="btn btn-sm btn-info view-item-btn" 
                    title="View" 
                    style="margin-bottom: 5px;" 
                    data-item='${JSON.stringify(item)}'>
                        <i class="fas fa-search"></i>
                </button>
                  <button 
                    class="btn btn-sm btn-warning text-white item-logs-btn" 
                    title="Edit" 
                    data-code="${item.code}" 
                    data-desc="${item.desc}">
                      <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="card-footer d-flex justify-content-between align-items-center">
        <small class="text-muted">Showing 1 to ${items.length} of ${items.length} entries</small>
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

function buildItemDetailsModalHtml(item) {
  // Helper function to generate <option> tags for a <select> dropdown
  const generateOptions = (options, selectedValue) => {
    return options.map(opt => 
      `<option value="${opt}" ${opt === selectedValue ? 'selected' : ''}>${opt}</option>`
    ).join('');
  };

  // A comprehensive default object to prevent errors
  const safeItem = {
    code: '', name: '', description: '', unitCode: 'Select Unit', category: 'Select Category',
    packageType: 'Select Package Type', packagePayment: 'Select Status', binaryStatus: 'ACTIVE',
    cost: '0.00', srp: '0.00', dp: '0.00', branchPrice: '0.00', provincialPrice: '0.00',
    megaDepotPrice: '0.00', hubPrice: '0.00', unilevelPV: '0.00', psrBV: '0.00',
    binaryBV: '0.00', directReferral: '0.00', drp: '0.00', drpConversion: '0.00',
    updateVouchers: 0, componentCost: '0.00', componentValueDP: '0.00', componentValueSRP: '0.00',
    itemComponents: [],
  };

  return `
    <div class="modal fade" id="itemDetailsModal" tabindex="-1" aria-labelledby="itemDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-scrollable" style="max-width: 600px; max-height: 90vh; margin-top: 4.5rem;">
        <div class="modal-content">
          <div class="modal-header py-2"><h5 class="modal-title" id="itemDetailsModalLabel">View item details</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
          <div class="modal-body">
            
            <div class="item-details-form">
              <div class="row"><div class="col-md-3 text-muted">Code</div><div class="col-md-9 mb-3"><input type="text" class="form-control form-control-sm" value="${safeItem.code}"></div></div>
              <div class="row"><div class="col-md-3 text-muted">Name</div><div class="col-md-9 mb-3"><input type="text" class="form-control form-control-sm" value="${safeItem.name}"></div></div>
              <div class="row"><div class="col-md-3 text-muted">Description</div><div class="col-md-9 mb-3"><input type="text" class="form-control form-control-sm" value="${safeItem.description}"></div></div>
              
              <div class="row"><div class="col-md-3 text-muted">Unit Code</div><div class="col-md-9 mb-3"><select class="form-select form-select-sm">${generateOptions(['Select Unit', 'PC', 'BOX', 'PACK', 'GRAMS', 'KILO', 'OZ', 'LITER', 'ML', 'BOTTLE'], safeItem.unitCode)}</select></div></div>
              <div class="row"><div class="col-md-3 text-muted">Category</div><div class="col-md-9 mb-3"><select class="form-select form-select-sm">${generateOptions(['Select Category', 'Product Lines - Product Lines', 'Entry Package - Entry Package', 'Store/Stockist Packages - Store/Stockist Packages', 'Loose Product Packages - Loose Product Packages', 'Items - Items for Inventory'], safeItem.category)}</select></div></div>
              <div class="row"><div class="col-md-3 text-muted">Package Type</div><div class="col-md-9 mb-3"><select class="form-select form-select-sm">${generateOptions(['Select Package Type', 'SHADOW', 'SILVER', 'GOLD', 'PLATINUM'], safeItem.packageType)}</select></div></div>
              <div class="row"><div class="col-md-3 text-muted">Package Payment</div><div class="col-md-9 mb-3"><select class="form-select form-select-sm">${generateOptions(['Select Status', 'PAID', 'FREE'], safeItem.packagePayment)}</select></div></div>
              <div class="row"><div class="col-md-3 text-muted">Package Binary Status</div><div class="col-md-9 mb-3"><select class="form-select form-select-sm">${generateOptions(['ACTIVE', 'INACTIVE'], safeItem.binaryStatus)}</select></div></div>

              <div class="row"><div class="col-md-3 text-muted">COST</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.cost}"><small class="text-muted">For ADMINS viewing and reporting purposes only.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">SRP</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.srp}"><small class="text-muted">Price for non-members and customers of Franchisee.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">DP</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.dp}"><small class="text-muted">Price for members & franchisee.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">Branch Price</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.branchPrice}"></div></div>
              <div class="row"><div class="col-md-3 text-muted">PROVINCIAL Price</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.provincialPrice}"></div></div>
              <div class="row"><div class="col-md-3 text-muted">MEGA DEPOT Price</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.megaDepotPrice}"></div></div>
              <div class="row"><div class="col-md-3 text-muted">HUB Price</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.hubPrice}"></div></div>
              <div class="row"><div class="col-md-3 text-muted">Unilevel PV</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.unilevelPV}"><small class="text-muted">Used to record points of members sales.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">Personal Sales Rebates BV</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.psrBV}"><small class="text-muted">Personal Rebates PV of user.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">Binary BV</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.binaryBV}"><small class="text-muted">Used for the matching bonus.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">Direct Referral</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.directReferral}"><small class="text-muted">Cash Amount as Direct Referral.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">DRP</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.drp}"><small class="text-muted">Product Referral QTY.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">DRP Conversion Value</div><div class="col-md-9 mb-3"><input type="number" step="0.01" class="form-control form-control-sm" value="${safeItem.drpConversion}"><small class="text-muted">Amount equivalent when Voucher is converted to E-Wallet Credits.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">UPDATE ALL VOUCHERS</div><div class="col-md-9 mb-3"><input type="number" class="form-control form-control-sm" value="${safeItem.updateVouchers}"><small class="text-muted">Set value to 1 to update all vouchers, or 0 for new vouchers only.</small></div></div>

              <div class="row"><div class="col-md-3 text-muted">Component COST</div><div class="col-md-9 mb-3"><input type="text" readonly class="form-control-plaintext form-control-sm" value="${safeItem.componentCost}"><small class="text-muted">Automatically computed based on total cost of components.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">Component VALUE DP</div><div class="col-md-9 mb-3"><input type="text" readonly class="form-control-plaintext form-control-sm" value="${safeItem.componentValueDP}"><small class="text-muted">Automatically computed based on total DP of components.</small></div></div>
              <div class="row"><div class="col-md-3 text-muted">Component VALUE SRP</div><div class="col-md-9 mb-3"><input type="text" readonly class="form-control-plaintext form-control-sm" value="${safeItem.componentValueSRP}"><small class="text-muted">Automatically computed based on total SRP of components.</small></div></div>
            </div>

            <div class="alert alert-info mt-4" role="alert" style="font-size: 0.85rem;">
              <strong>Note:</strong> Packages & Components are the same. Available Items/Components are based on the category. (e.g., Category 'Package' can add components from 'Product Lines').
            </div>
            
            <hr>

            <div class="d-grid gap-2 mb-3">
                <button id="updateChangesBtn" class="btn btn-primary"><i class="fas fa-save me-1"></i> Update Changes Above</button>
                <button id="reloadDataBtn" class="btn btn-success"><i class="fas fa-sync-alt me-1"></i> Reload Data</button>
            </div>

            <div class="d-flex gap-2 mb-3">
              ${(safeItem.itemComponents && safeItem.itemComponents.length > 0) ? `
                <span class="btn btn-success w-50 fw-bold status-components-btn" data-state="has-components">
                  <i class="fas fa-check me-1"></i> HAS COMPONENTS
                </span>
              ` : `
                <span class="btn btn-secondary w-50 fw-bold status-components-btn" data-state="no-components">
                  <i class="fas fa-times me-1"></i> NO COMPONENTS
                </span>
              `}
              
              ${safeItem.isAvailable ? `
                <span class="btn btn-success w-50 fw-bold status-available-btn"><i class="fas fa-check me-1"></i> AVAILABLE</span>
              ` : `
                <span class="btn btn-danger w-50 fw-bold status-available-btn"><i class="fas fa-times me-1"></i> UNAVAILABLE</span>
              `}
            </div>

            <h6 class="mb-2 mt-4 text-primary">Components</h6>

            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <select class="form-select form-select-sm d-inline-block" style="width: 80px;">
                        <option selected>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    <span class="ms-1 small text-muted">entries per page</span>
                </div>
                <div class="d-flex align-items-center">
                    <label class="form-label me-2 mb-0 small text-muted">Search:</label>
                    <input type="search" class="form-control form-control-sm" style="width: 200px;">
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered table-sm align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>CODE <i class="fas fa-sort text-muted"></i></th>
                            <th>NAME <i class="fas fa-sort text-muted"></i></th>
                            <th>CATEGORY <i class="fas fa-sort text-muted"></i></th>
                            <th>UNIT <i class="fas fa-sort text-muted"></i></th>
                            <th>QTY <i class="fas fa-sort text-muted"></i></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${(safeItem.itemComponents && safeItem.itemComponents.length > 0) ? safeItem.itemComponents.map(comp => `
                            <tr>
                                <td>${comp.code}</td>
                                <td>${comp.name}</td>
                                <td>${comp.category}</td>
                                <td>${comp.unit}</td>
                                <td><input type="number" class="form-control form-control-sm" value="${comp.qty}" style="width: 80px;"></td>
                                <td class="text-center">
                                    <button class="btn btn-danger btn-sm delete-component-btn" title="Delete Component"><i class="fas fa-trash"></i></button>
                                </td>
                            </tr>
                        `).join('') : `<tr><td colspan="6" class="text-center">No components found.</td></tr>`}
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-2">
                <small class="text-muted">Showing 1 to 1 of 1 entry</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                        <li class="page-item active"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">»</a></li>
                    </ul>
                </nav>
            </div>

            <div class="d-grid mt-3">
                <button id="addComponentBtn" class="btn btn-info text-white"><i class="fas fa-plus me-1"></i> Add Component</button>
            </div>

            <h6 class="mt-4 text-center text-muted">Portal Product Availability</h6>
            <div class="text-center portal-availability">
                <div class="btn-group my-1 shadow-sm"><button class="btn btn-success btn-sm">MEMBER ON</button><button class="btn btn-dark btn-sm availability-toggle">TURN OFF</button></div>
                <div class="btn-group my-1 shadow-sm"><button class="btn btn-success btn-sm">EWALLET ON</button><button class="btn btn-dark btn-sm availability-toggle">TURN OFF</button></div>
                <div class="btn-group my-1 shadow-sm"><button class="btn btn-dark btn-sm availability-toggle">TURN ON</button><button class="btn btn-danger btn-sm">GC OFF</button></div>
                <div class="btn-group my-1 shadow-sm"><button class="btn btn-success btn-sm">BRANCH ON</button><button class="btn btn-dark btn-sm availability-toggle">TURN OFF</button></div>
                <div class="btn-group my-1 shadow-sm"><button class="btn btn-success btn-sm">STOCKIST ON</button><button class="btn btn-dark btn-sm availability-toggle">TURN OFF</button></div>
            </div>
          </div>

          <div class="modal-footer justify-content-between py-2">
            <button id="prevBtn" type="button" class="btn btn-primary"><i class="fas fa-arrow-left me-1"></i> PREVIOUS</button>
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal"><i class="fas fa-times me-1"></i> Close</button>
            <button id="nextBtn" type="button" class="btn btn-primary">NEXT <i class="fas fa-arrow-right ms-1"></i></button>
          </div>

          <style>.item-details-form .row { display: flex; align-items: baseline; }</style>

        </div>
      </div>
    </div>
  `;
}

(function patchViewItemDetailsHandler() {
    // Prevent this patcher from running more than once
    if (window.__ggv_item_details_modal_patched) return;
    window.__ggv_item_details_modal_patched = true;

    document.addEventListener('click', function (ev) {
        // Find the trigger button
        const btn = ev.target.closest('.view-item-btn');
        if (!btn) return;

        ev.preventDefault();

        // Safely parse the item data from the button's data-item attribute
        let itemData = {};
        try {
            itemData = JSON.parse(btn.dataset.item || '{}');
        } catch (e) {
            console.warn("Invalid item JSON:", e);
        }

        // Remove any existing modal from the DOM to avoid conflicts
        const existingModal = document.getElementById('itemDetailsModal');
        if (existingModal) existingModal.remove();

        // Build the new modal HTML and add it to the page
        if (typeof buildItemDetailsModalHtml === 'function') {
            document.body.insertAdjacentHTML('beforeend', buildItemDetailsModalHtml(itemData));
            
            // Create a new Bootstrap modal instance and show it
            const modalElement = document.getElementById('itemDetailsModal');
            if (modalElement) {
                new bootstrap.Modal(modalElement).show();

                // Optional: clean up the DOM after the modal is hidden
                modalElement.addEventListener('hidden.bs.modal', () => {
                    modalElement.remove();
                });
            }
        }
    });
})();

function buildAddComponentModalHtml(item = {}) {
  // Use the item's name to create a dynamic title, with a fallback.
  const modalTitle = `Select Component for ${item.name || 'PAID SILVER'}`;

  // Mock data based on the provided image
  const mockData = [
    { code: 'BPGUARD', category: 'Product Lines', name: 'Synbiotic+Gutguard BPGUARD*1.00', unit: 'PACK' },
    { code: 'CDGOLD', category: 'Entry Package', name: 'CD GOLD', unit: 'PACK' },
    { code: 'CDPLATINUM', category: 'Entry Package', name: 'CD PLATINUM', unit: 'PACK' },
    { code: 'CDSILVER', category: 'Entry Package', name: 'CD SILVER', unit: 'PACK' },
    { code: 'CREDITS', category: 'Product Lines', name: 'CASH-IN', unit: 'PC' },
    { code: 'FSGOLD', category: 'Entry Package', name: 'FS GOLD', unit: 'PACK' },
    { code: 'FSPLATINUM', category: 'Entry Package', name: 'FS PLATINUM', unit: 'PACK' },
    { code: 'FSSILVER', category: 'Entry Package', name: 'FS SILVER', unit: 'PACK' },
    { code: 'GOLD', category: 'Entry Package', name: 'PAID GOLD', unit: 'PACK' },
    { code: 'ITEM_SGGURGUARD', category: 'Items', name: 'ITEM_SGGURGUARD', unit: 'BOTTLE' },
  ];

  // Generate table rows from mock data
  const tableRows = mockData.map(data => `
    <tr>
      <td>${data.code}</td>
      <td>${data.category}</td>
      <td>${data.name}</td>
      <td>${data.unit}</td>
      <td class="text-center">
        <button class="btn btn-primary btn-sm rounded-circle">
          <i class="fas fa-plus"></i>
        </button>
      </td>
    </tr>
  `).join('');


  return `
    <div class="modal fade" id="addComponentModal" tabindex="-1" aria-labelledby="addComponentModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl" style="max-width: 900px; max-height: 90vh; margin-top: 4.5rem;">
        <div class="modal-content">
          <div class="modal-header py-2">
            <h5 class="modal-title" id="addComponentModalLabel">${modalTitle}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
            <!-- Top Controls: Entries per page and Search -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <select class="form-select form-select-sm d-inline-block" style="width: auto;">
                  <option selected>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </select>
                <span class="ms-1">entries per page</span>
              </div>
              <div class="d-flex align-items-center">
                <label for="componentSearch" class="form-label me-2 mb-0">Search:</label>
                <input type="search" id="componentSearch" class="form-control form-control-sm" style="width: 250px;">
              </div>
            </div>

            <!-- Components Table -->
            <div class="table-responsive">
              <table class="table table-bordered table-striped table-hover">
                <thead class="table-light">
                  <tr>
                    <th>CODE <i class="fas fa-sort"></i></th>
                    <th>CATEGORY <i class="fas fa-sort"></i></th>
                    <th>NAME <i class="fas fa-sort"></i></th>
                    <th>UNIT <i class="fas fa-sort"></i></th>
                    <th class="text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </div>

            <!-- Bottom Controls: Entry count and Pagination -->
            <div class="d-flex justify-content-between align-items-center mt-3">
              <small class="text-muted">Showing 1 to 10 of 14 entries</small>
              <nav>
                <ul class="pagination pagination-sm mb-0">
                  <li class="page-item disabled"><a class="page-link" href="#">&laquo;</a></li>
                  <li class="page-item disabled"><a class="page-link" href="#">&lsaquo;</a></li>
                  <li class="page-item active"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">&rsaquo;</a></li>
                  <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
                </ul>
              </nav>
            </div>

          </div>
          <div class="modal-footer py">
             <button type="button" class="btn btn-warning" data-bs-dismiss="modal">
                <i class="fas fa-times me-1"></i> Close
             </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Font Awesome for icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  `;
}

(function patchAddComponentHandler() {
    // 1. A flag to ensure this listener is only attached once.
    if (window.__ggv_add_component_modal_patched) return;
    window.__ggv_add_component_modal_patched = true;

    // 2. A single, delegated event listener for the whole document.
    document.addEventListener('click', function (ev) {
        
        // --- Logic for OPENING the modal ---
        const openBtn = ev.target.closest('#addComponentBtn');
        if (openBtn) {
            ev.preventDefault();

            // Remove any existing modal to avoid duplicates
            const existingModal = document.getElementById('addComponentModal');
            if (existingModal) existingModal.remove();

            // Build the modal's HTML and add it to the page
            if (typeof buildAddComponentModalHtml === 'function') {
                document.body.insertAdjacentHTML('beforeend', buildAddComponentModalHtml());
                
                // Use Bootstrap's JS to create and show the modal
                const modalElement = document.getElementById('addComponentModal');
                if(modalElement) {
                    new bootstrap.Modal(modalElement).show();
                }
            }
            return; // Stop further execution
        }

        // --- Logic for the "Add Selected" button INSIDE the modal ---
        const addSelectedBtn = ev.target.closest('#addSelectedComponentsBtn');
        if (addSelectedBtn) {
            ev.preventDefault();
            
            const modalElement = document.getElementById('addComponentModal');
            if (!modalElement) return;

            // Find all checked checkboxes within the modal's table body
            const selectedCheckboxes = modalElement.querySelectorAll('tbody .form-check-input:checked');
            const selectedItems = Array.from(selectedCheckboxes).map(cb => cb.value);

            if (selectedItems.length > 0) {
                Swal.fire(
                    'Components Selected!',
                    `You selected: ${selectedItems.join(', ')}`,
                    'success'
                );
                // TODO: Add your logic to handle the selected item codes
            } else {
                Swal.fire('No Selection', 'Please select at least one component.', 'warning');
            }

            // Hide the modal after the action
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }
            return; // Stop further execution
        }
    });
})();

function buildItemLogsModal(item) {
  // Use the item's desc and code for a dynamic title
  const modalTitle = `ITEM LOGS : ${item.desc}[${item.code}]`;

  return `
    <div class="modal fade" id="itemLogsModal" tabindex="-1" aria-labelledby="itemLogsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" style="margin-top: 200px;">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="itemLogsModalLabel">${modalTitle}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <select class="form-select form-select-sm d-inline-block" style="width: auto;">
                  <option selected>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span class="ms-1">entries per page</span>
              </div>
              <div class="d-flex align-items-center">
                <label for="logSearch" class="form-label me-2 mb-0">Search:</label>
                <input type="search" id="logSearch" class="form-control form-control-sm" style="width: 250px;">
              </div>
            </div>

            <div class="table-responsive">
                <table class="table table-bordered table-sm">
                    <thead class="table-light">
                        <tr>
                            <th>DATE <i class="fas fa-sort"></i></th>
                            <th>REMARKS <i class="fas fa-sort"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2" class="text-center">No data available in table</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <small class="text-muted">Showing 0 to 0 of 0 entries</small>
                <nav>
                    <ul class="pagination pagination-sm mb-0">
                        <li class="page-item disabled"><a class="page-link" href="#">&laquo;</a></li>
                        <li class="page-item disabled"><a class="page-link" href="#">&lsaquo;</a></li>
                        <li class="page-item disabled"><a class="page-link" href="#">&rsaquo;</a></li>
                        <li class="page-item disabled"><a class="page-link" href="#">&raquo;</a></li>
                    </ul>
                </nav>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal">
                <i class="fas fa-times me-1"></i> Close
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function patchItemDetailsModal() {
    // This uses event delegation, so it only needs to be called once.
    document.body.addEventListener('click', function(event) {
        
        // --- 1. UPDATE CHANGES BUTTON ---
        // Shows a confirmation modal before proceeding.
        if (event.target.closest('#updateChangesBtn')) {
            Swal.fire({
                title: 'Update Details',
                text: "Please double check your inputs if all are correct.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#d33', // A nice red/orange
                cancelButtonColor: '#6c757d', // Bootstrap's secondary color
                confirmButtonText: 'Update Details!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // This is where you would send the data to the server.
                    // For now, we just show a success message.
                    Swal.fire(
                        'Updated!',
                        'Your changes have been saved.',
                        'success'
                    );
                }
            });
            return;
        }
        
        // --- 2. RELOAD DATA BUTTON ---
        // Shows a warning before discarding changes.
        if (event.target.closest('#reloadDataBtn')) {
            Swal.fire({
                title: 'Reload Data?',
                text: "This will discard all unsaved changes. Are you sure?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#28a745', // A nice green
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, reload!',
                cancelButtonText: 'Cancel'
            }).then((result) => {
                if (result.isConfirmed) {
                    // This is where you would re-fetch the original data.
                    // For now, we just show a confirmation message.
                    Swal.fire(
                        'Reloaded!',
                        'The original data has been restored.',
                        'success'
                    );
                }
            });
            return;
        }

        // --- 3. DELETE COMPONENT BUTTON ---
        // (This is the existing logic from before)
        if (event.target.closest('.delete-component-btn')) {
            Swal.fire({
                title: 'Delete Component?',
                text: "Are you sure you want to delete this component?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                confirmButtonText: 'Delete Component!'
            }).then((result) => {
                if (result.isConfirmed) {
                    event.target.closest('tr').remove();
                    Swal.fire('Deleted!', 'The component has been removed.', 'success');
                }
            });
            return;
        }

        // --- Confirmation for AVAILABLE/UNAVAILABLE status ---
        if (event.target.closest('.status-available-btn')) {
            const isAvailable = event.target.closest('.status-available-btn').textContent.includes('AVAILABLE');
            const newStatus = isAvailable ? 'Unavailable' : 'Available';

            Swal.fire({
                title: `Change Status to ${newStatus}?`,
                text: `Are you sure you want to change this item's availability?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: `Yes, make it ${newStatus}`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Status Changed!', `The item is now ${newStatus}.`, 'success');
                    // TODO: API call to update status
                }
            });
            return;
        }

        // --- Confirmation for HAS/NO COMPONENTS status --- //
        if (event.target.closest('.status-components-btn')) {
            const hasComponents = event.target.closest('.status-components-btn').textContent.includes('HAS COMPONENTS');
            const newState = hasComponents ? 'No Components' : 'Has Components';
            Swal.fire({
                title: `Change to ${newState}?`,
                text: `Are you sure you want to change this item's component status?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: `Yes, change to ${newState}`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Status Changed!', `The item now ${newState}.`, 'success');
                    // TODO: API call to update component status
                }
            });
            return;
        }
    });
}
patchItemLogsModal();

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

function getAdminActivationConfigureModal() {
  return `
  <div style="margin-top:90px" class="modal fade" id="reportConfigModal" tabindex="-1" aria-labelledby="reportConfigLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        
        <!-- Header -->
        <div class="modal-header">
          <h5 class="modal-title" id="reportConfigLabel">Report Configuration</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="row g-3">
            <div class="col-md-6">
              <label class="form-label">CTRL# From</label>
              <input type="text" class="form-control" placeholder="Ctrl# From">
            </div>
            <div class="col-md-6">
              <label class="form-label">CTRL# To</label>
              <input type="text" class="form-control" placeholder="Ctrl# To">
            </div>

            <div class="col-md-6">
              <label class="form-label">Date From</label>
              <input type="date" class="form-control">
            </div>
            <div class="col-md-6">
              <label class="form-label">Date To</label>
              <input type="date" class="form-control">
            </div>

            <div class="col-md-6">
              <label class="form-label">CODE</label>
              <input type="text" class="form-control" placeholder="Enter CODE here.">
            </div>
            <div class="col-md-6">
              <label class="form-label">PIN</label>
              <input type="text" class="form-control" placeholder="Enter PIN here.">
            </div>

            <div class="col-12">
              <label class="form-label">Transaction#</label>
              <input type="text" class="form-control" placeholder="Enter Trans# here.">
            </div>
          </div>

          <!-- Checkboxes -->
          <div class="mt-3">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="chkCtrl">
              <label class="form-check-label" for="chkCtrl">Ctrl#</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="chkDate">
              <label class="form-check-label" for="chkDate">Date Used</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="chkCode">
              <label class="form-check-label" for="chkCode">Code/Pin</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="chkTrans">
              <label class="form-check-label" for="chkTrans">Trans#</label>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="modal-footer flex-column">
          <button type="button" class="btn btn-primary w-100 mb-2" onclick="searchCode()">
            🔍 Search Activation Code
          </button>
          <button type="button" class="btn btn-warning w-100" data-bs-dismiss="modal">
            ✖ Close
          </button>
        </div>
      </div>
    </div>
  </div>
  `;
}

function getAdminActivationSearchContent() {
  return `
  <div class="container-fluid bg-white shadow-sm p-4 rounded">
    <!-- 🔷 Header Section -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4 class="fw-bold text-dark mb-0">Activation Code</h4>
      <button onclick="openReportConfigModal()" class="btn btn-primary rounded">
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

function openReportConfigModal() {
  // Remove existing modal if any
  const existingModal = document.getElementById("reportConfigModal");
  if (existingModal) existingModal.remove();

  // Append modal HTML
  document.body.insertAdjacentHTML("beforeend", getAdminActivationConfigureModal());

  // Show modal using Bootstrap
  const modal = new bootstrap.Modal(document.getElementById("reportConfigModal"));
  modal.show();
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
                <button onclick="showPage('account-summary')" class="btn p-0 border-0 rounded-circle d-flex align-items-center justify-content-center"
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
                <button class="btn btn-sm btn-danger" title="Delete Voucher" onclick="confirmDeleteVoucher(${row.id})">
                  <i class="bi bi-trash-fill"></i>
                </button>
                <button class="btn btn-sm btn-warning" title="Void Voucher" onclick="confirmVoidVoucher(${row.id})">
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

function confirmDeleteVoucher(id) {
  const modalHTML = `
    <div id="deleteVoucherModal" class="modal-overlay">
      <div class="modal-box">
        <div class="icon-container danger">
          <i class="fas fa-trash-alt"></i>
        </div>
        <h4 class="modal-title">Delete Voucher</h4>
        <p class="modal-message">
          Are you sure you want to <b>DELETE</b> voucher with ID: <b>${id}</b>?<br>
          This action <span style="color:red;">cannot be undone</span>.
        </p>
        <div class="button-group">
          <button class="btn-continue" onclick="deleteVoucher(${id})">Yes, Delete</button>
          <button class="btn-cancel" onclick="closeDeleteVoucherModal()">Cancel</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("deleteVoucherModal")?.remove();
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  setTimeout(() => {
    document.querySelector("#deleteVoucherModal .modal-box").classList.add("show");
  }, 10);
}

function closeDeleteVoucherModal() {
  const modal = document.getElementById("deleteVoucherModal");
  if (modal) {
    modal.querySelector(".modal-box").classList.remove("show");
    setTimeout(() => modal.remove(), 300);
  }
}

function confirmVoidVoucher(id) {
  const modalHTML = `
    <div id="voidVoucherModal" class="modal-overlay">
      <div class="modal-box">
        <div class="icon-container warning">
          <i class="fas fa-ban"></i>
        </div>
        <h4 class="modal-title">Void Voucher</h4>
        <p class="modal-message">
          Do you want to <b>VOID</b> voucher with ID: <b>${id}</b>?<br>
          Once voided, it will be marked as <span style="color:orange;">Invalid</span>.
        </p>
        <textarea id="voidReason" class="form-control mb-3" rows="3" placeholder="Enter reason for voiding..."></textarea>
        <div class="button-group">
          <button class="btn-continue" onclick="voidVoucher(${id})">Confirm Void</button>
          <button class="btn-cancel" onclick="closeVoidVoucherModal()">Cancel</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("voidVoucherModal")?.remove();
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  setTimeout(() => {
    document.querySelector("#voidVoucherModal .modal-box").classList.add("show");
  }, 10);
}

function closeVoidVoucherModal() {
  const modal = document.getElementById("voidVoucherModal");
  if (modal) {
    modal.querySelector(".modal-box").classList.remove("show");
    setTimeout(() => modal.remove(), 300);
  }
}

function deleteVoucher(id) {
  closeDeleteVoucherModal();
  // FIX: Used backticks `` instead of parentheses () for the alert string.
  alert(`Voucher ${id} deleted successfully!`);
  // TODO: API call + refresh table
}

function voidVoucher(id) {
  const reason = document.getElementById("voidReason")?.value || "No reason provided";
  closeVoidVoucherModal();
  // FIX: Used backticks `` for this alert string as well.
  alert(`Voucher ${id} has been voided.\nReason: ${reason}`);
  // TODO: API call + refresh table
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
                          <button onclick="confirmClaimVoucher(${row.id})" class="btn btn-sm btn-warning text-white">SET TO CLAIMED</button>
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
                  <li class="pag  e-item"><a class="page-link" href="#">»</a></li>
                </ul>
            </nav>
            </div>
        </div>
    `;
}

function confirmClaimVoucher(id) {
  const modalHTML = `
    <div id="claimVoucherModal" class="modal-overlay">
      <div class="modal-box">
        <div class="icon-container success">
          <i class="fas fa-check-circle"></i>
        </div>
        <h4 class="modal-title">Set Voucher to Claimed</h4>
        <p class="modal-message">
          Are you sure you want to mark voucher with ID: <b>${id}</b> as <span style="color:green;">CLAIMED</span>?
        </p>
        <div class="button-group">
          <button class="btn-continue" onclick="claimVoucher(${id})">Yes, Set to Claimed</button>
          <button class="btn-cancel" onclick="closeClaimVoucherModal()">Cancel</button>
        </div>
      </div>
    </div>
  `;

  document.getElementById("claimVoucherModal")?.remove();
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  setTimeout(() => {
    document.querySelector("#claimVoucherModal .modal-box").classList.add("show");
  }, 10);
}

function closeClaimVoucherModal() {
  const modal = document.getElementById("claimVoucherModal");
  if (modal) {
    modal.querySelector(".modal-box").classList.remove("show");
    setTimeout(() => modal.remove(), 300);
  }
}

function claimVoucher(id) {
  closeClaimVoucherModal();
  alert(`Voucher ${id} has been marked as Claimed ✅`);
  // TODO: API call to update status + refresh table
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
