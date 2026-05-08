from models.db import Database
import json


class Bienso:
    def __init__(self):
        self.db = Database()

    def get_biensos(self):
        db, cursor = self.db.get_connection()
        cursor.execute("SELECT * FROM biensoxe")
        books = cursor.fetchall()

        # Chuyển đổi kết quả từ tuple sang list
        books_list = []
        for book in books:
            book_dict = {
                'id': book[0],
                'mabien': book[1],
                'nguoidangki': book[2],
                'mathe': book[3],
            }
            books_list.append(book_dict)
        # Chuyển đổi danh sách sách sang định dạng JSON
        return books_list

    def createBienso(self, mabien, nguoidangki, mathe):
        db, cursor = self.db.get_connection()
        cursor.execute(
            "INSERT INTO biensoxe(mabien,nguoidangki,mathe) VALUES (%s,%s,%s)", (mabien, nguoidangki, mathe))
        db.commit()

    def deleteBienso(self, id):
        try:
            db, cursor = self.db.get_connection()
            cursor.execute("DELETE FROM biensoxe WHERE id = %s", (id,))
            db.commit()
            return {"Message": "Xóa biển số thành công"}
        except Exception as err:
            # Xử lý ngoại lệ cụ thể ở đây
            # Ví dụ: logging, thông báo cho người dùng về lỗi cụ thể
            return {"Message": "Xóa biển số thất bại: " + str(err)}

    def updateBienso(self, id, mabien, nguoidangki, mathe):
        try:
            db, cursor = self.db.get_connection()
            cursor.execute(
                "UPDATE biensoxe SET mabien = %s , nguoidangki = %s, mathe = %s WHERE id = %s", (mabien, nguoidangki, mathe, id))
            db.commit()
            return True
        except Exception as err:
            return False

    def getby_mabien(self, mabien):
        db, cursor = self.db.get_connection()
        cursor.execute("SELECT * FROM biensoxe WHERE mabien = %s", (mabien,))
        bienso = cursor.fetchone()
        if bienso:
            return True
        return False

    def getby_mathe(self, mathe):
        print(mathe)
        db, cursor = self.db.get_connection()
        cursor.execute("SELECT * FROM biensoxe WHERE mathe = %s", (mathe,))
        bienso = cursor.fetchone()
        if bienso:
            return True
        return False
