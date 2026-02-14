const API_URL = "http://127.0.0.1:8000";
let selectedItem = null;
const SERVICE_FEE = 5; // Your platform charge

document.addEventListener("DOMContentLoaded", () => {
    const name = sessionStorage.getItem('studentName');
    if (!name) window.location.href = 'login.html';
    document.getElementById('userGreeting').innerText = `Hello, ${name}!`;
    fetchMenu();
});

// 1. Fetch Menu with Images and Pricing
async function fetchMenu() {
    const grid = document.getElementById("menu-grid");
    try {
        const res = await fetch(`${API_URL}/menu/`);
        const items = await res.json();
        
        grid.innerHTML = items.map(item => `
            <div class="food-card" style="background:white; border-radius:15px; overflow:hidden; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1); border:1px solid #e2e8f0;">
                <img src="${item.image_url || 'https://via.placeholder.com/300x200'}" style="width:100%; height:180px; object-fit:cover;">
                <div style="padding:20px;">
                    <h3 style="margin:0; font-size:1.2rem;">${item.name}</h3>
                    <p style="color:#64748b; font-size:0.85rem; margin:8px 0;">${item.description || 'Freshly prepared'}</p>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
                        <span style="font-weight:bold; color:#059669; font-size:1.25rem;">₹${item.price}</span>
                        <button onclick="openBooking('${item.name}', ${item.price})" class="btn-primary" style="padding:8px 20px;">Order</button>
                    </div>
                </div>
            </div>
        `).join('');
    } catch (err) { grid.innerHTML = "<p>Failed to load menu. Is the backend running?</p>"; }
}

// 2. Open Booking & Show Payment QR
function openBooking(name, price) {
    selectedItem = { name, price, total: price + SERVICE_FEE };
    
    document.getElementById("billBreakdown").innerHTML = `
        <div style="margin-bottom:15px; border-bottom:1px dashed #cbd5e1; padding-bottom:10px;">
            <p style="display:flex; justify-content:space-between;"><span>${name}</span> <span>₹${price}</span></p>
            <p style="display:flex; justify-content:space-between; color:#64748b;"><span>Service Fee</span> <span>₹${SERVICE_FEE}</span></p>
            <p style="display:flex; justify-content:space-between; font-weight:bold; font-size:1.1rem; margin-top:5px;"><span>Total</span> <span>₹${selectedItem.total}</span></p>
        </div>
        <div style="text-align:center;">
            <p style="font-size:0.8rem; color:#ef4444; margin-bottom:10px;">Scan to Pay via GPay/PhonePe/Paytm</p>
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=YOUR_UPI_ID_HERE@okaxis%26am=${selectedItem.total}" style="width:150px; border:4px solid white; box-shadow:0 4px 6px rgba(0,0,0,0.1);">
            <p style="font-size:0.75rem; margin-top:5px; color:#64748b;">UPI ID: yourname@upi</p>
        </div>
    `;
    
    document.getElementById("bookingFormArea").style.display = "block";
    document.getElementById("successArea").style.display = "none";
    document.getElementById("bookingModal").style.display = "flex";
}

// 3. Confirm Booking after Payment
async function submitBooking() {
    const payBtn = document.getElementById("payBtn");
    payBtn.innerText = "Verifying Payment...";
    payBtn.disabled = true;

    // Simulate verification delay
    setTimeout(async () => {
        const studentName = sessionStorage.getItem('studentName');
        const slot = document.getElementById("userSlot").value;

        try {
            const res = await fetch(`${API_URL}/booking/book?student_name=${studentName}&slot_time=${slot}`, { method: "POST" });
            
            if (res.ok) {
                document.getElementById("bookingFormArea").style.display = "none";
                document.getElementById("successArea").style.display = "block";
                
                const now = new Date();
                const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const qrText = `PAID: ₹${selectedItem.total} | User: ${studentName} | Item: ${selectedItem.name} | Slot: ${slot} | Time: ${time}`;
                
                document.getElementById("qrcode").innerHTML = "";
                new QRCode(document.getElementById("qrcode"), { text: qrText, width: 180, height: 180 });
            } else {
                alert("This slot is full! Please choose another time.");
                payBtn.innerText = "Pay Now & Confirm";
                payBtn.disabled = false;
            }
        } catch (err) { alert("Network Error. Please try again."); }
    }, 2000);
}

function closeModal() { document.getElementById("bookingModal").style.display = "none"; }

function downloadQR() {
    const canvas = document.querySelector("#qrcode canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `Receipt_${selectedItem.name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
}