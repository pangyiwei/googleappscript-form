function doGet(e) {
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Meta');
  title = metaSheet.getRange("B1").getCell(1,1).getValue();
  return HtmlService.createHtmlOutputFromFile('index.html').setTitle(title).addMetaTag("viewport", "width=device-width, initial-scale=1");
}

function getMeta() {
  var metaSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Meta');
  var lastRow = metaSheet.getLastRow();
  var metaData = metaSheet.getRange("B1:B2");
  var result = {
    title: metaData.getCell(1,1).getValue(),
    submitText: metaData.getCell(2,1).getValue()
  }
  return result;
}

function getQuestions() {
  var questionSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Questions');
  var lastRow = questionSheet.getLastRow();
  
  var questionData = questionSheet.getRange("A2:D"+lastRow);
  
  var result = [];
  var headingCount = 0;
  var questionCount = 0;
  
  for (var i=1; i<=questionData.getNumRows(); i++) {
    var id;
    if (questionData.getCell(i,2).getValue() == "heading") {
      headingCount++;
      id = "hd-" + headingCount;
    } else {
      questionCount++;
      id = "qn-" + questionCount;
    }
    
    result.push({
      id: id,
      text: questionData.getCell(i,1).getValue(),
      type: questionData.getCell(i,2).getValue(),
      label: questionData.getCell(i,3).getValue(),
      required: questionData.getCell(i,4).getValue()
    });
  }
  return result;
}

function uploadFileToGoogleDrive(data, file) {
  
  try {
    
    var folderName = "Received Files";
    var folder, folders = DriveApp.getFoldersByName(folderName);
    
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(folderName);
    }
    
    var contentType = data.substring(5,data.indexOf(';')),
        bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,')+7)),
        blob = Utilities.newBlob(bytes, contentType, file),
        file = folder.createFile(blob);
    
    fileUrl = file.getUrl();
    
    return fileUrl;
    
  } catch (err) {
    return "ERROR " + err.toString();
  }
  
}

function updateSheet(array) {
  var responseSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Responses');
  responseSheet.appendRow(array);
  return "OK";
}

//TODO: Provide UI to edit questions in sheets
//function onOpen() {
//  var ui = SpreadsheetApp.getUi();
//  // Or DocumentApp or FormApp.
//  ui.createMenu('Custom Form Menu')
//      .addItem('Open Custom Form', 'openForm')
//      .addToUi();
//}
//
//function openForm() {
//  var htmlOutput = HtmlService
//    .createHtmlOutput('<p>A change of speed, a change of style...</p>')
//    .setWidth(250)
//    .setHeight(300);
//  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'My add-on');
//}
