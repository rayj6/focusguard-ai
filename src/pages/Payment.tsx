import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  QrCode,
  Wallet,
  Shield,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type PaymentMethodId = "card" | "qr" | "momo" | "paypal";

const paymentMethods = [
  {
    id: "card" as PaymentMethodId,
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay with Visa, Mastercard, or American Express",
  },
  {
    id: "qr" as PaymentMethodId,
    name: "QR Code",
    icon: QrCode,
    description: "Scan to pay with your banking app",
  },
  {
    id: "momo" as PaymentMethodId,
    name: "MoMo",
    icon: Wallet,
    description: "Pay with MoMo e-wallet",
  },
  {
    id: "paypal" as PaymentMethodId,
    name: "PayPal",
    icon: Wallet,
    description: "Pay securely with PayPal",
  },
];

const planDetails: Record<
  string,
  { name: string; price: string; billing: string }
> = {
  free: { name: "Free", price: "$0", billing: "Forever free" },
  "pro-monthly": { name: "Pro", price: "$12", billing: "per month" },
  "pro-yearly": { name: "Pro", price: "$59", billing: "per year" },
  "enterprise-monthly": {
    name: "Enterprise",
    price: "$4.98",
    billing: "per user/month",
  },
  "enterprise-yearly": {
    name: "Enterprise",
    price: "$47.81",
    billing: "per user/year",
  },
};

const CardPaymentForm = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">Card Details</h3>
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardName">Cardholder Name</Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            className="mt-1.5 bg-secondary border-border focus:border-primary"
          />
        </div>
        <div>
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className="mt-1.5 bg-secondary border-border focus:border-primary font-mono"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Expiry Date</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              maxLength={5}
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>
          <div>
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              placeholder="123"
              maxLength={4}
              type="password"
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>
        </div>
        <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan">
          Pay Now
        </Button>
      </div>
    </motion.div>
  );
};

const QRPaymentDisplay = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* QR Code Placeholder */}
        <div className="bg-white p-4 rounded-xl">
          <div className="w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
            <img alt="" src="/images/qrcode.jpeg" />
          </div>
        </div>
        {/* Bank Info */}
        <div className="flex-1 space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Bank Name</p>
            <p className="font-semibold text-foreground">TECHCOMBANK</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Account Owner</p>
            <p className="font-semibold text-foreground">NGUYEN TUAN TU</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Account Number</p>
            <p className="font-semibold text-foreground font-mono">
              1907 3231 7840 10
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Scan the QR code with your banking app or transfer manually using the
        account details above.
      </p>
    </motion.div>
  );
};

const MoMoPaymentDisplay = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">Pay with MoMo</h3>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* MoMo QR */}
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 rounded-xl">
          <div className="bg-white p-3 rounded-lg">
            <div className="w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <img alt="" src="/images/momoqr.jpeg" />
            </div>
          </div>
        </div>
        {/* MoMo Info */}
        <div className="flex-1 space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">MoMo Name</p>
            <p className="font-semibold text-foreground">NGUYEN TUAN TU</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Phone Number</p>
            <p className="font-semibold text-foreground font-mono">
              0868 320 014
            </p>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Open MoMo app and scan this QR code to complete payment.
      </p>
    </motion.div>
  );
};

const PayPalPaymentDisplay = () => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">Pay with PayPal</h3>
      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">PP</span>
        </div>
        <p className="text-muted-foreground mb-6">
          You will be redirected to PayPal to complete your payment securely.
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
          Continue to PayPal
        </Button>
      </div>
    </motion.div>
  );
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(
    null
  );
  const [email, setEmail] = useState("");
  const [transactionNote, setTransactionNote] = useState("");
  const planKey = searchParams.get("plan") || "pro-monthly";
  const plan = planDetails[planKey] || planDetails["pro-monthly"];

  const renderPaymentContent = () => {
    switch (selectedMethod) {
      case "card":
        return <CardPaymentForm />;
      case "qr":
        return <QRPaymentDisplay />;
      case "momo":
        return <MoMoPaymentDisplay />;
      case "paypal":
        return <PayPalPaymentDisplay />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Plan Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 mb-8"
          >
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gradient-cyan">
                  {plan.name} Plan
                </p>
                <p className="text-muted-foreground">{plan.billing}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{plan.price}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact & Notes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-6 mb-8"
          >
            <h2 className="text-lg font-semibold mb-4">Contact & Verification</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 bg-secondary border-border focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll send payment confirmation and license key to this email
                </p>
              </div>
              <div>
                <Label htmlFor="transactionNote">Transaction Notes</Label>
                <Input
                  id="transactionNote"
                  placeholder="e.g., Order ID, Company name, or reference code"
                  value={transactionNote}
                  onChange={(e) => setTransactionNote(e.target.value)}
                  className="mt-1.5 bg-secondary border-border focus:border-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Include this note in your payment for verification
                </p>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">Select Payment Method</h2>
            <div className="grid gap-4">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={method.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full h-auto py-5 px-6 justify-start border-border hover:border-primary hover:bg-primary/5 group transition-all duration-300 ${
                      selectedMethod === method.id
                        ? "border-primary bg-primary/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div
                        className={`p-3 rounded-xl transition-colors ${
                          selectedMethod === method.id
                            ? "bg-primary/20"
                            : "bg-secondary group-hover:bg-primary/10"
                        }`}
                      >
                        <method.icon
                          className={`w-6 h-6 transition-colors ${
                            selectedMethod === method.id
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-primary"
                          }`}
                        />
                      </div>
                      <div className="text-left flex-1">
                        <p className="font-semibold text-foreground">
                          {method.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      {selectedMethod === method.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Payment Content Area */}
          <AnimatePresence mode="wait">
            {renderPaymentContent()}
          </AnimatePresence>

          {/* Security Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground"
          >
            <Shield className="w-4 h-4 text-accent" />
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
