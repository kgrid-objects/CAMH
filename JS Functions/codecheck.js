// This is a simple codechecker function
// An case input array is checked against a general value set array

var case_ex = ['a','b2',3,"N06AB08","N06AX11"];

var values_ex = ['a','b2',8];

var value_name = "my Values"


function codecheck(caseData, valuesData, valuesName="")
{
  for (var cde in caseData)
  {
    for (var vde in valuesData)
      {
        if (caseData[cde]==valuesData[vde])
          {
            console.log("Found Case: ",caseData[cde]," matched Value: ",valuesData[vde]," in ",valuesName);
          }
      }
  }
}

/*
codecheck(case_ex, values_ex,value_name);
*/

// Anatomical Therapeutic Chemical (ATC) Chemical Substance Codes Used as Active Drug Ingredient Identifiers

var ValueSet1 = {
   ValueSetMetadata: {
     Name:"Other Antidepressants",
     ShortName:"",
     Codeset:"ATC",
     CategoryCode:"",
     Codetype:"Chemical substance",
     LastUpdated:"April 5, 2022",
     LastUpdatedBy:"Allen Flynn"
   },
   Values: {
     trazodone:"N06AX05",
     mirtazapine:"N06AX11"
   }
}

var ValueSet2 = {
   ValueSetMetadata: {
     Name:"Selective Serotonin Reuptake Inhibitors",
     ShortName:"SSRIs",
     Codeset:"ATC",
     Codetype:"Chemical substance",
     LastUpdated:"April 5, 2022",
     LastUpdatedBy:"Allen Flynn"
   },
   Values: {
     zimeldine:"N06AB02",
     fluoxetine:"N06AB03",
     citalopram:"N06AB04",
     paroxetine:"N06AB05",
     sertraline:"N06AB06",
     fluvoxamine:"N06AB08",
     escitalopram:"N06AB10"
   }
}

var ValueSet3 = {
   ValueSetMetadata: {
     Name:"Selective Serotonin and Norepinephrine Reuptake Inhibitors",
     ShortName:"SNRIs",
     Codeset:"ATC",
     Codetype:"Chemical substance",
     LastUpdated:"April 5, 2022",
     LastUpdatedBy:"Allen Flynn"
   },
   Values: {
     venlafaxine:"N06AX16",
     duloxetine:"N06AX21",
     levomilnacipran:"N06AX28",
     milnacipran:"N06AX17",
     desvenlafaxine:"N06AX23",
     sibutramine:"A08AA10"
   }
}

var ValueSet4 = {
   ValueSetMetadata: {
     Name:"Diazepines, oxazepines, thiazepines, and oxepines",
     ShortName:"",
     Codeset:"ATC",
     Codetype:"Chemical substance",
     LastUpdated:"April 5, 2022",
     LastUpdatedBy:"Allen Flynn"
   },
   Values: {
     loxapine:"N05AH01",
     clozapine:"N05AH02",
     olanzapine:"N05AH03",
     quetiapine:"N05AH04",
     asenapine:"N05AH05",
     clotiapine:"N05AH06"
   }
}

var ValueSet5 = {
   ValueSetMetadata: {
     Name:"Other antiepileptics",
     ShortName:"",
     Codeset:"ATC",
     Codetype:"Chemical substance",
     LastUpdated:"April 5, 2022",
     LastUpdatedBy:"Allen Flynn"
   },
   Values: {
     pregabalin:"N03AX16"
   }
}

var ValueSet6 = {
   ValueSetMetadata: {
     Name:"Benzodiazepine related drugs",
     ShortName:"",
     Codeset:"ATC",
     Codetype:"Chemical substance",
     LastUpdated:"April 5, 2022",
     LastUpdatedBy:"Allen Flynn"
   },
   Values: {
     zopiclone:"N05CF01",
     zolpidem:"N05CF02",
     zaleplon:"N05CF03",
     eszopiclone:"N05CF04"
   }
}


/*
for (const key in ValueSet3.Values)
{
  console.log(`${ValueSet3.Values[key]}`);
}


var array2A = [];

for (const key in ValueSet2.Values)
  {
   array2A.push(`${ValueSet2.Values[key]}`)
  };

console.log(array2A);

codecheck(case_ex, array2A,ValueSet2.ValueSetMetadata.Name);


var array2B = [];

for (const key in ValueSet2.Values)
  {
   array2B.push(`${key}`)
  };

console.log(array2B);

codecheck(case_ex, array2B,ValueSet2.ValueSetMetadata.Name);

*/

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

/*
console.log(getKeyByValue(ValueSet3.Values,"N06AX23"));
*/

function medcheck (caseDataArray, valueSetObject)
 {
   var codesArray = [];
   for (const key in valueSetObject.Values){codesArray.push(`${valueSetObject.Values[key]}`)};
   codecheck(caseDataArray, codesArray,valueSetObject.ValueSetMetadata.Name);
 }

 medcheck(case_ex,ValueSet1);
