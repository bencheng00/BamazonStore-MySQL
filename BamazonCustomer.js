var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
		host: "localhost",
		port: 3306,
		user: "root", //your username
		password: "*DELETED*", //your password
		database: "bamazon"
})

var chosenindex;
var chosenquantity;
var chosenID;
var chosenprice;
var match=false;
prompt.start();

function runthisshit(){

connection.query("select * from products", function(err,res){
	if (err) throw err;
	for (a=0;a<res.length;a++){
	console.log("ID #"+res[a].ItemID+" || Product: "+res[a].ProductName+" || Price: "+res[a].Price+" || Category: "+res[a].DepartmentName);
	console.log("--------------------------------------------------------------------------------------------------------");
	}

	console.log(" ");
	console.log(" ");
	console.log("Enter the ID number of the item you wish to purchase.")
	console.log(" ");
	console.log(" ");
	prompt.get(['EnterItemID'], function(err, result1) {
		setTimeout(valid,2000);
		var choice=result1.EnterItemID;
		for (var b=0;b<res.length;b++){
			if (choice==res[b].ItemID){
				match=true;
				chosenindex=b;
				chosenquantity=res[b].StockQuantity;
				chosenID=res[b].ItemID;
				chosenprice=res[b].Price;
				console.log(" ");
				console.log(" ");
				console.log("You picked "+res[b].ProductName.toUpperCase()+". A fine choice. How many would you like?");
				console.log(" ");
				console.log(" ");

				prompt.get(['EnterQuantity'], function(err, result2) {
					var quantity=result2.EnterQuantity;
					if(quantity>res[chosenindex].StockQuantity){
						console.log(" ");
						console.log(" ");
						console.log("We don't have enough of those to satisfy your unreasonable demands. We only have "+res[chosenindex].StockQuantity+".");
						console.log(" ");
						console.log(" ");
						setTimeout(greedy,2000);
						setTimeout(done,4000);
					}
					else if (quantity<1){
						console.log(" ");
						console.log(" ");
						console.log("Are you shitting me?");
						console.log(" ");
						console.log(" ");
						setTimeout(positive,2000);
					}
					else {
						chosenquantity=chosenquantity-quantity;
						totalcost=chosenprice*quantity;
						connection.query("UPDATE products SET StockQuantity="+chosenquantity+" where ItemID="+chosenID, function(err,res){
						if (err) throw err;
						console.log(" ");
						console.log(" ");
						console.log("Your order has been filled. You owe $"+totalcost+".");
						console.log(" ");
						console.log(" ");
						console.log("There are "+chosenquantity+" left where those came from.");
						process.exit();
						})

					}
				})
			}
			
		}

	})
})

 

}


runthisshit();





function greedy(){
	console.log("GREEDY BASTARD.")
	console.log(" ");
	console.log(" ");
}

function done(){
	console.log("Your order will not be filled, and we're done doing business with you. Goodbye.");
	process.exit();
}

function valid(){
	if (match==false){
		console.log(" ");
		console.log(" ");
		console.log("You didn't enter a valid ID, dumbass. Get the f%$k out of my store.");
		process.exit();
	}
}

function positive(){
	console.log("We only sell in positive quantities, dumbass. Get the f&$k out of my store.");
	process.exit();
}