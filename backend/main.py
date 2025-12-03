from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# =========================================================
# AUTH & REGISTRO DE EMPRESA
# =========================================================
@app.route('/register-company', methods=['POST'])
def register_company():
    data = request.get_json()
    
    return jsonify({
        "status": "success",
        "message": "Company registered successfully",
        "idEmpresa": 1,
        "idUsuario": 1
    }), 201


# =========================================================
# LOGIN (tu endpoint original)
# =========================================================
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')

    if email == "admin@admin.com":
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


# =========================================================
# USERS - Gestión de Usuarios
# =========================================================
@app.route('/users', methods=['GET'])
def list_users():
    return jsonify([
        {
            "idUsuario": 1,
            "nombreCompleto": "Ana Rodriguez",
            "correo": "ana.rodriguez@techsol.com",
            "rol": "Administrador",
            "fechaCreacion": "2023-10-25T10:30:00Z"
        },
        {
            "idUsuario": 2,
            "nombreCompleto": "Juan Perez",
            "correo": "juan.perez@gmarketing.com",
            "rol": "Editor",
            "fechaCreacion": "2023-10-26T14:20:00Z"
        }
    ]), 200


@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()

    return jsonify({
        "status": "success",
        "message": "User created successfully",
        "idUsuario": 3
    }), 201


# =========================================================
# SURVEYS - Gestión de Encuestas
# =========================================================
@app.route('/surveys', methods=['GET'])
def list_surveys():
    return jsonify([
        {
            "idEncuesta": 1,
            "titulo": "Satisfacción de Producto X",
            "descripcion": "Medir la experiencia del usuario...",
            "publicoObjetivo": "Clientes de Producto X",
            "fechaInicio": "2023-10-01T00:00:00Z",
            "fechaFin": "2023-10-31T23:59:59Z",
            "estado": "Activa",
            "enlace": "https://enlace.com/e1",
            "qr": None,
            "responsesCount": 1204,
            "completionRate": 82
        }
    ]), 200


@app.route('/surveys', methods=['POST'])
def create_survey():
    data = request.get_json()

    return jsonify({
        "status": "success",
        "message": "Survey created successfully",
        "idEncuesta": 4
    }), 201


# =========================================================
# SURVEY RESULTS
# =========================================================
@app.route('/surveys/<int:id_encuesta>/results', methods=['GET'])
def survey_results(id_encuesta):
    return jsonify({
        "idEncuesta": id_encuesta,
        "titulo": "Satisfacción de Producto X",
        "totalRespuestas": 5,
        "preguntas": [
            {
                "idPregunta": 1,
                "enunciado": "¿Qué tan satisfecho está...?",
                "tipo": "multiple",
                "stats": {
                    "Muy Satisfecho (5)": 2,
                    "Satisfecho (4)": 1,
                    "Neutral (3)": 1,
                    "Insatisfecho (2)": 1
                }
            }
        ]
    }), 200


# =========================================================
# RESPONSE OPTIONS - Configuración estática
# =========================================================
@app.route('/response-options', methods=['GET'])
def response_options():
    return jsonify([
        { "id": "multiple", "label": "Opción Múltiple" },
        { "id": "texto", "label": "Texto Abierto" },
        { "id": "numerico", "label": "Numérico" }
    ]), 200


# =========================================================
# MAIN
# =========================================================
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
