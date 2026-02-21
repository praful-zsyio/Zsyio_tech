import React, { useState, useEffect } from "react";
import { getCart, removeFromCart, clearCart } from "../../utils/cart";
import { submitContact } from "../../services/api";

const CartAndContact = () => {
    const [cart, setCart] = useState([]);
    const [contactForm, setContactForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    // Load cart on mount and listen for storage changes (optional, but good for sync)
    useEffect(() => {
        // Initial load
        setCart(getCart());

        // Poll or listen for changes? 
        // Since we are in the same SPA, we might need a custom event or just poll.
        // For simplicity, we'll just load once. Ideally, use a Context for Cart.
        // Let's add a simple interval to check for cart updates if user navigates back/forth
        const interval = setInterval(() => {
            const currentCart = getCart();
            setCart(prev => {
                if (JSON.stringify(prev) !== JSON.stringify(currentCart)) return currentCart;
                return prev;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleRemoveFromCart = (index) => {
        setCart(removeFromCart(index));
    };

    const handleSubmitCart = async () => {
        if (!contactForm.name || !contactForm.email || !contactForm.phone) {
            setSubmitStatus("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        // Construct the message from cart details
        let cartDetails = "Requested Estimation:\n\n";
        cart.forEach((item, idx) => {
            cartDetails += `${idx + 1}. ${item.title}: ₹${item.amount.toLocaleString('en-IN')}\n`;
        });
        const cartTotal = cart.reduce((sum, item) => sum + item.amount, 0);
        cartDetails += `\nTotal Estimated Cost: ₹${cartTotal.toLocaleString('en-IN')}`;
        cartDetails += `\n\nUser Message: ${contactForm.message}`;

        try {
            await submitContact({
                name: contactForm.name,
                email: contactForm.email,
                phone: contactForm.phone,
                message: cartDetails
            });
            setSubmitStatus("Success! Your estimation request has been sent to contact@zsyio.com.");
            clearCart();
            setCart([]);
            setContactForm({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            console.error("Submission error:", error);
            setSubmitStatus("Failed to send request. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cart.length === 0) return null;

    const cartTotal = cart.reduce((sum, item) => sum + item.amount, 0);

    return (
        <section className="py-12 max-w-4xl mx-auto px-6">
            <div className="rounded-2xl border bg-[hsl(var(--mantle))]/80 p-6 backdrop-blur-xl">
                <h2 className="text-xl font-semibold mb-4">
                    Your Project Estimation Cart
                </h2>

                <div className="space-y-4">
                    {cart.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b border-[hsl(var(--surface1))] pb-2"
                        >
                            <div>
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-[hsl(var(--subtext1))]">
                                    ₹{item.amount.toLocaleString("en-IN")}
                                </p>
                            </div>

                            <button
                                onClick={() => handleRemoveFromCart(index)}
                                className="text-sm text-red-400 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className="border-t border-[hsl(var(--surface1))] mt-4 pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold">Grand Total</span>
                    <span className="text-2xl font-bold text-blue-400">
                        ₹{cartTotal.toLocaleString("en-IN")}
                    </span>
                </div>

                {/* CHECKOUT / SUBMIT FORM */}
                <div className="mt-8 pt-6 border-t border-[hsl(var(--surface1))]">
                    <h3 className="text-lg font-semibold mb-4">Receive Quote & Discuss via Email</h3>
                    <p className="text-sm text-[hsl(var(--subtext1))] mb-4">
                        Submit your estimation request directly to <strong>contact@zsyio.com</strong>.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="rounded-lg border border-[hsl(var(--surface2))] bg-[hsl(var(--base))] p-3 outline-none focus:border-[hsl(var(--blue))]"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(p => ({ ...p, name: e.target.value }))}
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="rounded-lg border border-[hsl(var(--surface2))] bg-[hsl(var(--base))] p-3 outline-none focus:border-[hsl(var(--blue))]"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(p => ({ ...p, email: e.target.value }))}
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="rounded-lg border border-[hsl(var(--surface2))] bg-[hsl(var(--base))] p-3 outline-none focus:border-[hsl(var(--blue))]"
                            value={contactForm.phone}
                            onChange={(e) => setContactForm(p => ({ ...p, phone: e.target.value }))}
                        />
                    </div>

                    <div className="mt-4">
                        <textarea
                            rows="2"
                            placeholder="Additional Message (Optional)"
                            className="w-full rounded-lg border border-[hsl(var(--surface2))] bg-[hsl(var(--base))] p-3 outline-none focus:border-[hsl(var(--blue))]"
                            value={contactForm.message}
                            onChange={(e) => setContactForm(p => ({ ...p, message: e.target.value }))}
                        />
                    </div>

                    {submitStatus && (
                        <p className={`mt-4 text-center text-sm ${submitStatus.includes("Success") ? "text-green-400" : "text-red-400"}`}>
                            {submitStatus}
                        </p>
                    )}

                    <button
                        onClick={handleSubmitCart}
                        disabled={isSubmitting}
                        className="
              mt-6 w-full rounded-xl
              bg-[hsl(var(--blue))] text-[hsl(var(--base))]
              font-bold py-3
              hover:opacity-90 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
                    >
                        {isSubmitting ? "Sending..." : "Submit to contact@zsyio.com"}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CartAndContact;
