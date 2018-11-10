var frameRate = 30.0;
var win = null;
var winTitle = "VIPX_ImportAndCutSequenceForAE_ver2.0";
var aboutMessage = "The JS is to import and cut the sequnce by text.\n"+
                                "       made by DongDong   ver:2.0";
var tipMessage = "Input Your Path!";
var editInText = null;
var frameRateIn = null;

function CreateUI(){
        win = new Window ("palette", winTitle, undefined, {resizeable:true});
        win.orientation = "column";

        var textGroup = win.add("group", undefined);
        textGroup.orientation = "row";
        var staticShowText = textGroup.add("statictext", undefined, "Folder Path:");
        editInText = textGroup.add("editText", undefined, tipMessage);
        editInText.characters = 20;
        var frameRateInStatic = textGroup.add("statictext", undefined, "FrameRate:");
        frameRateIn = textGroup.add("editText", undefined, 30.00);
        frameRateIn.characters = 4;
        
        
        var buttonGroup = win.add ("group", undefined);
        buttonGroup.orientation = "row";
        var buttonImport = buttonGroup.add("button", undefined, "Import");
        var buttonAbout = buttonGroup.add("button", undefined, "About");
       win.show();
       
        buttonImport.onClick = ButtonImportOnClick;
       
       buttonAbout.onClick = function(){
            alert(aboutMessage, "Message");
           }
}


function ButtonImportOnClick(){
        if(editInText.text == tipMessage||editInText.text == ""){
                alert("Please Input Your Path!");
            }else{
                    frameRate = parseFloat (frameRateIn.text);
                    var file = File.openDialog ("Select an ass/txt file",  ["Text:*.txt", "All files:*.*"], false);
                    if(file!=null){
                            file.open('r');
                            file = CheckOutText (file);
                            file = RexWholeFile (file);
                            ImportAndCutSequence (file);
                            
                        }
                }
    }

function ImportAndCutSequence(array){
        var file = new Array();
        var io = new Array();
        var video = new Array();
        for(var i=0; i<array.length; i++){
            try{
                file[i] = File(array[i].name);
                io[i] = new ImportOptions(file[i]);
                video[i]= app.project.importFile(io[i]);
            }catch(error){
                    alert(error);
                }
        }
        if(video != null){
             var index = 0; 
             var folder = app.project.items.addFolder("VideoFootage");
             var firstClipComp = app.project.items.addComp("Firts Clip", 1440, 1080, 1, 3600, frameRate);
             firstClipComp.openInViewer();
             for(var i=0; i<array.length; i++){
                    video[i].parentFolder = folder;
                    var layer = firstClipComp.layers.add(video[i]);
                    layer.inPoint = array[i].inTime.totalSecond;
                    layer.outPoint = array[i].outTime.totalSecond;
                    layer.startTime = index-array[i].inTime.totalSecond;
                    index = index + layer.outPoint - layer.inPoint;
                 }
         }else{
                alert("Import Error!");
             }
         
    }


function PrintSequenceArray(array){
        var result = "";
        for(var i=0; i<array.length; i++){
                
                result = result + "Num" + (i+1) + ": " + "Name:" + array[i].name + "\n" + array[i].inTime.PrintTime () + "\n" + array[i].outTime.PrintTime () + "\n";
                result = result + "------------------------------------------------------\n"
            }
        return result;
    }


function CheckOutText(file){
    if(file!=null){
            var a = file.read();
            var textArray = new Array();
            textArray = a.split("\n");
            textArray = CheckOutArraySpace(textArray);
            return textArray;
        }
    else{
            alert("File is null!");
        }
  }

function CheckOutArraySpace(array){
    var re = /\w/g;
    for(var i=0; i<array.length; i++){
        if(!re.test(array[i])){
                array.splice(i, 1);
                i = i-1;
            }
        }
        return array;
    }

function RexWholeFile(array){
        var re = /^\s*(\S*)\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\-\s*\-\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/;
        var rexArray = new Array();
        var sequenceArray = new Array();
        for(var i=0; i<array.length; i++){
                 if(re.exec (array[i]) == null){
                        alert("Error! Please CheckOut your data! The Line " + i +   " data of   '"+ array[i] + "'   has problem!", "REX Error");
                    }
                rexArray[i] = re.exec (array[i]);
                rexArray[i].splice (0,1);
            }
            
        for(var j=0; j<rexArray.length; j++){
                sequenceArray[j] = CreateSequnceObject ();
                sequenceArray[j].name = editInText.text + "\\"+ rexArray[j][0] + ".mp4";               
                sequenceArray[j].inTime = CreateTimeObject (rexArray[j][1], rexArray[j][2], rexArray[j][3], rexArray[j][4]);
                sequenceArray[j].outTime = CreateTimeObject(rexArray[j][5], rexArray[j][6], rexArray[j][7], rexArray[j][8]);
                
            }
        return  sequenceArray;
    }

function CreateTimeObject(hour, minute, second, millisecond){           //时间类
        
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

function CreateSequnceObject(){      //序列类
        var obj = new Object();
        obj.name = "";
        obj.inTime = null;
        obj.outTime = null;

        return obj;
    }
CreateUI();
