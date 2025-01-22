import React, { useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Shield, Zap, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Smart Finance for
            <span className="block text-blue-400">Modern Living</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Take control of your financial future with our intelligent budgeting platform.
            Seamlessly track expenses, plan ahead, and achieve your financial goals.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-medium
                     transform hover:scale-105 transition-all duration-300
                     hover:shadow-xl hover:bg-gray-50 group"
          >
            Get Started
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        <button
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2
                     text-white animate-bounce cursor-pointer"
        >
          <ChevronDown className="w-10 h-10" />
        </button>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 animate-on-scroll opacity-0">
            Intelligent Features for
            <span className="block text-blue-600">Smart Money Management</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Shield,
                title: 'Secure Transactions',
                description: 'Bank-grade encryption keeps your financial data safe and secure.',
              },
              {
                icon: Zap,
                title: 'Real-time Insights',
                description: 'Get instant updates and analytics about your spending patterns.',
              },
              {
                icon: Heart,
                title: 'Smart Budgeting',
                description: 'AI-powered recommendations to help you save more effectively.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl
                         transform hover:-translate-y-1 transition-all duration-300
                         animate-on-scroll opacity-0"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <feature.icon className="w-12 h-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll opacity-0">
              <h2 className="text-4xl font-bold mb-6">
                Beautiful Analytics,
                <span className="block text-blue-600">Powerful Insights</span>
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our intuitive dashboard provides clear visualizations of your financial health.
                Track spending patterns, set budgets, and receive personalized recommendations
                to help you achieve your financial goals.
              </p>
              <Link
                to="/dashboard"
                className="inline-flex items-center bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium
                       transform hover:scale-105 transition-all duration-300
                       hover:shadow-xl hover:bg-gray-800 group"
              >
                Explore Dashboard
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
            <div className="animate-on-scroll opacity-0">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80"
                alt="Dashboard Preview"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 animate-on-scroll opacity-0">
            Ready to Take Control?
          </h2>
          <p className="text-gray-400 mb-12 text-lg animate-on-scroll opacity-0">
            Join thousands of users who have transformed their financial lives
            with our smart budgeting platform.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-medium
                   transform hover:scale-105 transition-all duration-300
                   hover:shadow-xl hover:bg-blue-700 group
                   animate-on-scroll opacity-0"
          >
            Start Free Trial
            <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};