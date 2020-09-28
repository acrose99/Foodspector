var form = document.getElementById("f1");
var input = ""
form.onsubmit = function(event){
    event.preventDefault();
    input = form.t1.value;
    console.log("Restaurant: " + input);
    /* For now, this just works with the submit form
      // filterByName(form.t1.value);
      // filterByRisk(form.t1.value);
      // filterByAddress(input)
     */
      filterByZip(input);
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

    /* All you need to do for a user inputted name is to convert the restaurant name into uppercase /*

     */
    const name = nameInputted.toUpperCase()
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
  /* A risk can consist of three different values
    1. risk: "Risk 1 (High)"
    2. risk: "Risk 2 (Medium)"
    3. risk: "Risk 3 (Low)"
    Thus, we need to convert whatever the user inputs into one of these values.
 */
    const highRisk = "1 (HIGH)"
    const mediumRisk = "2 (MEDIUM)"
    const lowRisk = "3 (LOW)"
    let risk = riskInputted.toUpperCase();

    if (highRisk.includes(risk)) {
      risk = "Risk 1 (High)"
    }
    else if (mediumRisk.includes(risk)) {
      risk = "Risk 2 (Medium)"
    }
    else if (lowRisk.includes(risk)) {
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
  zip = zipInputted.trimEnd(); // For user error
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
    let address = addressInputted.trimEnd(); // For user error
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