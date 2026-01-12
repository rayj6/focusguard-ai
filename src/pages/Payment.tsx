import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, QrCode, Wallet, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const paymentMethods = [
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Pay with Visa, Mastercard, or American Express",
  },
  {
    id: "qr",
    name: "QR Code",
    icon: QrCode,
    description: "Scan to pay with your banking app",
  },
  {
    id: "momo",
    name: "MoMo",
    icon: Wallet,
    description: "Pay with MoMo e-wallet",
  },
  {
    id: "paypal",
    name: "PayPal",
    icon: Wallet,
    description: "Pay securely with PayPal",
  },
];

const planDetails: Record<string, { name: string; price: string; billing: string }> = {
  free: { name: "Free", price: "$0", billing: "Forever free" },
  "pro-monthly": { name: "Pro", price: "$12", billing: "per month" },
  "pro-yearly": { name: "Pro", price: "$59", billing: "per year" },
  "enterprise-monthly": { name: "Enterprise", price: "$4.98", billing: "per user/month" },
  "enterprise-yearly": { name: "Enterprise", price: "$47.81", billing: "per user/year" },
};

const Payment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const planKey = searchParams.get("plan") || "pro-monthly";
  const plan = planDetails[planKey] || planDetails["pro-monthly"];

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
                <p className="text-2xl font-bold text-gradient-cyan">{plan.name} Plan</p>
                <p className="text-muted-foreground">{plan.billing}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{plan.price}</p>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
                    className="w-full h-auto py-5 px-6 justify-start border-border hover:border-primary hover:bg-primary/5 group transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div className="p-3 rounded-xl bg-secondary group-hover:bg-primary/10 transition-colors">
                        <method.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-foreground">{method.name}</p>
                        <p className="text-sm text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

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
