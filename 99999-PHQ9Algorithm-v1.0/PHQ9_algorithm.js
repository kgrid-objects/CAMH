
/* =================================================================================+
 * FILENAME : PHQ9_algorithm.js 
 * AUTHOR   : Dr. Allen Flynn and Shreya Kapoor, May, 2022
 * 
 * Summary  : Paload file that accepts a treatment algorithm stage, PHQ9 score, and report of
    adverse events and returns a recommendation from the overall treatment algorithm
 * =================================================================================+ */


const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;
            
const MIN_Medication_Stage_Number = 1;
const MAX_Medication_Stage_Number = 6;
            
const MIN_Patient_Current_PHQScore = 0;
const MAX_Patient_Current_PHQScore = 27;

//------------------------------------------------------------------//
//Sanitize request functions
//
function Sanitize_Patient_Current_Medication_Stage_Number(raw_request) {
    
    // Confirming the datatype of request fields are correct.
    if (typeof raw_request.Patient_Current_Medication_Stage_Number != "number" ||
        typeof raw_request == null) {
        
        return {error_code: EXIT_FAILURE, error_msg: "Wrong datatype provided! Please check again"};
    }

    // Confirming the bounds of output.Patient_Current_Medication_Stage_Number input
    else if (raw_request.Patient_Current_Medication_Stage_Number < MIN_Medication_Stage_Number ||
        raw_request.Patient_Current_Medication_Stage_Number > MAX_Medication_Stage_Number) {
        
        return {error_code: EXIT_FAILURE, error_msg: "Patient_Current_Medication_Stage_Number not in accepted range! Please check again"};
    }

    // If input is correct, return EXIT_SUCCESS
    return {error_code: EXIT_SUCCESS, error_msg: "No error"};

}

function Sanitize_Patient_Current_PHQ9Score(raw_request) {

    // Confirming the datatype of request fields are correct.
    if (typeof raw_request.Patient_Current_PHQScore != "number" ||
        typeof raw_request == null) {
        
        return {error_code: EXIT_FAILURE, error_msg: "Wrong datatype provided! Please check again"};
    }

    // Confirming the bounds of output.Patient_Current_PHQScore input
    else if (raw_request.Patient_Current_PHQScore < MIN_Patient_Current_PHQScore ||
        raw_request.Patient_Current_PHQScore > MAX_Patient_Current_PHQScore) {
        
        return {error_code: EXIT_FAILURE, error_msg: "Patient_Current_PHQScore not in accepted range! Please check again"};
    }

    // If input is correct, return EXIT_SUCCESS
    return {error_code: EXIT_SUCCESS, error_msg: "No error"};

}

function Sanitize_Patient_Adverse_Events(raw_request) {
    // Confirming the datatype of request fields are correct.
    if (typeof raw_request.Patient_Adverse_Events != "string" ||
        typeof raw_request == null) {
        
        return {error_code: EXIT_FAILURE, error_msg: "Wrong datatype provided! Please check again"};
    }

    // Confirming the values Patient_Adverse_Events input to be yes/no
    else if (raw_request.Patient_Adverse_Events.toUpperCase() != "YES" &&
        raw_request.Patient_Adverse_Events.toUpperCase() != "NO") {
        
        return {error_code: EXIT_FAILURE, error_msg: "Patient_Adverse_Events value should be yes or no. Please check again"};
    }

    // If input is correct, return EXIT_SUCCESS
    return {error_code: EXIT_SUCCESS, error_msg: "No error"};
}

