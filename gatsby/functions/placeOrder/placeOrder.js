const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `
        <li>
          <img src="${item.thumbnail}" alt="${item.name}"}/>
          ${item.name} (${item.size}) - ${item.price}
        </li>
      `
        )
        .join('')}
    </ul>
    <p>Your total is <strong>${total}</strong> due at pickup.</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>`;
}
// Create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Just for testing
function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Check if honeypot was filled out
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'boop beep pop!' }),
    };
  }
  // Validate data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Make sure there are items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'No items in your order',
      }),
    };
  }

  // Send the email

  // Send the success or error message

  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>`,
    subject: 'New Order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
