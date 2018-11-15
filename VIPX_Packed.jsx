var winMainTitle = "VIPX_ScriptPackage";
var winNormalFirstClipTitle = "VIPX_NormalFirstClip";
var winOnlyOneClipTitle = "VIPX_OnlyOneClip";
var winDoubleSoundClipTitle = "VIPX_DoubleSoundClip";
var winAddSubtitlesTitle = "VIPX_AddSubtitles";

var aboutMessage = "The JS is packed.\n"+
                                "made by DongDong   ver:1.0";

var frameRate = "30.0";
var compositionWidth = "1440";
var compositionHeight = "1080";


var REX = {
	normalFirstClipRex_Double: /^\s*(\S*)\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\-\s*\-\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/,
	normalFirstClipRex_One: /^\s*(\S*)\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\-\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/,
	normalFirstClipRex_Space: /^\s*(\S*)\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/,
	onlyOneClipRex_Double: /^\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\-\s*\-\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/,
	onlyOneClipRex_One: /^\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\-\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/,
	onlyOneClipRex_Space: /^\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*\:\s*(\w{1,2})\s*$/
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

	buttonOnlyOneClip.onClick = function(){
		ResetSettings();
		winOnlyOneClip.show();
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
    var editInText = textGroup.add("editText", undefined, "D:\\Work\\L15\\GK-L15\\GK-15");
    editInText.characters = 20;

	var radioGroup = win.add("Group", undefined);
	radioGroup.orientation = "row";
	radioGroup.alignChildren = "left";
	radioGroup.add("radiobutton", undefined, "Double");
	radioGroup.add("radiobutton", undefined, "One");
	radioGroup.add("radiobutton", undefined, "Space");
	radioGroup.children[0].value = true;

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
				file = CheckOutFile(file);		//删除所有空行  包括第一行  返回数组
				file = RexNormalFirstClipFile(file);	//正则表达式
				ImportAndCutSequence(file);
			}
		}else{
			alert("Please input the right folder path!");
		}
	 }

	 function RexNormalFirstClipFile(array){
		var rexArray = new Array();
		var sequnceArray = new Array();
		var re = null;
		var k = SelectRadioButton(radioGroup);
		switch(k){
			case 0: re = REX.normalFirstClipRex_Double; break;
			case 1: re = REX.normalFirstClipRex_One; break;
			case 2: re = REX.normalFirstClipRex_Space; break;
		}
		for(var i=0; i<array.length; i++){
			if(re.exec(array[i]) == null){
				alert("Error! Please checkout your data! The Line " + i + "data of " +  array[i] +  "has problem!", "REX Error");
			}
			rexArray[i] = re(array[i]);
			rexArray[i].splice(0,1);
		}

		
		for(var j=0; j<rexArray.length; j++){
			sequnceArray[j] = {
				path:editInText.text + "\\" + rexArray[j][0] + ".mp4",
				inTime: CreateTimeObject(rexArray[j][1], rexArray[j][2], rexArray[j][3], rexArray[j][4]),
				outTime: CreateTimeObject(rexArray[j][5], rexArray[j][6], rexArray[j][7], rexArray[j][8])
			};
		}
		
		return sequnceArray;
	 }
	 
	 function ImportAndCutSequence(array){
		var fileArray = new Array();
		var ioArray = new Array();
		var videoArray = new Array();
		try{
			for(var i = 0; i<array.length; i++){
				fileArray[i] = File(array[i].path);
				ioArray[i] = new ImportOptions(fileArray[i]);
				videoArray[i] = app.project.importFile(ioArray[i]);
			}
		}catch(error){
			alert(error, "Error!");
		}
		if(videoArray != null){
			var index = 0;
			var folder = app.project.items.addFolder("VideoFootage");
			var firstClipComp = app.project.items.addComp("FirstClip", winMain.compositionWidth, winMain.compositionHeight, 1, 3600, winMain.frameRate);
			firstClipComp.openInViewer();
			for(i=0; i<array.length; i++){
					videoArray[i].parentFolder = folder;
					var layer = firstClipComp.layers.add(videoArray[i]);
					layer.inPoint = array[i].inTime.totalSecond;
					layer.outPoint = array[i].outTime.totalSecond;
					layer.startTime = index - array[i].inTime.totalSecond;
					index = index + layer.outPoint - layer.inPoint;
				}
			}else{
				alert("Import Error!");
			}
			
	 }

	 function PrintArray(array){
		var result = "";
		for(var i=0; i<array.length; i++){
			result = result + "Num:" + i + "  Path:" + array[i].path + " ImTime:" + array[i].inTime.PrintTime() + " OutTime" + array[i].outTime.PrintTime() + "\n";
		}
		return result;
	 }

	 return win;
}


