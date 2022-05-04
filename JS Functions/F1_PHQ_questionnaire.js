//Created by Dr. Allen and Shreya, April, 2022
/*Content
Declare Data Object --> PHQ9 data object
Prompt statements --> 
        1)Enter patient's current PHQScore 
        2)Enter patient's answers in array 
        3)Request for questionnaire
Functions -->
        1)PHQ9_quesionnaire(Request for questionnaire(yes/no)){if yes-send the questionarrie; if no-do nothing}
        2)Total_PHQ9(takes pt. current PHQ Score) {see if the number is between 0-27; result: valid PHQ9 score}
        3)Total_question_answered(take in 9 inputs seperated by comma or seperated by nothing) {
            convert them to array; see how many inputs are; if 9, calculate the total; if less than or more than 9 ask for valid input
        }
*/
//-----------------------------------------------------------//


//Declare Data Object
var os = require("os");
const prompt = require('prompt-sync')({sigint: true});

// This is a PHQ9 data object
const PHQ9content = {
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
//Prompt statements
let patient_current_PHQScore  = prompt("Enter patient's current PHQScore(Number/NA): ");
patient_current_PHQScore_number = Number(patient_current_PHQScore);
if (patient_current_PHQScore == "NA") {
    console.log("\nPlease request for questionnaire");
}
else if (isNaN(patient_current_PHQScore_number)) {
    console.log("\nPlease provide a valid input");
}

let patient_score_array = prompt("Enter patient's answers in array(9 values/NA): ");
if (patient_score_array == "NA") {
    console.log("\nPlease request for questionnaire");
}
else if (isNaN(patient_score_array)) {
    if (isNaN(patient_score_array) != "NA"){
    console.log("\nPlease provide a valid input");
}
}

questionnaire_request = 0;
let request_for_questionnaire = prompt("Request for questionnaire(yes(1)/no(0)): ");
if (request_for_questionnaire == "yes") {
    questionnaire_request = 1;
}
else if (request_for_questionnaire == 1) {
    questionnaire_request = 1;
}
else if (request_for_questionnaire == "no") {
    questionnaire_request = 0;
}
else if (request_for_questionnaire == 0) {
    questionnaire_request = 0;
}



//-----------------------------------------------------------//
//Functions

//Functions 1
// function PHQ9_quesionnaire(Request for questionnaire(yes/no)){if yes-send the questionarrie; if no-do nothing}
var questionanswed = 0;
var userinput1 = "";
var array_Fone = [];
var array_length = 0
if (questionnaire_request == 1) {
    prompt("\n\nOver the last 2 weeks, how often have you been bothered by any of the following problems?\nProvide answer ranging from 0 to 3(press enter)")
    for (const [key, value] of Object.entries(PHQ9content)) {
        userinput1 = prompt(value);
        answer = Number(userinput1);
        array_Fone.push(answer);
        questionanswed += answer;
        array_length = array_Fone.length
        if (userinput1 > 3) {
            console.log("\nPlease provide a valid input");
            break
        }
        else {
            continue
        }
    }
    console.log("\nOUTPUT")
    console.log("\nArray question answered: " + array_Fone)
    console.log("Number of question answered: " + array_length)
    console.log("PHQ9 score of question answered: " + questionanswed)
}
else if (questionnaire_request == 0){
    console.log("\nEnter patient's current PHQScore\nOr\nEnter patient's answers in array(9 values)")
}

if (questionanswed<=4 && questionanswed >= 0 && array_length == 9) {console.log("Results:  Depression Severity: None-minimal; Proposed Treatment Actions: None")} 
else if(questionanswed<=9 && questionanswed >= 5 && array_length == 9) {console.log("Results:  Depression Severity: Mild; Proposed Treatment Actions: Watchful waiting; repeat PHQ-9 at follow-up")} 
else if(questionanswed<=14 && questionanswed >= 10 && array_length == 9) {console.log("Results:  Depression Severity: Moderate; Proposed Treatment Actions: Treatment plan, considering counseling, follow-up and/or pharmacotherapy")} 
else if(questionanswed<=19 && questionanswed >= 15 && array_length == 9) {console.log("Results:  Depression Severity: Moderately Severe; Proposed Treatment Actions: Active treatment with pharmacotherapy and/or psychotherapy")} 
else if(questionanswed<=27 && questionanswed >= 20 && array_length == 9) {console.log("Results:  Depression Severity: Severe; Proposed Treatment Actions: Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management")}
else if(array_length != 9) {console.log("Please provide a valid input")}
//Interprertation url: https://www.hiv.uw.edu/page/mental-health-screening/phq-9


//Functions 2
//function total_PHQ9(takes pt. current PHQ Score) {see if the number is between 0-27; result: valid PHQ9 score}
if (patient_current_PHQScore_number <= 27){
    console.log("\n\nPatient current PH9 provided: " + patient_current_PHQScore_number);
}
else if (patient_current_PHQScore_number > 27) {
    console.log("\n\nPHQ9Score not in range. Try again");
}
else if (patient_current_PHQScore_number < 0) {
    console.log("\n\nPHQ9Score not in range. Try again");
}
//}

//Functions 3
//function total_question_answered(take in 9 inputs seperated by comma or seperated by nothing) {
//     convert them to array; see how many inputs are; if 9, calculate the total; if less than or more than 9 ask for valid input}
const array = Array.from(String(patient_score_array), Number);
console.log("\n\nTotal input: " + (array))

var count_input_in_array = array.length;
console.log("Number of input: " + count_input_in_array)

if (count_input_in_array < 9){
    console.log("PHQ9 question input less than 9; Please provide 9 input");
}
else if (count_input_in_array > 9) {
    console.log("PHQ9 question input more than 9; Please provide 9 input");
}
else if (count_input_in_array == 9) {
    const reducer = (accumulator, curr) => accumulator + curr;
    console.log("Total PHQ9 Score: " + array.reduce(reducer));
}


console.log("\nThank you")
console.log("\n\n")





