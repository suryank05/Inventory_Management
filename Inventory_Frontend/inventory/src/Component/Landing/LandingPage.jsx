import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { 
  PackageCheck, 
  TrendingUp, 
  Users, 
  BellRing, 
  Puzzle, 
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import './LandingPage.css';

function LandingPage() {
  const observerRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll-animate classes
    const animatedElements = document.querySelectorAll(
      '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
    );
    
    animatedElements.forEach(el => {
      if (observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
          <div className="grid-pattern"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-badge scroll-animate">
                <Sparkles size={16} />
                <span>Modern Inventory Management</span>
              </div>
              
              <h1 className="heading-1 scroll-animate">
                Manage Your Inventory
                <span className="text-gradient"> Smarter</span>
              </h1>
              
              <p className="body-large hero-description scroll-animate">
                Track, analyze, and optimize your inventory in real-time with powerful automation and intelligent insights
              </p>
              
              <div className="hero-cta scroll-animate">
                <Link to="/auth/register" className="btn btn-primary btn-large">
                  Get Started Free
                  <ArrowRight size={20} />
                </Link>
                <Link to="/auth" className="btn btn-secondary btn-large">
                  Login
                </Link>
              </div>
              
              <div className="trust-indicators scroll-animate">
                <div className="trust-item">
                  <span className="trust-number">50K+</span>
                  <span className="trust-label">Items Tracked Daily</span>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-item">
                  <span className="trust-number">2.5K+</span>
                  <span className="trust-label">Active Users</span>
                </div>
                <div className="trust-divider"></div>
                <div className="trust-item">
                  <span className="trust-number">99.9%</span>
                  <span className="trust-label">Uptime</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual scroll-animate-scale">
              <div className="glass-card card-1">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #fb923c 100%)' }}>
                  <TrendingUp size={20} style={{ color: 'white' }} />
                </div>
                <div className="card-info">
                  <div className="card-label">Growth</div>
                  <div className="card-value">+24.5%</div>
                </div>
              </div>
              
              <div className="glass-card card-2">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)' }}>
                  <PackageCheck size={20} style={{ color: 'white' }} />
                </div>
                <div className="card-info">
                  <div className="card-label">Total Items</div>
                  <div className="card-value">12,847</div>
                </div>
              </div>
              
              <div className="glass-card card-3">
                <div className="card-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' }}>
                  <BellRing size={20} style={{ color: 'white' }} />
                </div>
                <div className="card-info">
                  <div className="card-label">Alerts</div>
                  <div className="card-value">3 Active</div>
                </div>
              </div>
              
              <div className="dashboard-glow"></div>
            </div>
          </div>
        </div>
      </section>

      

     

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-glow cta-glow-1"></div>
          <div className="cta-glow cta-glow-2"></div>
        </div>
        
        <div className="container">
          <div className="cta-content scroll-animate">
            <h2 className="heading-2">
              Ready to Transform Your
              <span className="text-gradient"> Inventory Management?</span>
            </h2>
            <p className="body-large">
              Join thousands of businesses streamlining their operations
            </p>
            
            <div className="cta-buttons">
              <Link to="/auth/register" className="btn btn-primary btn-large">
                Start Free Trial
                <ArrowRight size={20} />
              </Link>
              <Link to="/auth" className="btn btn-secondary btn-large">
                Login to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
