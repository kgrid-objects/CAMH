# PHQ9 Score Interpreter

This documentation is for the _PHQ9 Score Interpreter Knowledge Object(KO)_ kept in the 99999-CAMH1-v1.0 folder here on GitHub.  The 99999-CAMH1-v1.0 has all of the content needed for a compliant KGrid Knowledge Object (see below).

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

A Knowledge Object (KO) is a digital package holding computable biomedical knowledge, which is knowledge formatted to be computer readable or executable[1]. The purpose KOs is to demonstrate the potential of a common packaging approach for making computable biomedical knowledge findable, accessible, interoperable, and reusable (F.A.I.R.)[1]. 

For this project, KOs play a central role by packaging and thereby helping to organize several executable functions of interest related to depression screening and treatment.

To be compliant with the current KO scheme from the Knowlede Grid team at the University of Michigan, a KO package must include and contain, at a minimum: a KO primary identifier in a metadata file, a KO service specification, a KO deployment description, and - most critically of all - a "payload", which is of course a file with computer readable or executable biomedical knoweldge[1]. 

An example of a compliant KO is the "PHQ9 Score Interpreter Knowledge Object" with the unique identifier 99999-CAMH1-v1.0 in this repository. What follows next is a detailed description of PHQ9 Score Interpreter Knowledge Object.

## PHQ9 Score Interpreter Knowledge Object and its Composition

### KO’s CBK Payload

Inside this KO the CBK payload with a computer readable and executable representation of the validated Personal Health Questionnaire 9 (PHQ-9) depression screening tool and related scoring and interpretation information is found in the index.js file. This representation is in the JavaScript (JS) programming language, the same programming language that most web browsers now execute.  

For this KO, the index.js file contains JS code that accepts three inputs or parameters ​​ (1) the total PHQ9 numeric score summing an individual's responses to the PHQ-9 questionnaire (Total_PHQ9_Score), (2) an array of the individual's answers to the PHQ-9 questionnaire which can be summed to compute the total PHQ-9 score (Answers_Array), and (3) a flag either to return or not return the PHQ-9 questionnaire itself in English (Send_Questionnare). 

When executed, the index.js code validates the inputs. If problems with the inputs are found, then the computed result indicates what those problems are. If the inputs are as expected then the index.js code provides interpretations and recommendations tied to the Total PHQ9 score. The following is the source for these interpretations and recommendations based on the Total PHQ9 score https://www.hiv.uw.edu/page/mental-health-screening/phq-9.

### KO's Test File

Although it is not required to have a working KO, it can be helpful to include an executable file with tests of the payload so that KO users can confirm the payload is working as designed. In this case a test.js file is included for this purpose. When executed in an appropriate JS environment (e.g., Node), the test.js file runs multiple tests against the index.js code to confirm that the code is functioning as intended. Output from running the test.js file indicates tests run and whether those tests passed or failed. 

** Technical Note ** For the test.js file to run in the Node JS environment, there is one line of code at the end of the index.js file that must be uncommented first. That line exports the overarching function in the index.js so it can be tested. The line is normally commented out when using the KO. Here is that line:

//module.exports = { process_request };    

Once the module.exports command is uncommented, then the test.js file will call on and test the payload in the index.js file!

### KO’s Deployment description
The deployment description file contains the specificatopn of CBK model’s runtime requirements[1]. The deployment description file in the KO is named deployment.yaml.

### KO’s Service Description
The service description file contains specification for an API for the CBK model[1]. The  service description file in the KO is named service.yaml

### KO’s Metadata
The metadata file contains description of an array of knowledge object properties like identifiers and simple descriptive elements. These metadata align with the Knowledge Object Implementation Ontology (KOIO), which is a formalism for describing the critical parts of any KO. These metadata are found in the file metadata.json.

At this point, we have described the files comprising the KO with id = 99999-CAMH1-v1.0 titled "PHQ9 Score Interpreter". Next, we will cover some more technical information related to testing, deploying, and using this KO to back a simple RESTful webservice. 

## How to get the PHQ9 Score Interpreter KO running in your local environment

### Prerequisites and Dependencies
The following instructions assume that the user has installed Node.js and Java: 

[Node.js](https://nodejs.org/en/)

[Java11+JDK](https://www.oracle.com/java/technologies/downloads/). 

### Testing the Payload in a Node environment
To test the payload in a Node environment, do the following:

1. Download the KO (i.e., the repo with the folder CAMH/collection/99999-CAMH1-v1.0
2. Uncomment the final line (//module.exports = { process_request };) in the index.js file so its over-arching function can be used by the test.js file
3. Navigate to the folder with both the test.js and index.js files from the PHQ9 Score Interpreter KO
4. Run this command  > node test.js
5. Inspect the results of the tests and look for any failed tests. If all tests are passed then the index.js is working as intended.
6. Recomment the final line (//module.exports = { process_request };) in the index.js file

Note: If you skip the final step 6 the KO will NOT work properly when deployed using the KGrid Activator tool, a task that comes next!

### Understanding KGRID Activator Java Microservice
To make KOs useful, the Knowledge Grid team at the University of Michigan has developed a Java-based microservice tool for "activating" KOs called the
KGrid Activator ([KGrid Activator](https://github.com/kgrid/kgrid-activator/releases/tag/kgrid-activator-1.7.0)) 

The KGrid Activator performs a neat trick. It makes using compliant KOs to turn on RESTful webservices simple and easy to do! The KGrid Activator unpacks the content in KOs, notably the payload, deployment description and service description files, and uses the contents of those three files to stand up a RESTful webservice and give webservice users an endpoint to call for engaging KO payloads! 

When instantiated and running on any suitable computer or server with Java installed, the KGrid Activator acts as a RESTful webservice gateway that provides remote access to and invocation of the payload in any compliant KO. 

We way the KGrid Activator “activates” the computable biomedical knowledge stored in a KO by (a) loading the KOs digital files into a running instance of the KGrid Activator, (b) providing a means to execute the code in the payload, (c) making those means of execution available to external systems as a RESTful webservice, and (d) tracking the utilization of the webservice endpoints enabled through activation [1].

To get started using it, download the latest release of the KGrid Activator at the link above.

### Deploying the PHQ9 Score Interpreter KO to back its own webservice using the KGrid Activator
Here are the steps to follow to deploy the KO in this repo locally and engage its payload (index.js) as a webservice.

1. Be sure Java SDK 8 or higher is installed

2. If you have not already done so, clone or download this CAMH repo. Here's the command for cloning the repo:

```git clone \https://github.com/kgrid-objects/CAMH.git```

2. If you have not already done so, download the latest release of the KGrid Activator its release page (https://github.com/kgrid/kgrid-activator/releases).

3. Put the KGrid Activator's .jar file in the /collection folder holding your KOs (as in this repo)

4. To run the KGrid Activator and load the KOs in this repo, do this:

```
java -jar kgrid-activator-1.7.0.jar --spring.profiles.active=dev --kgrid.shelf.cdostore.url=filesystem:file:${PWD}
```

### Use the browser to check the activator running on your device
You can check that the Activator is running locally by going to http://localhost:8080 in a browser. You should see this description on your browser:
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

