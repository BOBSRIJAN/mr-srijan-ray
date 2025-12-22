import mongoengine as me
import datetime
class PortfolioProjects(me.Document):
    projectid = me.StringField(required=True, unique=True)
    name = me.StringField(required=True)
    description = me.StringField(required=True)
    githublink = me.StringField(required=True)
    deploylink = me.StringField(required=True)
    
    def __str__(self):
        return self.name

class ContactMassages(me.Document):
    userid = me.StringField(required=True)
    fullname = me.StringField(required=True)
    email = me.StringField(required=True)
    massage = me.StringField(required=True)
    
    def __str__(self):
        return self.fullname

class AdminCredentials(me.Document):
    user = me.StringField(default="Admin" )
    username = me.StringField(required=True, unique=True)
    password = me.StringField(required=True, unique=True)
    islogin = me.BooleanField(default=False)
    timestamp = me.DateTimeField(default=datetime.datetime.utcnow)