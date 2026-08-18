import { useEffect } from 'react';

export default function SeoHead({ pageType, platform, blogData, title: customTitle, description: customDescription, faqs: customFaqs, canonicalUrl }) {
  useEffect(() => {
    let title, description;
    
    // Dynamic Canonical URL calculation: strictly use the active pathname
    const origin = 'https://www.youtubecommentpickerthumbnaildownload.online';
    const activePath = window.location.pathname;
    const currentCanonical = canonicalUrl ? `${origin}${canonicalUrl}` : `${origin}${activePath}`;

    if (customTitle) {
      title = customTitle;
      if (customDescription) {
        description = customDescription;
      } else {
        const toolName = customTitle.split(' — ')[0].trim();
        description = `Use our free ${toolName} to boost your YouTube channel. Part of the all-in-one suite of free YouTube SEO, analytics, and creator tools — no login required.`;
      }
    } else if (pageType === 'thumbnail') {
      title = 'YouTube Thumbnail Downloader — Free HD & 4K Thumbnail Grabber';
      description = 'Download high-resolution (HD, 4K, 1080p) thumbnails from any YouTube video instantly. Free YouTube thumbnail downloader — part of the YouTube creator tools suite.';
    } else if (pageType === 'blog') {
      title = 'YouTube Creator Guides & SEO Blog — YouTube Giveaway Picker';
      description = 'Expert guides on running YouTube giveaways, picking random comment winners, and growing your channel. Free tutorials and creator strategies.';
    } else if (pageType === 'blog-post' && blogData) {
      title = `${blogData.title} | YouTube Creator Guide`;
      description = blogData.excerpt;
    } else {
      if (platform === 'youtube') {
        title = 'YouTube Giveaway Picker — Free Random YouTube Comment Winner Picker';
        description = 'Free YouTube giveaway picker: randomly select winners from YouTube comments in seconds. Filter duplicates, require entry keywords, exclude replies, pick multiple winners. No login required.';
      } else if (platform === 'instagram') {
        title = 'Instagram Giveaway Picker — Free Random Comment Winner Selector';
        description = 'Free Instagram giveaway comment picker to randomly select winners from Instagram posts and Reels. Fair and transparent comment winner selection.';
      } else {
        title = 'TikTok Giveaway Picker — Free Random Comment Winner Selector';
        description = 'Free TikTok giveaway comment picker to pick random winners from TikTok video comments. Part of our free creator tools suite.';
      }
    }

    let image = `${origin}/og-image.png`;
    if (pageType === 'blog-post' && blogData && blogData.image) {
      image = `${origin}${blogData.image}`;
    }

    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (attributeName, attributeValue, content) => {
      let tag = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attributeName, attributeValue);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Remove legacy meta keywords tag if present
    const legacyKeywords = document.querySelector('meta[name="keywords"]');
    if (legacyKeywords) legacyKeywords.remove();

    // Update Meta Description & Title
    updateMetaTag('name', 'description', description);
    updateMetaTag('name', 'title', title);

    // Update Open Graph tags
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', currentCanonical);
    updateMetaTag('property', 'og:image', image);
    updateMetaTag('property', 'og:type', pageType === 'blog-post' ? 'article' : 'website');
    updateMetaTag('property', 'og:locale', 'en_US');

    // Advanced Article Meta Tags
    if (pageType === 'blog-post' && blogData) {
      if (blogData.date) updateMetaTag('property', 'article:published_time', new Date(blogData.date).toISOString());
      if (blogData.author) updateMetaTag('property', 'article:author', blogData.author);
    }

    // Update Twitter tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:url', currentCanonical);
    updateMetaTag('name', 'twitter:image', image);

    // Update Canonical link tag dynamically per page
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentCanonical;

    // Update hreflang tags
    let hreflang = document.querySelector('link[hreflang="x-default"]');
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = 'x-default';
      document.head.appendChild(hreflang);
    }
    hreflang.href = currentCanonical;

    let hreflangEn = document.querySelector('link[hreflang="en"]');
    if (!hreflangEn) {
      hreflangEn = document.createElement('link');
      hreflangEn.rel = 'alternate';
      hreflangEn.hreflang = 'en';
      document.head.appendChild(hreflangEn);
    }
    hreflangEn.href = currentCanonical;

    // Schema Markup Injection Helper
    const addOrUpdateSchema = (id, schemaObj) => {
      let script = document.getElementById(id);
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = id;
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schemaObj);
    };

    // 1. Organization Schema
    addOrUpdateSchema('schema-organization', {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "YouTube Giveaway Picker Tool Suite",
      "url": origin,
      "logo": `${origin}/images/app_logo.png`,
      "description": "Free YouTube Giveaway Picker tool to select random comment winners for YouTube giveaways."
    });

    // 2. SoftwareApplication Schema for Tools
    if (pageType === 'tool' || pageType === 'thumbnail' || pageType === 'picker' || customTitle) {
      addOrUpdateSchema('schema-webapp', {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": title,
        "url": currentCanonical,
        "description": description,
        "applicationCategory": "BrowserApplication",
        "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "1850"
        }
      });
    }

    // 3. FAQPage Schema for AI Overviews / SGE
    const activeFaqs = customFaqs || (pageType === 'picker' || pageType === 'blog' ? [
      {
        q: 'What is a YouTube giveaway picker?',
        a: 'A YouTube giveaway picker is a free browser-based tool that randomly selects winners from a YouTube video\'s comment section. Our YouTube giveaway picker uses the official YouTube Data API v3 to load public comments, then picks random winners with duplicate filtering and keyword criteria.'
      },
      {
        q: 'Is the YouTube giveaway picker free to use?',
        a: 'Yes, 100% free with no account creation or software download required.'
      }
    ] : null);

    if (activeFaqs && activeFaqs.length > 0) {
      addOrUpdateSchema('schema-faq', {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": activeFaqs.map(item => ({
          "@type": "Question",
          "name": item.question || item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer || item.a
          }
        }))
      });
    }

  }, [pageType, platform, blogData, customTitle, customDescription, customFaqs, canonicalUrl]);

  return null;
}
