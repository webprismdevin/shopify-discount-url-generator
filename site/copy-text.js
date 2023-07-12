function copyLink() {
  // Get the text field
  var copyText = document.getElementById("my_link");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value).then(
    function () {
      alert("Copied to clipboard!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
