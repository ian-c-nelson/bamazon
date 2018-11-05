DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) ,
  price DECIMAL(10.2) NOT NULL,
  stock_qty INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Back Pack',
    'Equipment',
    5,
    10
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Flask of Oil',
    'Equipment',
    2,
    100
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Hammer (small)',
    'Equipment',
    2,
    15
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Holy Symbol',
    'Equipment',
    25,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Holy Water (1 vial)',
    'Equipment',
    25,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Torch (6)',
    'Equipment',
    1,
    100
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Iron Spikes (12)',
    'Equipment',
    1,
    1000
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Rope (50'')',
    'Equipment',
    1,
    20
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Wooden Pole (10'')',
    'Equipment',
    1,
    15
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Iron Rations (1 person, 1 week)',
    'Equipment',
    15,
    25
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Leather Armor',
    'Armor',
    20,
    10
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Chain Mail Armor',
    'Armor',
    40,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Plate Mail Armor',
    'Armor',
    60,
    1
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Shield',
    'Armor',
    10,
    10
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Long Sword',
    'Weapons - Melee',
    10,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Mace',
    'Weapons - Melee',
    5,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Quartertaff',
    'Weapons - Melee',
    2,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Short Sword',
    'Weapons - Melee',
    7,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Two-Handed Sword',
    'Weapons - Melee',
    15,
    2
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Dagger',
    'Weapons - Melee',
    3,
    20
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Silver Dagger',
    'Weapons - Melee',
    30,
    1
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Hand Axe',
    'Weapons - Melee',
    4,
    15
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Battle Axe',
    'Weapons - Melee',
    7,
    5
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Long Bow',
    'Weapons - Ranged',
    40,
    1
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Short Bow',
    'Weapons - Ranged',
    25,
    2
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Cross Bow',
    'Weapons - Ranged',
    30,
    1
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Sling (30 stones incl.)',
    'Weapons - Ranged',
    2,
    1
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Quarrels (30)',
    'Ammunition',
    10,
    4
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Arrows (20)',
    'Ammunition',
    5,
    10
);

INSERT INTO PRODUCTS (
	product_name,
    department_name,
    price,
    stock_qty
) VALUES (
	'Bag of Holding',
    'Magic Items',
    5000,
    1
);

SELECT * FROM products;





