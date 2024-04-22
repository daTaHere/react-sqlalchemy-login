from api.models.user import User
from api.views import return_user


# Query user by email
def find_user_by_email(user_email):
    user = User.query.filter_by(email=user_email).first()
    return user

#Query user by id
def find_user_by_id(user_id):
    try:
        user = User.query.filter_by(id=user_id).first()
        result = return_user(user)
        return result
    except Exception as e:
        raise Exception(str(e))