"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { CheckCircle, Download, Share, Home } from "lucide-react"

export const PaymentSuccess = ({ paymentData }) => {
  const transactionId = `TXN${Date.now().toString().slice(-8)}`

  return (
    <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="mx-auto w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Payment Successful!</CardTitle>
        <CardDescription className="text-slate-300">Your transaction has been completed successfully</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Transaction Details */}
        <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-400">
              {paymentData.amount.toFixed(2)} {paymentData.currency}
            </p>
            <p className="text-slate-400 text-sm">Amount Paid</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Transaction ID</p>
              <p className="text-white font-mono">{transactionId}</p>
            </div>
            <div>
              <p className="text-slate-400">Date & Time</p>
              <p className="text-white">{new Date().toLocaleString()}</p>
            </div>
            <div>
              <p className="text-slate-400">Payment Method</p>
              <p className="text-white capitalize">{paymentData.method}</p>
            </div>
            <div>
              <p className="text-slate-400">Status</p>
              <p className="text-emerald-400 font-medium">Completed</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
              onClick={() => window.location.reload()}
            >
              <Home className="w-4 h-4 mr-2" />
              New Payment
            </Button>
          </div>
        </div>

        {/* Security Confirmation */}
        <div className="text-center text-xs text-slate-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
          <CheckCircle className="w-4 h-4 inline mr-2 text-emerald-400" />
          Transaction verified with biometric authentication
        </div>
      </CardContent>
    </Card>
  )
}
