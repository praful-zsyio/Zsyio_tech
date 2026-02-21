import React from 'react';
import './PrivacyPolicyPage.css'; // Reusing CSS

const TrademarksPage = () => {
    return (
        <div className="privacy-container">
            <h1>Trademarks</h1>

            <div className="policy-content">
                <section>
                    <p>The Zsyio name, logo, and related marks are trademarks of Zsyio. All other trademarks, service marks, and trade names are the property of their respective owners.</p>
                </section>

                <section>
                    <h2>Usage Guidelines</h2>
                    <p>You may not use our trademarks or logos without our prior written permission, except as permitted by applicable law.</p>
                </section>

                <section>
                    <h2>Contact</h2>
                    <p>If you have any questions about our trademarks, please contact us at contact@zsyio.com.</p>
                </section>
            </div>
        </div>
    );
};

export default TrademarksPage;
