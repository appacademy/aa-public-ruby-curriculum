const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

export default async (url, { data, headers = {}, ...options } = {}) => {
  headers = {
    ...headers,
    'X-CSRF-Token': csrfToken,
    'Content-Type': 'application/json'
  };

  let response = await fetch(`/api/${url}`, {
    ...options,
    body: JSON.stringify(data),
    headers
  });

  const success = response.ok;

  if (response.headers.get('content-type').includes('application/json')) {
    response = await response.json();
  }

  return success ? response : Promise.reject(response);
};