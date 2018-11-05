
var win = null;
var winTitle = "VIPX_AddSubtitles";
var tipTitle = "Please choose the text of subtitles script!";
var aboutMessage = "The JS is to import and cut subtitles by text.\n"+
                                "       made by DongDong   ver:0.1   Beta";

var buttonGroup = null;
var buttonImport = null;
var buttonAbout = null;


function CreateTimeObject(hour, minute, second, millisecond){
        
        var obj = new Object();
        obj.hour = 0;
        obj.minute = 0;
        obj.second = 0;
        obj.millisecond = 0;
        CheckOutInputTime (hour, minute, second, millisecond);
        obj.totalFrame = CalculateTotalFrame ();
        obj.totalSecond = CalculateTotalSecond();
        
        obj.PrintTime = function(){
                var result = "";
                result = "Time:" + PrefixInteger (obj.hour, 2) + ":" + PrefixInteger(obj.minute,2) + ":" + PrefixInteger(obj.second,2) + ":" + PrefixInteger(obj.millisecond, 2);
                result = result  + "  " + "TotalFrame:" + obj.totalFrame + "  " + "TotalSecond:" + obj.totalSecond;
                return result;
            }
        
        function CheckOutInputTime(hour, minute, second, millisecond){
                hour = parseInt(hour);
                minute = parseInt(minute);
                second = parseInt(second);
                millisecond = parseInt(millisecond);
                
                if(millisecond/30>=1){
                        var index = Math.floor(millisecond/30);
                        second = second + index;
                        millisecond = millisecond%30;
                    }
                if(second/60>=1){
                        var index = Math.floor(second/60);
                        minute = minute + index;
                        second = second%60;
                    }
                  if(minute/60>=1){
                        var index = Math.floor(minute/60);
                        hour = hour + index;
                        minute = minute%60;
                      }
                      
                    if(hour >=24){
                            alert("Error! Hour>24");
                        }
                    
                    obj.hour = hour;
                    obj.minute = minute;
                    obj.second = second;
                    obj.millisecond = millisecond;
            }
        
        function CalculateTotalFrame(){
                    var result = (obj.millisecond/30 + obj.second + obj.minute*60 + obj.hour*60*60)*frameRate;
                    result = Math.floor(result);
                    return result;

            }
        
        function CalculateTotalSecond(){
                var result = obj.millisecond/30 + obj.second + obj.minute*60 + obj.hour*60*60;
                return result;
            }
        
        function PrefixInteger(num, length) {
                return (Array(length).join('0') + num).slice(-length);
            }
        
        return obj;
    }


function CreateUI(){
        win = new Window ("palette", winTitle, undefined, {resizeable:false});
        win.orientation = "column";
        win.add("statictext", undefined, tipTitle);            
        
        buttonGroup = win.add ("group", undefined);
        buttonGroup.orientation = "row";
        buttonImport = buttonGroup.add("button", undefined, "Import");
        buttonAbout = buttonGroup.add("button", undefined, "About");
        win.show(); 
        
        buttonAbout.onClick = function(){
            alert(aboutMessage);
        }
    
        buttonImport.onClick = ButtonImportOnClick;
    }


function CreateTimeObject(hour, minute, second, millisecond){
        
        var obj = new Object();
        obj.hour = 0;
        obj.minute = 0;
        obj.second = 0;
        obj.millisecond = 0;
        CheckOutInputTime (hour, minute, second, millisecond);
        obj.totalFrame = CalculateTotalFrame ();
        obj.totalSecond = CalculateTotalSecond();
        
        obj.PrintTime = function(){
                var result = "";
                result = "Time:" + PrefixInteger (obj.hour, 2) + ":" + PrefixInteger(obj.minute,2) + ":" + PrefixInteger(obj.second,2) + ":" + PrefixInteger(obj.millisecond, 2);
                result = result  + "  " + "TotalFrame:" + obj.totalFrame + "  " + "TotalSecond:" + obj.totalSecond;
                return result;
            }
        
        function CheckOutInputTime(hour, minute, second, millisecond){
                hour = parseInt(hour);
                minute = parseInt(minute);
                second = parseInt(second);
                millisecond = parseInt(millisecond);
                
                if(millisecond/30>=1){
                        var index = Math.floor(millisecond/30);
                        second = second + index;
                        millisecond = millisecond%30;
                    }
                if(second/60>=1){
                        var index = Math.floor(second/60);
                        minute = minute + index;
                        second = second%60;
                    }
                  if(minute/60>=1){
                        var index = Math.floor(minute/60);
                        hour = hour + index;
                        minute = minute%60;
                      }
                      
                    if(hour >=24){
                            alert("Error! Hour>24");
                        }
                    
                    obj.hour = hour;
                    obj.minute = minute;
                    obj.second = second;
                    obj.millisecond = millisecond;
            }
        
        function CalculateTotalFrame(){
                    var result = (obj.millisecond/30 + obj.second + obj.minute*60 + obj.hour*60*60)*frameRate;
                    result = Math.floor(result);
                    return result;

            }
        
        function CalculateTotalSecond(){
                var result = obj.millisecond/30 + obj.second + obj.minute*60 + obj.hour*60*60;
                return result;
            }
        
        function PrefixInteger(num, length) {
                return (Array(length).join('0') + num).slice(-length);
            }
        
        return obj;
    }



function ButtonImportOnClick(){
        var file = File.openDialog ("Select an ass/txt file",  ["Text:*.txt", "All files:*.*"], false);
        if(file!=null){
                file.open('r');
                CheckOutText (file);
            }
    }

function CheckOutText(file){
    if(file!=null){
            var a = file.read();
            var textArray = new Array();
            textArray = a.split("\n");
            CheckOutArraySpace(textArray);
        }
    else{
            alert("File is null!");
        }
  }

function CheckOutArraySpace(array){
        for(var i=0; i<array.length; i++){
            array[i] = Trim(array[i], "g");
                if((array[i] == "")||(array[i] == "\n")){  
                        array.splice (i, 1);
                    }
            }
        PrinfArray(array);  
    }

function Trim(str,is_global){

    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g"){
     result = result.replace(/\s/g,"");
     }
    return result;
}

function PrinfArray(array){
    var result = "";
        for(var i=0; i<array.length; i++){
                result = result + array[i] + "\n";
            }
        
        alert(result);
    }

function RexText(text){
        
    }

CreateUI ();