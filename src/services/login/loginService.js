/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
async function HttpClient(url, { headers, body, ...options }) {
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

export const loginService = {
  async login({ username, password }) {
    // É preciso retornar o resultado do fetch para que seja possível
    // continuar a cadeia de promises no .then lá na página de login
    return HttpClient(
      'https://instalura-api-omariosouto.vercel.app/api/login',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: {
          // Esse é o nosso DTO
          username, // 'vinixiii',
          password, // 'senhasegura',
        },
      }
    ).then((data) => {
      // console.log(data);
      return data;
    });
  },
};
