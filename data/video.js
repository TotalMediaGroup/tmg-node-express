
var data = [

/*  

  { id: "opts-ideas-employee-strategy",
    title: "EMPLOYEE STRATEGY",
    image_menu: "IC_hectorlogo",
    image_background: "",
    image_poster: "",
    video: [ [360,720], ["",""] ],
    client: "",
    one_liner: "",
    primary_text: ["",""],
    production_roles: ["",""],
    secondary_text: ["",""],
    secondary_content: [
      { title:"", image:"", video:"" },
      { title:"", image:"", video:"" },
      { title:"", image:"", video:"" }
      ],
    secondary_box_color: "808080",
    secondary_layout: "standard"
  },

*/

  { id: "opts-ideas-employee-strategy",
    title: "EMPLOYEE STRATEGY",
    image_menu: "IC_simplicity",
    image_background: "DBG_employee6",
    image_poster: "PF_employee1",
    video: [ [360,720], ["Opts_EMPLOYEE_DIRCUT_1M_SD","Opts_EMPLOYEE_DIRCUT_1M_HD"] ],
    client: "OPTS IDEAS",
    one_liner: "INFORMATIONAL VIDEO",
    primary_text: ["The piece was intended to inspire the audience and create a sense of anticipation around new technology soon to be released.","We had been warned that the audience had become suspicious of broken promises, so we wanted to stay away from anything that resembled the typical corporate motivational piece.","We thought something unusual, and authentic would be a better approach. We wanted the audience to THINK.","The script speaks to the dreams of the investor / clients and how staff could better help them achieve those dreams. It was written as a sort of poem.","The graphics were designed to present and support the on-screen text with sublime - abstract forms."],
    production_roles: ["CREATIVE","SCRIPT","ART DIRECTION","ANIMATION","COMPOSITE"],
    secondary_text: ["The video was displayed on an extremely wide screen - 180’x18’ - basically shaped like a curved mail slot. Designing a graphical piece for such an unusual format was a challenge.","The obvious approach would be to split the screen into multiple 16x9 areas across the horizontal width. But we wanted to use the wide format as a massive canvas instead.","We thought the impact of the high contrast graphics operating across a180’ space would be pretty profound. Text on screen provides the common thread.","Circles were used as the main element in the overall show design so we adopted dots as our primary characters."],
    secondary_content: [
      { title:"", image:"IC_simplicity", video:"" },
      { title:"", image:"PF_employee1", video:"" },
      { title:"", image:"DBG_employee6", video:"" }
      ],
    secondary_box_color: "808080",
    secondary_layout: "standard"
  },



  { id: "abbott-always-with-you",
    title: "always with you",
    image_menu: "IC_hectorlogo",
    image_background: "demoPageBG_1",
    image_poster: "PF_abbot6",
    video: [ [360,720], ["Abbott_ALWAYS WITH YOU_DIRCUT 1_SD","Abbott_ALWAYS WITH YOU_DIRCUT 1_HD"] ],
    client: "abbott",
    one_liner: "in store brand video",
    primary_text: ["ABBOTT HAD BEEN EXPERIMENTING WITH THE USE OF A SAINT BERNARD IN ITS PRINT ADS.","THE DOG COMMUNICATES A SENSE OF RELIABILITY TO THE TARGET MARKET.","THE PHOTOGRAPHIC CHARACTER PROVED EFFECTIVE TO THE BRAND BUT FAILED TO FULLY LEVERAGE THE DOG’S CHARACTER.","WE THOUGHT BRINGING HIM TO LIFE IN CG WOULD BE A FUN WAY TO CREATE SORT OF “MASCOT” AND ON-SCREEN PERSONALITY.","WE CALL HIM HECTOR."],
    production_roles: ["CREATIVE","ART DIRECTION","3D ANIMATION"],
    secondary_text: ["HECTOR AND THE BUTTERFLY WERE ANIMATED TO INTERACT AND MOVE THROUGH SCENES CARRYING PRODUCT INFORMATION.","THE BUDGET WAS MODEST SO WE COULD ONLY GIVE HECTOR SO MUCH HECTOR.","WE’RE HOPING TO CREATE A STAR OUT OF HIM IN FUTURE PRODUCTIONS."],
    secondary_content: [
      { title:"", image:"", video:"" },
      { title:"", image:"", video:"" },
      { title:"", image:"", video:"" }
      ],
    secondary_box_color: "808080",
    secondary_layout: "standard"
  },


["",""]];

exports.load = function() {
  var rtrn = []; for (var i = 0; i < (data.length-1); i++) { rtrn[i] = data[i]; }
  return rtrn;
}