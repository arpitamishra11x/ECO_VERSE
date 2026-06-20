import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Heart, Send, Plus, Search, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEco } from '../context/EcoContext';
import styles from './CommunityPage.module.css';

const CommunityPage = () => {
  const { user, communityPosts, addCommunityPost, likePost, addComment } = useEco();

  const [activeTab, setActiveTab] = useState('Discussions');
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [commentText, setCommentText] = useState('');
  
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('Lifestyle');
  const [searchQuery, setSearchQuery] = useState('');

  const postsForTab = communityPosts.filter(post => 
    post.type === activeTab && 
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;
    addCommunityPost(activeTab, newPostTitle, newPostContent, newPostCategory);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPostForm(false);
  };

  const handleAddComment = (e, postId) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(postId, commentText);
    setCommentText('');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        
        <div className={styles.header}>
          <h1 className={styles.title}>Community Hub</h1>
          <p className={styles.subtitle}>Connect with eco-conscious consumers, ask questions, and share your sustainability journey.</p>
        </div>

        <div className={styles.layout}>
          
          {/* Main Feed Column */}
          <div className={styles.mainFeed}>
            
            {/* Tabs & Search */}
            <div className={styles.feedControls}>
              <div className={styles.tabList}>
                {['Discussions', 'Q&A', 'Eco Blogs'].map(tab => (
                  <button
                    key={tab}
                    className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
                    onClick={() => { setActiveTab(tab); setExpandedPostId(null); }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className={styles.searchBox}>
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search posts..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => setShowNewPostForm(!showNewPostForm)}
                style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              >
                <Plus size={16} /> New Post
              </button>
            </div>

            {/* Create Post Form */}
            {showNewPostForm && (
              <motion.form 
                className={styles.newPostForm}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                onSubmit={handleCreatePost}
              >
                <input
                  type="text"
                  placeholder={`Write a new ${activeTab} title...`}
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className={styles.inputField}
                  required
                />
                <textarea
                  placeholder="What's on your mind?"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className={styles.textareaField}
                  required
                />
                <div className={styles.formFooter}>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className={styles.selectField}
                  >
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="DIY">DIY & Crafts</option>
                    <option value="Advice">Advice</option>
                  </select>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button type="button" className="btn btn-outline" onClick={() => setShowNewPostForm(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Publish</button>
                  </div>
                </div>
              </motion.form>
            )}

            {/* Posts List */}
            <div className={styles.postsList}>
              {postsForTab.length === 0 ? (
                <div className={styles.emptyState}>
                  <MessageSquare size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <h3>No posts found</h3>
                  <p>Be the first to start a conversation in {activeTab}!</p>
                </div>
              ) : (
                postsForTab.map((post, idx) => (
                  <motion.div 
                    key={post.id} 
                    className={styles.postCard}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div 
                      className={styles.postHeader}
                      onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                    >
                      <img 
                        src={post.author === 'GreenLeaf' || post.author === 'Arpita' 
                          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80' 
                          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80'} 
                        alt={post.author} 
                        className={styles.avatar} 
                      />
                      <div className={styles.postMeta}>
                        <h4 className={styles.postTitle}>{post.title}</h4>
                        <div className={styles.authorRow}>
                          <span className={styles.authorName}>{post.author}</span>
                          <span className={styles.bullet}>•</span>
                          <span className={styles.postCategory}>{post.category}</span>
                        </div>
                      </div>
                    </div>

                    {expandedPostId === post.id && (
                      <motion.div 
                        className={styles.expandedContent}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className={styles.postBody}>{post.content}</p>
                        
                        <div className={styles.postActions}>
                          <button 
                            className={`${styles.actionBtn} ${post.likedBy?.includes(user.name) ? styles.liked : ''}`}
                            onClick={() => likePost(post.id)}
                          >
                            <Heart size={16} fill={post.likedBy?.includes(user.name) ? 'currentColor' : 'none'} />
                            <span>{post.likes}</span>
                          </button>
                          <button className={styles.actionBtn}>
                            <MessageSquare size={16} />
                            <span>{post.comments.length}</span>
                          </button>
                        </div>

                        <div className={styles.commentsSection}>
                          {post.comments.map((comment, cidx) => (
                            <div key={cidx} className={styles.commentItem}>
                              <strong>{comment.author}</strong>
                              <span>{comment.content}</span>
                            </div>
                          ))}

                          <form onSubmit={(e) => handleAddComment(e, post.id)} className={styles.commentForm}>
                            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80" alt="You" className={styles.commentAvatar} />
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              value={commentText}
                              onChange={(e) => setCommentText(e.target.value)}
                              className={styles.commentInput}
                            />
                            <button type="submit" className={styles.commentSubmitBtn} disabled={!commentText.trim()}>
                              <Send size={14} />
                            </button>
                          </form>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className={styles.sidebar}>
            
            {/* Top Contributors */}
            <div className={styles.widget}>
              <div className={styles.widgetHeader}>
                <TrendingUp size={18} />
                <h3>Top Contributors</h3>
              </div>
              <div className={styles.userList}>
                <div className={styles.userItem}>
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="GreenLeaf" className={styles.avatarSm} />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>GreenLeaf (You)</span>
                    <span className={styles.userPoints}>1,250 pts</span>
                  </div>
                </div>
                <div className={styles.userItem}>
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="EcoWarrior" className={styles.avatarSm} />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>EcoWarrior</span>
                    <span className={styles.userPoints}>980 pts</span>
                  </div>
                </div>
                <div className={styles.userItem}>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="EarthMate" className={styles.avatarSm} />
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>EarthMate</span>
                    <span className={styles.userPoints}>760 pts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Tags */}
            <div className={styles.widget}>
              <div className={styles.widgetHeader}>
                <Users size={18} />
                <h3>Trending Topics</h3>
              </div>
              <div className={styles.tagsList}>
                <span className={styles.tag}>#ZeroWasteKitchen</span>
                <span className={styles.tag}>#PlasticFreeJuly</span>
                <span className={styles.tag}>#Upcycling</span>
                <span className={styles.tag}>#VeganBeauty</span>
                <span className={styles.tag}>#Composting</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
