

EXIT_SUCCESS = 0
EXIT_FAILURE = 1

MIN_PHQ9_SCORE = 0
MAX_PHQ9_SCORE = 27

IS_NULL = 0
IS_NOT_NULL = 1


def sanitize_input_Total_PHQ9_Score(raw_request):
    sanitize_output = raw_request
    for k, v in raw_request.items():
        if (v is None):
            output = {"null_code": IS_NULL, "error_code": EXIT_SUCCESS, "error_msg": "Provided value is null"}
            return sanitize_output.update(output)

        elif (v is not None):
        #Confirming the datatype of request fields are correct.
            if not isinstance(v, int):
                print(v)
                output =  {"null_code": IS_NOT_NULL, "error_code": EXIT_FAILURE, "error_msg": "Number expected. Wrong datatype provided! Please check again"}
                sanitize_output.update(output)
                return sanitize_output

        #Confirming the bounds of total output.Total_PHQ9_Score input
            if (v < MIN_PHQ9_SCORE) or (v > MAX_PHQ9_SCORE):
                output =  {"null_code": IS_NOT_NULL, "error_code": EXIT_FAILURE, "error_msg": "PHQ9 Total_PHQ9_Score not in accepted range! Please check again"}
                sanitize_output.update(output)
                return sanitize_output
    return raw_request


def PHQ9_Score_Interpretation(score):
    Interpretation_And_Recommendations = {}

    if score >= 0 and score <= 4:
        Interpretation_And_Recommendations = {
            " Depression_Severity": "None_minimal",
            "Proposed_Treatment_Actions": "None"}

    elif score >= 5 and score <= 9:
        Interpretation_And_Recommendations = {
            "Depression_Severity": "Mild",
            "Proposed_Treatment_Actions": "Watchful waiting; repeat PHQ-9 at follow-up"}

    elif score >= 10 and score <= 14:
        Interpretation_And_Recommendations = {
            "Depression_Severity": "Moderate",
            "Proposed_Treatment_Actions": "Treatment plan, considering counseling, follow-up and/or pharmacotherapy"}

    elif score >= 15 and score <= 19:
        Interpretation_And_Recommendations = {
            "Depression_Severity": "Moderately Severe",
            "Proposed_Treatment_Actions": "Active treatment with pharmacotherapy and/or psychotherapy"}

    elif score >= 20 and score <= 27:
        Interpretation_And_Recommendations = {
            "Depression_Severity": "Severe",
            "Proposed_Treatment_Actions": "Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management"}

    return Interpretation_And_Recommendations


def process_request(request):
    main_output = {}
    input_error_output = {}
    request_sanitize = sanitize_input_Total_PHQ9_Score(request)
    if request_sanitize.get("error_code") == EXIT_FAILURE:
        input_error_output = {
              "Input Problem" : request_sanitize}
        return input_error_output
    else:
        for k, v in request_sanitize.items():
            score_interp = PHQ9_Score_Interpretation(v)
            severity = score_interp.get("Depression_Severity")
            actions = score_interp.get("Proposed_Treatment_Actions")
            main_output = {
                "@context" : [
                 "https://fhircat.org/fhir-r4/original/contexts/observation.context.jsonld"
                ],
                "resourceType" : "fhir:Observation",
                 "status": {
                    "value": "final"
                },
                "component" : [{"valueInteger": v,"code":{"coding":[{"display":"Total PHQ9 Score"}]}},{"valueString":severity,"code":{"coding":[{"display":"Depression_Severity"}]}},{"valueString":actions,"code":{"coding":[{"display":"Proposed_Treatment_Actions"}]}}],
                }
        return main_output
