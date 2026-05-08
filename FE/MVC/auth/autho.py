from flask_jwt_extended import JWTManager
from datetime import timedelta
jwt = JWTManager()

def configure_jwt(app):
    app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this!
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=30)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
    jwt.init_app(app)
