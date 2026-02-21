import React, { useState } from 'react';
import { submitPrivacyConsent } from '../services/api';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
    const [status, setStatus] = useState(null); // 'accepted', 'rejected', or null
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleConsent = async (consentStatus) => {
        setLoading(true);
        try {
            await submitPrivacyConsent(consentStatus);
            setStatus(consentStatus);
            setMessage(consentStatus === 'accepted' ? 'Thank you for accepting our Privacy Policy.' : 'You have rejected the Privacy Policy.');
        } catch (error) {
            console.error("Error submitting consent:", error);
            setMessage('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (status) {
        return (
            <div className="privacy-container">
                <h1>Privacy Policy</h1>
                <div className="consent-message">
                    <p>{message}</p>
                    {status === 'rejected' && <p>Some features may be limited.</p>}
                    <button onClick={() => setStatus(null)} className="btn-reset">Review Policy Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="privacy-container">
            <h1>Privacy Policy</h1>
            <p className="last-updated">Last Updated: October 26, 2023</p>

            <div className="policy-content">
                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to Zsyio. We value your privacy and are committed to protecting your personal data.</p>
                </section>

                <section>
                    <h2>2. Data We Collect</h2>
                    <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us.</p>
                </section>

                <section>
                    <h2>3. How We Use Your Data</h2>
                    <p>We use your data to provide, maintain, and improve our services, and to communicate with you.</p>
                </section>

                <section>
                    <h2>4. Cookies</h2>
                    <p>We use cookies to enhance your experience on our website.</p>
                </section>
            </div>

            <div className="consent-actions">
                <p>Do you accept our Privacy Policy?</p>
                <div className="buttons">
                    <button
                        onClick={() => handleConsent('accepted')}
                        className="btn-accept"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                        onClick={() => handleConsent('rejected')}
                        className="btn-reject"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Reject'}
                    </button>
                </div>
                {message && <p className="error-message">{message}</p>}
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
