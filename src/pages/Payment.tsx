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
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/i18n/LanguageContext";

interface PaymentFormProps {
  email: string;
  setEmail: (value: string) => void;
  transactionCode: string;
  onVerify: () => void;
  isVerifying: boolean;
  plan: { name: string; price: string; billing: string };
  t: (key: string, params?: Record<string, string | number>) => string;
}

type PaymentMethodId = "card" | "qr" | "paypal";

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

const CardPaymentForm = ({
  email,
  setEmail,
  transactionCode,
  onVerify,
  isVerifying,
  t,
}: PaymentFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">{t("payment.cardDetails")}</h3>
      <div className="space-y-4">
        <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-3">
          <div>
            <Label htmlFor="cardEmail">{t("payment.email")}</Label>
            <Input
              id="cardEmail"
              type="email"
              placeholder={t("payment.emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 bg-secondary border-border focus:border-primary"
            />
          </div>
          <div>
            <Label>{t("payment.transactionCode")}</Label>
            <div className="mt-1.5 p-3 bg-primary/10 border border-primary/30 rounded-lg font-mono text-primary font-semibold">
              {transactionCode}
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="cardName">{t("payment.cardHolder")}</Label>
          <Input
            id="cardName"
            placeholder="John Doe"
            className="mt-1.5 bg-secondary border-border"
          />
        </div>
        <div>
          <Label htmlFor="cardNumber">{t("payment.cardNumber")}</Label>
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="mt-1.5 bg-secondary font-mono"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">{t("payment.expiry")}</Label>
            <Input
              id="expiry"
              placeholder="MM/YY"
              className="mt-1.5 bg-secondary"
            />
          </div>
          <div>
            <Label htmlFor="cvv">{t("payment.cvv")}</Label>
            <Input
              id="cvv"
              placeholder="123"
              type="password"
              className="mt-1.5 bg-secondary"
            />
          </div>
        </div>
        <Button
          onClick={onVerify}
          disabled={isVerifying || !email}
          className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
        >
          {isVerifying ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t("payment.payNow")
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const QRPaymentDisplay = ({
  email,
  setEmail,
  transactionCode,
  onVerify,
  isVerifying,
  plan,
  t,
}: PaymentFormProps) => {
  const getNumericPrice = (priceStr: string) => {
    if (priceStr === "$0") return 0;
    return 315000;
  };

  const BANK_CONFIG = {
    BANK_ID: "MB",
    ACCOUNT_NO: "0388644266",
    ACCOUNT_NAME: "NGUYEN TUAN TU",
    TEMPLATE: "qr_only",
  };

  const qrUrl = `https://img.vietqr.io/image/${BANK_CONFIG.BANK_ID}-${
    BANK_CONFIG.ACCOUNT_NO
  }-${BANK_CONFIG.TEMPLATE}.png?amount=${getNumericPrice(
    plan.price,
  )}&addInfo=${encodeURIComponent(transactionCode)}`;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">{t("payment.scanQR")}</h3>

      <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-3 mb-6">
        <div>
          <Label htmlFor="qrEmail">{t("payment.email")}</Label>
          <Input
            id="qrEmail"
            type="email"
            placeholder={t("payment.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 bg-secondary border-border focus:border-primary"
          />
        </div>
        <div>
          <Label>{t("payment.transactionCode")}</Label>
          <div className="mt-1.5 p-3 bg-primary/10 border border-primary/30 rounded-lg font-mono text-primary font-semibold text-center text-lg">
            {transactionCode}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {t("payment.includeCode")}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="bg-white p-4 rounded-xl shadow-inner">
          <div className="w-48 h-48 bg-white flex items-center justify-center relative overflow-hidden">
            <img
              alt="QR Code"
              src={qrUrl}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex-1 space-y-4 w-full">
          <div className="grid grid-cols-1 gap-2">
            <div className="p-3 bg-secondary/80 rounded-lg">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {t("payment.bankName")}
              </p>
              <p className="font-bold text-foreground">MB BANK</p>
            </div>
            <div className="p-3 bg-secondary/80 rounded-lg">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                {t("payment.accountNumber")}
              </p>
              <p className="font-bold text-foreground font-mono">
                0388 644 266
              </p>
            </div>
            <div className="p-3 bg-secondary/80 rounded-lg">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Amount
              </p>
              <p className="font-bold text-primary">
                {getNumericPrice(plan.price).toLocaleString()} VND
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onVerify}
        disabled={isVerifying || !email}
        className="w-full mt-6 bg-primary text-primary-foreground hover:bg-primary/90 glow-cyan"
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("payment.verifying")}
          </>
        ) : (
          t("payment.transferred")
        )}
      </Button>
      <p className="text-[10px] text-center text-muted-foreground mt-3 italic">
        {t("payment.autoActivate")}
      </p>
    </motion.div>
  );
};

const PayPalPaymentDisplay = ({
  email,
  setEmail,
  transactionCode,
  onVerify,
  isVerifying,
  t,
}: PaymentFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-6 mt-6"
    >
      <h3 className="text-lg font-semibold mb-4">{t("payment.paypalTitle")}</h3>
      <div className="p-4 bg-secondary/50 rounded-lg border border-border space-y-3 mb-6">
        <div>
          <Label htmlFor="paypalEmail">{t("payment.email")}</Label>
          <Input
            id="paypalEmail"
            type="email"
            placeholder={t("payment.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 bg-secondary"
          />
        </div>
        <div>
          <Label>{t("payment.transactionCode")}</Label>
          <div className="mt-1.5 p-3 bg-accent/10 border border-accent/30 rounded-lg font-mono text-accent font-semibold text-center">
            {transactionCode}
          </div>
        </div>
      </div>

      <div className="text-center py-6">
        <div className="w-20 h-20 mx-auto bg-accent rounded-full flex items-center justify-center mb-4">
          <span className="text-accent-foreground font-bold text-2xl">PP</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          {t("payment.paypalNote")}
        </p>
        <Button
          onClick={onVerify}
          disabled={isVerifying || !email}
          className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 w-full"
        >
          {isVerifying ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t("payment.continuePaypal")
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const generateTransactionCode = () => {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `GFOCUS-PRO-${randomPart}`;
};

const Payment = () => {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(
    null,
  );
  const [email, setEmail] = useState("");
  const [transactionCode] = useState(() => generateTransactionCode());
  const [isVerifying, setIsVerifying] = useState(false);

  const planKey = searchParams.get("plan") || "pro-monthly";
  const plan = planDetails[planKey] || planDetails["pro-monthly"];

  const paymentMethods = [
    {
      id: "card" as PaymentMethodId,
      name: t("payment.card"),
      icon: CreditCard,
      description: t("payment.cardDesc"),
    },
    {
      id: "qr" as PaymentMethodId,
      name: t("payment.qr"),
      icon: QrCode,
      description: t("payment.qrDesc"),
    },
    {
      id: "paypal" as PaymentMethodId,
      name: t("payment.paypal"),
      icon: Wallet,
      description: t("payment.paypalDesc"),
    },
  ];

  // const API_BASE = import.meta.env.VITE_API_BASE;
  const API_BASE = "http://127.0.0.1:5000";

  const handleVerify = async () => {
    if (!email || !email.includes("@"))
      return alert(t("payment.invalidEmail"));

    setIsVerifying(true);

    try {
      const confirmRes = await fetch(`${API_BASE}/confirm_transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transaction_note: transactionCode,
          email: email,
          plan: plan.name,
        }),
      });

      if (!confirmRes.ok) throw new Error("Cannot initialize transaction");

      const checkPayment = async () => {
        try {
          const response = await fetch(`${API_BASE}/check_payment_status`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transaction_note: transactionCode }),
          });

          const data = await response.json();
          console.log("Check status response:", data);

          if (data.status === "success") {
            setIsVerifying(false);
            alert(t("payment.success"));
            navigate("/");
            return true;
          }

          if (data.status === "failed") {
            setIsVerifying(false);
            alert(t("payment.failed"));
            return true;
          }

          return false;
        } catch (e) {
          console.error("Connection error:", e);
          return false;
        }
      };

      const isDone = await checkPayment();
      if (isDone) return;

      const intervalId = setInterval(async () => {
        const stop = await checkPayment();
        if (stop) clearInterval(intervalId);
      }, 5000);

      setTimeout(() => {
        clearInterval(intervalId);
        setIsVerifying(false);
      }, 600000);
    } catch (error) {
      console.error("Verification failed", error);
      alert(t("payment.error"));
      setIsVerifying(false);
    }
  };

  const renderPaymentContent = () => {
    const props = {
      email,
      setEmail,
      transactionCode,
      onVerify: handleVerify,
      isVerifying,
      plan,
      t,
    };
    switch (selectedMethod) {
      case "card":
        return <CardPaymentForm {...props} />;
      case "qr":
        return <QRPaymentDisplay {...props} />;
      case "paypal":
        return <PayPalPaymentDisplay {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t("payment.back")}</span>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 mb-8"
          >
            <h2 className="text-lg font-semibold mb-2">
              {t("payment.orderSummary")}
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gradient-cyan">
                  {t("payment.plan", { name: plan.name })}
                </p>
                <p className="text-muted-foreground">{plan.billing}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">{plan.price}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6">
              {t("payment.selectMethod")}
            </h2>
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
                        className={`p-3 rounded-xl ${
                          selectedMethod === method.id
                            ? "bg-primary/20 text-primary"
                            : "bg-secondary"
                        }`}
                      >
                        <method.icon className="w-6 h-6" />
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

          <AnimatePresence mode="wait">
            {renderPaymentContent()}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-8 text-sm text-muted-foreground"
          >
            <Shield className="w-4 h-4 text-accent" />
            <span>{t("payment.secured")}</span>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
