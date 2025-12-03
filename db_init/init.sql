-- -----------------------------------------------------
-- 1. CREACIÓN DE TABLAS (DDL)
-- -----------------------------------------------------

-- Tabla: EMPRESA
CREATE TABLE EMPRESA (
    ID_EMPRESA SERIAL PRIMARY KEY,
    NOMBRE_LEGAL VARCHAR(150) NOT NULL,
    SITIO_WEB VARCHAR(200),
    TAMANO_ORGANIZACIONAL VARCHAR(50),
    FECHA_REGISTRO TIMESTAMP,
    ESTADO VARCHAR(50)
);

-- Tabla: USUARIO
CREATE TABLE USUARIO (
    ID_USUARIO SERIAL PRIMARY KEY,
    ID_EMPRESA INT,
    NOMBRE_COMPLETO VARCHAR(150) NOT NULL,
    CORREO VARCHAR(150) NOT NULL UNIQUE,
    CONTRASENA VARCHAR(100) NOT NULL,
    ROL VARCHAR(50),
    FECHA_CREACION TIMESTAMP,
    FOREIGN KEY (ID_EMPRESA) REFERENCES EMPRESA(ID_EMPRESA)
);

-- Tabla: PARTICIPANTE
CREATE TABLE PARTICIPANTE (
    ID_PARTICIPANTE SERIAL PRIMARY KEY,
    IDENTIFICADOR VARCHAR(100) UNIQUE, -- Puede ser un número de teléfono, email, etc.
    CANAL VARCHAR(50),
    FECHA_REGISTRO TIMESTAMP
);

-- Tabla: ENCUESTA
CREATE TABLE ENCUESTA (
    ID_ENCUESTA SERIAL PRIMARY KEY,
    ID_EMPRESA INT,
    TITULO VARCHAR(100) NOT NULL,
    DESCRIPCION VARCHAR(500),
    PUBLICO_OBJETIVO VARCHAR(200),
    FECHA_INICIO TIMESTAMP,
    FECHA_FIN TIMESTAMP,
    ESTADO VARCHAR(50),
    ENLACE VARCHAR(500),
    QR VARCHAR(500),
    FOREIGN KEY (ID_EMPRESA) REFERENCES EMPRESA(ID_EMPRESA)
);

-- Tabla: PREGUNTA
CREATE TABLE PREGUNTA (
    ID_PREGUNTA SERIAL PRIMARY KEY,
    ID_ENCUESTA INT NOT NULL,
    ENUNCIADO VARCHAR(500) NOT NULL,
    TIPO VARCHAR(50), -- Ej: 'multiple', 'texto', 'numerico'
    ORDEN INT,
    FOREIGN KEY (ID_ENCUESTA) REFERENCES ENCUESTA(ID_ENCUESTA)
);

-- Tabla: OPCION_RESPUESTA
CREATE TABLE OPCION_RESPUESTA (
    ID_OPCION SERIAL PRIMARY KEY,
    ID_PREGUNTA INT NOT NULL,
    TEXTO_OPCION VARCHAR(500) NOT NULL,
    ORDEN INT,
    FOREIGN KEY (ID_PREGUNTA) REFERENCES PREGUNTA(ID_PREGUNTA)
);

-- Tabla: RESPUESTA
CREATE TABLE RESPUESTA (
    ID_RESPUESTA SERIAL PRIMARY KEY,
    ID_ENCUESTA INT NOT NULL,
    ID_PARTICIPANTE INT NOT NULL,
    FECHA_RESPUESTA TIMESTAMP,
    FOREIGN KEY (ID_ENCUESTA) REFERENCES ENCUESTA(ID_ENCUESTA),
    FOREIGN KEY (ID_PARTICIPANTE) REFERENCES PARTICIPANTE(ID_PARTICIPANTE)
);

-- Tabla: RESPUESTA_DETALLE
CREATE TABLE RESPUESTA_DETALLE (
    ID_RESPUESTA_DETALLE SERIAL PRIMARY KEY,
    ID_RESPUESTA INT NOT NULL,
    ID_PREGUNTA INT NOT NULL,
    VALOR VARCHAR(500), -- Almacena la opción seleccionada (ID_OPCION), texto libre, o valor numérico
    FOREIGN KEY (ID_RESPUESTA) REFERENCES RESPUESTA(ID_RESPUESTA),
    FOREIGN KEY (ID_PREGUNTA) REFERENCES PREGUNTA(ID_PREGUNTA)
);

-- Tabla: WHATSAPP_LOG
CREATE TABLE WHATSAPP_LOG (
    ID_LOG SERIAL PRIMARY KEY,
    ID_PARTICIPANTE INT NOT NULL,
    FECHA_HORA TIMESTAMP,
    MENSAJE VARCHAR(1000),
    FOREIGN KEY (ID_PARTICIPANTE) REFERENCES PARTICIPANTE(ID_PARTICIPANTE)
);


-- -----------------------------------------------------
-- 2. INSERCIÓN DE DATOS DE PRUEBA (DML)
-- -----------------------------------------------------

