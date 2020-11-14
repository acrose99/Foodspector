let $$app_token = import('config');

let label = document.getElementById("l1");
let input;
let searchChosen = "name"; //default search
// form.onsubmit =


function searchType(buttonType) {
    // console.log("Search Type Clicked");
    let buttonName = buttonType.name;
    // console.log(buttonName);
    // console.log(typeof buttonName);
    if (buttonName === "jsonLoader") {
        loadJson();
    }
    else if(buttonName === "nameFilter") {
        searchChosen = "name";
    }

    else if(buttonName === "riskFilter") {
        searchChosen = "risk";
    }
    else if(buttonName === "zipFilter") {
        searchChosen = "zip";
    }

    else if(buttonName === "addressFilter") {
        searchChosen = "address";
    }


    alert("You are searching/filter by " + searchChosen);
}

function submitFunc() {
    // console.log(searchChosen);
    input = label.children[0].value;
    console.log("Restaurant: " + input);
    // sessionStorage.setItem("search_query", input)
    if (searchChosen === "name") {
        filterByName(input);
    }
    else if (searchChosen === "risk") {
        filterByRisk(input);
    }
    else if (searchChosen === "zip") {
        filterByZip(input);
    }
    else if (searchChosen === "address") {
        filterByAddress(input);
    }
    else {
       alert("Error, invalid input! This is probably FoodSpector's fault!");
    }
}

function loadJson() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5000,
            $$app_token: $$app_token,
        },
    }).done(function (data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        for (let i = 0; i < 100; i++) {
            console.log(
                data[i]["dba_name"] +
                " was inspected on " +
                data[i]["inspection_date"] +
                " and the result was" +
                data[i]["results"] +
                ". The unique id was " +
                data[i]["inspection_id"] +
                "\nand the inspection type was " +
                data[i]["inspection_type"]
                // "and the violations were" +
                // data[i]["violations"]
            );
            // console.log(data[i]["inspection_id"]);
            // console.log(data[i]["inspection_date"]);
            // console.log(data[i]["results"]);
        }
    });
}

function filterByName(nameInputted) {
    let name;
    /* Converts the correct input into the string, if we dont click submit */
    if (typeof nameInputted != "string") {
        name = form.t1.value;
        name = name.toUpperCase();
        name = name.trimEnd();
    } else {
        name = nameInputted.toUpperCase()
    }
    sessionStorage.setItem("search_query", name)
    console.log("Restaurant: " + name);

    /* All you need to do for a user inputted name is to convert the restaurant name into uppercase /*

     */



    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: $$app_token,
            $where: "dba_name like '%" + name + "'"
        },
    }).done(function (data) {
        // alert("Retrieved " + data.length + " records from the dataset!");
        // document.location.href = "./list.html";
        let searchQ = sessionStorage.getItem("search_query");
        console.log("search_query: " + searchQ);
        console.log(data[0]);
        let length = data.length;
        if (length === 1) {
            appendResult(data[0]);
        }
        else { // Alex's code, although you can easily use my jQuery code too, and it will look cooler IMO.
            // alert("You can also load each resturant's data on it's own, using Alex R's code, check the code comments (Line 132 of main.js) for the syntax!");
            document.getElementById("results").innerHTML="<h2> Results for '" + searchQ + "':</h2>";
            for (let i = 0; i < data.length; i++) {
                // appendResultList(data[i]);
                appendResult(data[i]);
                        //USE ^^^^^ FOR ALEX R's CODE
            }
        }
        // document.location.href = "./list.html";
    });
}

