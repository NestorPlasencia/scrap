var request = require('request'),
	cheerio = require('cheerio'),
	fs 		= require('fs')

var carreras = {}
var cursos = {}
var profesores = {}

request({url: 'https://codigofacilito.com/', encoding: 'binary'}, function(err, resp, body){
	if(!err && resp.statusCode == 200){
		
		var $ = cheerio.load(body);
		
		// Directorio de Carreras y cursos
		// sudo /opt/lampp/share/xampp-control-panel/xampp-control-panel
		carreras = []		
		cursos = []
		profesores = []
		/*
		$('.Career').each(function(){
			var titulo = $(this).find('.Career-name').html();
			var imagen = $(this).find('.Career-headerPrimary img').attr('src');
			console.log(titulo)
			console.log(imagen)

			var carrera = {
				titulo: titulo,
				imagen: imagen
			};

			var Career = cheerio.load( $(this).html() )
			var courses = {}
			courses = []
			Career('.CareerCourse').each(function(){
				
				var nombre = $(this).find('.CareerCourse-name').html();
				var link = $(this).attr('href');
				var url_cursos = 'https://codigofacilito.com/cursos' + link.slice(7, -1);
				var url_clases = 'https://codigofacilito.com/clases' + link.slice(7, -1);
				var figure = $(this).find('.CareerCourse-badge img').attr('src');
				courses.push(nombre)
				
				var curso = {
					nombre: nombre,
					link: link,
					figure: figure,
					url_cursos: url_cursos,
					url_clases: url_clases
				}

				var test = false
				for (var i = 0; i < cursos.length; i++){
				  if (cursos[i].nombre == curso.nombre){
				  	cursos[i].carreras.push(carrera.titulo)				  
				  	test = true
				  }
				}

				if (test == false) {
					curso.carreras = []
					curso.carreras.push(carrera.titulo)
					curso.description = ""
					cursos.push(curso)
				}
			
			})
			
			carrera.cursos = courses
			carreras.push(carrera)

		});
		*/
		
		

		fs.writeFileSync("json/codigofacilito-carreras.json", JSON.stringify(carreras));
		fs.writeFileSync("json/codigofacilito-cursos.json", JSON.stringify(cursos));
		fs.writeFileSync("json/codigofacilito-profesores.json", JSON.stringify(profesores));


		//cursos.length;
		/*
		for (var i = 0; i < cursos.length ; i++){
	
			request({url: cursos[i].url_cursos, encoding: 'binary'}, function(err, resp, body){
				if (err){
					console.log(err)
				}else if( resp.statusCode == 200){
					
					var curso_page = cheerio.load(body);
					var nombre_curso = curso_page('.BannerTop-courseInfo h1').html(); 
					var description = curso_page('.BannerTop-description').html();
					var video = curso_page('.u-videoSource').attr('src');
					
					
					var teachers = {}
					teachers = []
					
					var profesor 
					
					curso_page('.Teacher').each(function(){
						profesor = {
							nombre: $(this).find('.Teacher-name').html(),
							twitter: $(this).find('.Teacher-link').html(),
							label: $(this).find('.Teacher-label').html(),
							figure:  $(this).find('.Teacher-image img').attr('src')
						}
						teachers.push(profesor)

						var profesores = JSON.parse(fs.readFileSync('json/codigofacilito-profesores.json', 'utf8'));
						console.log(profesores.length)
						if(profesores.length == 0){
							profesor.cursos = []
							profesor.cursos.push(nombre_curso)
							profesores[profesores.length] = profesor
						}else{
							var test = false
							for (i=0;i<profesores.length;i++){
								if (profesores[i].nombre == profesor.nombre){
									profesores[i].cursos.push(nombre_curso)
									test = true
								}
							}
							if(test == false) {
								profesor.cursos = []
								profesor.cursos.push(nombre_curso)
								profesores[profesores.length] = profesor
							}
						}
						fs.writeFileSync("json/codigofacilito-profesores.json", JSON.stringify(profesores));	
					})
									
					
					var cursos = JSON.parse(fs.readFileSync('json/codigofacilito-cursos.json', 'utf8'));			

					for (i=0;i <cursos.length;i++){
						if (cursos[i].nombre == nombre_curso){
							cursos[i].description = description
							cursos[i].video = video
							cursos[i].teachers = teachers
							console.log(cursos[i].nombre)
							fs.writeFileSync("json/codigofacilito-cursos.json", JSON.stringify(cursos));
						}
					}
				}else{
					console.log("Otro error")	
				}
			})

			
			request({url: cursos[i].url_clases, encoding: 'binary'}, function(err, resp, body){
				if (err){
					console.log(err)
				}else if( resp.statusCode == 200){
					
					var clase_page = cheerio.load(body);
					var nombre_curso = clase_page('.CourseBanner-title span').html(); 
										
					var capitulos = {}
					capitulos = []
					clase_page('.Concept').each(function(){
						var titulo = $(this).find('.Concept-title').text()
						var concepto = cheerio.load( $(this).html() )
						var temas = {}
						temas = []
						concepto('.Material').each(function(){
							var titulo_material = $(this).find('.MaterialContent-title').text()
							var clase = $(this).find('.MaterialType span').attr('class') 
							var tipo
							if (clase == "icon-doc") { tipo = "Lectura" }
							if (clase == "icon-play_A") { tipo = "Video" }
							var instructor = $(this).find('.MaterialAuthor-name').html()
							var tiempo =  $(this).find('.MaterialMeta-duration span').text()
							var material = {
								titulo: titulo_material,
								tipo: tipo,
								instructor: instructor,
								tiempo: tiempo
							}
							temas.push(material)
						})
						var capitulo ={
							titulo: titulo,
							temas: temas
						}
						capitulos.push(capitulo)
					})

					var cursos = JSON.parse(fs.readFileSync('json/codigofacilito-cursos.json', 'utf8'));
					
					for (i=0;i <cursos.length;i++){
						if (cursos[i].nombre == nombre_curso){
							cursos[i].temario = capitulos
							console.log("Temario de ")
							console.log(cursos[i].nombre)
							fs.writeFileSync("json/codigofacilito-cursos.json", JSON.stringify(cursos));
						}
					}
				}else{
					console.log("Otro error")	
				}
			})	
		}
		*/
		
		console.log('Fin');
	}
});