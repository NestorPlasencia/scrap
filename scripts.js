$(function() {
    // GET/READ
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
    });*/


    $('#get-button').on('click', function() {

        console.log("Estamos entrando");

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'json/platzi-cursos.json', true); 
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                var cursos = JSON.parse(xobj.responseText);
                cursos.forEach(function(curso){
                    var cursoData = {
                        title: curso.nombre,
                        imagen_curso: curso.figure,
                        descripcion: curso.description,
                        identidad: btoa(curso.nombre + curso.plataforma),
                        status: "publish"
                    }
                    //console.log(udecodeURIComponent(escape(curso.nombre)))
                    var createCurso = new XMLHttpRequest();
                    createCurso.open('POST','http://localhost/curseando/wp-json/wp/v2/cursos/');
                    createCurso.setRequestHeader("Authorization", "Basic QE5lc1BsYXNlbmNpYTpjdXJzZWFuZG8=")
                    createCurso.setRequestHeader("Content-Type",'application/json;charset=UTF-8')
                    createCurso.send( JSON.stringify(cursoData));

                })
              }
        };
        xobj.send(null);
    })
});
        /*


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