from fastapi import FastAPI
from app.database import get_collection
# Importing the routers from your existing files
from app.route.menu import router as MenuRouter
from app.route.booking import router as BookingRouter

app = FastAPI(title="QuickQ - Canteen Management")

# This connects the files in your 'route' folder to the main app
app.include_router(MenuRouter, prefix="/menu", tags=["Menu"])
app.include_router(BookingRouter, prefix="/booking", tags=["Bookings"])

@app.get("/")
def home():
    return {"message": "Campus-Eat API is Live and Connected!"}

# Keeping your test route for now
@app.post("/test-database")
async def test_db(name: str):
    collection = get_collection("test_connection")
    result = await collection.insert_one({"user": name, "message": "Cloud is working!"})
    return {"status": "Success", "mongo_id": str(result.inserted_id)}