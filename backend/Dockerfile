# Usamos una imagen base oficial de Python, ligera y estable
FROM python:3.11-slim

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos e instalamos las dependencias primero. Esto permite que Docker cachee esta capa
# si solo cambian los archivos de código fuente.
# Se asume que 'requirements.txt' está en la carpeta 'backend/'
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el resto del código fuente del backend a /app
# Esto incluye main.py, infrastructure/, models/, etc.
COPY . .

# Exponemos el puerto que Flask está usando (5002)
EXPOSE 5002

# El comando de inicio ya está definido en el docker-compose.yml (command: python main.py),
# pero si quieres ejecutar el contenedor directamente, usarías CMD.
# CMD ["python", " "main.py"]