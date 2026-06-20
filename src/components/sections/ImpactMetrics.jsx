import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Recycle, TreePine, Users, Globe2 } from 'lucide-react';
import styles from './ImpactMetrics.module.css';

// Custom hook for counting animation
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeOut = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(start + (end - start) * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (isInView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start, isInView]);

  return { count, ref };
};

const MetricItem = ({ icon: Icon, endValue, suffix, title, subtitle, delay }) => {
  const { count, ref } = useCountUp(endValue);

  return (
    <motion.div 
      className={styles.metricItem}
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.iconWrapper}>
        <Icon size={32} color="var(--primary)" />
      </div>
      <div className={styles.metricData}>
        <h3 className={styles.metricNumber}>
          {count.toLocaleString()}{suffix}
        </h3>
        <p className={styles.metricTitle}>{title}</p>
        <p className={styles.metricSubtitle}>{subtitle}</p>
      </div>
    </motion.div>
  );
};

const ImpactMetrics = () => {
  const metrics = [
    {
      icon: Recycle,
      endValue: 12500,
      suffix: ' kg',
      title: 'Plastic Saved',
      subtitle: "That's like removing 625,000 plastic bottles!",
      delay: 0.1
    },
    {
      icon: TreePine,
      endValue: 3200,
      suffix: '',
      title: 'Trees Supported',
      subtitle: "Thanks to you, we're growing a greener tomorrow!",
      delay: 0.2
    },
    {
      icon: Users,
      endValue: 850,
      suffix: '',
      title: 'Local Artisans Empowered',
      subtitle: 'Small makers. Big dreams. Stronger communities.',
      delay: 0.3
    },
    {
      icon: Globe2,
      endValue: 45,
      suffix: ' tons',
      title: 'Carbon Footprint Reduced',
      subtitle: 'Driving real change for a healthier planet.',
      delay: 0.4
    }
  ];

  return (
    <section className={styles.impactSection}>
      <div className="container">
        <div className={styles.impactCard}>
          <div className={styles.metricsGrid}>
            {metrics.map((metric, index) => (
              <MetricItem key={index} {...metric} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;
