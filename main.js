var form = document.getElementById("f1");
var input = ""
form.onsubmit = function(event){
    event.preventDefault();
    input = form.t1.value;
    console.log("Restaurant: " + form.t1.value);
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
function filterByName() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            $where: "dba_name like '%LA UNICA'"
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
function filterByRisk() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            risk: "Risk 1 (High)"
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
function filterByZip() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            zip: 60655,
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
function filterByAddress() {
    $.ajax({
        url: "https://data.cityofchicago.org/resource/4ijn-s7e5.json",
        type: "GET",
        data: {
            $limit: 5,
            $$app_token: "jhZLBl156ply47f9UyK3Iuf3u",
            address: "4635 W 63RD ST ", //you need to add a extra space.
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