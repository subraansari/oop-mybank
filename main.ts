#! /usr/bin/env node
import inquirer from "inquirer"

// Bank Account interface
interface BankAccount{
    accountNumber : number;
    balance : number;
    withdraw(amount : number): void
    deposit(amount : number): void
    checkbalance(): void
}

// Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber : number , balance : number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }

// Debit Money
withdraw(amount: number): void {
    if(this.balance >= amount) {
        this.balance -= amount;
        console.log(`Withdrawal of $${amount} Successfully. Remaining balance: $${this.balance}`);
        
    } else {
        console.log("Insufficient Balance!!");
        
    }
}

// Credit Money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1; //$1 fee charged if more than $100 is deposited
    } this.balance += amount
    console.log(`Deposit of $${amount} successful. Remaing balance: $${this.balance}`);
    
}

// Check Balance
checkbalance(): void {
    console.log(`Current Balance: $${this.balance}`);
    
}
}

// Customer class
class Customer{
    firstName : string;
    lastName : string;
    gender : string;
    age : number;
    mobileNumber : number;
    account : BankAccount;

    constructor(firstName : string, lastName : string, gender : string, age : number, mobileNumber : number, account : BankAccount)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account
    }
}

// Create Bank Acconts
const accounts : BankAccount[] = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000),
];

// Create customers
const customers : Customer[] = [
    new Customer("Hamza" , "Khan" , "Male" , 12 , 3124907611 , accounts[0]),
    new Customer("Subra" , "Ansari" , "Female" , 19 , 3186944609 , accounts[1]),
    new Customer("Sana" , "Khan" , "Female" , 25 , 3111675250 , accounts[2])

]

// Function to interact with bank account

async function service(){
    do{
        const accountNumberInput = await inquirer.prompt(
            [
                {
                    name : "accountNumber",
                    type : "number",
                    message : "Enter Your Account Number:"
                }
            ]
        )
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt(
                [
                    {
                        name : "select",
                        type : "list",
                        message : "Select an Operation",
                        choices : ["Deposit" , "Withdraw" , "Check Balance" , "Exit"]
                    }
                ]
            )
            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt(
                        [
                            {
                                name : "amount",
                                type : "number",
                                message : "Enter the Amount to deposit:"
                            }
                        ]
                    )
                    customer.account.deposit(depositAmount.amount);
                    break;
                    case "Withdraw":
                    const withdrawAmount = await inquirer.prompt(
                        [
                            {
                                name : "amount",
                                type : "number",
                                message : "Enter the Amount to withdraw:"
                            }
                        ]
                    )
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                    case "Check Balance":
                        customer.account.checkbalance()
                        break;
                        case "Exit":
                            console.log("Exit from the program...");
                            console.log("\n Thank You For using Our Bank Services. Have a great day!");
                            return;
                            
                            
                }
            
        }
        else {
            console.log("Invalid Account Number... Please try Again!!");
            
        }
    } while(true)
}

service()