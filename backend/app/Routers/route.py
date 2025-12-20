from fastapi import (
    APIRouter, 
    HTTPException, 
    status,
)
from app.Model.models import (
    PortfolioProjects,
    ContactMassages,
)
from app.Schemas.RequestResponseModel import (
    ProjectRequest,
    ProjecResponse,
    ContactMassageRequest,
    ContactMassageResponse,
    ProjecDeleteResponse,
)
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn")
router = APIRouter(prefix="/reactportfolio/api/v1", tags=["react"])

@router.get("/getprojectdata", response_model=list[ProjecResponse], status_code=status.HTTP_200_OK)
async def getprojectdata() -> ProjecResponse:
    projects = PortfolioProjects.objects().all()
    logger.info("gating all project data successfully")
    return[ProjecResponse(projectid=i.projectid, name=i.name, description=i.description, githublink=i.githublink, deploylink=i.deploylink) for i in projects]

@router.post("/addproject", response_model=ProjecResponse, status_code=status.HTTP_201_CREATED)
async def addproject(payload: ProjectRequest) -> ProjecResponse:
    logger.info("project data added successfully")
    PortfolioProjects(projectid=payload.projectid, name=payload.name, description=payload.description, githublink=payload.githublink, deploylink=payload.deploylink).save()
    return ProjecResponse(projectid=payload.projectid, name=payload.name, description=payload.description, githublink=payload.githublink, deploylink=payload.deploylink)

@router.put("/updateproject", response_model=ProjecResponse, status_code=status.HTTP_200_OK)
async def updateproject(payload: ProjectRequest) -> ProjecResponse:
    Project = PortfolioProjects.objects(projectid=payload.projectid).first()
    Project.name = payload.name
    Project.description = payload.description
    Project.githublink = payload.githublink
    Project.deploylink = payload.deploylink
    Project.save()
    logger.info("project updated successfully")
    return ProjecResponse(projectid=payload.projectid, name=payload.name, description=payload.description, githublink=payload.githublink, deploylink=payload.deploylink)

@router.delete("/deleteproject", response_model=ProjecDeleteResponse, status_code=status.HTTP_200_OK)
async def deleteproject(payload: ProjectRequest) -> ProjecDeleteResponse:
    deleted = PortfolioProjects.objects(projectid=payload.projectid).delete()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjecDeleteResponse(projectid=payload.projectid, massage="project record deleted successfully")

