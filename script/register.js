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