"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Label } from "./ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { Smartphone, CreditCard, Coins, Lock } from "lucide-react"

export const PaymentDetails = ({ method, onSubmit }) => {
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [details, setDetails] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(details, Number.parseFloat(amount), currency)
  }

  const getMethodConfig = () => {
    switch (method) {
      case "mpesa":
        return {
          title: "M-Pesa Payment",
          icon: Smartphone,
          color: "from-green-500 to-emerald-600",
          fields: [
            { key: "phone", label: "Phone Number", type: "tel", placeholder: "+254 700 000 000" },
            { key: "pin", label: "M-Pesa PIN", type: "password", placeholder: "Enter your PIN" },
          ],
        }
      case "visa":
        return {
          title: "Visa Card Payment",
          icon: CreditCard,
          color: "from-blue-500 to-indigo-600",
          fields: [
            { key: "cardNumber", label: "Card Number", type: "text", placeholder: "1234 5678 9012 3456" },
            { key: "expiryDate", label: "Expiry Date", type: "text", placeholder: "MM/YY" },
            { key: "cvv", label: "CVV", type: "password", placeholder: "123" },
            { key: "cardholderName", label: "Cardholder Name", type: "text", placeholder: "John Doe" },
          ],
        }
      case "crypto":
        return {
          title: "Crypto Payment",
          icon: Coins,
          color: "from-orange-500 to-yellow-600",
          fields: [
            {
              key: "walletAddress",
              label: "Wallet Address",
              type: "text",
              placeholder: "0x742d35Cc6634C0532925a3b8D404fddF...",
            },
            { key: "privateKey", label: "Private Key", type: "password", placeholder: "Enter private key" },
          ],
        }
      default:
        return null
    }
  }

  const config = getMethodConfig()
  if (!config) return null

  const IconComponent = config.icon

  return (
    <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div
          className={`mx-auto w-16 h-16 bg-gradient-to-r ${config.color} rounded-full flex items-center justify-center mb-4`}
        >
          <IconComponent className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">{config.title}</CardTitle>
        <CardDescription className="text-slate-300">Enter your payment details securely</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount and Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-slate-300">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="0.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency" className="text-slate-300">
                Currency
              </Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="KES">KES</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Method-specific fields */}
          {config.fields.map((field) => (
            <div key={field.key} className="space-y-2">
              <Label htmlFor={field.key} className="text-slate-300">
                {field.label}
              </Label>
              <Input
                id={field.key}
                type={field.type}
                value={details[field.key] || ""}
                onChange={(e) => setDetails((prev) => ({ ...prev, [field.key]: e.target.value }))}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}

          <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-700/50 p-3 rounded-lg">
            <Lock className="w-4 h-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0"
            disabled={!amount || Object.keys(details).length < config.fields.length}
          >
            Continue to Confirmation
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
