from flask import Flask, request, render_template
from pyzbar.pyzbar import decode
from PIL import Image
import io

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

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
        return '<br>'.join([f'Barcode Type: {barcode.type}, Data: {barcode.data.decode("utf-8")}' for barcode in barcodes])

if __name__ == '__main__':
    app.run(debug=True)