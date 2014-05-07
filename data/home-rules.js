
var data = [

  [ "DO MORE THAN WHAT'S EXPECTED",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_01",
    "1",
    false
  ],

  [ "TRY NEW THINGS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_02",
    "2",
    true
  ],

  [ "TEACH OTHERS WHAT YOU KNOW",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_03",
    "3",
    false
  ],

  [ "MAKE WORK FUN",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_04",
    "4",
    true
  ],

  [ "ALWAYS BE CREATING",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_05",
    "5",
    false
  ],

  [ "MAKE YOUR OWN INSPIRATION",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_06",
    "6",
    false
  ],

  [ "AVOID THE OBVIOUS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_07",
    "7",
    false
  ],

  [ "THE CLIENT IS PART OF THE TEAM",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_08",
    "8",
    false
  ],

  [ "ACCEPT CREATIVE CRITICISM",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_09",
    "9",
    false
  ],

  [ "TRUST YOUR TEAMMATES",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_10",
    "10",
    false
  ],

  [ "WE'RE ALL ROOKIES",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_11",
    "11",
    false
  ],

  [ "COLLABORATE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_12",
    "12",
    true
  ],

  [ "ORGANIZE THE PROJECT",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_13",
    "13",
    false
  ],

  [ "UNDERSTAND THE SCRIPT",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_14",
    "14",
    false
  ],

  [ "DON'T CONFUSE WEIRD WITH CREATIVE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_15",
    "15",
    false
  ],

  [ "TRASH BAD CONCEPTS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_16",
    "16",
    false
  ],

  [ "DON'T WASTE CHI",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_17",
    "17",
    false
  ],

  [ "TAKE CHANCES",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_18",
    "18",
    false
  ],

  [ "EMBRACE FOREIGN IDEAS",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_19",
    "19",
    false
  ],

  [ "PRACTICE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_21",
    "21",
    true
  ],

  [ "DON'T FEAR FAILURE",
    "HOW TO DO REALLY GREAT WORK",
    "RULE_22",
    "22",
    false
  ],

["",""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}