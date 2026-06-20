import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign, ShoppingBag, Package, Star, TrendingUp, TrendingDown,
  Leaf, Trash2, TreePine, Sparkles, FileText, Search, MessageSquare, Award
} from 'lucide-react';
import { useEco } from '../context/EcoContext';
import styles from './SellerPage.module.css';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' }
  })
};

const statsData = [
  { label: 'Total Revenue', value: '₹45,200', icon: DollarSign, trend: '+12%', trendDir: 'up', cls: 'revenue' },
  { label: 'Orders This Month', value: '28', icon: ShoppingBag, trend: '+8%', trendDir: 'up', cls: 'orders' },
  { label: 'Products Listed', value: '12', icon: Package, trend: '+2', trendDir: 'up', cls: 'products' },
  { label: 'Avg Rating', value: '4.8', icon: Star, trend: '-0.1', trendDir: 'down', cls: 'rating' }
];

const chartData = [
  { day: 'Mon', value: 8400 },
  { day: 'Tue', value: 6200 },
  { day: 'Wed', value: 9100 },
  { day: 'Thu', value: 7800 },
  { day: 'Fri', value: 5500 },
  { day: 'Sat', value: 11200 },
  { day: 'Sun', value: 4800 }
];

const maxChartVal = Math.max(...chartData.map(d => d.value));

const recentOrders = [
  { id: '#EV-2847', product: 'Clay Terracotta Cups (x6)', customer: 'Arpita S.', amount: '₹299', status: 'delivered' },
  { id: '#EV-2846', product: 'Bamboo Cutlery Set', customer: 'Rohan M.', amount: '₹199', status: 'shipped' },
  { id: '#EV-2845', product: 'Bamboo Toothbrush (x3)', customer: 'Meera K.', amount: '₹297', status: 'processing' },
  { id: '#EV-2844', product: 'Clay Terracotta Cups (x6)', customer: 'Vikram J.', amount: '₹299', status: 'delivered' },
  { id: '#EV-2843', product: 'Bamboo Cutlery Set', customer: 'Sneha D.', amount: '₹199', status: 'delivered' }
];

