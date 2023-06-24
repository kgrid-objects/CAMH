#!/bin/bash
# ############################
# author: Deepak Sharma
# email: m2dks@yahoo.com
# ############################
#
DIR=.
source $DIR/examples.sh

# Script to generate README.md
# Run this script to generate README.md programmatically
# Before you run this script, see comments in examples.sh
# create subdirectories with same name of the yaml file in the subdirectory
# Include a data tile (.ttl) and a ShEx shape file (.shex)
# This script will include that sub-directory in the table of example it renders in README.md file

FILE_NAME=README.md
SHEX_VALIDATOR=https://shex.io/webapps/packages/extension-map/doc/shexmap-simple?manifestURL=
SHEX_MANIFEST=https://fhircat.github.io/ShExValidation/2023JBISubmissionSupport/constraint_patterns_examples

echo "Generating New README.md ...."

echo "# ShEx-mainfests" > $FILE_NAME
echo "FHIR ShEx Schemas R5 Test for Structure and Constraint Patterns with Data" >> $FILE_NAME
echo " " >> $FILE_NAME
echo "| Example | Description |" >> $FILE_NAME
echo "| ------- | ----------- |" >> $FILE_NAME

for exmp in "${examples[@]}"
do
	IFS='#' read -r -a exmpstrs <<< "$exmp"
	COL1="| [${exmpstrs[0]}]($SHEX_VALIDATOR$SHEX_MANIFEST/${exmpstrs[0]}/${exmpstrs[0]}.yaml) "
	COL2="| ${exmpstrs[1]} |"
	echo  ${COL1}${COL2} >> $FILE_NAME
done

echo "- Note: This README.md is generated programmatically by the scripts:" >> $FILE_NAME
echo "   - gen_readme.sh" >> $FILE_NAME
echo "   - examples.sh" >> $FILE_NAME

echo "New README.md file generated!"

