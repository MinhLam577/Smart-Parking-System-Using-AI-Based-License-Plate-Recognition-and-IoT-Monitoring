from config.db import Database
class Led:
    def __init__(self):
        self.db = Database()
    def get_led(self):
        db, cursor = self.db.get_connection()
        cursor.execute("SELECT * FROM led")
        leds = cursor.fetchall()
        leds_list = []
        for led in leds:
            user_dict = {
                'id': led[0],
                'name': led[1],
                'Pin' : led[2],
                'status' : led[3]
            }
            leds_list.append(user_dict)
        return leds_list
    def create_led(self, name, chanpin, status):
        db, cursor = self.db.get_connection()
        cursor.execute("INSERT INTO led (name, Pin, status) VALUES (%s, %s, %s)", (name, chanpin, status))
        db.commit()


    def get_led_by_pin(self, chanpin):
        db, cursor = self.db.get_connection()
        cursor.execute("SELECT * FROM led WHERE Pin = %s", (chanpin,))
        led = cursor.fetchone()
        if led :
            return True 
        return False
    
    def delete(self, id):
        db, cursor = self.db.get_connection()
        try:
            cursor.execute("DELETE FROM led WHERE id = %s", (id,))
            db.commit()
            return {'message': 'LED deleted successfully'}
        except Exception as e:
            db.rollback()
            return {'error': 'Failed to delete LED', 'details': str(e)}
        
    def update(self, id, name, chanpin, status):
        db, cursor = self.db.get_connection()
        try:
            cursor.execute("UPDATE led SET name = %s, Pin = %s, status = %s WHERE id = %s", (name, chanpin, status, id))
            db.commit()
            return {'message': 'LED updated successfully'}
        except Exception as e:
            db.rollback()
            return {'error': 'Failed to update LED', 'details': str(e)} 
        