import sqlite3 

def create_user(name, email, password):
    query = f"""INSERT INTO users(name, email, password)
    VALUES('{name}', '{email}', '{password}')"""

    connection = sqlite3.connect("C:\\Users\\DELL\\OneDrive\\Joy owabumuwa Onedrive\\OneDrive\\Desktop\\BACHELORS PROJECT\\Password_Assesment_Tool\\HTML\API\\Users_db.db")
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    connection.close()



def get_user_id(user_email):
    query = f"""select id, password from users where email='{user_email}'"""
    connection = sqlite3.connect("C:\\Users\\DELL\\OneDrive\\Joy owabumuwa Onedrive\\OneDrive\\Desktop\\BACHELORS PROJECT\\Password_Assesment_Tool\\HTML\API\\Users_db.db")
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    user_id = list(database_response)
    connection.close()
    
    return user_id

def get_user_details(connection, user_id):
    query = f"""select first_name, last_name from users where id={user_id}"""
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    user_details = list(database_response)[0]
    connection.close()
    return user_details

def get_all_users(connection):
    query = "select first_name, last_name, email from users where id != 1"
    cursor = connection.cursor()
    database_response = cursor.execute(query)
    users = list(database_response)
    connection.close()
    return users 

def delete_user(connection, user_id):
    query = f"""delete from users where id={user_id}"""
    cursor = connection.cursor()
    cursor.execute(query)
    connection.commit()
    connection.close()
