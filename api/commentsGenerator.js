// Helper to generate realistic sandbox comments for YouTube and Instagram
const YOUTUBE_USERNAMES = [
  '@tech_guru_99', '@daily_vlogger', '@gaming_beast', '@cooking_with_maria',
  '@travel_nomad', '@makeup_by_sara', '@fitness_journey', '@lofi_beats_relax',
  '@cody_codes', '@crypto_trader', '@music_lover_x', '@bookworm_reads',
  '@diy_hacks', '@nature_pics', '@science_guy', '@movie_buff_24',
  '@gardening_tips', '@photo_guy', '@sports_fanatic', '@pet_lover_deluxe',
  '@finance_tips', '@artist_canvas', '@comedy_central_fan', '@history_buff',
  '@fashion_style', '@coffee_addict', '@gadget_reviewer', '@minimalist_life',
  '@skater_boy_9', '@foodie_adventures', '@wellness_coach', '@guitar_shredder',
  '@star_gazer', '@retro_collector', '@ocean_breeze'
];

const INSTAGRAM_USERNAMES = [
  '@elena.travels', '@justin_fit', '@sarah_creates', '@chef.dan',
  '@alex_captures', '@nails.by.kelly', '@sound_of_vinyl', '@green_thumb_girl',
  '@skate_and_destroy', '@sneaker_head_90', '@wanderlust_couple', '@minimal.home',
  '@keto.kitchen.mama', '@hype_beast_la', '@cozy.reading.nook', '@pixel_perfect',
  '@yoga_with_clara', '@plant_based_sophie', '@vintage_thrift_finds', '@bike.commuter',
  '@makeup.glam.by.rose', '@coder_life', '@vinyl.records.club', '@wildlife.lens',
  '@doodle.artist.sam', '@brunch_lovers', '@espresso.shots', '@furry.friends.co',
  '@diy.crafts.home', '@astrology_now', '@runners_high', '@guitar.riffs',
  '@glow.skincare', '@design_inspiration', '@neon_vibes_only'
];

const TIKTOK_USERNAMES = [
  '@dance.king', '@trending_now', '@viral_vibes', '@funny.vids.only',
  '@cooking_hacks_101', '@prank_master', '@lip_sync_queen', '@aesthetic_edits',
  '@pov_creator', '@duet_this_vid', '@storytime.with.me', '@meme.dealer',
  '@transition.god', '@tiktok.finds', '@daily.hacks', '@foryoupage.only'
];

const YOUTUBE_COMMENTS_TEMPLATES = [
  { text: "Awesome video! I really want to win the prize! #giveaway @alex_m @josh_t", likes: 85 },
  { text: "Hope I get lucky this time! Great content as always. @friend_tester", likes: 12 },
  { text: "Count me in! #giveaway Let's go! 🚀", likes: 45 },
  { text: "Wow, this is an incredible video. Very informative.", likes: 8 },
  { text: "Been following you since 1k subscribers, you deserve all the growth! @chloe_reads @dan_travels #giveaway", likes: 120 },
  { text: "I need this prize so much! Thank you for hosting. @some_body", likes: 23 },
  { text: "Awesome! #giveaway", likes: 3 },
  { text: "First comment! Pick me please", likes: 0 },
  { text: "Subscribed! Love your style.", likes: 9 },
  { text: "Can't wait for the next video. Good luck everyone! @user_one @user_two @user_three", likes: 56 },
  { text: "Is this worldwide or only US? Hoping to win anyway!", likes: 14 },
  { text: "This giveaway is insane! @bro_gaming @sis_gaming", likes: 38 },
  { text: "Please pick me! I've shared the video. #giveaway", likes: 19 },
  { text: "Bitcoin to the moon! Check my profile for free cryptos!", likes: 0 }, // Spam indicator
  { text: "The editing on this video is top tier. Keep it up!", likes: 31 },
  { text: "Awesome stuff. Count me in @ryan_v @michaels", likes: 27 },
  { text: "Hoping to win the grand prize! 🍀 #giveaway @lucky_charms", likes: 42 },
  { text: "Can you make a video about CSS gradients next? Awesome work.", likes: 7 },
  { text: "I love this community. Good luck guys! #giveaway @mateo @marisa", likes: 15 },
  { text: "Best channel on YouTube. Period.", likes: 62 },
  { text: "Count me in! @test_handle #giveaway", likes: 5 },
  { text: "No way, this is amazing! @friend_a @friend_b @friend_c @friend_d", likes: 93 },
  { text: "I never win these things, but here's my entry! @hopeful_me", likes: 11 },
  { text: "Great video structure. Subscribed and liked!", likes: 4 },
  { text: "Omg pick me! @best_friend #giveaway", likes: 21 },
  { text: "What song did you use at 3:15? Also #giveaway!", likes: 2 },
  { text: "Yes please! @gamer123 @coder456", likes: 17 },
  { text: "Outstanding content. Respect. @my_mentor", likes: 50 },
  { text: "Count me in! I've been waiting for this.", likes: 8 },
  { text: "Giveaway time! Good luck! @all_my_friends", likes: 13 },
  { text: "Nice video. Check out my channel too!", likes: 1 }, // Mild spam
  { text: "I want this so bad! #giveaway @friend1", likes: 10 },
  { text: "Absolute legend. Awesome video.", likes: 29 },
  { text: "Yes! #giveaway @sister_love @brother_love", likes: 16 },
  { text: "Best content on the platform.", likes: 34 }
];

