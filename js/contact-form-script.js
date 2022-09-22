$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Looks like we might need a bit more info to better answer your query");
    } else {
        // everything looks good!
        event.preventDefault();
        submitForm();
        formSuccess();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var number = $("#number").val();
    var message = $("#message").val();


    $.ajax({
        async: true,
        type: "POST",
        url: "https://shareservices.azurewebsites.net/Email",
        data: "name=" + name + "&email=" + email + "&number=" + number + "&message=" + message,
        success : function(text){
            if (text == "success"){
                //formSuccess();
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Thanks for the message! We'll be in touch.")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-center tada animated text-success";
    } else {
        var msgClasses = "h3 text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}