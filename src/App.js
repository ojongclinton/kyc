import React, { useState } from 'react';
import axios from 'axios';


const UserForm = () => {
  const [document, setDocument] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    phone_number: '',
    address: {
      flat_number: '',
      building_number: '',
      building_name: '',
      street: '',
      sub_street: '',
      town: '',
      postcode: '',
      country: '',
      state: '',
      line1: '',
      line2: '',
      line3: ''
    },
    id_numbers: [],
    location: {
      ip_address: '',
      country_of_residence: ''
    },
    consents: []
  });

  const handleFileChange = (event) => {
    if (event.target.name === 'document') {
      setDocument(event.target.files[0]);
    } else if (event.target.name === 'selfie') {
      setSelfie(event.target.files[0]);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      address: { ...userData.address, [name]: value }
    });
  };

  const handleIDNumberChange = (index, event) => {
    const newIDNumbers = userData.id_numbers.map((item, idx) => {
      if (idx === index) {
        return { ...item, [event.target.name]: event.target.value };
      }
      return item;
    });
    setUserData({ ...userData, id_numbers: newIDNumbers });
  };

  const addIDNumber = () => {
    setUserData({
      ...userData,
      id_numbers: [...userData.id_numbers, { type: '', value: '', state_code: '' }]
    });
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      location: { ...userData.location, [name]: value }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('document', document);
    formData.append('selfie', selfie);

    try {
      const response = await axios.post('/verify_identity', formData);
      // Handle the response
      console.log(response.data);
    } catch (error) {
      // Handle errors
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='p-3'>
    <div className='row'>
      <div className='col'>
      <input type="text" className='form-control m-2' name="first_name" value={userData.first_name} onChange={handleInputChange} placeholder="First Name" />

      </div>
      <div className='col'>

      <input type="text"  name="last_name" className='form-control m-2' value={userData.last_name} onChange={handleInputChange} placeholder="Last Name" />
      </div>
      <div className='col'>

      <input type="email" className='form-control m-2' name="email" value={userData.email} onChange={handleInputChange} placeholder="Email" />
      </div>
    </div>
    <div className='row'>
      <div className='col'>
      <input type="date" className='form-control m-2' name="dob" value={userData.dob} onChange={handleInputChange} placeholder="Date of Birth" />

      </div>
      <div className='col'>

      <input type="text" className='form-control m-2' name="phone_number" value={userData.phone_number} onChange={handleInputChange} placeholder="Phone Number" />
      </div>
      <div className='col'>
      <input type="text" className='form-control m-2' name="ip_address" value={userData.location.ip_address} onChange={handleLocationChange} placeholder="IP Address" />

      </div>
    </div>

        <hr/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"10px"}}>
      {Object.entries(userData.address).map(([key, value]) => (
        <div>
        <input
        className='form-control m-2'
          key={key}
          type="text"
          name={key}
          value={value}
          onChange={handleAddressChange}
          placeholder={key.replace('_', ' ')}
        />
        </div>
      ))}
      </div>
      <hr/>

      {/* ID Numbers Inputs */}
      {userData.id_numbers.map((idNumber, index) => (
        <div key={index}>

          <input type="text" className='form-control m-2' name="type" value={idNumber.type} onChange={(e) => handleIDNumberChange(index, e)} placeholder="ID Type" />
          <input type="text" className='form-control m-2' name="value" value={idNumber.value} onChange={(e) => handleIDNumberChange(index, e)} placeholder="ID Value" />
          <input type="text" className='form-control m-2' name="state_code" value={idNumber.state_code} onChange={(e) => handleIDNumberChange(index, e)} placeholder="State Code" />
        </div>
      ))}
      <button type="button" onClick={addIDNumber}>Add ID Number</button>

      {/* Location Inputs */}
      <input type="text" className='form-control m-2' name="country_of_residence" value={userData.location.country_of_residence} onChange={handleLocationChange} placeholder="Country of Residence" />

      <input type="file" name="document" onChange={handleFileChange} />
      <input type="file" name="selfie" onChange={handleFileChange} />
      <button type="submit">Verify Identity</button>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
