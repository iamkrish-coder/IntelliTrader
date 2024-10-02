from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from backend.algo import Algo
from backend.api.register import Register

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
    # Extract and print the body of the request
    body = await request.json()  # Extract JSON body
    register_object = Register(body)
    return register_object.handle_request()

@app.get("/")
async def root():
    return {"message": "Hello IntelliTrader"}

@app.get("/autorun")
async def trigger_algo():
    try:
        application = Algo()
        await application.autorun()
        return {"message": "Algo started successfully"}
    except Exception as error:
        return {"error": str(error)}
