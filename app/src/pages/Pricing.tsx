import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/ui-custom/Navbar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Check, 
  X, 
  Sparkles, 
  Zap, 
  Building2,
  ArrowRight,
  Star
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const plans = [
  {
    name: 'Free',
    icon: Sparkles,
    description: 'Perfect for getting started',
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    features: [
      { text: '50 AI generations/month', included: true },
      { text: 'Basic image generation', included: true },
      { text: 'Standard resolution images', included: true },
      { text: 'Community support', included: true },
      { text: 'Background remover (10/month)', included: true },
      { text: 'Blog generator (5/month)', included: true },
      { text: 'Resume analyzer', included: true },
      { text: 'Priority processing', included: false },
      { text: 'API access', included: false },
      { text: 'Custom models', included: false },
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline' as const,
  },
  {
    name: 'Pro',
    icon: Zap,
    description: 'Best for professionals',
    monthlyPrice: 29,
    yearlyPrice: 290,
    popular: true,
    features: [
      { text: 'Unlimited AI generations', included: true },
      { text: 'Advanced image generation', included: true },
      { text: '4K resolution images', included: true },
      { text: 'Priority support', included: true },
      { text: 'Unlimited background remover', included: true },
      { text: 'Unlimited blog generator', included: true },
      { text: 'Advanced resume analysis', included: true },
      { text: 'Priority processing', included: true },
      { text: 'API access', included: true },
      { text: 'Custom models', included: false },
    ],
    cta: 'Start Pro Trial',
    ctaVariant: 'default' as const,
  },
  {
    name: 'Enterprise',
    icon: Building2,
    description: 'For teams and businesses',
    monthlyPrice: 99,
    yearlyPrice: 990,
    popular: false,
    features: [
      { text: 'Everything in Pro', included: true },
      { text: 'Unlimited team members', included: true },
      { text: '8K resolution images', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'SSO & Advanced security', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
      { text: 'API access', included: true },
      { text: 'Custom AI models', included: true },
      { text: 'On-premise deployment', included: true },
    ],
    cta: 'Contact Sales',
    ctaVariant: 'outline' as const,
  },
];

const testimonials = [
  {
    quote: "The Pro plan has been a game-changer for our marketing team. Unlimited generations mean we never have to worry about hitting limits.",
    author: "Sarah Chen",
    role: "Marketing Director",
    company: "TechFlow Inc.",
  },
  {
    quote: "We switched to Enterprise and the custom integrations have streamlined our entire workflow. Worth every penny.",
    author: "Michael Roberts",
    role: "CTO",
    company: "StartupXYZ",
  },
];

function PricingCard({ 
  plan, 
  index, 
  isYearly 
}: { 
  plan: typeof plans[0]; 
  index: number;
  isYearly: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (!isAuthenticated) {
      navigate('/signup');
    } else {
      toast.success(`You've selected the ${plan.name} plan!`);
    }
  };

  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className={`relative h-full rounded-3xl overflow-hidden ${
          plan.popular
            ? 'bg-gradient-to-b from-purple/20 to-dark-card border-2 border-purple/50'
            : 'bg-dark-card border border-border-gray'
        }`}
      >
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple to-purple-light text-white text-sm font-medium rounded-b-xl">
            Most Popular
          </div>
        )}

        {/* Holographic sheen effect */}
        <div className="absolute inset-0 holographic opacity-0 hover:opacity-100 transition-opacity duration-500" />

        <div className="p-8 pt-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              plan.popular ? 'bg-purple' : 'bg-white/10'
            }`}>
              <plan.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
              <p className="text-sm text-gray-500">{plan.description}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">
                ${price}
              </span>
              <span className="text-gray-500">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            {isYearly && price > 0 && (
              <p className="text-sm text-purple mt-1">
                Save ${plan.monthlyPrice * 12 - plan.yearlyPrice}/year
              </p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleCTA}
            className={`w-full mb-8 ${
              plan.popular
                ? 'bg-gradient-to-r from-purple to-purple-light hover:opacity-90 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
            }`}
          >
            {plan.cta}
          </Button>

          {/* Features */}
          <div className="space-y-3">
            <p className="text-sm text-gray-500 font-medium mb-3">Features included:</p>
            {plan.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                {feature.included ? (
                  <div className="w-5 h-5 rounded-full bg-purple/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-purple" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-gray-600" />
                  </div>
                )}
                <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <Navbar />
      
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple/10 border border-purple/20 mb-6">
              <Star className="w-4 h-4 text-purple" />
              <span className="text-sm text-purple font-medium">Simple Pricing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Choose Your{' '}
              <span className="text-gradient">Plan</span>
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>

            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-purple"
              />
              <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-500'}`}>
                Yearly
              </span>
              {isYearly && (
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
                  Save 20%
                </span>
              )}
            </div>
          </motion.div>

          {/* Pricing cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <PricingCard 
                key={plan.name} 
                plan={plan} 
                index={index}
                isYearly={isYearly}
              />
            ))}
          </div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-semibold text-white text-center mb-10">
              Loved by Teams Worldwide
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-dark-card border border-border-gray"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl font-semibold text-white text-center mb-10">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: 'Can I change plans at any time?',
                  a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and bank transfers for Enterprise plans.',
                },
                {
                  q: 'Is there a free trial for paid plans?',
                  a: 'Yes, both Pro and Enterprise plans come with a 14-day free trial. No credit card required.',
                },
                {
                  q: 'What happens if I exceed my monthly limit?',
                  a: 'On the Free plan, you will need to wait until next month. Pro and Enterprise users have unlimited access.',
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-dark-card border border-border-gray"
                >
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-20 text-center"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-r from-purple/20 to-purple-light/20 border border-purple/30">
              <h2 className="text-2xl font-bold text-white mb-4">
                Still have questions?
              </h2>
              <p className="text-gray-400 mb-6">
                Our team is here to help you choose the right plan.
              </p>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => toast.info('Contact form coming soon!')}
              >
                Contact Sales
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
