
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

