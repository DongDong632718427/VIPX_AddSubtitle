
var comp1_comp = app.project.items[1];

var textLayer = comp1_comp.layers.addText("This is BOLD!");
var textLayer_TextProp = textLayer.property("Source Text");
var textLayer_TextDocument = textLayer_TextProp.value;
textLayer_TextDocument.font = "Rockwell-Bold";
textLayer_TextDocument.fontSize = 60;
textLayer_TextDocument.applyFill = true;
textLayer_TextDocument.fillColor = [0.29019600152969, 0.6941180229187, 0.835294008255];
textLayer_TextDocument.applyStroke = false;
textLayer_TextDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
textLayer_TextDocument.tracking = 30;
if (parseFloat(app.version) >= 13.2) {
	textLayer_TextDocument.verticalScale = 1;
	textLayer_TextDocument.horizontalScale = 1;
	textLayer_TextDocument.baselineShift = 0;
	textLayer_TextDocument.tsume = 0;
	// These values are read-only. You have to set them manually in the comp.
	// textLayer_TextDocument.fauxBold = false;
	// textLayer_TextDocument.fauxItalic = false;
	// textLayer_TextDocument.allCaps = false;
	// textLayer_TextDocument.smallCaps = false;
	// textLayer_TextDocument.superscript = false;
	// textLayer_TextDocument.subscript = false;
}


textLayer_TextProp.setValue(textLayer_TextDocument);

/*
var textDocument0 = new TextDocument("Happy Cake");
var myTextLayer = comp1_comp.layers.addBoxText([1000,100], textDocument0);


var textProp = myTextLayer.property("Source Text");
var textDocument = textProp.value;
myString = "Happy holidays!";
textDocument.resetCharStyle();
textDocument.fontSize = 60;
textDocument.fillColor = [1, 0, 0];
textDocument.strokeColor = [0, 1, 0];
textDocument.strokeWidth = 2;
textDocument.font = "TimesNewRomanPSMT";
textDocument.strokeOverFill = true;
textDocument.applyStroke = true;
textDocument.applyFill = true;
textDocument.text = myString;
textDocument.tracking = 50;
textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;


textProp.setValue(textDocument);

*/




/*
var  comp = app.project.items[1];
var myTextLayer = comp.layers.addBoxText([1000,100]);
var textProp = myTextLayer.property("ADBE Text Properties").property("ADBE Text Document");
var myTextDocument = textProp.value;
myTextDocument.text = "123456789";
myTextDocument.fontSize = 10;

textProp.setValue(myTextDocument);

*/