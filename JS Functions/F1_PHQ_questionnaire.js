//Created by Dr. Allen and Shreya, April, 2022
/*Content
Inputonject
Declare Data Object --> PHQ9 data object
Functions -->
        1)PHQ9_quesionnaire(Request for questionnaire(yes/no)){if yes-send the questionarrie; if no-do nothing}
        2)Total_PHQ9(takes pt. current PHQ Score) {see if the number is between 0-27; result: valid PHQ9 score}
        3)Total_question_answered(take in 9 inputs seperated by comma or seperated by nothing) {
            see how many inputs are; if 9, calculate the total; if less than or more than 9 ask for valid input}
*/
//-----------------------------------------------------------//

var Input_Object = {Total_PHQ9_Score: 20, Answers_Array:[1,0,2,3,2,1,1,1,0], Send_Questionnare:"no"};
var Output_Object = {Input_Object};

//Declare Data Object
var os = require("os");

// This is a PHQ9 data object
const PHQ9content = {
    generalAllQuestionPrompt : "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    questionOne : "Little interest or pleasure in doing things: ",
    questionTwo : "Feeling down, depressed, or hopeless: ",
    questionThree : "Trouble falling or staying asleep, or sleeping too much: ",
    questionFour : "Feeling tired or having little energy: ",
    questionFive : "Poor appetite or overeating: ",
    questionSix : "Feeling bad about yourself — or that you are a failure or have let yourself or your family down: ",
    questionSeven : "Trouble concentrating on things, such as reading the newspaper or watching television: ",
    questionEight : "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual: ",
    questionNine : "Thoughts that you would be better off dead or of hurting yourself in some way: ",
}

//-----------------------------------------------------------//
//Functions 1
// function PHQ9_quesionnaire(Request for questionnaire(yes/no)){if yes-send the questionarrie; if no = send Not requested or nothing/other input= Request not understood }
if (Input_Object.Send_Questionnare.toUpperCase() == "YES") {
    Output_Object.PHQ9_Questionnaire = PHQ9content;
}
else if (Input_Object.Send_Questionnare.toUpperCase() == "NO") {
    Output_Object.PHQ9_Questionnaire = "Not requested";
}
else if (Input_Object.Send_Questionnare == "") {
    Output_Object.PHQ9_Questionnaire = "Not requested";
}
else {
    Output_Object.PHQ9_Questionnaire = "Request not understood";
}
console.log(Output_Object);

//Functions 2
//function total_PHQ9(takes pt. current PHQ Score) {see if the number is between 0-27; result: valid PHQ9 score}
//Interprertation url: https://www.hiv.uw.edu/page/mental-health-screening/phq-9
//for (const [key, value] of Object.entries(inputobject.TotalPHQ9Score)) {
PHQ9_Score_Advice(Input_Object.Total_PHQ9_Score);
function PHQ9_Score_Advice(score){

if (typeof score === "string"){
    Output_Object.Interpretation_And_Recommendations = {
    Depression_Severity: "Undetermined due to string input",
    Proposed_Treatment_Actions: "Undetermined due to string input"
    }
}
else if (score === null) {
    Output_Object.Interpretation_And_Recommendations = {
    Depression_Severity: "Undetermined",
    Proposed_Treatment_Actions: "Undetermined"
    }
}
else if (score >= 0 && score <= 4){
    Output_Object.Interpretation_And_Recommendations = {  
        Depression_Severity: "None_minimal", 
        Proposed_Treatment_Actions: "None"
    }
}
else if(score >= 5 && score <= 9) {
    Output_Object.Interpretation_And_Recommendations = {
        Depression_Severity: "Mild",
        Proposed_Treatment_Actions: "Watchful waiting; repeat PHQ-9 at follow-up"
    }
} 
else if(score >= 10 && score <=14) {
    Output_Object.Interpretation_And_Recommendations = {
    Depression_Severity: "Moderate",
    Proposed_Treatment_Actions: "Treatment plan, considering counseling, follow-up and/or pharmacotherapy"
    }
} 
else if(score >= 15 && score <=19) {
    Output_Object.Interpretation_And_Recommendations = {
    Depression_Severity: "Moderately Severe",
    Proposed_Treatment_Actions: "Active treatment with pharmacotherapy and/or psychotherapy"
    }
}
else if(score >= 20 && score <=27) {
    Output_Object.Interpretation_And_Recommendations = {
    Depression_Severity: "Severe",
    Proposed_Treatment_Actions: "Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management"
    }
}
else {
    Output_Object.Interpretation_And_Recommendations = {
    Depression_Severity: "Undetermined due to number out of range",
    Proposed_Treatment_Actions: "Undetermined due to number out of range"
    }
}
}

console.log(Output_Object);

//Functions 3
//function total_question_answered(take in 9 inputs seperated by comma or seperated by nothing) {
//     see how many inputs are; if 9, calculate the total; if less than or more than 9 ask for valid input}
function sumarray(array){
var sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}
var sum_total = sumarray(Input_Object.Answers_Array);
console.log(sum_total);

function onlyNumbers(array) {
    return array.every(element => {
    return typeof element === 'number';
    });
}


var count_input_in_array = Input_Object.Answers_Array.length;
if (count_input_in_array < 9){
    Output_Object.Answers_Array = {
    Array_Length: "PHQ9 question input has less than 9 answers",
    PHQ9_total_from_array: "Could not be determined"
    }
}
else if (count_input_in_array > 9) {
    Output_Object.Answers_Array = {
    Array_Length: "PHQ9 question input has more than 9 answers",
    PHQ9_total_from_array: "Could not be determined"
    }
}
else if (count_input_in_array == 9 && onlyNumbers(Input_Object.Answers_Array)) {
    Output_Object.Answers_Array = {
    Array_Length: 9,
    PHQ9_total_from_array: sumarray(Input_Object.Answers_Array)
    }
}
else {
    Output_Object.Answers_Array = {
    Array_Length: 9,
    PHQ9_total_from_array: "Array data had non-numeric enteries"
    }
}

console.log(Output_Object)


//check strings in the array
//open postman