from graphene_sqlalchemy import SQLAlchemyObjectType
from app.models import Task, User
from app import db
import graphene

class TaskObject(SQLAlchemyObjectType):
   class Meta:
       model = Task

'''
'''
class InsertTask(graphene.Mutation):
    id = graphene.Int()
    title = graphene.String()
    description = graphene.String()
    createdBy = graphene.Int()
    status = graphene.String()

    class Arguments:
        id= graphene.Int()
        title = graphene.String()
        description = graphene.String()
        createdBy = graphene.Int()

    def mutate(self, info, id, title, createdBy, description=None):
        task = Task(
            id=id,
            title=title,
            description=description,
            created_by=createdBy,
            status="incomplete"
        )
        db.session.add(Task)
        db.session.commit()
        return InsertTask(id=task.id,
                          title=task.title,
                          description=task.description,
                          createdBy=task.created_by,
                          status=task.status
                          )
