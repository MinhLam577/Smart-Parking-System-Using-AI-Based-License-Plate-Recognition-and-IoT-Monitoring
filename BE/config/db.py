import os
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv

load_dotenv()

class Database:
    def __init__(self):
        self.db = None
        self.cursor = None
        try:
            self.db = mysql.connector.connect(
                host=os.getenv("DB_HOST", "localhost"),
                user=os.getenv("DB_USER", "root"),
                password=os.getenv("DB_PASSWORD", ""),
                database=os.getenv("DB_NAME", "SmartParking")
            )
            if self.db.is_connected():
                self.cursor = self.db.cursor(dictionary=True) # dictionary=True giúp kết quả trả về dạng dict dễ dùng hơn
                print("Connected to the database successfully!")
        except Error as err:
            print(f"Error while connecting to MySQL: {err}")

    def get_connection(self):
        return self.db, self.cursor

    def close(self):
        if self.cursor:
            self.cursor.close()
        if self.db and self.db.is_connected():
            self.db.close()
            print("MySQL connection is closed")