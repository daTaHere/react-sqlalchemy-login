from .utilities import get_token, user_authorization, get_user
from flask import Flask, request, jsonify, render_template, redirect
from flask_cors import CORS, cross_origin
from flask_mail import Mail, Message

from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature

from .models import db,initialize_bcrypt
from .config import ApplicationConfig

from flask_session import Session
from flask_mail import Mail, Message
from .views import email_confirmed, login_view, registration_view, cpu_io_views, logout_user, forgot_password



app = Flask(__name__)
app.config.from_object(ApplicationConfig)
ApplicationConfig.configure_logging()
CORS(app,resources={r'/*':{'origns':['http://localhost:3000']}},supports_credentials=True,allow_headers=['Content-Type'])

db.init_app(app)
server_session = Session(app)
initialize_bcrypt(app)
mail = Mail(app)

serial = URLSafeTimedSerializer(app.config['SECRET_KEY'])


# send reset password email
def send_temp_pw_email (user_email,token):
    msg = Message(subject='Python Dashboard App', 
                sender=(app.config['MAIL_DEFAULT_SENDER'], 'datahere'),
                  recipients=[user_email])
    msg.html = render_template('pw_reset_email.html',token=token)
    mail.send(msg)
    return ('Reset Email Sent!',200)


# send email confirmation
def email_activation (user_email,user_id):
    token = serial.dumps(user_id,salt='email_confirmed')
    msg = Message(subject='Python Dashboard App', 
                sender=(app.config['MAIL_DEFAULT_SENDER'], 'datahere'),
                  recipients=[user_email])
    msg.html = render_template('acct_activation_email.html',token=token)
    mail.send(msg)
    email_confirmed.set_activation_token(user_id,token)
    return (f'{user_email} sent!',200)


@app.errorhandler(404)
@cross_origin()
def not_found(e):
    return app.send_static_file('index.html')


# Handle new user registration
@app.route('/dashboard/register', methods=['POST'])
def post_user():
    #region    <====== POST REG PATLOAD EXAMPLE
    """
    Example--> payload schema
    -------------------------------
    'email': 'deezNuts2@urface.com',
    'first_name': 'Data',
    'last_name': 'Here',
    'middle_initial': 'A',
    'password': '!111Aaaabb',
    'username': 'dataHere2'
    -------------------------------
    """
    #endregion
    
    payload = request.json.get('payload')
    response = registration_view.create_users( payload )
    user_email = response['email']
    user_id = response['id']
    email_activation(user_email, user_id)

    return jsonify(response), 201
        

# Handle password reset
@app.route('/dashboard/forgot_pw', methods=['POST'])
def request_pw_reset():
    try:
        user_email = request.json.get('payload')
        user = get_user.find_user_by_email(user_email)
        token = serial.dumps(user.id,salt='forgot_password')
        forgot_password.store_token(user,token)
        send_temp_pw_email(user_email, token)
        respond = { 'email':user_email }
    except Exception as e:
        return jsonify({'Error': str(e)}), 401
    
    return respond , 201


# Verify password reset authorization token 
@app.route('/dashboard/forgot_pw_reset/<token>')
def restore_password(token):
    try:
        user_id = serial.loads(token,salt='forgot_password', max_age=250)
        user = forgot_password.find_user_by_id(user_id)
        if(user['password_token'] == token):
            response={}
            response['username'] = user['username']
            response['id'] = user['id']
            return response, 200
        else:
            return 'Resource Not Found', 402
    except SignatureExpired:
        return 'expire',302
    except BadSignature:
        return 'bad',302
    except Exception as e:
        return jsonify({'Error': str(e)})


# Set new PW
@app.route('/dashboard/reset_password', methods=['PUT'])
def update_password():
    data = request.json.get('payload')
    response =forgot_password.reset_pw(data)
    return response


# Handle login
@app.route('/dashboard/login', methods=['POST'])
def login_user():
    user_login = request.json.get('payload')
    response = login_view.check_login(user_login)
    return response
   

# Check user session
@app.route('/dashboard/authorization')
def main():
    response = user_authorization.get_current_authorization()
    return response


# Render cpu read/write output
@app.route('/dashboard/cpu')
def get_data():
    response = cpu_io_views.get_cpu_data()
    return response


# Handle new user email redirect
@app.route('/dashboard/<token>')
def send_email(token):
    try:
        user = serial.loads(token,salt='email_confirmed',max_age=250)
        email_confirmed.activate_user(user)
        return redirect(f'http://localhost:3000/login/{token}')
    except SignatureExpired:    
        return redirect('http://localhost:3000/expire')
    except BadSignature:
        return redirect('http://localhost:3000/bad')
    except Exception as e:
        return jsonify({'Error': str(e)})


# Handle new user activation authorization
@app.route('/dashboard/get_user/<token>')
def verify_user(token):
    try:
        user = get_token.check_activation_token(token)
        if user['activation_token'] == token and user['email_comfirmed'] == True:
            email_confirmed.set_activation_token(user['id'], token)
            return user['username']
        else:
            return "UnAuthorized! This Activation Link is No Longer Valid", 401
    except:
        return "UnAuthorized! This Activation Link is No Longer Valid", 401

# Close session
@app.route('/dashboard/logout', methods=['POST'])
def logout():
    logout_user()
    return 'User has been logout.', 200


# Send email acct verification
@app.route('/dashboard/activation_request', methods=['POST'])
def send_activation():
    user_email = request.json.get('email')
    user = get_user.find_user_by_email(user_email)
    email_activation(user.email, user.id)
    return 'Activation sent', 200


with app.app_context():
    db.create_all()    

if __name__ == "__main__":
    app.run()
 