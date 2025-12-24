from pydantic import BaseModel

class ProjectRequest(BaseModel):
    projectid: str 
    techstack: list[str]
    name: str
    description: str
    githublink: str
    deploylink: str | None = None
    
    def __str__(self):
        return f"user id is {self.name}"
    
class ProjecResponse(BaseModel):
    projectid: str 
    techstack: list[str]
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

class InitContactMessageRequest(BaseModel):
    fullname: str
    email: str
    message: str

    def __str__(self):
        return f"user id is {self.fullname}"

class ContactMessageRequest(BaseModel):
    userid: str
    fullname: str
    email: str
    message: str

    def __str__(self):
        return f"user id is {self.fullname}"
    
class ContactMessageResponse(BaseModel):
    userid: str
    fullname: str 
    email: str 
    message: str

    def __str__(self):
        return f"user id is {self.fullname}"

class ContactMessageDeleteResponse(BaseModel):
    userid: str
    message: str
    
    def __str__(self):
        return f"user id is {self.userid}"
    
class AdminCredentialsRequest(BaseModel):
    username: str
    password: str
    
class AdminCredentialsResponse(BaseModel):
    user: str
    isadmin: bool
    username: str
    message: str 

class AdminStausResponse(BaseModel):
    user: str
    islogin: bool
    username: str