-- 1. Empresas (3 Registros)
INSERT INTO EMPRESA (NOMBRE_LEGAL, SITIO_WEB, TAMANO_ORGANIZACIONAL, FECHA_REGISTRO, ESTADO) VALUES
('Tech Solutions S.A.', 'techsol.com', 'Grande', CURRENT_TIMESTAMP, 'Activo'),
('Global Marketing Ltda.', 'gmarketing.com', 'Mediana', CURRENT_TIMESTAMP, 'Activo'),
('Innovate Consultores', 'innovate.io', 'Pequeña', CURRENT_TIMESTAMP, 'Inactivo');

-- 2. Usuarios (3 Registros)
INSERT INTO USUARIO (ID_EMPRESA, NOMBRE_COMPLETO, CORREO, CONTRASENA, ROL, FECHA_CREACION) VALUES
(1, 'Ana Rodriguez', 'ana.rodriguez@techsol.com', 'hash123', 'Administrador', CURRENT_TIMESTAMP),
(2, 'Juan Perez', 'juan.perez@gmarketing.com', 'hash456', 'Editor', CURRENT_TIMESTAMP),
(1, 'Maria Lopez', 'maria.lopez@techsol.com', 'hash789', 'Analista', CURRENT_TIMESTAMP);

-- 3. Participantes (15 Registros)
INSERT INTO PARTICIPANTE (IDENTIFICADOR, CANAL, FECHA_REGISTRO) VALUES
('5511987654321', 'WhatsApp', CURRENT_TIMESTAMP), ('email1@test.com', 'Email', CURRENT_TIMESTAMP), ('5521912345678', 'WhatsApp', CURRENT_TIMESTAMP),
('email2@test.com', 'Email', CURRENT_TIMESTAMP), ('5531987651234', 'Web', CURRENT_TIMESTAMP), ('email3@test.com', 'Email', CURRENT_TIMESTAMP),
('5541911223344', 'WhatsApp', CURRENT_TIMESTAMP), ('email4@test.com', 'Web', CURRENT_TIMESTAMP), ('5551988776655', 'WhatsApp', CURRENT_TIMESTAMP),
('email5@test.com', 'Email', CURRENT_TIMESTAMP), ('5561955443322', 'Web', CURRENT_TIMESTAMP), ('email6@test.com', 'Email', CURRENT_TIMESTAMP),
('5571999887766', 'Web', CURRENT_TIMESTAMP), ('email7@test.com', 'Email', CURRENT_TIMESTAMP), ('5581944556677', 'WhatsApp', CURRENT_TIMESTAMP);

-- 4. Encuestas (3 Registros)
INSERT INTO ENCUESTA (ID_EMPRESA, TITULO, DESCRIPCION, PUBLICO_OBJETIVO, FECHA_INICIO, FECHA_FIN, ESTADO, ENLACE) VALUES
(1, 'Satisfacción de Producto X', 'Medir la experiencia del usuario con el nuevo producto X.', 'Clientes de Producto X', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '30 DAY', 'Activa', 'https://enlace.com/e1'),
(2, 'Preferencias de Compra', 'Identificar los factores que influyen en la decisión de compra.', 'Público general', CURRENT_TIMESTAMP - INTERVAL '15 DAY', CURRENT_TIMESTAMP, 'Cerrada', 'https://enlace.com/e2'),
(1, 'Feedback Interno TI', 'Recolección de sugerencias sobre la infraestructura de TI.', 'Empleados de Tech Solutions', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '60 DAY', 'Activa', 'https://enlace.com/e3');

-- 5. Preguntas (10 Registros)
INSERT INTO PREGUNTA (ID_ENCUESTA, ENUNCIADO, TIPO, ORDEN) VALUES
-- Encuesta 1 (ID_ENCUESTA=1)
(1, '¿Qué tan satisfecho está con la facilidad de uso?', 'multiple', 1),
(1, '¿Cómo calificaría la calidad del soporte técnico?', 'multiple', 2),
(1, 'Comentarios o sugerencias adicionales:', 'texto', 3),
-- Encuesta 2 (ID_ENCUESTA=2)
(2, '¿Cuál es el factor más importante al decidir una compra?', 'multiple', 1),
(2, '¿Cuánto está dispuesto a pagar por un producto de alta calidad?', 'numerico', 2),
-- Encuesta 3 (ID_ENCUESTA=3)
(3, '¿Funcionan bien las herramientas de videollamada?', 'multiple', 1),
(3, 'Tiempo promedio de respuesta a tickets de soporte (en horas):', 'numerico', 2),
(3, '¿Qué hardware te gustaría mejorar?', 'texto', 3),
(3, '¿Qué tan útil es la documentación interna?', 'multiple', 4),
(3, 'Indique su área de trabajo:', 'texto', 5);


