# PHQ9 Algorithm Stages

This repository represents _PHQ9 Algorithm Stages Knowledge Object(KO)_. 

## Table of Contents

- Introduction

- Knowledge Object and its Composition
    - KO’s CBK Model - Knowledge Payload
        - Description of the payload files
    - KO’s Deployment description
    - KO’s Service Description
    - KO’s Metadata

- How to get the PHQ9 Algorithm Stages running in your local environment
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

PHQ9 Algorithm Stages Knowledge Object(KO) is defined as 99999-CAMH2-v1.0 in the collection repository on githib. Following is a description of PHQ9 Algorithm Stages Knowledge Object.

## PHQ9 Algorithm Stages Knowledge Object and its Composition

### KO’s CBK Model - Knowledge Payload

Knowledge Object payload is defined as a document compromised of one more knowledge content entities[1]. Following is a description of the payload files in the PHQ9 Algorithm Stages KO.

#### Description of the payload files
There are two payload files in written in JavaScript in the PHQ9 Algorithm Stages KO named PHQ9_algorithm.js file and test.js. 

PHQ9_algorithm.js file is a paload file that accepts a treatment algorithm stage, PHQ9 score, and report of adverse events and returns a recommendation from the overall treatment algorithm.

The PHQ9_algorithm.js file has multiple functions that does error checking of the input and provide interpretations of the input with recommendation for the next algorithm stage.

The test.js file contains multiple tests that are deployed to check the validity of error handling code in the PHQ9_algorithm.js file.

### KO’s Deployment description
The deployment description file contains the specificatopn of CBK model’s runtime requirements. The deployment description file in the KO is named deployment.yaml.

### KO’s Service Description
The service description file contains specification for an API for the CBK model. The  service description file in the KO is named service.yaml

### KO’s Metadata
The metadata file contains description of an array of knowledge object properties. The metadata filen the KO is named metadata.json.

## How to get the PHQ9 Algorithm Stages running in your local environment

### Prerequisites
There are testing and packaging features in this project that require code editor with Node.js.

### Understanding KGRID Activator Microserver Tool
Kgrid activator provides remote invocation of the KO. The activator “activate” computable knowledge by (a) loading KOs stored as a digital files, (b) providing means to execute the computable knowledge held in those files, (c) making those means of execution available to external systems via web services, and (d) tracking the utilization of those web services[1].

### Starting from CAMH source code
Check out the score object GitHub repo:

git clone \https://github.com/kgrid-objects/CAMH.git
cd collection

Then download the latest release of the KGrid Activator from the release page (https://github.com/kgrid/kgrid-activator/releases)

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
To see KO metadata run http://localhost:8080/endpoint/kos. The metadata for PHQ9 Algorithm Stages should look like this:
```
{
    "@id": "99999/CAMH2/v1.0",
    "@type":"koio:KnowledgeObject",
    "identifier": "ark:/99999/CAMH2/v1.0",
    "version":"v1.0",
    "title": "PHQ9 Algorithm Stages",
    "description":"PHQ9 Score Algorithm Stages Knowledge Object",
    "keywords":["PHQ9","Stages", "CAMH"],
    "hasServiceSpecification": "service.yaml",
    "hasDeploymentSpecification": "deployment.yaml",
    "hasPayload": "PHQ9_algorithm.js",
    "@context" : ["http://kgrid.org/koio/contexts/knowledgeobject.jsonld" ]
  }
```

### Explore the KO in the Swagger editor
To try out the KO in the Swagger Editor you need to point to the service description from the Swagger Editor at https://editor.swagger.io. The easiest way to is construct a Swagger Editor url pointing to the OpenAPI YAML file containing the service description:

https://editor.swagger.io/?url=http:/localhost:8080/kos/99999/CAMH1/v2.0/service.yaml

Follow the editor instructions to try out the CAMH interface. THe Swagger Editor prepopulates the request with the example from the KOs service description. You can change the input parameters to see the interpretations and recommendations for the provided PHQ9 Score.

## Input and Output
### Input Object
Sample input object for the PHQ9 Algorithm Stages has three parameters.
```
{"Patient_Current_Medication_Stage_Number": 1, "Patient_Current_PHQScore": 4, "Patient_Adverse_Events": "yes"}
```

### Output Object
To get the output, click _Post_ button in green on the swagger editor. Then click _Try it out_ on the right side of the page followed by clicking execute.
The output should look like this:
```
{
  Interpretation_And_Recommendations: {
    Current_PHQ9_Assessment: 'None or Minimal Symptoms',
    Current_Medication_Stage: 1,
    Next_Step: 'Continue on lower dose or Change treatment to other option in same algorithm stage or Proceed to next stage'
  }
}
```

You can change the input parameters values in the input box to see the interpretations and recommendations for different PHQ9 Scores.


## Common Issues/Problems
- Comment the module.exports = { process_request }; code from PHQ9_algorithm.js after running the test.js file.

## References
[1] Flynn, AJ, Friedman, CP, Boisvert, P, Landis-Lewis, Z, Lagoze, C. The Knowledge Object Reference Ontology (KORO): A formalism to support management and sharing of computable biomedical knowledge for learning health systems. Learn Health Sys. 2018; 2:e10054. https://doi.org/10.1002/lrh2.10054

