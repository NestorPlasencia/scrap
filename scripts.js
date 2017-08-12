var globalStore
$(function() {
    $('#get-button').on('click', function() {
        $.ajaxSetup({async:false})
        console.log("Vamos a importar los cursos");
        $.get("json/platzi-cursos.json", function(cursos, status){
              if ( status == "success") {
                cursos.forEach(function(curso){
                    var identidad_curso = btoa(curso.nombre + curso.plataforma)
                    console.log("Buscamos el "+ curso.nombre +" en wordpress");                        
                    //$.get('http://localhost/curseando/wp-json/wp/v2/cursos', function(cursosw, status){
                    $.get('http://localhost/normal/wp-json/acf/v3/cursos', function(cursosw, status){
                        if ( status == "success") {
                            var existe = false
                            console.log(cursosw[0])
                            
                            /*
                            cursosw.forEach(function(cursow){
                                if(cursow.identidad[0]==identidad_curso){
                                    existe = true
                                    console.log("El "+ cursow.title.rendered + " ya existe");
                                }
                            })
                            if (existe == false) {
                                console.log("Vamos a agregar el "+ curso.nombre );
                                $.ajax({
                                    url: 'http://localhost/curseando/wp-json/wp/v2/cursos/',
                                    type: 'post', dataType: 'json',
                                    data: {
                                        title:          curso.nombre,
                                        imagen_curso:   curso.figure,
                                        descripcion:    curso.description,
                                        identidad:      identidad_curso,
                                        temario:        JSON.stringify(curso.temario),
                                        status:         "publish"
                                    },
                                    headers: {Authorization: 'Basic QE5lc1BsYXNlbmNpYTpjdXJzZWFuZG8='},
                                });
                            }
                            */
                        }
                    },'json')
                })                    
            }
        },"json")         
        /*
        console.log("Vamos a importar los profesores");
        $.get("json/platzi-profesores.json", function(profesores, status){
              if ( status == "success") {
                profesores.forEach(function(profesor){
                    var identidad_instructor = btoa(profesor.nombre + profesor.plataforma)
                    console.log("Buscamos el profesor "+ profesor.nombre +" en wordpress");                        
                    
                    $.get('http://localhost/curseando/wp-json/wp/v2/instructores/', function(profesoresw, status){
                       
                        if ( status == "success") {
                            var existe = false
                            profesoresw.forEach(function(profesorw){
                                if(profesorw.identidad_instructor[0]==identidad_instructor){
                                   existe = true
                                   console.log("El instructor "+ profesor.nombre +" ya existe");
                                }
                            })
                            if (existe == false) {
                                console.log("Vamos a agregar el instructor "+ profesor.nombre );
                                $.ajax({
                                    url: 'http://localhost/curseando/wp-json/wp/v2/instructores/',
                                    type: 'post', dataType: 'json',
                                    headers: {Authorization: 'Basic QE5lc1BsYXNlbmNpYTpjdXJzZWFuZG8='},
                                    data: {
                                        title:                  profesor.nombre,
                                        identidad_instructor:   identidad_instructor,
                                        twitter_name:           profesor.twitter,
                                        twitter_link:           profesor.twitter_link,
                                        etiqueta:               profesor.label,
                                        imagen:                 profesor.figure,
                                        status:                 "publish",
                                        cursos:                 JSON.stringify(profesor.cursos),
                                    },                                    
                                });
                                /*
                                console.log("Vamos a agregar los cursos de "+ profesor.nombre );
                                $.get('http://localhost/curseando/wp-json/wp/v2/instructores', function(instructoresw, status){
                                    if ( status == "success") {
                                        instructoresw.forEach(function(instructor){
                                            if(instructor.identidad_instructor[0]==identidad_instructor){
                                                profesor.cursos.forEach(function(curso){
                                                    console.log(curso)
                                                    /* 
                                                    $.ajax({
                                                        url: 'http://localhost/curseando/wp-json/wp/v2/instructores/'+instructor.id+'/',
                                                        type: 'post', dataType: 'json',
                                                        headers: {Authorization: 'Basic QE5lc1BsYXNlbmNpYTpjdXJzZWFuZG8='},
                                                        data: {cursos: curso},
                                                        success: function(result){
                                                            console.log("Se ha agregado el curso");
                                                        }                                    
                                                    });
                                                   
                                                    var cursoData = {
                                                        cursos: curso,
                                                    }
                                                    $.ajaxSetup({async:false})
                                                    var createCurso = new XMLHttpRequest();
                                                    createCurso.open('POST','http://localhost/curseando/wp-json/wp/v2/instructores/'+instructor.id+'/');
                                                    createCurso.setRequestHeader("Authorization", "Basic QE5lc1BsYXNlbmNpYTpjdXJzZWFuZG8=")
                                                    createCurso.setRequestHeader("Content-Type",'application/json;charset=UTF-8')
                                                    createCurso.send( JSON.stringify(cursoData));    


                                                })
                                            }
                                        })

                                    }
                                })
                                
                            }
                        
                        }
                    },'json')
                })                    
            }
        },"json") 
        */   
    })
})

           
        /*

        / GET/READ
    /*$('#get-button').on('click', function() {
        $.ajax({
            url: 'http://localhost/curseando/wp-json/wp/v2/cursos',
            contentType: 'application/json',
            success: function(response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function(curso) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + curso.title.rendered + '</td>\
                            <td><input type="text" class="name" value="' + curso.imagen_curso + '"></td>\
                            <td>\
                                <button class="update-button">' + curso.descripcion + '</button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    });

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'json/platzi-profesores.json', true); 
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                var profesores = JSON.parse(xobj.responseText);
                profesores.forEach(function(profesor){
                    var cursoData = {
                        title:        profesor.nombre,
                        twitter_name: profesor.twitter,
                        twitter_link: profesor.twitter_link,
                        etiqueta:     profesor.label,
                        imagen:       profesor.figure,
                        cursos:       profesor.cursos,
                        status: "publish",
                    }

                    //console.log(udecodeURIComponent(escape(curso.nombre)))
                    var createCurso = new XMLHttpRequest();
                    createCurso.open('POST','http://localhost/curseando/wp-json/wp/v2/instructores/');
                    
                    createCurso.setRequestHeader("Authorization", "Basic QE5lc1BsYXNlbmNpYTpjdXJzZWFuZG8=")
                    createCurso.setRequestHeader("Content-Type",'application/json;charset=UTF-8')
                    createCurso.send( JSON.stringify(cursoData));

                })
              }
        };
        xobj.send(null);


        var ourRequest = new XMLHttpRequest();
        ourRequest.open('GET', 'http://localhost/curseando/wp-json/wp/v2/cursos');
        ourRequest.onload = function() {
            var tbodyEl = $('tbody');
            tbodyEl.html('');
            if (ourRequest.status >= 200 && ourRequest.status < 400) {
                var data = JSON.parse(ourRequest.responseText);
                console.log(data)
                data.forEach(function(curso) {
                   tbodyEl.append('\
                        <tr>\
                            <td class="id">' + curso.title.rendered + '</td>\
                            <td>' + curso.imagen_curso + '</td>\
                            <td>' + curso.descripcion + '</button>\
                            </td>\
                        </tr>\
                    ');
                })
            } else {
                console.log("We connected to the server, but it returned an error.");
            }
        };

        ourRequest.onerror = function() {
            console.log("Connection error");
        };
        ourRequest.send();




            var cursoData = {
                title: "hola soy un nuevo curso",
                imagen_curso: 'https://www.google.com',
                descripcion: "esta es una nueva prubeba de un nuevo curso",
                status: "publish"
            }

            var createCurso = new XMLHttpRequest();
            createCurso.open('POST','http://localhost/curseando/wp-json/wp/v2/cursos/');
            
            createCurso.setRequestHeader("Authorization", "Basic QE5lc1BsYXNlbmNpYTpjdXJzZWFuZG8=")
            createCurso.setRequestHeader("Content-Type",'application/json;charset=UTF-8')
            console.log(JSON.stringify(cursoData))
            createCurso.send( JSON.stringify(cursoData));

        })
        

    // CREATE/POST
    /*
    $('#get-button').on('click', function() {

        $.ajax({
            url: 'http://localhost/curseando/wp-json/wp/v2/cursos',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ title: "hola pros",
                                   imagen_curso: "https://www.google.com"
                                   descripcion_: "sakndasjdaldnaskldasdas"
                                }),
            
            success: function(response) {
                console.log(response);
                createInput.val('');
                $('#get-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();

        $.ajax({
            url: '/products/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ newName: newName }),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '.delete-button', function() {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();

        $.ajax({
            url: '/products/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });
    });
    */