export async function makeRequest(url = '', data = {}, requestMethod = "POST") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: requestMethod, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}

export async function get(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", 
    mode: 'cors', 
    cache: 'no-cache', 
    // credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'    
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
  });
  return response; 
}