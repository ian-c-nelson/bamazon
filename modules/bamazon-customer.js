require("./string-utils");
const BamazonDataBase = require("./bamazon-db");
const inquirer = require("inquirer");
const chalk = require("chalk");
const { table } = require('table');
const Rx = require("rxjs");

class BamazonCustomerController {
    constructor() {
        this.db = new BamazonDataBase();
    }
}

BamazonCustomerController.prototype.dispose = function () {
    this.db.dispose();
}

BamazonCustomerController.prototype.getOutput = function (dataRows, fields) {
    var outputArr = [];
    var valueArray = [];

    // Add an array for the headers
    fields.forEach(fieldDef => {
        valueArray.push(chalk.bold.magentaBright(fieldDef.name));
    });
    outputArr.push(valueArray);

    // Add an array for the data rows
    dataRows.forEach(dataRow => {
        valueArray = [];
        for (const key in dataRow) {
            if (dataRow.hasOwnProperty(key)) {
                const value = dataRow[key];
                valueArray.push(chalk.cyan(value));
            }
        }
        outputArr.push(valueArray);
    })

    return table(outputArr);
};

BamazonCustomerController.prototype.listProducts = function (department, callback) {
    this.db.getProducts(department, (products, fields) => {
        let output = this.getOutput(products, fields)
        // print out the table
        console.log(output);

        if (typeof callback === "function") {
            setTimeout(() => {
                callback(products);
            }, 50);
        }
    });
};

BamazonCustomerController.prototype.handlePurchase = function(purchaseId, purchaseQuantity, callback) {
    this.db.getProduct(purchaseId, results => {
        let item = results;
        let remainingQuantity = item.stock_qty - purchaseQuantity;
        if (remainingQuantity < 0) {
            console.log(chalk.red("Insufficient quantity available. Purchase cancelled."));
            if (typeof callback === "function") {
                callback();
            }
        } else {
            item.stock_qty = remainingQuantity;
            this.db.updateProduct(item, (results) => {
                if(!results.affectedRows) {
                    console.log(results);
                }

                console.log(chalk.greenBright(purchaseQuantity + " units of " + item.product_name + " purchased. Total Cost: " + (purchaseQuantity * parseFloat(item.price)) + " gold."));
                if (typeof callback === "function") {
                    callback();
                }
            });
        }
    })
}

BamazonCustomerController.prototype.initiateInterface = function (callback) {
    let purchaseId = null;
    let purchaseQuantity = null;

    this.db.getCategories(categories => {
        // Build the category choice array
        let categoryChoices = [];
        categories.forEach(category => {
            let choice = {
                name: chalk.magenta(category.department_name),
                value: category.department_name,
                short: category.department_name
            }

            categoryChoices.push(choice);
        });

        let questions = {
            browseCategories: {
                name: "browse-categories",
                message: "Which category would you like to browse?",
                type: "list",
                choices: categoryChoices
            },
            getPurchaseId: {
                name: "get-purchase-id",
                type: "input",
                message: "Which item (ID) would you like to purchase?"
            },
            getPurchaseQuantity: {
                name: "get-purchase-quantity",
                type: "input",
                message: "How many would you like to purchase?",
                default: 1
            },
            makeAnotherPurchase: {
                name: "make-another-purchase",
                type: "list",
                choices: [{
                    name: "Yes",
                    value: true
                },
                {
                    name: "No",
                    value: false
                }],
                default: true
            }
        };


        // step through and collect the information required to make a purchase.
        let prompts = new Rx.Subject();
        inquirer.prompt(prompts).ui.process.subscribe({
            next: response => {
                switch (response.name) {
                    case "browse-categories":
                        this.listProducts(response.answer, products => {
                            questions.getPurchaseId.default = products[0].id;
                            prompts.next(questions.getPurchaseId);
                        });
                        break;

                    case "get-purchase-id":
                        if (response.answer) {
                            purchaseId = response.answer;
                            prompts.next(questions.getPurchaseQuantity)
                        } else {
                            console.log(chalk.red("No item selected. Purchase cancelled."));
                            prompts.complete();
                        }
                        break;

                    case "get-purchase-quantity":
                        if (response.answer) {
                            purchaseQuantity = parseInt(response.answer);
                            if(purchaseQuantity && purchaseId) {
                                this.handlePurchase(purchaseId, purchaseQuantity, results => {
                                    prompts.next(questions.makeAnotherPurchase);
                                })
                            }
                        } else {
                            console.log(chalk.red("No quantity entered. Purchase cancelled."));
                            prompts.next(questions.makeAnotherPurchase);
                        }
                        break;

                    case "make-another-purchase":
                        if(!response.answer) {
                            prompts.complete();
                        } else {
                            prompts.next(questions.browseCategories);
                        }
                        break;
                    default:
                        prompts.complete();
                        break;
                }

            },
            error: err => log(err, "error"),
            complete: () => {
                if (typeof callback === "function") {
                    callback();
                }
            }
        });

        prompts.next(questions.browseCategories);

    });
};

console.log("BamazonCustomerController imported.");

module.exports = BamazonCustomerController;