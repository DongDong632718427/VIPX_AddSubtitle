var frameRate = 30.0;
var win = null;
var winTitle = "VIPX_AddSubtitles";
var tipTitle = "Please choose the text of subtitles script!";
var aboutMessage = "The JS is to import and cut subtitles by text.\n"+
                                "       made by DongDong   ver:0.1   Beta";


var textStyle = {
        font : "Rockwell-Bold",
        fontSize: 25,
        applyFill: true,
        fillColor : [1,1,1],
        applyStroke: false,
        justification: ParagraphJustification.LEFT_JUSTIFY,
        tracking: 30
    };


var buttonGroup = null;
var buttonImport = null;
var buttonAbout = null;


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
        obj.text = "";
        obj.inTime = null;
        obj.outTime = null;

        return obj;
    }
function CreateUI(){                //创建UI
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


function ButtonImportOnClick(){                    //button点击事件
        var file = File.openDialog ("Select an ass/txt file",  ["Text:*.txt", "All files:*.*"], false);
        if(file!=null){
                file.open('r');
                file = CheckOutText (file);             //逐行读取txt并根据\n存入数组
                file = RexWholeFile (file);
                //file = RexTextFile(file);                   //正则数组中的每一个元素，分配入点，出点，text
                //file = RexTextTimeObject(file);         //正则入点出点并构造时间类
                //PrintFinal (file);
                alert(PrintFinal (file), "You can checkout what you inport:");
                ImportToAe(file);
            }

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

function Trim(str,is_global){

    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    if(is_global.toLowerCase()=="g"){
     result = result.replace(/\s/g,"");
     }
    return result;
}

function PrintArray(array){
    var result = "";
        for(var i=0; i<array.length; i++){
                result = result + array[i] + "\n";
            }
        
        alert(result);
    }

function PrintFinal(array){
        var result = "";
        for(var i=0; i<array.length; i++){
                
                result = result + "Num" + (i+1) + ": " + "Text:" + array[i].text + "\n" + array[i].inTime.PrintTime () + "\n" + array[i].outTime.PrintTime () + "\n";
                result = result + "------------------------------------------------------\n"
            }
        return result;
    }

function RexWholeFile(array){
        var rexArray = new Array();
        var sequenceArray = new Array();
        var re = /^\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\-\s*\-\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*(.*)$/;
        
        for(var i=0; i<array.length; i++){
                if(re.exec (array[i]) == null){
                        alert("Error! Please CheckOut your data! The Line " + i +   " data of   '"+ array[i] + "'   has problem!", "REX Error");
                    }
                rexArray[i] = re.exec (array[i]);
                rexArray[i].splice (0,1);
            }
        for(var j=0; j<rexArray.length; j++){
                sequenceArray[j] = CreateSequnceObject ();
                sequenceArray[j].inTime = CreateTimeObject(rexArray[j][0], rexArray[j][1], rexArray[j][2], rexArray[j][3]);
                sequenceArray[j].outTime = CreateTimeObject(rexArray[j][4], rexArray[j][5], rexArray[j][6], rexArray[j][7]);
                sequenceArray[j].text = rexArray[j][8];
                //alert(sequenceArray[j].text);
            }
        return sequenceArray;
    }

function RexTextFile(array){
        var rexArray = new Array();
        
        var re = /^\s*(\w{1,2}\:\w{1,2}\:\w{1,2}\:\w{1,2})\s*\-\s*\-\s*(\w{1,2}\:\w{1,2}\:\w{1,2}\:\w{1,2})\s*([\s\S]*)$/; 
        
        for(var i=0; i<array.length; i++){
                rexArray[i] = re.exec (array[i]);
                rexArray[i].splice (0,1);
            }
        return rexArray;
    }

function RexTextTimeObject(array){
        var sequenceArray = new Array();
        var re = /^(\w{1,2})\:(\w{1,2})\:(\w{1,2})\:(\w{1,2})$/;
        
        for(var i=0; i<array.length; i++){
                sequenceArray[i] = CreateSequnceObject ();
                var inTimeArray = re.exec (array[i][0]);
                var outTimeArray = re.exec (array[i][1]);
                var text = array[i][2];
                sequenceArray[i].text = text;
                sequenceArray[i].inTime = CreateTimeObject (inTimeArray[1], inTimeArray[2], inTimeArray[3], inTimeArray[4]);
                sequenceArray[i].outTime = CreateTimeObject (outTimeArray[1], outTimeArray[2], outTimeArray[3], outTimeArray[4]);
                
            }
        return sequenceArray;
    }

function ImportToAe(array){
        //alert(PrintFinal (array));
        /*
            var textStyle = {
            font : "Rockwell-Bold",
            fontSize: 60,
            applyFill: true,
            fillColor : [1,1,0],
            applyStroke: false,
            justification: ParagraphJustification.LEFT_JUSTIFY,
            tracking: 30
        };*/
        var newComp = app.project.items.addComp("SubTitles", 1440, 1080, 1, 3600, frameRate);
        newComp.openInViewer();
        for(var i=0; i<array.length; i++){
                var textLayer = newComp.layers.addText(array[i].text);
                var textProp = textLayer.property("Source Text");
                var textDocument = textProp.value;
                textDocument.fontSize = textStyle.fontSize;
                textDocument.font = textStyle.font;
                textDocument.applyFill = textStyle.applyFill;
                textDocument.fillColor = textStyle.fillColor;
                textDocument.applyStroke = textStyle.applyStroke;
                textDocument.justification = textStyle.justification;
                textDocument.tracking =textStyle.tracking;
                textProp.setValue(textDocument);
                textLayer.inPoint = array[i].inTime.totalSecond;
                textLayer.outPoint = array[i].outTime.totalSecond;
            }        
    }


CreateUI ();