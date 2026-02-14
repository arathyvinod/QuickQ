from fastapi import APIRouter, HTTPException
from app.database import get_collection
from pydantic import BaseModel
from typing import Optional

router = APIRouter()
menu_collection = get_collection("menu_items")

# --- 1. Data Model ---
class MenuItem(BaseModel):
    name: str
    price: float
    description: Optional[str] = ""
    category: str
    is_available: bool = True

# --- 2. Get Menu ---
@router.get("/")
async def get_menu():
    cursor = menu_collection.find({})
    items = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        items.append(document)
    return items

# --- 3. Add Item (Updated to handle JSON) ---
@router.post("/")
async def add_menu_item(item: MenuItem):
    # This matches the JSON sent from admin.js
    new_item = item.dict()
    result = await menu_collection.insert_one(new_item)
    return {"id": str(result.inserted_id), "message": "Item added!"}

# --- 4. Delete Item ---
@router.delete("/{item_name}")
async def delete_menu_item(item_name: str):
    result = await menu_collection.delete_one({"name": item_name})
    if result.deleted_count == 1:
        return {"message": "Item deleted"}
    raise HTTPException(status_code=404, detail="Item not found")