from fastapi import FastAPI
from app.Routers.route import router
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.DbConfig.MongoDBAtlas import establishConnection, terminatedConnection
from app.worker.backgroundTask import Task
import threading

@asynccontextmanager
async def lifespan(app: FastAPI):
    establishConnection()
    thread = threading.Thread(target=Task, daemon=False)
    thread.start()
    yield
    terminatedConnection()

app = FastAPI(
    title="FastAPI MongoEngine App",
    lifespan=lifespan
)

ALLOWHOST = ["http://localhost:5173", "http://127.0.0.1:5173", "https://mr-srijan-ray.vercel.app" ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWHOST,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {"message": "Welcome To SRIJAN'S Portfolio Backend API!"}