function filterByRisk(riskInputted) {
    let risk;
    /* Converts the correct input into the string, if we dont click submit */
    if (typeof riskInputted != "string") {
        risk = form.t1.value;
        risk = risk.toUpperCase();
    } else {
        risk = riskInputted.toUpperCase();
    }

    /* A risk can consist of three different values
      1. risk: "Risk 1 (High)"
      2. risk: "Risk 2 (Medium)"
      3. risk: "Risk 3 (Low)"
      Thus, we need to convert whatever the user inputs into one of these values.
   */
    const highRisk = "1 (HIGH)"
    const mediumRisk = "2 (MEDIUM)"
    const lowRisk = "3 (LOW)"

    if (highRisk.includes(risk)) {
        risk = "Risk 1 (High)"
    } else if (mediumRisk.includes(risk)) {
        risk = "Risk 2 (Medium)"
    } else if (lowRisk.includes(risk)) {
        risk = "Risk 3 (Low)"
    }
    // const risk = nameInputted.toUpperCase()
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: $$app_token,
            risk: risk,
        },
    }).done(function (data) {



        // alert("Retrieved " + data.length + " records from the dataset!");
        // document.location.href = "./list.html";
        let searchQ = sessionStorage.getItem("search_query");
        console.log("search_query: " + searchQ);
        console.log(data[0]);
        let length = data.length;
        if (length === 1) {
            appendResult(data[0]);
        }
        else { // Alex's code, although you can easily use my jQuery code too, and it will look cooler IMO.
            // alert("You can also load each resturant's data on it's own, using Alex R's code, check the code comments (Line 194 of main.js) for the syntax!");
            document.getElementById("results").innerHTML="<h2> Results for '" + searchQ + "':</h2>";
            for (let i = 0; i < data.length; i++) {
                // appendResultList(data[i]);
                appendResult(data[i]);
                //USE ^^^^^ FOR ALEX R's CODE
            }
        }
        // document.location.href = "./list.html";
    });
}


function filterByZip(zipInputted) {
    /* All you need to do for this is convert the address to upper case,
      // test int = 60655
   */
    let zip;
    /* Converts the correct input into the string, if we dont click submit */
    if (typeof zipInputted != "string") {
        zip = form.t1.value;
        zip = zip.toUpperCase();
    } else {
        zip = zipInputted.toUpperCase();
    }

    zip = zip.trimEnd(); // For user error
    console.log(zip);

    try {
        $.ajax({
            url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
            type: "GET",
            data: {
                $limit: 5,
                $$app_token: $$app_token,
                zip: zip,
            },
        }).done(function (data) {
            // alert("Retrieved " + data.length + " records from the dataset!");
            // document.location.href = "./list.html";
            let searchQ = sessionStorage.getItem("search_query");
            console.log("search_query: " + searchQ);
            console.log(data[0]);
            let length = data.length;
            if (length === 1) {
                appendResult(data[0]);
            }
            else { // Alex's code, although you can easily use my jQuery code too, and it will look cooler IMO.
                // alert("You can also load each resturant's data on it's own, using Alex R's code, check the code comments (Line 242 of main.js) for the syntax!");
                document.getElementById("results").innerHTML="<h2> Results for '" + searchQ + "':</h2>";
                for (let i = 0; i < data.length; i++) {
                    // appendResultList(data[i]);
                    appendResult(data[i]);
                    //USE ^^^^^ FOR ALEX R's CODE
                }
            }
            // document.location.href = "./list.html";
        });
    }
    catch (e) {
        alert("Invalid Input!");
    }
}


function filterByAddress(addressInputted) {
    /* All you need to do for this is convert the address to upper case and a space to the end, for socratas weird crap
        test string = "4635 W 63RD ST"
     */

    let address;
    /* Converts the correct input into the string, if we dont click submit */
    if (typeof addressInputted != "string") {
        address = form.t1.value;
        address = address.toUpperCase();
        address = address.trimEnd();
        address = address + ' ';
    } else {
        address = addressInputted.toUpperCase();
    }


    address = address.trimEnd(); // For user error
    address = address.toUpperCase() + ' ';
    console.log(address);
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: $$app_token,
            address: address, //you need to add a extra space.
        },
    }).done(function (data) {
        // alert("Retrieved " + data.length + " records from the dataset!");
        // document.location.href = "./list.html";
        let searchQ = sessionStorage.getItem("search_query");
        console.log("search_query: " + searchQ);
        console.log(data[0]);
        let length = data.length;
        if (length === 1) {
            appendResult(data[0]);
        }
        else { // Alex's code, although you can easily use my jQuery code too, and it will look cooler IMO.
            // alert("You can also load each resturant's data on it's own, using Alex R's code, check the code comments (Line 295 of main.js) for the syntax!");
            document.getElementById("results").innerHTML="<h2> Results for '" + searchQ + "':</h2>";
            for (let i = 0; i < data.length; i++) {
                // appendResultList(data[i]);
                appendResult(data[i]);
                //USE ^^^^^ FOR ALEX R's CODE
            }
        }
        // document.location.href = "./list.html";
    });
}



