var winMainTitle = "VIPX_ScriptPackage";
var winNormalFirstClipTitle = "VIPX_NormalFirstClip";
var winOnlyOneClipTitle = "VIPX_OnlyOneClip";
var winDoubleSoundClipTitle = "VIPX_DoubleSoundClip";
var winAddSubtitlesTitle = "VIPX_AddSubtitles";

var aboutMessage = "The JS is packed.\n"+
                                "made by DongDong   ver:2.0";

var frameRate = "30.0";
var compositionWidth = "1440";
var compositionHeight = "1080";


var REX = {
	normalFirstClipRex: /^\s*(\S*)\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\-\s*\-\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/

};


function CreateMainUI(){
	var winMain = new Window("palette", winMainTitle, undefined,{resizeable:true});
	winMain.frameRate = null;
	winMain.compositionWidth = null;
	winMain.compositionHeight = null;

	winMain.alignChildren = "left";

	var settingsPanel = winMain.add("panel", undefined, "Settings");
	settingsPanel.orientation = "row";

	var statictextCompositionWidth = settingsPanel.add("statictext", undefined, "Compostion Width:");
	var editTextCompostionWidth = settingsPanel.add("edittext", undefined, compositionWidth);
	editTextCompostionWidth.characters = 5;
	var statictextCompositionHeight = settingsPanel.add("statictext", undefined, "Compostion Height:");
	var editTextCompostionHeight = settingsPanel.add("edittext", undefined, compositionHeight);
	editTextCompostionHeight.characters = 5;
	var staticTextFrameRate = settingsPanel.add("statictext", undefined, "FrameRate:");
	var editTextFrameRate = settingsPanel.add("edittext", undefined, frameRate);
	editTextFrameRate.characters = 4;

	var clipSettingsPanel = winMain.add("Panel", undefined, "Clip Functions");
	clipSettingsPanel.orientation = "row";
	var buttonOnlyOneClip = clipSettingsPanel.add("button",undefined, winOnlyOneClipTitle);
	var buttonNormalFirstClip = clipSettingsPanel.add("button", undefined, winNormalFirstClipTitle);
	var buttonDoubleSoundClip = clipSettingsPanel.add("button", undefined, winDoubleSoundClipTitle);

	var subTitleSettingsPanel = winMain.add("Panel", undefined, "Subtitle Functions");
	subTitleSettingsPanel.orientation = "row";
	var buttonAddSubtitles = subTitleSettingsPanel .add("button", undefined, winAddSubtitlesTitle);

	buttonNormalFirstClip.onClick = function(){
			ResetSettings();
			winNormalFirstClip.show();	
	}

	function ResetSettings(){
		winMain.frameRate = parseFloat(editTextFrameRate.text);
		winMain.compositionWidth = parseInt(editTextCompostionWidth.text);
		winMain.compositionHeight = parseInt(editTextCompostionHeight.text);
	}
	return winMain;
}

function CreateWinNormalFirstClipUI(){
	var win = new Window ("palette", winNormalFirstClipTitle, undefined, {resizeable:true, closeButton:false});
    win.orientation = "column";

     var textGroup = win.add("group", undefined);
     textGroup.orientation = "row";
     var staticShowText = textGroup.add("statictext", undefined, "Folder Path:");
     var editInText = textGroup.add("editText", undefined, "Import the text");
     editInText.characters = 20;

     var buttonGroup = win.add ("group", undefined);
     buttonGroup.orientation = "row";
     var buttonImport = buttonGroup.add("button", undefined, "Import");
     var buttonCancel = buttonGroup.add("button", undefined, "Cancel");

	 buttonCancel.onClick = function(){
		win.hide();
	 }

	 buttonImport.onClick = function(){
		if(editInText.text!=null||""){
			var file = File.openDialog("Select an txt file", ["Text:*.txt", "All files:*.*"], false);
			if(file!=null){
				file.open('r');
				file = CheckOutText(file);		//删除所有空行  包括第一行  返回数组
				file = RexNormalFirstClipFile(file);	//正则表达式
			}
		}else{
			alert("Please input the right folder path!");
		}
	 }

	 function RexNormalFirstClipFile(array){
		var rexArray = new Array();
		var sequnceArray = new Array();
		for(var i=0; i<array.length; i++){
			if(REX.normalFirstClipRex.exec(array[i]) == null){
				alert("Error! Please checkout your data! The Line " + i + "data of " +  array[i] +  "has problem!", "REX Error");
			}
			rexArray[i] = REX.normalFirstClipRex(array[i]);
			rexArray[i].splice(0,1);
		}

		
		for(var j=0; j<rexArray.length; j++){
			sequnceArray[j] = {
				name:editInText.text + "\\" + rexArray[j][0] + ".mp4",
				inTime: CreateTimeObject(rexArray[j][1], rexArray[j][2], rexArray[j][3], rexArray[j][4]),
				outTime: CreateTimeObject(rexArray[j][5], rexArray[j][6], rexArray[j][7], rexArray[j][8])
			};
		}
		
		return sequnceArray;
	 }


	 return win;
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
                    var result = (obj.millisecond/30 + obj.second + obj.minute*60 + obj.hour*60*60)*winMain.frameRate;
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


var winMain = CreateMainUI();
var winNormalFirstClip = CreateWinNormalFirstClipUI();
winMain.show();

