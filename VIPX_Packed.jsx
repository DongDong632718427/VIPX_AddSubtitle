var winMainTitle = "VIPX_ScriptPackage";
var winNormalFirstClipTitle = "VIPX_NormalFirstClip";
var winOnlyOneClipTitle = "VIPX_OnlyOneClip";
var winDoubleSoundClipTitle = "VIPX_DoubleSoundClip";
var winAddSubtitlesTitle = "VIPX_AddSubtitles";

var aboutMessage = "The JS is packed.\n"+
                                "made by DongDong   ver:2.0";

var frameRate = 30.0;
var compositionWidth = 1440;
var compositionHight = 1080;

function CreateMainUI(){
	var winMain = new Window("palette", winMainTitle, undefined,{resizeable:true});
	winMain.alignChildren = "left";

	var settingsPanel = winMain.add("panel", undefined, "Settings");
	settingsPanel.orientation = "row";

	var statictextCompositionWidth = settingsPanel.add("statictext", undefined, "Compostion Width:");
	var editTextCompostionWidth = settingsPanel.add("edittext", undefined, compositionWidth);
	editTextCompostionWidth.characters = 5;
	var statictextCompositionHeight = settingsPanel.add("statictext", undefined, "Compostion Height:");
	var editTextCompostionHeight = settingsPanel.add("edittext", undefined, compositionHight);
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
			winNormalFirstClip.show();	
	}
	return winMain;
}

function CreateWinNormalFirstClipUI(){
	var win = new Window ("palette", winNormalFirstClipTitle, undefined, {resizeable:true});
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
	 return win;
}

var winMain = CreateMainUI();
var winNormalFirstClip = CreateWinNormalFirstClipUI();
winMain.show();