const INSTAGRAM_COMMENTS_TEMPLATES = [
  { text: "Oh my god I need this! 😍 @bestie_one @bestie_two #giveaway", likes: 92 },
  { text: "Pick me! @ryan_travels @chloe_fit", likes: 18 },
  { text: "Shared to my stories! Hope I win! #giveaway", likes: 41 },
  { text: "Wow, gorgeous post. Best of luck everyone!", likes: 5 },
  { text: "Count me in! @friend_a @friend_b @friend_c #giveaway", likes: 112 },
  { text: "Such a beautiful feed! @insta_styling", likes: 12 },
  { text: "Hoping to win the grand prize! 🤞🍀", likes: 22 },
  { text: "Love this brand so much! @mom_makes_cookies @dad_bakes_cakes #giveaway", likes: 67 },
  { text: "Done! Liked, followed, and tagged @my_partner", likes: 14 },
  { text: "This is a dream giveaway! ✨ @friend1 @friend2 @friend3 @friend4", likes: 134 },
  { text: "Yes please! 💖 #giveaway", likes: 7 },
  { text: "Check my profile for money hacks! 🔥", likes: 0 }, // Spam
  { text: "I need these items in my life! @sara.m.decor", likes: 29 },
  { text: "Such a generous giveaway, thank you! @user_test_one", likes: 33 },
  { text: "Already imagine using this! @sister_power", likes: 16 },
  { text: "Crossing my fingers! 🤞 #giveaway", likes: 25 },
  { text: "Amazing brand! Count me in!", likes: 9 },
  { text: "Can't wait to see who wins! @friend_a @friend_b", likes: 54 },
  { text: "So excited! 🔥 #giveaway @hype_man", likes: 19 },
  { text: "Beautiful aesthetic as always.", likes: 11 },
  { text: "Count me in! @tag1 @tag2", likes: 8 },
  { text: "This would look perfect in my room! @room_decor_guru @decor_chic #giveaway", likes: 78 },
  { text: "Please pick me, I love this account!", likes: 3 },
  { text: "Awesome giveaway! @mate_one", likes: 15 },
  { text: "Let's goooo! 🔥 @besties_forever", likes: 20 },
  { text: "Followed and tagged @brother_love @sister_love #giveaway", likes: 37 },
  { text: "Omg yes! 💖 @friend_x", likes: 12 },
  { text: "Super cool. Good luck all!", likes: 6 },
  { text: "Count me in! #giveaway @partner_in_crime", likes: 27 },
  { text: "Perfect timing, I was just looking for this!", likes: 13 },
  { text: "I want to win this for my sister @sis_sweet", likes: 22 },
  { text: "This is so cool! @friend_1 @friend_2", likes: 49 },
  { text: "Hope I get lucky today! #giveaway", likes: 10 },
  { text: "Pure aesthetic gold. Love it.", likes: 15 },
  { text: "Count me in! @user_abc @user_def", likes: 14 }
];

const TIKTOK_COMMENTS_TEMPLATES = [
  { text: "POV: You found the best giveaway 🔥 @friend_one", likes: 1205 },
  { text: "Wait I actually need this rn 💀 @user_xyz", likes: 809 },
  { text: "First! Also #giveaway", likes: 45 },
  { text: "This is the sign I was looking for ✨", likes: 340 },
  { text: "Not me wanting this immediately 😭 @bestie", likes: 210 },
  { text: "The algorithm brought me here for a reason 🍀", likes: 530 },
  { text: "Yes please! Shared the link! 🔗", likes: 110 },
  { text: "Entering! Good luck everyone! @my_friend_1 @my_friend_2", likes: 88 }
];

export function generateMockComments(platform, count = 30) {
  const finalCount = Math.max(24, Math.min(35, count));
  const templates = platform === 'youtube' ? YOUTUBE_COMMENTS_TEMPLATES : platform === 'instagram' ? INSTAGRAM_COMMENTS_TEMPLATES : TIKTOK_COMMENTS_TEMPLATES;
  const usernames = platform === 'youtube' ? YOUTUBE_USERNAMES : platform === 'instagram' ? INSTAGRAM_USERNAMES : TIKTOK_USERNAMES;
  
  // Shuffle arrays to ensure variety on each fetch
  const shuffledTemplates = [...templates].sort(() => 0.5 - Math.random());
  const shuffledUsernames = [...usernames].sort(() => 0.5 - Math.random());
  
  const comments = [];
  for (let i = 0; i < finalCount; i++) {
    const template = shuffledTemplates[i % shuffledTemplates.length];
    const username = shuffledUsernames[i % shuffledUsernames.length];
    
    // Generate dates within the last 7 days
    const daysAgo = Math.floor(Math.random() * 7);
    const hoursAgo = Math.floor(Math.random() * 24);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(date.getHours() - hoursAgo);
    
    comments.push({
      id: `${platform}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      author: username,
      authorAvatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${username.replace('@', '')}`,
      text: template.text,
      likes: template.likes + Math.floor(Math.random() * 10), // Add slight random variation
      timestamp: date.toISOString(),
      platform: platform,
      isSubscribed: Math.random() > 0.3
    });
  }
  
  return comments;
}
