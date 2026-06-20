import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Leaf, ShieldCheck, Users, Link as LinkIcon } from 'lucide-react';
import styles from './TrustValues.module.css';

const valuesData = [
  {
    icon: DollarSign,
    title: 'Fair Wages',
    subtitle: 'For All Makers'
  },
  {
    icon: Leaf,
    title: 'Sustainable',
    subtitle: 'Raw Materials'
  },
  {
    icon: ShieldCheck,
    title: 'Ethical',
    subtitle: 'Production'
  },
  {
    icon: Users,
    title: 'Empowering Local',
    subtitle: 'Communities'
  },
  {
    icon: LinkIcon,
    title: 'Transparent',
    subtitle: 'Supply Chain'
  }
];

const TrustValues = () => {
  return (
    <section className={styles.trustSection}>
      <div className={`container ${styles.trustContainer}`}>
        {valuesData.map((val, index) => (
          <motion.div 
            key={index} 
            className={styles.valueItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.iconWrapper}>
              <val.icon size={28} className={styles.icon} />
            </div>
            <div className={styles.textWrapper}>
              <span className={styles.title}>{val.title}</span>
              <span className={styles.subtitle}>{val.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustValues;
