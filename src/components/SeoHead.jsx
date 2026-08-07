import { useEffect } from 'react';

export default function SeoHead({ pageType, platform, blogData, title: customTitle, description: customDescription, faqs: customFaqs }) {
  useEffect(() => {
    let title, description;
    const url = window.location.href.split('?')[0]; // Canonical should generally ignore query params

    if (customTitle) {
      // Custom title is provided by the individual tool page — use it directly.
      title = customTitle;
      if (customDescription) {
        description = customDescription;
      } else {
        const toolName = customTitle.split(' — ')[0].trim();
        description = `Use our free ${toolName} to boost your YouTube channel. Part of the all-in-one suite of free YouTube SEO, analytics, and creator tools — no login required.`;
      }
    } else if (pageType === 'thumbnail') {
      title = 'YouTube Thumbnail Downloader — Free HD Thumbnail Grabber | YouTube Giveaway Picker Suite';
      description = 'Download high-resolution (HD, 4K, 1080p) thumbnails from any YouTube video instantly. Free YouTube thumbnail downloader — part of the #1 YouTube giveaway picker & creator tools suite.';
    } else if (pageType === 'blog') {
      title = 'YouTube Giveaway Picker Blog & Creator Guides — Free YouTube Comment Picker';
      description = 'Expert guides on running YouTube giveaways, picking random comment winners, and growing your channel. From the team behind the #1 free YouTube giveaway picker tool.';
    } else if (pageType === 'blog-post' && blogData) {
      title = `${blogData.title} | YouTube Giveaway Picker Blog`;
      description = blogData.excerpt;
    } else {
      if (platform === 'youtube') {
        title = 'YouTube Giveaway Picker — Free Random YouTube Comment Winner Picker';
        description = 'Free YouTube giveaway picker: randomly select winners from YouTube comments in seconds. Filter duplicates, require entry keywords, exclude replies, pick multiple winners. No login. No install. 100% free.';
      } else if (platform === 'instagram') {
        title = 'Instagram Giveaway Picker — Free Random Comment Winner Selector';
        description = 'Free Instagram giveaway comment picker to randomly select winners from Instagram posts and Reels. Works with our YouTube giveaway picker for cross-platform giveaway management.';
      } else {
        title = 'TikTok Giveaway Picker — Free Random Comment Winner Selector';
        description = 'Free TikTok giveaway comment picker to pick random winners from TikTok video comments. Part of our free YouTube giveaway picker & creator tools suite.';
      }
    }

    let image = 'https://www.youtubecommentpickerthumbnaildownload.online/og-image.png';
    if (pageType === 'blog-post' && blogData && blogData.image) {
      image = `https://www.youtubecommentpickerthumbnaildownload.online${blogData.image}`;
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

    // Keywords meta
    const keywordsMap = {
      picker: 'youtube giveaway picker, youtube comment picker, free youtube giveaway picker, random youtube comment picker, youtube giveaway winner picker, pick random youtube comment, youtube random comment picker, youtube giveaway tool, youtube comment winner selector, youtube giveaway picker free, youtube giveaway picker no login, pick youtube comment winner',
      thumbnail: 'youtube thumbnail downloader, download youtube thumbnail, youtube thumbnail grabber, hd youtube thumbnail, youtube giveaway picker',
      blog: 'youtube giveaway picker, youtube giveaway guide, youtube comment winner, youtube creator tips',
    };
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', keywordsMap[pageType] || 'youtube giveaway picker, youtube creator tools');

    // Update Meta Description & Title
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="title"]', 'name', 'title', title);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', pageType === 'blog-post' ? 'article' : 'website');
    updateMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // Advanced Article Meta Tags
    if (pageType === 'blog-post' && blogData) {
      if (blogData.date) updateMetaTag('meta[property="article:published_time"]', 'property', 'article:published_time', new Date(blogData.date).toISOString());
      if (blogData.author) updateMetaTag('meta[property="article:author"]', 'property', 'article:author', blogData.author);
    }

    // Update Twitter tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', url);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', image);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Update hreflang tags for internationalization
    let hreflang = document.querySelector('link[hreflang="x-default"]');
    if (!hreflang) {
      hreflang = document.createElement('link');
      hreflang.rel = 'alternate';
      hreflang.hreflang = 'x-default';
      document.head.appendChild(hreflang);
    }
    hreflang.href = url;

    let hreflangEn = document.querySelector('link[hreflang="en"]');
    if (!hreflangEn) {
      hreflangEn = document.createElement('link');
      hreflangEn.rel = 'alternate';
      hreflangEn.hreflang = 'en';
      document.head.appendChild(hreflangEn);
    }
    hreflangEn.href = url;

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
      "name": "YouTube Giveaway Picker Tool",
      "url": "https://www.youtubecommentpickerthumbnaildownload.online/",
      "logo": "https://www.youtubecommentpickerthumbnaildownload.online/images/app_logo.png",
      "description": "Free YouTube Giveaway Picker tool to select random comment winners for YouTube giveaways."
    });

    // 2. SoftwareApplication Schema for Tools
    if (pageType === 'tool' || pageType === 'thumbnail' || pageType === 'picker') {
      addOrUpdateSchema('schema-webapp', {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": title,
        "url": url,
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
        a: 'A YouTube giveaway picker is a free browser-based tool that randomly selects winners from a YouTube video\'s comment section. Our YouTube giveaway picker uses the official YouTube Data API v3 to load all public comments, then picks a random winner using a cryptographically secure algorithm. It supports duplicate filtering, keyword entry requirements, reply exclusion, and multi-winner selection.'
      },
      {
        q: 'How does the YouTube giveaway picker pick random winners?',
        a: 'Our YouTube giveaway picker connects to the YouTube Data API v3, fetches every public comment from your video, applies your selected filters (keyword, no replies, unique users), then uses a cryptographically secure random selection algorithm to pick one or more winners — guaranteeing zero bias and complete fairness for every YouTube comment giveaway.'
      },
      {
        q: 'Is the YouTube giveaway picker completely free?',
        a: 'Yes. Our YouTube giveaway picker is 100% free — no account, no subscription, no Chrome extension required, and no download needed. Simply paste your YouTube video URL and pick a random comment winner instantly, from any browser on any device.'
      },
      {
        q: 'Can the YouTube giveaway picker filter by keyword?',
        a: 'Yes. The YouTube giveaway picker lets you require a specific keyword in comments (e.g. only pick comments containing \'giveaway\'), exclude replies, deduplicate by username, and pick multiple winners — giving you full control over your giveaway entry rules.'
      },
      {
        q: 'Does the YouTube giveaway picker work for Instagram and TikTok too?',
        a: 'Yes. In addition to the YouTube giveaway picker, we also offer a free Instagram giveaway picker and TikTok giveaway picker — letting you run fair, filtered comment giveaways across all major video platforms from the same tool suite.'
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

  }, [pageType, platform, blogData, customTitle, customDescription, customFaqs]);

  return null;
}
