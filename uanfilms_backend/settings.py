import os
from pathlib import Path
from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv() 
SECRET_KEY = os.environ.get('SECRET_KEY')
if not SECRET_KEY:
    raise ValueError("La variable de entorno SECRET_KEY no está definida.")

IS_AZURE_ENVIRONMENT = 'WEBSITE_HOSTNAME' in os.environ

DEBUG = not IS_AZURE_ENVIRONMENT 
ALLOWED_HOSTS = []
if IS_AZURE_ENVIRONMENT:
    
    hostname = os.environ.get('WEBSITE_HOSTNAME')
    if hostname:
        ALLOWED_HOSTS.append(hostname)
else:
   
    ALLOWED_HOSTS = ['127.0.0.1', 'localhost']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'usuarios',
    'peliculas',
    'storages', 
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

if IS_AZURE_ENVIRONMENT:
    
    frontend_url = os.environ.get('FRONTEND_URL')
    if frontend_url:
        CORS_ALLOWED_ORIGINS = [frontend_url]
    else:
        CORS_ALLOWED_ORIGINS = []
else:
   
    cors_origins_str = os.environ.get('CORS_ALLOWED_ORIGINS_LIST', 'http://localhost:3000')
    CORS_ALLOWED_ORIGINS = [origin.strip() for origin in cors_origins_str.split(',') if origin.strip()]


ROOT_URLCONF = 'urls'
WSGI_APPLICATION = 'uanfilms_backend.wsgi.application'
AUTH_USER_MODEL = 'usuarios.Usuario'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
LANGUAGE_CODE = 'es-es' 
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [], 'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


DATABASES = {
    'default': {
        'ENGINE': 'mysql.connector.django',
        'NAME': os.environ.get('DATABASE_NAME'),
        'USER': os.environ.get('DATABASE_USER'),
        'PASSWORD': os.environ.get('DATABASE_PASSWORD'),
        'HOST': os.environ.get('DATABASE_HOST'),
        'PORT': os.environ.get('DATABASE_PORT', '3306'),
        'OPTIONS': {
            'sql_mode': 'STRICT_TRANS_TABLES',
            
            'ssl_ca': os.path.join(BASE_DIR, 'DigiCertGlobalRootG2.crt.pem')
        }
    }
}

if IS_AZURE_ENVIRONMENT:
    DATABASES['default']['OPTIONS']['ssl_ca'] = os.path.join(BASE_DIR, 'DigiCertGlobalRootG2.crt.pem')


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication',),
}


STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

if IS_AZURE_ENVIRONMENT:
    
    AZURE_ACCOUNT_NAME = os.environ.get('AZURE_ACCOUNT_NAME')
    AZURE_ACCOUNT_KEY = os.environ.get('AZURE_ACCOUNT_KEY')
    AZURE_CONTAINER = "media"
    DEFAULT_FILE_STORAGE = 'storage_backends.MediaStorage'
    MEDIA_URL = f'https://{AZURE_ACCOUNT_NAME}.blob.core.windows.net/{AZURE_CONTAINER}/'
else:
 
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'mediafiles')
