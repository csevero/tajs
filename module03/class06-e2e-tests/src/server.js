import { createServer } from 'node:http';
import { once } from 'node:events';
import Person from './person.js';

const server = createServer(async (request, response) => {
  if (request.method !== 'POST' || request.url !== '/persons') {
    response.writeHead(404);
    response.end();
    return;
  }

  try {
    const data = (await once(request, 'data')).toString();
    const result = Person.process(JSON.parse(data));
    return response.end(JSON.stringify({ result }));
  } catch (err) {
    if(err.message.includes('required')) {
      response.writeHead(400)
      response.write(JSON.stringify({validationError: err.message}))
      response.end()
      return
    }
    console.error('deu ruim', err);
    response.writeHead(500);
    return response.end();
  }
});

export default server;
