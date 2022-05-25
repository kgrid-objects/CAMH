#PHQ9 Score Interpreter

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
    - Starting from the source code
    - KGRID Activator Microserver Tool
    - Use the browser to check the activator running on your device
    - Explore the KO in the Swagger editor

- Input and Output
- Common Issues/Problems
- References

## Introduction

Knowledge Object(KO) is a package holding commutable biomedical knowledge[1]. The purpose of building KOs is to help make computable biomedical knowledge findable, accessible, interoperable, and reusable[1]. 

KO in the K-grid community is defined as a document including or containing, at a minimum: some KO primary identifier, KO resource metadata fact sheet, KO service specification, KO lifecycle log, KO payload[1]. 

PHQ9 Score Interpreter Knowledge Object(KO) is defined as 99999-CAMH1-v1.0 in the collection repository on githib. Following is a description of PHQ9 Score Interpreter Knowledge Object.

## PHQ9 Score Interpreter Knowledge Object and its Composition

### KO’s CBK Model - Knowledge Payload

Knowledge Object payload is defined as a document compromised of one more knowledge content entities[1]. Following is a description of the payload files in the KO

#### Description of the payload files
There are two payload files in written in JavaScript in the PHQ9 Score Interpreter KO named index.js file and test.js. 

Index.js file contains JS code that takes input request for three variables ​​that are Total_PHQ9_Score, Answers_Array, and Send_Questionnare. Total_PHQ9_Score represents the total PHQ9 questionnaire score. Answers_Array represents the score from individual nine answers to the PHQ9 questions. Send_Questionnare represents the request to send the qhole questionnaire.

The index.js file has multiple functions that does error checking of the input and provide interpretations and recommendations to the provided PHQ9 score input. Following is the source for the interpretations of the PHQ9 score https://www.hiv.uw.edu/page/mental-health-screening/phq-9.

The test.js file contains multiple tests that are deployed to check the validity of error handling code in the index.js file.

### KO’s Deployment description
The deployment description file contains the specificatopn of CBK model’s runtime requirements. The deployment description file in the KO is named deployment.yaml.

### KO’s Service Description
The service description file contains specification for an API for the CBK model. The  service description file in the KO is named service.yaml

### KO’s Metadata
The metadata file contains description of an array of knowledge object properties. The metadata filen the KO is named metadata.json.

## How to get the PHQ9 Score Interpreter running in your local environment

### Prerequisites
There are testing and packaging features in this project that require npm, npm is installed with Node.js npm. Once npm is installed

```
cd ./99999-CAMH1-v1.0/
npm install
```

### Starting from CAMH source code
Check out the score object GitHub repo:

git clone \https://github.com/kgrid-objects/CAMH.git
cd collection

Then download the latest release of the KGrid Activator from the release page (https://github.com/kgrid/kgrid-activator/releases)

directly into the score directory you just checked out and start up the Activator pointing to the current directory. For example, on a Mac (you'll need the Java SDK version 8 or higher running on your machine):

java -jar /Users/shreyakapoor/Documents/GitHub/CAMH/.kgrid/kgrid-activator-1.7.0.jar --spring.profiles.active=dev --kgrid.shelf.cdostore.url=filesystem:file:${PWD}

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
### Explore the KO
To try out the KO in the Swagger Editor you need to point to the service description from the Swagger Editor at https://editor.swagger.io. The easiest way to is construct a Swagger Editor url pointing to the OpenAPI YAML file containing the service description:

https://editor.swagger.io/?url=http://localhost:8080/99999/CAMH1/v1.0/service.yaml




