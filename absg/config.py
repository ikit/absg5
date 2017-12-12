#!env/python3
# coding: utf-8 
import os


DEBUG = True


# HOST (internal)
HOST = "127.0.0.1"
PORT = 8900
VERSION = "5.0.dev"
HOSTNAME = "{}:{}".format(HOST, PORT)  # This is the internal host on which aioHTTP will run the service.
# HOST (public)
HOST_P = "dev.absolumentg.fr"  # THIS url must be change if the annso server is reach via a public namespace that user




# SECURITY
PRIVATE_KEY32 = "723c88d556b150effbafca7c1d1b2f9f" # 32bits server secret key, default generated with $ date | md5sum
SESSION_MAX_DURATION = 86400


# DB
DATABASE_HOST = "localhost"
DATABASE_PORT = 5432
DATABASE_USER = "absg"
DATABASE_PWD = "absg"
DATABASE_NAME = "absg"
DATABASE_POOL_SIZE = 7


# FILESYSTEM
FILES_DIR = "/var/absg/v5/dev/files"
TEMP_DIR = "/var/absg/v5/dev/downloads"
CACHE_DIR = "/var/absg/v5/dev/cache"


CACHE_EXPIRATION_SECONDS = 2592000 # 30 days = 60*60*24*30



# AUTOCOMPUTED VALUES
REGOVAR_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_DIR = REGOVAR_DIR
TEMPLATE_DIR = os.path.join(REGOVAR_DIR, "api_rest/templates/")
ERROR_ROOT_URL = "{}/errorcode/".format(HOST_P)
NOTIFY_URL = "http://" + HOST_P + "/job/{}/notify"



# REST API
RANGE_DEFAULT = 100
RANGE_MAX = 1000







