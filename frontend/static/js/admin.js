const API_URL = "http://127.0.0.1:8000";

// --- 1. Initialize Page ---
document.addEventListener("DOMContentLoaded", () => {
    fetchAdminMenu();
    fetchSlotStatus();
});

// --- 2. Fetch and Display Current Menu ---
async function fetchAdminMenu() {
    const list = document.getElementById("admin-menu-list");
    try {
        const res = await fetch(`${API_URL}/menu/`);
        if (!res.ok) throw new Error("Could not fetch menu");
        
        const items = await res.json();
        
        if (items.length === 0) {
            list.innerHTML = "<p style='text-align:center; padding:20px;'>Menu is empty. Add your first item above!</p>";
            return;
        }

        list.innerHTML = items.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #eee; background: white; margin-bottom: 8px; border-radius: 8px; shadow: 0 1px 2px rgba(0,0,0,0.05);">
                <div>
                    <strong style="font-size: 1.1rem; color: #1e293b;">${item.name}</strong>
                    <span style="color: #64748b; margin-left: 10px;">₹${item.price}</span>
                    <div style="font-size: 0.8rem; color: #94a3b8;">${item.category || 'General'}</div>
                </div>
                <button onclick="deleteItem('${item.name}')" style="background: #fee2e2; color: #ef4444; border: none; padding: 8px 15px; border-radius: 6px; cursor: pointer; font-weight: 600;">
                    Delete
                </button>
            </div>
        `).join('');
    } catch (err) {
        list.innerHTML = `<p style="color:red; text-align:center;">Error: ${err.message}. Check if Backend is running.</p>`;
    }
}

// --- 3. Add New Item ---
const addForm = document.getElementById("addFoodForm");
if (addForm) {
    addForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Match the JSON schema from your Swagger docs
        const newItem = {
            name: document.getElementById("foodName").value,
            price: parseFloat(document.getElementById("foodPrice").value),
            description: document.getElementById("foodDesc").value || "",
            category: "General", // Default value required by your schema
            is_available: true   // Default value required by your schema
        };

        try {
            const res = await fetch(`${API_URL}/menu/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem)
            });

            if (res.ok) {
                alert("Item added to menu successfully!");
                addForm.reset();
                fetchAdminMenu(); // Refresh the list immediately
            } else {
                const errorData = await res.json();
                alert("Failed to add: " + JSON.stringify(errorData.detail));
            }
        } catch (err) {
            alert("Network error. Please ensure the FastAPI server is running.");
        }
    });
}

// --- 4. Delete Item ---
async function deleteItem(itemName) {
    if (!confirm(`Are you sure you want to remove "${itemName}"?`)) return;

    try {
        const res = await fetch(`${API_URL}/menu/${encodeURIComponent(itemName)}`, {
            method: "DELETE"
        });

        if (res.ok) {
            fetchAdminMenu(); // Refresh list after deletion
        } else {
            alert("Failed to delete the item.");
        }
    } catch (err) {
        alert("Connection error while trying to delete.");
    }
}

// --- 5. Slot Monitoring (Max 20 per slot) ---
async function fetchSlotStatus() {
    const monitor = document.getElementById("slot-monitor");
    if (!monitor) return;

    try {
        const res = await fetch(`${API_URL}/admin/slots`);
        if (!res.ok) return;
        
        const slots = await res.json();
        monitor.innerHTML = slots.map(s => `
            <div style="background: #f8fafc; padding: 15px; border-radius: 10px; text-align: center; border: 1px solid #e2e8f0;">
                <div style="text-transform: capitalize; font-weight: bold; color: #64748b; margin-bottom: 5px;">${s.slot_time}</div>
                <div style="font-size: 1.5rem; font-weight: 800; color: ${s.bookings >= 20 ? '#ef4444' : '#10b981'};">
                    ${s.bookings}/20
                </div>
            </div>
        `).join('');
    } catch (err) {
        console.error("Slot monitoring failed:", err);
    }
}