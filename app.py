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
import os

# For auth0
import json
from os import environ as env
from urllib.parse import quote_plus, urlencode
from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv

ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)


uri = "mongodb+srv://adelmuursepp:QHacks2024@cluster0.9xcjq25.mongodb.net/movie-api-db?retryWrites=true&w=majority"

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb+srv://adelmuursepp:QHacks2024@cluster0.9xcjq25.mongodb.net/movie-api-db?retryWrites=true&w=majority"
app.secret_key = env.get("APP_SECRET_KEY")
mongo = PyMongo(app)
oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration'
)

@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token
    return redirect("/")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://" + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )

@app.route("/")
def home():
    # Check if user is logged in
    if 'user' not in session:
        # User is not logged in, redirect to login page
        return render_template("login.html")
    else:
        # User is logged in, show the index page
        return render_template("index.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))
    return render_template("index.html", session=session.get('user'), pretty=json.dumps(session.get('user'), indent=4))


# @app.route('/')
# def home():
#     # Access a collection
#     collection = mongo.db.movies
    
#     # Perform a query
#     documents = collection.find({})
#     results = [{k: str(v) for k, v in document.items()} for document in documents]
    
#     return jsonify(results)
#     # # Access a collection in the database
#     # collection = db['movies']
    
#     # # Perform a query (retrieve all documents)
#     # documents = list(collection.find({}))
    
#     # # Convert documents to a list of dicts (if using ObjectId, you need to convert it to string)
#     # results = [{k: str(v) for k, v in document.items()} for document in documents]
    
#     # return jsonify(results)
#     # return render_template('index.html')

@app.route('/scan', methods=['POST'])
def scan():
    if 'barcode_image' not in request.files:
        return 'No file part', 400
    file = request.files['barcode_image']
    if file.filename == '':
        return 'No selected file', 400
    if file:
        image = Image.open(io.BytesIO(file.read()))
        barcodes = decode(image)
        barcode_number = barcodes[0].data.decode("utf-8")
        response = requests.get(f'https://world.openfoodfacts.org/api/v2/product/{barcode_number}')
        if response.status_code == 200:
            product_data = response.json()
            # You can modify this return statement to display the data as you prefer
            return jsonify(product_data)
        else:
            return 'Product not found or API error', 404

        return '<br>'.join([f'Barcode Type: {barcode.type}, Data: {barcode.data.decode("utf-8")}' for barcode in barcodes])


@app.route('/upload', methods=['POST'])
def file_upload():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    if file:
        image = Image.open(io.BytesIO(file.read()))
        barcodes = decode(image)
        barcode_number = barcodes[0].data.decode("utf-8")
        response = requests.get(f'https://world.openfoodfacts.org/api/v2/product/{barcode_number}')
        if response.status_code == 200:
            product_data = response.json()
            # You can modify this return statement to display the data as you prefer
            return jsonify(product_data)
        else:
            return 'Product not found or API error', 404

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("PORT", 3000))
# if __name__ == '__main__':
#     app.run(debug=True)