import { useEffect, useState } from "react";
import logo from "./assets/logo1.png"; // غير المسار حسب مكان اللوجو

const PASSCODE_LENGTH = 6;

export default function Login({ onLogin }) {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");

  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    if (passcode.length === PASSCODE_LENGTH) {
      const savedPassword = localStorage.getItem("joe_salon_password");

      if (!savedPassword) {
        localStorage.setItem("joe_salon_password", passcode);
        localStorage.setItem("joe_salon_auth", "true");
        onLogin();
        return;
      }

      if (passcode === savedPassword) {
        localStorage.setItem("joe_salon_auth", "true");
        onLogin();
      } else {
        setError("Wrong passcode");
        setTimeout(() => {
          setPasscode("");
          setError("");
        }, 700);
      }
    }
  }, [passcode, onLogin]);

  function handleNumberClick(num) {
    if (passcode.length < PASSCODE_LENGTH) {
      setPasscode((prev) => prev + num);
    }
  }

  function handleDelete() {
    setPasscode((prev) => prev.slice(0, -1));
  }

  return (
    <div className="iphone-login-page">
      <div className="iphone-login-overlay" />

      <div className="iphone-login-box">
        <img src={logo} alt="Salon Logo" className="iphone-login-logo" />

        <h1 className="iphone-login-title">Enter Passcode</h1>
        <p className="iphone-login-subtitle">Unlock your salon system</p>

        <div className="iphone-passcode-dots">
          {Array.from({ length: PASSCODE_LENGTH }).map((_, index) => (
            <span
              key={index}
              className={`passcode-dot ${
                index < passcode.length ? "filled" : ""
              }`}
            />
          ))}
        </div>

        {error && <p className="iphone-login-error">{error}</p>}

        <div className="iphone-keypad">
          {numbers.map((num) => (
            <button
              key={num}
              type="button"
              className="keypad-btn"
              onClick={() => handleNumberClick(String(num))}
            >
              {num}
            </button>
          ))}

          <div />

          <button
            type="button"
            className="keypad-btn"
            onClick={() => handleNumberClick("0")}
          >
            0
          </button>

          <button
            type="button"
            className="keypad-text-btn"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}