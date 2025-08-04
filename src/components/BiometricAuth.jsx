"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/Card"
import { Button } from "./ui/Button"
import { Fingerprint, Eye, Shield, CheckCircle } from "lucide-react"

export const BiometricAuth = ({ onSuccess }) => {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [authMethod, setAuthMethod] = useState(null)

  const handleBiometricScan = (method) => {
    setAuthMethod(method)
    setIsScanning(true)

    // Simulate biometric scanning
    setTimeout(() => {
      setIsScanning(false)
      setScanComplete(true)

      setTimeout(() => {
        onSuccess()
      }, 1000)
    }, 3000)
  }

  return (
    <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-white">Biometric Authentication</CardTitle>
        <CardDescription className="text-slate-300">Secure your payment with biometric verification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!authMethod && (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 border-slate-600 hover:border-emerald-500 hover:bg-emerald-500/10 bg-transparent"
              onClick={() => handleBiometricScan("fingerprint")}
            >
              <Fingerprint className="w-8 h-8 text-emerald-400" />
              <span className="text-slate-300">Fingerprint</span>
            </Button>
            <Button
              variant="outline"
              className="h-24 flex-col space-y-2 border-slate-600 hover:border-blue-500 hover:bg-blue-500/10 bg-transparent"
              onClick={() => handleBiometricScan("face")}
            >
              <Eye className="w-8 h-8 text-blue-400" />
              <span className="text-slate-300">Face ID</span>
            </Button>
          </div>
        )}

        {authMethod && (
          <div className="text-center space-y-4">
            <div className="relative">
              <div
                className={`w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center ${
                  scanComplete
                    ? "border-emerald-500 bg-emerald-500/20"
                    : isScanning
                      ? "border-blue-500 bg-blue-500/20 animate-pulse"
                      : "border-slate-600"
                }`}
              >
                {scanComplete ? (
                  <CheckCircle className="w-12 h-12 text-emerald-400" />
                ) : authMethod === "fingerprint" ? (
                  <Fingerprint className="w-12 h-12 text-blue-400" />
                ) : (
                  <Eye className="w-12 h-12 text-blue-400" />
                )}
              </div>
              {isScanning && <div className="absolute inset-0 rounded-full border-4 border-blue-500 animate-ping" />}
            </div>

            <div className="space-y-2">
              <p className="text-white font-medium">
                {scanComplete ? "Authentication Successful!" : isScanning ? "Scanning..." : "Ready to scan"}
              </p>
              <p className="text-slate-400 text-sm">
                {scanComplete
                  ? "Redirecting to payment options..."
                  : isScanning
                    ? `Please hold your ${authMethod === "fingerprint" ? "finger" : "face"} steady`
                    : `Place your ${authMethod === "fingerprint" ? "finger on the sensor" : "face in view"}`}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
          <Shield className="w-4 h-4" />
          <span>256-bit encryption • Zero-knowledge authentication</span>
        </div>
      </CardContent>
    </Card>
  )
}
