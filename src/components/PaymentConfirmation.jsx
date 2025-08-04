"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Separator } from "./ui/Separator"
import { Shield, ArrowLeft, CheckCircle } from "lucide-react"

export const PaymentConfirmation = ({ paymentData, onConfirm, onBack }) => {
  const getMethodDisplay = () => {
    switch (paymentData.method) {
      case "mpesa":
        return {
          name: "M-Pesa",
          details: `Phone: ${paymentData.details.phone}`,
          color: "text-green-400",
        }
      case "visa":
        return {
          name: "Visa Card",
          details: `Card: ****${paymentData.details.cardNumber?.slice(-4)}`,
          color: "text-blue-400",
        }
      case "crypto":
        return {
          name: "Crypto Wallet",
          details: `Wallet: ${paymentData.details.walletAddress?.slice(0, 10)}...`,
          color: "text-orange-400",
        }
      default:
        return { name: "", details: "", color: "" }
    }
  }

  const methodDisplay = getMethodDisplay()

  return (
    <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Confirm Payment</CardTitle>
        <CardDescription className="text-slate-300">Review your payment details before proceeding</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Amount</span>
            <span className="text-2xl font-bold text-white">
              {paymentData.amount.toFixed(2)} {paymentData.currency}
            </span>
          </div>
          <Separator className="bg-slate-600" />
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Payment Method</span>
            <span className={`font-medium ${methodDisplay.color}`}>{methodDisplay.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Account</span>
            <span className="text-slate-400 text-sm">{methodDisplay.details}</span>
          </div>
          <Separator className="bg-slate-600" />
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Processing Fee</span>
            <span className="text-slate-400">
              {paymentData.method === "crypto" ? "0.00" : "2.50"} {paymentData.currency}
            </span>
          </div>
          <div className="flex justify-between items-center font-bold">
            <span className="text-white">Total</span>
            <span className="text-emerald-400">
              {(paymentData.amount + (paymentData.method === "crypto" ? 0 : 2.5)).toFixed(2)} {paymentData.currency}
            </span>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-700/50 p-3 rounded-lg">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>This transaction is secured with end-to-end encryption</span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0"
          >
            Confirm Payment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
