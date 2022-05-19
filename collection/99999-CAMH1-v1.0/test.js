//test file

//import * as process from 'index.js';
var api = require('./index');

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
console.log("\nTEST 0 - Sending a correct request");
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 0, 3, 2, 1, 1, 2, 3], Send_Questionnare: "YES"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 1 - Testing for wrong datatype -->
// TEST 1.1 Total_PHQ9_Score field is wrongly sent as string
console.log("\nTEST 1.1 Total_PHQ9_Score field is wrongly sent as string");
var request = {Total_PHQ9_Score: "27", Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 1.2 Answers_Array field is wrongly sent as string
console.log("\nTEST 1.2 Answers_Array field is wrongly sent as string");
var request = {Total_PHQ9_Score: 27, Answers_Array: "[1, 0, 2, 3, 2, 1, 1, 2, 3]", Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 1.3 Send_Questionnaire field is wrongly sent as number
console.log("\nTEST 1.3 Send_Questionnaire field is wrongly sent as number");
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: 2};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 2 - Testing for total PHQ9 score bounds
// TEST 2.1 - If Total score is less than 0
console.log("\nTEST 2.1 - If Total score is less than 0");
var request = {Total_PHQ9_Score: -5, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 2.2 - If Total score is greater than 27"
console.log("\nTEST 2.2 - If Total score is greater than 27");
var request = {Total_PHQ9_Score: 30, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 3 - Testing for array length bounds
// TEST 3.1 - If array length is less than 0
console.log("\nTEST 3.1 - If array length is less than 0");
var request = {Total_PHQ9_Score: 27, Answers_Array: [], Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 3.2 - If array length is greater than 9
console.log("\nTEST 3.2 - If array length is greater than 9");
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 2, 2, 3, 2, 1, 1, 2, 3, 1], Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 4 - testing for values in answer array are in range 0-3
// TEST 4.1 - If value(s) in array is/are less than 0
console.log("\nTEST 4.1 - If value(s) in array is/are less than 0");
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, -2, 3, 2, 1, 1, 2, 2], Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

// TEST 4.2 - If value(s) is/are greater than 9
console.log("\nTEST 4.2 - If value(s) in array is/are greater than 9");
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 10], Send_Questionnare: "Yes"};
var response = api.process_request(request);
error_handling(response);

/* -------------------------- */

// TEST 5 - testing for value(s) in send questionnaire is/are yes or no
// TEST 5.1 - If value(s) is/are other than yes/no
console.log("\nTEST 5.1 - If value(s) in Send_Questionnaire is/are other than yes/no");
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 2], Send_Questionnaire: ""};
var response = api.process_request(request);
error_handling(response);

