// serversides.js
export async function checkTokenAndRedirect({ req, res }) {
    const token = req.cookies.token; // Adjust this based on where you store the token
  
    if (!token) {
      res.setHeader('location', '/');
      res.statusCode = 302;
      res.end();
    }
  }
  