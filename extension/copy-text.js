async function copyLink() {
  if (navigator.clipboard && window.isSecureContext) {
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
        console.error("Async: Could not copy text: ", err.message);
      }
    );
  } else {
    // Use the 'out of viewport hidden text area' trick
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    // Move textarea out of the viewport so it's not visible
    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}

chrome.runtime.onMessage.addListener( // this is the message listener
    function(request, sender, sendResponse) {
        if (request.message === "copyText")
            copyToTheClipboard(request.textToCopy);
    }
);