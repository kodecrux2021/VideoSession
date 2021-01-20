"""
Django settings for videosession project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from pathlib import Path
import os


# Build paths inside the project like this: BASE_DIR / 'subdir'.
# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEMPLATE_DIR =os.path.join(BASE_DIR,'templates')
STATIC_DIR= os.path.join(BASE_DIR,'static')
MEDIA_DIR = os.path.join(BASE_DIR,'media')


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'p_w#!6jui_dlu78z7*ne8^y2z$+2q0u%2kqm*hg(ij9a2=1w^1'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['525d3d726b33.ngrok.io','127.0.0.1','0.0.0.0','*']


# Application definition

INSTALLED_APPS = [
    # 'admin_interface',
    # 'colorfield',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'user',
    'technology',
    'proposal',
    'job',
    'session',
    'customuser',
    'django_filters',
    'hire',
    'message',
    'corsheaders',
    'oauth2_provider',
    'social_django',
    'rest_framework_social_oauth2',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'django.contrib.sites',
    'rest_framework.authtoken',
    'notification',
]
X_FRAME_OPTIONS='SAMEORIGIN' # only if django version >= 3.0
SITE_ID = 1
REST_USE_JWT = True    # this is for djangorestframework-jwt

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',

]

CORS_ORIGIN_ALLOW_ALL = True

ROOT_HOSTCONF = 'videosession.hosts'  # Change `mysite` to the name of your project
DEFAULT_HOST = 'https://d95a9d4bc565.ngrok.io/random/'  # Name of the default host, we will create it in the next steps

ROOT_URLCONF = 'videosession.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATE_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'videosession.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
AUTH_USER_MODEL = "customuser.CustomUser"



# Your Account Sid and Auth Token from twilio.com/console
# and set the environment variables. See http://twil.io/secure
ACCOUNT_SID = 'AC8e2a3cefda57282f6ef9800fe0063564'
AUTH_TOKEN = '533ea0a2260253cc505f001c3c9a336b'


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',  # django-oauth-toolkit >= 1.0.0
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
        'rest_framework.authentication.TokenAuthentication',

    ],
}
JWT_AUTH = {
    'JWT_PAYLOAD_HANDLER':
        'rest_framework_jwt.utils.jwt_payload_handler',
'JWT_ENCODE_HANDLER':
'rest_framework_jwt.utils.jwt_encode_handler',

'JWT_DECODE_HANDLER':
'rest_framework_jwt.utils.jwt_decode_handler',
}

AUTHENTICATION_BACKENDS = (
    # Facebook OAuth2
    'social.backends.google.GoogleOAuth2',  # /google-oauth2
    'social_core.backends.facebook.FacebookOAuth2',

    # django-rest-framework-social-oauth2
    'rest_framework_social_oauth2.backends.DjangoOAuth2',

    # Django
    'django.contrib.auth.backends.ModelBackend',
)

MEDIA_ROOT =  os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'



# Facebook configuration

SOCIAL_AUTH_FACEBOOK_KEY = '375577453526335'
SOCIAL_AUTH_FACEBOOK_SECRET = 'b7d4c3ec6007a65963fdcf399556e794'
SOCIAL_AUTH_LOGIN_REDIRECT_URL = 'http://localhost/accounts/google/login/callback/'
# Define SOCIAL_AUTH_FACEBOOK_SCOPE to get extra permissions from facebook. Email is not sent by default, to get it, you must request the email permission:
SOCIAL_AUTH_FACEBOOK_SCOPE = ['sales@kodecrux.com']
SOCIAL_AUTH_FACEBOOK_PROFILE_EXTRA_PARAMS = {
'fields': 'id, name, email' }
SOCIAL_AUTH_FACEBOOK_SCOPE = ['sales@kodecrux.com']
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['sales@kodecrux.com', 'kode crux']
FACEBOOK_EXTENDED_PERMISSIONS = ['sales@kodecrux.com']
SOCIAL_AUTH_ADMIN_USER_SEARCH_FIELDS = ['KodeCrux', 'first_name', 'sales@kodecrux.com']
SOCIAL_AUTH_USERNAME_IS_FULL_EMAIL = True
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '515126473370-emg4305tflmvetsklioachjblbekk066.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'QKyKcot2gC22h8kX_IUkxyqe'
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['sales@kodecrux.com']
SOCIAL_AUTH_PIPELINE = (
'social_core.pipeline.social_auth.social_details',
'social_core.pipeline.social_auth.social_uid',
'social_core.pipeline.social_auth.auth_allowed',
'social_core.pipeline.social_auth.social_user',
'social_core.pipeline.user.get_username',
'social_core.pipeline.social_auth.associate_by_email',
'social_core.pipeline.user.create_user',
'social_core.pipeline.social_auth.associate_user',
'social_core.pipeline.social_auth.load_extra_data',
'social_core.pipeline.user.user_details', )

SENDGRID_API_KEY='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'
MAIL_HOST = 'smtp.sendgrid.net'
EMAIL_PORT = 587
EMAIL_USE_TLS = True

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_ROOT = os.path.join(PROJECT_DIR, 'static')

PAYMENT_VARIANTS = {
    'razorpay': ('django_payments_razorpay.RazorPayProvider', {
        'public_key': 'rzp_test_TVbCLwAp2V8lVn',
        'secret_key': 'KyyHwi8ix0IAW4fEzYnYcAl0'})}