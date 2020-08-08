const kratosPublic = 'https://localhost:8080/.ory/kratos/public';

async function getBrowserBasedLoginUserFlow() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get('request');

  const path = `/self-service/browser/flows/requests/login?request=${requestId}`;
  return fetch(kratosPublic + path, {
    'credentials': 'include'
  }).then(response => response.json())
    .catch((error) => console.error('Error:', error));
}

async function getBrowserBasedRegistrationUserFlow() {
  const urlParams = new URLSearchParams(window.location.search);
  const requestId = urlParams.get('request');

  const path = `/self-service/browser/flows/requests/registration?request=${requestId}`;
  return await fetch(kratosPublic + path, {
    'credentials': 'include'
  }).then(response => response.json())
    .catch((error) => console.error('Error:', error));
}

function createForm(flow) {
  const config = flow.methods.password.config;

  const form = document.createElement('form');
  form.setAttribute('action', config.action);
  form.setAttribute('method', config.method);

  for (const field of config.fields) {
    const input = createInput(field);
    form.appendChild(input);

    if (field.messages && field.messages.length > 0) {
      for (const message of field.messages) {
        const span = document.createElement('span');
        span.innerHTML = message.text;
        form.appendChild(span);
      }
    }
  }

  const submitInput = createInput({'type': 'submit'});
  form.appendChild(submitInput);

  if (config.messages) {
    for (const message of config.messages) {
      const span = document.createElement('span');
      span.innerHTML = message.text;
      form.appendChild(span);
    }
  }

  return form;
}

function createInput(field) {
  const input = document.createElement('input');
  for (const property in field) {
    input.setAttribute(property, field[property]);
    if (property === 'name') {
      input.setAttribute('placeholder', field[property]);
    }
  }
  return input;
}

async function whoami() {
  const path = `/sessions/whoami`;
  const body = await fetch(kratosPublic + path)
    .then(response => response.json())

  var verified = false;
  if (body.identity.verifiable_addresses) {
    const verifiable_address = body.identity.verifiable_addresses[0];
    verified = verifiable_address.verified;
  }

  return {
    "email": body.identity.traits.email,
    "name": body.identity.traits.name,
    "verified": verified
  }
}
