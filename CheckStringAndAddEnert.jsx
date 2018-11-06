function CheckStringAndAddEnert(text){
        if(typeof text == "string"){
               var a = text.split(/\s+/);
               alert(a);
            }else{
                    alert("The type of input is wrong");
                }
    }


var a = "I am a good     person!";

CheckStringAndAddEnert (a);