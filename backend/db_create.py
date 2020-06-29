import sqlite3

create_user_table = """CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username text NOT NULL, mobile_number INTEGER NOT NULL, password text, otp text, is_verified Boolean, is_merchant Boolean);"""
create_customer_table = """CREATE TABLE IF NOT EXISTS Customers(id INTEGER PRIMARY KEY NOT NULL,pin INTEGER,checkout_id text, FOREIGN KEY(id) REFERENCES Users(id) ON DELETE CASCADE);"""
create_merchant_table = """CREATE TABLE IF NOT EXISTS Merchants(id INTEGER PRIMARY KEY NOT NULL, address text, account_info text,pin INTEGER,lat REAL, long REAL, FOREIGN KEY(id) REFERENCES Users(id) ON DELETE CASCADE);"""
create_subscription_table = """CREATE TABLE IF NOT EXISTS Subscription(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cid INTEGER NOT NULL, mid INTEGER NOT NULL ,FOREIGN KEY(cid) REFERENCES Customers(id) ON DELETE CASCADE, FOREIGN KEY(mid) REFERENCES Merchants(id) ON DELETE CASCADE);"""
create_inventory_table = """CREATE TABLE IF NOT EXISTS Inventory(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name text, price REAL)"""
create_invoice_table = """CREATE TABLE IF NOT EXISTS Invoice(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, cid INTEGER NOT NULL, inv_date DATE,FOREIGN KEY(cid) REFERENCES Customers(id) ON DELETE CASCADE)"""
create_invoice_item_table = """CREATE TABLE IF NOT EXISTS InvoiceItem(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, inv_id INTEGER NOT NULL, item_id INTEGER NOT NULL, quantity INTEGER NOT NULL,FOREIGN KEY(inv_id) REFERENCES Invoice(id) ON DELETE CASCADE,FOREIGN KEY(item_id) REFERENCES Inventory(id) ON DELETE CASCADE)"""

conn = sqlite3.connect('lobpay.db')
c = conn.cursor()
c.execute("""DROP TABLE IF EXISTS Users;""")
c.execute("""DROP TABLE IF EXISTS Customers;""")
c.execute("""DROP TABLE IF EXISTS Merchants;""")
c.execute("""DROP TABLE IF EXISTS Subscription;""")
c.execute("""DROP TABLE IF EXISTS Inventory;""")
c.execute("""DROP TABLE IF EXISTS Invoice;""")
c.execute("""DROP TABLE IF EXISTS InvoiceItem;""")
c.execute(create_user_table)
c.execute(create_customer_table)
c.execute(create_merchant_table)
c.execute(create_subscription_table)
c.execute(create_inventory_table)
c.execute(create_invoice_table)
c.execute(create_invoice_item_table)
# c.execute("""SELECT * FROM Users;""")
# r = c.fetchall();
# print(len(r))

# c.execute("""SELECT * FROM Customers;""")
# r = c.fetchall();
# print(len(r))

# c.execute("""SELECT * FROM Merchants;""")
# r = c.fetchall();
# print(len(r))

# c.execute("""SELECT * FROM Subscription;""")
# r = c.fetchall();
# print(len(r))

