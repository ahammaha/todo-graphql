from .schema_user import UserObject, InsertUser
from .schema_task import TaskObject, InsertTask
import graphene
from app import db
from app.models import User, Task

'''
query{
 tasks{
  id
  title
  description
  createdBy
  status
} 
}
'''
class Query(graphene.ObjectType):
    users = graphene.List(UserObject)
    tasks = graphene.List(TaskObject)

    def resolve_users(self, info, **kwargs):
        return db.session.query(User)

    def resolve_tasks(self, info, **kwargs):
        return db.session.query(Task)

class Mutation(graphene.ObjectType):
    insert_task=InsertTask.Field()
    insert_user=InsertUser.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)