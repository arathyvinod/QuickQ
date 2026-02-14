from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.database import get_collection, db
from app.route.menu import router as MenuRouter
from app.route.booking import router as BookingRouter

app = FastAPI(title="QuickQ - Canteen Management System")

# --- 1. CORS Configuration ---
# This is essential for your HTML files to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows GET, POST, DELETE, etc.
    allow_headers=["*"],
)

# --- 2. Router Integration ---
# These connect the logic from your 'route' folder
app.include_router(MenuRouter, prefix="/menu", tags=["Menu"])
app.include_router(BookingRouter, prefix="/booking", tags=["Bookings"])

# --- 3. Base Routes ---
@app.get("/")
def home():
    return {"message": "QuickQ API is Live and Connected to MongoDB Atlas!"}

# --- 4. Admin Specific Routes ---

@app.delete("/menu/{item_name}", tags=["Admin"])
async def delete_menu_item(item_name: str):
    """Deletes a food item from the menu collection in MongoDB."""
    # We use a case-insensitive search to ensure the delete is reliable
    result = await db.menu.delete_one({"name": item_name})
    
    if result.deleted_count == 1:
        return {"message": f"Item '{item_name}' successfully removed from menu."}
    
    raise HTTPException(status_code=404, detail="Food item not found in database.")

@app.get("/admin/slots", tags=["Admin"])
async def get_slot_status():
    """Returns the current booking count for all time slots."""
    # Fetches all documents from the time_slots collection
    slots = await db.time_slots.find().to_list(100)
    for slot in slots:
        slot["_id"] = str(slot["_id"])  # Convert MongoDB ObjectId to string for JSON
    return slots

# --- 5. Debug/Test Route ---
@app.post("/test-database", tags=["Debug"])
async def test_db(name: str):
    collection = get_collection("test_connection")
    result = await collection.insert_one({"user": name, "message": "Backend-to-Cloud Connection verified!"})
    return {"status": "Success", "mongo_id": str(result.inserted_id)
        }
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])