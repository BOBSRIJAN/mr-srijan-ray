from pydantic import BaseModel

class ProjectRequest(BaseModel):
    projectid: str 
    name: str
    description: str
    githublink: str
    deploylink: str | None = None
    
    def __str__(self):
        return f"user id is {self.name}"
    
class ProjecResponse(BaseModel):
    projectid: str 
    name: str
    description: str
    githublink: str 
    deploylink: str | None = None
    
    def __str__(self):
        return f"user id is {self.name}"
    
class ProjecDeleteResponse(BaseModel):
    projectid: str
    massage: str
    
    def __str__(self):
        return f"user id is {self.projectid}"

class InitContactMassageRequest(BaseModel):
    fullname: str
    email: str
    massage: str

    def __str__(self):
        return f"user id is {self.fullname}"

class ContactMassageRequest(BaseModel):
    userid: str
    fullname: str
    email: str
    massage: str

    def __str__(self):
        return f"user id is {self.fullname}"
    
class ContactMassageResponse(BaseModel):
    userid: str
    fullname: str 
    email: str 
    massage: str

    def __str__(self):
        return f"user id is {self.fullname}"

class ContactMassageDeleteResponse(BaseModel):
    userid: str
    massage: str
    
    def __str__(self):
        return f"user id is {self.userid}"
    
class AdminCredentialsRequest(BaseModel):
    username: str
    password: str
    
class AdminCredentialsResponse(BaseModel):
    user: str
    isadmin: bool
    username: str
    massage: str 

class AdminStausResponse(BaseModel):
    user: str
    islogin: bool
    username: str