function appendResultList(data) {
    var div1 = document.createElement("div");
    div1.className = "list-element";

    var left = document.createElement("div");
    left.className = "left";

    left.innerHTML = "<p>" + data["dba_name"] + "</p>";

    var middle = document.createElement("div");
    middle.className = "middle";
    middle.innerHTML = "<p>" + data["results"] + "</p>";

    div1.appendChild(left);
    div1.appendChild(middle);
    $("#results").append(div1);
    console.log(
        data["dba_name"] +
        " was inspected on " +
        data["inspection_date"] +
        " and the result was" +
        data["results"] +
        " . The unique id was " +
        data["inspection_id"]);
}
function appendResult(data) {
    let date = new Date(data["inspection_date"]);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    let humanReadableDate = year+'-' + month + '-'+dt;
    /* MAIN RESULTS PURE HTML
        <div id="resultsMain">
            <h1> <img src="assets/flat-color-icons_inspectionFail.svg" id="PassVector"/> La Unica <span id="passedOrFail">passed</span> the Inspection</h1>
            <img id="mapIMG" src="assets/LaUnicaMap.png" alt="">
            <h4 id="resultsExplanation">La Unica passed their inspection on 8/15/20. </h4>
        </div>
     */

    let resultMain = document.createElement("div");
    resultMain.id = "resultsMain";


    let resultMainCaption = document.createElement("h1");
    resultMainCaption.id = "resultMainCaption";
    // let resultMainCaptionSpan = document.createElement("span");
    // resultMainCaptionSpan.style.color = 'green';
    // resultMainCaptionSpan.innerText = data[i]["results"];
    let resultMainCaptionStyling;
    let resultMainCaptionSVG;

    if (data["results"].includes("Pass") === true || data["results"].includes("pass") === true ) {
        resultMainCaptionStyling = "color: green;";
        resultMainCaptionSVG = "assets/flat-color-icons_inspection.svg";
    }
    else {
        resultMainCaptionStyling = "color: red;";
        resultMainCaptionSVG = "assets/flat-color-icons_inspectionFail.svg";
    }



    resultMainCaption.innerHTML = "<h1> <img src='" + resultMainCaptionSVG + "' id='PassVector'/>"+ data["dba_name"] + " Results: " + "<span style='" +resultMainCaptionStyling + "'>" + data["results"] + "</span></h1>" ;


    let longitude = data["longitude"];
    console.log(data["dba_name"] + " longitude: "+ longitude);

    let latitude = data["latitude"];
    console.log(data["dba_name"] + " latitude: "+ latitude);

    let resultMainMap = document.createElement("div");
    resultMainMap.className = "map";
    var resultMainMapID = "map_" + data["dba_name"];
    resultMainMap.id = resultMainMapID

    let resultMainMapScript = document.createElement("script");
    resultMainMapScript.type = "text/javascript";
    // var map = new ol.Map({
    //     target: 'map',
    //     layers: [
    //         new ol.layer.Image({
    //             source: new ol.source.OSM()
    //         })
    //     ],
    //     view: new ol.View({
    //         center: ol.proj.fromLonLat([latitude, longitude], 'EPSG:4326', 'EPSG:3857'),
    //         zoom: 4
    //     })
    // });


    resultMainMapScript.innerText = "var map = new ol.Map({target: '"+ resultMainMapID + "', layers: [new ol.layer.Tile({source: new ol.source.OSM()})], view: new ol.View({center: ol.proj.fromLonLat([" + longitude + "," + latitude + "]), zoom: 14})});"

    console.log(resultMainMapScript.innerText);

    // console.log(map);


    // let resultMainImg = document.createElement("img");
    // resultMainImg.id ="mapIMG";


    // check to see if this works resultMainImg.src = "assets/LaUnicaMap.png";

    //change this later using Google Maps.

    // resultMainImg.src = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic2.cbrimages.com%2Fwordpress%2Fwp-content%2Fuploads%2F2019%2F09%2FGarfieldheader.jpg&f=1&nofb=1';

    let resultMainBody = document.createElement("h4");
    resultMainBody.id ="resultsExplanation";
    // resultMainBody.innerText = data["dba_name"] + " Results :" + data["results"] + " Their inspection on " + humanReadableDate + ".";



    resultMain.appendChild(resultMainCaption);
    resultMain.appendChild(resultMainMap);
    resultMain.appendChild(resultMainMapScript);
    // if (document.getElementById(resultMainMapID).children.length <= 0){
    //     let resultMainMapError = document.createElement("h1");
    //     resultMainMapError.innerText = "Error 123";
    //     resultMain.appendChild(resultMainMapError);
    // }

    // resultMain.appendChild(resultMainBody);

    /*
                <div class="resultsContainer">

                ......

                </div>

                <div class="resultsContainer1">

                ......

                </div>
     */

    var resultsContainer1 = document.createElement("div");
    resultsContainer1.className = "resultsContainer";

    var resultsContainer2 = document.createElement("div");
    resultsContainer2.className = "resultsContainer";


    /* INSPECTION TYPE PURE HTML
    <div id="inspectionDate" class="resultsMargin resultContainer">
            <div class="iconResults">
                <span class="iconify" data-inline="false" data-icon="mdi:calendar-range" style="font-size: 64px;"></span>
            </div>
            <div class="bodyResults">
                <h3 class="bodySubtitle">Inspection Type</h3>
                <h3 class="bodySecondaryText">What kind of inspection was this?</h3>
            </div>
            <div class="captionResults">
                <p class="captionResultText">Short Form Complaint</p>
            </div>
        </div>
     */

    const inspectionTypeContainer = document.createElement("div");
    inspectionTypeContainer.className = "resultContainer";

    const inspectionTypeIconContainer = document.createElement("div");
    inspectionTypeIconContainer.className = "iconResults";
    inspectionTypeIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='mdi:form-select' style='color: #323A45; font-size: 64px;'></span>"

    let inspection_type = data["inspection_type"];

    let inspectionTypeText;

    if (inspection_type === ("Canvass Re-Inspection")) {
        inspectionTypeText = "This inspection was re-inspected as part of a Canvass";
    }
    else if (inspection_type === ("Canvass")) {
        inspectionTypeText = "This inspection was part of a Canvass";
    }
    else if (inspection_type.includes("Re-Inspection") === true) {
        inspectionTypeText = "This inspection was a Re-Inspection"
    }
    else if (inspection_type === "License") {
        inspectionTypeText = "This inspection was for a License approval"
    }
    else if (inspection_type === "License Re-Inspection") {
        inspectionTypeText = "This inspection was for a License re-approval"
    }
    else if (inspection_type.includes("Complaint") === true) { //ignoring the diffrent types of complaints to avoid confusing user.
        inspectionTypeText = "This inspection happened due to a complaint"
    }


    const inspectionTypeBodyResult = document.createElement("div");
    inspectionTypeBodyResult.className = "bodyResultsNeutral";
    let inspectionTypeBody = document.createElement("h3");
    inspectionTypeBody.className ="bodySubtitleNeutral";
    inspectionTypeBody.innerText = "Inspection Type";
    let inspectionTypeSecondaryText = document.createElement("h3");
    inspectionTypeSecondaryText.className = "bodySecondaryTextNeutral";
    inspectionTypeSecondaryText.innerText = inspectionTypeText;

    inspectionTypeBodyResult.append(inspectionTypeBody,inspectionTypeSecondaryText);


    const inspectionTypeCaptionResults = document.createElement("div");
    inspectionTypeCaptionResults.className = "captionResultsNeutral";
    let inspectionTypeCaptionResultText = document.createElement("p");
    inspectionTypeCaptionResultText.className = "captionResultText";
    inspectionTypeCaptionResultText.innerText = data["inspection_type"];

    inspectionTypeCaptionResults.appendChild(inspectionTypeCaptionResultText);


    inspectionTypeContainer.append(inspectionTypeIconContainer,inspectionTypeBodyResult, inspectionTypeCaptionResults);


    resultsContainer1.appendChild(inspectionTypeContainer);

    /* INSPECTION DATE PURE HTML
         <div id="inspectionType" class="resultsMargin resultContainer">
            <div class="iconResults">
                <span class="iconify" data-inline="false" data-icon="mdi:form-select" style="font-size: 64px;"></span>
            </div>
            <div class="bodyResults">
                <h3 class="bodySubtitle">Inspection Date</h3>
                <h3 class="bodySecondaryText">The latest date this restaurant was inspected</h3>
            </div>
            <div class="captionResults">
                <p class="captionResultText">8/15/20</p>
            </div>
        </div>
     */


    const inspectionDateContainer = document.createElement("div");
    inspectionDateContainer.className = "resultContainer";

    const inspectionDateIconContainer = document.createElement("div");
    inspectionDateIconContainer.className = "iconResults";
    inspectionDateIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='mdi:calendar-range' style='color: #323A45; font-size: 64px;'></span>"


    const inspectionDateBodyResult = document.createElement("div");
    inspectionDateBodyResult.className = "bodyResultsNeutral";
    let inspectionDateBody = document.createElement("h3");
    inspectionDateBody.className ="bodySubtitleNeutral";
    inspectionDateBody.innerText = "Inspection Date";
    let inspectionDateSecondaryText = document.createElement("h3");
    inspectionDateSecondaryText.className = "bodySecondaryTextNeutral";
    inspectionDateSecondaryText.innerText = "This restaurant was last inspected on " + humanReadableDate;

    inspectionDateBodyResult.append(inspectionDateBody,inspectionDateSecondaryText);


    const inspectionDateCaptionResults = document.createElement("div");
    inspectionDateCaptionResults.className = "captionResults";
    let inspectionDateCaptionResultText = document.createElement("p");
    inspectionDateCaptionResultText.className = "captionResultText";


    inspectionDateCaptionResultText.innerText = humanReadableDate;

    inspectionDateCaptionResults.appendChild(inspectionDateCaptionResultText);


    inspectionDateContainer.append(inspectionDateIconContainer,inspectionDateBodyResult, inspectionDateCaptionResults);


    resultsContainer1.appendChild(inspectionDateContainer);


    /* RISK PURE HTML
        <div id="Risk" class="resultsMargin resultContainer">
            <div class="iconResults">
                <span class="iconify" data-inline="false" data-icon="ri:alarm-warning-fill" style="font-size: 64px;"></span>
            </div>
            <div class="bodyResults">
                <h3 class="bodySubtitle">Risk</h3>
                <h3 class="bodySecondaryText">This location has a medium risk of failure</h3>
            </div>
            <div class="captionResults">
                <p class="captionResultText">2</p>
            </div>
        </div>
     */


    const inspectionRiskContainer = document.createElement("div");
    inspectionRiskContainer.className = "resultContainer";


    const inspectionRiskResult = document.createElement("div");
    inspectionRiskResult.className = "bodyResults";
    let inspectionRiskBody = document.createElement("h3");
    inspectionRiskBody.className ="bodySubtitle";
    inspectionRiskBody.innerText = "Risk";
    let inspectionRiskSecondaryText = document.createElement("h3");
    inspectionRiskSecondaryText.className = "bodySecondaryText";

    let risk = data["risk"];
    let riskDescription;
    let riskValue;

    if (risk.includes("1") === true) {
        riskDescription = "The risk of this location is High"
        riskValue = 1;
    }
    else if (risk.includes("2") === true) {
        riskDescription = "The risk of this location is Medium"
        riskValue = 2;
    }
    else if (risk.includes("3") === true) {
        riskDescription = "The risk of this location is Low"
        riskValue = 3;
    }

    const inspectionRiskIconContainer = document.createElement("div");
    inspectionRiskIconContainer.className = "iconResults";

    if(riskValue === 3) {
        inspectionRiskIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='ri:alarm-warning-fill' style='color: #2e8540; font-size: 64px;'></span>"
    }
    else if(riskValue === 2) {
        inspectionRiskIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='ri:alarm-warning-fill' style='color: #F18200; font-size: 64px;'></span>"

    }
    else if(riskValue === 1) {
        inspectionRiskIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='ri:alarm-warning-fill' style='color: red; font-size: 64px;'></span>"

    }


    inspectionRiskSecondaryText.innerText = riskDescription;

    inspectionRiskResult.append(inspectionRiskBody,inspectionRiskSecondaryText);

    const inspectionRiskResults = document.createElement("div");
    inspectionRiskResults.className = "captionResults";
    let inspectionRiskCaptionResultText = document.createElement("p");
    inspectionRiskCaptionResultText.className = "captionResultText";
    inspectionRiskCaptionResultText.innerText = riskValue;

    inspectionRiskResults.appendChild(inspectionRiskCaptionResultText);


    inspectionRiskContainer.append(inspectionRiskIconContainer,inspectionRiskResult, inspectionRiskResults);


    resultsContainer2.appendChild(inspectionRiskContainer);

    /*  VIOLATIONS PURE HTML
         <div id="Violations" class="resultsMargin resultContainer">
            <div class="iconResults">
                <span class="iconify" data-inline="false" data-icon="mdi:alert-octagram" style="font-size: 64px;"></span>

            </div>
            <div class="bodyResults">
                <h3 class="bodySubtitle">Previous Violations</h3>
                <h3 class="bodySecondaryText">Click to see what violations this location has had before.</h3>
            </div>
            <div class="captionResults">
                <p class="captionResultText">3 previous violations</p>
            </div>
        </div>
     */




    /* Violation JSON are numbered, and seperated by || !!!
        The violations were 2. CITY OF CHICAGO FOOD SERVICE SANITATION CERTIFICATE - Comments: OBSERVED FACILITY FOOD HANDLERS PREPARING AND HANDLING TIME AND TEMPERATURE CONTROL FOR SAFETY(TCS) FOODS (COOKED PASTA) WITHOUT ORIGINAL CITY OF CHICAGO FOOD SERVICE MANAGER AND CERTIFICATE ON SITE. INFORMED PERSON IN CHARGE CITY OF CHICAGO ORIGINAL FOOD SERVICE CERTIFICATE MUST REMAIN POSTED ON SITE AND CERTIFIED MANAGER ON SITE DURING TCS FOOD PREP, COOKING, SERVING AND OPERATING HOURS.  PRIORITY FOUNDATION VIOLATION #7-38-012. CITATION ISSUED. | 10. ADEQUATE HANDWASHING SINKS PROPERLY SUPPLIED AND ACCESSIBLE - Comments: OBSERVED NO HANDWASHING SIGNAGE AT SEVERAL WASHBOWL SINKS (MIDDLE CLASSROOM AND REAR WASHROOM NEAR KITCHEN). INSTRUCTED TO PROVIDE. | 22. PROPER COLD HOLDING TEMPERATURES - Comments: OBSERVED IMPROPER COLD-HOLD TEMPERATURES OF (TCS) FOODS,( MILK, CHEESE AND CREAM CHEESE) INSIDE 2-DOOR REFRIGERATOR UNIT. COLD TCS FOODS MUST MAINTAIN TEMPERATURE OF 41.F OR BELOW. PERSON IN CHARGE IMMEDIATELY AND VOLUNTARILY DISPOSED OF 7 LBS OF PRODUCTS WORTH $15 THROUGH DENATURING PROCESS.  PRIORITY VIOLATION #7-38-005. CITATION ISSUED.  | 33. PROPER COOLING METHODS USED; ADEQUATE EQUIPMENT FOR TEMPERATURE CONTROL - Comments: NOTED IMPROPER COLD-HOLD TEMPERATURE OF KITCHEN 2-DOOR REFRIGERATOR AT 48.4F. ALL REFRIGERATOR UNITS SHALL MAINTAIN A PROPER TEMPERATURE OF 41F AND BELOW. REFRIGERATOR MUST NOT BE USED UNTIL REINSPECTED BY CHICAGO DEPARTMENT OF HEALTH (CDPH). PRIORITY VIOLATION #7-38-005. CITATION ISSUED.  | 51. PLUMBING INSTALLED; PROPER BACKFLOW DEVICES - Comments: OBSERVED SLOW DRAINING WASHBOWL BASIN IN MIDDLE WASHROOM LOCATED IN SOUTH CLASSROOM. INSTRUCTED TO CORRECT.
     */



    let violationDump = data["violations"];
    let violations = [];
    let violationDescription;
    let violationCount = 0;
    let violationHint;

    if (violationDump === undefined && data["results"] === "Out of Business") {
        violationDescription = "N/A, Out of Business!"
    }
    else if (violationDump === undefined && data["results"] === "Not Ready") {
        violationDescription = "N/A, Not Ready!"
    }
    else if (violationDump === undefined) {
        violationDescription = "There are no violations!"
        violationHint = "WIP";
    }
    else {
        violationDescription = "Click to see what violations this location got!"
        violationCount++; //TODO actually parse the file.
    }



    const inspectionViolationContainer = document.createElement("div");
    inspectionViolationContainer.className = "resultContainer";

    const inspectionViolationIconContainer = document.createElement("div");
    inspectionViolationIconContainer.className = "iconResults";

    if (violationDescription.includes("N/A, Out of Business") || violationDescription.includes("Not Ready") ){
        inspectionViolationIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='mdi:alert-octagram' style='font-size: 64px; color: #f18200;'></span>"
    }
    else if (violationCount > 0 ) {
        inspectionViolationIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='mdi:alert-octagram' style='font-size: 64px;'></span>"
    }
    else {
        inspectionViolationIconContainer.innerHTML="<span class='iconify' data-inline='false' data-icon='mdi:alert-octagram' style='font-size: 64px; color: #2e8540;'></span>"
    }


    const inspectionViolationResult = document.createElement("div");
    inspectionViolationResult.className = "bodyResults";
    let  inspectionViolationBody = document.createElement("h3");
    inspectionViolationBody.className ="bodySubtitle";
    // inspectionViolationBody.innerHTML = "Violations Received";
    let inspectionViolationSecondaryText = document.createElement("h3");
    inspectionViolationSecondaryText.className = "bodySecondaryText";
    inspectionViolationSecondaryText.innerText = violationDescription; // TODO create logic for this

    inspectionViolationResult.append(inspectionViolationBody,inspectionViolationSecondaryText);

    const  inspectionViolationResults = document.createElement("div");
    inspectionViolationResults.className = "captionResults";
    let  inspectionViolationCaptionResultText = document.createElement("p");
    inspectionViolationCaptionResultText.className = "captionResultText";
    inspectionViolationCaptionResultText.innerText = violationCount + " violations." // TODO create logic for this

    inspectionViolationResults.appendChild(inspectionViolationCaptionResultText);


    inspectionViolationContainer.append(inspectionViolationIconContainer,inspectionViolationResult, inspectionViolationResults);


    resultsContainer2.appendChild(inspectionViolationContainer);





    $("#results").append(resultMain, resultsContainer1, resultsContainer2);
    console.log(
        data["dba_name"] +
        " was inspected on " +
        data["inspection_date"] +
        " and the result was" +
        data["results"] +
        " . The unique id was " +
        data["inspection_id"] +
        "and the violations were" +
        data["violations"]
    );
}
