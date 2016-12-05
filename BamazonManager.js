var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root", //your username
		password: "*DELETED*", //your password
		database: "bamazon"
})

var lowstock=0;
var chosenindex;
var chosenproduct;
var chosenquantity;
var chosenID;
var newproductname;
var newproductdept;
var newproductprice;
var newproductquantity;




prompt.start();

function runthisshit(){

console.log("");
console.log("");
console.log("Here are your options, Big Shot Manager.");
console.log("");
console.log("");
console.log("(1) View All Products for Sale");
console.log("(2) View Low Inventory");
console.log("(3) Add to Inventory");
console.log("(4) Add New Product");
console.log("");
console.log("");
console.log("Which option number would you like?");

prompt.get(['EnterOptionNumber'], function(err, result1) {

var choice = parseInt(result1.EnterOptionNumber);


if (choice==1){
	viewproducts();
}
else if (choice==2){
	lowinventory();
}
else if (choice==3){
	addinventory();
}
else if (choice==4){
	addnewproduct();
}
else{
	dumbass();
	setTimeout(manager,2000);
	setTimeout(goodbye,4000);
}

})
}


runthisshit();






function viewproducts(){

connection.query("select * from products", function(err,res){
	if (err) throw err;
	console.log("");
	console.log("");
	for (a=0;a<res.length;a++){
	console.log("ID #"+res[a].ItemID+" || Product: "+res[a].ProductName+" || Price: "+res[a].Price+" || Department: "+res[a].DepartmentName+ " || Quantity in Stock: "+res[a].StockQuantity);
	console.log("--------------------------------------------------------------------------------------------------------------------------------------");
	}
	process.exit();
})
}

function lowinventory(){

connection.query("select * from products", function(err,res){
	if (err) throw err;
	console.log("");
	console.log("");
	console.log("Here are the items (if any) where you have fewer than 5 in stock:");
	console.log("");
	console.log("");
	for (b=0;b<res.length;b++){
		if (res[b].StockQuantity<5){
			console.log("ID #"+res[b].ItemID+" || Product: "+res[b].ProductName+" || Price: "+res[b].Price+" || Department: "+res[b].DepartmentName+ " || Quantity in Stock: "+res[b].StockQuantity);
			console.log("--------------------------------------------------------------------------------------------------------------------------------------");
			lowstock++;
		}
	}
	if (lowstock==0){
		console.log("You do not need to re-stock on anything. Go do something else with your managerial skills.")
	}
	process.exit();
})
}



function addinventory(){
	console.log("");
	console.log("");
	console.log("Which item ID number would you like to get more inventory of?");
	console.log("");
	console.log("");
	prompt.get(['EnterItemID'], function(err, result2) {
		var chosen=result2.EnterItemID;
		connection.query("select * from products", function(err,res){
			if (err) throw err;
			for (c=0;c<res.length;c++){
			if (res[c].ItemID==chosen){
				chosenindex=c;
				chosenquantity=parseInt(res[c].StockQuantity);
				chosenproduct=res[c].ProductName;
				chosenID=res[c].ItemID;
				console.log("");
				console.log("");
				console.log("You picked "+chosenproduct.toUpperCase()+". You currently have "+chosenquantity+" in stock. How many more do you want to add?");

				prompt.get(['EnterQuantity'], function(err, result3) {
					var quantity = parseInt(result3.EnterQuantity);
					chosenquantity=chosenquantity+quantity;
					connection.query("UPDATE products SET StockQuantity="+chosenquantity+" where ItemID="+chosenID, function(err,res){
					console.log("");
					console.log("");
					console.log("You added "+quantity+" more of the "+chosenproduct.toUpperCase()+". You now have "+chosenquantity+" in stock.");
					process.exit();
				})
				})
			}
		}
})
})
}



function addnewproduct(){

	console.log("");
	console.log("");
	console.log("Enter a Product Name for the new product you wish to add.")

	prompt.get(['EnterProductName'], function(err, result4) {

		newproductname = result4.EnterProductName;
		console.log("");
		console.log("");
		console.log("What department will this new product be in?")

		prompt.get(['EnterDepartment'], function(err, result5) {

			newproductdept = result5.EnterDepartment;
			console.log("");
			console.log("");
			console.log("What will be the price per unit of this new product?")

			prompt.get(['EnterPrice'], function(err, result6) {

				newproductprice = result6.EnterPrice;
				console.log("");
				console.log("");
				console.log("How many units of the new product do you want in stock?")

				prompt.get(['EnterQuantity'], function(err, result7) {

					newproductquantity=result7.EnterQuantity;

					connection.query("INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity) VALUES ('"+newproductname+"','"+newproductdept+"',"+newproductprice+","+newproductquantity+")", function(err,res){
						if (err) throw err;
						console.log("");
						console.log("");
						console.log("Your new product has been successfully added.");
						process.exit();
})
})
})
})
})
}

function dumbass(){
	console.log("");
	console.log("");
	console.log("You didn't enter a valid option, dumbass.");
};

function manager(){
	console.log("");
	console.log("");
	console.log("Given how stupid you are, how did you even become a manager in the first place?");
};

function goodbye(){
	console.log("");
	console.log("");
	console.log("GOODBYE, DUMBASS.");
	process.exit();
}