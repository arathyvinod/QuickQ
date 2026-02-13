from app.database import get_collection

# Access the 'time_slots' collection in your MongoDB Atlas
slots = get_collection("time_slots")

async def check_availability(slot_time: str):
    """
    Checks if a specific time slot has reached its capacity.
    """
    # Look for the slot in the database
    slot = await slots.find_one({"time": slot_time})
    
    # If the slot exists and has 20 or more bookings, it is full
    if slot and slot.get("bookings", 0) >= 20:
        return False
    
    # Otherwise, it's available
    return True

async def update_slot_count(slot_time: str):
    """
    Increments the booking count for a specific time slot.
    If the slot doesn't exist yet, it creates one.
    """
    await slots.update_one(
        {"time": slot_time},
        {"$inc": {"bookings": 1}},
        upsert=True  # Creates the document if it doesn't exist
    )