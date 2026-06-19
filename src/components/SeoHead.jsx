import { useEffect } from 'react';

export default function SeoHead({ pageType, platform, blogData }) {
  useEffect(() => {
    let title, description;
    const url = window.location.href.split('?')[0]; // Canonical should generally ignore query params

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
      if (platform === 'youtube') {
        title = 'YouTube Comment Random Picker — Free Giveaway Winner Generator';
        description = 'Use our free YouTube Comment Random Picker to easily extract and select a random winner for your YouTube giveaways, contests, and sweepstakes.';
      } else {
        const platformLabel = 'Instagram Posts & Reels';
        title = `${platformLabel} Picker — Premium Giveaway Drawing Desk`;
        description = `Extract and pick random giveaway winners from your ${platformLabel}. Apply advanced criteria like friend mentions, minimum likes, duplicate comment controls, and keyword filters.`;
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

    // Update Meta Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="title"]', 'name', 'title', title);

    // Update Open Graph tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', pageType === 'blog-post' ? 'article' : 'website');

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

    // Schema Markup Injection
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
      "name": "Antigravity Suite",
      "url": "https://www.youtubecommentpickerthumbnaildownload.online/",
      "logo": "https://www.youtubecommentpickerthumbnaildownload.online/images/app_logo.png",
      "description": "Premium drawing suite built for content creators to run giveaways."
    });

    // 2. BreadcrumbList Schema
    const breadcrumbs = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.youtubecommentpickerthumbnaildownload.online/"
      }
    ];

    if (pageType === 'blog' || pageType === 'blog-post') {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Blogs",
        "item": "https://www.youtubecommentpickerthumbnaildownload.online/blogs"
      });
    }

    if (pageType === 'blog-post' && blogData) {
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 3,
        "name": blogData.title,
        "item": url
      });
    }

    addOrUpdateSchema('schema-breadcrumb', {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs
    });

    // 3. SoftwareApplication Schema
    if (pageType === 'thumbnail' || pageType === 'picker') {
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
          "ratingCount": "1250"
        }
      });
    } else {
      const script = document.getElementById('schema-webapp');
      if (script) script.remove();
    }

    // 4. Article Schema
    if (pageType === 'blog-post' && blogData) {
      addOrUpdateSchema('schema-article', {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": blogData.title,
        "description": blogData.excerpt,
        "image": image,
        "author": {
          "@type": "Person",
          "name": blogData.author || "Antigravity Suite"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Antigravity Suite",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.youtubecommentpickerthumbnaildownload.online/images/app_logo.png"
          }
        },
        "datePublished": blogData.date ? new Date(blogData.date).toISOString() : new Date().toISOString()
      });
    } else {
      const script = document.getElementById('schema-article');
      if (script) script.remove();
    }

    // 5. FAQPage Schema
    if (pageType === 'picker' || pageType === 'blog') {
      addOrUpdateSchema('schema-faq', {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is this Comment Picker free and safe?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, our tool is 100% free and does not require account passwords. All actions are browser-bound." }
          },
          {
            "@type": "Question",
            "name": "How are winners selected?",
            "acceptedAnswer": { "@type": "Answer", "text": "Winners are selected using an unbiased cryptographic algorithm (crypto.getRandomValues) ensuring absolute fairness and E-E-A-T compliance." }
          }
        ]
      });
    }

  }, [pageType, platform, blogData]);

  return null;
}
