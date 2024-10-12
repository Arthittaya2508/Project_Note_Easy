"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from "sweetalert2";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // แจ้งเตือนเข้าได้
        Swal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          text: "ยินดีต้อนรับกลับ!",
          confirmButtonText: "ตกลง",
        }).then(() => {
          onLoginSuccess(username);
          onClose();
          router.push("http://localhost:3000");
        });
      } else {
        setErrorMessage(data.message);
        // ข้อผิดพลาด
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: data.message || "โปรดตรวจสอบข้อมูลประจำตัวและลองอีกครั้ง.",
          confirmButtonText: "ลองอีกครั้ง",
        });
      }
    } catch (error) {
      setErrorMessage("เกิดข้อผิดพลาด. กรุณาลองอีกครั้งในภายหลัง.");
      Swal.fire({
        icon: "error",
        title: "ข้อผิดพลาด",
        text: "เกิดข้อผิดพลาด. กรุณาลองอีกครั้งในภายหลัง.",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* ปุ่มกากบาท */}
        <button
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        {/* ฟอร์มเข้าสู่ระบบ */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          เข้าสู่ระบบ
        </h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border text-gray-600 border-gray-300 rounded-lg"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border text-gray-600 border-gray-300 rounded-lg"
              placeholder="Enter password"
              required
            />
            <div
              className="absolute inset-y-0 right-0 top-4 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FiEye className="text-gray-500" />
              ) : (
                <FiEyeOff className="text-gray-500" />
              )}
            </div>
          </div>

          {/* ลงชื่อเข้าใช้ */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-gable-green-900 text-white p-2 rounded-lg"
            >
              ลงชื่อเข้าใช้
            </button>
          </div>
        </form>

        {/* สมัครสมาชิก */}
        <div className="text-center mt-4">
          <span className="text-sm text-gray-600">ยังไม่มีบัญชี? </span>
          <span className="text-sm text-blue-600 cursor-pointer">
            สมัครสมาชิก
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
