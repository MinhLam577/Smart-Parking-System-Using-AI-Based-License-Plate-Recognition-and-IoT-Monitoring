import mysql.connector


class Database:
    def __init__(self):
        try:
            self.db = mysql.connector.connect(
                host="localhost",
                user="root",
                password='',
                database="pbl05"
            )
            self.cursor = self.db.cursor()
            print("Connected to the database successfully!")
        except mysql.connector.Error as err:
            print("Failed to connect to the database:", err)

    def get_connection(self):
        return self.db, self.cursor
