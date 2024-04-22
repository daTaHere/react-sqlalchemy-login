from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from sqlalchemy.orm import DeclarativeBase

from uuid import uuid4

db = SQLAlchemy()
bcrypt = Bcrypt()

def get_uuid():
    id = uuid4().hex
    return str(id)[:18]


def initialize_bcrypt(app):
   return Bcrypt(app)

class Base(DeclarativeBase): # nopragma
  pass
