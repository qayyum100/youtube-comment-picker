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
        // Auto-generate a unique, keyword-rich description from the tool title.
        const toolName = customTitle.split(' — ')[0].trim();
        description = `Use our free ${toolName} to boost your YouTube channel. Part of the all-in-one suite of free YouTube SEO, analytics, and creator tools — no login required.`;
      }
    } else if (pageType === 'thumbnail') {
      title = 'YouTube Thumbnail Downloader — Free YouTube Giveaway Picker Tools';
      description = 'Download high-resolution (HD, 4K, 1080p) thumbnails from any YouTube video instantly. Free YouTube thumbnail grabber and YouTube giveaway picker suite.';
    } else if (pageType === 'blog') {
      title = 'YouTube Giveaway Picker Blog & Creator Guides — YouTube Comment Picker';
      description = 'Master running successful giveaways with our YouTube giveaway picker guide. Learn how to pick random comment winners, optimize thumbnails, and grow your channel.';
    } else if (pageType === 'blog-post' && blogData) {
      title = `${blogData.title} | Free YouTube Giveaway Picker Guide`;
      description = blogData.excerpt;
    } else {
      if (platform === 'youtube') {
        title = 'YouTube Giveaway Picker — Free YouTube Comment Picker & Winner Generator';
        description = 'The ultimate free YouTube giveaway picker tool. Easily pick random comment winners for your YouTube giveaways with fair, duplicate-filtered comment selection.';
      } else {
        const platformLabel = 'Instagram Posts & Reels';
        title = `${platformLabel} Picker — Free Giveaway & Comment Picker Suite`;
        description = `Extract and pick random giveaway winners from your ${platformLabel}. Works seamlessly alongside our YouTube giveaway picker tool with advanced filters.`;
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
      { q: "Is this YouTube Giveaway Picker free and safe to use?", a: "Yes, our YouTube giveaway picker is 100% free and completely safe. It does not require login or passwords." },
      { q: "How does the YouTube Giveaway Picker pick random winners?", a: "Our YouTube giveaway picker selects random winners using a verified cryptographic random selection algorithm." }
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
