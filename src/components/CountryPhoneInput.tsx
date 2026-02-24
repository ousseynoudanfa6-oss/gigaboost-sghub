import React, { useState } from 'react';

const CountryPhoneInput = () => {
    const [country, setCountry] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const countries = [
        { code: 'US', name: 'United States', flag: '🇺🇸' },
        { code: 'CA', name: 'Canada', flag: '🇨🇦' },
        // Add more countries as needed
    ];

    const handleCountryChange = (e) => {
        setCountry(e.target.value);
        // Reset phone number on country change
        setPhoneNumber('');
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value;
        // Automatic formatting logic based on selected country
        // Placeholder for phone number formatting logic
        setPhoneNumber(input);
    };

    return (
        <div>
            <select value={country} onChange={handleCountryChange}>
                <option value="">Select Country</option>
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.flag} {country.name}
                    </option>
                ))}
            </select>
            <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="Phone Number"
            />
        </div>
    );
};

export default CountryPhoneInput;
