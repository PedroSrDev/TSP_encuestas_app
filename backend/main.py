from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # permitir Angular frontend

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')

    if email == "admin@admin.com": # just for demo
        return jsonify({
            "status": "success",
            "message": "Login ok",
            "email": email
        })
    else:
        return jsonify({
            "status": "error",
            "message": "Invalid credentials"
        }), 401

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
