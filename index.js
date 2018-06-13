/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.  It's intended to be used at an MLH Localhost
 * Workshop.
 *
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/mlh/mlh-localhost-hacking-with-alexa
 * Also----> from ChoicesLambda of icecream skill we developed in class
 **/

'use strict';

var brands = ["Dell", "HP", "Apple", "Lenovo", "Microsoft", "Acer", "Asus"];

//columns in this array are lists of best brands for each category/concern
var concerns = [["money", "quality", "innovation"],    
                ["Lenovo", "Dell", "Dell"],
                ["Dell", "Lenovo", "HP"],
                ["HP", "Microsoft", "Lenovo"],
                ["Acer", "HP", "Apple"],
                ["Asus", "Apple", "Acer"]
                ];

/* array of best laptops in each category/concern in the order of
the brand rankings in the concerns array*/
var laptops = [["money", "quality", "innovation"],  
                ["Lenovo Yogabook", "Dell XPS 13 or 15 or the Inspiron 7000", "Dell XPS 13"],
                ["Dell Inspiron 7000", "Lenovo Yoga 920 2-in-1", "HP Envy x2 or Spectre x360 2-in-1"],
                ["HP x360 Convertible or Probook 450", "Microsoft Surface book 2 or Surface Pro 3", "Lenovo Yoga 920 or Miix 630"],
                ["Acer Aspire E 15 or S 13", "HP Spectre x360 2-in-1", "Apple Macbook Pro"],
                ["Asus F556UA-AB32", "Apple Macbook Pro", "Acer Chromebook R 11 Convertible"]
                ];
             
/* array of information on laptops in each category/concern in the order of
the brand rankings in the concerns array*/
var information = [["money", "quality", "innovation"],   
                ["It is thin, light, and good for those who want quality, but are on a budget.", "It is a touchscreen laptop with great 4K display and quality. It comes in a 15 inch version and the Inspiron series has a variety of options with great quality as well.", "It is a touchscreen laptop with great 4K display and quality."],
                ["It is a 2-in-1 touch screen laptop with performance that is comparable to more expensive laptops while remaining a price below $1000", "It is a 2-in-1 laptop with great performance, over 12 hours of battery life, and has a thin size", "The Envy x2 is a thin, quiet latop with no fan and has a 2-in-1 feature that gives versatility to the user. The Spectre 360 is a high-performing, 2-in-1 laptop with a thin size and face-recognition technology."],
                ["The x360 Convertible is a 2-in-1 laptop under $500 with great performance and small size. As a more standard laptop option, the Probook 450 is affordable and has good performance as well.", "The Surface Book 2 has a stylus, long battery life, and great display.", "Although more affordable, the Lenovo Yogabook is travel-friendly and good quality. The Lenovo Miix 630 has an impressive battery life and convenience in size"],
                ["The Aspire E 15 has great display, battery life, and sound. The S 13 has strong performance, display, and battery life", "It is a high-performing, 2-in-1 laptop with a thin size and attractive design.", "The Macbook Pro has great design and performs quickly. The Touch Bar is a unique feature and provides a convenient experience."],
                ["The Asus F556UA-AB32 is known for great value for its price and its spacious hard drive.", "The Macbook Pro has great design and performs quickly. It is thin and the keyboard and touchpad have excellent details.", "It has a 360 degree hinge that allows it to be physically versatile. It's also budget-friendly, light weight, and is touch screen."]
                ];
             
/* these vars will be usefull later when the code has to figure out
which laptops to make recommendations of. they TRACK which concern
the user has, hence the variable names */
var moneyTrack = 0;
var qualTrack = 0;
var innovTrack = 0;
var requestRow =0;
var requestCol=0;
    
