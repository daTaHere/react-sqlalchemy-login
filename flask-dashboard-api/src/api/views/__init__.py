from flask import session

# Transform schema
def return_user(result):
    user = result.to_dict()
    del user['password']
    # del user['time_updated']
    return user


# attach severside cookie
def login_user(user_id):
    session['user_id'] = user_id


def logout_user():
    session.pop('user_id')
