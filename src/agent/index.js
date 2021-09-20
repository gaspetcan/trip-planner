const baseURL = 'https://api.pexels.com/v1/';

const headers = new Headers();
headers.append(
  'Authorization',
  '563492ad6f9170000100000113f6c6c67dda49d08bb00f80c5560043'
);

const requestOptions = {
  method: 'GET',
  headers,
  redirect: 'follow',
};

const Photos = {
  get: name => fetch(`${baseURL}search?query=${name}`, requestOptions),
};

export { Photos };