var handlers = {
  'LaunchRequest': function () { this.emit(':tell', "No intent by that name."); },
   
  'concernIntent': function () { this.response.speak("Hi, what are you concerned with most when purchasing a laptop?")
                                            .listen("What is your top concern?");
                               this.emit(':responseReady'); },
                               
                               
    // lets user hear the brands in a category repeated and prompts them with the question again//
    'brandOptions': function () { 
        let brand1 = "";
         
        if (moneyTrack == 1) {
            for (let i =1;i<concerns.length;i++) {
             brand1+= concerns[i][0] + " ";
         }
        }
        else if (qualTrack == 1) {
            for (let i =1;i<concerns.length;i++) {
             brand1+= concerns[i][1] + " ";
         }
        }
        else if (innovTrack == 1){
            for (let i =1;i<concerns.length;i++) {
             brand1+= concerns[i][3] + " ";
         }
        }
         this.response.speak("Your brand options are " + brand1 +" Which would you like to choose?")
            .listen("Which brand?");
         this.emit(':responseReady'); 
    },
    
    // lets user hear the concerns repeated and prompts them with the question again//
    'concernOptions': function () {
        let allConcerns = "";
         for (let i =0;i<concerns[0].length;i++) {
             allConcerns+= concerns[0][i] + " ";
         }
        this.response.speak("Your options are " + allConcerns + " Which is your biggest concern?")
            .listen("What is your top concern?");
         this.emit(':responseReady');
    },
    
/* These are the concern intents that allow Alexa to begin guiding the user down the right path
   for a good laptop recommendation */
    'moneyIntent': function ()
    { 
        moneyTrack = 1;
        let moneyConcern = "";
         for (let i =1;i<concerns.length;i++) {
             moneyConcern+= concerns[i][0] + " ";
         }
        this.response.speak("The best brands for affordability are " + moneyConcern + " Which would you like to choose?")
            .listen("Which would you like to choose?");
         this.emit(':responseReady');
    },
    
    'qualityIntent': function ()
    { 
        qualTrack = 1;
        let qualityConcern = "";
         for (let i =1;i<concerns.length;i++) {
             qualityConcern+= concerns[i][1] + " ";
         }
        this.response.speak("The top brands for quality are " + qualityConcern + " Which would you like to choose?")
            .listen("Which would you like to choose?");
         this.emit(':responseReady');
    },
    
     'innovationIntent': function ()
    { 
        innovTrack = 1;
        let innovationConcern = "";
         for (let i =1;i<concerns.length;i++) {
             innovationConcern+= concerns[i][2] + " ";
         }
        this.response.speak("The top brands for innovation are " + innovationConcern + " Which would you like to choose?")
            .listen("Which would you like to choose?");
         this.emit(':responseReady');
    },


/* brand intents start here and are in alphabetical order.'recommendation" is a variable that is built throughout the for loop
for it to eventually be sent to the user to give them a list of laptop recommmendations
the if and else ifs make it clear that a concern was chosen and that the skill is going right
requestRow and requestCol record information so the user can ask for more info on the laptop they got a recommendation of.
*/
    'AcerIntent': function ()
    {
        let recommendation = "";
         
        if (moneyTrack == 1) {
            recommendation+= laptops[4][0] + " ";
            requestRow =4;
            requestCol=0;
        }
        else if (innovTrack == 1){
            recommendation+= laptops[5][2] + " ";
            requestRow =5;
            requestCol=2;
        }
        moneyTrack = 0;
        innovTrack = 0;
        this.response.speak("Acer is known to have affordable options for laptops with good quality."
                            + " Based on your concern, you may want to try the " + recommendation) 
            .listen("What is your favorite type of laptop?");
                        this.emit(':responseReady'); 
    },
    
    'AppleIntent': function () { 
        
        let recommendation = "";
        
        if (qualTrack == 1) {
            recommendation+= laptops[5][1] + " ";
            requestRow =5;
            requestCol=1;
        }
        else if (innovTrack == 1){
            recommendation+= laptops[4][2] + " ";
            requestRow =4;
            requestCol=2;
        }
        qualTrack = 0;
        innovTrack = 0;
        this.response.speak(" Apple is known for unique laptops and accessories with good performance. "
                            +"Based on your concern, you may want to try the " + recommendation)
            this.emit(':responseReady');  
    },
    
     'AsusIntent': function ()
    {
        let recommendation = "";
         
        if (moneyTrack == 1) {
            recommendation+= laptops[5][0] + " ";
            requestRow =5;
            requestCol=0;
        }
        moneyTrack = 0;
        this.response.speak("Asus is known to have excellent, affordable choices for laptops."
                            + "Based on your concern, you may want to try the " + recommendation) 
            .listen("What is your favorite type of laptop?");
                        this.emit(':responseReady'); 
    },
    
    'DellIntent': function ()
    {
        let recommendation = "";
         
        if (moneyTrack == 1) {
            recommendation+= laptops[2][0] + " ";
            requestRow =2;
            requestCol=0;
        }
        else if (qualTrack == 1) {
            recommendation+= laptops[1][1] + " ";
            requestRow =1;
            requestCol=1;
        }
        else if (innovTrack == 1){
            recommendation+= laptops[1][2] + " ";
            requestRow =1;
            requestCol=2;
        }
        moneyTrack = 0;
        qualTrack = 0;
        innovTrack = 0;
        this.response.speak("Dell is known to be innovative and have a great variety of laptops to choose"
                            + " from. Based on your concern, you may want to try the " + recommendation) 
            .listen("What is your favorite type of laptop?");
                        this.emit(':responseReady'); 
    },
                                
    'HPIntent': function () 
    { 
        let recommendation = "";
         
        if (moneyTrack == 1) {
            recommendation+= laptops[3][0] + " ";
            requestRow =3;
            requestCol=0;
        }
        else if (qualTrack == 1) {
            recommendation+= laptops[4][1] + " ";
            requestRow =4;
            requestCol=1;
        }
        else if (innovTrack == 1){
            recommendation+= laptops[2][2] + " ";
            requestRow =2;
            requestCol=2;
        }
        moneyTrack = 0;
        qualTrack = 0;
        innovTrack = 0;
        this.response.speak("HP is known for great design and a variety that ensures there is a laptop for every need"
                            +" Based on your concern, you may want to try the " + recommendation)
            this.emit(':responseReady'); 
        
    },
                                 
    'LenovoIntent': function () { 
        
        let recommendation = "";
         
        if (moneyTrack == 1) {
            recommendation+= laptops[1][0] + " ";
            requestRow =1;
            requestCol=0;
        }
        else if (qualTrack == 1) {
            recommendation+= laptops[2][1] + " ";
            requestRow =2;
            requestCol=1;
        }
        else if (innovTrack == 1){
            recommendation+= laptops[3][2] + " ";
            requestRow =3;
            requestCol=2;
        }
        moneyTrack = 0;
        qualTrack = 0;
        innovTrack = 0;
        this.response.speak(" Lenovo is known for their variety of great quality yet affordable laptops."
                            +" Based on your concern, you may want to try the " + recommendation)
            this.emit(':responseReady');  
    }, 
                                 
    'MicrosoftIntent': function () { 
        let recommendation = "";
    
        if (qualTrack == 1) {
            recommendation+= laptops[3][1] + " ";
            requestRow=3;
            requestCol=1;
        }
        qualTrack = 0;
        this.response.speak(" Microsoft has a variety of great quality products. "
                            +"Based on your concern, you may want to try the " + recommendation)
            this.emit(':responseReady'); 
    },                             
                                 
    'otherBrandIntent': function () {
        let brand1 = this.event.request.intent.slots.brand.value;      // folder--all these things used to get to a thing
        this.response.speak("I am not familiar with " + brand1);
        this.emit(':responseReady');
    },
    
    /* when users request more information on a laptop recommendation, this intent is used. It returns information
    from the information array */
     'moreInfoIntent': function ()
    {
        let moreInfo = "";
        
        moreInfo += information[requestRow][requestCol];
        
        this.response.speak(moreInfo) 
            .listen("more info?");
                        this.emit(':responseReady'); 
    },

    };

 /* checks to see if user's brand is a brand option
    function brandCheck(brand) {
    for (let i=0;i<brands.length;i++) {
        if(brand == brands[i]) {
            return "I like " + brand + " too.";
        }
    }
    return "I am not familiar with that brand.";
} */

// checks to see if user's concern is a concern option
function concernCheck(concern) {
    for (let i=0;i<concerns.length;i++)
    {
        if(concern == concerns[i]) {
            return concern + " is a concern for me too.";
        }
    }
    return "I am not familiar with that concern.";
}

// This is the function that AWS Lambda calls every time Alexa uses your skill.
exports.handler = function(event, context, callback) {
  // Include the AWS Alexa Library.
  const Alexa = require("alexa-sdk");

  // Create an instance of the Alexa library and pass it the requested command.
  var alexa = Alexa.handler(event, context);

  // Give our Alexa instance instructions for handling commands and execute the request.
  alexa.registerHandlers(handlers);
  alexa.execute();
};
