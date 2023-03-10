const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const { pathToFileURL } = require('url');
const { request } = require('http');
const file = require('./read_file.js');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '123456789',
	database : 'companie',
	port: 3306
});

connection.connect(function (err){
	if (err){
		console.log('Error connecting', err)
		return
	}
	console.log("Connected")
})

//Login
const app = express();
const cors = require("cors");
app.use(cors());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;

				// Redirect to home page
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
	response.redirect("/home")
	response.end()
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	response.sendFile(__dirname + '/home.html')
});

//Access through pages
/*app.get('/artists', function(request, response) {
	response.sendFile(__dirname + '/artists.html')
});*/

// app.get('/departments', function(request, response) {
// 	response.sendFile(__dirname + '/departments.html')
// });

// app.get('/events', function(request, response) {
// 	response.sendFile(__dirname + '/events.html')
// });

app.get('/admin', function(request, response) {
	response.sendFile(__dirname + '/admin.html')
});

app.get('/admin/insert-department', function(request, response) {
	response.sendFile(__dirname + '/insert_dep.html')
});

app.get('/admin/insert-event', function(request, response) {
	response.sendFile(__dirname + '/insert_event.html')
});

app.get('/admin/insert-artist', function(request, response) {
	response.sendFile(__dirname + '/insert_art.html')
});

app.get('/admin/delete-artist', function(request, response) {
	response.sendFile(__dirname + '/delete_art.html')
});

app.get('/admin/delete-department', function(request, response) {
	response.sendFile(__dirname + '/delete_dep.html')
});

app.get('/admin/delete-event', function(request, response) {
	response.sendFile(__dirname + '/delete_event.html')
});

app.get('/admin/update-artist', function(request, response) {
	response.sendFile(__dirname + '/update_art.html')
});

app.get('/admin/update-department', function(request, response) {
	response.sendFile(__dirname + '/update_dep.html')
});

app.get('/admin/update-event', function(request, response) {
	response.sendFile(__dirname + '/update_event.html')
});

/*
app.get('/orice', function(request, response) {
	response.sendFile(__dirname + '/orice.html')
});
*/

//Add values in database
app.post('/admin/insert-artist', function(request, response, next){
	// var artistID = request.body.artistID;
	var departamentID = request.body.departamentID;
	var nume = request.body.nume;
	var prenume = request.body.prenume;
	var cnp = request.body.cnp;
	var sex = request.body.sex;
	var telefon = request.body.telefon;
	var strada = request.body.strada;
	var numar = request.body.numar;
	var salariu = request.body.salariu;

	//Fara ArtistID si DepartamentID
	var query = `INSERT INTO Artist ( DepartamentID, Nume, Prenume, CNP, Sex, Telefon, Strada, Numar, Salariu)  
				 VALUES  ("${departamentID}", "${nume}", "${prenume}", "${cnp}", "${sex}", "${telefon}", "${strada}", "${numar}", "${salariu}")`;


	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin/insert-department");
		}
	})
})

app.post('/admin/insert-department', function(request, response, next){
	// var depID = request.body.depID;
	var numeDepartament = request.body.numeDepartament;
	var codDep = request.body.codDep;

	//Fara DepartamentID
var query = `INSERT INTO Departamente (NumeDepartament, CodDep)  
				 VALUES  ("${numeDepartament}", "${codDep}")`;

	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin/insert-event");
		}
	})
})

//Fara EvenimentID
app.post('/admin/insert-event', function(request, response, next){

	var tipEveniment = request.body.tipEveniment;
	var codEveniment = request.body.codEveniment;
	var buget = request.body.buget;


	var query = `INSERT INTO Evenimente (TipEveniment, CodEveniment, Buget)  
				 VALUES  ("${tipEveniment}", "${codEveniment}", "${buget}")`;


	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin");
		}
	})
})

app.post('/admin/delete-artist', function(request, response, next){
	var nume = request.body.nume;
	var prenume = request.body.prenume;

	var query = `DELETE FROM Artist WHERE Nume="${nume}" AND Prenume="${prenume}";`;


	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin/delete-department");
		}
	})
})

app.post('/admin/delete-department', function(request, response, next){
	var numeDepartament = request.body.numeDepartament;

var query = `DELETE FROM Departamente WHERE NumeDepartament="${numeDepartament}";`;

	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin/delete-event");
		}
	})
})

