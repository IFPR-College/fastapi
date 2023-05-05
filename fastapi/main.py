from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Response, Request
from datetime import date
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import List
from pydantic import BaseModel

app = FastAPI()
origins = ["*"]

class Task(BaseModel):
    taskName:str
    taskDate:str

class TaskList(BaseModel):
    tasks:List[Task]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks = []

@app.get("/list")
async def read_tasks():
    return JSONResponse(content=jsonable_encoder(tasks))

@app.post("/task")
async def create_task(request: Request):
    req = await request.json()
    print(req)
    tasks.append(req)
