var form = document.getElementById("f1");
var input = ""
form.onsubmit = function (event) {
    event.preventDefault();
    input = form.t1.value;
    console.log("Restaurant: " + input);
    /* For now, this just works with the submit form
      // filterByName(form.t1.value);
      // filterByRisk(form.t1.value);
      // filterByAddress(input)
     */
    // filterByZip(input);
    filterByName(form.t1.value);

}

function loadJson() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5000,
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
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
                data[i]["inspection_id"]
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
    /* All you need to do for a user inputted name is to convert the restaurant name into uppercase /*

     */
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            $where: "dba_name like '%" + name + "'"
        },
    }).done(function (data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        for (let i = 0; i < data.length; i++) {
            console.log(
                data[i]["dba_name"] +
                " was inspected on " +
                data[i]["inspection_date"] +
                " and the result was" +
                data[i]["results"] +
                " . The unique id was " +
                data[i]["inspection_id"]);
            // );
            // console.log(data[i]["inspection_id"]);
            // console.log(data[i]["inspection_date"]);
            // console.log(data[i]["results"]);
        }
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
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            risk: risk,
        },
    }).done(function (data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        for (let i = 0; i < data.length; i++) {
            console.log(
                data[i]["dba_name"] +
                " was inspected on " +
                data[i]["inspection_date"] +
                " and the result was" +
                data[i]["results"] +
                " . The unique id was " +
                data[i]["inspection_id"] +
                " the risk was " + data[i]["risk"]);
            // );
            // console.log(data[i]["inspection_id"]);
            // console.log(data[i]["inspection_date"]);
            // console.log(data[i]["results"]);
        }
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
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            zip: zip,
        },
    }).done(function (data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        for (let i = 0; i < data.length; i++) {
            console.log(
                data[i]["dba_name"] +
                " was inspected on " +
                data[i]["inspection_date"] +
                " and the result was" +
                data[i]["results"] +
                " . The unique id was " +
                data[i]["inspection_id"] +
                " the risk was " + data[i]["risk"]);
            // );
            // console.log(data[i]["inspection_id"]);
            // console.log(data[i]["inspection_date"]);
            // console.log(data[i]["results"]);
        }
    });
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
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            address: address, //you need to add a extra space.
        },
    }).done(function (data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        for (let i = 0; i < data.length; i++) {
            console.log(
                data[i]["dba_name"] +
                " was inspected on " +
                data[i]["inspection_date"] +
                " and the result was" +
                data[i]["results"] +
                " . The unique id was " +
                data[i]["inspection_id"] +
                " the risk was " + data[i]["risk"]);
            // );
            // console.log(data[i]["inspection_id"]);
            // console.log(data[i]["inspection_date"]);
            // console.log(data[i]["results"]);
        }
    });
}

function menuFunction() {
    var menu = document.getElementById("hamMenu");
    var arrow = document.getElementById("arrow");
    if (menu.style.display === "block") {
        menu.style.display = "none";
        arrow.style.transform = "rotateZ(0deg)";
    } else {
        menu.style.display = "block";
        arrow.style.transform = "rotateZ(90deg)";
    }
}
