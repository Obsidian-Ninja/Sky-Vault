import CTASection from "../components/landing/CTASection";
import FeatureSection from "../components/landing/FeatureSection";
import Footer from "../components/landing/Footer";
import HeroSection from "../components/landing/HeroSection";
import PricingSection from "../components/landing/PricingSection";
import TestimonialSection from "../components/landing/TestimonialSection";

const Landing = () => {
    return (
        <div className="landing-page bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <HeroSection />
            {/* Features Section  */}
            <FeatureSection />
            {/* Pricing Section  */}
            <PricingSection />
            {/* Testimonial Section  */}
            <TestimonialSection />
            {/* CTA Section  */}
            <CTASection />
            {/* Footer Section  */}
            <Footer />
        </div>
    )
}

export default Landing;