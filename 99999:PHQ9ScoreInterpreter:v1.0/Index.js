
/* =================================================================================+
 * FILENAME : index.js 
 * AUTHOR   : Dr. Allen Flynn and Shreya Kapoor, April, 2022
 * 
 * Summary  : Paload file for CAMH to take questionnaire input and return interpretation and recommendations.
 * =================================================================================+ */

const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;
        
const MIN_PHQ9_SCORE = 0;
const MAX_PHQ9_SCORE = 27;
        
const MIN_ANSWER_ARRAY_LEN = 0;
const MAX_ANSWER_ARRAY_LEN = 9;

//------------------------------------------------------------------//
// PHQ9_Questionnaire
const PHQ9_Content = {
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
        
//------------------------------------------------------------------//
//Sanitize request functions
//Sanitize Total PHQ9 Score input function
function sanitize_input_Total_PHQ9_Score(raw_request) {
        
    // Confirming the datatype of request fields are correct.
    if (typeof raw_request.Total_PHQ9_Score != "number" ||
        typeof raw_request == null) {
                
        return {error_code: EXIT_FAILURE, error_msg: "Number expected. Wrong datatype provided! Please check again"};
    }
        
    // Confirming the bounds of total output.Total_PHQ9_Score input
    if (raw_request.Total_PHQ9_Score < MIN_PHQ9_SCORE ||
        raw_request.Total_PHQ9_Score > MAX_PHQ9_SCORE) {
                
        return {error_code: EXIT_FAILURE, error_msg: "PHQ9 Total_PHQ9_Score not in accepted range! Please check again"};
        }
        
    // If input is correct, return EXIT_SUCCESS
        return {error_code: EXIT_SUCCESS, error_msg: "No error"};
}

//Sanitize array input function
function sanitize_Answers_Array(raw_request) {
        
    // Confirming the datatype of request fields are correct.
    if (typeof raw_request.Answers_Array != "object" ||
        typeof raw_request == null) {
                
        return {error_code: EXIT_FAILURE, error_msg: "Array expected. Wrong datatype provided! Please check again"};
    }
        
    // Confirming the answer array length is within bounds
    if (raw_request.Answers_Array.length < MAX_ANSWER_ARRAY_LEN ||
        raw_request.Answers_Array.length > MAX_ANSWER_ARRAY_LEN) {
            
        return {error_code: EXIT_FAILURE, error_msg: "Answer array length not in accepted range! Please check again"};
    }
        
    // Confirming if the values in answer array are in range 0-3
    for (let ques_no = 0; ques_no < raw_request.Answers_Array.length; ques_no++) {
        if(raw_request.Answers_Array[ques_no] < 0 || raw_request.Answers_Array[ques_no] > 3) {
        
        return {error_code: EXIT_FAILURE, error_msg: "Answer to question " + (ques_no + 1) + " not in accepted range! Please check again"};
        }
    }
            
    // If input is correct, return EXIT_SUCCESS
        return {error_code: EXIT_SUCCESS, error_msg: "No error"};
    }

//Sanitize send questionaire request input function
function sanitize_Send_Questionnaire(raw_request) {
        
    // Confirming the datatype of request fields are correct.
    if (typeof raw_request.Send_Questionnaire != "string") {
                
        return {error_code: EXIT_FAILURE, error_msg: "String expected. Wrong datatype provided! Please check again"};
        }
        
    // Confirming the values Send_Questionnaire input to be yes/no
    else if (String(raw_request.Send_Questionnaire.toUpperCase()) != "YES" &&
        String(raw_request.Send_Questionnaire.toUpperCase()) != "NO") {
                
        return {error_code: EXIT_FAILURE, error_msg: "Send_Questionnaire value should be yes or no. Please check again"};
        }
            
    // If input is correct, return EXIT_SUCCESS
        return {error_code: EXIT_SUCCESS, error_msg: "No error"};
    }
        
//------------------------------------------------------------------//
//Function testing the value for the request for the questionnaire
function Attach_PHQ9(Send_Questionnaire) {
    var PHQ9_Questionnaire = {};
    if (String(Send_Questionnaire).toUpperCase() == "YES") {
        PHQ9_Questionnaire = PHQ9_Content;
    }
    else if (String(Send_Questionnaire).toUpperCase() == "NO") {
        PHQ9_Questionnaire = "Not requested";
    }
    else {
    console.log(Send_Questionnaire)
        PHQ9_Questionnaire = "Invalid request value"
    }
    return PHQ9_Questionnaire
}       
        
//Function testing the validity of PHQ9 score and providing interpretations and recommendations
//Interprertation url: https://www.hiv.uw.edu/page/mental-health-screening/phq-9
function PHQ9_Score_Advice(score) {
    var Interpretation_And_Recommendations = {};
    if (score >= 0 && score <= 4) {
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
    return Interpretation_And_Recommendations
}              
        
        
//Function testing the array total and calculating the sum
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

function PHQ9_Score_From_Array(answers) {
    var Score = {};
    var count_input_in_array = answers.length;
    if (count_input_in_array == 9 && onlyNumbers(answers)) {
        Score = {
            Array_Length: 9,
            PHQ9_total_from_array: sumarray(answers)
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


//-----------------------------------------------------------//
//Main Function call
function process_request(request) {
    var main_output = {};
    var Score = PHQ9_Score_From_Array(request.Answers_Array);
    var Sanitized_Total_PHQ9_Score = sanitize_input_Total_PHQ9_Score(request);
    var Sanitized_Answers_Array = sanitize_Answers_Array(request);
    var Sanitized_Send_Questionnaire = sanitize_Send_Questionnaire(request);

    if (Sanitized_Total_PHQ9_Score.error_code == EXIT_FAILURE) return  Sanitized_Total_PHQ9_Score;
    else if (Sanitized_Answers_Array.error_code == EXIT_FAILURE) return Sanitized_Answers_Array;
    else if (Sanitized_Send_Questionnaire.error_code == EXIT_FAILURE) return Sanitized_Send_Questionnaire;
    else if (Score.PHQ9_total_from_array < request.Total_PHQ9_Score) {
        Score.PHQ9_total_from_array = request.Total_PHQ9_Score;
    }
    main_output.Score =  PHQ9_Score_From_Array(request.Answers_Array);
    main_output.Interpretation_And_Recommendations = PHQ9_Score_Advice(Score.PHQ9_total_from_array);
    main_output.PHQ9_Questionnaire = Attach_PHQ9(request.Send_Questionnaire);
    return main_output
}

//module.exports = { process_request };       
        