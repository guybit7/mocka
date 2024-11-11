let currentTabId;
let sessionName = '';
let version = '1.0';

const requests = new Map();

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  console.log(req);
  if (currentTabId) {
    chrome.debugger.detach({ tabId: currentTabId });
  }
  currentTabId = parseInt(req.id);

  if (currentTabId < 0) {
    return;
  }
  server = req.server;
  chrome.debugger.attach({ tabId: currentTabId }, version, onAttach.bind(null, currentTabId));
  chrome.debugger.onDetach.addListener(debuggerDetachHandler);
  sendRes({ status: 0 });
});

function debuggerDetachHandler() {
  requests.clear();
}

function onAttach(tabId) {
  chrome.debugger.sendCommand(
    {
      tabId: tabId,
    },
    'Network.enable'
  );

  chrome.debugger.onEvent.addListener(allEventHandler);
}

function allEventHandler(debuggerId, message, params) {
  if (currentTabId != debuggerId.tabId) {
    return;
  }

  if (message == 'Network.requestWillBeSent') {
    if (params.request && filter(params.request.url)) {
      const details = new Map();
      details.set('request', params.request);
      requests.set(params.requestId, details);
    }
  }

  if (message == 'Network.responseReceived') {
    if (params.request && filter(params.request.url)) {
      const request = requests.get(params.requestId);
      if (request === undefined) {
        console.log('not found request');
        return;
      }

      requests.set('response', params.response);
      chrome.debugger.sendCommand(
        {
          tabId: debuggerId.tabId,
        },
        'Network.getCookies',
        {
          urls: [params.response.url],
        },
        function (response) {
          request.set('cookies', response.cookies);
        }
      );
      request.set(params.requestId, request);
    }
  }

  if (message == 'Network.loadingFinished') {
    const request = requests.get(params.requestId);
    if (request === undefined) {
      console.log('not found request');
      return;
    }
    chrome.debugger.sendCommand(
      {
        tabId: debuggerId.tabId,
      },
      'Network.getResponseBody',
      { requestId: params.requestId },
      async function (response) {
        if (response) {
          // console.log(response)
          requests.set('response_body', response);
          requests.set(params.requestId, request);
          const reqBody = {
            name: Object.fromEntries(request).request?.url,
            value: Object.fromEntries(requests).response_body?.body ?? "{}",
            groupId: "67323641f6c75f487ebdbef6"
          }
          console.log(reqBody);
          await saveMock(reqBody);
        }
      }
    );
  }
}

function filter(url) {
  return url.startsWith('http') && !url.endsWith('css') && !url.endsWith('js');
}

async function saveMock(payload) {
  // Define the URL endpoint and the data you want to send
  const url = "http://localhost:3000/api/mock";

  // Use the fetch function to send a POST request
  fetch(url, {
    method: "POST", // Specify the HTTP method
    headers: {
      "Content-Type": "application/json" // Set the content type to JSON
    },
    body: JSON.stringify(payload) // Convert the data to a JSON string
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json(); // Parse the JSON response
    })
    .then(data => {
      console.log("Success:", data); // Handle the response data
    })
    .catch(error => {
      console.error("Error:", error); // Handle any errors
    });
}
