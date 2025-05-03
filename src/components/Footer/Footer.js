// components/Footer.jsx
"use client";

import { useState, useEffect } from "react";
import { FaTwitter, FaFacebookF, FaGooglePlusG } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Footer() {
  const year = new Date().getFullYear();
  const [alert, setAlert] = useState({ type: "", message: "", visible: false });

  useEffect(() => {
    if (alert.visible) {
      const id = setTimeout(() => setAlert((a) => ({ ...a, visible: false })), 3000);
      return () => clearTimeout(id);
    }
  }, [alert]);

  const SubscribeSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
  });

  return (
    <footer className="mt-16 bg-[#613318] text-white relative">
      {/* Toast */}
      {alert.visible && (
        <div
          className={`
            fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg
            ${alert.type === "success" ? "bg-green-500" : "bg-red-500"}
            text-white
          `}
        >
          {alert.message}
        </div>
      )}

      {/* Top row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end items-start space-x-6">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={SubscribeSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              // only called when valid
              await new Promise((r) => setTimeout(r, 500));
              setAlert({ type: "success", message: "Subscribed!", visible: true });
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col">
                <div className="flex rounded-full overflow-hidden border border-white">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="px-4 py-2 bg-white text-black placeholder-gray-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-[#613318] text-white font-medium border-l border-white"
                  >
                    {isSubmitting ? "..." : "Subscribe"}
                  </button>
                </div>
                <ErrorMessage name="email">
                  {(msg) => <div className="mt-1 text-sm text-red-400">{msg}</div>}
                </ErrorMessage>
              </Form>
            )}
          </Formik>

          {/* Contacts */}
          <a href="#" className="hover:underline mt-2.5">
            Contacts
          </a>

          {/* Social icons */}
          <a href="#" className="hover:text-gray-300 mt-2.5">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-gray-300 mt-2.5">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-gray-300 mt-2.5">
            <FaGooglePlusG size={20} />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-t border-gray-500 opacity-50" />
      </div>

      {/* Bottom row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center">
        <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center sm:justify-start text-sm">
          {[
            "About",
            "Our Strategy",
            "Our Advantages",
            "Social Responsibility",
            "Our Services",
          ].map((label) => (
            <a key={label} href="#" className="hover:underline">
              {label}
            </a>
          ))}
        </nav>
        <p className="text-sm mt-4 sm:mt-0">&copy; {year} . All rights reserved.</p>
      </div>
    </footer>
  );
}
