from fastapi import FastAPI, Request
from backend.algo import Algo
from backend.api.register import Register

app = FastAPI()

@app.get("/home")
async def root():
    return {"message": "Hello World"}

@app.get("/autorun")
async def trigger_algo():
    try:
        application = Algo()
        await application.autorun()
        return {"message": "Algo started successfully"}
    except Exception as error:
        return {"error": str(error)}

@app.post("/api/register")
async def register(request: Request):
    register_object = Register()
    return await register_object.handle_request(request)