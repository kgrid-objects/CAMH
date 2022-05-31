# PHQ9 Score Interpreter

This repository represents _PHQ9 Score Interpreter Knowledge Object(KO)_. 

## Table of Contents

- Introduction

- Knowledge Object and its Composition
    - KO’s CBK Model - Knowledge Payload
        - Description of the payload files
    - KO’s Deployment description
    - KO’s Service Description
    - KO’s Metadata

- How to get the PHQ9 Score Interpreter running in your local environment
    - Prerequisites: Testing and packaging
    - Understanding KGRID Activator Microserver Tool
    - Starting from the CAMH source code
    - Use the browser to check the activator running on your device
    - Explore the KO in the Swagger editor

- Input and Output
- Common Issues/Problems
- References

## Introduction

Knowledge Object(KO) is a digital package holding commutable biomedical knowledge[1]. The purpose of building KOs is to help make computable biomedical knowledge findable, accessible, interoperable, and reusable[1]. 

KO in the K-grid community is defined as a document including or containing, at a minimum: some KO primary identifier, KO resource metadata fact sheet, KO service specification, KO lifecycle log, KO payload[1]. 

PHQ9 Score Interpreter Knowledge Object(KO) is defined as 99999-CAMH1-v1.0 in the collection repository on githib. Following is a description of PHQ9 Score Interpreter Knowledge Object.

## PHQ9 Score Interpreter Knowledge Object and its Composition

### KO’s CBK Model - Knowledge Payload

Knowledge Object payload is defined as a document compromised of one more knowledge content entities[1]. Following is a description of the payload files in the PHQ9 Score Interpreter KO.

#### Description of the payload files
There are two payload files in written in JavaScript in the PHQ9 Score Interpreter KO named index.js file and test.js. 

Index.js file contains JS code that takes input request for three parameters ​​that are Total_PHQ9_Score, Answers_Array, and Send_Questionnare. Total_PHQ9_Score represents the total PHQ9 questionnaire score. Answers_Array represents the score from individual nine answers to the PHQ9 questions. Send_Questionnare represents the request to send the PHQ9 questionnaire.

The index.js file has multiple functions that does error checking of the input and provide interpretations and recommendations to the provided PHQ9 score input. Following is the source for the interpretations of the PHQ9 score https://www.hiv.uw.edu/page/mental-health-screening/phq-9.

The test.js file contains multiple tests that are deployed to check the validity of error handling code in the index.js file.

### KO’s Deployment description
The deployment description file contains the specificatopn of CBK model’s runtime requirements[1]. The deployment description file in the KO is named deployment.yaml.

### KO’s Service Description
The service description file contains specification for an API for the CBK model[1]. The  service description file in the KO is named service.yaml

### KO’s Metadata
The metadata file contains description of an array of knowledge object properties like identifiers and simple descriptive elements. The structural metadata follows the Knowledge Object Information Ontology (KOIO) code artifact(s). The metadata filen the KO is named metadata.json.

## How to get the PHQ9 Score Interpreter running in your local environment

