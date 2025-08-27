from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS #Prevents CORS errors


app = Flask(__name__) #Inits the Flask application
CORS(app) #Raps app in CORS - Disabling the CORS Error

#Where we want to save the db
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db" #Delete the db (Database) file if not working
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

#Instance of the database
#Kinda like translating python to SQL
db = SQLAlchemy(app) #Gives us accesss to the database