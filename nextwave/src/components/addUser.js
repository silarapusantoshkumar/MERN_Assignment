import React, { useState } from 'react';
import banner from '../assets/banner.png';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast components
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import axios from 'axios';
import './add_user.css';
import { FaChevronLeft } from "react-icons/fa6";

export default function AddUser() {
  const navigate = useNavigate();
  const handleHomePageClick = () => {
    navigate('/');
  };

  const [formData, setFormData] = useState({
    title: '',
    icon_url: '',
    link: '',
    tag: '',
    category: '',
    description: ''
  });

  const [errors, setErrors] = useState({});

  const isFormValid = () => {
    return Object.values(errors).every((error) => !error) && Object.values(formData).every((value) => value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'title':
      case 'link':
      case 'icon_url':
      case 'category':
        if (!value) {
          error = `${name.replace('_', ' ')} is required`;
        } else if (value.length > 100) {
          error = `${name.replace('_', ' ')} must be less than 100 characters`;
        }
        break;
      case 'tag':
        if (!value) {
          error = 'Tag is required';
        }
        break;
      case 'description':
        if (!value) {
          error = 'Description is required';
        } else if (value.length > 500) {
          error = 'Description must be less than 500 characters';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        console.log(formData, "formdata client side submit");
        const response = await axios.post('http://localhost:5010/formdata', formData);
        console.log('Form data saved:', response.data, "data client side ");
        console.log("TOAST Enter Sucess")
        toast.success('Form data saved successfully'); // Show success message
        setFormData({ // Reset form state
          title: '',
          icon_url: '',
          link: '',
          tag: '',
          category: '',
          description: ''
        });

        // Navigate after 5 seconds
        setTimeout(() => {
          navigate('/');
        }, 3000); 
        // navigate('/'); 
      } catch (err) {
        console.error('Error saving form data', err);
        console.log("TOAST Enter Failure")
        toast.error('Error saving form data'); 
        setTimeout(() => {
          navigate('/');
        }, 5000); 
      };
    }
  };

  return (
    <section className="add_user">
    <div className="add_user--left">
      <div className="add_user--redirect" onClick={handleHomePageClick}>
        <FaChevronLeft /> User
      </div>
      <h2 className="add_user--title">Item Details</h2>
      <div className="add_user--formDiv">
        <form onSubmit={handleSubmit} className="add_user--form">
          <div>
            <label>ITEM TITLE</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div>
            <label>LINK</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
            />
            {errors.link && <p className="error">{errors.link}</p>}
          </div>
          <div>
            <label>ICON_URL</label>
            <input
              type="text"
              name="icon_url"
              value={formData.icon_url}
              onChange={handleInputChange}
            />
            {errors.icon_url && <p className="error">{errors.icon_url}</p>}
          </div>
          <div>
            <label>TAG NAME</label>
            <select
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="request">Request</option>
              <option value="user">User</option>
            </select>
            {errors.tag && <p className="error">{errors.tag}</p>}
          </div>
          <div>
            <label>CATEGORY</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            {errors.category && <p className="error">{errors.category}</p>}
          </div>
          <div>
            <label>DESCRIPTION</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
            ></textarea>
            {errors.description && <p className="error">{errors.description}</p>}
          </div>
          <div className="add_user--button">
            <button type="submit" disabled={!isFormValid()}>
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="add_user--right">
      <img src={banner} alt="banner" />
    </div>
    <ToastContainer position="bottom-center" /> 
  </section>
  );
}
