from app import db

class User(db.Model):
    """User Table."""

    __tablename__ = "user"

    id = db.Column(db.Integer, unique=True, primary_key=True)
    name = db.Column(db.Text, nullable=False, unique=False)
    email = db.Column(db.Text, nullable=False, unique=True)
    tasks = db.relationship('Task', backref='tasks', lazy='joined')

    def __init__(self, **kwargs):
        super().__init__(**kwargs)