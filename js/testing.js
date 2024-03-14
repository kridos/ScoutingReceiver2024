const button = document.getElementById("scan");
const scannerElement = document.getElementById("reader");

let html5QrCode = new Html5Qrcode(/* element id */ "reader"); // Declare scanner outside button click
let maxRows = 1; // Maximum allowed rows (starts at 1)
var cameraId;

Html5Qrcode.getCameras().then(devices => {
    /**
     * devices would be an array of objects of type:
     * { id: "id", label: "label" }
     */
    if (devices && devices.length) {
      cameraId = devices[0].id;
      // .. use this to start scanning.
    }
  }).catch(err => {
    // handle err
  });

const tableLabels = [
    "Team Number",
    "Team Name",
    "Where Intake",
    "Where Score",
    "Pref Auto Start",
    "Where Score Auto",
    "Max Notes in Amp Auto",
    "Max Notes in Speaker Auto",
    "Type of Strategy",
    "Primary TeleOp Score Location",
    "Avg TeleOp Scored Notes",
    "Preferred HP Location",
    "Can Climb",
    "Approx Climb Time",
    "Can Harmonize",
    "Can Trap"
];


let table = document.querySelector("table");

// Create a table if it doesn't exist
if (!table) {
    table = document.createElement("table");

    // Create table header row
    const headerRow = document.createElement("tr");

    // Loop through each label and create a table header cell
    tableLabels.forEach(label => {
        const headerCell = document.createElement("th");
        headerCell.textContent = label;
        headerRow.appendChild(headerCell);
    });

    // Add the header row to the table
    table.appendChild(headerRow);

    // Add the table to the body
    document.body.appendChild(table);
}

button.addEventListener("click", function () {
    // Check if the table has reached the maximum allowed rows
    maxRows++;

    html5QrCode.start(
        cameraId,
        {
            fps: 10,    // Optional, frame per seconds for qr code scanning
            qrbox: { width: 250, height: 250 }  // Optional, if you want bounded box UI
        },
        (decodedText, decodedResult) => {
            // do something when code is read
            const table = document.querySelector("table");
            console.log(table.rows.length + " vs. " + maxRows);
            //console.log(decodedResult);
            if (table && table.rows.length < maxRows) {
                //console.log("ADDING");

                const dataArray = decodedText.split(",");

                // Get a reference to the table (if it exists)


                // Create a table row for the scanned data
                const row = document.createElement("tr");

                // Loop through each label to create data cells
                tableLabels.forEach((label, labelIndex) => {
                    const cell = document.createElement("td");
                    cell.textContent = dataArray[labelIndex]; // Access corresponding data point
                    row.appendChild(cell);
                });

                // Add the row to the table
                table.appendChild(row);

                // Increment maxRows to allow one more row on next scan


                // Hide scanner and stop after successful scan
                closeScanner();
            } else {
                decodedText = "";
            }
        },
        (errorMessage) => {
            console.warn(`Code scan error = ${errorMessage}`);
            if (table && table.rows.length >= maxRows) {
                closeScanner();
            }
        })
        .catch((err) => {
            // Start failed, handle it.
        });


    scannerElement.style.display = "block"; // Show scanner element

});



function closeScanner() {
    scannerElement.style.display = "none";

    html5QrCode.stop().then((ignore) => {
        console.log("Scanner stopped successfully");
    }).catch((err) => {
        console.error("Error stopping scanner:", err);
    });

}
