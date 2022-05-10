//test file

//import * as process from 'F1_PHQ_questionnaire.js';
var api = require('./F1_PHQ_questionnaire');

/* --------------------------------------------------------------------------------------------------------------- */

// TEST 0 - Sending a correct request
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

/* -------------------------- */

// TEST 1 - Testing for wrong datatype -->
// TEST 1.1 Total_PHQ9_Score field is wrongly sent as string
var request = {Total_PHQ9_Score: "27", Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

// TEST 1.2 Answers_Array field is wrongly sent as string
var request = {Total_PHQ9_Score: 27, Answers_Array: "[1, 0, 2, 3, 2, 1, 1, 2, 3]", Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

// TEST 1.3 Send_Questionnaire field is wrongly sent as number
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: 2};
var response = api.process_request(request);
console.log(response);

/* -------------------------- */

// TEST 2 - Testing for total PHQ9 score bounds
// TEST 2.1 - If Total score is less than 0
var request = {Total_PHQ9_Score: -5, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

// TEST 2.2 - If Total score is greater than 27
var request = {Total_PHQ9_Score: 30, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 3], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

/* -------------------------- */

// TEST 3 - Testing for array length bounds
// TEST 3.1 - If array length is less than 0
var request = {Total_PHQ9_Score: 27, Answers_Array: [], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

// TEST 3.2 - If array length is greater than 9
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 2, 2, 3, 2, 1, 1, 2, 3, 1], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

/* -------------------------- */

// TEST 4 - testing for values in answer array are in range 0-3
// TEST 4.1 - If value(s) is/are less than 0
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, -2, 3, 2, 1, 1, 2, 2], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

// TEST 4.2 - If value(s) is/are greater than 9
var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 10], Send_Questionnare: "Yes"};
var response = api.process_request(request);
console.log(response);

/* -------------------------- */

// TEST 5 - testing for value(s) in send questionnaire is/are yes or no
// TEST 5.1 - If value(s) is/are other than yes/no
// var request = {Total_PHQ9_Score: 27, Answers_Array: [1, 0, 2, 3, 2, 1, 1, 2, 2], Send_Questionnaire: ""};
// var response = api.process_request(request);
// console.log(response);