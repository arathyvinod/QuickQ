from fastapi import APIRouter, HTTPException
# Import BOTH functions from your slot_service
from app.services.slot_service import check_availability, update_slot_count

router = APIRouter()

@router.post("/book")
async def create_booking(student_name: str, slot_time: str):
    # 1. Ask the service: "Is there space for one more person?"
    is_available = await check_availability(slot_time)
    
    if not is_available:
        # If the count is 20 or more, stop them here
        raise HTTPException(status_code=400, detail="Slot is full! Choose another time.")
    
    # 2. Since it's available, tell the service to +1 the count in MongoDB
    await update_slot_count(slot_time)
    
    # 3. Success!
    return {
        "status": "Success",
        "message": f"Slot at {slot_time} reserved for {student_name}",
        "action": "Please arrive at the canteen 5 minutes early."
    }
