from fastapi import APIRouter, HTTPException, status
from app.Model.models import PortfolioProjects, ContactMessages, AdminCredentials
from app.Schemas.RequestResponseModel import (
    ProjectRequest, ProjecResponse,ContactMessageRequest, ContactMessageResponse,
    InitContactMessageRequest,ContactMessageDeleteResponse,ProjecDeleteResponse,
    AdminCredentialsRequest, AdminCredentialsResponse, AdminStausResponse,
)
from .Components.PasswordHashing import hashPassword, verifyPassworad
from .Components.UserIdGenerate import generateId
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")
router = APIRouter(prefix="/reactportfolio/api/v1", tags=["react"])

@router.get("/getprojectdata", response_model=list[ProjecResponse], status_code=status.HTTP_200_OK)
async def getProjectData() -> list[ProjecResponse]:
    projects = PortfolioProjects.objects().all()
    logger.info("Gating all project data successfully")
    return[ProjecResponse(projectid=i.projectid, techstack= i.techstack, name=i.name, description=i.description, githublink=i.githublink, deploylink=i.deploylink) for i in projects]

@router.post("/addproject", response_model=ProjecResponse, status_code=status.HTTP_201_CREATED)
async def addProject(payload: ProjectRequest) -> ProjecResponse:
    logger.info(f"Project data added {payload.projectid} successfully")
    PortfolioProjects(projectid=payload.projectid, techstack=payload.techstack, name=payload.name, description=payload.description, githublink=payload.githublink, deploylink=payload.deploylink).save()
    return ProjecResponse(projectid=payload.projectid, techstack=payload.techstack, name=payload.name, description=payload.description, githublink=payload.githublink, deploylink=payload.deploylink)

@router.put("/updateproject", response_model=ProjecResponse, status_code=status.HTTP_200_OK)
async def updateProject(payload: ProjectRequest) -> ProjecResponse:
    Project = PortfolioProjects.objects(projectid=payload.projectid).first()
    Project.name = payload.name
    Project.techstack = payload.techstack
    Project.description = payload.description
    Project.githublink = payload.githublink
    Project.deploylink = payload.deploylink
    Project.save()
    logger.info(f"Project updated {payload.projectid} successfully")
    return ProjecResponse(projectid=payload.projectid, techstack=payload.techstack, name=payload.name, description=payload.description, githublink=payload.githublink, deploylink=payload.deploylink)

@router.delete("/deleteproject", response_model=ProjecDeleteResponse, status_code=status.HTTP_200_OK)
async def deleteProject(payload: ProjectRequest) -> ProjecDeleteResponse:
    deleted = PortfolioProjects.objects(projectid=payload.projectid).delete()
    if deleted == 0:
        logger.info(f"Project not found {payload.projectid}")
        raise HTTPException(status_code=404, detail="Project not found")
    logger.info(f"Project deleted {payload.projectid} successfully")
    return ProjecDeleteResponse(projectid=payload.projectid, massage="project record deleted successfully")

@router.post("/savecontactmassage", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
async def saveContactMassage(payload: InitContactMessageRequest) -> ContactMessageResponse:
    userid = generateId()
    ContactMessages(userid=userid, fullname = payload.fullname, email = payload.email, message = payload.message).save()
    logger.info(f"User massage saved successfully {userid}")
    return ContactMessageResponse(userid=userid, fullname=payload.fullname, email=payload.email, message=payload.message)

@router.get("/getcontactmassage", response_model=list[ContactMessageResponse], status_code=status.HTTP_200_OK)
async def getContactMassage() -> list[ContactMessageResponse]:
    contactMassages = ContactMessages.objects().all()
    if contactMassages is None:
        raise HTTPException(status_code= status.HTTP_404_NOT_FOUND, detail="DataBase was empty or network not connected.")
    logger.info("Gating all user massage successfully")
    return[ContactMessageResponse(userid= i.userid, fullname=i.fullname, email=i.email, message=i.message) for i in contactMassages]

@router.delete("/deletecontactmassage", response_model=ContactMessageDeleteResponse, status_code=status.HTTP_200_OK)
async def deleteContactmassage(payload: ContactMessageRequest) -> ContactMessageDeleteResponse:
    deleted = ContactMessages.objects(userid=payload.userid).delete()
    if deleted == 0:
        logger.info(f"Contact massages not found {payload.userid}")
        raise HTTPException(status_code=404, detail="Contact massages not found")
    logger.info(f"Contact massages deleted {payload.userid} successfully")
    return ContactMessageDeleteResponse(userid=payload.userid, message="User record deleted successfully")

@router.post("/login", response_model=AdminCredentialsResponse, status_code=status.HTTP_202_ACCEPTED)
async def login(payload: AdminCredentialsRequest) -> AdminCredentialsResponse:
    User = AdminCredentials.objects(username=payload.username).first()
    if not User: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User unauthorized.")
    if not verifyPassworad(rawPassworad=payload.password, hashPassworad=User.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User unauthorized or password dose not match!")
    User.islogin = True
    User.save()
    return AdminCredentialsResponse(user=User.user, username=payload.username, isadmin=True, message="welcome srijan ray!!")

@router.get("/logout", response_model=AdminStausResponse, status_code=status.HTTP_200_OK)
async def logout() -> AdminStausResponse:
    User = AdminCredentials.objects(username="srijan ray").first()
    if not User: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User unauthorized.")
    User.islogin = False
    User.save()
    return AdminStausResponse(user= User.user, islogin= User.islogin, username=User.username)