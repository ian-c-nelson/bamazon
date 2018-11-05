require("dotenv").config();
const mysql = require("mysql");

// bamazon specific database functions
class BamazonDataBase {
    constructor() {
        this.createConnection();
    }
};

BamazonDataBase.prototype.dispose = function () {
    this.closeConnection();
};

BamazonDataBase.prototype.createConnection = function () {
    this.connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_SCHEMA
    });

    this.connection.connect(function (err) {
        if (err) console.log(err);
    });
};

BamazonDataBase.prototype.closeConnection = function () {
    this.connection.end();
};

BamazonDataBase.prototype.getCategories = function (callback) {
    let sql = "SELECT DISTINCT(department_name) FROM products ORDER BY department_name";

    if (!callback || typeof callback !== "function") {
        return console.log("Invalid Arguments: A callback function is required.");
    }

    var query = this.connection.query(sql, (err, results) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }

        callback(results);
    });
};

BamazonDataBase.prototype.getProduct = function (id, callback) {
    let sql = "SELECT * FROM products WHERE id = ?";

    if (!callback || typeof callback !== "function") {
        return console.log("Invalid Arguments: A callback function is required.");
    }

    var query = this.connection.query(sql, id, (err, results) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }

        callback(results[0]);
    });
};

BamazonDataBase.prototype.getProducts = function () {
    let sql = "SELECT * FROM products";
    let callback = null;
    let department = null;

    if (arguments.length > 1) {
        callback = arguments[1];
        if (arguments[0]) {
            department = { department_name: arguments[0] };
            sql += " WHERE ?"
        }
    } else {
        callback = arguments[0];
    }

    if (!callback || typeof callback !== "function") {
        return console.log("Invalid Arguments: A callback function is required.");
    }

    var query = this.connection.query(sql, department, (err, results, fields) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }

        callback(results, fields);
    });
};

BamazonDataBase.prototype.updateProduct = function (product, callback) {
    let sql = `UPDATE products 
                SET product_name = ?,
                    department_name = ?,
                    price = ?,
                    stock_qty = ?
                WHERE id = ?`;

    if (!product) {
        return console.log("Invalid Arguments: A product is required.");
    }
    
    let valueArray = [
        product.product_name,
        product.department_name,
        product.price,
        product.stock_qty,
        product.id
    ];
    
    let query = this.connection.query(sql, valueArray, (err, results) => {
        if (err) {
            console.log(err);
            callback({ error: err });
        }

        if (typeof callback === "function") {
            callback(results);
        }
    });
};

console.log("BamazonDataBase imported.");

module.exports = BamazonDataBase;