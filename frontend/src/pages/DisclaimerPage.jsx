import React from 'react';
import './PrivacyPolicyPage.css'; // Reusing CSS

const DisclaimerPage = () => {
    return (
        <div className="privacy-container">
            <h1>Disclaimer</h1>
            <p className="last-updated">Last Updated: October 26, 2023</p>

            <div className="policy-content">
                <section>
                    <h2>General Information</h2>
                    <p>The information provided by Zsyio ("we," "us," or "our") on our website is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.</p>
                </section>

                <section>
                    <h2>External Links Disclaimer</h2>
                    <p>The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.</p>
                </section>

                <section>
                    <h2>Professional Disclaimer</h2>
                    <p>The Site cannot and does not contain professional advice. The information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.</p>
                </section>
            </div>
        </div>
    );
};

export default DisclaimerPage;
