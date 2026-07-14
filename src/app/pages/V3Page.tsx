import { useState, useEffect } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import rockiesDugoutStoreLogo from 'figma:asset/1717564bc045af2e8f8bd35047159ec02ff7f332.png';
import qrCodeImage from 'figma:asset/b9628d4d8098c6045d44024c676c518113d231dd.png';

// Jersey gender images
import mensJersey from 'figma:asset/7b283d0edb826e9c6b5279679f65967ffbd771d4.png';
import womensJersey from 'figma:asset/ffc35dc818ca6f0bafe6e94fc1452ee63b2c1b12.png';
import kidsJersey from 'figma:asset/5a7f7ab96b43917431ba83a6048bfb985e938938.png';

// Jersey images
import jerseyAlternateCustom from 'figma:asset/ef4cb378f1e0daed4d97a27d2d8f12133dc52192.png';
import jerseyHolliday from 'figma:asset/40d95895eba567275870437d7ec8df1ad5ed01ef.png';
import jerseyBlackmon from 'figma:asset/1b09fe72d9cbf8d01ab67b21f3fb3883321f64ed.png';
import jerseyMoniak from 'figma:asset/b8ba20d1fac1c54325750698eba37c14b210c544.png';
import jerseyTovar from 'figma:asset/b334627fe6a592d19db7dcff93a05cce9e999c43.png';
import jerseyCityConnect from 'figma:asset/2c931a94a930066cc88adfdcec87211204793638.png';
import jerseyWhiteHome from 'figma:asset/8471ab97fa8a764a1564be91c41bd8fe66d60ccb.png';
import jerseyHelton from 'figma:asset/1d672fce16abc5a034258d42495275d3c60bc36a.png';

// Category images for merchandise search
import capImage from 'figma:asset/44714432be17174334dba06cbb3401cebe336ea5.png';
import hoodieImageNew from 'figma:asset/dfac117c27faa85d398435675b2bfa78103e5682.png';
import jerseyImageNew from 'figma:asset/407198bd3759ef1c145b7c4fdb4ef3102d75af5f.png';
import tshirtImageNew from 'figma:asset/28e637a58902efbd8fcb2480658252034b2e6844.png';
import jacketImage from 'figma:asset/c138dfa64079d775f4bebf351a4f27c9048cb869.png';
import memorabiliaImage from 'figma:asset/e127a7c86cdad3460ec02bafca37278732debd25.png';
import accessoriesImage from 'figma:asset/8978599d8800b23885f556e3777ba7dd745b01c5.png';
import gameUsedImage from 'figma:asset/1b072b60802d5272fe641385605039aec659c7d5.png';

// Cap gender images
import mensCap from '../../imports/Image_4-9-26_at_10.53 AM_(1).png';
import womensCap from '../../imports/Image_4-9-26_at_10.54 AM_(2).png';
import childrensCap from '../../imports/Image_4-9-26_at_10.56 AM_(1).png';

// Men's cap images
import mensCapBlackPurple59FIFTY from '../../imports/Image_4-9-26_at_10.48 AM.png';
import mensCapLightBlue2025CityConnect from '../../imports/Image_4-9-26_at_10.52 AM.png';
import mensCapBlackPlayerReplica9SEVENTY from '../../imports/Image_4-9-26_at_10.53 AM.png';
import mensCapBlackPurplePlayerReplica9FORTY from '../../imports/Image_4-9-26_at_10.53 AM_(1).png';
import mensCapGreen2022CityConnect from '../../imports/Image_4-9-26_at_10.53 AM_(2).png';
import mensCapBlackCooperstownRise from '../../imports/Image_4-9-26_at_10.54 AM.png';

// Women's cap images
import womensCapWhiteBlackScript from '../../imports/Image_4-9-26_at_10.54 AM_(1).png';
import womensCapLightBlueCityConnect from '../../imports/Image_4-9-26_at_10.54 AM_(2).png';
import womensCapPinkMothersDay from '../../imports/Image_4-9-26_at_10.55 AM.png';

// Children's cap images
import childrensCapLavenderUnicorn from '../../imports/Image_4-9-26_at_10.55 AM_(2).png';
import childrensCapNaturalBlackFrameOut from '../../imports/Image_4-9-26_at_10.56 AM.png';
import childrensCapLightPinkPosey from '../../imports/Image_4-9-26_at_10.56 AM_(1).png';

const translations: Record<string, any> = {
  English: {
    welcome: {
      title: "Step up to the Plate!",
      subtitle: "Take the Colorado Rockies survey and catch a",
      discount: "10% discount",
      subtitleEnd: "on your next in-store purchase!",
      selectLanguage: "Select Your Language",
      selectLocation: "Select Your Location",
      chooseLocation: "Choose your location...",
      zipCode: "Zip Code",
      enterZip: "Enter 5-digit zip",
      startSurvey: "Start Survey",
      disclaimer: "The 10% discount is redeemable exclusively at the Colorado Rockies Dugout Store and is valid for thirty days from your purchase date. Please check your email for details on how to redeem your discount. Thank you for participating in the Colorado Rockies Dugout Store survey—your feedback will help us enhance our service to all fans and customers."
    },
    questions: {
      title: "Didn't buy? Tell us why!",
      q1: "Were you able to find what you were looking for?",
      q2: "Are you satisfied with your shopping experience?",
      q3: "Did you interact with any associates today?",
      yes: "Yes",
      no: "No",
      back: "Back",
      continue: "Continue"
    },
    merchandiseSearch: {
      title: "What Rockies merch were you looking for?",
      searchPlaceholder: "Search for items...",
      selectCategory: "Select Category",
      chooseCategory: "Choose a category...",
      selectGender: "Select Gender",
      chooseGender: "Choose gender...",
      selectSize: "Select Size",
      chooseSize: "Choose size...",
      selectStyle: "Select Style",
      chooseStyle: "Choose style...",
      addItem: "Add Item",
      customItem: "Add custom item...",
      yourSelections: "Your Selections",
      remove: "Remove",
      back: "Back",
      continue: "Continue"
    },
    outOfStock: {
      title: "We're Sorry",
      message: "The merchandise you wanted is currently out of stock. We're working to have availability again soon.",
      back: "Back",
      continue: "Continue"
    },
    shoppingExperience: {
      title: "What Affected Your Shopping Experience?",
      subtitle: "Select all that apply",
      options: [
        "I could not find the item I wanted.",
        "The checkout process was difficult.",
        "The wait time was too long.",
        "I needed assistance and did not receive any.",
        "The associate was unfriendly.",
        "Other"
      ],
      otherPlaceholder: "Please specify...",
      back: "Back",
      continue: "Continue"
    },
    associateRating: {
      title: "How Would You Rate Your Associate Interaction?",
      subtitle: "Your feedback helps us improve",
      satisfied: "Satisfied",
      neutral: "Neutral",
      dissatisfied: "Dissatisfied",
      back: "Back",
      continue: "Continue"
    },
    thankYou: {
      title: "Thank you for sharing your opinion with us",
      subtitle: "Submit your survey to receive your 10% discount",
      submitButton: "Submit Survey"
    },
    qrCode: {
      title: "Thank You for Your Feedback!",
      subtitle: "Scan the QR code below to receive your 10% off discount",
      returningText: "Returning to start in"
    }
  }
};

