function loadUserPage(pageName) {
  const userPageContainer = document.querySelector("#user-page-container");
  if (!userPageContainer) return;

  // Dashboard and Main Pages
  if (pageName === "dashboard") {
    userPageContainer.innerHTML = getUserDashboardContent();
    console.log(`Loaded Dashboard page`);
    return;
  }

  if (pageName === "codebank") {
    userPageContainer.innerHTML = getCodeBankContent();
    console.log(`Loaded Code Bank page`);
    return;
  }

  // Account Settings
  if (pageName === "user-profile") {
    userPageContainer.innerHTML = getUserProfileContent();
    console.log(`Loaded User Profile page`);
    return;
  }

  if (pageName === "withdrawal-settings") {
    userPageContainer.innerHTML = getWithdrawalSettingsContent();
    console.log(`Loaded Withdrawal Settings page`);
    return;
  }

  if (pageName === "change-password") {
    userPageContainer.innerHTML = getChangePasswordContent();
    console.log(`Loaded Change Password page`);
    return;
  }

  if (pageName === "withdrawal-pin-settings") {
    userPageContainer.innerHTML = getWithdrawalPinContent();
    console.log(`Loaded Withdrawal PIN page`);
    return;
  }

  // Shop
  if (pageName === "shop-now") {
    userPageContainer.innerHTML = getShopNowContent();
    console.log(`Loaded Shop Now page`);
    return;
  }

  if (pageName === "checkout") {
    userPageContainer.innerHTML = getCheckoutContent();
    console.log(`Loaded Checkout page`);
    return;
  }

  if (pageName === "transactions") {
    userPageContainer.innerHTML = getTransactionsContent();
    console.log(`Loaded Transactions page`);
    return;
  }

  // Reports
  if (pageName === "direct-referral") {
    userPageContainer.innerHTML = getDirectReferralContent();
    console.log(`Loaded Direct Referral page`);
    return;
  }

  if (pageName === "sales-match") {
    userPageContainer.innerHTML = getSalesMatchBonusContent();
    console.log(`Loaded Sales Match page`);
    return;
  }

  if (pageName === "leadership-bonus") {
    userPageContainer.innerHTML = getLeadershipBonusContent();
    console.log(`Loaded Leadership Bonus page`);
    return;
  }

  if (pageName === "personal-rebates") {
    userPageContainer.innerHTML = getPersonalRebatesContent();
    console.log(`Loaded Personal Rebates page`);
    return;
  }

  if (pageName === "unilevel-bonus") {
    userPageContainer.innerHTML = getUnilevelBonusContent();
    console.log(`Loaded Unilevel Bonus page`);
    return;
  }

  // Organization
  if (pageName === "switch-account") {
    userPageContainer.innerHTML = getSwitchAccountContent();
    console.log(`Loaded Switch Account page`);
    return;
  }

  if (pageName === "genealogy-tree") {
    userPageContainer.innerHTML = getGenealogyTreeContent();
    console.log(`Loaded Genealogy Tree page`);
    return;
  }

  if (pageName === "direct-sponsors") {
    userPageContainer.innerHTML = getDirectSponsorsContent();
    console.log(`Loaded Direct Sponsors page`);
    return;
  }

  if (pageName === "binary-list") {
    userPageContainer.innerHTML = getBinaryListContent();
    console.log(`Loaded Binary List page`);
    return;
  }

  if (pageName === "unilevel-list") {
    userPageContainer.innerHTML = getUnilevelListContent();
    console.log(`Loaded Unilevel List page`);
    return;
  }

  // Check if this is a special page with custom content
  if (pageName === "ewallet-summary") {
    userPageContainer.innerHTML = getEwalletSummaryContent();
    console.log(`Loaded eWallet Summary page`);
    return;
  }

  if (pageName === "epoints-summary") {
    userPageContainer.innerHTML = getEpointsSummaryContent();
    console.log(`Loaded ePoints Summary page`);
    return;
  }

  if (pageName === "claim-products") {
    userPageContainer.innerHTML = getEpointsClaimProductsContent();
    console.log(`Loaded ePoints Claim Products page`);
    return;
  }

  // Check if this is encash wallet page
  if (pageName === "encash-wallet") {
    userPageContainer.innerHTML = getEncashWalletContent();
    console.log(`Loaded Encash eWallet page`);
    return;
  }

  if (pageName === "withdrawal-pin") {
    userPageContainer.innerHTML = getWithdrawalPinContent();
    console.log(`Loaded Withdrawal PIN page`);
    return;
  }

  // Check if this is dashboard - redirect to Account Summary instead
  if (pageName === "account-summary") {
    userPageContainer.innerHTML = getAccountSummaryContent();
    console.log(`Loaded Account Summary for dashboard request`);
    return;
  }

  // Create page title from page name
  const title = pageName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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

function getStandaloneContent(moduleId) {
  const standaloneContents = {
    "epoints-summary": getEPointsSummaryContent(),
    "account-summary": getAccountSummaryContent(),
    "dashboard": getUserDashboardContent(),
    "codebank": getCodeBankContent(),
    "encash-wallet": getEncashWalletContent(),
    "ewallet-summary": getEwalletSummaryContent(),
    "withdrawal-pin": getWithdrawalPinContent(),
    "claim-products": getClaimProductsContent(),
    "direct-referral": getDirectReferralContent(),
    "sales-match": getSalesMatchBonusContent(),
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

      <!-- Tree Container -->
      <div class="genealogy-container">
        <div class="tree">
          <ul>
            <li>
              <div class="node-card" onclick="openGenealogyLoginModal('JMDLONSOD01')">
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
              <ul>
                <li>
                  <div class="node-card" onclick="openGenealogyLoginModal('jndlonsod')">
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
                  <ul>
                    <li>
                      <div class="node-card register-slot" onclick="openGenealogyRegisterModal('jndlonsod', 'Left')">
                        <i class="fas fa-user-plus fa-2x text-primary mb-2"></i>
                        <div class="fw-bold text-muted">REGISTER HERE</div>
                      </div>
                    </li>
                    <li>
                      <div class="node-card register-slot" onclick="openGenealogyRegisterModal('jndlonsod', 'Right')">
                        <i class="fas fa-user-plus fa-2x text-primary mb-2"></i>
                        <div class="fw-bold text-muted">REGISTER HERE</div>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div class="node-card" onclick="openGenealogyLoginModal('lradmin')">
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
                   <ul>
                    <li>
                      <div class="node-card register-slot" onclick="openGenealogyRegisterModal('lradmin', 'Left')">
                        <i class="fas fa-user-plus fa-2x text-primary mb-2"></i>
                        <div class="fw-bold text-muted">REGISTER HERE</div>
                      </div>
                    </li>
                    <li>
                      <div class="node-card register-slot" onclick="openGenealogyRegisterModal('lradmin', 'Right')">
                        <i class="fas fa-user-plus fa-2x text-primary mb-2"></i>
                        <div class="fw-bold text-muted">REGISTER HERE</div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
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
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <h6 class="card-title mb-1">Available Wallet</h6>
                <p class="card-text fs-5 fw-bold">PHP 1,630,726.98</p>
                <small class="text-white-50">Last updated: Sep 4, 2025</small>
              </div>
              <button onclick="loadUserPage('encash-wallet')" class="btn btn-light btn-sm" style="white-space: nowrap;">
                <i class="fas fa-wallet me-1"></i> Encash
              </button>
            </div>
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

// Helper function for formatting date and time
function formatDateTime(date) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Date(date).toLocaleString("en-US", options);
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
                <button onclick="loadUserPage('claim-pruduct')" class="btn btn-sm btn-light">Claim Products</button>
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
    <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2><i class="fas fa-user-friends me-2"></i>Direct Sponsors</h2>
        </div>
        
        <div class="card mb-4">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5>Your Direct Sponsors</h5>
                <button class="btn btn-sm btn-primary" onclick="openSwitchAccountModal()">
                    <i class="fas fa-exchange-alt me-1"></i>Change Account
                </button>
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
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>SPONSOR001</td>
                                <td>John Martinez</td>
                                <td>2024-01-15</td>
                                <td><span class="badge bg-success">Active</span></td>
                                <td>
                                    <button class="btn btn-sm btn-info" onclick="loadUserPage('genealogy-tree')">
                                        <i class="fas fa-sitemap me-1"></i>View in Tree
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>SPONSOR002</td>
                                <td>Maria Santos</td>
                                <td>2024-02-20</td>
                                <td><span class="badge bg-success">Active</span></td>
                                <td>
                                    <button class="btn btn-sm btn-info" onclick="loadUserPage('genealogy-tree')">
                                        <i class="fas fa-sitemap me-1"></i>View in Tree
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
                                    <button type="button" class="btn btn-primary w-100 py-3" onclick="loadUserPage('withdrawal-settings')" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); border: none; border-radius: 8px;">
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

function getDirectReferralContent() {
  return `
    <div class="p-4">
        <!-- Page Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold mb-0">Direct Referral</h2>
            <button class="btn btn-sm btn-outline-secondary" onclick="loadUserPage('dashboard')"><i class="fas fa-arrow-left me-2"></i>Back to Dashboard</button>
        </div>
        
        <!-- Summary Cards -->
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
                                <i class="fas fa-user text-white"></i>
                            </div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0" style="cursor: pointer;" onclick="openSwitchAccountModal()">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                            <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;">
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

        <!-- Direct Referral Details Table -->
        <div class="card">
            <div class="card-header"><h6 class="mb-0">Direct Referral Details</h6></div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm me-2" style="width: 80px;"><option>10</option><option>25</option><option>50</option></select>
                    <span class="me-3">entries</span>
                </div>
                <div class="input-group" style="width: 200px;"><input type="text" class="form-control form-control-sm" placeholder="Search..."></div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light"><tr><th>DATE <i class="fas fa-sort"></i></th><th>TYPE <i class="fas fa-sort"></i></th><th>SOURCE <i class="fas fa-sort"></i></th><th>AMOUNT <i class="fas fa-sort"></i></th></tr></thead>
                        <tbody>
                            <tr><td>2025-06-24 19:56:12</td><td><span class="badge bg-success">SILVER</span></td><td>jmdlonsod</td><td>450.00</td></tr>
                            <tr><td>2025-07-11 18:50:37</td><td><span class="badge bg-success">SILVER</span></td><td>ITadmin</td><td>450.00</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center">
                <small class="text-muted">Showing 1 to 2 of 2 entries</small>
                <nav><ul class="pagination pagination-sm mb-0"><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li><li class="page-item active"><a class="page-link" href="#">1</a></li><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav>
            </div>
        </div>
    </div>
  `;
}

function getSalesMatchBonusContent() {
  return `
    <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold mb-0">Sales Match Bonus</h2>
            <button class="btn btn-sm btn-outline-secondary" onclick="loadUserPage('dashboard')"><i class="fas fa-arrow-left me-2"></i>Back to Dashboard</button>
        </div>
        <div class="row g-4 mb-4">
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                           <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;"><i class="fas fa-user text-white"></i></div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0" style="cursor: pointer;" onclick="openSwitchAccountModal()">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
             <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                           <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;"><i class="fas fa-users text-white"></i></div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL MATCHING BONUS</h6>
                            <h4 class="mb-0">PHP324.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h6 class="mb-0">Sales Match Details</h6></div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center"><span class="me-2">Show</span><select class="form-select form-select-sm me-2" style="width: 80px;"><option>10</option><option>25</option><option>50</option></select><span class="me-3">entries</span></div>
                <div class="input-group" style="width: 200px;"><input type="text" class="form-control form-control-sm" placeholder="Search..."></div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0 table-sm">
                        <thead class="table-light"><tr><th>DATETIME <i class="fas fa-sort"></i></th><th>SOURCE <i class="fas fa-sort"></i></th><th>DBL <i class="fas fa-sort"></i></th><th>DBR <i class="fas fa-sort"></i></th><th>PAIRS <i class="fas fa-sort"></i></th><th>EBL <i class="fas fa-sort"></i></th><th>EBR <i class="fas fa-sort"></i></th><th>PAID <i class="fas fa-sort"></i></th><th>AMOUNT <i class="fas fa-sort"></i></th><th>STATUS <i class="fas fa-sort"></i></th></tr></thead>
                        <tbody>
                            <tr><td>25-06-24 19:56:12</td><td>jmdlonsod</td><td>10.00</td><td>0.00</td><td>0.00</td><td>10.00</td><td>0.00</td><td>0.00</td><td>0.00</td><td><span class="badge bg-warning text-dark">NO COMMISSION</span></td></tr>
                            <tr><td>25-07-11 18:50:37</td><td>ITadmin</td><td>0.00</td><td>10.00</td><td>1.00</td><td>0.00</td><td>0.00</td><td>1.00</td><td>360.00</td><td><span class="badge bg-success">CREDITED</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center"><small class="text-muted">Showing 1 to 2 of 2 entries</small><nav><ul class="pagination pagination-sm mb-0"><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li><li class="page-item active"><a class="page-link" href="#">1</a></li><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav></div>
        </div>
    </div>
  `;
}

function getLeadershipBonusContent() {
  return `
    <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold mb-0">Leadership Bonus</h2>
            <button class="btn btn-sm btn-outline-secondary" onclick="loadUserPage('dashboard')"><i class="fas fa-arrow-left me-2"></i>Back to Dashboard</button>
        </div>
        <div class="row g-4 mb-4">
             <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                           <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;"><i class="fas fa-user text-white"></i></div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0" style="cursor: pointer;" onclick="openSwitchAccountModal()">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                           <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;"><i class="fas fa-trophy text-white"></i></div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL LEADERSHIP BONUS</h6>
                            <h4 class="mb-0">PHP0.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h6 class="mb-0">Leadership Bonus Details</h6></div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center"><span class="me-2">Show</span><select class="form-select form-select-sm me-2" style="width: 80px;"><option>10</option><option>25</option><option>50</option></select><span class="me-3">entries</span></div>
                <div class="input-group" style="width: 200px;"><input type="text" class="form-control form-control-sm" placeholder="Search..."></div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light"><tr><th>DATETIME <i class="fas fa-sort"></i></th><th>SOURCE <i class="fas fa-sort"></i></th><th>AMOUNT <i class="fas fa-sort"></i></th><th>STATUS <i class="fas fa-sort"></i></th></tr></thead>
                        <tbody><tr><td colspan="4" class="text-center text-muted py-4">No data available in table</td></tr></tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center"><small class="text-muted">Showing 0 to 0 of 0 entries</small><nav><ul class="pagination pagination-sm mb-0"><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav></div>
        </div>
    </div>
  `;
}

function getPersonalRebatesContent() {
  return `
    <div class="p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold mb-0">Personal Rebates</h2>
            <button class="btn btn-sm btn-outline-secondary" onclick="loadUserPage('dashboard')"><i class="fas fa-arrow-left me-2"></i>Back to Dashboard</button>
        </div>
        <div class="row g-4 mb-4">
             <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #6f42c1, #8e44ad);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                           <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;"><i class="fas fa-user text-white"></i></div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">ACCOUNT</h6>
                            <h4 class="mb-0" style="cursor: pointer;" onclick="openSwitchAccountModal()">JMDLONSO001 <i class="fas fa-exchange-alt"></i></h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card text-white" style="background: linear-gradient(135deg, #17a2b8, #20c997);">
                    <div class="card-body d-flex align-items-center">
                        <div class="me-3">
                           <div class="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center" style="width: 50px; height: 50px;"><i class="fas fa-user text-white"></i></div>
                        </div>
                        <div>
                            <h6 class="mb-1 text-uppercase">TOTAL PERSONAL REBATES</h6>
                            <h4 class="mb-0">PHP630.00</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header"><h6 class="mb-0">Personal Rebates Details</h6></div>
            <div class="card-header d-flex justify-content-between align-items-center border-top-0 pt-0">
                <div class="d-flex align-items-center"><span class="me-2">Show</span><select class="form-select form-select-sm me-2" style="width: 80px;"><option>10</option><option>25</option><option>50</option></select><span class="me-3">entries</span></div>
                <div class="input-group" style="width: 200px;"><input type="text" class="form-control form-control-sm" placeholder="Search..."></div>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover mb-0">
                        <thead class="table-light"><tr><th>CTRL# <i class="fas fa-sort"></i></th><th>TRANS# <i class="fas fa-sort"></i></th><th>DATE <i class="fas fa-sort"></i></th><th>DETAILS <i class="fas fa-sort"></i></th><th>CASHBACK <i class="fas fa-sort"></i></th><th>STATUS <i class="fas fa-sort"></i></th></tr></thead>
                        <tbody>
                            <tr><td>105</td><td>646</td><td>2025-06-06 13:09:09</td><td>SOGUARD*2</td><td>90.00</td><td><span class="badge bg-primary">credited</span></td></tr>
                            <tr><td>423</td><td>2112</td><td>2025-07-31 20:36:08</td><td>SOGUARD*1</td><td>45.00</td><td><span class="badge bg-primary">credited</span></td></tr>
                            <tr><td>424</td><td>2113</td><td>2025-07-31 20:45:23</td><td>SOGUARD*5</td><td>225.00</td><td><span class="badge bg-primary">credited</span></td></tr>
                            <tr><td>427</td><td>2116</td><td>2025-07-31 21:00:13</td><td>Synbiotic+ MM*6</td><td>270.00</td><td><span class="badge bg-primary">credited</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="card-footer d-flex justify-content-between align-items-center"><small class="text-muted">Showing 1 to 4 of 4 entries</small><nav><ul class="pagination pagination-sm mb-0"><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li><li class="page-item active"><a class="page-link" href="#">1</a></li><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav></div>
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
                        <button class="btn btn-info btn-sm" onclick="openNewWithdrawalOptionModal()">New Withdrawal Option</button>
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
                                <div class="d-flex justify-content-between align-items-end">
                                    <h2 class="mb-0 fw-bold">PHP1,854.00</h2>
                                    <i class="fas fa-arrow-right text-light-bg" style="cursor: pointer" onclick="loadUserPage('encash-wallet')"></i>
                                </div>
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
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted">POINTS RAISED</small>
                                    <i class="fas fa-arrow-right text-warning" style="cursor: pointer" onclick="loadUserPage('sales-match')"></i>
                                </div>
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

function getUserDashboardContent() {
  return `
        <div class="container-fluid px-3 px-md-4 py-4">
            <!-- Dashboard Header -->
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2 class="fw-bold text-primary">
                    <i class="fas fa-tachometer-alt me-2"></i> Dashboard
                </h2>
            </div>

            <!-- Stats Cards Grid -->
            <div class="row g-3 mb-4">
                <!-- Current Account -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12 d-flex">
                    <div class="card text-white border-0 shadow-sm flex-fill" style="background: linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%); border-radius: 12px; cursor: pointer;" onclick="openSwitchAccountModal()">
                        <div class="card-body py-3 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-white-75 mb-0 fw-normal" style="opacity: 0.8; font-size: 0.75rem;">CURRENT ACCOUNT</h6>
                                <i class="fas fa-exchange-alt text-white" style="opacity: 0.7;"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-white mt-auto">JMDLONSO001</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Total Earnings -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12 d-flex">
                    <div class="card text-white border-0 shadow-sm flex-fill" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 12px;">
                        <div class="card-body py-3 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-white-75 mb-0 fw-normal" style="opacity: 0.8; font-size: 0.75rem;">TOTAL EARNINGS</h6>
                                <i class="fas fa-chart-line text-white" style="opacity: 0.7;"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-white mt-auto">PHP1,854.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- ePoints Balance -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12 d-flex">
                    <div class="card text-white border-0 shadow-sm flex-fill" style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); border-radius: 12px;">
                        <div class="card-body py-3 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-white-75 mb-0 fw-normal" style="opacity: 0.8; font-size: 0.75rem;">EPOINTS BALANCE</h6>
                                <i class="fas fa-coins text-white" style="opacity: 0.7;"></i>
                            </div>
                            <h4 class="mb-0 fw-bold text-white mt-auto">PHP36.00</h4>
                        </div>
                    </div>
                </div>
                
                <!-- Total Sales Match -->
                <div class="col-lg-2 col-md-4 col-sm-6 col-12 d-flex">
                    <div class="card border-0 shadow-sm flex-fill" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body py-3 d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="text-muted mb-0 fw-normal" style="font-size: 0.75rem;">TOTAL SALES MATCH</h6>
                                <i class="fas fa-trophy text-warning"></i>
                            </div>
                            <div class="d-flex justify-content-between align-items-end mt-auto">
                                <h4 class="mb-0 fw-bold text-dark">PHP324.00</h4>
                                <i class="fas fa-arrow-right text-muted" style="cursor: pointer" onclick="loadUserPage('sales-match')"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Grinders Guild Card -->
                <div class="col-lg-4 col-md-8 col-12 d-flex">
                    <div class="card text-white border-0 shadow-sm flex-fill" style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); border-radius: 12px;">
                        <div class="card-body p-4 d-flex flex-column">
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
                            <div class="d-flex justify-content-between align-items-end">
                                <h4 class="mb-0 fw-bold text-dark">PHP0.00</h4>
                                <i class="fas fa-arrow-right text-muted" style="cursor: pointer" onclick="loadUserPage('leadership-bonus')"></i>
                            </div>
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
                            <div class="d-flex justify-content-between align-items-end">
                            <h4 class="mb-0 fw-bold text-dark">PHP900.00</h4>
                            <i class="fas fa-arrow-right text-muted" style="cursor: pointer" onclick="loadUserPage('direct-referral')"></i>
                            </div>
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
                            <div class="d-flex justify-content-between align-items-end">
                            <h4 class="mb-0 fw-bold text-dark">PHP630.00</h4>
                            <i class="fas fa-arrow-right text-muted" style="cursor: pointer" onclick="loadUserPage('unilevel-bonus')"></i>
                            </div>
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
                            <div class="d-flex justify-content-between align-items-end">
                            <h4 class="mb-0 fw-bold text-dark">PHP0.00</h4>
                            <i class="fas fa-arrow-right text-muted" style="cursor: pointer" onclick="loadUserPage('')"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- My Network Status -->
                <div class="col-lg-4 col-md-8 col-12 d-flex">
                    <div class="card border-0 shadow-sm flex-fill" style="background: #f8f9fa; border-radius: 12px;">
                        <div class="card-body p-4 d-flex flex-column">
                            <h6 class="text-muted mb-3 fw-normal" style="font-size: 0.75rem;">MY NETWORK STATUS</h6>
                            <div class="d-flex align-items-center justify-content-center mb-3">
                                <div class="position-relative" style="width: 100px; height: 100px;">
                                    <svg width="100" height="100" viewBox="0 0 42 42" style="transform: rotate(-90deg);">
                                        <circle cx="21" cy="21" r="15.5" fill="transparent" stroke="#e9ecef" stroke-width="3"/>
                                        <circle cx="21" cy="21" r="15.5" fill="transparent" stroke="#10B981" stroke-width="3" stroke-dasharray="73" stroke-dashoffset="19" stroke-linecap="round"/>
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

// Modal options

/**
 * Handles the creation and display of the account switch modal.
 * This function ensures the modal is only created once and is properly shown using the Bootstrap API.
 */
function openSwitchAccountModal() {
    // If modal element doesn't exist in the DOM, add it.
    if (!document.getElementById('accountSwitchModal')) {
        document.body.insertAdjacentHTML('beforeend', getSwitchAccountModalHtml());
    }
    
    // Get the modal element and create a new Bootstrap modal instance to show it.
    const accountModalEl = document.getElementById('accountSwitchModal');
    const accountModal = new bootstrap.Modal(accountModalEl);
    accountModal.show();
}

/**
 * Creates and returns the HTML for the account switch modal.
 * This is a global modal, defined once.
 */
function getSwitchAccountModalHtml() {
  return `
    <div class="modal fade" id="accountSwitchModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"><i class="fas fa-exchange-alt me-2"></i>Switch Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body p-4">
            <div class="row mb-4 align-items-center">
                <div class="col-md-6 d-flex align-items-center">
                    <span class="me-2">Show</span>
                    <select class="form-select form-select-sm w-auto"><option>10</option><option>25</option><option>50</option><option>100</option></select>
                    <span class="ms-2">entries</span>
                </div>
                <div class="col-md-6">
                    <div class="input-group"><span class="input-group-text bg-light border-0"><i class="fas fa-search text-muted"></i></span><input type="text" class="form-control border-0 bg-light" placeholder="Search accounts..."></div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="bg-light">
                        <tr>
                            <th class="border-0">Date Joined</th><th class="border-0">Username</th><th class="border-0">eWallet</th><th class="border-0">ePoints</th><th class="border-0 text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>2025-07-31</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center p-2 me-2" style="width: 32px; height: 32px;"><i class="fas fa-user"></i></div>
                                    <div><h6 class="mb-0">JMDLONSO001</h6><small class="text-muted">Primary Account</small></div>
                                </div>
                            </td>
                            <td>PHP 1,854.00</td>
                            <td>36 Points</td>
                            <td class="text-end"><button class="btn btn-primary btn-sm" onclick="alert('Switched to JMDLONSO001')" data-bs-dismiss="modal"><i class="fas fa-sign-in-alt me-2"></i>Switch</button></td>
                        </tr>
                        <tr>
                            <td>2025-06-15</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center p-2 me-2" style="width: 32px; height: 32px;"><i class="fas fa-user"></i></div>
                                    <div><h6 class="mb-0">JMDLONSO002</h6><small class="text-muted">Secondary Account</small></div>
                                </div>
                            </td>
                            <td>PHP 750.00</td>
                            <td>15 Points</td>
                            <td class="text-end"><button class="btn btn-primary btn-sm" onclick="alert('Switched to JMDLONSO002')" data-bs-dismiss="modal"><i class="fas fa-sign-in-alt me-2"></i>Switch</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex justify-content-between align-items-center mt-4">
                <p class="text-muted mb-0">Showing 1 to 2 of 2 entries</p>
                <nav><ul class="pagination pagination-sm mb-0"><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-left"></i></a></li><li class="page-item active"><a class="page-link" href="#">1</a></li><li class="page-item disabled"><a class="page-link" href="#"><i class="fas fa-chevron-right"></i></a></li></ul></nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}


function getNewWithdrawalOptionModalHtml() {
  return `
    <div class="modal fade" id="newWithdrawalModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Withdrawal Option</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="facility" class="form-label">Facility</label>
                <select class="form-select" id="facility">
                  <option selected disabled>-- Please select facility --</option>
                  <option value="bank">Bank</option>
                  <option value="gcash">GCash</option>
                  <option value="paymaya">PayMaya</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="accountType" class="form-label">Account Type</label>
                <select class="form-select" id="accountType">
                  <option selected disabled>-- Please select account type --</option>
                  <option value="savings">Savings</option>
                  <option value="checking">Checking</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="accountName" class="form-label">Account Name</label>
                <input type="text" class="form-control" id="accountName" placeholder="Enter account name">
              </div>
              <div class="mb-3">
                <label for="accountNumber" class="form-label">Account Number</label>
                <input type="text" class="form-control" id="accountNumber" placeholder="Enter account number">
              </div>
              <div class="mb-3">
                <label for="contactNumber" class="form-label">Contact Number</label>
                <input type="text" class="form-control" id="contactNumber" placeholder="Enter contact number">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" onclick="alert('Save clicked!')">Save</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Handles the creation and display of the "New Withdrawal Option" modal.
 */
function openNewWithdrawalOptionModal() {
    if (!document.getElementById('newWithdrawalModal')) {
        document.body.insertAdjacentHTML('beforeend', getNewWithdrawalOptionModalHtml());
    }
    
    const withdrawalModalEl = document.getElementById('newWithdrawalModal');
    const withdrawalModal = new bootstrap.Modal(withdrawalModalEl);
    withdrawalModal.show();
}


/**
 * Creates and returns the HTML for the genealogy login modal.
 * @param {string} username - The username of the account to log into.
 */
function getGenealogyLoginModalHtml(username) {
  return `
    <div class="modal fade" id="genealogyLoginModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Login to this Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="login-username" class="form-label">Username</label>
                <input type="text" class="form-control" id="login-username" value="${username}" disabled readonly>
              </div>
              <div class="mb-3">
                <label for="login-password" class="form-label">Password</label>
                <input type="password" class="form-control" id="login-password" placeholder="Enter password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="alert('Login attempt for ${username}')">Login</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Handles the creation and display of the genealogy login modal.
 * @param {string} username - The username to display in the modal.
 */
function openGenealogyLoginModal(username) {
    const modalId = 'genealogyLoginModal';
    // Remove any existing modal to ensure it's fresh
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', getGenealogyLoginModalHtml(username));
    
    const modalEl = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}

/**
 * Creates and returns the HTML for the genealogy registration modal.
 * @param {string} sponsor - The sponsor's username.
 * @param {string} position - The position ('Left' or 'Right').
 */
function getGenealogyRegisterModalHtml(sponsor, position) {
  return `
    <div class="modal fade" id="genealogyRegisterModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Register New Account</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p class="text-muted">You are registering a new account under <strong class="text-primary">${sponsor}</strong> on the <strong class="text-primary">${position}</strong> side.</p>
            <form>
              <div class="mb-3">
                <label for="register-username" class="form-label">Username</label>
                <input type="text" class="form-control" id="register-username" placeholder="Choose a username">
              </div>
              <div class="mb-3">
                <label for="register-password" class="form-label">Password</label>
                <input type="password" class="form-control" id="register-password" placeholder="Create a password">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button type="button" class="btn btn-primary" onclick="alert('Proceeding to registration...')">Register</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Handles the creation and display of the genealogy registration modal.
 * @param {string} sponsor - The sponsor's username.
 * @param {string} position - The position for the new registration.
 */
function openGenealogyRegisterModal(sponsor, position) {
    const modalId = 'genealogyRegisterModal';
    // Remove any existing modal
    const existingModal = document.getElementById(modalId);
    if (existingModal) {
        existingModal.remove();
    }

    document.body.insertAdjacentHTML('beforeend', getGenealogyRegisterModalHtml(sponsor, position));
    
    const modalEl = document.getElementById(modalId);
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
}
