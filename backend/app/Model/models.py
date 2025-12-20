import mongoengine as me

class PortfolioProjects(me.Document):
    projectid = me.IntField(required=True, unique=True)
    name = me.StringField(required=True)
    description = me.StringField(required=True)
    githublink = me.StringField(required=True)
    deploylink = me.StringField(required=True)

class ContactMassages(me.Document): 
    fullmane = me.StringField(required=True)
    email = me.StringField(required=True)
    massages = me.StringField(required=True)