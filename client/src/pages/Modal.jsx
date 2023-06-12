import { Typography } from "@material-tailwind/react";
import React from "react";
import { 
    EnvelopeIcon,
    CreditCardIcon,
    UserCircleIcon,
    LockClosedIcon,
    BuildingLibraryIcon
} from "@heroicons/react/24/solid";

export default function Modal() {
  const [showModal, setShowModal] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState("card");

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <>
      <button
        className="bg-primary py-2 px-4 mt-0 mx-auto text-white rounded-full focus:outline-none outline-none"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Payment
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative max-w-screen-sm my-6 mx-auto max-h-screen-sm">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-2/7 bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">Payment Method</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="p-4">
                  <div className="mb-4">
                    <button
                      className={`${
                        paymentMethod === "card" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                      } font-semibold px-4 py-2 rounded-md mr-2`}
                      onClick={() => handlePaymentMethodChange("card")}
                    >
                      Pay with Card
                    </button>
                    <button
                      className={`${
                        paymentMethod === "upi" ? "bg-primary text-white" : "bg-gray-200 text-gray-600"
                      } font-semibold px-4 py-2 rounded-md`}
                      onClick={() => handlePaymentMethodChange("upi")}
                    >
                      Pay with UPI
                    </button>
                  </div>
                  {paymentMethod === "card" && (
                    <>
                      <h4 className="text-lg font-semibold mb-2">Personal Details</h4>
                      <div className="mb-6">
                        <input
                          className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-100"
                          type="email"
                          id="email"
                          placeholder="Enter your email address"
                        />
                          <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-3 pr-3 py-3">
                          <EnvelopeIcon />
                          </span>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">Card Details</h4>
                      <div className="mb-2">
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100"
                          type="text"
                          id="cardNumber"
                          placeholder="Enter card number"
                        />
                          <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-3 pr-3 py-3">
                          <CreditCardIcon />
                          </span>
                      </div>
                      <div className="flex mb-2">
                        <div className="w-1/2 pr-2">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100"
                            type="text"
                            id="expire"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="w-1/2 pl-2">
                          <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100"
                            type="text"
                            id="cvv"
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                      <div className="mb-2">
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100"
                          type="text"
                          id="holderName"
                          placeholder="Enter Cardholder Name"
                        />
                          <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-9 right-3 pr-3 py-3">
                          <UserCircleIcon />
                          </span>
                      </div>
                    </>
                  )}
                  {paymentMethod === "upi" && (
                    <>
                    <div className="p-8">
                      <h4 className="text-lg font-semibold mb-2">Personal Details</h4>
                      <div className="mb-6">
                        <input
                          className="w-auto px-4 py-2 border border-gray-300 focus:outline-none focus:ring focus:ring-gray-100"
                          type="email"
                          id="email"
                          placeholder="Email address"
                        />
                          <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-10 pr-3 py-4">
                          <EnvelopeIcon />
                          </span>
                      </div>
                      <h4 className="text-lg font-semibold mb-2">UPI Details</h4>
                      <div className="mb-2">
                        <input
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-100"
                          type="text"
                          id="cardNumber"
                          placeholder="Enter UPI ID"
                        />
                          <span className="z-10 h-full leading-snug font-normal text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-10 pr-3 py-4">
                          <BuildingLibraryIcon />
                          </span>
                      </div>
                      </div>
                    </>
                  )}
                </div>
                <div className=" items-center justify-center p-2 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-primary text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Pay now
                  </button>
                  <Typography
                  variant="small"
                  color="gray"
                  className="mt-2 flex items-center justify-center gap-2 font-normal opacity-60"
                >
                  <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are
                  secure and encrypted
                </Typography>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
