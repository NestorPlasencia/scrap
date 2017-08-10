


var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://localhost/curseando/wp-json/wp/v2/cursos');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    var data = JSON.parse(ourRequest.responseText);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();