### Prerequisites
There are testing and packaging features in this project that require code editor with [Node.js](https://nodejs.org/en/) and [Java11+JDK](https://www.oracle.com/java/technologies/downloads/). 

### Understanding KGRID Activator Microserver Tool
Kgrid [activator](https://github.com/kgrid/kgrid-activator) provides remote invocation of the KO. The activator “activate” computable knowledge by (a) loading KOs stored as a digital files, (b) providing means to execute the computable knowledge held in those files, (c) making those means of execution available to external systems via web services, and (d) tracking the utilization of those web services[1].


### Starting from CAMH source code
Check out the score object GitHub repo:

git clone \https://github.com/kgrid-objects/CAMH.git
cd collection

Then download the latest release of the KGrid Activator from the release page (https://github.com/kgrid/kgrid-activator/releases).
See the kgrid activator [documentation](http://kgrid.org/kgrid-activator/#activator-quick-start)for instructions on getting an activator running locally.

directly into the score directory you just checked out and start up the Activator pointing to the current directory. For example, on a Mac (you'll need the Java SDK version 8 or higher running on your machine):

```
java -jar kgrid-activator-1.7.0.jar --spring.profiles.active=dev --kgrid.shelf.cdostore.url=filesystem:file:${PWD}
```

### Use the browser to check the activator running on your device
You can check that the Activator is running by going to http://localhost:8080 in a browser. You should see this description on your browser:
```
{
  "description" : "KGrid Activator API Starting Point!!",
  "links" : [ {
    "rel" : "activator_health",
    "href" : "http://localhost:8080/actuator/health"
  }, {
    "rel" : "activator_info",
    "href" : "http://localhost:8080/actuator/info"
  }, {
    "rel" : "activator_ko_list",
    "href" : "http://localhost:8080/kos"
  }, {
    "rel" : "activator_endpoint_list",
    "href" : "http://localhost:8080/endpoints"
  } ]
}
```
To see KO metadata run http://localhost:8080/endpoint/kos. The metadata for PHQ9 Score Interpreter should look like this:
```
{
  "@id" : "99999/CAMH1/v1.0",
  "@type" : "koio:KnowledgeObject",
  "identifier" : "ark:/99999/CAMH1/v1.0",
  "version" : "v1.0",
  "title" : "PHQ9 Score Interpreter",
  "description" : "PHQ9 Score Interpreter Knowledge Object",
  "keywords" : [ "PHQ9", "Score", "CAMH" ],
  "hasServiceSpecification" : "service.yaml",
  "hasDeploymentSpecification" : "deployment.yaml",
  "hasPayload" : "index.js",
  "@context" : [ "http://kgrid.org/koio/contexts/knowledgeobject.jsonld" ]
}
```

### Explore the KO in the Swagger editor
To try out the KO in the Swagger Editor you need to point to the service description from the Swagger Editor at https://editor.swagger.io. The easiest way to is construct a Swagger Editor url pointing to the OpenAPI YAML file containing the service description:

https://editor.swagger.io/?url=http:/localhost:8080/kos/99999/CAMH1/v1.0/service.yaml

Follow the editor instructions to try out the CAMH interface. THe Swagger Editor prepopulates the request with the example from the KOs service description. You can change the input parameters to see the interpretations and recommendations for the provided PHQ9 Score.

## Input and Output
### Input Object
Sample input object for the PHQ9 Score Interpreter has three parameters.
```
{ "Total_PHQ9_Score": 27, "Answers_Array": [1, 0, 2, 3, 2, 1, 1, 1, 1], "Send_Questionnaire": "no"}
```

### Output Object
To get the output, click _Post_ button in green on the swagger editor. Then click _Try it out_ on the right side of the page followed by clicking execute.
The output should look like this:
```
{
  "result": {
    "Score": {
      "Array_Length": 9,
      "PHQ9_total_from_array": 12
    },
    "Interpretation_And_Recommendations": {
      "Depression_Severity": "Severe",
      "Proposed_Treatment_Actions": "Immediate initiation of pharmacotherapy and, if severe impairment or poor response to therapy, expedited referral to a mental health specialist for psychotherapy and/or collaborative management"
    },
    "PHQ9_Questionnaire": "Not requested"
  }
```

You can change the input parameters values in the input box to see the interpretations and recommendations for different PHQ9 Scores.


## Common Issues/Problems
- Comment the module.exports = { process_request }; code from index.js after running the test.js file.

## References
[1] Flynn, AJ, Friedman, CP, Boisvert, P, Landis-Lewis, Z, Lagoze, C. The Knowledge Object Reference Ontology (KORO): A formalism to support management and sharing of computable biomedical knowledge for learning health systems. Learn Health Sys. 2018; 2:e10054. https://doi.org/10.1002/lrh2.10054

