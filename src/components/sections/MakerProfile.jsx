import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Heart, Plus, Users, Award, Play, MessageSquare, Star, Mail } from 'lucide-react';
import { useEco } from '../../context/EcoContext';
import ProductCard from '../shared/ProductCard';
import styles from './MakerProfile.module.css';

const MakerProfile = ({ makerId, onBack }) => {
  const { makers, products, addReviewToMaker, followMaker, triggerNotification } = useEco();
  
  // Find the selected maker
  const maker = makers.find(m => m.id === makerId) || makers[0];

  const [isFollowed, setIsFollowed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // Review form states
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Contact form states
  const [contactMsg, setContactMsg] = useState('');

  // Sourced products by this maker
  const makerProducts = products.filter(p => p.makerId === maker.id);

  const handleFollow = () => {
    if (!isFollowed) {
      followMaker(maker.id);
      setIsFollowed(true);
    } else {
      setIsFollowed(false);
      triggerNotification('Unfollowed maker.', 'info');
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addReviewToMaker(maker.id, { rating, comment });
    setComment('');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactMsg.trim()) return;
    triggerNotification(`Message sent to ${maker.name}! They typically respond in 24 hours.`, 'success');
    setContactMsg('');
  };

  return (
    <div className={`container ${styles.profile}`}>
      
      {/* Back Button */}
      <button className={styles.backBtn} onClick={onBack}>
        <ArrowLeft size={16} />
        <span>Back to Makers Directory</span>
      </button>

      {/* Header Panel */}
      <div className={styles.profileHeader}>
        <div className={styles.headerLeft}>
          <img src={maker.image} alt={maker.name} className={styles.avatar} />
          <div className={styles.actionRow}>
            <button 
              className="btn btn-primary" 
              onClick={handleFollow}
              style={{ flex: 1, fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              <Users size={14} />
              <span>{isFollowed ? 'Following' : 'Follow Maker'}</span>
            </button>
            <button 
              className="btn btn-outline" 
              onClick={() => { setIsLiked(!isLiked); triggerNotification(isLiked ? 'Removed maker from favorites' : 'Added maker to favorites'); }}
              aria-label="Favorite Maker"
            >
              <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} color={isLiked ? '#ef4444' : 'currentColor'} />
            </button>
          </div>
        </div>

        <div className={styles.headerRight}>
          <div className={styles.nameRow}>
            <div>
              <h1 className={styles.name}>{maker.name}</h1>
              <span className={styles.location}>
                <MapPin size={14} />
                {maker.location}
              </span>
            </div>
            <span className={styles.certBadge}>Verified Partner</span>
          </div>

          <p className={styles.desc}>{maker.longDescription || maker.description}</p>

          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{maker.stats.products}+</span>
              <span className={styles.statLbl}>Products Sourced</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{maker.stats.rating} ★</span>
              <span className={styles.statLbl}>Average Rating</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>{maker.stats.co2}</span>
              <span className={styles.statLbl}>CO₂ Reduced</span>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Certifications</h4>
            <div className={styles.certsList}>
              {maker.certifications.map((cert, cidx) => (
                <span key={cidx} className={styles.certBadge}>
                  <Award size={12} />
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Story & Video Panel */}
      <div className={styles.contentGrid}>
        <div>
          <h3 className={styles.sectionTitle}>Artisan Story & Journey</h3>
          <div className={styles.timeline}>
            {maker.story.map((node, nidx) => (
              <div key={nidx} className={styles.timelineNode}>
                <span className={styles.timelineYear}>{node.year}</span>
                <h4 className={styles.timelineTitle}>{node.title}</h4>
                <p className={styles.timelineDesc}>{node.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={styles.sectionTitle}>Video Story</h3>
          {!showVideo ? (
            <div className={styles.videoMock} onClick={() => { setShowVideo(true); triggerNotification('Playing Video Story...', 'info'); }}>
              <img src="https://images.unsplash.com/photo-1559650656-5d1d361ad10e?w=500&q=80" alt="Pottery Video Mock" className={styles.videoImg} />
              <div className={styles.playBtn}>
                <Play size={24} fill="currentColor" />
              </div>
            </div>
          ) : (
            <div className={styles.videoMock} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: 'white' }}>
              <span style={{ fontSize: '0.85rem', textAlign: 'center', padding: '1rem' }}>
                🎥 Video is playing. Imagine a high-definition documentary of the maker's workshop here.
              </span>
              <button 
                onClick={() => setShowVideo(false)} 
                style={{ position: 'absolute', top: 10, right: 10, color: 'white', background: 'rgba(255,255,255,0.2)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Workshop Gallery */}
      <div>
        <h3 className={styles.sectionTitle}>Workshop Gallery</h3>
        <div className={styles.workshopGallery}>
          {maker.gallery.map((img, idx) => (
            <img key={idx} src={img} alt={`${maker.name} Workshop ${idx + 1}`} className={styles.galleryImg} />
          ))}
        </div>
      </div>

      {/* Products by Maker */}
      <div>
        <h3 className={styles.sectionTitle}>Products Sourced From {maker.name}</h3>
        <div className={styles.productsGrid}>
          {makerProducts.map((prod, idx) => (
            <Link to={`/products/${prod.slug}`} key={prod.id}>
              <ProductCard product={prod} index={idx} />
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews & Contact Forms */}
      <div className={styles.formRow}>
        <div>
          <h3 className={styles.sectionTitle}>Reviews ({maker.reviews.length})</h3>
          <div className={styles.reviewsBlock}>
            {maker.reviews.length === 0 ? (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>No reviews yet. Be the first to share your purchase experience!</p>
            ) : (
              maker.reviews.map((review, ridx) => (
                <div key={ridx} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>{review.author}</span>
                    <span className={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < review.rating ? 'currentColor' : 'none'} />
                      ))}
                    </span>
                  </div>
                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))
            )}
          </div>

          {/* Review Submission Form */}
          <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Write a Review</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Rating:</span>
              <select 
                value={rating} 
                onChange={(e) => setRating(parseInt(e.target.value))} 
                style={{ padding: '0.25rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <textarea
              placeholder="Share your feedback on their craftsmanship..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={styles.inputField}
              style={{ height: '80px', resize: 'none' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', alignSelf: 'flex-end' }}>
              Submit Review
            </button>
          </form>
        </div>

        {/* Contact Maker Block */}
        <div className={styles.card} style={{ alignSelf: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
            <Mail size={18} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', margin: 0 }}>Contact {maker.name}</h3>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Ask details about their production process, raw materials, or request custom bulk designs.</p>
          <form onSubmit={handleContactSubmit}>
            <textarea
              placeholder="Write your message here..."
              value={contactMsg}
              onChange={(e) => setContactMsg(e.target.value)}
              className={styles.inputField}
              style={{ height: '110px', resize: 'none', marginBottom: '1rem' }}
              required
            />
            <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '0.85rem' }}>
              Send Message
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default MakerProfile;
