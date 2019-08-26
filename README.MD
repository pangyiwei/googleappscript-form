# Forms with File Upload

## Concept
Google drive is used as a backend storage while Google Sheets is used as a structured "database" for data collection.

## Set Up
1. Create a Google Sheet
2. Create 3 separate spreadsheets: "Meta", "Questions" and "Responses"
    1. "Meta" is a list of information about the whole form. At the moment, only Title is supported. The First Column of the Meta is will be the keys while second column will be value Fill up Title in "A1" and the Title of your form in "B1".
    2. "Questions" is for the form components. Start from the 2nd row. First column is the text of the question/heading, Second is the type (shortAns, longAns, heading, file), third is label to appear on the material input and fourth is whether the response is required on not (TRUE/FALSE)
    3. "Responses" is where the results are collated. Each row represents a response. The columns are the answers and they are in the same order as the questions in the "Questions" Sheet.
3. Go to tools > Script Editor
4. Copy the Scripts in
5. Publish and Deploy as web app
6. You are good to go. Responses will appear in the responses sheet.