const productTable = [
  { name: 'Clay Terracotta Cups', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=100&q=60', sales: 89, revenue: '₹26,611', rating: 4.9, stock: 10 },
  { name: 'Bamboo Toothbrush', image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=100&q=60', sales: 64, revenue: '₹6,336', rating: 4.8, stock: 15 },
  { name: 'Bamboo Cutlery Set', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=100&q=60', sales: 52, revenue: '₹10,348', rating: 4.6, stock: 8 }
];

const impactMetrics = [
  { label: 'CO₂ Saved', value: '2.3t', percent: 76, color: 'var(--primary)' },
  { label: 'Plastic Eliminated', value: '4.1kg', percent: 82, color: '#52b788' },
  { label: 'Trees Supported', value: '18', percent: 60, color: '#40916c' }
];

const aiTools = [
  { icon: FileText, title: 'Product Description', desc: 'AI-generate compelling copy for your listings', action: 'description' },
  { icon: Search, title: 'SEO Optimization', desc: 'Boost visibility with AI keyword suggestions', action: 'seo' },
  { icon: MessageSquare, title: 'Customer Insights', desc: 'Analyze reviews and sentiment patterns', action: 'insights' }
];

const circumference = 2 * Math.PI * 36;

const SellerPage = () => {
  const { user, products, generateAIDescription, generateAISEO, sendAIPrompt, triggerNotification } = useEco();

  const handleAITool = (action) => {
    if (action === 'description') {
      generateAIDescription(products[0]?.id || 1);
    } else if (action === 'seo') {
      generateAISEO(products[0]?.id || 1);
    } else {
      sendAIPrompt('Analyze customer sentiment and provide actionable insights for improving product quality.');
    }
    triggerNotification('AI tool activated! Check your dashboard.', 'success');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Welcome Header */}
        <motion.div
          className={styles.welcomeCard}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.welcomeLeft}>
            <h1>Welcome back, {user.name} 👋</h1>
            <p>Here's what's happening with your products today.</p>
          </div>
          <div className={styles.welcomeBadge}>
            <Award size={18} />
            <span>Verified Maker</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={styles.statCard}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              custom={i}
            >
              <div className={`${styles.statIconWrap} ${styles[stat.cls]}`}>
                <stat.icon size={22} />
              </div>
              <div className={styles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <div className={`${styles.statTrend} ${styles[stat.trendDir]}`}>
                  {stat.trendDir === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {stat.trend} vs last month
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart + Recent Orders */}
        <div className={styles.twoCol}>
          <motion.div
            className={styles.chartCard}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={styles.chartHeader}>
              <h2>Sales Overview</h2>
              <span className={styles.chartPeriod}>This Week</span>
            </div>
            <div className={styles.chartArea}>
              {chartData.map((d, i) => (
                <div key={d.day} className={styles.barCol}>
                  <span className={styles.barValue}>₹{(d.value / 1000).toFixed(1)}k</span>
                  <motion.div
                    className={styles.bar}
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / maxChartVal) * 180}px` }}
                    transition={{ duration: 0.7, delay: 0.4 + i * 0.08 }}
                  />
                  <span className={styles.barLabel}>{d.day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.ordersCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <h2>Recent Orders</h2>
            {recentOrders.map((order) => (
              <div key={order.id} className={styles.orderItem}>
                <div className={styles.orderLeft}>
                  <span className={styles.orderId}>{order.id}</span>
                  <span className={styles.orderProduct}>{order.product}</span>
                  <span className={styles.orderCustomer}>{order.customer}</span>
                </div>
                <div className={styles.orderRight}>
                  <span className={styles.orderAmount}>{order.amount}</span>
                  <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Product Performance Table */}
        <motion.div
          className={styles.tableCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Product Performance</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Rating</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {productTable.map((p) => (
                <tr key={p.name}>
                  <td>
                    <div className={styles.productCell}>
                      <img src={p.image} alt={p.name} className={styles.productThumb} />
                      <span>{p.name}</span>
                    </div>
                  </td>
                  <td>{p.sales}</td>
                  <td>{p.revenue}</td>
                  <td>
                    <span className={styles.ratingCell}>
                      <Star size={13} fill="#f59e0b" />
                      {p.rating}
                    </span>
                  </td>
                  <td>
                    <span className={p.stock <= 10 ? styles.stockLow : styles.stockOk}>
                      {p.stock} left
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Impact + AI Tools Bottom Row */}
        <div className={styles.bottomRow}>
          <motion.div
            className={styles.impactCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2><Leaf size={18} /> Your Sustainability Impact</h2>
            <div className={styles.impactGrid}>
              {impactMetrics.map((m) => {
                const offset = circumference - (m.percent / 100) * circumference;
                return (
                  <div key={m.label} className={styles.impactMetric}>
                    <div className={styles.circleWrap}>
                      <svg className={styles.circleSvg} viewBox="0 0 80 80">
                        <circle className={styles.circleBg} cx="40" cy="40" r="36" />
                        <motion.circle
                          className={styles.circleFill}
                          cx="40"
                          cy="40"
                          r="36"
                          stroke={m.color}
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset: offset }}
                          transition={{ duration: 1.2, delay: 0.6 }}
                        />
                      </svg>
                      <span className={styles.circleValue}>{m.value}</span>
                    </div>
                    <p>{m.label}</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            className={styles.aiCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            <h2><Sparkles size={18} /> AI Tools</h2>
            <div className={styles.aiToolsList}>
              {aiTools.map((tool) => (
                <div key={tool.title} className={styles.aiTool}>
                  <div className={styles.aiToolIcon}>
                    <tool.icon size={20} />
                  </div>
                  <div className={styles.aiToolInfo}>
                    <h4>{tool.title}</h4>
                    <p>{tool.desc}</p>
                  </div>
                  <button
                    className={styles.aiToolBtn}
                    onClick={() => handleAITool(tool.action)}
                  >
                    Try Now
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
