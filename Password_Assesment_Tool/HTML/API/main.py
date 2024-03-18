from flask import Flask, request, jsonify
from flask_cors import CORS

from repository import *


app = Flask("pChecker_api")
CORS(app, resources=r'/api/*')

@app.route("/api/users", methods=["POST"])
def users():
    # get the request data
    body = request.json 

    # validation 
    # check that password and retyped password match
    if body["password"] != body["retyped_password"]:
        response = {
            "message": "Failed to sign up. Password mismatch."
        } 
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 400

    # create a new user in our db 
    create_user(body["name"],  body["email"], body["password"])
    # get user id and return to client
    user_details = get_user_id(body["email"])

    response = {
        "data": {
            "user_id": user_details[0]
        }
    }
    response = jsonify(response)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response, 200 

@app.route("/api/signin", methods=["POST"])
def signin():
    # get request body 
    body = request.json 

    # extract current user details (check if user exists)
    user_details = get_user_id(body["email"])

    if len(user_details) == 0:
        response = {
            "message": "Invalid user. User missing."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 400
    
    if body["password"] != user_details[0][1]:
        response = {
            "message": "Invalid data provided. Please try again..."
        }
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response, 400
    
    response = {
        "data": {
            "user_id": user_details[0]
        }
    }
    response = jsonify(response)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response, 200

@app.route("/api/users/<user_id>", methods=["GET", "PUT", "DELETE"])
def user_by_id(user_id):
    if request.method == "GET":
        # connect to the database 
        connection = connect()

        # get user details
        user_details = get_user_details(connection, user_id)

        # close connection to db 
        connection.close()

        response = {
            "data": {
                "first_name": user_details[0],
                "last_name": user_details[1]
            }
        }

        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 

    if request.method == "PUT":
        pass 

    if request.method == "DELETE":
        connection = connect()
        delete_user(connection, user_id)
        connection.close()
        response = {
            "data": "Success." 
        } 
        response = jsonify(response)
        response.headers.add("Access-Control-Allow-Origin", "*")
        return response 

if __name__ == "__main__":
    app.run(debug=True)