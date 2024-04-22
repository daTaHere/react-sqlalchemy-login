from api.api import db
from api.models.user import User

def set_activation_token(user_id,token):
    user = User.query.filter_by(id=user_id).first()
    if user.email_comfirmed == False:
        user.activation_token = token
        db.session.commit()
    else:
        user.activation_token = None
        db.session.commit()


def activate_user(token):
    user = User.query.filter_by(id=token).first()
    user.email_comfirmed = True
    db.session.commit()
    


