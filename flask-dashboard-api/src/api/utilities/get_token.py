from api.models.user import User
from api.views import return_user


def check_activation_token(token):
    result = {}
    user = User.query.filter_by(activation_token=token).first()
    result['username'] = user.username
    result['activation_token'] = user.activation_token
    result['id'] = user.id
    user = return_user(user)
    return user