app.post('/admin/delete-event', function(request, response, next){
	
	var tipEveniment = request.body.tipEveniment;
	var buget = request.body.buget;


	var query = `DELETE FROM Evenimente WHERE TipEveniment="${tipEveniment}" AND Buget="${buget}";`;


	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin");
		}
	})
})

app.post('/admin/update-artist', function(request, response, next){
	var currentNume = request.body.currentNume;
	var currentPrenume = request.body.currentPrenume;
	var nume = request.body.nume;
	var prenume = request.body.prenume;

	var query = `UPDATE Artist
					SET Nume="${nume}", Prenume="${prenume}"
					WHERE Nume="${currentNume}" AND Prenume="${currentPrenume}";`;


	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin/update-department");
		}
	})
})

app.post('/admin/update-department', function(request, response, next){
	var currentDep = request.body.currentDep;
	var dep = request.body.dep;

var query = `UPDATE Departamente
				SET NumeDepartament="${dep}"
				WHERE NumeDepartament="${currentDep}";`;

	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin/update-event");
		}
	})
})

app.post('/admin/update-event', function(request, response, next){
	var currentType = request.body.currentType;
	var currentBuget = request.body.currentBuget;
	var tip = request.body.tip;
	var buget = request.body.buget;


	var query = `UPDATE Evenimente
				SET TipEveniment="${tip}", Buget="${buget}"
				WHERE TipEveniment="${currentType}" AND Buget="${currentBuget}";`;


	connection.query(query, function(error, data){
		if(error){
			throw error;
		}else{
			response.redirect("/admin");
		}
	})
})


//Show  SimpleQuery 1 table in Big Salary page
//Fara ArtistID si DepartamentID
app.post("/home/big-salary", function(request, response){
	var salariu = request.body.salariu;

	var query = `SELECT *
				From Artist A INNER JOIN Departamente D ON A.DepartamentID = D.DepartamentID
				WHERE A.Salariu > "${salariu}"
				ORDER BY A.Salariu DESC`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].Nume}</td><td>${n[i].Prenume}</td>
				<td>${n[i].CNP}</td><td>${n[i].Sex}</td><td>${n[i].Telefon}</td><td>${n[i].Strada}</td><td>${n[i].Numar}</td><td>${n[i].Salariu}</td><td>${n[i].NumeDepartament}</td><td>${n[i].CodDep}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>ORDERED DESC BY SALARY > INPUT </p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Nume</th>"+
					"<th>Prenume</th>"+
					"<th>CNP</th>"+
					"<th>Sex</th>"+
					"<th>Telefon</th>"+
					"<th>Strada</th>"+
					"<th>Numar</th>"+
					"<th>Salariu</th>"+
					"<th>Nume Departament</th>"+
					"<th>Cod Departament</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  SimpleQuery 2 table in By Department page
//Fara ID
app.post("/home/by-department", function(request, response){
	var numeDepartament = request.body.numeDepartament;

	var query = `SELECT *
				From Artist A INNER JOIN Departamente D ON A.DepartamentID = D.DepartamentID
				WHERE D.NumeDepartament='${numeDepartament}'
				ORDER BY A.Nume DESC;`
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].Nume}</td><td>${n[i].Prenume}</td>
				<td>${n[i].CNP}</td><td>${n[i].Sex}</td><td>${n[i].Telefon}</td><td>${n[i].Strada}</td><td>${n[i].Numar}</td><td>${n[i].Salariu}</td><td>${n[i].NumeDepartament}</td><td>${n[i].CodDep}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>ORDERED DESC BY NAME WITH INPUT DEPARTMENT</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Nume</th>"+
					"<th>Prenume</th>"+
					"<th>CNP</th>"+
					"<th>Sex</th>"+
					"<th>Telefon</th>"+
					"<th>Strada</th>"+
					"<th>Numar</th>"+
					"<th>Salariu</th>"+
					"<th>Nume Departament</th>"+
					"<th>Cod Departament</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  SimpleQuery 3 table in Big Salary page
