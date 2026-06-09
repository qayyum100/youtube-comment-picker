import { useEffect } from 'react';

export default function SeoHead({ pageType, platform, blogData }) {
  useEffect(() => {
    let title, description;
    const url = window.location.href;

    if (pageType === 'thumbnail') {
      title = 'YouTube Thumbnail Downloader — Extract High Quality Images';
      description = 'Download high-resolution (HD, 4K, 1080p) thumbnails from any YouTube video instantly. Free YouTube thumbnail grabber tool.';
    } else if (pageType === 'blog') {
      title = 'Creator Resources & Guides — YouTube Comment Picker';
      description = 'Master the art of social media growth. Learn how to run viral giveaways, optimize your thumbnails, and build an engaged audience.';
    } else if (pageType === 'blog-post' && blogData) {
      title = `${blogData.title} | Creator Guides`;
      description = blogData.excerpt;
    } else {
      const platformLabel = platform === 'youtube' ? 'YouTube Video Comments' : 'Instagram Posts & Reels';
      title = `${platformLabel} Picker — Premium Giveaway Drawing Desk`;
      description = `Extract and pick random giveaway winners from your ${platformLabel}. Apply advanced criteria like friend mentions, minimum likes, duplicate comment controls, and keyword filters.`;
    }

    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (selector, attributeName, attributeValue, content) => {
      let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeName, attributeValue);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Update Meta Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="title"]', 'name', 'title', title);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', url);

    // Update Twitter tags
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', url);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }, [pageType, platform]);

  return null;
}
