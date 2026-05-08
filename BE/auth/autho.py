import os
from datetime import timedelta
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv

load_dotenv()

jwt = JWTManager()

def configure_jwt(app):
    secret_key = os.getenv("JWT_SECRET_KEY", "default-secret-if-missing")
    token_days = int(os.getenv("ACCESS_TOKEN_DAYS", 30))

    app.config["JWT_SECRET_KEY"] = secret_key
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=token_days)
    app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=token_days)
    
    jwt.init_app(app)