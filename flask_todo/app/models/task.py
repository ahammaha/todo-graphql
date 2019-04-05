from app import db

class Task(db.Model):
    """User Table."""

    __tablename__ = "task"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text, nullable=False, unique=False)
    description = db.Column(db.Text, nullable=False, unique=False)
    created_by = db.Column(db.Integer, db.ForeignKey('user.id'))
    status = db.Column(db.Text, nullable=False, unique=False)
