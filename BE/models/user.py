from config.db import Database


class User:
    def __init__(self):
        self.db = Database()

    def get_users(self):
        db, cursor = self.db.get_connection()
        cursor.execute("SELECT * FROM user")
        users = cursor.fetchall()

        users_list = []
        for user in users:
            user_dict = {
                'id': user[0],
                'name': user[1],
            }
            users_list.append(user_dict)
        return users_list

    def create_user(self, gmail, password, role, name):
        db, cursor = self.db.get_connection()
        cursor.execute("INSERT INTO user (gmail,password,role,name) VALUES (%s ,%s,%s,%s)",
                       (gmail, password, role, name))
        db.commit()

    def check_user_existence(self, gmail):
        db, cursor = self.db.get_connection()
        cursor.execute("SELECT * FROM user WHERE gmail = %s ", (gmail,))
        user = cursor.fetchone()
        if user:
            return True
        else:
            return False

    def signup(self, gmail, password):
        db, cursor = self.db.get_connection()
        sql = "SELECT gmail, role,name FROM user WHERE gmail = %s AND password = %s"
        val = (gmail, password)
        cursor.execute(sql, val)
        result = cursor.fetchone()
        return result
