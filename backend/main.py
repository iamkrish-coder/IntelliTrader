from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from backend.autorun import Algo
from backend.api.register import Register
from backend.api.login import Login

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/register")
async def register(request: Request):
    body = await request.json()
    register_object = Register(body)
    return register_object.handle_request()

@app.post("/api/login")
async def login(request: Request):
    body = await request.json()
    login_object = Login(body)
    return login_object.handle_request()

@app.get("/autorun")
async def trigger_algo():
    try:
        application = Algo()
        await application.autorun()
        return {"message": "Algo started successfully"}
    except Exception as error:
        return {"error": str(error)}