export function V3Page() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'questions' | 'merchandiseSearch' | 'jerseyGenderSelection' | 'capsGenderSelection' | 'jerseySelection' | 'capsSelection' | 'outOfStock' | 'shoppingExperience' | 'associateRating' | 'thankYou' | 'qrCode'>('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [cityState, setCityState] = useState<{ city: string; state: string } | null>(null);
  const [isLoadingZip, setIsLoadingZip] = useState(false);
  const [foundItem, setFoundItem] = useState<boolean | null>(null);
  const [satisfied, setSatisfied] = useState<boolean | null>(null);
  const [interactedWithAssociate, setInteractedWithAssociate] = useState<boolean | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [completedCategories, setCompletedCategories] = useState<string[]>([]);
  const [selectedJerseyGender, setSelectedJerseyGender] = useState<string | null>(null);
  const [selectedCapGender, setSelectedCapGender] = useState<string | null>(null);
  const [jerseySearchQuery, setJerseySearchQuery] = useState('');
  const [capSearchQuery, setCapSearchQuery] = useState('');
  const [selectedJerseys, setSelectedJerseys] = useState<string[]>([]);
  const [selectedCaps, setSelectedCaps] = useState<string[]>([]);
  const [showSizeColorModal, setShowSizeColorModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [jerseyColor, setJerseyColor] = useState('');
  const [experienceIssues, setExperienceIssues] = useState<string[]>([]);
  const [showOtherModal, setShowOtherModal] = useState(false);
  const [otherIssueText, setOtherIssueText] = useState('');
  const [associateRating, setAssociateRating] = useState<'satisfied' | 'neutral' | 'dissatisfied' | null>(null);
  const [countdown, setCountdown] = useState(60);

  const languages = [
    { code: 'English', name: 'English' },
    { code: 'Spanish', name: 'Español' },
    { code: 'Korean', name: '한국어' },
    { code: 'Japanese', name: '日本語' },
    { code: 'Chinese', name: '中文' }
  ];

  const locationsByLanguage: Record<string, string[]> = {
    English: ['United States', 'Canada', 'Mexico', 'United Kingdom', 'Japan', 'South Korea', 'China', 'Other'],
    Spanish: ['Estados Unidos', 'Canadá', 'México', 'Reino Unido', 'Japón', 'Corea del Sur', 'China', 'Otro'],
    Korean: ['미국', '캐나다', '멕시코', '영국', '일본', '한국', '중국', '기타'],
    Japanese: ['アメリカ', 'カナダ', 'メキシコ', 'イギリス', '日本', '韓国', '中国', 'その他'],
    Chinese: ['美国', '加拿大', '墨西哥', '英国', '日本', '韩国', '中国', '其他']
  };

  const locations = locationsByLanguage[selectedLanguage] || locationsByLanguage.English;

  const t = translations[selectedLanguage] || translations.English;

  // Jersey data
  const jerseys = [
    { name: 'Nike Alternate Limited Custom Jersey', image: jerseyAlternateCustom },
    { name: 'Matt Holliday Nike Home Retired Player Replica', image: jerseyHolliday },
    { name: 'Charlie Blackmon Nike White Home Replica', image: jerseyBlackmon },
    { name: 'Mickey Moniak Nike White Home Replica', image: jerseyMoniak },
    { name: 'Ezequiel Tovar Nike White Home Replica', image: jerseyTovar },
    { name: 'Nike Purple/Light Blue 2025 City Connect Limited', image: jerseyCityConnect },
    { name: 'Nike White Home Limited', image: jerseyWhiteHome },
    { name: 'Todd Helton Nike White Home Retired Player Replica', image: jerseyHelton },
  ];

  // Men's Cap data
  const mensCaps = [
    { name: "Men's Colorado Rockies New Era Black/Purple Authentic Collection On Field 59FIFTY Structured Hat", image: mensCapBlackPurple59FIFTY },
    { name: "Men's Colorado Rockies New Era Light Blue 2025 City Connect 59FIFTY Fitted Hat", image: mensCapLightBlue2025CityConnect },
    { name: "Men's Colorado Rockies New Era Black Player Replica 9SEVENTY Adjustable Hat", image: mensCapBlackPlayerReplica9SEVENTY },
    { name: "Men's Colorado Rockies New Era Black/Purple Player Replica 9FORTY Adjustable Hat", image: mensCapBlackPurplePlayerReplica9FORTY },
    { name: "Men's Colorado Rockies New Era Green 2022 City Connect Low Profile 59FIFTY Fitted Hat", image: mensCapGreen2022CityConnect },
    { name: "Men's Colorado Rockies Nike Black Cooperstown Collection Rise Adjustable Hat", image: mensCapBlackCooperstownRise },
  ];

  // Women's Cap data
  const womensCaps = [
    { name: "Unisex Colorado Rockies Nike Light Blue/White 2025 City Connect Club Adjustable Trucker Hat", image: womensCapLightBlueCityConnect },
    { name: "Unisex Colorado Rockies Mitchell & Ness White/Black XL Script Pro Crown Adjustable Hat", image: womensCapWhiteBlackScript },
    { name: "Unisex Colorado Rockies Nike Pink Mother's Day Club Adjustable Hat", image: womensCapPinkMothersDay },
  ];

  // Children's Cap data
  const childrensCaps = [
    { name: "Girls Youth Colorado Rockies '47 Lavender Unicorn Clean Up Adjustable Hat", image: childrensCapLavenderUnicorn },
    { name: "Youth Colorado Rockies '47 Natural/Black Frame Out Hitch Adjustable Hat", image: childrensCapNaturalBlackFrameOut },
    { name: "Girls Youth Colorado Rockies '47 Light Pink Posey Clean Up Adjustable Hat", image: childrensCapLightPinkPosey },
  ];

  // Filter and sort jerseys based on search query
  const filteredJerseys = jerseySearchQuery
    ? jerseys
        .filter(jersey =>
          jersey.name.toLowerCase().includes(jerseySearchQuery.toLowerCase())
        )
        .concat(
          jerseys.filter(jersey =>
            !jersey.name.toLowerCase().includes(jerseySearchQuery.toLowerCase())
          )
        )
    : jerseys;

  // Filter and sort caps based on search query and gender
  const capsArray = selectedCapGender === "Men's" ? mensCaps : selectedCapGender === "Women's" ? womensCaps : selectedCapGender === "Children's" ? childrensCaps : [];
  const filteredCaps = capSearchQuery
    ? capsArray
        .filter(cap =>
          cap.name.toLowerCase().includes(capSearchQuery.toLowerCase())
        )
        .concat(
          capsArray.filter(cap =>
            !cap.name.toLowerCase().includes(capSearchQuery.toLowerCase())
          )
        )
    : capsArray;

  const handleZipCodeChange = async (zip: string) => {
    setZipCode(zip);
    setCityState(null);

    if (zip.length === 5 && /^\d{5}$/.test(zip)) {
      setIsLoadingZip(true);
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
        if (response.ok) {
          const data = await response.json();
          const place = data.places[0];
          setCityState({
            city: place['place name'],
            state: place['state abbreviation']
          });
        } else {
          setCityState(null);
        }
      } catch (error) {
        console.error('Error fetching zip code data:', error);
        setCityState(null);
      } finally {
        setIsLoadingZip(false);
      }
    }
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setZipCode('');
    setCityState(null);
  };

  const isUnitedStates = () => {
    const usTranslations = ['United States', 'Estados Unidos', '미국', 'アメリカ', '美国'];
    return usTranslations.includes(selectedLocation);
  };

  // Countdown timer for QR code screen
  useEffect(() => {
    if (currentScreen === 'qrCode') {
      setCountdown(60);

      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            navigateToScreen('welcome');
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [currentScreen]);

  const navigateToScreen = (screen: 'welcome' | 'questions' | 'merchandiseSearch' | 'jerseyGenderSelection' | 'capsGenderSelection' | 'jerseySelection' | 'capsSelection' | 'outOfStock' | 'shoppingExperience' | 'associateRating' | 'thankYou' | 'qrCode') => {
    setCurrentScreen(screen);

    // Reset completed categories when going back to welcome
    if (screen === 'welcome') {
      setCompletedCategories([]);
    }
  };

  const navigateBack = () => {
    if (currentScreen === 'questions') {
      setCurrentScreen('welcome');
    } else if (currentScreen === 'merchandiseSearch') {
      setCurrentScreen('questions');
      setCompletedCategories([]);
    } else if (currentScreen === 'jerseyGenderSelection') {
      setCurrentScreen('merchandiseSearch');
      setCompletedCategories([]);
    } else if (currentScreen === 'capsGenderSelection') {
      // If jerseys were completed, go back to jersey selection
      if (completedCategories.includes('Jerseys')) {
        // Remove Jerseys from completed to allow going back
        setCompletedCategories(prev => prev.filter(cat => cat !== 'Jerseys'));
        setCurrentScreen('jerseySelection');
      } else {
        setCurrentScreen('merchandiseSearch');
      }
    } else if (currentScreen === 'jerseySelection') {
      setCurrentScreen('jerseyGenderSelection');
    } else if (currentScreen === 'capsSelection') {
      setCurrentScreen('capsGenderSelection');
    } else if (currentScreen === 'outOfStock') {
      if (selectedCategories.includes('Caps') && !completedCategories.includes('Caps')) {
        setCurrentScreen('capsSelection');
      } else if (selectedCategories.includes('Jerseys') && !completedCategories.includes('Jerseys')) {
        setCurrentScreen('jerseySelection');
      } else {
        setCurrentScreen('merchandiseSearch');
      }
    } else if (currentScreen === 'shoppingExperience') {
      if (foundItem === false) {
        setCurrentScreen('outOfStock');
      } else {
        setCurrentScreen('questions');
      }
    } else if (currentScreen === 'associateRating') {
      setCurrentScreen('shoppingExperience');
    } else if (currentScreen === 'thankYou') {
      setCurrentScreen('associateRating');
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const toggleJersey = (jersey: string) => {
    setSelectedJerseys(prev => {
      if (prev.includes(jersey)) {
        return prev.filter(j => j !== jersey);
      } else {
        return [...prev, jersey];
      }
    });
  };

  const toggleCap = (cap: string) => {
    setSelectedCaps(prev => {
      if (prev.includes(cap)) {
        return prev.filter(c => c !== cap);
      } else {
        return [...prev, cap];
      }
    });
  };

  return (
    <div className="flex-1 flex items-center justify-center h-screen bg-slate-200">
      {/* Tablet frame */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-[3rem] p-6 shadow-2xl">
        {/* Screen */}
        <div
          className="relative bg-black rounded-[2rem] overflow-hidden shadow-inner"
          style={{
            width: '1024px',
            height: '768px',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
          }}
        >
          {/* Survey Content */}
          <div
            className="w-full h-full flex items-center justify-center p-12 relative overflow-hidden"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1583124974189-d0a8daa3406b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxDb29ycyUyMEZpZWxkJTIwQ29sb3JhZG8lMjBSb2NraWVzJTIwYmFzZWJhbGwlMjBzdGFkaXVtJTIwZmllbGR8ZW58MXx8fHwxNzc2MzYzMTU1fDA&ixlib=rb-4.1.0&q=80&w=1080)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#041E42]/60 via-[#041E42]/40 to-[#BF0D3E]/30"></div>

            {/* Main Survey Card - Landscape Layout */}
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="bg-white/75 rounded-3xl shadow-2xl p-6 border border-white/50 w-[850px] h-[650px] relative">

                {currentScreen === 'welcome' ? (
                  <div className="flex flex-col items-center justify-between h-full">
                    {/* Middle - Main Headline */}
                    <div className="text-center mb-2">
                    {/* Colorado Rockies Dugout Store Logo */}
                    <div className="mb-0 flex justify-center">
                      <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-48 w-auto" />
                    </div>

                    <h2 className="text-3xl font-bold text-[#041E42] leading-tight mb-1">
                      {t.welcome.title}
                    </h2>
                    <p className="text-2xl text-slate-700 leading-relaxed">
                      {t.welcome.subtitle}{' '}
                      <span className="text-[#BF0D3E] font-bold">{t.welcome.discount}</span>{' '}
                      {t.welcome.subtitleEnd}
                    </p>
                  </div>

                  {/* Bottom Section - Form Fields */}
                  <div className="w-full space-y-4" style={{ minHeight: '310px' }}>
                    {/* Language and Location in a row */}
                    <div className="grid grid-cols-2 gap-5">
                      {/* Language Selection */}
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 text-sm">
                          {t.welcome.selectLanguage}
                        </label>
                        <div className="relative">
                          <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full appearance-none bg-white/90 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#041E42] focus:ring-2 focus:ring-[#041E42]/20 transition-all cursor-pointer shadow-sm"
                          >
                            {languages.map((lang) => (
                              <option key={lang.code} value={lang.code}>
                                {lang.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                        </div>
                      </div>

                      {/* Location Selection */}
                      <div>
                        <label className="block text-slate-700 font-semibold mb-2 text-sm">
                          {t.welcome.selectLocation}
                        </label>
                        <div className="relative">
                          <select
                            value={selectedLocation}
                            onChange={(e) => handleLocationChange(e.target.value)}
                            className="w-full appearance-none bg-white/90 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#BF0D3E] focus:ring-2 focus:ring-[#BF0D3E]/20 transition-all cursor-pointer shadow-sm"
                          >
                            <option value="">{t.welcome.chooseLocation}</option>
                            {locations.map((location) => (
                              <option key={location} value={location}>
                                {location}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" size={18} />
                        </div>
                      </div>
                    </div>

                    {/* Zip Code Input */}
                    <div className="grid grid-cols-2 gap-5 h-[72px]">
                      {isUnitedStates() && (
                        <>
                          <div>
                            <label className="block text-slate-700 font-semibold mb-2 text-sm">
                              {t.welcome.zipCode}
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => handleZipCodeChange(e.target.value)}
                                placeholder={t.welcome.enterZip}
                                maxLength={5}
                                className="w-full appearance-none bg-white/90 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#BF0D3E] focus:ring-2 focus:ring-[#BF0D3E]/20 transition-all shadow-sm"
                              />
                              {isLoadingZip && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"></path>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* City and State Display */}
                          {cityState && (
                            <div>
                              <label className="block text-slate-700 font-semibold mb-2 text-sm">
                                City, State
                              </label>
                              <div className="w-full bg-slate-100 border-2 border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-800 min-h-[44px]">
                                {`${cityState.city}, ${cityState.state}`}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    {/* Start Button */}
                    <button
                      disabled={!selectedLocation || (isUnitedStates() && !cityState)}
                      onClick={() => navigateToScreen('questions')}
                      className="w-full bg-gradient-to-r from-black to-[#9333EA] text-white font-bold text-lg py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {t.welcome.startSurvey}
                    </button>

                    {/* Disclaimer */}
                    <div className="pt-3 border-t border-slate-300">
                      <p className="text-[10px] text-slate-600 leading-relaxed text-center">
                        {t.welcome.disclaimer}
                      </p>
                    </div>
                  </div>
                </div>
                ) : currentScreen === 'questions' ? (
                  <div className="flex flex-col h-full pt-6">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="mb-4 flex justify-center">
                        <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#041E42] leading-tight">
                        {t.questions.title}
                      </h2>
                    </div>

                    {/* Questions Container - 3 Columns */}
                    <div className="flex-1 grid grid-cols-3 gap-6 px-8 pt-12">
                      {/* Question 1 */}
                      <div className="flex flex-col items-center text-center">
                        <p className="text-base font-semibold text-slate-800 mb-4">
                          {t.questions.q1}
                        </p>
                        <div className="flex flex-col gap-3 w-full">
                          <button
                            onClick={() => setFoundItem(foundItem === true ? null : true)}
                            className={`relative w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                              foundItem === true
                                ? 'bg-gradient-to-r from-black to-[#9333EA] text-white shadow-md'
                                : 'bg-white text-slate-700'
                            }`}
                            style={{
                              border: '2px solid transparent',
                              backgroundImage: foundItem === true
                                ? 'linear-gradient(to right, black, #9333EA)'
                                : 'linear-gradient(white, white), linear-gradient(to right, black, #9333EA)',
                              backgroundOrigin: 'border-box',
                              backgroundClip: foundItem === true ? 'border-box' : 'padding-box, border-box',
                            }}
                          >
                            {t.questions.yes}
                          </button>
                          <button
                            onClick={() => setFoundItem(foundItem === false ? null : false)}
                            className={`relative w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                              foundItem === false
                                ? 'bg-gradient-to-r from-black to-[#9333EA] text-white shadow-md'
                                : 'bg-white text-slate-700'
                            }`}
                            style={{
                              border: '2px solid transparent',
                              backgroundImage: foundItem === false
                                ? 'linear-gradient(to right, black, #9333EA)'
                                : 'linear-gradient(white, white), linear-gradient(to right, black, #9333EA)',
                              backgroundOrigin: 'border-box',
                              backgroundClip: foundItem === false ? 'border-box' : 'padding-box, border-box',
                            }}
                          >
                            {t.questions.no}
                          </button>
                        </div>
                      </div>

                      {/* Question 2 */}
                      <div className="flex flex-col items-center text-center">
                        <p className="text-base font-semibold text-slate-800 mb-4">
                          {t.questions.q2}
                        </p>
                        <div className="flex flex-col gap-3 w-full">
                          <button
                            onClick={() => setSatisfied(satisfied === true ? null : true)}
                            className={`relative w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                              satisfied === true
                                ? 'bg-gradient-to-r from-black to-[#9333EA] text-white shadow-md'
                                : 'bg-white text-slate-700'
                            }`}
                            style={{
                              border: '2px solid transparent',
                              backgroundImage: satisfied === true
                                ? 'linear-gradient(to right, black, #9333EA)'
                                : 'linear-gradient(white, white), linear-gradient(to right, black, #9333EA)',
                              backgroundOrigin: 'border-box',
                              backgroundClip: satisfied === true ? 'border-box' : 'padding-box, border-box',
                            }}
                          >
                            {t.questions.yes}
                          </button>
                          <button
                            onClick={() => setSatisfied(satisfied === false ? null : false)}
                            className={`relative w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                              satisfied === false
                                ? 'bg-gradient-to-r from-black to-[#9333EA] text-white shadow-md'
                                : 'bg-white text-slate-700'
                            }`}
                            style={{
                              border: '2px solid transparent',
                              backgroundImage: satisfied === false
                                ? 'linear-gradient(to right, black, #9333EA)'
                                : 'linear-gradient(white, white), linear-gradient(to right, black, #9333EA)',
                              backgroundOrigin: 'border-box',
                              backgroundClip: satisfied === false ? 'border-box' : 'padding-box, border-box',
                            }}
                          >
                            {t.questions.no}
                          </button>
                        </div>
                      </div>

                      {/* Question 3 */}
                      <div className="flex flex-col items-center text-center">
                        <p className="text-base font-semibold text-slate-800 mb-4">
                          {t.questions.q3}
                        </p>
                        <div className="flex flex-col gap-3 w-full">
                          <button
                            onClick={() => setInteractedWithAssociate(interactedWithAssociate === true ? null : true)}
                            className={`relative w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                              interactedWithAssociate === true
                                ? 'bg-gradient-to-r from-black to-[#9333EA] text-white shadow-md'
                                : 'bg-white text-slate-700'
                            }`}
                            style={{
                              border: '2px solid transparent',
                              backgroundImage: interactedWithAssociate === true
                                ? 'linear-gradient(to right, black, #9333EA)'
                                : 'linear-gradient(white, white), linear-gradient(to right, black, #9333EA)',
                              backgroundOrigin: 'border-box',
                              backgroundClip: interactedWithAssociate === true ? 'border-box' : 'padding-box, border-box',
                            }}
                          >
                            {t.questions.yes}
                          </button>
                          <button
                            onClick={() => setInteractedWithAssociate(interactedWithAssociate === false ? null : false)}
                            className={`relative w-full py-2.5 rounded-lg font-medium text-sm transition-all ${
                              interactedWithAssociate === false
                                ? 'bg-gradient-to-r from-black to-[#9333EA] text-white shadow-md'
                                : 'bg-white text-slate-700'
                            }`}
                            style={{
                              border: '2px solid transparent',
                              backgroundImage: interactedWithAssociate === false
                                ? 'linear-gradient(to right, black, #9333EA)'
                                : 'linear-gradient(white, white), linear-gradient(to right, black, #9333EA)',
                              backgroundOrigin: 'border-box',
                              backgroundClip: interactedWithAssociate === false ? 'border-box' : 'padding-box, border-box',
                            }}
                          >
                            {t.questions.no}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-8 px-12">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        {t.questions.back}
                      </button>
                      <button
                        disabled={foundItem === null || satisfied === null || interactedWithAssociate === null}
                        onClick={() => {
                          if (foundItem === false) {
                            navigateToScreen('merchandiseSearch');
                          } else if (foundItem === true && satisfied === false) {
                            navigateToScreen('shoppingExperience');
                          } else if (foundItem === true && satisfied === true && interactedWithAssociate === true) {
                            navigateToScreen('associateRating');
                          } else {
                            navigateToScreen('thankYou');
                          }
                        }}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {t.questions.continue}
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'merchandiseSearch' ? (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center mb-1">
                      {/* Colorado Rockies Dugout Store Logo */}
                      <div className="mb-0 flex justify-center">
                        <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                      </div>
                      <h2 className="text-xl font-bold text-[#041E42] leading-tight">
                        {t.merchandiseSearch.title}
                      </h2>
                      <p className="text-xs text-slate-600 mt-1">
                        Select all that apply
                      </p>
                    </div>

                    {/* Category Boxes */}
                    <div className="flex-1 flex items-center justify-center px-8 py-2">
                      <div className="grid grid-cols-4 gap-2 w-full max-w-6xl">
                        {/* Jerseys */}
                        <button
                          onClick={() => toggleCategory('Jerseys')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('Jerseys')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={jerseyImageNew} alt="Jersey" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('Jerseys') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">Jerseys</span>
                        </button>

                        {/* Caps */}
                        <button
                          onClick={() => toggleCategory('Caps')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('Caps')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={capImage} alt="Cap" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('Caps') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">Caps</span>
                        </button>

                        {/* Hoodies */}
                        <button
                          onClick={() => toggleCategory('Hoodies')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('Hoodies')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={hoodieImageNew} alt="Hoodie" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('Hoodies') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">Hoodies</span>
                        </button>

                        {/* T-Shirts */}
                        <button
                          onClick={() => toggleCategory('T-Shirts')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('T-Shirts')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={tshirtImageNew} alt="T-Shirt" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('T-Shirts') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">T-Shirts</span>
                        </button>

                        {/* Jackets */}
                        <button
                          onClick={() => toggleCategory('Jackets')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('Jackets')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={jacketImage} alt="Jacket" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('Jackets') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">Jackets</span>
                        </button>

                        {/* Accessories */}
                        <button
                          onClick={() => toggleCategory('Accessories')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('Accessories')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={accessoriesImage} alt="Accessories" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('Accessories') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">Accessories</span>
                        </button>

                        {/* Memorabilia */}
                        <button
                          onClick={() => toggleCategory('Memorabilia')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('Memorabilia')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={memorabiliaImage} alt="Memorabilia" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('Memorabilia') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">Memorabilia</span>
                        </button>

                        {/* Game Used */}
                        <button
                          onClick={() => toggleCategory('Game Used')}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-xl font-semibold transition-all bg-white ${
                            selectedCategories.includes('Game Used')
                              ? 'shadow-[inset_0_0_0_4px_#33006F] text-[#041E42]'
                              : selectedCategories.length > 0
                              ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-slate-400 opacity-50'
                              : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] text-[#041E42]'
                          }`}
                        >
                          <div className="h-24 flex items-center justify-center">
                            <img src={gameUsedImage} alt="Game Used" className={`h-full w-auto object-contain ${selectedCategories.length > 0 && !selectedCategories.includes('Game Used') ? 'opacity-50' : ''}`} />
                          </div>
                          <span className="text-xs">Game Used</span>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-2 px-12">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={selectedCategories.length === 0}
                        onClick={() => {
                          if (selectedCategories.includes('Jerseys')) {
                            navigateToScreen('jerseyGenderSelection');
                          } else if (selectedCategories.includes('Caps')) {
                            navigateToScreen('capsGenderSelection');
                          } else {
                            navigateToScreen('outOfStock');
                          }
                        }}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'jerseyGenderSelection' ? (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center px-8 pt-2 pb-3">
                      {/* Colorado Rockies Dugout Store Logo */}
                      <div className="mb-3 flex justify-center">
                        <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-32 w-auto" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#041E42] leading-tight mb-2">
                        What Style Jersey were you looking for?
                      </h2>
                    </div>

                    {/* Gender Selection Boxes */}
                    <div className="flex-1 px-12 py-2 flex items-start justify-center">
                      <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
                        {/* Men's Jerseys */}
                        <button
                          onClick={() => {
                            setSelectedJerseyGender(selectedJerseyGender === "Men's" ? null : "Men's");
                          }}
                          className={`flex flex-col items-center justify-center gap-4 p-10 rounded-xl font-semibold transition-all bg-white ${
                            selectedJerseyGender === "Men's"
                              ? 'shadow-[inset_0_0_0_4px_#33006F]'
                              : selectedJerseyGender && selectedJerseyGender !== "Men's"
                              ? 'shadow-[inset_0_0_0_4px_rgb(203,213,225)] opacity-50'
                              : 'shadow-[inset_0_0_0_4px_rgb(203,213,225)]'
                          }`}
                        >
                          <div className="h-40 flex items-center justify-center">
                            <img src={mensJersey} alt="Men's Jersey" className="h-full w-auto object-contain" />
                          </div>
                          <span className="text-lg text-[#041E42] text-center leading-tight">
                            Men
                          </span>
                        </button>

                        {/* Women's Jerseys */}
                        <button
                          onClick={() => {
                            setSelectedJerseyGender(selectedJerseyGender === "Women's" ? null : "Women's");
                          }}
                          className={`flex flex-col items-center justify-center gap-4 p-10 rounded-xl font-semibold transition-all bg-white ${
                            selectedJerseyGender === "Women's"
                              ? 'shadow-[inset_0_0_0_4px_#33006F]'
                              : selectedJerseyGender && selectedJerseyGender !== "Women's"
                              ? 'shadow-[inset_0_0_0_4px_rgb(203,213,225)] opacity-50'
                              : 'shadow-[inset_0_0_0_4px_rgb(203,213,225)]'
                          }`}
                        >
                          <div className="h-40 flex items-center justify-center">
                            <img src={womensJersey} alt="Women's Jersey" className="h-full w-auto object-contain" />
                          </div>
                          <span className="text-lg text-[#041E42] text-center leading-tight">
                            Women
                          </span>
                        </button>

                        {/* Kid's Jerseys */}
                        <button
                          onClick={() => {
                            setSelectedJerseyGender(selectedJerseyGender === "Kid's" ? null : "Kid's");
                          }}
                          className={`flex flex-col items-center justify-center gap-4 p-10 rounded-xl font-semibold transition-all bg-white ${
                            selectedJerseyGender === "Kid's"
                              ? 'shadow-[inset_0_0_0_4px_#33006F]'
                              : selectedJerseyGender && selectedJerseyGender !== "Kid's"
                              ? 'shadow-[inset_0_0_0_4px_rgb(203,213,225)] opacity-50'
                              : 'shadow-[inset_0_0_0_4px_rgb(203,213,225)]'
                          }`}
                        >
                          <div className="h-40 flex items-center justify-center">
                            <img src={kidsJersey} alt="Kid's Jersey" className="h-full w-auto object-contain" />
                          </div>
                          <span className="text-lg text-[#041E42] text-center leading-tight">
                            Kids
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 px-12 pb-6">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={!selectedJerseyGender}
                        onClick={() => navigateToScreen('jerseySelection')}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'capsGenderSelection' ? (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center px-8 pt-2 pb-3">
                      {/* Colorado Rockies Dugout Store Logo */}
                      <div className="mb-3 flex justify-center">
                        <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-32 w-auto" />
                      </div>
                      <h2 className="text-2xl font-bold text-[#041E42] leading-tight mb-2">
                        What Style Cap were you looking for?
                      </h2>
                    </div>

                    {/* Gender Selection Boxes */}
                    <div className="flex-1 px-12 py-2 flex items-start justify-center">
                      <div className="grid grid-cols-3 gap-8 w-full max-w-4xl">
                        {/* Men's Caps */}
                        <button
                          onClick={() => {
                            setSelectedCapGender(selectedCapGender === "Men's" ? null : "Men's");
                          }}
                          className={`flex flex-col items-center justify-center gap-4 p-10 rounded-xl font-semibold transition-all bg-white ${
                            selectedCapGender === "Men's"
                              ? 'shadow-[inset_0_0_0_4px_#33006F]'
                              : selectedCapGender && selectedCapGender !== "Men's"
                              ? 'shadow-[inset_0_0_0_4px_rgb(203,213,225)] opacity-50'
                              : 'shadow-[inset_0_0_0_4px_rgb(203,213,225)]'
                          }`}
                        >
                          <div className="h-40 flex items-center justify-center">
                            <img src={mensCap} alt="Men's Cap" className="h-full w-auto object-contain" />
                          </div>
                          <span className="text-lg text-[#041E42] text-center leading-tight">
                            Men
                          </span>
                        </button>

                        {/* Women's Caps */}
                        <button
                          onClick={() => {
                            setSelectedCapGender(selectedCapGender === "Women's" ? null : "Women's");
                          }}
                          className={`flex flex-col items-center justify-center gap-4 p-10 rounded-xl font-semibold transition-all bg-white ${
                            selectedCapGender === "Women's"
                              ? 'shadow-[inset_0_0_0_4px_#33006F]'
                              : selectedCapGender && selectedCapGender !== "Women's"
                              ? 'shadow-[inset_0_0_0_4px_rgb(203,213,225)] opacity-50'
                              : 'shadow-[inset_0_0_0_4px_rgb(203,213,225)]'
                          }`}
                        >
                          <div className="h-40 flex items-center justify-center">
                            <img src={womensCap} alt="Women's Cap" className="h-full w-auto object-contain" />
                          </div>
                          <span className="text-lg text-[#041E42] text-center leading-tight">
                            Women
                          </span>
                        </button>

                        {/* Kid's Caps */}
                        <button
                          onClick={() => {
                            setSelectedCapGender(selectedCapGender === "Children's" ? null : "Children's");
                          }}
                          className={`flex flex-col items-center justify-center gap-4 p-10 rounded-xl font-semibold transition-all bg-white ${
                            selectedCapGender === "Children's"
                              ? 'shadow-[inset_0_0_0_4px_#33006F]'
                              : selectedCapGender && selectedCapGender !== "Children's"
                              ? 'shadow-[inset_0_0_0_4px_rgb(203,213,225)] opacity-50'
                              : 'shadow-[inset_0_0_0_4px_rgb(203,213,225)]'
                          }`}
                        >
                          <div className="h-40 flex items-center justify-center">
                            <img src={childrensCap} alt="Children's Cap" className="h-full w-auto object-contain" />
                          </div>
                          <span className="text-lg text-[#041E42] text-center leading-tight">
                            Children
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 px-12 pb-6">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={!selectedCapGender}
                        onClick={() => navigateToScreen('capsSelection')}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'jerseySelection' ? (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center px-8 pt-2 pb-2">
                      {/* Colorado Rockies Dugout Store Logo */}
                      <div className="mb-1 flex justify-center -mt-4">
                        <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                      </div>
                      <h2 className="text-lg font-bold text-[#041E42] leading-tight mb-2">
                        Select the Jersey you couldn't find
                      </h2>
                    </div>

                    {/* Jersey Grid with Scroll */}
                    <div className="flex-1 px-8 py-2 relative flex flex-col">
                      {/* Search Bar */}
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="text"
                            value={jerseySearchQuery}
                            onChange={(e) => setJerseySearchQuery(e.target.value)}
                            placeholder="Search jerseys..."
                            className="w-full pl-10 pr-10 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-[#33006F] text-[#041E42]"
                          />
                          {jerseySearchQuery && (
                            <button
                              onClick={() => setJerseySearchQuery('')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Scrollable Jersey Grid */}
                      <div
                        className="overflow-y-auto scrollbar-hide"
                        style={{ maxHeight: '320px' }}
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {filteredJerseys.map((jersey) => {
                            const matchesSearch = !jerseySearchQuery || jersey.name.toLowerCase().includes(jerseySearchQuery.toLowerCase());
                            return (
                              <button
                                key={jersey.name}
                                onClick={() => toggleJersey(jersey.name)}
                                className={`relative flex flex-col items-center gap-3 p-6 rounded-xl font-semibold transition-all bg-white ${
                                  selectedJerseys.includes(jersey.name)
                                    ? 'shadow-[inset_0_0_0_4px_#33006F]'
                                    : selectedJerseys.length > 0 || !matchesSearch
                                    ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] opacity-50'
                                    : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)]'
                                }`}
                              >
                                {/* Jersey Image */}
                                <div className="h-48 flex items-center justify-center">
                                  <img
                                    src={jersey.image}
                                    alt={jersey.name}
                                    className={`h-full w-auto object-contain ${
                                      (selectedJerseys.length > 0 && !selectedJerseys.includes(jersey.name)) || !matchesSearch ? 'opacity-50' : ''
                                    }`}
                                  />
                                </div>

                                {/* Jersey Name */}
                                <span className="text-xs text-[#041E42] text-center leading-tight">
                                  {jersey.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-2 px-12 pb-4">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={selectedJerseys.length === 0}
                        onClick={() => {
                          setShowSizeColorModal(true);
                        }}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'capsSelection' ? (
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="text-center px-8 pt-2 pb-2">
                      {/* Colorado Rockies Dugout Store Logo */}
                      <div className="mb-1 flex justify-center -mt-4">
                        <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                      </div>
                      <h2 className="text-lg font-bold text-[#041E42] leading-tight mb-2">
                        Select the Cap you couldn't find
                      </h2>
                    </div>

                    {/* Cap Grid with Scroll */}
                    <div className="flex-1 px-8 py-2 relative flex flex-col">
                      {/* Search Bar */}
                      <div className="mb-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="text"
                            value={capSearchQuery}
                            onChange={(e) => setCapSearchQuery(e.target.value)}
                            placeholder="Search caps..."
                            className="w-full pl-10 pr-10 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-[#33006F] text-[#041E42]"
                          />
                          {capSearchQuery && (
                            <button
                              onClick={() => setCapSearchQuery('')}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            >
                              <X className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Scrollable Cap Grid */}
                      <div
                        className="overflow-y-auto scrollbar-hide"
                        style={{ maxHeight: '320px' }}
                      >
                        <div className="grid grid-cols-3 gap-6">
                          {filteredCaps.map((cap) => {
                            const matchesSearch = !capSearchQuery || cap.name.toLowerCase().includes(capSearchQuery.toLowerCase());
                            return (
                              <button
                                key={cap.name}
                                onClick={() => toggleCap(cap.name)}
                                className={`relative flex flex-col items-center gap-3 p-6 rounded-xl font-semibold transition-all bg-white ${
                                  selectedCaps.includes(cap.name)
                                    ? 'shadow-[inset_0_0_0_4px_#33006F]'
                                    : selectedCaps.length > 0 || !matchesSearch
                                    ? 'shadow-[inset_0_0_0_2px_rgb(203,213,225)] opacity-50'
                                    : 'shadow-[inset_0_0_0_2px_rgb(203,213,225)]'
                                }`}
                              >
                                {/* Cap Image */}
                                <div className="h-48 flex items-center justify-center">
                                  <img
                                    src={cap.image}
                                    alt={cap.name}
                                    className={`h-full w-auto object-contain ${
                                      (selectedCaps.length > 0 && !selectedCaps.includes(cap.name)) || !matchesSearch ? 'opacity-50' : ''
                                    }`}
                                  />
                                </div>

                                {/* Cap Name */}
                                <span className="text-xs text-[#041E42] text-center leading-tight">
                                  {cap.name}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-2 px-12 pb-4">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={selectedCaps.length === 0}
                        onClick={() => {
                          // Mark Caps as completed when moving forward from cap selection
                          if (!completedCategories.includes('Caps')) {
                            setCompletedCategories(prev => [...prev, 'Caps']);
                          }
                          navigateToScreen('outOfStock');
                        }}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'outOfStock' ? (
                  <div className="flex flex-col h-full px-12 pb-4">
                    {/* Colorado Rockies Dugout Store Logo */}
                    <div className="mb-2 flex justify-center">
                      <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                    </div>

                    {/* Message Content - Centered */}
                    <div className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
                      <h2 className="text-4xl font-bold text-[#041E42] mb-8">
                        {t.outOfStock.title}
                      </h2>
                      <p className="text-2xl text-slate-700 leading-relaxed">
                        {t.outOfStock.message}
                      </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        {t.outOfStock.back}
                      </button>
                      <button
                        onClick={() => {
                          // Check if there are more categories to process
                          const remainingCategories = selectedCategories.filter(cat => !completedCategories.includes(cat));

                          // Process remaining categories in order: Jerseys first, then Caps
                          if (remainingCategories.includes('Jerseys')) {
                            navigateToScreen('jerseyGenderSelection');
                          } else if (remainingCategories.includes('Caps')) {
                            navigateToScreen('capsGenderSelection');
                          } else if (satisfied === false) {
                            navigateToScreen('shoppingExperience');
                          } else {
                            navigateToScreen('thankYou');
                          }
                        }}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {t.outOfStock.continue}
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'shoppingExperience' ? (
                  <div className="flex flex-col h-full px-12 pb-4">
                    {/* Colorado Rockies Dugout Store Logo */}
                    <div className="mb-2 flex justify-center">
                      <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                    </div>

                    <div className="mb-3">
                      <h2 className="text-2xl font-bold text-[#041E42] text-center mb-2">
                        {t.shoppingExperience.title}
                      </h2>
                      <p className="text-sm text-slate-600 text-center">
                        {t.shoppingExperience.subtitle}
                      </p>
                    </div>

                    {/* Options Grid */}
                    <div className="flex-1 px-4 mb-4">
                      <div className="grid grid-cols-3 gap-3 max-w-4xl mx-auto">
                        {t.shoppingExperience.options.slice(0, 5).map((issue: string) => (
                          <button
                            key={issue}
                            onClick={() => {
                              if (experienceIssues.includes(issue)) {
                                setExperienceIssues(experienceIssues.filter(i => i !== issue));
                              } else {
                                setExperienceIssues([...experienceIssues, issue]);
                              }
                            }}
                            className={`flex flex-col items-center justify-center p-5 rounded-2xl transition-all min-h-[125px] border ${
                              experienceIssues.includes(issue)
                                ? 'bg-gradient-to-br from-black to-[#9333EA] text-white border-transparent scale-105 shadow-xl'
                                : 'bg-white text-slate-700 border-[#041E42]/30 hover:scale-105 hover:border-[#BF0D3E]'
                            }`}
                          >
                            <div className={`text-4xl mb-2 ${
                              experienceIssues.includes(issue) ? 'opacity-100' : 'opacity-70'
                            }`}>
                              {issue.includes('could not find') ? '🤷' :
                               issue.includes('checkout') ? '🌀' :
                               issue.includes('wait time') ? '⏱️' :
                               issue.includes('assistance') ? '🙋' :
                               issue.includes('unfriendly') ? '😲' : '❓'}
                            </div>
                            <p className={`font-semibold text-center text-xs leading-tight ${
                              experienceIssues.includes(issue) ? 'text-white' : 'text-[#041E42]'
                            }`}>
                              {issue}
                            </p>
                          </button>
                        ))}

                        {/* Other option */}
                        <button
                          onClick={() => setShowOtherModal(true)}
                          className={`flex flex-col items-center justify-center p-5 rounded-2xl transition-all min-h-[125px] border ${
                            experienceIssues.includes('Other')
                              ? 'bg-gradient-to-br from-black to-[#9333EA] text-white border-transparent scale-105 shadow-xl'
                              : 'bg-white text-slate-700 border-[#041E42]/30 hover:scale-105 hover:border-[#BF0D3E]'
                          }`}
                        >
                          <div className={`text-4xl mb-2 ${
                            experienceIssues.includes('Other') ? 'opacity-100' : 'opacity-70'
                          }`}>
                            ✏️
                          </div>
                          <p className={`font-semibold text-center text-xs ${
                            experienceIssues.includes('Other') ? 'text-white' : 'text-[#041E42]'
                          }`}>
                            Other
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-2">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={experienceIssues.length === 0}
                        onClick={() => {
                          navigateToScreen('associateRating');
                        }}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'associateRating' ? (
                  <div className="flex flex-col h-full px-12 pb-6">
                    {/* Colorado Rockies Dugout Store Logo */}
                    <div className="mb-2 flex justify-center">
                      <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                    </div>

                    <div className="mb-3">
                      <h2 className="text-2xl font-bold text-[#041E42] text-center mb-2">
                        {t.associateRating.title}
                      </h2>
                      <p className="text-sm text-slate-600 text-center">
                        {t.associateRating.subtitle}
                      </p>
                    </div>

                    {/* Face Options */}
                    <div className="flex-1 flex items-center justify-center mb-6">
                      <div className="flex gap-8 max-w-3xl justify-center">
                        {/* Satisfied Face */}
                        <button
                          onClick={() => setAssociateRating(associateRating === 'satisfied' ? null : 'satisfied')}
                          className={`flex flex-col items-center p-6 rounded-2xl transition-all ${
                            associateRating === 'satisfied'
                              ? 'bg-[#22C55E] scale-110 shadow-xl'
                              : 'bg-white/90 border-2 border-slate-300 hover:border-[#041E42] hover:scale-105'
                          }`}
                        >
                          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                            <circle cx="60" cy="60" r="55" fill={associateRating === 'satisfied' ? '#fff' : '#22C55E'} stroke={associateRating === 'satisfied' ? '#fff' : '#16A34A'} strokeWidth="3"/>
                            <circle cx="42" cy="50" r="6" fill={associateRating === 'satisfied' ? '#16A34A' : '#16A34A'}/>
                            <circle cx="78" cy="50" r="6" fill={associateRating === 'satisfied' ? '#16A34A' : '#16A34A'}/>
                            <path d="M 35 70 Q 60 90 85 70" stroke={associateRating === 'satisfied' ? '#16A34A' : '#16A34A'} strokeWidth="4" strokeLinecap="round" fill="none"/>
                          </svg>
                          <p className={`mt-4 font-bold text-lg ${associateRating === 'satisfied' ? 'text-white' : 'text-[#041E42]'}`}>
                            {t.associateRating.satisfied}
                          </p>
                        </button>

                        {/* Neutral Face */}
                        <button
                          onClick={() => setAssociateRating(associateRating === 'neutral' ? null : 'neutral')}
                          className={`flex flex-col items-center p-6 rounded-2xl transition-all ${
                            associateRating === 'neutral'
                              ? 'bg-slate-500 scale-110 shadow-xl'
                              : 'bg-white/90 border-2 border-slate-300 hover:border-[#041E42] hover:scale-105'
                          }`}
                        >
                          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                            <circle cx="60" cy="60" r="55" fill={associateRating === 'neutral' ? '#fff' : '#F59E0B'} stroke={associateRating === 'neutral' ? '#fff' : '#D97706'} strokeWidth="3"/>
                            <circle cx="42" cy="50" r="6" fill={associateRating === 'neutral' ? '#64748B' : '#D97706'}/>
                            <circle cx="78" cy="50" r="6" fill={associateRating === 'neutral' ? '#64748B' : '#D97706'}/>
                            <line x1="40" y1="75" x2="80" y2="75" stroke={associateRating === 'neutral' ? '#64748B' : '#D97706'} strokeWidth="4" strokeLinecap="round"/>
                          </svg>
                          <p className={`mt-4 font-bold text-lg ${associateRating === 'neutral' ? 'text-white' : 'text-[#041E42]'}`}>
                            {t.associateRating.neutral}
                          </p>
                        </button>

                        {/* Dissatisfied Face */}
                        <button
                          onClick={() => setAssociateRating(associateRating === 'dissatisfied' ? null : 'dissatisfied')}
                          className={`flex flex-col items-center p-6 rounded-2xl transition-all ${
                            associateRating === 'dissatisfied'
                              ? 'bg-[#BF0D3E] scale-110 shadow-xl'
                              : 'bg-white/90 border-2 border-slate-300 hover:border-[#041E42] hover:scale-105'
                          }`}
                        >
                          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                            <circle cx="60" cy="60" r="55" fill={associateRating === 'dissatisfied' ? '#fff' : '#EF4444'} stroke={associateRating === 'dissatisfied' ? '#fff' : '#DC2626'} strokeWidth="3"/>
                            <circle cx="42" cy="50" r="6" fill={associateRating === 'dissatisfied' ? '#DC2626' : '#DC2626'}/>
                            <circle cx="78" cy="50" r="6" fill={associateRating === 'dissatisfied' ? '#DC2626' : '#DC2626'}/>
                            <path d="M 35 85 Q 60 65 85 85" stroke={associateRating === 'dissatisfied' ? '#DC2626' : '#DC2626'} strokeWidth="4" strokeLinecap="round" fill="none"/>
                          </svg>
                          <p className={`mt-4 font-bold text-lg ${associateRating === 'dissatisfied' ? 'text-white' : 'text-[#041E42]'}`}>
                            {t.associateRating.dissatisfied}
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center gap-4 mt-2">
                      <button
                        onClick={navigateBack}
                        className="px-10 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                      >
                        Back
                      </button>
                      <button
                        disabled={!associateRating}
                        onClick={() => navigateToScreen('thankYou')}
                        className="px-10 py-2 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                ) : currentScreen === 'thankYou' ? (
                  <div className="flex flex-col h-full px-12 pb-8">
                    {/* Colorado Rockies Dugout Store Logo */}
                    <div className="mb-2 flex justify-center">
                      <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-28 w-auto" />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="max-w-2xl w-full text-center">
                        <h2 className="text-3xl font-bold text-[#041E42] mb-6">
                          {t.thankYou.title}
                        </h2>
                        <p className="text-2xl text-slate-700 mb-12">
                          {t.thankYou.subtitle}
                        </p>

                        {/* Submit Button */}
                        <button
                          onClick={() => navigateToScreen('qrCode')}
                          className="w-full bg-gradient-to-r from-black to-[#9333EA] text-white font-bold text-xl py-5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {t.thankYou.submitButton}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : currentScreen === 'qrCode' ? (
                  <div className="flex flex-col h-full px-12 pb-8">
                    {/* Colorado Rockies Dugout Store Logo */}
                    <div className="mb-2 flex justify-center">
                      <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" className="h-24 w-auto" />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div className="max-w-xl w-full text-center">
                        <h2 className="text-3xl font-bold text-[#041E42] mb-3">
                          {t.qrCode.title}
                        </h2>
                        <p className="text-xl text-slate-700 mb-6">
                          {t.qrCode.subtitle}
                        </p>

                        {/* QR Code */}
                        <div className="mb-5 flex justify-center">
                          <img
                            src={qrCodeImage}
                            alt="QR Code for 10% discount"
                            className="w-56 h-56 object-contain"
                          />
                        </div>

                        {/* Countdown Timer */}
                        <div className="text-base text-slate-600">
                          {t.qrCode.returningText} <span className="font-bold text-[#BF0D3E]">{countdown}</span> seconds
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

              </div>
            </div>
          </div>
        </div>

        {/* Size and Color Selection Modal */}
        {showSizeColorModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
              {/* Modal Header */}
              <h2 className="text-2xl font-bold text-[#041E42] text-center mb-6">
                What size and color were you looking for?
              </h2>

              {/* Size Dropdown */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#041E42] mb-2">
                  Size
                </label>
                <div className="relative">
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-[#33006F] text-[#041E42] appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select size...</option>
                    <option value="xs">XS</option>
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                    <option value="xl">XL</option>
                    <option value="xxl">XXL</option>
                    <option value="xxxl">XXXL</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Color Dropdown */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-[#041E42] mb-2">
                  Color
                </label>
                <div className="relative">
                  <select
                    value={jerseyColor}
                    onChange={(e) => setJerseyColor(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-[#33006F] text-[#041E42] appearance-none bg-white cursor-pointer"
                  >
                    <option value="">Select color...</option>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="purple">Purple</option>
                    <option value="gray">Gray</option>
                    <option value="navy">Navy</option>
                    <option value="red">Red</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowSizeColorModal(false);
                    setSelectedSize('');
                    setJerseyColor('');
                  }}
                  className="flex-1 px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowSizeColorModal(false);
                    // Mark Jerseys as completed
                    if (!completedCategories.includes('Jerseys')) {
                      setCompletedCategories(prev => [...prev, 'Jerseys']);
                    }

                    // Check if there are more categories to process
                    const remainingCategories = selectedCategories.filter(cat => !completedCategories.includes(cat) && cat !== 'Jerseys');

                    // If Caps is next, go to caps gender selection
                    if (remainingCategories.includes('Caps')) {
                      navigateToScreen('capsGenderSelection');
                    } else {
                      // Otherwise go to out of stock
                      navigateToScreen('outOfStock');
                    }
                  }}
                  disabled={!selectedSize || !jerseyColor}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-black to-[#9333EA] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Other Issue Modal */}
        {showOtherModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowOtherModal(false)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#041E42]">
                  {t.shoppingExperience.otherPlaceholder}
                </h3>
                <button
                  onClick={() => setShowOtherModal(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-600" />
                </button>
              </div>

              <textarea
                value={otherIssueText}
                onChange={(e) => {
                  const value = e.target.value.slice(0, 200);
                  setOtherIssueText(value);
                }}
                maxLength={200}
                placeholder={t.shoppingExperience.otherPlaceholder}
                className="w-full h-32 p-3 rounded-lg border-2 border-slate-300 bg-white focus:outline-none focus:border-[#BF0D3E] focus:ring-2 focus:ring-[#BF0D3E]/20 transition-all text-sm resize-none"
                autoFocus
              />

              <div className="text-xs text-slate-500 mt-2 mb-4">
                {otherIssueText.length}/200 characters
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setOtherIssueText('');
                    setExperienceIssues(experienceIssues.filter(i => i !== 'Other'));
                    setShowOtherModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg hover:bg-slate-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (otherIssueText.trim()) {
                      if (!experienceIssues.includes('Other')) {
                        setExperienceIssues([...experienceIssues, 'Other']);
                      }
                      setShowOtherModal(false);
                    }
                  }}
                  disabled={!otherIssueText.trim()}
                  className={`flex-1 px-4 py-2 font-semibold text-sm rounded-lg transition-all ${
                    otherIssueText.trim()
                      ? 'bg-gradient-to-r from-black to-[#9333EA] text-white hover:shadow-lg'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
