import React, { useState } from 'react';
import {
  Menu,
  X,
  ArrowDown,
  ShieldCheck,
  Wallet,
  Clock,
  Stethoscope,
  TrendingUp,
  BadgeCheck,
  ClipboardPlus,
  Pointer,
  Check,
  MapPin,
  Quote,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  Lock,
  AlertTriangle,
  Phone,
  MessageCircle,
  Mail,
  IndianRupee,
  Heart,
  Users,
  Megaphone
} from 'lucide-react';


const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", 
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/api/v1';

const AffiliateProgram = () => {
  const [onboardingStep, setOnboardingStep] = useState(1); // 1: Form, 2: SMS Verification
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    state: '',
    city: '',
    experience: '',
    occupation: '',
    reason: '',
    clinicName: '',
    clinicAddress: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patientsPerDay, setPatientsPerDay] = useState(20);

  // Custom calculator based on integrated lab affiliate revenue
  const calculateCommissions = (dailyPatients) => {
    // 240% LTV Boost: Basic Scan Referral (₹600) + Lab/Diagnostic Referral (₹1400)
    const avgRevenuePerLead = 2000;
    const convRate = 0.25;
    const days = 25;
    const monthlyVolume = dailyPatients * convRate * avgRevenuePerLead * days;

    let rate = 0.25;
    if (monthlyVolume >= 3000000) rate = 0.35;
    else if (monthlyVolume >= 1000000) rate = 0.30;

    return {
      volume: monthlyVolume,
      earnings: Math.round(monthlyVolume * rate),
      rate: rate * 100
    };
  };

  const { volume: monthlyVolume, earnings: monthlyEarnings, rate: currentRate } = calculateCommissions(patientsPerDay);
  const yearlyEarnings = monthlyEarnings * 12;

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName) tempErrors.fullName = "Full Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email address is invalid";
    }
    if (!formData.phone) {
      tempErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      tempErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (!formData.state) tempErrors.state = "Please select a state";
    if (!formData.city) tempErrors.city = "Please select a city";
    if (!formData.reason) tempErrors.reason = "Please provide your reason for interesting";
    if (!formData.clinicName) tempErrors.clinicName = "Clinic/Hospital Name is required";
    if (!formData.clinicAddress) tempErrors.clinicAddress = "Clinic/Hospital Address is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      setApiError('');
      try {
        const response = await fetch(`${API_URL}/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            formData: formData
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setOnboardingStep(2);
        } else {
          setApiError(data.error || 'Failed to send OTP. Please try again.');
        }
      } catch (err) {
        setApiError('Server connection failed. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    setApiError('');
    try {
      const response = await fetch(`${API_URL}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          otp: otp,
          formData: formData
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          state: '',
          city: '',
          experience: '',
          occupation: '',
          reason: '',
          clinicName: '',
          clinicAddress: '',
        });
        setErrors({});
        setOtp('');
      } else {
        setApiError(data.error || 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      setApiError('Verification failed. Please try again later.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div id="affiliate" className="font-sans text-text-light bg-white overflow-x-hidden">

      {/* Navbar with Logo */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/oxxy_logo.png" alt="Oxxy Logo" className="h-10 object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-8 font-medium text-sm text-gray-700">
            <a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#benefits" className="hover:text-primary transition-colors">Features</a>
            <a href="#apply-form" className="px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Apply Now</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-100 shadow-xl absolute top-20 left-0 w-full flex flex-col p-6 gap-6 font-medium text-lg text-gray-800 transition-all z-40">
            <a
              href="#how-it-works"
              className="hover:text-primary border-b border-gray-50 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#benefits"
              className="hover:text-primary border-b border-gray-50 pb-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#apply-form"
              className="px-6 py-3 bg-primary text-white text-center rounded-full hover:bg-primary-dark transition-all shadow-md mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Apply Now
            </a>
          </div>
        )}
      </nav>

      {/* 1. Hero Section */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-24 px-6 bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center lg:min-h-screen">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex flex-col items-start text-left">
            <span className="inline-block bg-white text-primary-dark px-4 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold mb-6 md:mb-8 shadow-sm border border-green-100 flex items-center gap-2">
              <span className="text-lg md:text-xl">🇮🇳</span> Exclusive Opportunity for Doctors & Chemists
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-4 md:mb-6 leading-tight text-gray-900 tracking-tight">
              🚀 Join the Oxxy <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-custom">
                Affiliate Program
              </span>
            </h1>
            <p className="text-lg md:text-2xl mb-8 md:mb-10 font-medium text-gray-600 max-w-2xl text-left">
              For Doctors, Pharmacy Owners, & Pathlab Owners who want to Empower Patients and Grow Their Revenue.
            </p>

            <a
              href="#apply-form"
              className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-white text-primary font-bold rounded-2xl text-lg md:text-xl hover:bg-gray-50 transition-all shadow-lg md:shadow-xl hover:shadow-2xl border-2 border-primary transform hover:-translate-y-1 w-full md:w-auto"
            >
              Apply Now - Limited Slots
              <ArrowDown className="ml-2 animate-bounce" />
            </a>
          </div>

          <div className="relative mt-10 lg:mt-0 w-full max-w-xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-teal-custom rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
            <img
              src="/hero-image.png"
              alt="Healthcare Professionals"
              className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border-4 border-white object-cover aspect-[4/3] transform hover:-translate-y-2 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-fit md:max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-6 md:gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-3 font-semibold text-gray-700">
            <ShieldCheck className="text-green-600 text-3xl" />
            100% Data Privacy Compliant
          </div>
          <div className="flex items-center gap-3 font-semibold text-gray-700">
            <Wallet className="text-blue-600 text-3xl" />
            Zero Setup Cost
          </div>
          <div className="flex items-center gap-3 font-semibold text-gray-700">
            <Clock className="text-purple-600 text-3xl" />
            24-Hour Automated Payouts
          </div>
        </div>
      </section>

      {/* 2. Overview Section: "What Is Oxxy?" */}
      <section id="about" className="py-24 px-6 relative bg-white overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-custom/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 text-left">
            <span className="inline-block bg-primary/10 text-primary-dark px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-primary/20">The Vision</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-custom">Healthcare Access</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light mb-8">
              Oxxy is India's largest healthcare network, bringing affordable and accessible medical services to millions. As an Oxxy-partnered Doctor, Chemist, Lab Owner, or Clinic Owner, you empower your patients with tremendous savings on their medical bills while simultaneously establishing a highly profitable, recurring revenue stream.
            </p>
            <div className="flex items-center gap-4 text-primary font-bold bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
              <TrendingUp className="text-3xl" />
              It's practice-growth fueled by genuine patient care.
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-teal-custom blur-2xl opacity-20 rounded-[40px] transform rotate-3 delay-150 transition-all duration-1000"></div>
            <div className="bg-white/80 backdrop-blur-xl border border-white p-8 md:p-10 rounded-[40px] shadow-2xl relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-green-50 rounded-3xl p-6 text-center shadow-inner">
                  <div className="text-4xl md:text-6xl font-bold text-primary mb-2">12,000+</div>
                  <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-600">Active Clinics</div>
                </div>
                <div className="bg-teal-50 rounded-3xl p-6 text-center shadow-inner">
                  <div className="text-4xl md:text-6xl font-bold text-teal-600 mb-2">100k+</div>
                  <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-600">Happy Patients</div>
                </div>
                <div className="col-span-1 sm:col-span-2 bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-primary/30 transition-colors text-center sm:text-left">
                  <div>
                    <div className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary transition-colors">Fantastic ROI</div>
                    <div className="text-xs sm:text-sm text-gray-500 font-medium">For every partnered medical professional</div>
                  </div>
                  <BadgeCheck className="text-primary text-5xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Workflow Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50 border-t border-b border-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')] opacity-40 mix-blend-multiply"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <span className="inline-block bg-white text-gray-600 px-5 py-2 rounded-full text-sm font-bold mb-6 border border-gray-200 shadow-sm">Simple 3-Step Process</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-24 tracking-tight">
            Seamlessly Fits Your <span className="text-primary italic">Practice</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12 relative">
            {/* Connecting dashed line - desktop only */}
            <div className="hidden md:block absolute top-[50px] left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-gray-300 -z-10"></div>

            {/* Step 1 */}
            <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-lg relative z-10 group hover:-translate-y-4 transition-all duration-300 hover:shadow-2xl hover:border-green-200 mx-auto w-full max-w-sm">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">1</div>
              <div className="w-24 h-24 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-[6px] border-white group-hover:scale-110 transition-transform duration-300">
                <ClipboardPlus className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Patient Visits</h3>
              <p className="text-gray-500 leading-relaxed font-medium">The patient visits your clinic for consultation or purchases medicine from your pharmacy as usual.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-[32px] p-10 border border-gray-100 shadow-lg relative z-10 group hover:-translate-y-4 transition-all duration-300 hover:shadow-2xl hover:border-teal-200 mx-auto w-full max-w-sm">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">2</div>
              <div className="w-24 h-24 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-[6px] border-white group-hover:scale-110 transition-transform duration-300">
                <Pointer className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Activate Scans</h3>
              <p className="text-gray-500 leading-relaxed font-medium">Your staff quickly scans their details into the Oxxy network, granting them an instant discount membership for all future diagnostics.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-b from-white to-green-50/50 rounded-[32px] p-10 border border-green-100 shadow-xl relative z-10 group hover:-translate-y-4 transition-all duration-300 hover:shadow-2xl transform md:scale-105 border-b-[6px] border-b-primary mx-auto w-full max-w-sm">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-lg">3</div>
              <div className="w-24 h-24 bg-gradient-to-tr from-primary to-teal-custom text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-[6px] border-white group-hover:rotate-12 transition-transform duration-300">
                <IndianRupee className="text-4xl" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-primary-dark">They Save, You Earn</h3>
              <p className="text-gray-700 font-semibold leading-relaxed">
                The patient saves massively on future diagnostics, treatments and lab tests. You earn an instant, recurring commission automatically.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Benefits Grid */}
      <section id="benefits" className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              The Oxxy Advantage
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-600 max-w-3xl mx-auto">
              Everything you need to grow your practice, retain patients, and unlock new revenue streams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Lock, title: 'City Lock-in Rights', desc: 'Secure exclusive Oxxy rights in your city. Be the premier healthcare provider with access to our network.' },
              { icon: IndianRupee, title: 'Tiered Commission 💰', desc: 'Earn up to 35% commission. The more volume you drive, the higher your cut per patient.' },
              { icon: Heart, title: 'Patient Retention', desc: 'Provide unmatched diagnostic and surgical savings, ensuring your patients always return to you.' },
              { icon: Users, title: 'Dedicated Support', desc: 'Get a dedicated account manager to assist your clinic and staff directly via WhatsApp and calls.' },
              { icon: Megaphone, title: 'Clinic Branding Materials', desc: 'Ready-made standees, desk-brochures, and digital creatives for your clinic or pharmacy.' },
              { icon: BadgeCheck, title: 'Trusted Network', desc: 'Join a rapidly growing medical ecosystem built for doctors, trusted by millions of patients.' },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all text-left">
                <div className="w-14 h-14 bg-green-50 text-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Earnings Simulator */}
      <section id="simulator" className="py-24 px-6 bg-[#091524] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-20"></div>
        <div className="absolute -top-[20%] -left-[10%] w-96 h-96 bg-primary/30 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-96 h-96 bg-teal-custom/30 rounded-full blur-[120px]"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Calculate Your Additional Revenue
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
              See how integrating Oxxy into your daily practice can compound into a massive passive income stream over the year.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className={`p-4 rounded-xl border transition-all ${currentRate === 25 ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5 border-white/10 opacity-40'}`}>
                <div className="text-xl font-bold">25%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Base Tier</div>
              </div>
              <div className={`p-4 rounded-xl border transition-all ${currentRate === 30 ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5 border-white/10 opacity-40'}`}>
                <div className="text-xl font-bold">30%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Silver Tier</div>
              </div>
              <div className={`p-4 rounded-xl border transition-all ${currentRate === 35 ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-white/5 border-white/10 opacity-40'}`}>
                <div className="text-xl font-bold">35%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Gold Tier</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl text-left">
              <label className="block text-lg font-medium mb-6">
                Professional Network Conversions: <span className="text-primary font-bold text-2xl ml-2">{patientsPerDay} / day</span>
              </label>
              <input
                type="range"
                min="5" max="300" step="5"
                value={patientsPerDay}
                onChange={(e) => setPatientsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary mb-10"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 p-5 rounded-2xl border border-white/10">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Estimated Sales Volume</p>
                  <p className="text-3xl font-bold text-white">₹{monthlyVolume.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-primary mt-2 flex items-center gap-1 font-bold">
                    <TrendingUp className="w-3 h-3" /> {currentRate}% Affiliate Cut
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary to-teal-custom p-5 rounded-2xl shadow-xl border border-white/20">
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest mb-1">Your projected monthly affiliate income</p>
                  <p className="text-3xl font-bold text-white">₹{monthlyEarnings.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 mt-6 font-medium">
                *Tiers: 25% (up to 10L), 30% (10L-30L), 35% (30L+).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Who Is This For?" Section */}
      <section className="bg-green-50/40 py-24 px-6 border-t border-b border-green-100/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12">
            Who Is This For?
          </h2>

          <div className="bg-white border-t-4 border-primary rounded-3xl shadow-lg p-10 md:p-14 text-left">
            <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
              You are a perfect fit if...
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                "You are an established Doctor, Lab Owner, Clinic Owner, or Chemist.",
                "You are an Insurance Broker looking to provide healthcare add-on products.",
                "You want to drive standalone sales of premium healthcare memberships.",
                "You want to provide high-value healthcare savings to your patients and customers.",
                "You are looking to build a reliable, recurring revenue stream alongside your practice.",
                "You want to secure exclusive Oxxy partnership rights in your specific city.",
                "You are ready to enhance your local patient/customer retention.",
                "You want outsized returns for your trusted local influence."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="text-primary text-sm font-bold" />
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. City-Level Exclusivity Section */}
      <section className="py-24 px-6 bg-white max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
          🔐 City-Level Exclusivity
        </h2>
        <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto font-light">
          We strictly limit the number of franchise partners per geographical area to ensure your absolute success and market dominance. Once slots are filled, they are closed indefinitely.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tier: 'Metro Cities', limit: '3 Partners Only', desc: 'High density urban areas with massive potential audience.', cities: ['Delhi NCR', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune'], pop: true },
            { tier: 'Tier 2 Cities', limit: '2 Partners Only', desc: 'Emerging IT and business hubs with rapid growth.', cities: ['Indore', 'Surat', 'Lucknow', 'Kanpur', 'Jaipur', 'Nagpur'], pop: false },
            { tier: 'Tier 3 Cities', limit: '1 Partner Only', desc: 'Growing districts requiring localized, grassroots impact.', cities: ['Panipat', 'Ujjain', 'Ajmer', 'Bikaner', 'Meerut', 'Agra'], pop: false },
          ].map((tier, idx) => (
            <div key={idx} className={`bg-white rounded-3xl p-10 text-left relative transition-all duration-300 group cursor-pointer ${tier.pop ? 'border-2 border-primary shadow-xl scale-105 z-10' : 'border border-gray-200 shadow-sm mt-4 md:mt-0 max-md:scale-100 max-md:z-0 hover:border-primary hover:shadow-2xl hover:-translate-y-2 hover:z-20'}`}>
              {tier.pop && (
                <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1.5 px-6 rounded-bl-xl rounded-tr-xl shadow-sm">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors duration-300">{tier.tier}</h3>
              <div className="text-primary font-semibold mb-6 text-sm bg-primary/10 py-2 px-4 rounded-lg inline-block">
                {tier.limit}
              </div>
              <p className="text-gray-600 text-sm mb-6">{tier.desc}</p>
              <ul className="text-gray-700 font-medium space-y-4 mb-8 text-left border-t border-gray-100 pt-6">
                {tier.cities.map((city, cIdx) => (
                  <li key={cIdx} className="flex items-center gap-3">
                    <MapPin className="text-primary text-lg transition-transform duration-300 group-hover:scale-125" />
                    {city}
                  </li>
                ))}
              </ul>
              <a href="#apply-form" className={`block w-full text-center py-3 rounded-xl font-bold transition-all duration-300 ${tier.pop ? 'bg-primary text-white hover:bg-primary-dark shadow-md' : 'bg-gray-100 text-gray-900 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg'}`}>
                Claim Your City
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Trusted by Over 12,000+ Clinics & Pharmacies
            </h2>
            <p className="text-lg text-gray-600">
              Real results from medical professionals who integrated Oxxy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative pt-12">
              <div className="absolute -top-6 left-8 bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white shadow-lg text-2xl">
                <Quote className="" />
              </div>
              <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                "Integrating Oxxy was frictionless. It takes our receptionist 30 seconds to sign up a patient, and they love the diagnostic discounts. My clinic's secondary revenue jumped by 40% in just 3 months without any extra infrastructure."
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">Dr</div>
                <div>
                  <h4 className="font-bold text-gray-900">Dr. Rajesh Khanna</h4>
                  <p className="text-sm text-gray-500">Pediatric Clinic Owner, Delhi NCR</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative pt-12">
              <div className="absolute -top-6 left-8 bg-teal-custom rounded-full w-12 h-12 flex items-center justify-center text-white shadow-lg text-2xl">
                <Quote className="" />
              </div>
              <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                "As a pharmacy, margins were getting tight. We started offering the Oxxy plan to chronic patients buying monthly meds. The recurring commissions cover my entire shop's rent now. Highly recommended."
              </p>
              <div className="flex items-center gap-4 border-t border-gray-100 pt-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">MP</div>
                <div>
                  <h4 className="font-bold text-gray-900">Manoj Patel</h4>
                  <p className="text-sm text-gray-500">Retail Chemist Owner, Surat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "How to Apply" Steps */}
      <section className="bg-green-50/40 py-24 px-6 border-t border-green-100/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-16">
            🎯 How to Apply
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {[
              { num: '01', title: 'Submit Clinic Details', desc: 'Complete the form below with your professional details and city.' },
              { num: '02', title: 'Verification', desc: 'Our medical panel will verify your practice or pharmacy within 24 hours.' },
              { num: '03', title: 'Secure Exclusivity', desc: 'Lock in your city-level exclusivity and complete network onboarding.' },
              { num: '04', title: 'Empower Patients', desc: 'Receive your clinic materials, help patients save, and start generating revenue.' },
            ].map((step, idx) => (
              <div key={idx} className="relative w-full flex flex-col items-center">

                {/* Next Step Arrow (Desktop) */}
                {idx < 3 && (
                  <div className="hidden md:flex absolute top-10 -right-4 translate-x-1/2 -translate-y-1/2 items-center justify-center text-green-300 z-0 opacity-80">
                    <ArrowRight className="text-4xl" />
                  </div>
                )}

                <div className="relative z-10 w-20 h-20 bg-white border-4 border-primary rounded-full shadow-lg flex items-center justify-center mb-6 text-2xl font-bold text-primary">
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm px-4 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">Everything you need to know before joining.</p>
          </div>

          <div className="space-y-4">
            {[
              { q: "Will this interfere with my standard consultation fees?", a: "No, absolutely not. Oxxy's savings apply to diagnostics, surgeries, and specific network partners. Your clinic's OPD and consultation fees remain entirely under your control." },
              { q: "Do I need technical skills to onboard patients?", a: "Not at all. You or your receptionist only need a smartphone or tablet. The process takes less than 60 seconds per patient using our streamlined app." },
              { q: "How and when do I get paid?", a: "Commissions are tracked transparently on your partner dashboard and are deposited directly into your linked bank account automatically every month." },
              { q: "Is patient data secure and HIPAA-aligned?", a: "Yes. Oxxy employs bank-level encryption and strict data privacy protocols. We do not sell patient data, ensuring full trust between you and your patients." },
            ].map((faq, idx) => (
              <div key={idx} className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 bg-white text-left font-bold text-gray-900 hover:bg-gray-50 flex items-center justify-between focus:outline-none"
                >
                  {faq.q}
                  <ChevronDown className={`transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-primary' : 'text-gray-400'}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-[500px] py-5 border-t border-gray-100 bg-gray-50/50' : 'max-h-0 py-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Affiliate Application Form */}
      <section id="apply-form" className="py-24 px-6 bg-gray-50/50 relative">
        <div className="max-w-3xl mx-auto -mt-40 relative z-20">
          <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-14 border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-teal-custom"></div>

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
                Affiliate Application Form
              </h2>
              <p className="text-gray-500 text-lg font-light">
                Fill out the details below to apply for city exclusivity.
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 px-4">
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-[6px] border-white animate-bounce-short">
                  <BadgeCheck className="text-5xl" />
                </div>

                <div className="max-w-2xl mx-auto mb-12">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Application Under Verification</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Thank you for submitting your details. Our partnership team is currently verifying your clinic and professional credentials.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-4">
                      <Mail className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Email Confirmation</h4>
                    <p className="text-sm text-gray-500">We've sent a receipt of your application to your inbox.</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Review Process</h4>
                    <p className="text-sm text-gray-500">The verification process typically takes 24-48 business hours.</p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                      <Pointer className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Next Step</h4>
                    <p className="text-sm text-gray-500">Our relationship manager will reach out via WhatsApp for final onboarding.</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setOnboardingStep(1);
                  }}
                  className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition shadow-lg transform hover:-translate-y-1"
                >
                  Return to Homepage
                </button>
              </div>
            ) : onboardingStep === 1 ? (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Ramesh Kumar"
                      className={`w-full px-5 py-4 rounded-xl border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow`}
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-2">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ramesh@example.com"
                      className={`w-full px-5 py-4 rounded-xl border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select State *</label>
                    <select
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Choose State...</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state} value={state.toLowerCase().replace(' ', '_')}>{state}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-2">{errors.state}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className={`w-full px-5 py-4 rounded-xl border ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow`}
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-2">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic / Hospital Name *</label>
                    <input
                      type="text"
                      name="clinicName"
                      required
                      value={formData.clinicName}
                      onChange={handleChange}
                      placeholder="e.g. City Care Hospital"
                      className={`w-full px-5 py-4 rounded-xl border ${errors.clinicName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow`}
                    />
                    {errors.clinicName && <p className="text-red-500 text-xs mt-2">{errors.clinicName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Clinic / Hospital Address *</label>
                    <input
                      type="text"
                      name="clinicAddress"
                      required
                      value={formData.clinicAddress}
                      onChange={handleChange}
                      placeholder="Full address of your clinic"
                      className={`w-full px-5 py-4 rounded-xl border ${errors.clinicAddress ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow`}
                    />
                    {errors.clinicAddress && <p className="text-red-500 text-xs mt-2">{errors.clinicAddress}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number *</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-5 rounded-l-xl border border-r-0 border-gray-200 bg-gray-100 text-gray-500 font-medium font-sans">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        maxLength="10"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="98765 43210"
                        className={`w-full px-5 py-4 rounded-r-xl border ${errors.phone ? 'border-red-500 focus:ring-red-500 border-l-red-500 z-10' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-2">{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Profession</label>
                    <select
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow appearance-none cursor-pointer"
                    >
                      <option value="">Select your profession...</option>
                      <option value="doctor">Doctor (MBBS/MD/Specialist)</option>
                      <option value="doctor_ayush">Doctor (AYUSH/BAMS/BHMS)</option>
                      <option value="lab_owner">Lab Owner / Diagnostic Center</option>
                      <option value="chemist">Chemist / Pharmacy Owner</option>
                      <option value="clinic_owner">Clinic / Hospital Owner</option>
                      <option value="insurance_broker">Insurance Broker / Advisor</option>
                      <option value="other_medical">Other Medical Professional</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why are you interested? *</label>
                  <textarea
                    name="reason"
                    required
                    rows={3}
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Tell us about your local network..."
                    className={`w-full px-5 py-4 rounded-xl border ${errors.reason ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow resize-none`}
                  ></textarea>
                  {errors.reason && <p className="text-red-500 text-xs mt-2">{errors.reason}</p>}
                </div>

                {apiError && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg border border-red-100">{apiError}</p>}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-5 bg-gradient-to-r from-primary to-teal-custom hover:from-primary-dark hover:to-teal-custom text-white font-bold rounded-xl text-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Verification <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-8 py-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h3>
                  <p className="text-gray-500">We've sent a 6-digit confirmation code to <span className="font-bold text-gray-900">{formData.email}</span></p>
                </div>

                <div className="max-w-xs mx-auto">
                  <input
                    type="text"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="· · · · · ·"
                    className="w-full text-center text-4xl tracking-[0.5em] font-bold py-6 rounded-2xl border-2 border-gray-100 bg-gray-50 focus:border-primary focus:bg-white outline-none transition-all"
                  />
                  {apiError && <p className="text-red-500 text-xs text-center mt-4 bg-red-50 p-2 rounded border border-red-100">{apiError}</p>}
                  <div className="flex justify-between mt-6 text-sm">
                    <button type="button" onClick={handleSubmit} className="text-gray-400 hover:text-primary font-medium">Resend Code</button>
                    <button type="button" onClick={() => { setOnboardingStep(1); setApiError(''); }} className="text-primary font-bold">Edit Details</button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={otp.length !== 6 || isVerifying}
                  className={`w-full py-5 ${otp.length === 6 ? 'bg-primary shadow-lg hover:bg-primary-dark' : 'bg-gray-200 cursor-not-allowed'} text-white font-bold rounded-2xl text-xl transition-all transform ${otp.length === 6 ? 'hover:-translate-y-1' : ''} flex items-center justify-center gap-3`}
                >
                  {isVerifying ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      Complete Onboarding <BadgeCheck className="w-6 h-6" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 8. Final Call to Action Section */}
      <section className="bg-gradient-to-br from-primary via-teal-custom to-primary-dark py-24 px-6 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center mb-8">
            <AlertTriangle className="text-6xl text-white/90" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-white leading-tight">
            Ready to Build Your <br /> Healthcare Legacy?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 font-light max-w-3xl mx-auto">
            Join 12,000+ medical professionals who are redefining healthcare access in India.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="#apply-form"
              className="px-10 py-5 bg-white text-primary font-bold rounded-2xl text-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Apply Now
            </a>
            <a
              href="#apply-form"
              className="px-10 py-5 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl text-xl hover:bg-white/10 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#091524] text-gray-300 text-sm border-t border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">

          {/* Top Section: Logo/Bio & Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-16">

            {/* Left Column: Brand & Bio */}
            <div className="flex flex-col items-start text-left">
              <div className="flex items-center gap-3 mb-6">
                {/* Reusing existing logo */}
                <img src="/oxxy_logo.png" alt="Oxxy" className="h-12 object-contain" />

              </div>
              <p className="text-gray-400 mb-8 leading-relaxed text-base pr-4">
                India's largest healthcare network bringing affordable and accessible medical services to millions. We help you build a highly profitable recurring income stream through automated diagnostics and professional network optimization.
              </p>

              {/* Social Icons (Kept from previous) */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary transition-colors hover:text-white">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
              </div>
            </div>

            {/* Middle Column: Quick Links */}
            <div className="text-left">
              <h4 className="text-white font-bold mb-8 text-lg uppercase tracking-wider">The Program</h4>
              <ul className="space-y-4">
                <li><a href="#simulator" className="hover:text-primary transition-colors">Earnings Flow</a></li>
                <li><a href="#benefits" className="hover:text-primary transition-colors">Incentive Hub</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><a href="#apply-form" className="hover:text-primary transition-colors">Application Form</a></li>
              </ul>
            </div>

            {/* Right Column: Contact */}
            <div className="text-left">
              <h4 className="text-white font-bold mb-8 text-lg uppercase tracking-wider">Contact Support</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MessageCircle className="text-primary w-5 h-5" />
                  <a href="#" className="hover:text-primary">WhatsApp: +91 911 380 000</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-primary w-5 h-5" />
                  <a href="mailto:partners@oxxy.com" className="hover:text-primary">partners@oxxy.com</a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="text-primary w-5 h-5" />
                  <span>New Delhi, India</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="w-full h-px bg-white/5 mb-8"></div>

          {/* Bottom Footer Info */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-xs lg:text-sm text-gray-500">
            <p>© 2026 Oxxy Healthcare. All rights reserved. Built with <span className="text-red-500">❤️</span> for India.</p>

            <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 lg:gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>

              {/* Site Credits (Glassmorphic Pill) */}
              <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full py-1.5 px-4 shadow-xl hover:bg-white/10 transition-colors lg:ml-2">
                <a href="https://fabulousmedia.in" target="_blank" rel="noreferrer" className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-105 duration-300">
                  <img src="/sitecredits/fabulous.png" alt="Fabulous Media" className="h-[20px] w-auto object-contain" />
                </a>
                <div className="h-5 w-px bg-white/20"></div>
                <a href="https://gocommercially.com" target="_blank" rel="noreferrer" className="flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity hover:scale-105 duration-300">
                  <img src="/sitecredits/gocomercially.svg" alt="Go Commercially" className="h-[14px] w-auto object-contain" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default AffiliateProgram;
