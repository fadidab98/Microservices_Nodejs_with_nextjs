export default async function handler(req, res) {
    // Retrieve the value of the HTTP-only cookie

      const cookieValue = await req.cookies.access_token;
      if(req.method === 'GET'){
        res.status(200).json({cookieValue});
      }
   

  
    // Send the value as part of the server's response

  }