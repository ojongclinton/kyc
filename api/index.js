const express = require('express');
const axios = require('axios');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();
app.use(cors());
app.post('/verify_identity', upload.fields([{ name: 'document' }, { name: 'selfie' }]), async (req, res) => {
  const { document, selfie } = req.files;
  try {

    const applicantResponse = await axios.post('https://api.onfido.com/v3/applicants', {
      // Applicant details
    }, {
      headers: { 'Authorization': `Token token=api_sandbox.wZKltx_pwK7.RgsTKi4vvWWZmohMGTftoRwN5FgD5lea` }
    });
    console.log(applicantResponse)


    const checkResponse = await axios.post(`https://api.onfido.com/v3/applicants/${applicantResponse.data.id}/checks`, {
      // Check request details
    }, {
      headers: { 'Authorization': `Token token=YOUR_API_TOKEN` }
    });
    console.log(checkResponse)


    res.json({ success: true, data: checkResponse.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
