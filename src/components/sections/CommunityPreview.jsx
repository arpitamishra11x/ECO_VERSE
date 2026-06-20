import React from 'react';
import { MessageSquare, Heart, Trophy, ArrowRight } from 'lucide-react';
import styles from './CommunityPreview.module.css';

const discussions = [
  {
    id: 1,
    user: 'Alex M.',
    avatar: 'https://i.pravatar.cc/150?img=11',
    topic: 'Best alternatives to single-use coffee pods?',
    likes: 124,
    comments: 45,
    time: '2h ago'
  },
  {
    id: 2,
    user: 'Sarah K.',
    avatar: 'https://i.pravatar.cc/150?img=5',
    topic: 'My first zero-waste grocery shopping trip!',
    likes: 89,
    comments: 22,
    time: '5h ago'
  }
];

const CommunityPreview = () => {
  return (
    <section className={styles.communitySection}>
      <div className={`container ${styles.communityGrid}`}>
        
        {/* Left: Discussions */}
        <div className={styles.discussionsArea}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Eco Community</h2>
            <a href="#" className={styles.viewAll}>Join the Conversation</a>
          </div>

          <div className={styles.discussionList}>
            {discussions.map((post) => (
              <div key={post.id} className={styles.discussionCard}>
                <div className={styles.postHeader}>
                  <img src={post.avatar} alt={post.user} className={styles.avatar} />
                  <div className={styles.postMeta}>
                    <strong>{post.user}</strong>
                    <span>{post.time}</span>
                  </div>
                </div>
                <h3 className={styles.postTopic}>{post.topic}</h3>
                <div className={styles.postActions}>
                  <button className={styles.actionBtn}>
                    <Heart size={16} /> {post.likes}
                  </button>
                  <button className={styles.actionBtn}>
                    <MessageSquare size={16} /> {post.comments}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className={`btn btn-outline ${styles.joinBtn}`}>
            Explore Community Forum <ArrowRight size={18} />
          </button>
        </div>

        {/* Right: Trending / Challenge */}
        <div className={styles.sidebarArea}>
          
          {/* Trending Challenge Widget */}
          <div className={styles.widgetCard}>
            <div className={styles.widgetIconArea}>
              <Trophy size={28} color="var(--primary)" />
            </div>
            <div className={styles.widgetContent}>
              <h4>Trending Challenge</h4>
              <p>#PlasticFreeWeek</p>
              <div className={styles.progressContainer}>
                <div className={styles.progressBar} style={{ width: '65%' }}></div>
              </div>
              <span className={styles.progressText}>12,450 participants</span>
            </div>
          </div>

          {/* Top Contributors Widget */}
          <div className={styles.widgetCard}>
            <div className={styles.widgetContent}>
              <h4>Top Contributors</h4>
              <div className={styles.contributorList}>
                <img src="https://i.pravatar.cc/150?img=32" alt="User" title="Elena" />
                <img src="https://i.pravatar.cc/150?img=12" alt="User" title="Marcus" />
                <img src="https://i.pravatar.cc/150?img=45" alt="User" title="Sophie" />
                <div className={styles.moreContributors}>+42</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CommunityPreview;
