// // Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
// const handler = async (event) => {
//   try {
//     const subject = event.queryStringParameters.name || 'World'
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ message: `Hello ${subject}` }),
//       // // more keys you can return:
//       // headers: { "headerName": "headerValue", ... },
//       // isBase64Encoded: true,
//     }
//   } catch (error) {
//     return { statusCode: 500, body: error.toString() }
//   }
// }

// module.exports = { handler }


exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  // Perform logic with the form data, such as sending an email, storing data in a database, etc.

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Form submitted successfully!",
      data: data
    })
  };
};