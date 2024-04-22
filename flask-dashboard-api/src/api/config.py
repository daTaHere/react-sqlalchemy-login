import os
import redis
import logging
from dotenv import load_dotenv
load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ['SECRET_KEY']
    
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = os.environ['DB_CONNECTION_STRING']
    
    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(os.environ['REDIS_URL'])
    # SESSION_REDIS = redis.from_url('redis://127.0.0.1:6379')

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_SUPPRESS_SEND = False
    MAIL_USERNAME = 'datah977@gmail.com'
    MAIL_PASSWORD = 'exlr jzsm jvis diri'
    MAIL_DEFAULT_SENDER = ['datahere@socalpy.com']

    def configure_logging():
        # Set SQLAlchemy logging level to DEBUG
        logging.getLogger('sqlalchemy.engine').setLevel(logging.DEBUG)

        # Optionally, you can also enable logging of SQL statements
        logging.getLogger('sqlalchemy.dialects').setLevel(logging.DEBUG)

        