function CreateOnlyOneClipUI(){
	var win = new Window("palette", winOnlyOneClipTitle, undefined, {resizeable:true, closeButton:false});
	win.alignChildren = "center";
	var timeLinePanel = win.add("panel", undefined, "TimeLine:");
	var editInText = timeLinePanel.add("edittext", [0,0,200,300], "",  {multiline: true, wantReturn: true});

	var radioGroup = win.add("Group", undefined);
	radioGroup.orientation = "row";
	radioGroup.alignChildren = "left";
	radioGroup.add("radiobutton", undefined, "Double");
	radioGroup.add("radiobutton", undefined, "One");
	radioGroup.add("radiobutton", undefined, "Space");
	radioGroup.children[0].value = true;

	var buttonGroup = win.add("group", undefined);
	buttonGroup.orientation = "row";
	var importButton = buttonGroup.add("button", undefined, "Clip");
	var cancelButton = buttonGroup.add("button", undefined, "Cancel");

	cancelButton.onClick = function(){
		win.hide();
	}

	importButton.onClick = function(){
		if(editInText.text!=""){
			var video = OnlyOneClip();
			var timeLine = RexOnlyOneClip();
			if(video!= null && timeLine!= null){
				CutInNewComposition(video, timeLine);
			}
		}else{
			alert("Please input the TimeLine!");
		}
	}

	function RexOnlyOneClip(){
		var rexArray = new Array();
		var timeLine = new Array();
		var textArray = CheckOutText(editInText.text);
		var k = SelectRadioButton(radioGroup);
		var re = null;
		switch(k){
			case 0: 
				re = REX.onlyOneClipRex_Double;  
				break;
			case 1:
				re = REX.onlyOneClipRex_One;
				break;
			case 2:
				re = REX.onlyOneClipRex_Space;
				break;
		}
		
		for(var i=0; i<textArray.length; i++){
			if(re.exec(textArray[i]) == null){
				alert("Error! Please checkout your data! The Line " + i + "data of " +  textArray[i] +  "has problem!", "REX Error");
			}
			rexArray[i] = re.exec(textArray[i]);
			rexArray[i].splice(0,1);
		}		

		for(var i=0; i<rexArray.length; i++){
			timeLine[i] = {
				inTime: CreateTimeObject(rexArray[i][0], rexArray[i][1], rexArray[i][2], rexArray[i][3]),
				outTime: CreateTimeObject(rexArray[i][4], rexArray[i][5], rexArray[i][6], rexArray[i][7])
			};
		}
		return timeLine;
	}

	function OnlyOneClip(){
		if(app.project.numItems == 0){
			alert("Please select video!");
		}else{
				for(var i=0; i<app.project.numItems; i++){
					if(app.project.items[i+1].selected == true){
						return app.project.items[i+1];
					}
					if(i+1 == app.project.numItems){
						alert("Please select video!");
				}
			}
		}
		
	}

	function PrintTimeLine(timeLine){
		var result = "";
		for(var i=0; i<timeLine.length; i++){
			result = result + "InTime:" + timeLine[i].inTime.PrintTime() + "\nOutTime:" + timeLine[i].outTime.PrintTime() + "\n";
		}
		return result;
	}

	function CutInNewComposition(video, timeLine){
		var index = 0;
		var newComp = app.project.items.addComp(video.name, winMain.compositionWidth, winMain.compositionHeight, 1, 3600, winMain.frameRate);
		newComp.openInViewer();
		for(var i=0; i<timeLine.length; i++){
			var layer = newComp.layers.add(video);
			layer.inPoint = timeLine[i].inTime.totalSecond;
			layer.outPoint = timeLine[i].outTime.totalSecond;
			layer.startTime = index - timeLine[i].inTime.totalSecond;
			index = index + layer.outPoint - layer.inPoint;
		}

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

function CheckOutText(text){
	if(text!=null){
		var textArray = new Array();
		textArray = text.split("\n");
		textArray = CheckOutArraySpace(textArray);
		return textArray;
	}else{
		alert("text is null!");
	}
}

function CheckOutFile(file){
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

function SelectRadioButton(radioArray){
	for(var i=0; i<radioArray.children.length; i++){
		if(radioArray.children[i].value == true){
			return i;
		}
	}
}

var winMain = CreateMainUI();
var winNormalFirstClip = CreateWinNormalFirstClipUI();
var winOnlyOneClip = CreateOnlyOneClipUI();
winMain.show();
