from pydantic import BaseModel

class ProjectRequest(BaseModel):
    projectid: int 
    name: str
    description: str
    githublink: str
    deploylink: str | None = None
    
    def __str__(self):
        return f"user id is {self.name}"
    
class ProjecResponse(BaseModel):
    projectid: int 
    name: str
    description: str
    githublink: str 
    deploylink: str | None = None
    
    def __str__(self):
        return f"user id is {self.name}"
    
class ProjecDeleteResponse(BaseModel):
    projectid: int 
    massage: str
    
    def __str__(self):
        return f"user id is {self.projectid}"
    
class ContactMassageRequest(BaseModel):
    fullmane: str
    email: str
    massages: str

    def __str__(self):
        return f"user id is {self.fullmane}"
    
class ContactMassageResponse(BaseModel):
    fullmane: str 
    email: str 
    massages: str

    def __str__(self):
        return f"user id is {self.fullmane}"