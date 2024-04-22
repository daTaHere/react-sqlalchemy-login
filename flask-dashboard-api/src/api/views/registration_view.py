from api.models.user import User
from flask import jsonify
from . import return_user
from api.api import db


# Attempt to add user and return a response
def create_users (payload):
    user_exist = User.query.filter_by(email=payload['email']).first()
    username_exist = User.query.filter_by(username=payload['username']).first()
    print(username_exist)
    if user_exist is None and username_exist is None:
        try:
            new_user = User(payload)
            db.session.add(new_user)
            db.session.commit()
            result = return_user(new_user)
            response = result
        except Exception as e:
            db.session.rollback()
            return jsonify({'Error': str(e)}), 500
        finally:
             db.session.close()
    else:
        return 'Account already exist.', 409
    return response