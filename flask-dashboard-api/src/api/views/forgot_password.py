from . import return_user
from api.utilities import get_user
from api.models.user import User
from api.api import db, jsonify

# Handle user creds and insert TEMPORY Password
def bind_temp_pw(email,temp):
    try:
        user = get_user.find_user_by_email(email)
        user.temp_password = temp
        db.session.commit()
        return temp
    except:
        raise ValueError('Account does not exist',402) 
    
# Query user by id
def find_user_by_id(user_id):
    user = User.query.filter_by(id=user_id).first()
    user =return_user(user)
    return user


# Store reset token
def store_token( user,token):
    user.password_token=token
    db.session.commit();


# Set new pw
def reset_pw(payload):
    try:
        pw = User.hash_passwd(payload['new_password'])
        user = User.query.filter_by(id=payload['user_id']).first()
        user.password = pw
        user.password_token = None
        db.session.commit()
        return  'Resource Updated', 204
    except Exception as e:
        db.session.rollback()
        return jsonify({'Error': str(e)}), 500