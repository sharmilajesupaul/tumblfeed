var xhr = new XMLHttpRequest();
var data = {};

xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        try {
          data = JSON.parse(xhr.response);
          init(data);
        } catch (err) {
          console.error("Unable to parse data");
        }
    }
};
xhr.open('GET', '/data', true);
xhr.send(null);

