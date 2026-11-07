import HeroSection from "../components/landing/HeroSection.jsx";
import {Fence} from "lucide-react";
import FeatureSection from "../components/landing/FeatureSection.jsx";
import PricingSection from "../components/landing/PricingSection.jsx";
import TestimonialSection from "../components/landing/TestimonialSection.jsx";
import CTASection from "../components/landing/CTASection.jsx";
import Footer from "../components/landing/Footer.jsx";
import {features, pricingPlans, testimonials} from "../assets/data.js";
import {useClerk, useUser} from "@clerk/clerk-react";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Landing = () => {

    const {openSignIn, openSignUp} = useClerk();
    const {isSignedIn} = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSignedIn) {
            navigate("/dashboard");
        }
    }, [isSignedIn, navigate]);

    return (
        <div className="landing-page bg-gradient-to-b from-gray-50 to-gray-100">
            {/* Hero Section */}
            <HeroSection openSignIn={openSignIn} openSignUp={openSignUp} />
            {/* Features Section  */}
            <FeatureSection features={features} />
            {/* Pricing Section  */}
            <PricingSection pricingPlans={pricingPlans} openSignUp={openSignUp} />
            {/* Testimonial Section  */}
            <TestimonialSection testimonials={testimonials} />
            {/* CTA Section  */}
            <CTASection openSignUp={openSignUp} />
            {/* Footer Section  */}
            <Footer />
        </div>
    )
}

export default Landing;