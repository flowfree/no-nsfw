NSFW Filterer
=============
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

2.  Run the development server:

        pipenv run python manage.py runserver

    It will run Django's development server on port 8000.
        
3.  Open `http://localhost:8000` with your browser to see the welcome message.

4.  (Optional) run the unit tests:

        pipenv run pytest

**To run the frontend app:**

1.  Change to the `frontend/` directory and install the dependencies:

        cd frontend
        yarn install

2.  Run the server:

        yarn start

3.  Open `http://localhost:3000` with your browser to see the frontend app.

4.  (Optional) run the unit tests:

        yarn test


License
-------
MIT
