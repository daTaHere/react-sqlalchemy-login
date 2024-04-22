# Setup Flask Application Workspace

```shell
data@data-virtual-machine:/home/data$ mkdir react-dashboard-app

data@data-virtual-machine:/home/data/react-dashboard-app$ git clone https://github.com/miguelgrinberg/react-flask-app.git

data@data-virtual-machine:~/react-dashboard-app$ git clone https://github.com/miguelgrinberg/react-flask-app.git

data@data-virtual-machine:~/react-dashboard-app$ mkdir flask-dashboard-api

data@data-virtual-machine:~/react-dashboard-app$ cd flask-dashboard-api

data@data-virtual-machine:~/react-dashboard-app/flask-dashboard-api$ python3 -m venv venv

data@data-virtual-machine:~/react-dashboard-app/flask-dashboard-api$ 

source venv/bin/activate

(venv) data@data-virtual-machine:~/react-dashboard-app/flask-dashboard-api$ pip install flask python-dotenv

(venv) data@data-virtual-machine:~/react-dashboard-app/react-flask-app$ mv api ../flask-dashboard-api/
```

### Update package.json "script" run vitual environment
    before:    
        "start-api": "cd api && venv/bin/flask run --no-debugger",
    after:
        "start-api": "/home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger",

```shell
[!] (venv) data@data-virtual-machine:~/react-dashboard-app/react-flask-app$ /home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger
        
        **** FLASK_APP = is not defined *****

    dashboard-api/venv/bin/flask run --no-debugger
    Usage: flask run [OPTIONS]
    Try 'flask run --help' for help.

    Error: Could not locate a Flask application. 
    Use the 'flask --app' option, 'FLASK_APP' environment variable, 
    or a 'wsgi.py' or 'app.py' file in the current directory.
```

```shell
[!] **(venv) data@data-virtual-machine:~/react-dashboard-app/react-flask-app$** `/home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger`
    
    export FLASK_APP=api.py

    dashboard-api/venv/bin/flask run --no-debugger
    Usage: flask run [OPTIONS]
    Try 'flask run --help' for help.

    Error: Could not import 'api'.
```

```shell
[!] (venv) data@data-virtual-machine:~/react-dashboard-app/react-flask-app$ /home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger

    export FLASK_APP=flask-dashboard-api/api.py

    dashboard-api/venv/bin/flask run --no-debugger
    Usage: flask run [OPTIONS]
    Try 'flask run --help' for help.

    Error: Could not import 'api'.
```

```shell
[!] (venv) data@data-virtual-machine:~/react-dashboard-app/react-flask-app$ /home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger

    export FLASK_APP=/home/data/react-dashboard-app/flask-dashboard-api/api
    
    dashboard-api/venv/bin/flask run --no-debugger
    Usage: flask run [OPTIONS]
    Try 'flask run --help' for help.

    Error: Failed to find Flask application or factory in module 'api'. Use 'api:name' to specify one.
```

```shell
[!] (venv) data@data-virtual-machine:~/react-dashboard-app/react-flask-app$ /home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger

    export FLASK_APP=/home/data/react-dashboard-app/flask-dashboard-api/api.py

    dashboard-api/venv/bin/flask run --no-debugger
    Usage: flask run [OPTIONS]
    Try 'flask run --help' for help.

    Error: Failed to find Flask application or factory in module 'api'. Use 'api:name' to specify one.
```

# Getting Started
These are the different ways to run our Flask application.
1. **Prerequisite setting environment variable.**

    1a. Set the environment variable for `FLASK_APP` to the path/directory where the `api.py` lives/exits in:

    * Run the following command to set the `FLASK_APP` environment variable:

        ```shell
        export FLASK_APP=/home/data/react-dashboard-app/flask-dashboard-api/api/api.py
        ```

    1b. Set the `FLASK_APP` environment variable within the `.flaskenv` file. See example below

    * `touch /full/path/to/.flaskenv`
        
    * `code .flaskenv`
        ```shell
        FLASK_APP=/full/path/to/api.py
        FLASK_ENV=development
        ```
    1c. We can pass in the `FLASK_APP` environment variable as a parameter to the `flask` command

    * `/path/to/venv/bin/flask --env-file /full/path/to/.flaskenv run --no-debugger`

#### Ways to start the Flask application in different Ways
### Case 1
```shell
(venv) data@data-virtual-machine:~/react-dashboard-app/react-flask-app$ /home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger

    export FLASK_APP=/home/data/react-dashboard-app/flask-dashboard-api/api/api.py

    * Serving Flask app '/home/data/react-dashboard-app/flask-dashboard-api/api/api.py'
    * Debug mode: off
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    * Running on http://127.0.0.1:5000
    Press CTRL+C to quit
```

### Case 2
```shell
data@data-virtual-machine$ export FLASK_APP=/home/data/react-dashboard-app/flask-dashboard-api/api/api.py && /home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger
    
    * Serving Flask app '/home/data/react-dashboard-app/flask-dashboard-api/api/api.py'
    * Debug mode: off
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    * Running on http://127.0.0.1:5000
    Press CTRL+C to quit
```

### Case 3
```shell
data@data-virtual-machine$/home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask -e /home/data/react-dashboard-app/flask-dashboard-api/api/.flaskenv run --no-debugger

    * Serving Flask app '/home/data/react-dashboard-app/flask-dashboard-api/api/api.py'
    * Debug mode: off
    WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
    * Running on http://127.0.0.1:5000
    Press CTRL+C to quit
```

### Case 4
```shell
(venv) data@data-virtual-machine:~/react-dashboard-app/flask-dashboard-api/api$ /home/data/react-dashboard-app/flask-dashboard-api/venv/bin/flask run --no-debugger
    FLASK_APP = api.py which is defined in "/home/data/react-dashboard-app/flask-dashboard-api/api/.flaskenv"
```



# Setting up React application

```shell
data@data-virtual-machine:~/react-dashboard-app$ npx create-react-app react-dashview-app

data@data-virtual-machine:~/react-dashboard-app$ cd react-dashview-app

data@data-virtual-machine:~react-dashboard-app$react-dashview-app$ yarn start
```

#### Application will run on http://localhost:3000 and display acknowlegment.
```shell
Compiled successfully!

You can now view react-dashview-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.103:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully

```

#### Installing Axios Libirary ()=> "http request" 
```shell
data@data-virtual-machine:~/react-dashboard-app/react-dashview-app$ npm install axios
```
#### Example code
```shell
import axios from 'axios';

// Make a request for a user with a given ID
axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
```