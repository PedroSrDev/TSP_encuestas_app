# infrastructure/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# **Ajusta tu cadena de conexión a PostgreSQL**
DATABASE_URL = "postgresql://admin:admin@postgres:5432/encuentas" 

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Función de utilidad para obtener una sesión (usada en los endpoints)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()