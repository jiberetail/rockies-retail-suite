import { useCallback, useEffect, useMemo, useState } from "react";
import QRCode from "react-qr-code";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock3,
  Frown,
  Globe2,
  Home,
  LayoutGrid,
  Meh,
  MessageCircleMore,
  PackageX,
  Ruler,
  RotateCcw,
  ScanLine,
  Shirt,
  ShoppingBag,
  Smile,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import rockiesDugoutStoreLogo from "figma:asset/1717564bc045af2e8f8bd35047159ec02ff7f332.png";
import discountQrCode from "figma:asset/b9628d4d8098c6045d44024c676c518113d231dd.png";
import coorsField from "@/assets/rockies-survey/coors-field.jpg";
import {
  audienceFilters,
  merchandiseCategories,
  rockiesProducts,
  type MerchandiseAudience,
  type MerchandiseCategory,
  type RockiesProduct,
} from "./catalog";
import {
  countryOptions,
  languages,
  surveyCopy,
  type SurveyLanguage,
} from "./translations";
import "@/styles/rockies-kiosk.css";

type SurveyScreen =
  | "welcome"
  | "language"
  | "location"
  | "question-one"
  | "question-two"
  | "question-three"
  | "categories"
  | "products"
  | "product-online"
  | "feedback"
  | "rating"
  | "thank-you"
  | "discount";

type AssociateRating = "great" | "okay" | "poor";

interface SurveyAnswers {
  foundItem: boolean | null;
  satisfied: boolean | null;
  associate: boolean | null;
}

const initialAnswers: SurveyAnswers = {
  foundItem: null,
  satisfied: null,
  associate: null,
};

const feedbackIcons = [PackageX, Ruler, UserRound, Clock3, LayoutGrid, MessageCircleMore];
const ratingIcons = [Smile, Meh, Frown];
const ratingValues: AssociateRating[] = ["great", "okay", "poor"];

const progressByScreen: Partial<Record<SurveyScreen, number>> = {
  language: 1,
  location: 2,
  "question-one": 3,
  "question-two": 3,
  "question-three": 3,
  categories: 4,
  products: 4,
  "product-online": 4,
  feedback: 5,
  rating: 5,
  "thank-you": 6,
  discount: 6,
};

