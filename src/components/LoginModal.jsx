// src/components/LoginModal.jsx
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const Modal = styled(motion.div)`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CloseButton = styled(FaTimes)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  color: #444;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #002b5c;
`;

const Subtitle = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const InputContainer = styled.div`
  position: relative;
  margin-top: 1.5rem;
`;

const Label = styled.label`
  position: absolute;
  top: ${({ hasContent }) => (hasContent ? "-0.7rem" : "0.9rem")};
  left: 0.75rem;
  font-size: ${({ hasContent }) => (hasContent ? "0.75rem" : "1rem")};
  color: ${({ hasContent }) => (hasContent ? "#3498db" : "#888")};
  background: #fff;
  padding: 0 0.25rem;
  transition: all 0.2s ease-in-out;
  pointer-events: none;
`;

const Prefix = styled.span`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #888;
  font-size: 1rem;
  pointer-events: none;
`;

const PhoneInput = styled.input`
  width: 100%;
  padding: 0.8rem 0.8rem 0.8rem 3.5rem;
  font-size: 1rem;
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#ccc")};
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #3498db;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 0.8rem;
  background: #74b9ff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  text-align: center;
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #ddd;
  }
  span {
    margin: 0 1rem;
    color: #888;
    font-size: 0.9rem;
  }
`;

const Terms = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin-top: 1rem;
  text-align: center;
`;

const OTPContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 1.5rem 0;
`;

const OTPBox = styled.input`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #3498db;
  }
`;

const ResendText = styled.div`
  font-size: 0.85rem;
  text-align: center;
  margin-top: 1rem;
  color: #666;
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  font-weight: 600;
  cursor: pointer;
`;

const LoginModal = ({ showModal, setShowModal }) => {
  const [phone, setPhone] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);
  const [timer, setTimer] = useState(30);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(value);
    if (value.length === 10) setError("");
  };

  const handleContinue = () => {
    if (phone.length < 10) {
      setError("Please enter 10 digit mobile number");
    } else {
      setShowOTP(true);
      setError("");
      setOtp(["", "", "", ""]);
      setTimer(30);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }
  };

  const handleOTPChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      if (otp[index] === "") {
        if (index > 0) {
          otpRefs.current[index - 1]?.focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    otpRefs.current[0]?.focus();
    // You can add resend OTP API call here
  };

  useEffect(() => {
    let interval;
    if (showOTP && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [showOTP, timer]);

  return (
    <AnimatePresence>
      {showModal && (
        <Overlay
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Modal
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setShowModal(false)} />
            <Title>{showOTP ? "Enter OTP" : "Login / Register"}</Title>
            <Subtitle>
              {showOTP
                ? `OTP sent to +91 ${phone}`
                : "Please enter your Phone Number"}
            </Subtitle>

            {!showOTP ? (
              <>
                <InputContainer>
                  <Prefix>+91</Prefix>
                  <Label hasContent={phone.length > 0}>Phone Number</Label>
                  <PhoneInput
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    hasError={!!error}
                  />
                  {error && <ErrorText>{error}</ErrorText>}
                </InputContainer>

                <Button
                  onClick={handleContinue}
                  style={{
                    background: phone.length === 10 ? "#0984e3" : "#b2bec3",
                    cursor: phone.length === 10 ? "pointer" : "not-allowed",
                  }}
                  disabled={phone.length !== 10}
                >
                  Continue
                </Button>
              </>
            ) : (
              <motion.div
                key="otp-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <OTPContainer>
                  {otp.map((digit, index) => (
                    <OTPBox
                      key={index}
                      type="text"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleOTPChange(e, index)}
                      onKeyDown={(e) => handleOTPKeyDown(e, index)}
                      ref={(el) => (otpRefs.current[index] = el)}
                    />
                  ))}
                </OTPContainer>

                <Button
                  style={{
                    background: otp.every((digit) => digit !== "")
                      ? "#0984e3"
                      : "#b2bec3",
                    cursor: otp.every((digit) => digit !== "")
                      ? "pointer"
                      : "not-allowed",
                  }}
                  disabled={!otp.every((digit) => digit !== "")}
                >
                  Verify OTP
                </Button>

                <ResendText>
                  {timer > 0 ? (
                    <>
                      Resend OTP in <strong>{timer}s</strong>
                    </>
                  ) : (
                    <ResendButton onClick={handleResend}>
                      Resend OTP
                    </ResendButton>
                  )}
                </ResendText>
              </motion.div>
            )}

            <Terms>
              By clicking you agree to <a href="#">Terms and Conditions</a>
            </Terms>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
