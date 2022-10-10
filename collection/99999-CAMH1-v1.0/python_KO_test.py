from python_ko_index import process_request

EXIT_SUCCESS= 0
EXIT_FAILURE = 1


def error_handling(response): 
    if response.get("error_code") == EXIT_FAILURE:
        print("Passed")
        print(response.get("error_msg"))
    else:
        print("Passed with appropriate request\n")
        print(response)

#TEST 0 - Sending a correct request
print("\nTEST 0 - Sending a correct request\n")
request = {"Total_PHQ9_Score": 23}
response = process_request(request)
error_handling(response)

#--------------------------#

#TEST 1 - Testing for wrong datatype -->
# TEST 1.1 Total_PHQ9_Score field is wrongly sent as string
print("\nTEST 1.1 - Total_PHQ9_Score field is wrongly sent as string\n")
request = {"Total_PHQ9_Score": "23"}
response = process_request(request)
error_handling(response)


# TEST 1.2 Total_PHQ9_Score field is not in bounds
print("\nTEST 1.2 - Total_PHQ9_Score field is above bounds\n")
request = {"Total_PHQ9_Score": 32}
response = process_request(request)
error_handling(response)

# TEST 1.3 Total_PHQ9_Score field is in bounds but a decimal
print("\nTEST 1.3 - Total_PHQ9_Score field is in bounds but a decimal\n")
request = {"Total_PHQ9_Score": 3.26}
response = process_request(request)
error_handling(response)