export const faqs = [
  // General
  {
    category: "General",
    question: "What is a YouTube random comment picker?",
    answer: "A YouTube random comment picker is a tool designed to help content creators randomly select winners for their giveaways from the comments section of their YouTube videos. It ensures fairness and transparency by picking a completely random comment without bias."
  },
  {
    category: "General",
    question: "How do I use the youtube comment picker?",
    answer: "Simply copy the URL of your YouTube video, paste it into the search bar on our site, and click 'Fetch Comments'. Once loaded, you can apply filters like duplicate removals or keyword searches, and then hit 'Start Draw' to pick a random winner."
  },
  {
    category: "General",
    question: "Is this random comment picker youtube tool free?",
    answer: "Yes, our YouTube giveaway picker is completely free to use. There are no hidden fees, and you do not need to register or log in to use the core comment picking features."
  },
  {
    category: "General",
    question: "Can I use this for platforms other than YouTube?",
    answer: "Yes! While it is highly optimized as a youtube random comment picker, our tool also supports picking winners from Instagram and TikTok comments using the platform switcher."
  },
  {
    category: "General",
    question: "Do I need to download any software?",
    answer: "No, this is a web-based youtube comment picker. You do not need to install or download anything to your computer or mobile device. Everything works directly in your browser."
  },
  {
    category: "General",
    question: "Can I use it on my mobile phone?",
    answer: "Absolutely. Our random comment picker youtube tool is fully responsive and works perfectly on mobile phones, tablets, and desktop computers."
  },
  {
    category: "General",
    question: "Is there a limit to how many giveaways I can run?",
    answer: "There are no limits! You can use our youtube giveaway picker as many times as you like for as many different videos as you need."
  },

  // YouTube Giveaway Picker specific
  {
    category: "YouTube Giveaway Picker",
    question: "How does the youtube giveaway picker select a winner?",
    answer: "It uses a cryptographic random number generator (using window.crypto) to ensure that the selection process is 100% unbiased, random, and fair. Every single valid comment has an equal chance of winning."
  },
  {
    category: "YouTube Giveaway Picker",
    question: "Can I pick multiple winners?",
    answer: "Yes, once you pick the first winner, you can click 'Draw Next Winner' to pick additional winners from the same comment pool without having to reload the page."
  },
  {
    category: "YouTube Giveaway Picker",
    question: "Will it load all comments if my video has thousands of them?",
    answer: "Yes, our youtube random comment picker is built to handle large videos. It will automatically paginate through the YouTube API to fetch all available top-level comments."
  },
  {
    category: "YouTube Giveaway Picker",
    question: "Does it count replies to comments?",
    answer: "By default, the picker only fetches top-level comments to keep the giveaway fair, as usually, giveaway rules require a direct comment on the video rather than a reply."
  },
  {
    category: "YouTube Giveaway Picker",
    question: "Can I export the list of winners?",
    answer: "Currently, you can generate a visually stunning Certificate of Verification for your winner and save it as an image to share on your social media to prove the draw was fair."
  },
  {
    category: "YouTube Giveaway Picker",
    question: "Does the youtube comment picker work with YouTube Shorts?",
    answer: "Yes! YouTube Shorts use the same comment system as regular videos. Just paste the URL of the Short into our random comment picker youtube tool, and it will fetch the comments perfectly."
  },
  {
    category: "YouTube Giveaway Picker",
    question: "Can I use it for unlisted videos?",
    answer: "As long as the video is publicly accessible or unlisted (not private), our API can fetch the comments. Private videos are not supported as they require authorized access."
  },

  // Filtering and Features
  {
    category: "Filtering and Features",
    question: "How do I filter out duplicate comments?",
    answer: "Our tool has a built-in 'Fair Mode' duplicate filter. When activated, it ensures that each user only gets one entry in the draw, regardless of how many times they commented."
  },
  {
    category: "Filtering and Features",
    question: "Can I filter comments by a specific word or hashtag?",
    answer: "Yes. You can use the 'Required Keyword' filter. Enter a word like #giveaway or a specific phrase, and the youtube comment picker will only select winners from comments containing that exact text."
  },
  {
    category: "Filtering and Features",
    question: "What is the 'Subscribers Only' filter?",
    answer: "When checking comments, we attempt to verify if the user's subscription status is publicly available. If enabled, it filters out commenters who are not subscribed to your channel (note: requires public subscription data)."
  },
  {
    category: "Filtering and Features",
    question: "Can I exclude certain users from winning?",
    answer: "Yes, you can use the Exclusion List feature to blacklist certain usernames or spam keywords, ensuring they are removed from the draw pool before you pick a winner."
  },
  {
    category: "Filtering and Features",
    question: "Can I require users to tag friends?",
    answer: "Yes! We have a 'Minimum @ Mentions' filter. If your giveaway rules require tagging 2 friends, you can set the filter to '2', and only comments with 2 or more @mentions will be eligible."
  },
  {
    category: "Filtering and Features",
    question: "What is the First Comment Bonus?",
    answer: "It's a unique feature of our random comment picker youtube tool that rewards the earliest commenter by giving them multiple virtual entries in the pool, increasing their chances of winning."
  },
  {
    category: "Filtering and Features",
    question: "Can I verify if the winner liked the video?",
    answer: "YouTube's API does not publicly provide data on who liked a video due to privacy reasons. Therefore, you cannot automatically filter by video likes."
  },

  // Privacy and Security
  {
    category: "Privacy and Security",
    question: "Is it safe to use this youtube comment picker?",
    answer: "Absolutely. Our platform is 100% secure. We do not ask for your YouTube password or require you to authenticate via OAuth. We only read publicly available data."
  },
  {
    category: "Privacy and Security",
    question: "Do you store the comments or my data?",
    answer: "No. All comment fetching and filtering happens dynamically. We do not store any video comments, usernames, or winner data in our databases. Everything remains in your browser session."
  },
  {
    category: "Privacy and Security",
    question: "Will my YouTube account be banned for using this?",
    answer: "No. Since you are not logging in and we are only using standard public API endpoints to read data, there is zero risk to your YouTube account."
  },
  {
    category: "Privacy and Security",
    question: "Are the drawings truly random?",
    answer: "Yes. We use cryptographic randomness (not simple pseudo-random functions) to guarantee that every drawing is completely unpredictable and fair."
  },
  {
    category: "Privacy and Security",
    question: "How do I prove to my audience the draw was fair?",
    answer: "You can use our Certificate Generator immediately after picking a winner. It creates a verified graphic showing the winner's details that you can post on your social media."
  },
  {
    category: "Privacy and Security",
    question: "Do you use cookies?",
    answer: "We use local storage strictly to save your theme preferences (dark/light mode) and recent filter settings for your convenience. We do not use tracking cookies."
  },

  // Troubleshooting
  {
    category: "Troubleshooting",
    question: "Why does it say 'Comments are disabled'?",
    answer: "If the tool shows this error, it means the video owner has disabled comments on the YouTube video. A youtube giveaway picker cannot fetch comments if they are turned off."
  },
  {
    category: "Troubleshooting",
    question: "Why is the fetch process taking so long?",
    answer: "If a video has tens of thousands of comments, the YouTube API requires multiple pagination requests to retrieve them all. Please be patient while it compiles the full list."
  },
  {
    category: "Troubleshooting",
    question: "The tool isn't finding my specific comment.",
    answer: "Make sure you haven't accidentally applied a filter (like duplicate removal or keyword) that might have excluded the comment. Also, note that YouTube sometimes marks comments as spam and hides them from the public API."
  },
  {
    category: "Troubleshooting",
    question: "Why did the draw fail?",
    answer: "This usually happens if your filters are too strict (e.g., requiring a keyword that nobody used). Try relaxing your filters and ensure there are valid comments in the 'Filtered' pool before drawing."
  },
  {
    category: "Troubleshooting",
    question: "What if I accidentally close the page?",
    answer: "Since we do not store data on our servers for privacy reasons, closing the page will wipe the current session. You will need to fetch the comments again."
  },
  
  // Advanced Features & Comparisons
  {
    category: "Advanced Features",
    question: "How is the YouTube Comment Random Picker different from YouTube Studio's built-in tools?",
    answer: "YouTube Studio lets you moderate comments manually — one at a time. Our YouTube Comment Random Picker adds automation on top: keyword rules, filtering, and true cryptographic randomness to select winners fairly."
  },
  {
    category: "Advanced Features",
    question: "How does the Raffle Wheel UI ensure fairness?",
    answer: "The Raffle Wheel UI in our YouTube Comment Random Picker is powered by a secure cryptographic algorithm. The spinning animation provides an exciting visual experience for your viewers while guaranteeing a 100% unbiased, random result."
  }
];
