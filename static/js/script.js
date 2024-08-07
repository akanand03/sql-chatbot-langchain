document.getElementById("send-btn").addEventListener("click", function () {
  sendMessage();
});

document
  .getElementById("user-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

let typingIndicator;

function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  appendMessage("You", userInput, "user");
  document.getElementById("user-input").value = "";

  showTypingIndicator();

  fetch("/send-message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      hideTypingIndicator();
      appendMessage("Bot", data.response, "bot");
    })
    .catch((error) => {
      console.error("Error:", error);
      hideTypingIndicator();
    });
}

function appendMessage(sender, message, type) {
  var messageContainer = document.createElement("div");
  messageContainer.classList.add("message", type);

  var img = document.createElement("img");
  img.src = type === "user" ? "/static/img/user.webp" : "/static/img/bot.webp";

  messageContainer.appendChild(img);

  var text = document.createElement("span");
  text.textContent = message;
  messageContainer.appendChild(text);

  document.getElementById("messages").appendChild(messageContainer);
  document.getElementById("messages").scrollTop =
    document.getElementById("messages").scrollHeight;
}

function showTypingIndicator() {
  typingIndicator = document.createElement("div");
  typingIndicator.classList.add("typing-indicator", "bot");
  typingIndicator.id = "typing-indicator";

  var img = document.createElement("img");
  img.src = "/static/img/bot.webp";
  typingIndicator.appendChild(img);

  var dots = document.createElement("div");
  dots.classList.add("typing-dots");
  for (var i = 0; i < 3; i++) {
    var dot = document.createElement("span");
    dots.appendChild(dot);
  }
  typingIndicator.appendChild(dots);

  document.getElementById("messages").appendChild(typingIndicator);
  document.getElementById("messages").scrollTop =
    document.getElementById("messages").scrollHeight;
}

function hideTypingIndicator() {
  if (typingIndicator) {
    typingIndicator.remove();
  }
}
