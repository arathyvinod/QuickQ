from fastapi import APIRouter
from app.database import get_collection

router = APIRouter()
menu_collection = get_collection("menu_items")

@router.get("/")
async def get_menu():
    cursor = menu_collection.find({})
    items = []
    async for document in cursor:
        document["_id"] = str(document["_id"]) # Convert MongoDB ID to string
        items.append(document)
    return items

@router.post("/add")
async def add_menu_item(name: str, price: float, category: str):
    new_item = {"name": name, "price": price, "category": category, "available": True}
    result = await menu_collection.insert_one(new_item)
    return {"id": str(result.inserted_id), "message": "Item added!"}