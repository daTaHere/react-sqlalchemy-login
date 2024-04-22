from . import db, get_uuid, bcrypt
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, func, Boolean
from sqlalchemy_serializer import SerializerMixin

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    serialize_rules = ( 'password','time_updated' )

    id: Mapped[str] = mapped_column(String(19),primary_key=True, unique=True, default=get_uuid)
    first_name: Mapped[str] = mapped_column(String(28),nullable=False)
    middle_initial: Mapped[str] = mapped_column(String(1),nullable=True)
    last_name: Mapped[str] = mapped_column(String(28),nullable=False)
    username: Mapped[str] = mapped_column(String(28),unique=True,nullable=False)
    email: Mapped[str] = mapped_column(String(345),unique=True,nullable=False)
    email_comfirmed: Mapped[bool] = mapped_column(Boolean(),nullable=False,default=False)
    password: Mapped[str] = mapped_column(String(255),nullable=False)
    activation_token: Mapped[str] = mapped_column(String(225),nullable=True)
    password_token: Mapped[str] = mapped_column(String(255),nullable=True)
    time_created = mapped_column(DateTime(timezone=True), server_default=func.now())
    time_updated = mapped_column(DateTime(timezone=True), onupdate=func.now())


    def __init__(self, record,):
        self.email = record['email']
        self.username = record['username']
        self.first_name = record['first_name']
        self.last_name = record['last_name']
        self.middle_initial = record['middle_initial']
        self.password = User.hash_passwd(record['password'])


    def hash_passwd(passwd):
        return  bcrypt.generate_password_hash(passwd)