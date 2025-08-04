"use client"

import { useState } from "react"
import { BiometricAuth } from "./components/BiometricAuth"
import { PaymentMethods } from "./components/PaymentMethods"
import { PaymentDetails } from "./components/PaymentDetails"
import { PaymentConfirmation } from "./components/PaymentConfirmation"
import { PaymentSuccess } from "./components/PaymentSuccess"

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    currency: "USD",
    method: "visa",
    details: {},
  })

  const steps = ["Biometric Authentication", "Payment Method", "Payment Details", "Confirmation", "Complete"]

  const handleBiometricSuccess = () => {
    setIsAuthenticated(true)
    setCurrentStep(1)
  }

  const handlePaymentMethodSelect = (method) => {
    setPaymentData((prev) => ({ ...prev, method }))
    setCurrentStep(2)
  }

  const handlePaymentDetails = (details, amount, currency) => {
    setPaymentData((prev) => ({ ...prev, details, amount, currency }))
    setCurrentStep(3)
  }

  const handleConfirmPayment = () => {
    setCurrentStep(4)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BiometricAuth onSuccess={handleBiometricSuccess} />
      case 1:
        return <PaymentMethods onSelect={handlePaymentMethodSelect} />
      case 2:
        return <PaymentDetails method={paymentData.method} onSubmit={handlePaymentDetails} />
      case 3:
        return (
          <PaymentConfirmation
            paymentData={paymentData}
            onConfirm={handleConfirmPayment}
            onBack={() => setCurrentStep(2)}
          />
        )
      case 4:
        return <PaymentSuccess paymentData={paymentData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">SecurePay</h1>
          <p className="text-slate-300">Biometric-Secured Payment System</p>
        </div>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {steps.slice(0, -1).map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      index <= currentStep ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${index <= currentStep ? "text-emerald-400" : "text-slate-400"}`}>
                    {step}
                  </span>
                  {index < steps.length - 2 && (
                    <div className={`w-16 h-0.5 mx-4 ${index < currentStep ? "bg-emerald-500" : "bg-slate-700"}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex justify-center">{renderStep()}</div>
      </div>
    </div>
  )
}

export default App
