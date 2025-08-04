"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Smartphone, CreditCard, Coins, ArrowRight } from "lucide-react"

export const PaymentMethods = ({ onSelect }) => {
  const paymentMethods = [
    {
      id: "mpesa",
      name: "M-Pesa",
      description: "Mobile money transfer",
      icon: Smartphone,
      color: "from-green-500 to-emerald-600",
      features: ["Instant transfer", "No card required", "Mobile verification"],
    },
    {
      id: "visa",
      name: "Visa Card",
      description: "Credit/Debit card payment",
      icon: CreditCard,
      color: "from-blue-500 to-indigo-600",
      features: ["Worldwide accepted", "Secure processing", "Fraud protection"],
    },
    {
      id: "crypto",
      name: "Crypto Token",
      description: "Digital currency payment",
      icon: Coins,
      color: "from-orange-500 to-yellow-600",
      features: ["Decentralized", "Low fees", "Fast settlement"],
    },
  ]

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Choose Payment Method</h2>
        <p className="text-slate-300">Select your preferred payment option</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {paymentMethods.map((method) => {
          const IconComponent = method.icon
          return (
            <Card
              key={method.id}
              className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-all duration-300 cursor-pointer group"
              onClick={() => onSelect(method.id)}
            >
              <CardHeader className="text-center">
                <div
                  className={`mx-auto w-16 h-16 bg-gradient-to-r ${method.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{method.name}</CardTitle>
                <CardDescription className="text-slate-300">{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {method.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-0"
                  onClick={() => onSelect(method.id)}
                >
                  Select {method.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
