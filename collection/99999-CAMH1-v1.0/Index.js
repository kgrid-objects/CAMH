
/* =================================================================================+
 * FILENAME : F1_PHQ_questionnaire.js 
 * AUTHOR   : Dr. Allen Flynn and Shreya Kapoor, April, 2022
 * 
 * Summary  : Program for CAMH hospital to take questionnaire input and do some
 * analysis and return result.
 * 
 * Content  :
    * PHQ9_Questionnaire
    * Input Object(i)
    * Main Function call : process_request(i(takes in input request)){}
    * Functions -->
        1)PHQ9_Score_From_Array(Input: ){Response:}
        2)PHQ9_Score_Advice(Input: takes pt. current PHQ Score) {Response: see if the number is between 0-27; if valid PHQ9 score, provides interpretation and recommendations}
        3)Attach_PHQ9 (Input: Request for questionnaire(yes/no)){Response: if yes-send the questionaire; if no-do nothing}
 * =================================================================================+ */

// PHQ9_Questionnaire
const PHQ9_Questionnaire = {
    initialPrompt: "Over the last 2 weeks, how often have you been bothered by any of the following problems?",
    questionOne: "Little interest or pleasure in doing things: ",
    questionTwo: "Feeling down, depressed, or hopeless: ",
    questionThree: "Trouble falling or staying asleep, or sleeping too much: ",
    questionFour: "Feeling tired or having little energy: ",
    questionFive: "Poor appetite or overeating: ",
    questionSix: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down: ",
    questionSeven: "Trouble concentrating on things, such as reading the newspaper or watching television: ",
    questionEight: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual: ",
    questionNine: "Thoughts that you would be better off dead or of hurting yourself in some way: ",
}

//-----------------------------------------------------------//
//Main Function call
var i = { Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 1, 1], Send_Questionnaire: "no"};
function process_request(i) {
    var o = {};
    var Score = PHQ9_Score_From_Array(i.Answers_Array);
    if (Score.PHQ9_total_from_array < i.Total_PHQ9_Score) {
        Score.PHQ9_total_from_array = i.Total_PHQ9_Score;
    }
    o.Score = Score;
    o.Interpretation_And_Recommendations = PHQ9_Score_Advice(Score.PHQ9_total_from_array);
    o.PHQ9_Questionnaire = Attach_PHQ9(i.Send_Questionnaire);
    return o
}

//console.log(process_request(i));
module.exports = { process_request };

//-----------------------------------------------------------//
//Functions 1
//Testing the value for the request for the questionnaire
function Attach_PHQ9(Send_Questionnaire) {
    var PHQ9_Questionnaire = {};
    if (String(Send_Questionnaire).toUpperCase() == "YES") {
        PHQ9_Questionnaire = PHQ9content;
    }
    else if (String(Send_Questionnaire).toUpperCase() == "NO") {
        PHQ9_Questionnaire = "Not requested";
    }
    else if (Send_Questionnaire == "") {
        PHQ9_Questionnaire = "Not requested";
    }
    else {
        PHQ9_Questionnaire = "Request not understood";
    }
    return PHQ9_Questionnaire
}

//Functions 2
//testing the validity of PHQ9 score and providing interpretations and recommendations
//Interprertation url: https://www.hiv.uw.edu/page/mental-health-screening/phq-9

function PHQ9_Score_Advice(score) {
    var Interpretation_And_Recommendations = {};
    if (typeof score === "string") {
        Interpretation_And_Recommendations = {
            Depression_Severity: "Undetermined due to string input",
            Proposed_Treatment_Actions: "Undetermined due to string input"
        }
    }
    else if (score === null) {
        Interpretation_And_Recommendations = {
            Depression_Severity: "Undetermined",
            Proposed_Treatment_Actions: "Undetermined"
        }
    }
    else if (score >= 0 && score <= 4) {
        Interpretation_And_Recommendations = {
            Depression_Severity: "None_minimal",
            Proposed_Treatment_Actions: "None"
        }
    }
    else if (score >= 5 && score <= 9) {
        Interpretation_And_Recommendations = {
            Depression_Severity: "Mild",
            Proposed_Treatment_Actions: "Watchful waiting; repeat PHQ-9 at follow-up"
        }
    }
    else if (score >= 10 && score <= 14) {
        Interpretation_And_Recommendations = {
            Depression_Severity: "Moderate",
            Proposed_Treatment_Actions: "Treatment plan, considering counseling, follow-up and/or pharmacotherapy"
        }
    }
    else if (score >= 15 && score <= 19) {
        Interpretation_And_Recommendations = {
            Depression_Severity: "Moderately Severe",
            Proposed_Treatment_Actions: "Active treatment with pharmacotherapy and/or psychotherapy"
        }
    }
    else if (score >= 20 && score <= 27) {
        Interpretation_And_Recommendations = {
            Depression_Severity: "Severe",
            Proposed_Treatment_Actions: "Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management"
        }
    }
    else {
        Interpretation_And_Recommendations = {
            Depression_Severity: "Undetermined due to number out of range",
            Proposed_Treatment_Actions: "Undetermined due to number out of range"
        }
    }
    return Interpretation_And_Recommendations
}

//Functions 3
//testing the array total and calculating the sum
function sumarray(array) {
    var sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function onlyNumbers(array) {
    return array.every(element => {
        return typeof element === 'number';
    });
}

function PHQ9_Score_From_Array(Answers) {
    var Score = {};
    var count_input_in_array = Answers.length;
    if (count_input_in_array < 9) {
        Score = {
            Array_Length: "PHQ9 question input has less than 9 answers",
            PHQ9_total_from_array: "Could not be determined"
        }
    }
    else if (count_input_in_array > 9) {
        Score = {
            Array_Length: "PHQ9 question input has more than 9 answers",
            PHQ9_total_from_array: "Could not be determined"
        }
    }
    else if (count_input_in_array == 9 && onlyNumbers(Answers)) {
        Score = {
            Array_Length: 9,
            PHQ9_total_from_array: sumarray(Answers)
        }
    }
    else {
        Score = {
            Array_Length: 9,
            PHQ9_total_from_array: "Array data had non-numeric enteries"
        }
    }
    return Score
}

