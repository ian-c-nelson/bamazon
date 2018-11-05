const Rx = require("rxjs");
const inquirer = require("inquirer");
const BamazonCustomerController = require("./modules/bamazon-customer");

// potential launching points for manager and supervisor views

const entryQuestion = {
    name: "entry-question",
    message: "Which interface would you like to access?",
    type: "list",
    choices: [
        {
            name: "Customer",
            value: "customer",
            short: "Customer"
        }, {
            name: "Manager (Not Yet Implemented)",
            value: "manager",
            short: "Manager"
        }, {
            name: "Supervisor (Not Yet Implemented)",
            value: "supervisor",
            short: "Supervisor"
        }, {
            name: "Exit",
            value: "exit",
            short: "Exit"
        },
    ],
    default: 0
};

let prompts = new Rx.Subject();
inquirer.prompt(prompts).ui.process.subscribe({
    next: response => {
        console.log(response);
        switch (response.answer) {
            case "customer":
                console.log("Initiating Customer Interface.");
                const customerController = new BamazonCustomerController();

                customerController.initiateInterface(() => {
                    console.log("Thank You!. Happy adventuring!");
                    prompts.complete();
                    customerController.dispose();
                });
                
                break;
            case "manager":
                //TODO:
                console.log(chalk.red("Manager Interface coming soon!"));
                prompts.next(entryQuestion);
                break;
            case "supervisor":
                //TODO:
                console.log(chalk.red("Supervisor Interface coming soon!"));
                prompts.next(entryQuestion);
                break;
            case "exit":
                prompts.complete();
                break;
            default:
                console.log(chalk.red("Invalid Interface."));
                prompts.next(entryQuestion);

                break;
        }

    },
    error: err => log(err, "error"),
    complete: () => {

        
    }
});

prompts.next(entryQuestion);