//Fara ID
app.post("/home/avg-salary", function(request, response){
	var salariu = request.body.salariu;

	var query = `SELECT D.NumeDepartament, COUNT(A.ArtistID) AS NrArtisti, 
				AVG(A.Salariu) AS MedieSalariu FROM Departamente D LEFT JOIN Artist A
				ON A.DepartamentID = D.DepartamentID
				GROUP BY D.NumeDepartament`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].NumeDepartament}</td><td>${n[i].NrArtisti}</td><td>${n[i].MedieSalariu}`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>AVERAGE SALARY AND NUMBER OF ARTISTS FOR EACH</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>NumeDepartament</th>"+
					"<th>NrArtisti</th>"+
				    "<th>MedieSalariu</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  SimpleQuery 4 table in Event Hours page
app.post("/home/event-hours", function(request, response){
	var ore = request.body.ore;

	var query = `SELECT E.TipEveniment, AE.NOreEveniment FROM Evenimente E
					INNER JOIN ArtistEveniment AE ON  AE.EvenimentID=E.EvenimentID 
					GROUP BY E.TipEveniment, AE.NOreEveniment 
					HAVING SUM(AE.NOreEveniment) >"${ore}"`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].TipEveniment}</td>, <td>${n[i].NOreEveniment}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>EVENTS WITH WORK HOURS > INPUT</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>TipEveniment</th>"+
					"<th>Total Ore</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  SimpleQuery 5 table in Artist's Events page
app.post("/home/artists-events", function(request, response){
	var nume = request.body.nume;

	var query = `SELECT DISTINCT E.TipEveniment, A.Nume
				FROM Artist A, ArtistEveniment AE, Evenimente E, Departamente D
				WHERE ((A.ArtistID = AE.ArtistID) AND (A.Nume = '${nume}') AND (E.EvenimentID
				= AE.EvenimentID));`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].Nume}</td><td>${n[i].TipEveniment}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>EVENTS WHERE INPUT ARTIST WORKS</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Nume</th>"+
					"<th>TipEveniment</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  SimpleQuery 6 table in Events' Artists page
app.post("/home/events-artists", function(request, response){

	var query = `SELECT E.TipEveniment, 
				COUNT(*) AS NrArtisti, 
				SUM(AE.NOreEveniment) AS NrOre
				FROM Evenimente E
				JOIN ArtistEveniment AE ON AE.EvenimentID = E.EvenimentID
				GROUP BY E.TipEveniment`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].TipEveniment}</td><td>${n[i].NrArtisti}</td><td>${n[i].NrOre}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>TOTAL NUMBER OF ARTISTS AND HOURS FOR EACH EVENT</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>TipEveniment</th>"+
					"<th>NrArtisti</th>"+
					"<th>NrOre</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  ComplexQuery 1 table in Department's Salary page
app.post("/home/salary-department", function(request, response){

	var query = `select d.numedepartament, avg(a.salariu)as medieSal
				from departamente d, artist a
				where a.departamentid = d.departamentid
				group by d.departamentid, d.numedepartament
				having avg(a.salariu) > (select avg(salariu) from artist)`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].numedepartament}</td><td>${n[i].medieSal}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>DEPARTMENTS WITH AVG SALARY > AVG SALARY OF COMPANY</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>NumeDepartament</th>"+
					"<th>MedieSal</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  ComplexQuery 2 table in Artist Without Event page
app.post("/home/artist-without-event", function(request, response){

	var query = `SELECT A.Nume, A.Prenume
				FROM Artist A
				WHERE A.ArtistID NOT IN (SELECT ArtistID
				FROM ArtistEveniment)`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].Nume}</td><td>${n[i].Prenume}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>ARTIST WITHOUT EVENT</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Nume</th>"+
					"<th>Prenume</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  ComplexQuery 3 table Events of Departments page
app.post("/home/events-buget-names", function(request, response){

	var query = `SELECT evenimente.tipeveniment as event, evenimente.buget as buget, (SELECT GROUP_CONCAT(artist.nume) FROM artisteveniment
	JOIN artist ON artisteveniment.artistid = artist.artistid
	WHERE artisteveniment.evenimentid = evenimente.evenimentid) as artist_name
	FROM evenimente
	JOIN artisteveniment ON evenimente.evenimentid = artisteveniment.evenimentid
	GROUP BY evenimente.evenimentid;`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].event}</td><td>${n[i].buget}</td><td>${n[i].artist_name}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>BUDGET AND ARTISTS FOR EACH EVENT</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Eveniment</th>"+
					"<th>Buget</th>"+
					"<th>Numele artistilor</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})

//Show  ComplexQuery 4 table Full name and department page
app.post("/home/full-name-artist-department", function(request, response){
	var numeArtist = request.body.numeArtist;

	var query = `SELECT artist.nume as nume, artist.prenume as prenume, (SELECT departamente.numedepartament FROM departamente WHERE departamente.departamentid = artist.departamentid) as numedepartament
	FROM artist
	WHERE artist.nume ="${numeArtist}";