export function RockiesKioskSurvey() {
  const [screen, setScreen] = useState<SurveyScreen>("welcome");
  const [screenHistory, setScreenHistory] = useState<SurveyScreen[]>([]);
  const [language, setLanguage] = useState<SurveyLanguage>("en");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [answers, setAnswers] = useState<SurveyAnswers>(initialAnswers);
  const [category, setCategory] = useState<MerchandiseCategory | null>(null);
  const [audience, setAudience] = useState<MerchandiseAudience>("All");
  const [selectedProduct, setSelectedProduct] = useState<RockiesProduct | null>(null);
  const [feedback, setFeedback] = useState<number[]>([]);
  const [otherFeedback, setOtherFeedback] = useState("");
  const [associateRating, setAssociateRating] = useState<AssociateRating | null>(null);
  const [countdown, setCountdown] = useState(60);

  const copy = surveyCopy[language];

  const resetSurvey = useCallback(() => {
    setScreen("welcome");
    setScreenHistory([]);
    setLanguage("en");
    setCountry("");
    setZipCode("");
    setAnswers(initialAnswers);
    setCategory(null);
    setAudience("All");
    setSelectedProduct(null);
    setFeedback([]);
    setOtherFeedback("");
    setAssociateRating(null);
    setCountdown(60);
  }, []);

  const goTo = useCallback(
    (nextScreen: SurveyScreen) => {
      setScreenHistory((history) => [...history, screen]);
      setScreen(nextScreen);
    },
    [screen],
  );

  const goBack = useCallback(() => {
    setScreenHistory((history) => {
      const previous = history.at(-1);
      if (!previous) {
        setScreen("welcome");
        return [];
      }
      setScreen(previous);
      return history.slice(0, -1);
    });
  }, []);

  useEffect(() => {
    document.body.classList.add("rk-kiosk-active");
    return () => document.body.classList.remove("rk-kiosk-active");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [screen]);

  useEffect(() => {
    if (screen !== "discount") return;

    setCountdown(60);
    const interval = window.setInterval(() => {
      setCountdown((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(interval);
          resetSurvey();
          return 60;
        }
        return remaining - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [resetSurvey, screen]);

  useEffect(() => {
    if (screen === "welcome" || screen === "discount") return;

    let timeout = window.setTimeout(resetSurvey, 180_000);
    const keepAlive = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(resetSurvey, 180_000);
    };

    window.addEventListener("pointerdown", keepAlive);
    window.addEventListener("keydown", keepAlive);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("pointerdown", keepAlive);
      window.removeEventListener("keydown", keepAlive);
    };
  }, [resetSurvey, screen]);

  const categoryProducts = useMemo(
    () => rockiesProducts.filter((product) => product.category === category),
    [category],
  );

  const availableAudiences = useMemo(
    () =>
      audienceFilters.filter(
        (filter) =>
          filter === "All" ||
          categoryProducts.some(
            (product) => product.audience === filter || product.audience === "Unisex",
          ),
      ),
    [categoryProducts],
  );

  const visibleProducts = useMemo(
    () =>
      categoryProducts.filter(
        (product) =>
          audience === "All" || product.audience === audience || product.audience === "Unisex",
      ),
    [audience, categoryProducts],
  );

  const continueAfterMerchandise = () => {
    if (answers.satisfied === false) {
      goTo("feedback");
    } else if (answers.associate === true) {
      goTo("rating");
    } else {
      goTo("thank-you");
    }
  };

  const answerQuestion = (question: 1 | 2 | 3, value: boolean) => {
    if (question === 1) {
      setAnswers((current) => ({ ...current, foundItem: value }));
      goTo("question-two");
      return;
    }

    if (question === 2) {
      setAnswers((current) => ({ ...current, satisfied: value }));
      goTo("question-three");
      return;
    }

    setAnswers((current) => ({ ...current, associate: value }));
    if (answers.foundItem === false) {
      goTo("categories");
    } else if (answers.satisfied === false) {
      goTo("feedback");
    } else if (value) {
      goTo("rating");
    } else {
      goTo("thank-you");
    }
  };

  const chooseRating = (rating: AssociateRating) => {
    setAssociateRating(rating);
    window.setTimeout(() => goTo("thank-you"), 180);
  };

  const toggleFeedback = (index: number) => {
    setFeedback((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  };

  const renderNavigation = () => (
    <div className="rk-nav" aria-label="Survey navigation">
      <button className="rk-nav-button" type="button" onClick={goBack} aria-label={copy.back}>
        <ArrowLeft aria-hidden="true" />
        <span>{copy.back}</span>
      </button>
      <button className="rk-nav-button" type="button" onClick={resetSurvey} aria-label={copy.home}>
        <Home aria-hidden="true" />
        <span>{copy.home}</span>
      </button>
    </div>
  );

  const renderProgress = () => {
    const activeStep = progressByScreen[screen] ?? 0;
    return (
      <div className="rk-progress" aria-label={`Step ${activeStep} of 6`}>
        {Array.from({ length: 6 }, (_, index) => (
          <span
            className={index + 1 <= activeStep ? "rk-progress-dot is-active" : "rk-progress-dot"}
            key={index}
          />
        ))}
      </div>
    );
  };

  const renderFrame = (content: React.ReactNode, className = "") => (
    <div className="rk-frame">
      <div className="rk-frame-photo" style={{ backgroundImage: `url(${coorsField})` }} />
      <div className="rk-frame-shade" />
      {renderNavigation()}
      <div className="rk-header-logo">
        <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" />
      </div>
      {renderProgress()}
      <main className={`rk-panel ${className}`}>{content}</main>
    </div>
  );

  const renderQuestion = (questionNumber: 1 | 2 | 3) => {
    const currentValue =
      questionNumber === 1
        ? answers.foundItem
        : questionNumber === 2
          ? answers.satisfied
          : answers.associate;

    return renderFrame(
      <div className="rk-question-screen">
        <div>
          <p className="rk-eyebrow">
            {copy.surveyEyebrow} · {questionNumber}/3
          </p>
          <h1 className="rk-question-title">{copy.questions[questionNumber - 1]}</h1>
        </div>
        <div className="rk-answer-grid">
          <button
            type="button"
            className={`rk-answer-card rk-answer-yes ${currentValue === true ? "is-selected" : ""}`}
            aria-pressed={currentValue === true}
            onClick={() => answerQuestion(questionNumber, true)}
          >
            <span className="rk-answer-icon"><Check aria-hidden="true" /></span>
            <span>{copy.yes}</span>
          </button>
          <button
            type="button"
            className={`rk-answer-card rk-answer-no ${currentValue === false ? "is-selected" : ""}`}
            aria-pressed={currentValue === false}
            onClick={() => answerQuestion(questionNumber, false)}
          >
            <span className="rk-answer-icon"><X aria-hidden="true" /></span>
            <span>{copy.no}</span>
          </button>
        </div>
        <p className="rk-microcopy">Tap one answer to continue.</p>
      </div>,
      "rk-panel-question",
    );
  };

  let content: React.ReactNode;

  switch (screen) {
    case "welcome":
      content = (
        <div className="rk-welcome">
          <div className="rk-welcome-photo" style={{ backgroundImage: `url(${coorsField})` }} />
          <div className="rk-welcome-overlay" />
          <div className="rk-welcome-logo">
            <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" />
          </div>
          <div className="rk-welcome-copy">
            <div className="rk-discount-badge" aria-label="10 percent discount">
              <span>10%</span>
              <small>OFF</small>
            </div>
            <p className="rk-welcome-eyebrow">Dugout Store fan survey</p>
            <h1>Step up to the plate.</h1>
            <p className="rk-welcome-subtitle">
              Share your store experience and get <strong>10% off</strong> your next in-store purchase.
            </p>
            <button className="rk-primary-button rk-start-button" type="button" onClick={() => goTo("language")}>
              Start survey
              <Sparkles aria-hidden="true" />
            </button>
            <p className="rk-welcome-legal">
              About 60 seconds · Discount valid for 30 days at participating Colorado Rockies Dugout Store locations.
            </p>
          </div>
        </div>
      );
      break;

    case "language":
      content = renderFrame(
        <div className="rk-standard-screen">
          <div>
            <p className="rk-eyebrow"><Globe2 aria-hidden="true" /> Welcome</p>
            <h1>{copy.languageTitle}</h1>
            <p className="rk-subtitle">{copy.languageSubtitle}</p>
          </div>
          <div className="rk-language-grid">
            {languages.map((option) => (
              <button
                type="button"
                className={`rk-language-card ${language === option.code ? "is-selected" : ""}`}
                key={option.code}
                onClick={() => {
                  setLanguage(option.code);
                  window.setTimeout(() => goTo("location"), 140);
                }}
              >
                <span>{option.name}</span>
                <small>{option.englishName}</small>
                {language === option.code && <CheckCircle2 className="rk-selected-check" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>,
      );
      break;

    case "location":
      content = renderFrame(
        <div className="rk-standard-screen rk-location-screen">
          <div>
            <p className="rk-eyebrow"><Globe2 aria-hidden="true" /> {copy.surveyEyebrow}</p>
            <h1>{copy.locationTitle}</h1>
            <p className="rk-subtitle">{copy.locationSubtitle}</p>
          </div>
          <div className="rk-country-grid">
            {countryOptions.map((option) => (
              <button
                type="button"
                className={`rk-country-card ${country === option.code ? "is-selected" : ""}`}
                aria-pressed={country === option.code}
                key={option.code}
                onClick={() => {
                  setCountry(option.code);
                  if (option.code !== "US") setZipCode("");
                }}
              >
                <span className="rk-flag" aria-hidden="true">{option.flag}</span>
                <span>{option.labels[language]}</span>
                {country === option.code && <CheckCircle2 className="rk-selected-check" aria-hidden="true" />}
              </button>
            ))}
          </div>
          {country === "US" && (
            <label className="rk-zip-field">
              <span>{copy.zipLabel}</span>
              <input
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                value={zipCode}
                placeholder={copy.zipPlaceholder}
                onChange={(event) => setZipCode(event.target.value.replace(/\D/g, "").slice(0, 5))}
              />
              <small>{copy.zipHelp}</small>
            </label>
          )}
          <button
            className="rk-primary-button"
            type="button"
            disabled={!country}
            onClick={() => goTo("question-one")}
          >
            {copy.continue}
          </button>
        </div>,
        "rk-panel-scroll",
      );
      break;

    case "question-one":
      content = renderQuestion(1);
      break;

    case "question-two":
      content = renderQuestion(2);
      break;

    case "question-three":
      content = renderQuestion(3);
      break;

    case "categories":
      content = renderFrame(
        <div className="rk-standard-screen rk-catalog-screen">
          <div>
            <p className="rk-eyebrow"><Shirt aria-hidden="true" /> Merchandise finder</p>
            <h1>{copy.categoriesTitle}</h1>
            <p className="rk-subtitle">{copy.categoriesSubtitle}</p>
          </div>
          <div className="rk-category-grid">
            {merchandiseCategories.map((item) => (
              <button
                className="rk-category-card"
                type="button"
                key={item.name}
                onClick={() => {
                  setCategory(item.name);
                  setAudience("All");
                  goTo("products");
                }}
              >
                <img src={item.image} alt="" draggable={false} />
                <span className="rk-category-gradient" />
                <span className="rk-category-copy">
                  <small>{item.eyebrow}</small>
                  <strong>{copy.categoryLabels[item.name]}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>,
        "rk-panel-scroll",
      );
      break;

    case "products":
      content = renderFrame(
        <div className="rk-standard-screen rk-catalog-screen">
          <div>
            <p className="rk-eyebrow"><ShoppingBag aria-hidden="true" /> {category ? copy.categoryLabels[category] : "Merchandise"}</p>
            <h1>{copy.productsTitle}</h1>
            <p className="rk-subtitle">{copy.productsSubtitle}</p>
          </div>
          {availableAudiences.length > 2 && (
            <div className="rk-filter-row" aria-label="Audience filter">
              {availableAudiences.map((filter) => (
                <button
                  type="button"
                  className={audience === filter ? "is-selected" : ""}
                  aria-pressed={audience === filter}
                  key={filter}
                  onClick={() => setAudience(filter)}
                >
                  {copy.audienceLabels[filter]}
                </button>
              ))}
            </div>
          )}
          <div className="rk-product-grid">
            {visibleProducts.map((product) => (
              <button
                className="rk-product-card"
                type="button"
                key={product.id}
                onClick={() => {
                  setSelectedProduct(product);
                  goTo("product-online");
                }}
              >
                <span className="rk-product-image">
                  <img src={product.image} alt="" draggable={false} />
                  {product.badge && <small>{product.badge}</small>}
                </span>
                <span className="rk-product-copy">
                  <strong>{product.shortName}</strong>
                  <small>{product.audience}</small>
                </span>
              </button>
            ))}
          </div>
        </div>,
        "rk-panel-scroll",
      );
      break;

    case "product-online":
      content = renderFrame(
        <div className="rk-standard-screen rk-product-online-screen">
          <div>
            <p className="rk-eyebrow"><ScanLine aria-hidden="true" /> {copy.productOnlineEyebrow}</p>
            <h1>{copy.productOnlineTitle}</h1>
            <p className="rk-subtitle">{copy.productOnlineSubtitle}</p>
          </div>
          {selectedProduct && (
            <div className="rk-online-card">
              <div className="rk-online-product">
                <img src={selectedProduct.image} alt={selectedProduct.shortName} />
                <div>
                  <small>{selectedProduct.badge ?? selectedProduct.category}</small>
                  <strong>{selectedProduct.shortName}</strong>
                </div>
              </div>
              <div className="rk-online-qr">
                <QRCode
                  value={selectedProduct.url}
                  size={256}
                  bgColor="#ffffff"
                  fgColor="#15111a"
                  level="M"
                  title={copy.scanToShop}
                />
                <span>{copy.scanToShop}</span>
              </div>
            </div>
          )}
          <p className="rk-online-note">{copy.onlineNote}</p>
          <button className="rk-primary-button" type="button" onClick={continueAfterMerchandise}>
            {copy.continue}
          </button>
        </div>,
        "rk-panel-scroll",
      );
      break;

    case "feedback":
      content = renderFrame(
        <div className="rk-standard-screen rk-feedback-screen">
          <div>
            <p className="rk-eyebrow"><MessageCircleMore aria-hidden="true" /> {copy.surveyEyebrow}</p>
            <h1>{copy.feedbackTitle}</h1>
            <p className="rk-subtitle">{copy.feedbackSubtitle}</p>
          </div>
          <div className="rk-feedback-grid">
            {copy.feedbackOptions.map((option, index) => {
              const Icon = feedbackIcons[index];
              const isSelected = feedback.includes(index);
              return (
                <button
                  className={`rk-feedback-card ${isSelected ? "is-selected" : ""}`}
                  type="button"
                  aria-pressed={isSelected}
                  key={option}
                  onClick={() => toggleFeedback(index)}
                >
                  <Icon aria-hidden="true" />
                  <span>{option}</span>
                  {isSelected && <CheckCircle2 className="rk-selected-check" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
          {feedback.includes(5) && (
            <textarea
              className="rk-feedback-textarea"
              value={otherFeedback}
              maxLength={240}
              placeholder={copy.otherPlaceholder}
              onChange={(event) => setOtherFeedback(event.target.value)}
            />
          )}
          <button
            className="rk-primary-button"
            type="button"
            disabled={feedback.length === 0}
            onClick={() => (answers.associate ? goTo("rating") : goTo("thank-you"))}
          >
            {copy.continue}
          </button>
        </div>,
        "rk-panel-scroll",
      );
      break;

    case "rating":
      content = renderFrame(
        <div className="rk-standard-screen rk-rating-screen">
          <div>
            <p className="rk-eyebrow"><UserRound aria-hidden="true" /> {copy.surveyEyebrow}</p>
            <h1>{copy.ratingTitle}</h1>
            <p className="rk-subtitle">{copy.ratingSubtitle}</p>
          </div>
          <div className="rk-rating-grid">
            {copy.ratingLabels.map((label, index) => {
              const Icon = ratingIcons[index];
              const value = ratingValues[index];
              return (
                <button
                  className={`rk-rating-card rk-rating-${value} ${associateRating === value ? "is-selected" : ""}`}
                  type="button"
                  key={value}
                  onClick={() => chooseRating(value)}
                >
                  <Icon aria-hidden="true" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
          <p className="rk-microcopy">Tap one answer to continue.</p>
        </div>,
        "rk-panel-question",
      );
      break;

    case "thank-you":
      content = renderFrame(
        <div className="rk-completion-screen">
          <div className="rk-completion-mark">
            <Check aria-hidden="true" />
          </div>
          <p className="rk-eyebrow">Survey complete</p>
          <h1>{copy.thankYouTitle}</h1>
          <p className="rk-subtitle">{copy.thankYouSubtitle}</p>
          <div className="rk-ten-off">
            <strong>10%</strong>
            <span>OFF</span>
          </div>
          <button className="rk-primary-button" type="button" onClick={() => goTo("discount")}>
            {copy.claimDiscount}
          </button>
        </div>,
        "rk-panel-completion",
      );
      break;

    case "discount":
      content = (
        <div className="rk-discount-screen">
          <div className="rk-discount-photo" style={{ backgroundImage: `url(${coorsField})` }} />
          <div className="rk-discount-overlay" />
          <div className="rk-discount-content">
            <div className="rk-discount-logo">
              <img src={rockiesDugoutStoreLogo} alt="Colorado Rockies Dugout Store" />
            </div>
            <p className="rk-eyebrow">Home run</p>
            <h1>{copy.discountTitle}</h1>
            <p className="rk-discount-subtitle">{copy.discountSubtitle}</p>
            <div className="rk-discount-qr-wrap">
              <img src={discountQrCode} alt="QR code for the Colorado Rockies Dugout Store discount" />
              <span>10% OFF</span>
            </div>
            <p className="rk-discount-legal">{copy.discountLegal}</p>
            <button className="rk-reset-button" type="button" onClick={resetSurvey}>
              <RotateCcw aria-hidden="true" />
              {copy.home}
            </button>
            <p className="rk-countdown">
              {copy.returning} <strong>{countdown}s</strong>
            </p>
          </div>
        </div>
      );
      break;
  }

  return (
    <div className="rk-kiosk-root">
      <section className="rk-kiosk" aria-live="polite">
        {content}
      </section>
    </div>
  );
}
