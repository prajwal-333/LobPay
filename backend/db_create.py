import sqlite3

create_user_table = """CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username text NOT NULL, mobile_number INTEGER NOT NULL, password text, otp text, is_verified Boolean);"""
create_customer_table = """CREATE TABLE IF NOT EXISTS Customers(id INTEGER PRIMARY KEY NOT NULL, FOREIGN KEY(id) REFERENCES Users(id) ON DELETE CASCADE);"""
create_merchant_table = """CREATE TABLE IF NOT EXISTS Merchants(id INTEGER PRIMARY KEY NOT NULL, address text, account_info text,FOREIGN KEY(id) REFERENCES Users(id) ON DELETE CASCADE);"""
create_subscription_table = """CREATE TABLE IF NOT EXISTS Subscription(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cid INTEGER NOT NULL, mid INTEGER NOT NULL, checkout_id text ,FOREIGN KEY(cid) REFERENCES Customers(id) ON DELETE CASCADE, FOREIGN KEY(mid) REFERENCES Merchants(id) ON DELETE CASCADE);"""

conn = sqlite3.connect('lobpay.db')
c = conn.cursor()
# c.execute("""DROP TABLE IF EXISTS Users;""")
# c.execute("""DROP TABLE IF EXISTS Customers;""")
# c.execute("""DROP TABLE IF EXISTS Merchants;""")
# c.execute("""DROP TABLE IF EXISTS Subscription;""")
# c.execute(create_user_table)
# c.execute(create_customer_table)
# c.execute(create_merchant_table)
# c.execute(create_subscription_table)
c.execute("""SELECT * FROM Users;""")
r = c.fetchall();
print(len(r))

c.execute("""SELECT * FROM Customers;""")
r = c.fetchall();
print(len(r))
c.execute("""SELECT * FROM Merchants;""")
r = c.fetchall();
print(len(r))