`;
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].nume}</td><td>${n[i].prenume}</td><td>${n[i].numedepartament}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>ARTIST'S FULL NAME AND DEPARTMENT</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Nume</th>"+
					"<th>Prenume</th>"+
					"<th>Nume Departament</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
	}
	})
})
	
//Show Artist table in Artists page
//Fara ID
app.get("/artists", function(request, response){
	
	var query = "SELECT * FROM Artist ORDER BY ArtistID ASC";
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].Nume}</td><td>${n[i].Prenume}</td>
				<td>${n[i].CNP}</td><td>${n[i].Sex}</td><td>${n[i].Telefon}</td><td>${n[i].Strada}</td><td>${n[i].Numar}</td><td>${n[i].Salariu}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists' class='active'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>Our Artists</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Nume</th>"+
					"<th>Prenume</th>"+
					"<th>CNP</th>"+
					"<th>Sex</th>"+
					"<th>Telefon</th>"+
					"<th>Strada</th>"+
					"<th>Numar</th>"+
					"<th>Salariu</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
		}
	})
})

//Show Departments table in Departments page
//Fara ID
app.get("/departments", function(request, response){
	
	var query = "SELECT * FROM Departamente ORDER BY DepartamentID ASC";
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].NumeDepartament}</td><td>${n[i].CodDep}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments' class='active'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>Our Departments</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Nume Departament</th>"+
					"<th>Cod Departament</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
		}
	})
})

//Show Events table in Events page
//Fara ID
app.get("/events", function(request, response){
	
	var query = "SELECT * FROM Evenimente ORDER BY EvenimentID ASC";
	
	connection.query(query, function(error, data){
		if(error){
			throw error;
		} else{
			var n = JSON.parse(JSON.stringify(data));
			let output = ``;
			for(var i = 0; i < n.length; i++){
				output += `<tr>`;
				output += `<td>${n[i].TipEveniment}</td><td>${n[i].CodEveniment}</td><td>${n[i].Buget}</td>`;
				output += `</tr>`;
			}
			response.send("<html><head><meta charset='UTF-8'>"+
			"<meta http-equiv='X-UA-Compatible' content='IE=edge'>"+
			"<meta name='viewport' content='width=device-width, initial-scale=1.0'>"+
			"<link rel='stylesheet' href='/navbar_style.css'>"+
			"<link rel='stylesheet' href='/search.css'>"+
			"<script src='https://kit.fontawesome.com/17944d46af.js' crossorigin='anonymous'></script><link rel='stylesheet' href='/table.css'><title>Artists</title></head><body><header>"+
			"<div class='logo'>Eventim</div>"+
				"<form class='search-bar'>"+
					"<input type='text' class='search' placeholder='Cauta artisti si evenimente'>"+
					"<button type='submit' class='btn'><i class='fa fa-search'></i></button>"+
				"</form>"+
			"<div class='hamburger'>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
				"<div class='line'></div>"+
			"</div>"+
			"<nav class='nav-bar'>"+
				"<ul>"+
					"<li>"+
						"<a href='/home'>Home</a>"+
					"</li>"+
					"<li>"+
						"<a href='/artists'>Artists</a>"+
					"</li>"+
					"<li>"+
						"<a href='/departments'>Departments</a>"+
					"</li>"+
					"<li>"+
						"<a href='/events' class='active'>Events</a>"+
					"</li>"+
					"<li>"+
						"<a href='/admin'><i class='fa-solid fa-user'></i></a>"+
					"</li>"+
				"</ul>"+
			"</nav></header><p>Our Events</p><div class='table-wrapper'>" +
			"<table class='fl-table'>" +
				"<thead>" +
				"<tr>"+
					"<th>Tip Eveniment</th>"+
					"<th>Cod Eveniment</th>"+
					"<th>Buget</th>"+
				"</tr>"+
				"</thead>"+
				"<tbody>"
				+ output +
				"</tbody>"+
			"</table>"+
		"</div></body></html>");
		}
	})
})



app.listen(3000);