//------------------------------------------------------------------//
//Interpretation and recommendation function
var Response_Object = {};
function Interpretation_And_Recommendations(raw_request) {

     if(raw_request.Patient_Current_Medication_Stage_Number <= 6) {
        if (raw_request.Patient_Current_PHQScore <= 5 && raw_request.Patient_Adverse_Events.toUpperCase() == "NO") {
            Response_Object.Interpretation_And_Recommendations = {
                Current_PHQ9_Assessment: "None or Minimal Symptoms",
                Current_Medication_Stage: raw_request.Patient_Current_Medication_Stage_Number,
                Next_Step: "Continue treatment in current dose",
            }
        }
 
        else if (raw_request.Patient_Current_PHQScore <= 5 && raw_request.Patient_Adverse_Events.toUpperCase() == "YES") {
            Response_Object.Interpretation_And_Recommendations = {
                Current_PHQ9_Assessment: "None or Minimal Symptoms",
                Current_Medication_Stage: raw_request.Patient_Current_Medication_Stage_Number,
                Next_Step: "Continue on lower dose or Change treatment to other option in same algorithm stage or Proceed to next stage",
            }
        }
 
        else if (raw_request.Patient_Adverse_Events.toUpperCase() == "NO" && raw_request.Patient_Current_PHQScore >= 5 || raw_request.Patient_Current_PHQScore <= 9) {
            Response_Object.Interpretation_And_Recommendations = {
                Current_PHQ9_Assessment: "Mild Depression",
                Current_Medication_Stage: raw_request.Patient_Current_Medication_Stage_Number,
                Next_Step: "Consider dose increase (if maximum dose not reached) or Proceed to next algorithm stage",
            }
        }
 
        else if (raw_request.Patient_Adverse_Events.toUpperCase() == "YES" && raw_request.Patient_Current_PHQScore >= 5 || raw_request.Patient_Current_PHQScore <= 9) {
            Response_Object.Interpretation_And_Recommendations = {
                Current_PHQ9_Assessment: "Mild Depression",
                Current_Medication_Stage: raw_request.Patient_Current_Medication_Stage_Number,
                Next_Step: "Continue on lower dose or Change treatment to other option in same algorithm stage or Proceed to next stage or Proceed to next algorithm stage",
            }
        }
 
        else if ( raw_request.Patient_Adverse_Events.toUpperCase() == "NO" && raw_request.Patient_Current_PHQScore >= 9 || raw_request.Patient_Current_PHQScore <= 27) {
            Response_Object.Interpretation_And_Recommendations = {
                Current_PHQ9_Assessment: "Moderate to Severe Depression",
                Current_Medication_Stage: raw_request.Patient_Current_Medication_Stage_Number,
                Next_Step: "Increase dose (if maximum dose not reached) or Proceed to next algorithm stage",
            }
        }
 
        else if (raw_request.Patient_Adverse_Events.toUpperCase() == "YES" && raw_request.Patient_Current_PHQScore >= 9 || raw_request.Patient_Current_PHQScore <= 27) {
            Response_Object.Interpretation_And_Recommendations = {
                Current_PHQ9_Assessment: "Moderate to Severe Depression",
                Current_Medication_Stage: raw_request.Patient_Current_Medication_Stage_Number,
                Next_Step: "Change treatment to other option in same algorithm stage or Proceed to next algorithm stage",
            }
        }

    } else {
        Response_Object.Interpretation_And_Recommendations = "Request not understood";
    }
 
   return Response_Object;
}

//------------------------------------------------------------------//
// Main process request function
var Response = {};
function process_request(request) {

    // Returning error message if Sanitized request error code is a faliure
    Sanitized_Medication_Stage_Request = Sanitize_Patient_Current_Medication_Stage_Number(request);
    Sanitized_PHQ9Score_Request = Sanitize_Patient_Current_PHQ9Score(request);
    Sanitized_Adverse_Event_Request = Sanitize_Patient_Adverse_Events(request);
    if (Sanitized_Medication_Stage_Request.error_code == EXIT_FAILURE) return Sanitized_Medication_Stage_Request;
    else if (Sanitized_PHQ9Score_Request.error_code == EXIT_FAILURE) return Sanitized_PHQ9Score_Request;
    else if (Sanitized_Adverse_Event_Request.error_code == EXIT_FAILURE) return Sanitized_Adverse_Event_Request;
    else {
        Response = Interpretation_And_Recommendations(request)
        Response.KnowledgeObject = {identifier : "99999-PHQ9Algorithm", hasVersion : "1.0"};
        return Response
    }
}

module.exports = { process_request };