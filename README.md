# Sample KO with FNO function metadata 

Developed as part of the CAMH knowledge graph project

## Overview

A KO can be thought of as a collection of functions. Each function has inputs and outputs. Each function also has one or more implementations. Clients execute a function by sending inputs/parameters and receiving outputs/results

Initially, the KGrid used only functions with implementations intended to be exposed as a RESTful API. Each function was described by an OpenAPI doc (we called them endpoints) and mapped to an implementation in YAML for deployment in a particulat runtime environment (via deployment.yaml).

The Function Ontology (FNO) is capable of describing functions at a higher level and is particularly suited for knowledge engineering. The Provenance Ontology provides a similar capability when describing processes in which agents perform activities which transform entities. Both ontologies are useful in modeling the behavior and results of knowledge objects deployed in the Knowledge Grid or elsewhere.

This repo contains a sample KO with an FNO representation of its functions and results, and instructions for using it in one or more RDF/graph systems.

## Description of the KO jsonld document 

[This sample](collection/99999-fk4805c32z-v1.0/graph.jsonld) uses a [JSON-LD document](https://www.w3.org/TR/json-ld/) in [flattened form](https://www.w3.org/TR/json-ld/#flattened-document-form) (a top-level anonymous node containing an `@context` element and an `@graph` element whose value is an array of nodes.) We think it will work with an expanded or compacted forms but have not tested.

The `@context` element is something like this:

```json
{
  "@context": {
    "dc": "http://purl.org/dc/elements/1.1/",
    "fno": "https://w3id.org/function/ontology#",
    "koio": "http://kgrid.org/koio#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "sdo": "http://www.schema.org/",
    "prov": "http://www.w3.org/ns/prov#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#"
  },
  "@graph": [{...}, ...]
}

```
The  "@graph" elements defines the nodes in this sub-graph. It has this shape:

```json
{
  "@context": {...},
  "@graph": [
    { "@type":  "fno:Function", ...},
    { "@type":  "fno:Execution", ...},
    { "@type":  "fno:Output", ...},
    { "@type":  "fno:Implementation", ...},
    { "@type":  "fno:Mapping", ...}
  ]
}
```

## Deploying the KO graph

Adding the nodes represented by the JSON-LD document in this KO is somewhat platform dependent. Conult your platform documentation. Here's what worked for us in the following systems.

### Inserting the KO subgraph into Blue Brain Nexus

### Inserting the KO subgraph into Fedora Commons



### Inserting the KO subgraph into neo4j

## Adding sample data and querying
