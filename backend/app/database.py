import motor.motor_asyncio
import os
from dotenv import load_dotenv

# Load variables from the .env file
load_dotenv()

# Grab the MONGO_URI you just pasted into .env
MONGO_URL = os.getenv("MONGO_URI")

# Create the MongoDB client
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)

# Access the 'QuickQ_DB' database
db = client.QuickQ_DB 

# Helper function to get specific collections
def get_collection(name: str):
    return db[name]