-- 6. Opciones de Respuesta (15 Registros - para preguntas de tipo 'multiple')
INSERT INTO OPCION_RESPUESTA (ID_PREGUNTA, TEXTO_OPCION, ORDEN) VALUES
-- Pregunta 1, 2, 6, 9 (Escala 1 a 5)
(1, 'Muy Satisfecho (5)', 5), (1, 'Satisfecho (4)', 4), (1, 'Neutral (3)', 3), (1, 'Insatisfecho (2)', 2), (1, 'Muy Insatisfecho (1)', 1),
(2, 'Excelente', 5), (2, 'Bueno', 4), (2, 'Regular', 3), (2, 'Malo', 2), (2, 'Muy Malo', 1),
-- Pregunta 4
(4, 'Precio', 1), (4, 'Marca', 2), (4, 'Reseñas', 3), (4, 'Características', 4),
-- Pregunta 6
(6, 'Siempre funcionan', 1), (6, 'Frecuentemente', 2), (6, 'Rara vez', 3),
-- Pregunta 9
(9, 'Muy útil', 1), (9, 'Útil', 2), (9, 'Poco útil', 3);


-- 7. Respuestas (10 Registros - 5 para Encuesta 1, 5 para Encuesta 2)
INSERT INTO RESPUESTA (ID_ENCUESTA, ID_PARTICIPANTE, FECHA_RESPUESTA) VALUES
(1, 1, CURRENT_TIMESTAMP), (1, 2, CURRENT_TIMESTAMP - INTERVAL '1 HOUR'), (1, 3, CURRENT_TIMESTAMP - INTERVAL '2 HOUR'),
(1, 4, CURRENT_TIMESTAMP - INTERVAL '3 HOUR'), (1, 5, CURRENT_TIMESTAMP - INTERVAL '4 HOUR'),
(2, 6, CURRENT_TIMESTAMP - INTERVAL '5 HOUR'), (2, 7, CURRENT_TIMESTAMP - INTERVAL '6 HOUR'),
(2, 8, CURRENT_TIMESTAMP - INTERVAL '7 HOUR'), (2, 9, CURRENT_TIMESTAMP - INTERVAL '8 HOUR'),
(2, 10, CURRENT_TIMESTAMP - INTERVAL '9 HOUR');

-- 8. Respuestas Detalle (25 Registros)
-- Respuestas de la Encuesta 1 (Preguntas 1, 2, 3) - 5 Participantes * 3 Preguntas = 15 detalles
INSERT INTO RESPUESTA_DETALLE (ID_RESPUESTA, ID_PREGUNTA, VALOR) VALUES
(1, 1, 'Muy Satisfecho (5)'), (1, 2, 'Excelente'), (1, 3, 'Todo perfecto, gran producto.'),
(2, 1, 'Satisfecho (4)'), (2, 2, 'Bueno'), (2, 3, ''),
(3, 1, 'Neutral (3)'), (3, 2, 'Regular'), (3, 3, 'El onboarding podría ser más claro.'),
(4, 1, 'Muy Satisfecho (5)'), (4, 2, 'Excelente'), (4, 3, 'Ninguno.'),
(5, 1, 'Insatisfecho (2)'), (5, 2, 'Malo'), (5, 3, 'Soporte muy lento.');

-- Respuestas de la Encuesta 2 (Preguntas 4, 5) - 5 Participantes * 2 Preguntas = 10 detalles
INSERT INTO RESPUESTA_DETALLE (ID_RESPUESTA, ID_PREGUNTA, VALOR) VALUES
(6, 4, 'Precio'), (6, 5, '300'),
(7, 4, 'Características'), (7, 5, '550'),
(8, 4, 'Marca'), (8, 5, '400'),
(9, 4, 'Reseñas'), (9, 5, '250'),
(10, 4, 'Características'), (10, 5, '600');

-- 9. WhatsApp Log (12 Registros)
INSERT INTO WHATSAPP_LOG (ID_PARTICIPANTE, FECHA_HORA, MENSAJE) VALUES
(1, CURRENT_TIMESTAMP, 'Hola! Te enviamos el link de la encuesta.'),
(1, CURRENT_TIMESTAMP - INTERVAL '1 MINUTE', 'Recibido.'),
(3, CURRENT_TIMESTAMP, 'Recordatorio: No olvides completar la encuesta.'),
(7, CURRENT_TIMESTAMP - INTERVAL '5 MINUTE', 'Mensaje automático de confirmación.'),
(11, CURRENT_TIMESTAMP, 'Inicio de conversación.'),
(12, CURRENT_TIMESTAMP - INTERVAL '2 MINUTE', 'Mensaje de error al enviar.'),
(1, CURRENT_TIMESTAMP - INTERVAL '3 MINUTE', 'Gracias por responder!'),
(3, CURRENT_TIMESTAMP - INTERVAL '4 MINUTE', 'Encuesta completada.'),
(7, CURRENT_TIMESTAMP - INTERVAL '6 MINUTE', 'Consulta sobre la encuesta.'),
(13, CURRENT_TIMESTAMP, 'Envío de nuevo enlace.'),
(14, CURRENT_TIMESTAMP - INTERVAL '7 MINUTE', 'Respuesta del participante.'),
(15, CURRENT_TIMESTAMP, 'Envío fallido.');