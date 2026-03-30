import React, { useState } from 'react';

const AffiliateProgram = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    experience: '',
    occupation: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    if (!formData.city) tempErrors.city = "Please select a city";
    if (!formData.reason) tempErrors.reason = "Please provide your reason for interesting";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulate form submission
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        experience: '',
        occupation: '',
        reason: '',
      });
      setErrors({});
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
          <div className="hidden sm:flex items-center gap-8 font-medium text-sm text-gray-700">
            <a href="#about" className="hover:text-primary transition-colors">How It Works</a>
            <a href="#benefits" className="hover:text-primary transition-colors">Features</a>
            <a href="#apply-form" className="px-6 py-2.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Apply Now</a>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-24 px-6 bg-gradient-to-br from-green-50 via-white to-green-50 text-center flex flex-col items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="inline-block bg-white text-primary-dark px-5 py-2 rounded-full text-sm font-bold mb-8 shadow-sm border border-green-100 flex items-center gap-2">
            <span className="text-xl">🇮🇳</span> Exclusive Opportunity for Healthcare Leaders
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight text-gray-900 tracking-tight">
            🚀 Join the Oxxy <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-teal-custom">
              Affiliate Program
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 font-medium text-gray-600 max-w-2xl">
            For Insurance Agents, Health Professionals & Community Leaders Who Want to Own Their City.
          </p>

          <a
            href="#apply-form"
            className="inline-flex items-center justify-center px-10 py-5 bg-white text-primary font-bold rounded-2xl text-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl border-2 border-primary transform hover:-translate-y-1"
          >
            Apply Now - Limited Slots
            <span className="material-symbols-outlined ml-2 animate-bounce">arrow_downward</span>
          </a>
        </div>
      </section>

      {/* 2. Overview Section: "What Is Oxxy?" */}
      <section id="about" className="py-24 px-6 bg-gray-50 text-center border-t border-gray-100">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-6">
          🧠 What Is Oxxy?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
          Oxxy is India's largest healthcare network, bringing affordable and accessible medical services to millions. As an affiliate partner, you help individuals and families save drastically on their medical bills while earning a substantial, recurring income. It's a win-win for everyone in your community.
        </p>
      </section>

      {/* 3. Benefits Grid */}
      <section id="benefits" className="bg-gray-50 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
              Why Become an Oxxy Partner?
            </h2>
            <p className="text-lg font-medium text-gray-600">
              Everything you need to secure your local market and scale your income.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: 'lock', title: 'City Lock-in Rights', desc: 'Secure exclusive marketing rights in your designated city. No internal competition.' },
            { icon: 'currency_rupee', title: 'Recurring Revenue', desc: 'Earn monthly commissions for every active subscriber you bring to the platform.' },
            { icon: 'school', title: 'Complete Training', desc: 'Get full access to our comprehensive sales playbook, scripts, and platform training.' },
            { icon: 'group', title: 'Lifetime Support', desc: 'Dedicated partner success managers available via WhatsApp and Zoom calls.' },
            { icon: 'campaign', title: 'Marketing Materials', desc: 'Ready-made brochures, social media creatives, and presentation decks.' },
            { icon: 'verified', title: 'Proven System', desc: 'Join a rapidly growing network already trusted by thousands of families and providers.' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all text-left">
              <div className="w-14 h-14 bg-green-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* 4. "Who Is This For?" Section */}
      <section className="bg-green-50/40 py-24 px-6 border-t border-b border-green-100/50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-12">
            🇮🇳 Who Is This For?
          </h2>

          <div className="bg-white border-t-4 border-primary rounded-3xl shadow-lg p-10 md:p-14 text-left">
            <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
              You are a perfect fit if...
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {[
                "You are an Insurance Agent, Clinic Owner, Chemist, or Community Leader.",
                "You want to provide high-value healthcare savings to your network.",
                "You are looking for a reliable, recurring passive income stream.",
                "You have strong community connections in your specific city.",
                "You are ready to follow a proven sales framework.",
                "You want outsized returns for your local influence."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-primary text-sm font-bold">done</span>
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
                    <span className="material-symbols-outlined text-primary text-lg transition-transform duration-300 group-hover:scale-125">location_on</span>
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

      {/* 6. "How to Apply" Steps */}
      <section className="bg-green-50/40 py-24 px-6 border-t border-green-100/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-16">
            🎯 How to Apply
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Desktop connection line */}
            <div className="hidden md:block absolute top-[2.5rem] left-[12%] right-[12%] h-1 bg-green-200/50 -z-10"></div>

            {[
              { num: '01', title: 'Fill Application Form', desc: 'Complete the form below with your details and preferred city.' },
              { num: '02', title: 'Review Process', desc: 'Our team will review your profile for market fit within 24 hours.' },
              { num: '03', title: 'Pay Onboarding Fee', desc: 'Secure your tier exclusivity with the partner licensing fee.' },
              { num: '04', title: 'Start Selling', desc: 'Unlock your dashboard, get trained, and start earning recurring revenue.' },
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 w-full flex flex-col items-center">
                <div className="w-20 h-20 bg-white border-4 border-primary rounded-full shadow-lg flex items-center justify-center mb-6 text-2xl font-bold text-primary">
                  {step.num}
                </div>
                <h3 className="font-bold text-lg mb-3 text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-sm px-4 leading-relaxed max-w-xs">{step.desc}</p>
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
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-green-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6 transform scale-110">
                  <span className="material-symbols-outlined text-5xl">check_circle</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">Application Received!</h3>
                <p className="text-gray-600 mb-10 text-lg max-w-md mx-auto">
                  Thank you for applying to the Oxxy Affiliate Program. Our team will review your profile and get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-8 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition shadow-sm"
                >
                  Submit another application
                </button>
              </div>
            ) : (
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
                      placeholder="e.g. Ramesh Kumar"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred City *</label>
                    <select
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-5 py-4 rounded-xl border ${errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select your core market...</option>
                      <option value="delhi_ncr">Delhi NCR</option>
                      <option value="mumbai">Mumbai</option>
                      <option value="bengaluru">Bengaluru</option>
                      <option value="chennai">Chennai</option>
                      <option value="hyderabad">Hyderabad</option>
                      <option value="pune">Pune</option>
                      <option value="other_tier_2">Other Tier-2 City</option>
                      <option value="other_tier_3">Other Tier-3 City</option>
                    </select>
                    {errors.city && <p className="text-red-500 text-xs mt-2">{errors.city}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="e.g. Insurance Agent"
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sales/Network Exp.</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-shadow appearance-none cursor-pointer"
                    >
                      <option value="">Select experience level...</option>
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (3-5 years)</option>
                      <option value="expert">Expert (5+ years)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Why are you interested in partnering? *</label>
                  <textarea
                    name="reason"
                    required
                    rows={4}
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Tell us a little bit about your local network and how you plan to acquire users..."
                    className={`w-full px-5 py-4 rounded-xl border ${errors.reason ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary'} bg-gray-50 text-gray-900 outline-none transition-shadow resize-none`}
                  ></textarea>
                  {errors.reason && <p className="text-red-500 text-xs mt-2">{errors.reason}</p>}
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-primary to-teal-custom hover:from-primary-dark hover:to-teal-custom text-white font-bold rounded-xl text-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                  >
                    Submit Complete Application
                  </button>
                  <p className="text-center text-sm text-gray-500 mt-6 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">lock</span>
                    Your data is secure. We never sell your information.
                  </p>
                </div>
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
            <span className="material-symbols-outlined text-6xl text-white/90">warning</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 text-white leading-tight">
            Ready to Claim Your City?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90 font-light max-w-3xl mx-auto">
            Don't let someone else own your local market. Once a city slot is filled by a partnered affiliate, it’s locked indefinitely.
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
                India's largest healthcare network bringing affordable and accessible medical services to millions. We help you save on medical bills while building a highly profitable recurring income stream through automated optimization and expert-led execution.
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

            {/* Middle Column: Protection Plans */}
            <div className="text-left">
              <h4 className="text-primary font-bold text-[17px] mb-6 tracking-wide">Protection Plans</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Oxxy Everyday Plan</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Oxxy Vital Plan</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Oxxy Thrive Plan</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Oxxy Infinity Plan</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">What is OXXY PLUS PLAN</a></li>
              </ul>
            </div>

            {/* Right Column: Support */}
            <div className="text-left">
              <h4 className="text-primary font-bold text-[17px] mb-6 tracking-wide">Support</h4>
              <div className="flex flex-col gap-5">
                <a href="tel:8800855340" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">call</span>
                  <span>8800855340</span>
                </a>
                <a href="https://wa.me/918800855340" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">chat</span>
                  <span>8800855340</span>
                </a>
                <a href="mailto:info@oxxy.in" className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors group">
                  <span className="material-symbols-outlined text-gray-400 group-hover:text-primary transition-colors">mail</span>
                  <span>info@oxxy.in</span>
                </a>
              </div>
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
