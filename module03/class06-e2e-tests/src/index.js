import server from "./server.js";

if(process.env.NODE_ENV !== 'test') {
  server.listen(process.env.PORT, () => {
    const serverInfo = server.address()
    console.log(`server is running at ${serverInfo.address}:${serverInfo.port}`)
  })
}

export default server

/**
 curl \
 -i \
 -X POST \
 -H 'Content-Type: application/json' \
 -d '{
  "name": "Severo Carlos",
  "cpf": "123.123.123-98"
 }' \
 http://localhost:3000/persons
 */