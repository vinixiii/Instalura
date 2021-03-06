export async function HttpClient(url, { headers, body, ...options }) {
  return fetch(url, {
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...options,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error('Falha ao tentar pegar os dados do servidor');
  });
}
