from flask import Flask, redirect, request, render_template, jsonify, session, url_for
from pyzbar.pyzbar import decode
from PIL import Image
import io
import requests
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from flask_pymongo import PyMongo
from dotenv import load_dotenv
from jose import jwt, jwk
from functools import wraps

from PIL import Image
import io
import os
import requests
from pyzbar.pyzbar import decode


# For auth0
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
app.config["MONGO_URI"] = "mongodb+srv://daniel:QHacker2024@pizzamind.bxk8emc.mongodb.net/pizzamind?retryWrites=true&w=majority"
app.secret_key = env.get("APP_SECRET_KEY")
mongo = PyMongo(app)
oauth = OAuth(app)

AUTH0_DOMAIN = env.get('AUTH0_DOMAIN')
API_AUDIENCE = 'pizzamind-backend'
ALGORITHMS = ['RS256']

def get_jwks():
    jwks_url = f'https://{AUTH0_DOMAIN}/.well-known/jwks.json'
    jwks_resp = requests.get(jwks_url).json()
    return jwks_resp

def get_public_key(token):
    jwks = get_jwks()
    unverified_header = jwt.get_unverified_header(token)
    rsa_key = {}
    if 'kid' not in unverified_header:
        raise Exception('Authorization malformed.')

    for key in jwks['keys']:
        if key['kid'] == unverified_header['kid']:
            rsa_key = {
                'kty': key['kty'],
                'kid': key['kid'],
                'use': key['use'],
                'n': key['n'],
                'e': key['e']
            }
    if rsa_key:
        return jwk.construct(rsa_key, ALGORITHMS[0])
    raise Exception('Public key not found.')

def get_token_auth_header():
    auth_header = request.headers.get('Authorization', None)
    if not auth_header:
        raise Exception('Authorization header is missing.')

    parts = auth_header.split()

    if parts[0].lower() != 'bearer':
        raise Exception('Authorization header must start with Bearer.')
    elif len(parts) == 1:
        raise Exception('Token not found.')
    elif len(parts) > 2:
        raise Exception('Authorization header must be Bearer token.')

    token = parts[1]
    return token


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        public_key = get_public_key(token)
        try:
            payload = jwt.decode(
                token,
                public_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer=f"https://{AUTH0_DOMAIN}/"
            )
        except jwt.JWTError as e:
            return jsonify({'message': 'Token is invalid'}), 401
        
        # Your route's logic here...
        
        return f(payload, *args, **kwargs)
    return decorated


@token_required
@app.route('/upload', methods=['POST'])
def file_upload():
    UPLOAD_FOLDER = 'uploads'  # Define the folder where you want to save images
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)  # Create the directory if it does not exist

    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400

    if file:
        # Save the file to the uploads folder
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)
        print(f"File saved to {filepath}")

        try:
            # Open the saved image file for reading
            with open(filepath, 'rb') as image_file:
                image = Image.open(image_file)
                barcodes = decode(image)

                # Ensure at least one barcode was found
                if not barcodes:
                    return jsonify({'message': 'No barcodes found'}), 404

                barcode_number = barcodes[0].data.decode("utf-8")
                print(f"Decoded barcode number: {barcode_number}")

                # Query the OpenFoodFacts API with the decoded barcode
                response = requests.get(f'https://world.openfoodfacts.org/api/v2/product/{barcode_number}')
                if response.status_code == 200:
                    product_data = response.json()
                    return jsonify(product_data)
                else:
                    return jsonify({'message': 'Product not found or API error'}), response.status_code
        except IOError:
            return jsonify({'message': 'Error opening or reading image file'}), 500


# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=env.get("PORT", 3000))
if __name__ == '__main__':
    app.run(debug=True)



# oauth in flask, not needed at the moment
# oauth.register(
#     "auth0",
#     client_id=env.get("AUTH0_CLIENT_ID"),
#     client_secret=env.get("AUTH0_CLIENT_SECRET"),
#     client_kwargs={
#         "scope": "openid profile email",
#     },
#     server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
# )



# @app.route("/callback", methods=["GET", "POST"])
# def callback():
#     token = oauth.auth0.authorize_access_token()
#     session["user"] = token
#     return redirect("/")


# @app.route("/login")
# def login():
#     return oauth.auth0.authorize_redirect(
#         redirect_uri=url_for("callback", _external=True)
#     )

# @app.route("/logout")
# def logout():
#     session.clear()
#     return redirect(
#         "https://" + env.get("AUTH0_DOMAIN")
#         + "/v2/logout?"
#         + urlencode(
#             {
#                 "returnTo": url_for("home", _external=True),
#                 "client_id": env.get("AUTH0_CLIENT_ID"),
#             },
#             quote_via=quote_plus,
#         )
# #     )

# @app.route("/")
# def home():
#     # Check if user is logged in
#     if 'user' not in session:
#         # User is not logged in, redirect to login page
#         return render_template("login.html")
#     else:
#         # User is logged in, show the index page
#         return render_template("index.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))


# @app.route('/')
# def home():
#     # Access a collection
#     collection = mongo.db.users
    
#     # Perform a query
#     documents = collection.find({})
#     results = [{k: str(v) for k, v in document.items()} for document in documents]
    
#     return jsonify(results)
    # # Access a collection in the database
    # collection = db['movies']
    
    # # Perform a query (retrieve all documents)
    # documents = list(collection.find({}))
    
    # # Convert documents to a list of dicts (if using ObjectId, you need to convert it to string)
    # results = [{k: str(v) for k, v in document.items()} for document in documents]
    
    # return jsonify(results)
    # return render_template('index.html')

# @app.route('/scan', methods=['POST'])
# def scan():
#     if 'barcode_image' not in request.files:
#         return 'No file part', 400
#     file = request.files['barcode_image']
#     if file.filename == '':
#         return 'No selected file', 400
#     if file:
#         image = Image.open(io.BytesIO(file.read()))
#         barcodes = decode(image)
#         barcode_number = barcodes[0].data.decode("utf-8")
#         response = requests.get(f'https://world.openfoodfacts.org/api/v2/product/{barcode_number}')
#         if response.status_code == 200:
#             product_data = response.json()
#             # You can modify this return statement to display the data as you prefer
#             return jsonify(product_data)
#         else:
#             return 'Product not found or API error', 404

#         return '<br>'.join([f'Barcode Type: {barcode.type}, Data: {barcode.data.decode("utf-8")}' for barcode in barcodes])


