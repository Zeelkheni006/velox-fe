'use client';

import { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../styles/ForgotPassword.module.css';

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const prefilledEmail = searchParams.get('email') || '';

  const [email, setEmail] = useState(prefilledEmail);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      alert(`Password reset link will be sent to ${email}`);
      // Call your forgot password API here
    } catch (err) {
      console.error(err);
      alert("Failed to send reset link. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => router.push('/');

  return (
    <div className={styles.wrapper}>
           {[...Array(6)].map((_, i) => (
     <div key={i} className={`${styles.pillShape} ${styles[`pill${i + 1}`]}`}></div>

      ))}
      <div className={styles.card}>
        {/* Left side: form */}
        <div className={styles.formSide}>
          <h2 className={styles.title}>Forgot Password?</h2>
          <p className={styles.subtitle}>
            Enter your email to reset your password
          </p>

          <label className={styles.label}>EMAIL ADDRESS</label>
          <input
            type="email"
            placeholder="Type Email Address"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
          />

          <button
            onClick={handleSubmit}
            className={styles.buttonPrimary}
            disabled={loading || !email}
          >
            {loading ? "Processing..." : "Send Password"} →
          </button>

          <button
            onClick={handleCancel}
            className={styles.buttonSecondary}
          >
            I Remembered My Password
          </button>
        </div>

        {/* Right side: logo */}
        <div className={styles.logoSide}>
          <Image
            src="/images/logo.png"
            alt="Velox Logo"
            width={300}
            height={70}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
