import Head from 'next/head'; // Head is a React component used to modify the document head. You can add elements like
// title, meta tags, etc., which are important for SEO, accessibility, and more.
import Image from 'next/image'; // Image is a component from Next.js that provides an extension of the HTML <img> element, optimized for both responsive images and improved performance.
import type { BaseSyntheticEvent } from 'react';
import React, { useEffect, useState } from 'react';

import SubmitButton from '../button/SubmitButton'; // adjust the path as necessary
import styles from '../styles/Home.module.css'; // Update this path if needed for your styles

const OptInForm = () => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('CA'); // Default to Canada
  const [stateProvince, setStateProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [zipCodeError, setZipCodeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
    setPhoneError(!phonePattern.test(phone) && phone !== '');
  }, [phone]);

  useEffect(() => {
    let zipCodePattern;
    if (country === 'US') {
      zipCodePattern = /^\d{5}(-\d{4})?$/;
    } else if (country === 'CA') {
      zipCodePattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    }
    setZipCodeError(
      zipCodePattern ? !zipCodePattern.test(zipCode) && zipCode !== '' : false,
    );
  }, [zipCode, country]);

  const sendMessage = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    if (phoneError || zipCodeError) return;

    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      const res = await fetch('/api/sendMessage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          address,
          city,
          country,
          stateProvince,
          zipCode,
        }),
      });

      const apiResponse = await res.json();

      if (apiResponse.success) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setError(true);
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Opt In Form</title>
      </Head>
      <form className={styles.form} onSubmit={sendMessage}>
        <Image
          src="/emberalert.png" // Make sure the path to your image is correct
          width={900}
          height={200}
          alt="Ember Alert"
        />
        <h1 className={styles.title}>
          Opt in to receive SMS text messages if a wildfire is in your area!
        </h1>

        {/* Form Group for Phone Number */}
        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            className={styles.input}
            required
            autoComplete="tel"
          />
          {phoneError && (
            <span className={styles.error}>
              Please enter a valid US or Canada phone number
            </span>
          )}
        </div>

        {/* Form Group for Address */}
        <div className={styles.formGroup}>
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className={styles.input}
            id="inputAddress"
            placeholder="1234 Main St"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="street-address"
          />
        </div>

        {/* Form Group for City */}
        <div className={styles.formGroup}>
          <label htmlFor="inputCity">City</label>
          <input
            type="text"
            className={styles.input}
            id="inputCity"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="address-level2"
          />
        </div>

        {/* Form Group for Country */}
        <div className={styles.formGroup}>
          <label htmlFor="country">Country</label>
          <select
            id="country"
            className={styles.select}
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>

        {/* Form Group for State/Province */}
        <div className={styles.formGroup}>
          <label htmlFor="stateProvince">State/Province</label>
          <input
            type="text"
            className={styles.input}
            id="stateProvince"
            value={stateProvince}
            onChange={(e) => setStateProvince(e.target.value)}
            autoComplete="address-level1"
          />
        </div>

        {/* Form Group for Zip/Postal Code */}
        <div className={styles.formGroup}>
          <label htmlFor="zipCode">Zip/Postal Code</label>
          <input
            type="text"
            className={styles.input}
            id="zipCode"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            autoComplete="postal-code"
          />
          {zipCodeError && (
            <span className={styles.error}>
              Please enter a valid zip/postal code
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SubmitButton isLoading={loading} xl>
            Submit
          </SubmitButton>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <p className={styles.success}>Message sent successfully.</p>
        )}
        {error && (
          <p className={styles.error}>
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export { OptInForm };
