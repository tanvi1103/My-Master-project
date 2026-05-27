const axios = require('axios');
const validateCaptcha = async (token) => {
  try {
    const secretKey = "6Lfi11ArAAAAAAghMx_O7AE82IEEMY6Ij7d9mVVd";
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    );
    console.log("Success:", response.data.success);
  } catch (err) {
    console.error("Error:", err.message);
  }
};
validateCaptcha(undefined);
