import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { ArrowRight, TrendingUp, Zap, Shield, CheckCircle2, Award, Sparkles, Car, Brain, Cpu, Target, Wrench, Calendar, MessageSquare, BarChart3, Clock, Users, Settings, AlertTriangle, Send, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI assistant. How can I help you with our automotive services?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simple bot responses based on keywords
    setTimeout(() => {
      let botResponse = "I'm here to help! Can you tell me more about your question?";
      if (input.toLowerCase().includes("diagnosis")) {
        botResponse = "Our AI-powered fault diagnosis analyzes vehicle data instantly. Would you like to know more?";
      } else if (input.toLowerCase().includes("booking")) {
        botResponse = "We offer predictive service booking with automated scheduling. Check our features section!";
      } else if (input.toLowerCase().includes("support")) {
        botResponse = "Our hybrid AI-human system handles queries 24/7. Visit the Support Hub for more.";
      }
      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };
=======
import { ArrowRight, TrendingUp, Zap, Shield, CheckCircle2, Award, Sparkles, Car, Brain, Cpu, Target, Wrench, Calendar, MessageSquare, BarChart3, Clock, Users, Settings, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
>>>>>>> 4bb993d175bce67980428d09b6c609226e690d1e

  const useCases = [
    {
      icon: AlertTriangle,
      title: "Intelligent Fault Diagnosis",
      description: "AI-powered pre-service screening that analyzes customer queries and vehicle data to provide instant diagnostic insights",
      benefits: ["30% faster diagnosis", "25% reduction in workshop time", "Optimized parts inventory", "Higher first-time fix rate"]
    },
    {
      icon: Calendar,
      title: "Predictive Service Booking",
      description: "ML-driven predictive maintenance analysis that proactively schedules services and books appointments",
      benefits: ["Prevents unexpected breakdowns", "Automated appointment scheduling", "Real-time cost breakdown", "Nearest dealership booking"]
    },
    {
      icon: Settings,
      title: "Workshop Management",
      description: "Real-time status updates and workflow integration that keeps customers informed throughout the service process",
      benefits: ["50% reduction in status calls", "Improved customer satisfaction", "Visual service updates", "Fewer disputes"]
    },
    {
      icon: MessageSquare,
      title: "Service Advisor Copilot",
      description: "Hybrid human-AI system that handles routine queries while seamlessly escalating complex issues to human advisors",
      benefits: ["3x increase in advisor capacity", "24/7 customer support", "Faster onboarding", "Scalable without hiring"]
    }
  ];

  const features = [
    {
      icon: Brain,
      title: "Decision Tree Intelligence",
      description: "Advanced AI that asks contextual questions based on historical repair data and vehicle telemetrics"
    },
    {
      icon: Wrench,
      title: "Pre-Service Screening",
      description: "Books correct specialist technicians and pre-orders likely parts before vehicle arrives"
    },
    {
      icon: BarChart3,
      title: "Predictive Analytics",
      description: "ML models analyze vehicle data to predict maintenance needs and prevent costly breakdowns"
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Automated status notifications with visual progress tracking and honest timeline estimates"
    },
    {
      icon: Users,
      title: "Human-AI Collaboration",
      description: "AI handles routine tasks while human experts focus on complex customer relationships"
    },
    {
      icon: Target,
      title: "Business Intelligence",
      description: "Comprehensive analytics dashboard with service metrics, efficiency tracking, and revenue insights"
    }
  ];

  const benefits = [
    "Intelligent fault diagnosis with decision tree questioning",
    "Predictive maintenance scheduling and parts optimization",
    "Real-time workshop status updates and customer notifications",
    "Hybrid AI-human service advisor support system",
    "Automated appointment booking with specialist matching",
    "Comprehensive business analytics and performance tracking"
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-border/20 backdrop-blur-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 group cursor-pointer transition-all duration-300 hover:scale-105">
              <img src="/logo_voice.png" alt="Voice Logo" className="w-15 h-14" />
              <div>
                <div className="text-2xl font-display font-bold text-foreground tracking-tight">Nuralytics</div>
                <div className="text-xs text-muted-foreground font-medium tracking-wider">AUTOMOTIVE INTELLIGENCE</div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#use-cases" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group">
                Solutions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
              </a>
              <a href="#features" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
              </a>
              <a href="#benefits" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group">
                Results
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
              </a>
              <Button
                onClick={() => navigate("/car-monitor")}
                variant="ghost"
                size="sm"
                className="text-sm font-semibold hover:scale-105 transition-transform"
              >
                <Car className="w-4 h-4 mr-2" />
                Vehicle Monitor
              </Button>
            </div>
            <Button
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl font-semibold hover:scale-105 transition-transform"
            >
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Premium Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 2%) 0%, hsl(0 0% 8%) 25%, hsl(0 0% 4%) 50%, hsl(0 0% 10%) 75%, hsl(0 0% 3%) 100%)",
        }}
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_80%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-primary/30 shadow-2xl">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground tracking-wide">POWERED BY NEURAL AI TECHNOLOGY</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.95] tracking-tight">
              <span className="text-foreground">Transform </span>
              <span className="gradient-text">Automotive</span>
              <br />
              <span className="gradient-text">Service</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light">
              AI-powered automotive service platform that diagnoses issues, predicts maintenance, 
              manages workshops, and enhances customer experiences
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-12">
              <Button
                onClick={() => navigate("/admin")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow group text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 shadow-2xl font-bold hover:scale-105 transition-transform"
              >
                Admin Command Center
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate("/support")}
                size="lg"
                variant="outline"
                className="border-2 border-primary/60 hover:bg-primary/10 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 backdrop-blur-xl font-bold hover:scale-105 transition-transform"
              >
                Support Hub
              </Button>
              <Button
                onClick={() => navigate("/car-monitor")}
                size="lg"
                variant="outline"
                className="border-2 border-primary/60 hover:bg-primary/10 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 backdrop-blur-xl group font-bold hover:scale-105 transition-transform"
              >
                <Car className="mr-2 sm:mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                Vehicle Monitor
              </Button>
            </div>


          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-40 bg-gradient-to-b from-background via-card/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block px-6 py-3 rounded-full glass border border-primary/30 mb-8">
              <span className="text-sm font-bold text-primary tracking-wider">FOUR CORE SOLUTIONS</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-6 text-foreground">Complete After Sales Service Ecosystem</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              End-to-end AI solutions that transform every aspect of automotive service delivery
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {useCases.map((useCase, i) => (
              <div
                key={i}
                className="glass p-12 rounded-3xl border-2 border-border/50 hover:border-primary/60 transition-all hover:shadow-2xl hover:shadow-primary/20 group backdrop-blur-xl hover:scale-105 hover:-translate-y-2"
              >
                <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all shadow-lg">
                  <useCase.icon className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-foreground">{useCase.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-8">{useCase.description}</p>
                <div className="space-y-3">
                  {useCase.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-40 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsl(var(--primary)/0.05),transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block px-6 py-3 rounded-full glass border border-primary/30 mb-8">
              <span className="text-sm font-bold text-primary tracking-wider">ADVANCED CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-6 text-foreground">Intelligent Features</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Cutting-edge AI technology that powers every aspect of automotive service excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass p-10 rounded-3xl border-2 border-border/50 hover:border-primary/60 transition-all hover:shadow-2xl hover:shadow-primary/20 group backdrop-blur-xl hover:scale-105 hover:-translate-y-2"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all shadow-lg">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section id="benefits" className="py-40 bg-gradient-to-b from-background via-card/40 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block px-6 py-3 rounded-full glass border border-primary/30 mb-8">
                <span className="text-sm font-bold text-primary tracking-wider">BUSINESS IMPACT</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-6 text-foreground">Measurable Results</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                Proven ROI through intelligent automation, predictive insights, and enhanced customer experiences
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-5 p-6 rounded-2xl hover:bg-card/50 transition-all hover:translate-x-2"
                  >
                    <CheckCircle2 className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                    <span className="text-base sm:text-lg md:text-xl text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-16 rounded-3xl border-2 border-primary/30 space-y-10 backdrop-blur-2xl shadow-2xl">
              {[
                { label: "Diagnostic Speed", value: 30, color: "primary", description: "Faster fault diagnosis" },
                { label: "Workshop Efficiency", value: 25, color: "primary", description: "Reduction in service time" },
                { label: "Service Capacity", value: 200, color: "primary", description: "Increase with AI copilot" }
              ].map((metric, i) => (
                <div key={i} className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground text-base sm:text-lg font-semibold">{metric.label}</span>
                      <div className="text-sm text-muted-foreground/70">{metric.description}</div>
                    </div>
                    <span className="text-3xl sm:text-4xl font-display font-black text-primary">+{metric.value}%</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-lg transition-all duration-1000 ease-out"
                      style={{ width: `${Math.min(metric.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
              <div className="pt-8 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <Award className="w-10 h-10 text-primary" />
                  <div>
                    <div className="text-xl font-bold text-foreground">Automotive Excellence</div>
                    <div className="text-muted-foreground">Trusted by leading dealerships</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Integration Section */}
      <section className="py-40 bg-gradient-to-b from-background via-card/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.03),transparent_60%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-block px-6 py-3 rounded-full glass border border-primary/30 mb-8">
                <span className="text-sm font-bold text-primary tracking-wider">SEAMLESS INTEGRATION</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-6 text-foreground">Complete Workflow</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                From initial customer inquiry to service completion - one intelligent system
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Customer Inquiry",
                  description: "AI analyzes customer questions and vehicle data using decision tree logic",
                  icon: MessageSquare
                },
                {
                  step: "02", 
                  title: "Predictive Analysis",
                  description: "ML models predict maintenance needs and recommend proactive services",
                  icon: Brain
                },
                {
                  step: "03",
                  title: "Service Booking",
                  description: "Automated appointment scheduling with specialist matching and parts ordering",
                  icon: Calendar
                },
                {
                  step: "04",
                  title: "Real-time Updates",
                  description: "Continuous status notifications with visual progress tracking",
                  icon: Clock
                }
              ].map((step, i) => (
                <div key={i} className="relative">
                  <div className="glass p-8 rounded-3xl border-2 border-border/50 hover:border-primary/60 transition-all hover:shadow-xl group backdrop-blur-xl">
                    <div className="text-6xl font-display font-black text-primary/20 mb-4">{step.step}</div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-display font-bold mb-4 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_70%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-foreground leading-tight">
              Transform Your Service Operations
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join leading automotive service providers using AI to deliver exceptional customer experiences
            </p>
            <div className="pt-8">
              <Button
                onClick={() => navigate("/auth")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg md:text-xl px-10 sm:px-14 md:px-16 py-6 sm:py-8 md:py-10 shadow-2xl font-bold glow hover:scale-105 transition-transform"
              >
                Start Your Transformation
                <ArrowRight className="ml-3 sm:ml-4 w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="relative border-t border-border/30 bg-gradient-to-b from-card/50 to-background backdrop-blur-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.03),transparent_60%)]" />

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              {/* Brand Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl">
                    <Brain className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-2xl font-display font-bold text-foreground">Nuralytics</div>
                    <div className="text-xs text-muted-foreground font-semibold tracking-wider">AUTOMOTIVE INTELLIGENCE</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Transforming automotive service through intelligent fault diagnosis, predictive maintenance, 
                  workshop management, and AI-powered customer support solutions.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: "M", label: "Twitter" },
                    { icon: "in", label: "LinkedIn" },
                    { icon: "f", label: "Facebook" }
                  ].map((social, i) => (
                    <button
                      key={i}
                      className="w-12 h-12 rounded-xl bg-card hover:bg-primary/10 border border-border/50 hover:border-primary/50 flex items-center justify-center transition-all hover:scale-110 hover:-translate-y-1"
                    >
                      <span className="text-primary font-bold">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-6">Solutions</h3>
                <div className="space-y-3">
                  {["Fault Diagnosis", "Predictive Maintenance", "Workshop Management", "Service Copilot"].map((link, i) => (
                    <a
                      key={i}
                      href="#use-cases"
                      className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-6">Company</h3>
                <div className="space-y-3">
                  {["About Us", "Careers", "Contact", "Blog"].map((link, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

            {/* Bottom Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-muted-foreground text-sm font-medium">
                © 2025 Nuralytics. All rights reserved. Redefining Automotive Intelligence.
              </p>
              <div className="flex gap-8">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors hover:-translate-y-1"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
<<<<<<< HEAD

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen && (
          <Button
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl hover:scale-110 transition-transform"
          >
            <MessageSquare className="w-8 h-8 text-primary-foreground" />
          </Button>
        )}
        {chatOpen && (
          <div className="w-80 h-96 bg-card border border-border/50 rounded-2xl shadow-2xl flex flex-col backdrop-blur-xl">
            <div className="flex items-center justify-between p-4 border-b border-border/50">
              <div className="flex items-center gap-2">
                <Brain className="w-6 h-6 text-primary" />
                <span className="font-bold text-foreground">AI Assistant</span>
              </div>
              <Button
                onClick={() => setChatOpen(false)}
                variant="ghost"
                size="sm"
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border/50 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button onClick={handleSend} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
=======
>>>>>>> 4bb993d175bce67980428d09b6c609226e690d1e
    </div>
  );
};

export default Landing;