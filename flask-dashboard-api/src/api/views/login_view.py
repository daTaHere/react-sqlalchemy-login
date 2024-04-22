from flask import session, jsonify
from api.models.user import User

from api.models import bcrypt
from . import return_user


def check_login(payload):
    login_username = payload['username']
    login_pw = payload['password']
    user_exist = User.query.filter_by(username=login_username).first()

    print(user_exist.email_comfirmed)

    response = None
    if user_exist is not None:
        try:
            pw_hash = bcrypt.check_password_hash(user_exist.password,login_pw)
            if pw_hash and user_exist.email_comfirmed is True:
                result = return_user(user_exist)
                session['user_id'] = result['id']
                response = result, 200
            elif pw_hash:
                response = 'Inactive'
            else:
                return 'Unauthorized! Check credentials and Log in again.', 401
        except Exception as e:
            return jsonify({'error': str(e)}), 401
    else:
        return 'Unauthorized! Check credentials and Log in again.', 401
    return response