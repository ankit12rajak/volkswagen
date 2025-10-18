import { Button } from "@/components/ui/button";
import { ArrowRight, Bot, TrendingUp, Zap, Shield, Phone, BarChart3, CheckCircle2, Award, Sparkles, Car, Brain, Cpu, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import vwCar from "@/assets/vw-car.png";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium gradient animation
      gsap.to(heroRef.current, {
        backgroundPosition: "400% 0%",
        duration: 30,
        repeat: -1,
        ease: "none"
      });

      // Epic headline reveal
      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".char");
        gsap.from(chars, {
          opacity: 0,
          y: 120,
          rotateX: -90,
          stagger: 0.03,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.3
        });

        gsap.to(chars, {
          textShadow: "0 0 30px rgba(255,255,255,0.5)",
          stagger: 0.03,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // Floating cars with premium motion
      const cars = document.querySelectorAll(".passing-car");
      cars.forEach((car, i) => {
        const tl = gsap.timeline({
          repeat: -1,
          delay: i * 6,
          repeatDelay: (cars.length - 1) * 6
        });

        tl.set(car, { x: "-150%", opacity: 0, scale: 0.8, rotateY: -20 })
          .to(car, { 
            x: "-70%", 
            opacity: 0.4,
            scale: 1,
            rotateY: 0,
            duration: 2,
            ease: "power2.out"
          })
          .to(car, { 
            x: "220%", 
            opacity: 0,
            scale: 0.8,
            rotateY: 20,
            duration: 10,
            ease: "power1.inOut"
          });
      });

      // Premium particle system
      const particles = particlesRef.current?.querySelectorAll(".particle");
      if (particles) {
        particles.forEach((particle) => {
          gsap.to(particle, {
            y: gsap.utils.random(-150, -50),
            x: gsap.utils.random(-80, 80),
            opacity: gsap.utils.random(0.2, 0),
            scale: gsap.utils.random(0.5, 1.5),
            duration: gsap.utils.random(3, 6),
            repeat: -1,
            delay: gsap.utils.random(0, 3),
            ease: "sine.inOut"
          });
        });
      }

      // Feature cards with stagger
      gsap.utils.toArray(".feature-card").forEach((card: any, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 120,
          opacity: 0,
          rotateX: -30,
          duration: 1.2,
          delay: i * 0.1,
          ease: "power3.out"
        });
      });

      // Glow pulse animation on logo
      gsap.to(".logo-glow", {
        boxShadow: "0 0 60px rgba(255,255,255,0.4), 0 0 120px rgba(255,255,255,0.2)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Neural Intelligence",
      description: "Advanced AI that learns from every interaction, delivering hyper-personalized automotive insights"
    },
    {
      icon: TrendingUp,
      title: "Sentiment Mastery",
      description: "Real-time emotion detection with 99% accuracy to elevate customer experience instantly"
    },
    {
      icon: Zap,
      title: "Lightning Resolution",
      description: "Resolve queries 70% faster with predictive AI and seamless workflow automation"
    },
    {
      icon: Shield,
      title: "Enterprise Fortress",
      description: "Military-grade security with full compliance for the most demanding automotive standards"
    },
    {
      icon: Cpu,
      title: "Quantum Integration",
      description: "Seamlessly connects with any system—CRM, ticketing, or legacy platforms"
    },
    {
      icon: Target,
      title: "Precision Analytics",
      description: "Real-time insights with predictive modeling and actionable intelligence dashboards"
    }
  ];

  const benefits = [
    "24/7 AI-powered assistance across all channels",
    "Multilingual mastery in 75+ languages",
    "Instant vehicle diagnostics and history",
    "Autonomous appointment orchestration",
    "Real-time service tracking and notifications",
    "Predictive maintenance with AI forecasting"
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Ultra-Premium Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 glass border-b border-border/20 backdrop-blur-2xl"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="logo-glow w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <div className="text-2xl font-playfair font-bold text-foreground tracking-tight">Nuralytics</div>
                <div className="text-xs text-muted-foreground font-medium tracking-wider">AUTOMOTIVE INTELLIGENCE</div>
              </div>
            </motion.div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
              </a>
              <a href="#benefits" className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors relative group">
                Benefits
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
              </a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => navigate("/car-monitor")}
                  variant="ghost"
                  size="sm"
                  className="text-sm font-semibold"
                >
                  <Car className="w-4 h-4 mr-2" />
                  Vehicle Monitor
                </Button>
              </motion.div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={() => navigate("/auth")} 
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl font-semibold"
              >
                Sign In
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hyper-Premium Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        style={{
          background: "linear-gradient(135deg, hsl(0 0% 2%) 0%, hsl(0 0% 8%) 25%, hsl(0 0% 4%) 50%, hsl(0 0% 10%) 75%, hsl(0 0% 3%) 100%)",
          backgroundSize: "400% 400%"
        }}
      >
        {/* Premium Particles */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="particle absolute rounded-full"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: `radial-gradient(circle, rgba(255,255,255,${Math.random() * 0.5 + 0.3}), transparent)`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Cinematic Passing Cars */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[400px] pointer-events-none overflow-hidden">
          {[
            { hue: 200, color: "rgba(59, 130, 246, 0.6)" },
            { hue: 330, color: "rgba(239, 68, 68, 0.6)" },
            { hue: 150, color: "rgba(34, 197, 94, 0.6)" },
            { hue: 270, color: "rgba(168, 85, 247, 0.6)" },
            { hue: 20, color: "rgba(249, 115, 22, 0.6)" },
          ].map((car, i) => (
            <div key={i} className="passing-car absolute top-1/2 -translate-y-1/2 w-[600px] opacity-0">
              <img 
                src={vwCar} 
                alt="" 
                className="w-full h-auto"
                style={{
                  filter: `hue-rotate(${car.hue}deg) saturate(1.8) brightness(1.3) drop-shadow(0 0 60px ${car.color})`,
                  transform: "perspective(1000px)"
                }}
              />
            </div>
          ))}
        </div>

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_80%)]" />

        <motion.div 
          className="container mx-auto px-6 relative z-10"
          style={{ opacity, scale }}
        >
          <div className="max-w-6xl mx-auto text-center space-y-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-primary/30 shadow-2xl"
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold text-foreground tracking-wide">POWERED BY NEURAL AI TECHNOLOGY</span>
            </motion.div>
            
            <h1 
              ref={headlineRef}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-playfair font-black leading-[0.95] tracking-tight"
            >
              {"Redefine".split("").map((char, i) => (
                <span key={`redefine-${i}`} className="char inline-block text-foreground">{char}</span>
              ))}{" "}
              {"Automotive".split("").map((char, i) => (
                <span key={`automotive-${i}`} className="char inline-block gradient-text">{char}</span>
              ))}{" "}
              <br />
              {"Excellence".split("").map((char, i) => (
                <span key={`excellence-${i}`} className="char inline-block gradient-text">{char}</span>
              ))}
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light"
            >
              Neural AI-powered automotive intelligence that understands emotions, predicts needs, 
              and delivers unparalleled customer experiences
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-12"
            >
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => navigate("/admin")} 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground glow group text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 shadow-2xl font-bold"
                >
                  Admin Command Center
                  <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => navigate("/support")} 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary/60 hover:bg-primary/10 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 backdrop-blur-xl font-bold"
                >
                  Support Hub
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={() => navigate("/car-monitor")} 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary/60 hover:bg-primary/10 text-base sm:text-lg md:text-xl px-8 sm:px-10 md:px-12 py-6 backdrop-blur-xl group font-bold"
                >
                  <Car className="mr-2 sm:mr-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  Vehicle Monitor
                </Button>
              </motion.div>
            </motion.div>

            {/* Ultra-Premium Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="grid grid-cols-3 gap-10 pt-24 max-w-5xl mx-auto"
            >
              {[
                { value: "70%", label: "Faster Resolution", icon: Zap },
                { value: "99%", label: "Customer Satisfaction", icon: Award },
                { value: "24/7", label: "Neural Availability", icon: Shield }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.1, rotateY: 5 }}
                  className="glass p-10 rounded-3xl border-2 border-primary/30 hover:border-primary/60 transition-all shadow-2xl hover:shadow-primary/20 backdrop-blur-2xl"
                >
                  <stat.icon className="w-10 h-10 text-primary mx-auto mb-4 glow" />
                  <div className="text-4xl sm:text-5xl md:text-6xl font-playfair font-black gradient-text mb-3">{stat.value}</div>
                  <div className="text-sm sm:text-base text-muted-foreground font-bold tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Premium Features Section */}
      <section id="features" className="py-40 bg-gradient-to-b from-background via-card/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <div className="inline-block px-6 py-3 rounded-full glass border border-primary/30 mb-8">
              <span className="text-sm font-bold text-primary tracking-wider">ENTERPRISE-GRADE CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-black mb-6 text-foreground">Built for Perfection</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Revolutionary AI-powered solutions engineered for the future of automotive intelligence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="feature-card glass p-10 rounded-3xl border-2 border-border/50 hover:border-primary/60 transition-all hover:shadow-2xl hover:shadow-primary/20 group backdrop-blur-xl"
              >
                <motion.div 
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-all shadow-lg"
                >
                  <feature.icon className="w-10 h-10 text-primary" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold mb-4 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Benefits Section */}
      <section id="benefits" className="py-40 bg-gradient-to-b from-background via-card/30 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsl(var(--primary)/0.05),transparent_50%)]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-6 py-3 rounded-full glass border border-primary/30 mb-8">
                <span className="text-sm font-bold text-primary tracking-wider">CUSTOMER EXCELLENCE</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-black mb-6 text-foreground">Transform Every Interaction</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
                Deliver experiences that create lifetime customer loyalty and unprecedented satisfaction
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 10 }}
                    className="flex items-start gap-5 p-6 rounded-2xl hover:bg-card/50 transition-all"
                  >
                    <CheckCircle2 className="w-7 h-7 text-primary mt-1 flex-shrink-0" />
                    <span className="text-base sm:text-lg md:text-xl text-foreground font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="glass p-16 rounded-3xl border-2 border-primary/30 space-y-10 backdrop-blur-2xl shadow-2xl"
            >
              {[
                { label: "Resolution Speed", value: 70, color: "primary" },
                { label: "Customer Satisfaction", value: 99, color: "primary" },
                { label: "Cost Efficiency", value: 55, color: "primary" }
              ].map((metric, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-base sm:text-lg font-semibold">{metric.label}</span>
                    <span className="text-3xl sm:text-4xl font-playfair font-black text-primary">+{metric.value}%</span>
                  </div>
                  <div className="h-4 bg-muted rounded-full overflow-hidden shadow-inner">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${metric.value}%` }}
                      transition={{ delay: i * 0.2 + 0.3, duration: 1.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full shadow-lg" 
                    />
                  </div>
                </motion.div>
              ))}
              <div className="pt-8 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <Award className="w-10 h-10 text-primary" />
                  <div>
                    <div className="text-xl font-bold text-foreground">Industry Leader</div>
                    <div className="text-muted-foreground">Trusted by Fortune 500 companies</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1),transparent_70%)]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-black text-foreground leading-tight">
              Ready to Experience the Future?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join the revolution in automotive intelligence and transform your customer service today
            </p>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }} 
              whileTap={{ scale: 0.95 }}
              className="pt-8"
            >
              <Button 
                onClick={() => navigate("/auth")} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-base sm:text-lg md:text-xl px-10 sm:px-14 md:px-16 py-6 sm:py-8 md:py-10 shadow-2xl font-bold glow"
              >
                Get Started Now
                <ArrowRight className="ml-3 sm:ml-4 w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
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
                    <div className="text-2xl font-playfair font-bold text-foreground">Nuralytics</div>
                    <div className="text-xs text-muted-foreground font-semibold tracking-wider">AUTOMOTIVE INTELLIGENCE</div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Pioneering the future of automotive intelligence with neural AI technology. 
                  Transform your customer service experience with unparalleled precision and insight.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: "M", label: "Twitter" },
                    { icon: "in", label: "LinkedIn" },
                    { icon: "f", label: "Facebook" }
                  ].map((social, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-12 h-12 rounded-xl bg-card hover:bg-primary/10 border border-border/50 hover:border-primary/50 flex items-center justify-center transition-all"
                    >
                      <span className="text-primary font-bold">{social.icon}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-6">Platform</h3>
                <div className="space-y-3">
                  {["Features", "Benefits", "Pricing", "Documentation"].map((link, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ x: 5 }}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Company */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground mb-6">Company</h3>
                <div className="space-y-3">
                  {["About Us", "Careers", "Contact", "Blog"].map((link, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      whileHover={{ x: 5 }}
                      className="block text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </motion.a>
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
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -2 }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </footer>
    </div>
  );
};

export default Landing;
