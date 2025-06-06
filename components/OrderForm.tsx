import React, { useState } from "react";
import Image from "next/image";
import { FormData } from "../types";

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<boolean>; // Changed to return a Promise<boolean>
  productAvailable: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  productAvailable,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateField = (name: keyof FormData, value: string) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "Fill in this required field";
      case "email":
        if (!value.trim()) return "Fill in this required field";
        if (!/\S+@\S+\.\S+/.test(value))
          return "Enter an email address with a valid format, e.g. example@mail.com";
        return "";
      case "phone":
        if (!value.trim()) return "Fill in this required field";
        if (!/^\d{5,}$/.test(value)) return "Please enter a valid phone number";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name as keyof FormData, value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<FormData> = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        const success = await onSubmit(formData);
        if (success) {
          setSubmitStatus("success");
        } else {
          setSubmitStatus("error");
        }
      } catch (error) {
        setSubmitStatus("error");
      }
    } else {
      setErrors(newErrors);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "" });
    setErrors({});
    setSubmitStatus("idle");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-white z-50 overflow-y-auto lg:flex lg:fixed lg:inset-0 lg:bg-black lg:bg-opacity-50 lg:justify-center lg:items-center lg:z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-form-title"
    >
      <div className=" bg-white rounded-lg overflow-hidden w-full lg:max-w-4xl lg:flex lg:h-[640px] lg:relative">
        <div className="hidden lg:block w-1/3 relative">
          <Image
            src="images/order-form.png"
            alt="Abstract background"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="px-6 py-6 relative flex flex-col lg:w-2/3 lg:px-12">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 lg:top-4 lg:right-4 hover:text-gray-700"
            aria-label="Close"
          >
            <Image src="images/close.svg" alt="" width={32} height={32} />
          </button>
          <h2
            id="order-form-title"
            className="text-[28px] lg:text-[40px] text-black-form font-bold"
          >
            Finalise Your Order
          </h2>
          {submitStatus === "success" ? (
            <>
              <div className="border-2 border-l-[6px] rounded-md border-green-table mt-4 py-4 px-5">
                <div className="flex flex-row justify-start pb-3">
                  <Image
                    src="images/success.svg"
                    alt="Success"
                    width={24}
                    height={24}
                  />
                  <p className="text-green-success font-medium text-base ml-2">
                    We&apos;re received your order
                  </p>
                </div>
                <p className="mb-5 text-black-form text-base ">
                  You&apos;ll receive a call in the next 24 hours and finalise your
                  order with one of our agents.
                </p>
              </div>
              <div className="flex space-x-4 mt-12">
                <button
                  onClick={onClose}
                  className="w-full lg:w-auto border border-dark-purple text-dark-purple py-4 px-6 font-medium rounded-full hover:bg-dark-purple hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </>
          ) : submitStatus === "error" ? (
            <>
              <div className="border-2 border-l-[6px] rounded-md border-red-table mt-4 py-4 px-5">
                <div className="flex flex-row justify-start pb-3">
                  <Image
                    src="images/form-error.svg"
                    alt="Error"
                    width={24}
                    height={24}
                  />
                  <p className="text-red-error font-medium text-base ml-2">
                    Your order hasn&apos;t been placed
                  </p>
                </div>
                <p className="mb-5 text-black-form text-base ">
                  There&apos;s been a technical error. Unfortunately, we haven&apos;t
                  received your order. Close this window and try placing your
                  order again.
                </p>
              </div>
              <div className="flex flex-col lg:flex-row mt-12 lg:space-x-4">
                <button
                  onClick={resetForm}
                  className="w-full lg:w-auto bg-dark-purple text-white h-12 px-6 font-medium rounded-full mb-4 lg:mb-0"
                >
                  Fill the form again
                </button>
                <button
                  onClick={onClose}
                  className="w-full lg:w-auto border border-dark-purple text-dark-purple h-12 px-6 font-medium rounded-full "
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              {productAvailable ? (
                <>
                  <p className="mb-5 text-black-form text-base">
                    Please leave your contact details below. We&apos;ll contact you
                    very shortly to finalise your order.
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col flex-grow"
                    noValidate
                  >
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block mb-1 text-black-form-label font-medium"
                      >
                        * Name and surname
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full p-2 border ${
                          errors.name ? "border-red-error" : "border-input-gray"
                        } rounded-sm`}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={
                          errors.name ? "name-error" : undefined
                        }
                      />
                      {errors.name && (
                        <div className="flex mt-1" id="name-error">
                          <Image
                            src="images/form-error.svg"
                            alt=""
                            width={16}
                            height={16}
                          />
                          <p className="text-red-error text-sm ml-1">
                            {errors.name}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-1 text-black-form-label font-medium"
                      >
                        * Email address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full p-2 border ${
                          errors.email
                            ? "border-red-error"
                            : "border-input-gray"
                        } rounded-sm`}
                      />
                      {errors.email && (
                        <div className="flex mt-1">
                          <Image
                            src="images/form-error.svg"
                            alt="Error"
                            width={16}
                            height={16}
                          />
                          <p className="text-red-error text-sm ml-1">
                            {errors.email}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="phone"
                        className="block mb-1 text-black-form-label font-medium"
                      >
                        * Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full p-2 border ${
                          errors.phone
                            ? "border-red-error"
                            : "border-input-gray"
                        } rounded-sm`}
                      />
                      {errors.phone && (
                        <div className="flex mt-1">
                          <Image
                            src="images/form-error.svg"
                            alt="Error"
                            width={16}
                            height={16}
                          />
                          <p className="text-red-error text-sm ml-1">
                            {errors.phone}
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="mt-6 lg:flex lg:space-x-4">
                      <button
                        type="submit"
                        className="w-full lg:w-auto bg-dark-purple text-white py-3 px-6 font-medium rounded-full flex items-center justify-center"
                      >
                        Place an order
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="border-2 border-l-[6px] rounded-md border-red-table mt-4 py-4 px-5">
                    <div className="flex flex-row justify-start pb-3">
                      <Image
                        src="images/form-error.svg"
                        alt="Error"
                        width={24}
                        height={24}
                      />
                      <p className="text-red-error font-medium text-base ml-2">
                        Product is out of stock
                      </p>
                    </div>
                    <p className="mb-5 text-black-form text-base ">
                      We&apos;re sorry, but this product is currently out of stock.
                      Please check back later or contact our support team for
                      more information.
                    </p>
                  </div>
                  <div className="flex space-x-4 mt-12">
                    <button
                      onClick={onClose}
                      className="w-full lg:w-auto border border-dark-purple text-dark-purple py-4 px-6 font-medium rounded-full hover:bg-dark-purple hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
