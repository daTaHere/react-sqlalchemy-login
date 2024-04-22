from flask import session, jsonify


def get_current_authorization():
    result = None
    is_user = check_user()
    if is_user is not None:
        try:
            result = {'isAuthorize':True}, 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        result = {'isAuthorize':False}, 401
    return result 

# Check for a session cookie
def check_user():
    user_id = session.get('user_id')
    return user_id


# query user data
# def get_user(user_id):
#     user = User.query.filter_by(id=user_id).first()
#     current_user = return_user(user)
#     return current_user