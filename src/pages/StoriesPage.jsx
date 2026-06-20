import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Clock, BookOpen, Mail } from 'lucide-react';
import styles from './StoriesPage.module.css';

const categories = ['All', 'Maker Stories', 'Sustainability', 'Community Impact', 'How-To Guides', 'Behind the Scenes'];

const stories = [
  {
    title: 'The Ancient Art of Cold-Pressed Soap Making',
    category: 'Maker Stories',
    author: 'Meera Devi',
    initials: 'MD',
    date: 'June 10, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80',
    excerpt: 'In the heart of Coimbatore, Meera transforms garden botanicals into luxurious, zero-waste soaps using techniques passed down through generations.'
  },
  {
    title: 'Why Bamboo is the Material of the Future',
    category: 'Sustainability',
    author: 'Dr. Anand Sharma',
    initials: 'AS',
    date: 'June 8, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    excerpt: 'Growing 35 inches per day without pesticides, bamboo might be the answer to our plastic addiction.'
  },
  {
    title: 'From Corporate Job to Conscious Crafting',
    category: 'Maker Stories',
    author: 'Priya Nair',
    initials: 'PN',
    date: 'June 5, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
    excerpt: 'How leaving a tech career led to building a thriving organic textile workshop employing 15 rural women.'
  },
  {
    title: 'Your Guide to a Zero-Waste Kitchen',
    category: 'How-To Guides',
    author: 'EcoVerse Team',
    initials: 'EV',
    date: 'June 2, 2026',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    excerpt: 'Simple swaps that eliminate 80% of kitchen plastic — from beeswax wraps to compostable sponges.'
  },
  {
    title: 'Community Spotlight: 500 Trees Planted in One Weekend',
    category: 'Community Impact',
    author: 'Arjun Mehta',
    initials: 'AM',
    date: 'May 28, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
    excerpt: 'How EcoVerse members came together for the largest community planting event in Bangalore.'
  },
  {
    title: 'Inside Our Transparency Dashboard',
    category: 'Behind the Scenes',
    author: 'EcoVerse Engineering',
    initials: 'EE',
    date: 'May 25, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    excerpt: "A deep dive into how we track and verify every product's environmental impact from source to shelf."
  }
];

const StoriesPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [email, setEmail] = useState('');

  const filteredStories = activeCategory === 'All'
    ? stories
    : stories.filter(s => s.category === activeCategory);

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Hero */}
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Leaf size={36} className={styles.heroLeaf} />
          <h1>Stories</h1>
          <p className={styles.heroSub}>
            Behind every product is a human story of craft, heritage, and hope
          </p>
        </motion.div>

        {/* Featured Story */}
        <motion.div
          className={styles.featured}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <img
            src="https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80"
            alt="Featured story"
            className={styles.featuredImg}
          />
          <div className={styles.featuredOverlay}>
            <span className={styles.featuredBadge}>Featured</span>
            <h2 className={styles.featuredTitle}>
              How a Village in Gujarat is Saving the Ocean, One Clay Cup at a Time
            </h2>
            <div className={styles.featuredMeta}>
              <div className={styles.featuredAvatar}>EV</div>
              <span>EcoVerse Editorial</span>
              <span className={styles.metaDot} />
              <span>June 15, 2026</span>
              <span className={styles.metaDot} />
              <Clock size={13} />
              <span>8 min read</span>
            </div>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className={styles.filterRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`${styles.filterPill} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Stories Grid */}
        <div className={styles.storiesGrid}>
          {filteredStories.map((story, i) => (
            <motion.div
              key={story.title}
              className={styles.storyCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
            >
              <div className={styles.storyImageWrap}>
                <img src={story.image} alt={story.title} className={styles.storyImage} />
                <span className={styles.storyBadge}>{story.category}</span>
              </div>
              <div className={styles.storyContent}>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyExcerpt}>{story.excerpt}</p>
                <div className={styles.storyFooter}>
                  <div className={styles.storyAuthor}>
                    <div className={styles.authorAvatar}>{story.initials}</div>
                    <span className={styles.authorName}>{story.author}</span>
                  </div>
                  <div className={styles.storyMeta}>
                    <span>{story.date.split(', ')[0].split(' ').slice(0, 2).join(' ')}</span>
                    <span>·</span>
                    <span>{story.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <motion.div
          className={styles.newsletter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <BookOpen size={28} style={{ color: 'var(--primary)', marginBottom: '0.75rem' }} />
          <h2>Subscribe to Our Stories</h2>
          <p>Get weekly stories of sustainability, craft, and conscious living delivered to your inbox.</p>
          <form className={styles.nlForm} onSubmit={(e) => { e.preventDefault(); setEmail(''); }}>
            <input
              type="email"
              placeholder="Enter your email"
              className={styles.nlInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className={styles.nlBtn}>Subscribe</button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default StoriesPage;
