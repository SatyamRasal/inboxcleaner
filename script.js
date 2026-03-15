document.addEventListener('DOMContentLoaded', () => {
    
    // --- Razorpay Integration ---
    const rzpButton = document.getElementById('razorpay-checkout');
    if (rzpButton) {
        rzpButton.onclick = function(e) {
            e.preventDefault();

            // Note: Replace 'YOUR_RAZORPAY_KEY_ID' with your actual key from Razorpay Dashboard
            var options = {
                "key": "rzp_live_SRVgONoABQVh2l", 
                "amount": "45000", // 900 subunits = ₹9.00 (Standardizing on INR for settlement)
                "currency": "INR",
                "name": "DriftsAi",
                "description": "InboxCleaner Lifetime License",
                "image": "https://driftsai.com/logo.png", // Path to your logo
                "handler": function (response) {
                    // 1. Success Message
                    alert("Payment Successful! Your download will begin now.");

                    // 2. Trigger Automatic Download for the .zip file
                    // Since it's in the same folder, we use the relative path.
                    const fileUrl = "https://drive.google.com/file/d/1rXjk5qV5s7Uugv_pjDNaZ7SdBbUgdOK7/view?usp=drivesdk"; 
                    const downloadLink = document.createElement('a');
                    downloadLink.href = fileUrl;
                    downloadLink.download = "https://drive.google.com/file/d/1rXjk5qV5s7Uugv_pjDNaZ7SdBbUgdOK7/view?usp=drivesdk"; 
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                    document.body.removeChild(downloadLink);

                    // 3. Redirect to Thanks Page
                    window.location.href = "thanks.html";
                },
                "prefill": {
                    "name": "", // Optionally pass user name from your form
                    "email": "" // Optionally pass user email from your form
                },
                "theme": {
                    "color": "#3b82f6"
                }
            };

            var rzp1 = new Razorpay(options);
            
            rzp1.on('payment.failed', function (response){
                alert("Payment Failed: " + response.error.description);
            });

            rzp1.open();
        }
    }

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const rootElement = document.documentElement;
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        rootElement.setAttribute('data-theme', 'dark');
        if(themeToggle) themeToggle.textContent = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (rootElement.getAttribute('data-theme') === 'dark') {
                rootElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.textContent = '🌙';
            } else {
                rootElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.textContent = '☀️';
            }
        });
    }

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
});