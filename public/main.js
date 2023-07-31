const socket = io();

// get all alerts div
const allAlertsDiv = document.getElementById("all-alerts");
const latestAlertDiv = document.getElementById("latest-alert");

// receivedAlerts
const receivedAlerts = [];

socket.on("message", (message) => {
   console.log(message);
});

socket.on("webhookData", (webhookData) => {
   // to clear previous data from the UI
   receivedAlerts.length = 0;
   receivedAlerts.push(webhookData.data);
   renderLatestAlert();
   renderReceivedAlert();
});

function renderLatestAlert() {
   latestAlertDiv.innerHTML = "";
   const alertContainer = document.createElement("div");
   alertContainer.innerHTML = `
   	<p><b>Rule Name: ${
       	receivedAlerts[receivedAlerts.length - 1].name
   	}</b></p>
   	<p>Dataset: ${
       	receivedAlerts[receivedAlerts.length - 1].set.split(":")[2]
   	}</p>
   	<p>Column: price</p>
   	<p>Current Price: ${
       	Object.values(receivedAlerts[receivedAlerts.length - 1].data)[0]
   	}</p>
   	<p>Time: ${new Date(
       	receivedAlerts[receivedAlerts.length - 1].timestamp
   	).toLocaleString()}</p>
   `;
   latestAlertDiv.appendChild(alertContainer);
}

function renderReceivedAlert() {
   return receivedAlerts.reverse().map((alert) => {
   	const alertContainer = document.createElement("div");
   	alertContainer.innerHTML = `
       	<p><b>Rule Name: ${alert.name}</b></p>
       	<p>Dataset: ${alert.set.split(":")[2]}</p>
       	<p>Column: price</p>
       	<p>Current Price: ${Object.values(alert.data)[0]}</p>
       	<p>Time: ${new Date(alert.timestamp).toLocaleTimeString()}</p>
       	<hr>
   	`;
   	allAlertsDiv.appendChild(alertContainer);
   });
}
