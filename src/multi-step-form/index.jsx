import { useState } from "react";

export default function Apt() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final submission
      console.log("Form submitted:", formData);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stepper currentStep={currentStep} totalSteps={3} />

      {currentStep === 1 && (
        <div className="flex flex-col">
          <label htmlFor="email">Enter Email</label>
          <input
            name="email"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <label htmlFor="name">Enter Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <label htmlFor="phone">Enter Phone</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>
      )}

      <button type="submit">{currentStep < 3 ? "Next" : "Submit"}</button>
    </form>
  );
}

function Stepper({ currentStep }) {
  const totalSteps = 3;

  return (
    <div className="flex w-[300px] justify-between mt-5  relative">
      {/* Background line */}
      <div className="absolute w-full h-1 bg-gray-300 top-1/2 transform -translate-y-1/2 z-0"></div>

      {/* Progress line (optional - shows completion) */}
      <div
        className="absolute h-1 bg-cyan-600 top-1/2 transform -translate-y-1/2 z-10 transition-all duration-300"
        style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
      ></div>

      {/* Step circles */}
      <div className="flex justify-between w-full relative z-20">
        {new Array(totalSteps).fill(1).map((_, idx) => (
          <div
            key={idx}
            className={`w-[40px] h-[40px] rounded-full border-2 items-center justify-center flex font-medium transition-all duration-300 ${
              idx + 1 <= currentStep
                ? "bg-cyan-600 text-white border-cyan-600"
                : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            {idx + 1 <= currentStep ? "✓" : idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
