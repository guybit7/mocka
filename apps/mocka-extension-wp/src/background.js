/* eslint-disable no-undef */
let currentTabId;
let groupId = null;
let version = '1.0';
let domainList = [];
let responseType = '';

const REQUEST_WILL_BE_SENT = 'Network.requestWillBeSent';
const RESPONSE_RECEIVED = 'Network.responseReceived';
const LOADING_FINISHED = 'Network.loadingFinished';

const REQUEST_GENERAL_HEADER = 'request_general_header';
const COOKIES = 'cookies';
const RESPONSE = 'response';
const RESPONSE_BODY = 'response_body';

/*
  <requestId, <[request_general_header, response, response_body, coockies], {}>>
*/
const requests = new Map();

console.log('background.js is running');

chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

chrome.runtime.onMessage.addListener((req, sender, sendRes) => {
  switch (req.type) {
    case 'START':
      startRecording(req.payload)
    break;
    case 'STOP':
      stopRecording(req.payload);
    break;
    default: {
      console.log("missing req type: " + req.type)
    }
  }
});

function startRecording(payload) {

  if (payload.currentTabId) {
    chrome.debugger.detach({ tabId: payload.currentTabId });
  }

  currentTabId = parseInt(payload.id);

  if (currentTabId < 0) {
    return;
  }

  groupId = payload.groupId;
  domainList = payload.domainList;
  responseType = payload.responseType;
  chrome.debugger.attach({ tabId: currentTabId }, version, onAttach.bind(null, currentTabId));
  chrome.debugger.onDetach.addListener(debuggerDetachHandler);
  sendRes({ status: 0 });
}

function stopRecording(payload) {
  chrome.debugger.detach({ tabId: payload.tabId }, function() {
  if (chrome.runtime.lastError) {
    console.error('Error detaching debugger: ', chrome.runtime.lastError);
  } else {
    console.log('Debugger detached successfully');
  }
});
}



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
  const requestId = params.requestId;

  if (currentTabId !== debuggerId.tabId) {
    return;
  }

  switch (message) {
    case REQUEST_WILL_BE_SENT:
      if (params.request && filterRequestHandler(params.request.url)) {
        const details = new Map();
        details.set(REQUEST_GENERAL_HEADER, params.request);
        requests.set(requestId, details);
      }
      break;
    case RESPONSE_RECEIVED:
      {
        const request = requests.get(requestId);
        if (request === undefined) {
          console.log('not found request');
          return;
        }

        chrome.debugger.sendCommand(
          {
            tabId: debuggerId.tabId,
          },
          'Network.getResponseBody',
          { requestId: requestId },
          async function (response) {
            if (requests.has(requestId)) {
              const existingMap = requests.get(requestId);
              existingMap.set(RESPONSE, params.response);
              requests.set(requestId, existingMap);
            }
          }
        );

        chrome.debugger.sendCommand(
          {
            tabId: debuggerId.tabId,
          },
          'Network.getCookies',
          {
            urls: [params.response.url],
          },
          function (cookies) {
            if (requests.has(requestId)) {
              const existingMap = requests.get(requestId);
              existingMap.set(COOKIES, cookies);
              requests.set(requestId, existingMap);
            }
          }
        );
      }
      break;
    case LOADING_FINISHED: {
      const request = requests.get(requestId);
      if (request === undefined) {
        console.log('not found request');
        return;
      }
      const { origin, pathname } = new URL(Object.fromEntries(request)[REQUEST_GENERAL_HEADER].url);
      if (isUrlInDomainList(origin)) {
        chrome.debugger.sendCommand(
          {
            tabId: debuggerId.tabId,
          },
          'Network.getResponseBody',
          { requestId: requestId },
          async function (response) {
            // preparing
            if (requests.has(requestId)) {
              const existingMap = requests.get(requestId);
              existingMap.set(RESPONSE_BODY, response);
              requests.set(requestId, existingMap);
            }
            //
            saveRequestData(requests.get(requestId), requestId);
            requests.delete(requestId);
          }
        );
      }
      break;
    }
    default: {
      console.log(`The message ${message} is not handled yet.`);
    }
  }
}

/// handlers
/**
 *  1. remove the first /
 *
 * @param {*} pathname
 * @returns
 */
function getEndpoint(pathname, params) {
  const theEndpoint = pathname.replace(/^\//, '');
  // if (params) {

  // }
  return theEndpoint;
}

function parseAcceptHeader(acceptHeader) {
  if (acceptHeader) {
    return acceptHeader.split(',').map(type => type.split(';')[0].trim());
  }
  return [];
}

function filterRequestHandler(url) {
  const theUrl = new URL(url);
  if (!protocolFilter(theUrl.protocol)) {
    return false;
  }

  if (resourceTypeFilter()) {
    return false;
  }

  return true;
}

async function saveRequestData(requestDataMap, requestId) {
  const requestData = createObjectFromMap(requestDataMap);
  const { request_general_header, response, response_body, cookies } = requestData;

  if (response.mimeType !== responseType) {
    console.log(`The response.mimeType ${response.mimeType} is not handled yet.`);
    return;
  }
  const method = request_general_header.method;
  const requestHeaderAccept = parseAcceptHeader(request_general_header.headers.Accept);
  const { pathname, params } = new URL(request_general_header.url);

  const endpoint = getEndpoint(pathname, params);

  console.log(method);
  console.log(requestHeaderAccept); 
  console.log(endpoint);

  const reqBody = {
    name: endpoint,
    value: response_body?.body ?? '{}',
    groupId: groupId,
  };
  
  const eventPayload = {
    type: 'CAPTURE',
    payload: reqBody
  }

  await chrome.runtime.sendMessage(eventPayload);
  // await saveMock(reqBody);
}

function protocolFilter(protocol) {
  console.log('the protocol: ', protocol);
  return ['https:', 'http:'].includes(protocol);
}

function resourceTypeFilter() {
  return false;
}

function isUrlInDomainList(origin) {
  try {
    console.log(`URL for checking - ${origin}`);
    const isOriginIncludes = domainList.includes(origin);
    if (isOriginIncludes) {
      console.log('isUrlInDomainList >> The URL is under the domain list:', origin);
      return true;
    }
    console.log('isUrlInDomainList >> The URL is NOT under the domain list:', origin);
    return false;
  } catch (error) {
    console.error('Invalid origin:', origin);
    return false;
  }
}

function createObjectFromMap(map) {
  const result = {};

  for (const [key, value] of map.entries()) {
    result[key] = value;
  }

  return result;
}

async function saveMock(payload) {
  // Define the URL endpoint and the data you want to send
  const url = 'http://localhost:3000/api/mock';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
