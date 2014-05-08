
var data = [

  [ "DO MORE THAN WHAT'S EXPECTED",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_01",
    "1",
    "long"
  ],

  [ "TRY NEW THINGS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_02",
    "2",
    "medium"
  ],

  [ "TEACH OTHERS WHAT YOU KNOW",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_03",
    "3",
    "long"
  ],

  [ "MAKE WORK FUN",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_04",
    "4",
    "medium"
  ],

  [ "ALWAYS BE CREATING",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_05",
    "5",
    "medium"
  ],

  [ "MAKE YOUR OWN INSPIRATION",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_06",
    "6",
    "long"
  ],

  [ "AVOID THE OBVIOUS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_07",
    "7",
    "medium"
  ],

  [ "THE CLIENT IS PART OF THE TEAM",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_08",
    "8",
    "long"
  ],

  [ "ACCEPT CREATIVE CRITICISM",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_09",
    "9",
    "long"
  ],

  [ "TRUST YOUR TEAMMATES",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_10",
    "10",
    "long"
  ],

  [ "WE'RE ALL ROOKIES",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_11",
    "11",
    "medium"
  ],

  [ "COLLABORATE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_12",
    "12",
    "short"
  ],

  [ "ORGANIZE THE PROJECT",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_13",
    "13",
    "medium"
  ],

  [ "UNDERSTAND THE SCRIPT",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_14",
    "14",
    "medium"
  ],

  [ "DON'T CONFUSE WEIRD WITH CREATIVE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_15",
    "15",
    "long"
  ],

  [ "TRASH BAD CONCEPTS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_16",
    "16",
    "medium"
  ],

  [ "DON'T WASTE CHI",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_17",
    "17",
    "medium"
  ],

  [ "TAKE CHANCES",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_18",
    "18",
    "medium"
  ],

  [ "EMBRACE FOREIGN IDEAS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_19",
    "19",
    "long"
  ],

  [ "PRACTICE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_21",
    "21",
    "short"
  ],

  [ "DON'T FEAR FAILURE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_22",
    "22",
    "medium"
  ],

["",""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}