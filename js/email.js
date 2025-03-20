(function() {
    emailjs.init("BivHA8W_QCMw1prYC"); 

    document.getElementById("contactForm").addEventListener("submit", function(event) {
       event.preventDefault();

       emailjs.sendForm("service_v2zyloj", "template_hp6gyis", this)
          .then(function(response) {
             alert("Message sent successfully!");
          }, function(error) {
             alert("Failed to send message.");
          });
    });
 })();