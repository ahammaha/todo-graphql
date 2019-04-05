from graphene_sqlalchemy import SQLAlchemyObjectType
from app.models import User
from app import db
import graphene

class UserObject(SQLAlchemyObjectType):
   class Meta:
       model = User

'''
mutation{
  insertUser(id:3, name:"xyz", email:"xyz@gmail.com"){
      id
      name
      email
  }
}
'''
class InsertUser(graphene.Mutation):
    id = graphene.Int()
    name = graphene.String()
    email = graphene.String()

    class Arguments:
        id= graphene.Int()
        name = graphene.String()
        email = graphene.String()

    def mutate(self, info, id, email, name):
        user = User(id=id, email=email, name=name)
        db.session.add(user)
        db.session.commit()
        return InsertUser(
            id=id,
            name=name,
            email=email
        )