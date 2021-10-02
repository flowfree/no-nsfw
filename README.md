No NSFW 
=======
Sample photos app that auto-detect NSFW images. The NSFW classifier is using the model provided 
by <a href="https://github.com/GantMan"><strong>@GantMan</strong></a> in this repository: 
https://github.com/GantMan/nsfw_model

The software stack: React, Django, TensorFlow.

Run the app on local machine
----------------------------
Ensure that you have Python 3.8+, Pipenv, and recent Node.js installed on your local machine.

**To run the backend server:**

1.  Change to the `backend/` directory and install the dependencies:

        cd backend
        pipenv install --dev

1.  Run database migration:

        pipenv run python manage.py migrate

1.  Run the development server:

        pipenv run python manage.py runserver

    It will run Django's development server on port 8000.
        
1.  Open `http://localhost:8000` with your browser to see the welcome message.

1.  (Optional) run the unit tests:

        pipenv run pytest

**To run the frontend app:**

1.  Change to the `frontend/` directory and install the dependencies:

        cd frontend
        yarn install

1.  Run the server:

        yarn start

1.  Open `http://localhost:3000` with your browser to see the frontend app.

1.  (Optional) run the unit tests:

        yarn test

Run the app on local machine with Docker
----------------------------------------

Ensure that you have Docker and Docker Compose installed on your machine. Build and 
run the containers with:

    docker-compose build
    docker-compose up

Then open `http://localhost:3000` with your browser to see the frontend app.

If you want to run on machine other than localhost (e.g: EC2 instance), you need to 
set the `FRONTEND_URL` and `BACKEND_URL` environment variables so both frontend and 
backend know how to talk to each other.

For example, if the public IP address of your EC2 instance is `1.2.3.4` then you need 
to run the app with:

    export FRONTEND_URL=http://1.2.3.4:3000 
    export BACKEND_URL=http://1.2.3.4:8000 
    docker-compose build
    docker-compose up

The app will be available at `http://1.2.3.4:3000`.

License
-------
MIT
