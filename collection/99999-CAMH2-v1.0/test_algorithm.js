/* ==================================================================
 * FILENAME : test_algorithm.js 
 * AUTHOR   : Shreya Kapoor & Dr. Flynn
 * 
 * Description: test file for PHQ9_algorithm.js
 * ================================================================== */

var api = require('./PHQ9_algorithm');

const EXIT_SUCCESS = 0;
const EXIT_FAILURE = 1;

function error_handling(response) {
    
    if (response.error_code == EXIT_FAILURE) {
        console.log("Passed");
        console.log(response.error_msg);
    } else {
        console.log("Passed with appropriate request");
        console.log(response);
    }
}

/* --------------------------------------------------------------------------------------------------------------- */

// TEST 0 - Sending a correct request
var request = {Patient_Current_Medication_Stage_Number: 1, Patient_Current_PHQScore: 4, Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 1 - Testing for wrong datatype -->
//TEST 1.1 Patient_Current_Medication_Stage_Number is wrongly sent as string
console.log("\nTEST 1.1 Patient_Current_Medication_Stage_Number is wrongly sent as string");
var request = {Patient_Current_Medication_Stage_Number: "1", Patient_Current_PHQScore: 4, Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 1.2 Patient_Current_PHQScore field is wrongly sent as string
console.log("\nTEST 1.2 Patient_Current_PHQScore field is wrongly sent as string");
var request = {Patient_Current_Medication_Stage_Number: 1, Patient_Current_PHQScore: "4", Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 1.3 Patient_Adverse_Events field is wrongly sent as number
console.log("\nTEST 1.3 Patient_Adverse_Events field is wrongly sent as number");
var request = {Patient_Current_Medication_Stage_Number: 1, Patient_Current_PHQScore: 4, Patient_Adverse_Events: 1};
var response = api.process_request(request);
error_handling(response);

// TEST 1.4 No input is sent in any field
console.log("\nTEST 1.4 No input is sent in any field");
var request = {Patient_Current_Medication_Stage_Number: null, Patient_Current_PHQScore: 4, Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 2 - Testing for Medication_Stage_Number bounds
// TEST 2.1 - If Medication_Stage_Number is less than 1
console.log("\nTEST 2.1 - If Medication_Stage_Number is less than 1");
var request = {Patient_Current_Medication_Stage_Number: -5, Patient_Current_PHQScore: 4, Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 2.2 - If Medication_Stage_Number is greater than 6
console.log("\nTEST 2.2 - If Medication_Stage_Number is greater than 6");
var request = {Patient_Current_Medication_Stage_Number: 9, Patient_Current_PHQScore: 4, Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 3 - Testing for Patient_Current_PHQScore bounds
// TEST 3.1 - If Patient_Current_PHQScore is less than 0
console.log("\nTEST 3.1 - If Patient_Current_PHQScore is less than 0");
var request = {Patient_Current_Medication_Stage_Number: 1, Patient_Current_PHQScore: -5, Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 3.2 - If Patient_Current_PHQScore is greater than 27
console.log("\nTEST 3.2 - If Patient_Current_PHQScore is greater than 27");
var request = {Patient_Current_Medication_Stage_Number: 1, Patient_Current_PHQScore: 50, Patient_Adverse_Events: "yes"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 4 - testing for value(s) in send Patient_Adverse_Events is/are yes or no
// TEST 4.1 - If value(s) is/are other than yes/no for Patient_Adverse_Events
console.log("\nTEST 4.1 - If value(s) is/are other than yes/no for Patient_Adverse_Events");
var request = {Patient_Current_Medication_Stage_Number: 1, Patient_Current_PHQScore: 20, Patient_Adverse_Events: "maybe"};
var response = api.process_request(request);
error_handling(response);