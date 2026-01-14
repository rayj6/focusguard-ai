import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Mail, Phone, User, Users, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EnterpriseContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnterpriseContactModal = ({ isOpen, onClose }: EnterpriseContactModalProps) => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    teamSize: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        teamSize: "",
        message: "",
      });
    }, 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="glass-card p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-accent/10">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Contact Sales</h2>
                    <p className="text-sm text-muted-foreground">Get Enterprise pricing</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">
                    Our sales team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Company Name */}
                  <div>
                    <Label htmlFor="companyName" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                      placeholder="Your company name"
                      required
                      className="mt-1.5 bg-secondary border-border focus:border-primary"
                    />
                  </div>

                  {/* Contact Name */}
                  <div>
                    <Label htmlFor="contactName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Your Name
                    </Label>
                    <Input
                      id="contactName"
                      value={formData.contactName}
                      onChange={(e) => handleChange("contactName", e.target.value)}
                      placeholder="John Doe"
                      required
                      className="mt-1.5 bg-secondary border-border focus:border-primary"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="mt-1.5 bg-secondary border-border focus:border-primary"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 234 567 890"
                        className="mt-1.5 bg-secondary border-border focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Team Size */}
                  <div>
                    <Label htmlFor="teamSize" className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      Team Size
                    </Label>
                    <Input
                      id="teamSize"
                      value={formData.teamSize}
                      onChange={(e) => handleChange("teamSize", e.target.value)}
                      placeholder="e.g., 10-50 employees"
                      required
                      className="mt-1.5 bg-secondary border-border focus:border-primary"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Additional Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us about your needs..."
                      rows={3}
                      className="mt-1.5 bg-secondary border-border focus:border-primary resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 glow-emerald mt-6"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting, you agree to our Privacy Policy and Terms of Service.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EnterpriseContactModal;
