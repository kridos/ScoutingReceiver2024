
const button = document.getElementById("hidden-button");

button.addEventListener("click", function() {
  let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
/* verbose= */ false);

html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});
function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}




function scanClick() {
    
    //scanner.render(onScanSuccess);
    //html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    var x = document.getElementById("hidden-button");
    //var hiddenButton = document.getElementById("hidden-button");

    if (x.style.display === "none") {
        x.style.display = "block";
        document.body.style.background = 'red';
    } else {
        x.style.display = "none";
        document.body.style.background = 'blue';
    }

    //hiddenButton.style.display = "block";


}