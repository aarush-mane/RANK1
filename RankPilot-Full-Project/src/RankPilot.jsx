import React, { useState, useMemo } from 'react';
import {
  Rocket, PackageSearch, DollarSign, Building2, TrendingUp, Calculator,
  FileEdit, Search, Link2, LayoutDashboard, Activity, Sparkles, ShieldAlert,
  FileText, Bell, Settings, Globe, CheckCircle2, AlertTriangle, ArrowUpRight,
  ArrowDownRight, Plus, Copy, Check, ExternalLink, Download, RefreshCw,
  ChevronRight, Filter, Layers, Eye, Zap, Lock, Play, Send, Terminal, X
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    name: 'NexusCorp Global',
    domain: 'nexuscorp.io',
    country: 'India',
    language: 'EN',
    equity: 'SaaS + E-Com',
    healthScore: 85,
    healthDelta: '+3 pts vs last 30d',
    mrr: 50765,
    mrrDelta: '+$1,800 vs last 30d',
    mrrMom: '+3.6% MoM',
    nrr: '105%',
    nrrDelta: '-2% vs last 30d',
    momGrowth: '+12.5%',
    momDelta: '+3.6% vs last 30d',
    ltvCac: '3.4x',
    ltvDelta: '+0.4 vs last 30d',
    aiVisibility: 78,
    aiDelta: '+8 pts vs last 30d',
    runwayMonths: 8.2,
    monthlyBurn: 38400,
    baselineTrafficValue: 280000,
    estimatedTrafficValue: 345000,
    roiMultiplier: '1.23x ROI',
    gscConnected: true,
    ga4Connected: true,
    lastSync: '3 min ago'
  },
  {
    id: 'proj-2',
    name: 'Aether Gears Store',
    domain: 'aethergears.in',
    country: 'India',
    language: 'EN',
    equity: 'D2C Hardware',
    healthScore: 79,
    healthDelta: '+5 pts vs last 30d',
    mrr: 45200,
    mrrDelta: '+$4,120 vs last 30d',
    mrrMom: '+9.8% MoM',
    nrr: '112%',
    nrrDelta: '+4% vs last 30d',
    momGrowth: '+18.2%',
    momDelta: '+5.1% vs last 30d',
    ltvCac: '4.1x',
    ltvDelta: '+0.7 vs last 30d',
    aiVisibility: 64,
    aiDelta: '+11 pts vs last 30d',
    runwayMonths: 14.5,
    monthlyBurn: 21500,
    baselineTrafficValue: 190000,
    estimatedTrafficValue: 268000,
    roiMultiplier: '1.41x ROI',
    gscConnected: true,
    ga4Connected: true,
    lastSync: '7 min ago'
  }
];

const MONTHLY_SERIES = [
  { month: 'Jan', value: 18500, clicks: 24200 },
  { month: 'Feb', value: 23400, clicks: 28900 },
  { month: 'Mar', value: 31200, clicks: 35100 },
  { month: 'Apr', value: 22800, clicks: 27400 },
  { month: 'May', value: 27900, clicks: 33600 },
  { month: 'Jun', value: 19600, clicks: 25800 },
  { month: 'Jul', value: 50765, clicks: 64200 },
  { month: 'Aug', value: 33400, clicks: 41200 },
  { month: 'Sep', value: 21900, clicks: 29500 },
  { month: 'Oct', value: 29800, clicks: 38400 },
  { month: 'Nov', value: 34900, clicks: 44900 },
  { month: 'Dec', value: 39200, clicks: 49800 }
];

const INITIAL_LAUNCH_LIST = [
  { id: 'l-1', title: 'Complete Product Opportunity Validation (>75 Score)', category: 'Product', targetModule: 'product-research', status: 'completed', priority: 'Critical', owner: 'Aarush M.' },
  { id: 'l-2', title: 'Lock Verified Supplier RFQ & FOB Unit Margin > 38%', category: 'Supply Chain', targetModule: 'supplier-research', status: 'completed', priority: 'Critical', owner: 'Aarush M.' },
  { id: 'l-3', title: 'Map Top 15 High-Intent Commercial & AI Citation Keywords', category: 'SEO', targetModule: 'keyword-research', status: 'completed', priority: 'High', owner: 'SEO Lead' },
  { id: 'l-4', title: 'Optimize Title, 5 Conversion Bullets & Backend Search Terms', category: 'Listing', targetModule: 'listing-builder', status: 'in-progress', priority: 'Critical', owner: 'Content Team' },
  { id: 'l-5', title: 'Pass Listing Analyzer Technical & JSON-LD Schema Audit (>85/100)', category: 'Audit', targetModule: 'listing-analyzer', status: 'in-progress', priority: 'High', owner: 'Tech SEO' },
  { id: 'l-6', title: 'Deploy 2-Step Brand & Canonical Super URLs for Launch Campaign', category: 'Attribution', targetModule: 'super-url', status: 'pending', priority: 'High', owner: 'Growth Lead' },
  { id: 'l-7', title: 'Verify Brand Citation Presence in ChatGPT, Perplexity & Gemini', category: 'AI Visibility', targetModule: 'ai-visibility', status: 'pending', priority: 'Medium', owner: 'AI Specialist' }
];

const INITIAL_PRODUCTS = [
  { id: 'prd-1', name: 'Ergonomic Carbon Mechanical Keypad Pro', sku: 'ECMK-901', category: 'Peripherals', price: 129, cogs: 32, shipping: 9, monthlyUnits: 1420, monthlyRev: 183180, searchVol: 48500, marginPct: 53.4, opportunityScore: 91, trend: '+24%' },
  { id: 'prd-2', name: 'GaN 140W Desktop Power Station with OLED Telemetry', sku: 'GAN-140X', category: 'Power Electronics', price: 89, cogs: 21, shipping: 7, monthlyUnits: 1890, monthlyRev: 168210, searchVol: 62100, marginPct: 54.1, opportunityScore: 88, trend: '+31%' },
  { id: 'prd-3', name: 'Acoustic Studio Foam Hex Tiles (12-Pack)', sku: 'ASF-HEX12', category: 'Creator Gear', price: 54, cogs: 11, shipping: 6, monthlyUnits: 2310, monthlyRev: 124740, searchVol: 39400, marginPct: 53.8, opportunityScore: 82, trend: '+14%' },
  { id: 'prd-4', name: 'Magnetic Low-Profile Microphone Boom Arm', sku: 'MLP-BOOM2', category: 'Creator Gear', price: 79, cogs: 19, shipping: 8, monthlyUnits: 1150, monthlyRev: 90850, searchVol: 29800, marginPct: 51.2, opportunityScore: 86, trend: '+19%' }
];

const INITIAL_SUPPLIERS = [
  { id: 'sup-1', name: 'Precision Tek Manufacturing Pvt Ltd', region: 'Pune, India', specialty: 'CNC Aluminum & Peripherals', moq: 250, fobCost: 29.50, leadDays: 14, qaScore: 94, verified: true, certs: 'ISO 9001, RoHS, BIS' },
  { id: 'sup-2', name: 'Shenzhen VoltCore Microelectronics Co.', region: 'Shenzhen, CN', specialty: 'GaN Power & Fast Chargers', moq: 500, fobCost: 19.80, leadDays: 21, qaScore: 89, verified: true, certs: 'CE, FCC, UL, RoHS' },
  { id: 'sup-3', name: 'Bavaria Acoustic Systems GmbH', region: 'Munich, DE', specialty: 'High-Density Studio Acoustic Materials', moq: 150, fobCost: 10.40, leadDays: 12, qaScore: 96, verified: true, certs: 'REACH, TÜV, ISO 14001' },
  { id: 'sup-4', name: 'Mekong Precision Hardware JSC', region: 'Da Nang, VN', specialty: 'Articulated Studio Arms & Mounts', moq: 300, fobCost: 17.90, leadDays: 18, qaScore: 87, verified: true, certs: 'ISO 9001, CE' }
];

const INITIAL_KEYWORDS = [
  { id: 'kw-1', keyword: 'best ai seo platform for agencies', volume: 18400, kd: 42, cpc: 6.80, intent: 'Commercial', pos: 3, prevPos: 6, url: '/platform/agencies', engine: 'Google IN' },
  { id: 'kw-2', keyword: 'ergonomic carbon mechanical keypad', volume: 48500, kd: 34, cpc: 3.10, intent: 'Transactional', pos: 2, prevPos: 5, url: '/products/carbon-keypad-pro', engine: 'Google IN' },
  { id: 'kw-3', keyword: '140w gan desktop charger oled', volume: 62100, kd: 49, cpc: 2.75, intent: 'Transactional', pos: 4, prevPos: 4, url: '/products/gan-140x', engine: 'Google US' },
  { id: 'kw-4', keyword: 'track brand mentions in chatgpt answers', volume: 12900, kd: 28, cpc: 5.40, intent: 'Informational', pos: 1, prevPos: 3, url: '/features/ai-visibility', engine: 'Google IN' },
  { id: 'kw-5', keyword: 'technical seo site audit automation tool', volume: 22300, kd: 61, cpc: 8.20, intent: 'Commercial', pos: 7, prevPos: 5, url: '/features/site-audit', engine: 'Google US' },
  { id: 'kw-6', keyword: 'low profile magnetic mic arm', volume: 29800, kd: 31, cpc: 2.15, intent: 'Transactional', pos: 5, prevPos: 9, url: '/products/magnetic-boom-arm', engine: 'Google IN' }
];

const INITIAL_SUPER_URLS = [
  { id: 'su-1', name: 'Carbon Keypad — Google & Marketplace 2-Step Keyword Link', type: '2-Step Brand + Keyword', targetUrl: 'https://nexuscorp.io/products/carbon-keypad-pro', keyword: 'ergonomic carbon mechanical keypad', generatedUrl: 'https://nxp.link/s/2step?domain=nexuscorp.io&k=ergonomic+carbon+mechanical+keypad&qid=173118&ref=sr_1_2', clicks: 1842, conversions: 246 },
  { id: 'su-2', name: 'AI Visibility Feature — Perplexity & ChatGPT Citation Anchor', type: 'AI Citation Anchor', targetUrl: 'https://nexuscorp.io/features/ai-visibility', keyword: 'track brand mentions in chatgpt answers', generatedUrl: 'https://nxp.link/s/ai-cite?src=llm_grounding&k=track+brand+mentions+in+chatgpt+answers#:~:text=RankPilot%20AI%20Visibility', clicks: 964, conversions: 158 },
  { id: 'su-3', name: 'GaN 140W Station — Canonical Search-to-Cart Attribution', type: 'Canonical Add-to-Cart', targetUrl: 'https://nexuscorp.io/products/gan-140x', keyword: '140w gan desktop charger oled', generatedUrl: 'https://nxp.link/s/canonical/140w-gan-desktop-charger-oled?sku=GAN-140X&cart=direct', clicks: 2410, conversions: 389 }
];

const INITIAL_PROMPTS = [
  { id: 'pr-1', prompt: 'What is the best AI SEO and brand visibility platform for agencies in India?', platform: 'ChatGPT-4o', country: 'IN', mentioned: true, cited: true, citationUrl: 'https://nexuscorp.io/features/ai-visibility', sentiment: 'Positive', sov: 68, excerpt: 'RankPilot (by NexusCorp) stands out for agencies needing unified Google Search Console telemetry alongside time-stamped LLM citation tracking...' },
  { id: 'pr-2', prompt: 'Best ergonomic mechanical keypad for developers and streamers 2026', platform: 'Perplexity Pro', country: 'US', mentioned: true, cited: true, citationUrl: 'https://nexuscorp.io/products/carbon-keypad-pro', sentiment: 'Positive', sov: 54, excerpt: 'According to hardware benchmarks, the NexusCorp Carbon Mechanical Keypad Pro offers hot-swappable optical switches and ultra-low latency...' },
  { id: 'pr-3', prompt: 'How to audit technical SEO redirect chains and Core Web Vitals automatically', platform: 'Gemini 2.5 Pro', country: 'IN', mentioned: true, cited: false, citationUrl: 'Competitor cited (ahrefs.com)', sentiment: 'Neutral', sov: 39, excerpt: 'Teams typically run Playwright-based crawlers such as RankPilot Site Audit or Screaming Frog to inspect HTTP 301 hops and LCP bottlenecks...' }
];

const INITIAL_SIGNALS = [
  { id: 'sig-1', title: 'High-converting keyword surged +3 positions to #2', sub: 'Keyword · ergonomic carbon mechanical keypad', time: 'Today at 14:20', impact: 'High', module: 'Rank Tracker', confidence: 94, recommendation: 'Lock canonical internal links from 4 blog guides to preserve top-2 CTR advantage.' },
  { id: 'sig-2', title: 'Missing FAQPage JSON-LD schema on 3 product pages', sub: 'Technical SEO · /products/gan-140x', time: 'Today at 11:05', impact: 'High', module: 'Listing Analyzer', confidence: 91, recommendation: 'Inject structured FAQ & Product Offer JSON-LD via Listing Builder to boost AI citation rate by +18%.' },
  { id: 'sig-3', title: 'Supplier FOB unit cost reduction unlocked (-8.5%)', sub: 'Supply Chain · Precision Tek Pune MOQ 250', time: 'Yesterday at 18:40', impact: 'Medium', module: 'Supplier Research', confidence: 88, recommendation: 'Sync updated $29.50 FOB rate into Profit Calculator to expand net unit margin to 55.2%.' }
];

function SegmentedLedBar({ value = 80, totalTicks = 26, showBadge = true, badgeText = 'Good', color = 'emerald' }) {
  const activeTicks = Math.round((Math.min(100, Math.max(0, value)) / 100) * totalTicks);
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: totalTicks }).map((_, idx) => {
          const isFilled = idx < activeTicks;
          let tickColor = 'bg-zinc-800';
          if (isFilled) {
            if (color === 'emerald') {
              tickColor = idx < totalTicks * 0.35 ? 'bg-amber-400' : 'bg-[#00FF66] shadow-[0_0_6px_rgba(0,255,102,0.55)]';
            } else if (color === 'amber') {
              tickColor = 'bg-amber-400';
            } else {
              tickColor = 'bg-rose-500';
            }
          }
          return <span key={idx} className={`inline-block w-[3px] h-2.5 rounded-[1px] transition-all ${tickColor}`} />;
        })}
      </div>
      {showBadge && (
        <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wide rounded-full bg-[#00FF66]/15 text-[#00FF66] border border-[#00FF66]/30">
          {badgeText}
        </span>
      )}
    </div>
  );
}

function DiagonalStripedTrendChart({ data, activeMonth, onSelectMonth }) {
  const maxVal = Math.max(...data.map(d => d.value), 60000);
  return (
    <div className="relative pt-6 pb-2 select-none">
      <div className="grid grid-cols-12 gap-2.5 items-end h-48 px-2">
        {data.map((item) => {
          const heightPct = Math.max(18, Math.round((item.value / maxVal) * 100));
          const isSelected = item.month === activeMonth;
          return (
            <div
              key={item.month}
              onClick={() => onSelectMonth(item.month)}
              className="group flex flex-col items-center h-full justify-end cursor-pointer"
            >
              <div className="relative w-full flex flex-col items-center justify-end h-full">
                {isSelected && (
                  <div className=" -top-7 px-2 py-0.5 rounded bg-zinc-900 border border-[#00FF66]/50 text-[11px] font-mono text-[#00FF66] shadow-lg whitespace-nowrap">
                    ${(item.value / 1000).toFixed(1)}k
                  </div>
                )}
                <div
                  className={`w-2.5 h-2.5 rounded-full mb-1 z-10 transition-transform group-hover:scale-125 ${
                    isSelected
                      ? 'bg-[#00FF66] ring-4 ring-[#00FF66]/25'
                      : 'bg-[#0B0D0E] border-2 border-zinc-400 group-hover:border-[#00FF66]'
                  }`}
                />
                <div
                  style={{
                    height: `${heightPct}%`,
                    backgroundImage: isSelected
                      ? 'linear-gradient(180deg, #00FF66 0%, #059669 100%)'
                      : 'repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0px, rgba(255,255,255,0.16) 2px, transparent 2px, transparent 6px)'
                  }}
                  className={`w-full rounded-t-md transition-all duration-300 ${
                    isSelected
                      ? 'shadow-[0_0_25px_rgba(0,255,102,0.35)] border border-[#00FF66]'
                      : 'bg-zinc-900/60 border border-white/10 group-hover:border-white/25'
                  }`}
                />
              </div>
              <span className={`mt-2 text-[11px] font-medium ${isSelected ? 'text-[#00FF66] font-semibold' : 'text-zinc-500'}`}>
                {item.month}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function RankPilotApp() {
  const [projects] = useState(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState('proj-1');
  const currentProject = useMemo(
    () => projects.find(p => p.id === selectedProjectId) || projects[0],
    [projects, selectedProjectId]
  );

  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeMonth, setActiveMonth] = useState('Jul');
  const [selectedKpiKey, setSelectedKpiKey] = useState('mrr');
  const [toast, setToast] = useState(null);

  const [launchList, setLaunchList] = useState(INITIAL_LAUNCH_LIST);
  const [launchFilter, setLaunchFilter] = useState('All');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [productSearch, setProductSearch] = useState('');

  const [suppliers] = useState(INITIAL_SUPPLIERS);
  const [rfqModalSupplier, setRfqModalSupplier] = useState(null);
  const [rfqQty, setRfqQty] = useState(500);

  const [keywords, setKeywords] = useState(INITIAL_KEYWORDS);
  const [keywordQuery, setKeywordQuery] = useState('');
  const [newKeywordText, setNewKeywordText] = useState('');

  const [calcState, setCalcState] = useState({
    productName: 'Ergonomic Carbon Mechanical Keypad Pro',
    sellingPrice: 129,
    cogs: 32,
    shipping: 9,
    platformFeePct: 15,
    paidCpa: 18,
    organicSharePct: 65,
    monthlyUnits: 1420
  });

  const [listingState, setListingState] = useState({
    sku: 'ECMK-901',
    title: 'NexusCorp Ergonomic Carbon Mechanical Keypad Pro — Hot-Swappable Optical Switches & Programmable Macro Dial',
    bullets: [
      'ULTRA-LOW LATENCY OPTICAL ACTUATION: Engineered with 0.2ms response carbon switches for competitive gaming and rapid IDE coding workflows.',
      'AEROSPACE CNC CARBON CHASSIS: Precision-milled anodized body dampens acoustic resonance while maintaining featherlight portability.',
      'SMART OLED TELEMETRY & ROTARY DIAL: Monitor real-time CPU/RAM stats, switch profiles, and control stream audio directly from the keypad.',
      'UNIVERSAL MAC, WINDOWS & LINUX VIA WEB CONFIGURATOR: Zero-bloatware browser remapping with onboard 5-layer flash memory.',
      'AI-VERIFIED ERGONOMIC WRIST GEOMETRY: Split 14-degree negative tilt reduces ulnar deviation during 10-hour engineering sprints.'
    ],
    backendTerms: 'custom macro pad stream deck alternative hot swap mechanical keypad programmer keyboard low profile gaming keypad',
    jsonLdEnabled: true
  });

  const [analyzerUrl, setAnalyzerUrl] = useState('https://nexuscorp.io/products/carbon-keypad-pro');
  const [analyzerRunning, setAnalyzerRunning] = useState(false);

  const [superUrls, setSuperUrls] = useState(INITIAL_SUPER_URLS);
  const [superUrlForm, setSuperUrlForm] = useState({
    name: 'Holiday Promo Campaign Link',
    type: '2-Step Brand + Keyword',
    targetUrl: 'https://nexuscorp.io/products/carbon-keypad-pro',
    keyword: 'ergonomic carbon mechanical keypad'
  });
  const [copiedId, setCopiedId] = useState(null);

  const [prompts, setPrompts] = useState(INITIAL_PROMPTS);
  const [newPromptText, setNewPromptText] = useState('');
  const [signals] = useState(INITIAL_SIGNALS);
  const [selectedSignal, setSelectedSignal] = useState(null);

  const notify = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    notify('Copied attribution URL to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const profitMetrics = useMemo(() => {
    const referralFee = (calcState.sellingPrice * calcState.platformFeePct) / 100;
    const blendedAdCostPerUnit = calcState.paidCpa * (1 - calcState.organicSharePct / 100);
    const totalUnitCost = Number(calcState.cogs) + Number(calcState.shipping) + referralFee + blendedAdCostPerUnit;
    const netUnitProfit = calcState.sellingPrice - totalUnitCost;
    const netMarginPct = calcState.sellingPrice > 0 ? (netUnitProfit / calcState.sellingPrice) * 100 : 0;
    const monthlyNetProfit = netUnitProfit * calcState.monthlyUnits;
    const annualRunRate = monthlyNetProfit * 12;
    const roiPct = totalUnitCost > 0 ? (netUnitProfit / totalUnitCost) * 100 : 0;
    return {
      referralFee,
      blendedAdCostPerUnit,
      totalUnitCost,
      netUnitProfit,
      netMarginPct,
      monthlyNetProfit,
      annualRunRate,
      roiPct
    };
  }, [calcState]);

  const listingCoverage = useMemo(() => {
    const combinedText = `${listingState.title} ${listingState.bullets.join(' ')} ${listingState.backendTerms}`.toLowerCase();
    const matched = keywords.filter(k =>
      k.keyword.toLowerCase().split(' ').some(word => word.length > 3 && combinedText.includes(word))
    );
    const score = Math.min(98, Math.round((matched.length / Math.max(1, keywords.length)) * 75) + (listingState.jsonLdEnabled ? 20 : 5));
    return { matchedCount: matched.length, total: keywords.length, score };
  }, [listingState, keywords]);

  const sendProductToCalculator = (prd) => {
    setCalcState({
      productName: prd.name,
      sellingPrice: prd.price,
      cogs: prd.cogs,
      shipping: prd.shipping,
      platformFeePct: 15,
      paidCpa: 16,
      organicSharePct: 68,
      monthlyUnits: prd.monthlyUnits
    });
    setActiveNav('profit-calculator');
    notify(`Loaded "${prd.name}" into Profit Calculator`);
  };

  const sendSupplierToCalculator = (sup) => {
    setCalcState(prev => ({
      ...prev,
      cogs: sup.fobCost
    }));
    setActiveNav('profit-calculator');
    notify(`Applied ${sup.name} FOB Cost ($${sup.fobCost}) to Profit Calculator`);
  };

  const handleGenerateSuperUrl = (e) => {
    e.preventDefault();
    const slugKw = encodeURIComponent(superUrlForm.keyword.trim().replace(/\s+/g, '+'));
    const ts = Math.floor(Date.now() / 1000).toString().slice(-6);
    let url = `https://nxp.link/s/2step?url=${encodeURIComponent(superUrlForm.targetUrl)}&k=${slugKw}&qid=${ts}`;
    if (superUrlForm.type === 'AI Citation Anchor') {
      url = `${superUrlForm.targetUrl}?utm_source=ai_citation&k=${slugKw}#:~:text=${encodeURIComponent(superUrlForm.keyword)}`;
    } else if (superUrlForm.type === 'Canonical Add-to-Cart') {
      url = `https://nxp.link/s/canonical/${slugKw}?target=${encodeURIComponent(superUrlForm.targetUrl)}&action=add_to_cart`;
    }
    const created = {
      id: `su-${Date.now()}`,
      name: superUrlForm.name || 'Custom Attribution Link',
      type: superUrlForm.type,
      targetUrl: superUrlForm.targetUrl,
      keyword: superUrlForm.keyword,
      generatedUrl: url,
      clicks: 1,
      conversions: 0
    };
    setSuperUrls([created, ...superUrls]);
    notify('Generated new Super URL attribution link');
  };

  const autoInjectKeywords = () => {
    setListingState(prev => ({
      ...prev,
      title: `${prev.title} | Best AI SEO & Ergonomic Carbon Mechanical Keypad`,
      backendTerms: `${prev.backendTerms} 140w gan desktop charger oled low profile magnetic mic arm track brand mentions`
    }));
    notify('AI injected high-velocity missing keywords into Listing Builder');
  };

  const toggleLaunchItem = (id) => {
    setLaunchList(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, status: item.status === 'completed' ? 'in-progress' : 'completed' }
          : item
      )
    );
  };

  const addLaunchTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setLaunchList([
      ...launchList,
      {
        id: `l-${Date.now()}`,
        title: newTaskTitle.trim(),
        category: 'Custom',
        targetModule: 'keyword-research',
        status: 'pending',
        priority: 'High',
        owner: 'Aarush M.'
      }
    ]);
    setNewTaskTitle('');
    notify('Added task to Launch List');
  };

  const launchProgressPct = Math.round(
    (launchList.filter(i => i.status === 'completed').length / launchList.length) * 100
  );

  return (
    <div className="min-h-screen bg-[#07090A] text-zinc-100 flex font-sans antialiased selection:bg-[#00FF66]/20 selection:text-[#00FF66]">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900/95 border border-[#00FF66]/50 text-xs font-medium text-zinc-100 shadow-[0_10px_30px_rgba(0,255,102,0.2)]">
          <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
          <span>{toast}</span>
        </div>
      )}

      {/* SIDEBAR MATCHING SCREENSHOT + ORVEN DARK THEME */}
      <aside className="w-64 bg-[#0B0D0F] border-r border-white/[0.07] flex flex-col justify-between shrink-0 select-none">
        <div className="p-3.5 space-y-4 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#00FF66]/15 border border-[#00FF66]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,102,0.25)]">
                <Sparkles className="w-4 h-4 text-[#00FF66]" />
              </div>
              <span className="font-semibold tracking-tight text-base text-white">RankPilot</span>
            </div>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
              v2.4
            </span>
          </div>

          {/* Organization / Project Switcher */}
          <div className="p-2.5 rounded-xl bg-[#111417] border border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-zinc-800 text-xs font-bold flex items-center justify-center text-white shrink-0">
                {currentProject.name.charAt(0)}
              </div>
              <div className="truncate">
                <div className="text-xs font-semibold text-white truncate">{currentProject.name}</div>
                <div className="text-[10px] text-zinc-400 truncate">{currentProject.domain} · Founder view</div>
              </div>
            </div>
            <button
              onClick={() =>
                setSelectedProjectId(selectedProjectId === 'proj-1' ? 'proj-2' : 'proj-1')
              }
              title="Switch active project"
              className="p-1 rounded hover:bg-white/5 text-zinc-400 hover:text-white"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Top Highlighted Pill Group (From User Screenshot: Launch List & Product Research) */}
          <div className="space-y-1.5">
            <button
              onClick={() => setActiveNav('launch-list')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeNav === 'launch-list'
                  ? 'bg-[#1C1F24] text-white border-[#00FF66]/40 shadow-[0_0_20px_rgba(0,255,102,0.12)]'
                  : 'bg-[#17191C] text-zinc-200 border-white/[0.06] hover:bg-[#1E2126]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Rocket className={`w-4 h-4 ${activeNav === 'launch-list' ? 'text-[#00FF66]' : 'text-zinc-300'}`} />
                <span>Launch List</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-[#00FF66]">
                {launchProgressPct}%
              </span>
            </button>

            <button
              onClick={() => setActiveNav('product-research')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeNav === 'product-research'
                  ? 'bg-[#1C1F24] text-white border-[#00FF66]/40 shadow-[0_0_20px_rgba(0,255,102,0.12)]'
                  : 'bg-[#17191C] text-zinc-200 border-white/[0.06] hover:bg-[#1E2126]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <PackageSearch className={`w-4 h-4 ${activeNav === 'product-research' ? 'text-[#00FF66]' : 'text-zinc-300'}`} />
                <span>Product Research</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-400">{products.length}</span>
            </button>

            <button
              onClick={() => setActiveNav('keyword-research')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm transition-all ${
                activeNav === 'keyword-research'
                  ? 'text-[#00FF66] bg-[#00FF66]/10 font-medium'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Keyword Research</span>
            </button>

            <button
              onClick={() => setActiveNav('supplier-research')}
              className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm transition-all ${
                activeNav === 'supplier-research'
                  ? 'text-[#00FF66] bg-[#00FF66]/10 font-medium'
                  : 'text-zinc-300 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Supplier Research</span>
            </button>
          </div>

          {/* Tools Section (From User Screenshot) */}
          <div className="pt-2 border-t border-white/[0.06] space-y-1">
            <div className="px-3.5 py-1 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Tools
            </div>
            {[
              { id: 'rank-tracker', label: 'Rank Tracker', icon: TrendingUp },
              { id: 'profit-calculator', label: 'Profit Calculator', icon: Calculator },
              { id: 'listing-builder', label: 'Listing Builder', icon: FileEdit },
              { id: 'listing-analyzer', label: 'Listing Analyzer', icon: Search },
              { id: 'super-url', label: 'Super URL', icon: Link2 }
            ].map(item => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm transition-all ${
                    active
                      ? 'text-[#00FF66] bg-[#00FF66]/10 font-medium'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Orven Executive & AI Visibility Intelligence */}
          <div className="pt-2 border-t border-white/[0.06] space-y-1">
            <div className="px-3.5 py-1 text-[11px] font-medium text-zinc-500 uppercase tracking-wider">
              Intelligence
            </div>
            {[
              { id: 'dashboard', label: 'Company Health', icon: LayoutDashboard },
              { id: 'ai-visibility', label: 'AI Visibility', icon: Sparkles },
              { id: 'reports', label: 'Client Reports', icon: FileText }
            ].map(item => {
              const Icon = item.icon;
              const active = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2 rounded-lg text-sm transition-all ${
                    active
                      ? 'text-[#00FF66] bg-[#00FF66]/10 font-medium'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom-Left Orven Floating Project Snapshot Card */}
        <div className="p-3 m-2.5 rounded-2xl bg-gradient-to-b from-[#13171A] to-[#0D1012] border border-white/[0.08] shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300 text-xs font-bold">
                N
              </div>
              <div>
                <div className="text-xs font-semibold text-white">{currentProject.name}</div>
                <div className="text-[10px] text-zinc-400">{currentProject.equity}</div>
              </div>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
          </div>

          <div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-white">{currentProject.healthScore}</span>
              <SegmentedLedBar value={currentProject.healthScore} totalTicks={14} showBadge={true} badgeText="Good" />
            </div>
            <div className="text-[10px] text-zinc-500 mt-0.5">SEO & Listing Health Score</div>
          </div>

          <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
            <div>
              <div className="font-mono font-semibold text-zinc-200">
                ${(currentProject.baselineTrafficValue / 1000).toFixed(0)}K
              </div>
              <div className="text-[10px] text-zinc-500">Baseline</div>
            </div>
            <div className="text-[#00FF66] font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#00FF66]/10 border border-[#00FF66]/30">
              {currentProject.roiMultiplier}
            </div>
            <div className="text-right">
              <div className="font-mono font-semibold text-white">
                ${(currentProject.estimatedTrafficValue / 1000).toFixed(0)}K
              </div>
              <div className="text-[10px] text-zinc-500">Estimated</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar */}
        <header className="h-14 px-6 border-b border-white/[0.07] bg-[#0B0D0F]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-white tracking-tight capitalize">
              {activeNav.replace('-', ' ')}
            </h1>
            <span className="text-xs text-zinc-500">·</span>
            <span className="text-xs text-zinc-400">{currentProject.domain}</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/25">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] animate-pulse" />
              synced {currentProject.lastSync}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActiveNav('profit-calculator')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-200 flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-[#00FF66]" />
              <span>Unit Profit: ${profitMetrics.netUnitProfit.toFixed(2)}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-white text-black hover:bg-zinc-200 flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6 max-w-[1440px]">
          {/* 1. ORVEN COMPANY HEALTH DASHBOARD */}
          {activeNav === 'dashboard' && (
            <>
              {/* 5-Column Orven KPI Strip */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
                <div
                  onClick={() => setSelectedKpiKey('health')}
                  className={`p-4 rounded-2xl cursor-pointer transition border ${
                    selectedKpiKey === 'health'
                      ? 'bg-gradient-to-b from-[#132219] to-[#0D1310] border-[#00FF66]/40'
                      : 'bg-[#101316] border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs text-zinc-400 mb-2">Company health score</div>
                  <div className="flex items-baseline gap-2.5 mb-3">
                    <span className="text-3xl font-bold text-white">{currentProject.healthScore}</span>
                    <span className="text-xs text-[#00FF66] font-medium">{currentProject.healthDelta}</span>
                  </div>
                  <SegmentedLedBar value={currentProject.healthScore} totalTicks={22} />
                </div>

                <div
                  onClick={() => setSelectedKpiKey('nrr')}
                  className={`p-4 rounded-2xl cursor-pointer transition border ${
                    selectedKpiKey === 'nrr'
                      ? 'bg-gradient-to-b from-[#132219] to-[#0D1310] border-[#00FF66]/40'
                      : 'bg-[#101316] border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs text-zinc-400 mb-2">NRR / Retention</div>
                  <div className="text-2xl font-bold text-white mb-2">{currentProject.nrr}</div>
                  <div className="text-xs text-rose-400">{currentProject.nrrDelta}</div>
                </div>

                <div
                  onClick={() => setSelectedKpiKey('mom')}
                  className={`p-4 rounded-2xl cursor-pointer transition border ${
                    selectedKpiKey === 'mom'
                      ? 'bg-gradient-to-b from-[#132219] to-[#0D1310] border-[#00FF66]/40'
                      : 'bg-[#101316] border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs text-zinc-400 mb-2">MoM Organic Growth</div>
                  <div className="text-2xl font-bold text-white mb-2">{currentProject.momGrowth}</div>
                  <div className="text-xs text-[#00FF66]">{currentProject.momDelta}</div>
                </div>

                <div
                  onClick={() => setSelectedKpiKey('ltv')}
                  className={`p-4 rounded-2xl cursor-pointer transition border ${
                    selectedKpiKey === 'ltv'
                      ? 'bg-gradient-to-b from-[#132219] to-[#0D1310] border-[#00FF66]/40'
                      : 'bg-[#101316] border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs text-zinc-400 mb-2">LTV / CAC Ratio</div>
                  <div className="text-2xl font-bold text-white mb-2">{currentProject.ltvCac}</div>
                  <div className="text-xs text-[#00FF66]">{currentProject.ltvDelta}</div>
                </div>

                <div
                  onClick={() => setSelectedKpiKey('ai')}
                  className={`p-4 rounded-2xl cursor-pointer transition border ${
                    selectedKpiKey === 'ai'
                      ? 'bg-gradient-to-b from-[#132219] to-[#0D1310] border-[#00FF66]/40'
                      : 'bg-[#101316] border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  <div className="text-xs text-zinc-400 mb-2">AI Visibility Score</div>
                  <div className="text-2xl font-bold text-white mb-2">{currentProject.aiVisibility}/100</div>
                  <div className="text-xs text-[#00FF66]">{currentProject.aiDelta}</div>
                </div>
              </div>

              {/* Center Row: Diagonal Striped Chart + Runway + Orven fx Formula Card */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 p-5 rounded-2xl bg-[#101316] border border-white/[0.07]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <div className="text-xs text-zinc-400">MRR & Organic Search Revenue Attribution</div>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-3xl font-bold text-white">
                          ${currentProject.mrr.toLocaleString()}
                        </span>
                        <span className="text-xs text-[#00FF66] font-medium">
                          {currentProject.mrrDelta} · {currentProject.mrrMom}
                        </span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400">Active: {activeMonth}</span>
                  </div>
                  <DiagonalStripedTrendChart
                    data={MONTHLY_SERIES}
                    activeMonth={activeMonth}
                    onSelectMonth={setActiveMonth}
                  />
                </div>

                {/* Runway & fx Formula Provenance Card */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-[#121916] to-[#0D1012] border border-[#00FF66]/25 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-400">Organic Attribution & Unit Formula</div>
                      <div className="text-2xl font-bold text-white mt-0.5">
                        ${(profitMetrics.monthlyNetProfit).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 text-xs font-mono text-[#00FF66]">
                      fx Formula
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.07] font-mono text-xs space-y-1.5">
                    <div className="text-zinc-400">
                      NetUnit = Price(${calcState.sellingPrice}) - COGS(${calcState.cogs}) - Fee(${profitMetrics.referralFee.toFixed(1)})
                    </div>
                    <div className="text-[#00FF66]">
                      MRR = {calcState.monthlyUnits} units × ${profitMetrics.netUnitProfit.toFixed(2)} = ${profitMetrics.monthlyNetProfit.toFixed(0)}
                    </div>
                  </div>

                  <div className="text-xs text-zinc-400 space-y-1 pt-1 border-t border-white/[0.06]">
                    <div><span className="text-zinc-500">Source:</span> GSC + GA4 + Razorpay Live Webhook</div>
                    <div><span className="text-zinc-500">Updated:</span> {currentProject.lastSync} · Verified tenant isolation</div>
                    <div><span className="text-zinc-500">Excluded:</span> Refunded orders & non-canonical traffic</div>
                  </div>
                </div>
              </div>

              {/* Bottom AI Signals Table */}
              <div className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-semibold text-white">AI Signals & Diagnostic Priorities</h2>
                    <span className="text-xs text-zinc-400">· {signals.length} active</span>
                  </div>
                  <button
                    onClick={() => setActiveNav('launch-list')}
                    className="text-xs text-[#00FF66] hover:underline flex items-center gap-1"
                  >
                    <span>Open Launch List</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.06] text-zinc-500">
                        <th className="pb-2.5 font-medium">Signal / Risk Area</th>
                        <th className="pb-2.5 font-medium">Timestamp</th>
                        <th className="pb-2.5 font-medium">Impact</th>
                        <th className="pb-2.5 font-medium">Module</th>
                        <th className="pb-2.5 font-medium">Confidence</th>
                        <th className="pb-2.5 text-right font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.05]">
                      {signals.map(sig => (
                        <tr key={sig.id} className="hover:bg-white/[0.02]">
                          <td className="py-3 pr-4">
                            <div className="font-medium text-white">{sig.title}</div>
                            <div className="text-[11px] text-zinc-500">{sig.sub}</div>
                          </td>
                          <td className="py-3 text-zinc-400">{sig.time}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded bg-rose-500/15 text-rose-400 border border-rose-500/30 text-[11px]">
                              {sig.impact}
                            </span>
                          </td>
                          <td className="py-3 text-zinc-300">{sig.module}</td>
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <SegmentedLedBar value={sig.confidence} totalTicks={16} showBadge={false} />
                              <span className="font-mono text-zinc-200">{sig.confidence}%</span>
                            </div>
                          </td>
                          <td className="py-3 text-right">
                            <button
                              onClick={() => setSelectedSignal(sig)}
                              className="px-2.5 py-1 rounded bg-white text-black font-bold hover:bg-[#00FF66] transition"
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* 2. LAUNCH LIST */}
          {activeNav === 'launch-list' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-semibold text-white">Go-To-Market & SEO Launch Readiness</h2>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Interactive launch workflow connecting Product Research, Supplier MOQ, Listing Builder, and Super URLs.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <SegmentedLedBar value={launchProgressPct} totalTicks={24} badgeText={`${launchProgressPct}% Ready`} />
                </div>
              </div>

              <form onSubmit={addLaunchTask} className="flex gap-2">
                <input
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  placeholder="Add new launch milestone (e.g., Submit XML Sitemap to GSC)..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#101316] border border-white/[0.08] text-xs text-white focus:outline-none focus:border-[#00FF66]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#00FF66] text-black text-xs font-semibold hover:bg-[#00FF66]/90"
                >
                  + Add Milestone
                </button>
              </form>

              <div className="space-y-2.5">
                {launchList.map(item => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#101316] border border-white/[0.07] flex items-center justify-between gap-4 hover:border-white/20 transition"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLaunchItem(item.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          item.status === 'completed'
                            ? 'bg-[#00FF66] border-[#00FF66] text-black'
                            : 'border-zinc-600 text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <div>
                        <div className={`text-xs font-medium ${item.status === 'completed' ? 'line-through text-zinc-500' : 'text-white'}`}>
                          {item.title}
                        </div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">
                          {item.category} · Owner: {item.owner} · Priority: {item.priority}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveNav(item.targetModule)}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-xs text-[#00FF66] flex items-center gap-1"
                    >
                      <span>Open Tool</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PRODUCT RESEARCH */}
          {activeNav === 'product-research' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <input
                  value={productSearch}
                  onChange={e => setProductSearch(e.target.value)}
                  placeholder="Filter products by name, SKU, or category..."
                  className="w-96 px-4 py-2 rounded-xl bg-[#101316] border border-white/[0.08] text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {products
                  .filter(p => p.name.toLowerCase().includes(productSearch.toLowerCase()))
                  .map(prd => (
                    <div
                      key={prd.id}
                      className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] flex flex-wrap items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">{prd.name}</span>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                            {prd.sku}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400">
                          Price: <strong className="text-white">${prd.price}</strong> · COGS: ${prd.cogs} · Monthly Rev:{' '}
                          <strong className="text-[#00FF66]">${prd.monthlyRev.toLocaleString()}</strong> · Search Vol: {prd.searchVol.toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div>
                          <div className="text-[10px] text-zinc-400 mb-1">Opportunity Score ({prd.opportunityScore}/100)</div>
                          <SegmentedLedBar value={prd.opportunityScore} totalTicks={18} badgeText={prd.trend} />
                        </div>
                        <button
                          onClick={() => sendProductToCalculator(prd)}
                          className="px-3 py-2 rounded-xl bg-[#00FF66] text-black text-xs font-semibold hover:bg-[#00FF66]/90"
                        >
                          Simulate in Profit Calc
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 4. KEYWORD RESEARCH & RANK TRACKER */}
          {(activeNav === 'keyword-research' || activeNav === 'rank-tracker') && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <input
                  value={keywordQuery}
                  onChange={e => setKeywordQuery(e.target.value)}
                  placeholder="Search tracked keywords or URLs..."
                  className="w-80 px-4 py-2 rounded-xl bg-[#101316] border border-white/[0.08] text-xs text-white"
                />
                <div className="flex gap-2">
                  <input
                    value={newKeywordText}
                    onChange={e => setNewKeywordText(e.target.value)}
                    placeholder="Add new keyword to track..."
                    className="px-3.5 py-2 rounded-xl bg-[#101316] border border-white/[0.08] text-xs text-white"
                  />
                  <button
                    onClick={() => {
                      if (!newKeywordText.trim()) return;
                      setKeywords([
                        {
                          id: `kw-${Date.now()}`,
                          keyword: newKeywordText.trim(),
                          volume: 9400,
                          kd: 36,
                          cpc: 3.4,
                          intent: 'Commercial',
                          pos: 11,
                          prevPos: 15,
                          url: '/products/new',
                          engine: 'Google IN'
                        },
                        ...keywords
                      ]);
                      setNewKeywordText('');
                      notify('Keyword added to Rank Tracker');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#00FF66] text-black text-xs font-semibold"
                  >
                    + Track Keyword
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/[0.06] text-zinc-500">
                      <th className="pb-3">Keyword</th>
                      <th className="pb-3">Volume</th>
                      <th className="pb-3">KD %</th>
                      <th className="pb-3">Intent</th>
                      <th className="pb-3">Rank</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {keywords
                      .filter(k => k.keyword.toLowerCase().includes(keywordQuery.toLowerCase()))
                      .map(kw => {
                        const delta = kw.prevPos - kw.pos;
                        return (
                          <tr key={kw.id} className="hover:bg-white/[0.02]">
                            <td className="py-3 font-medium text-white">{kw.keyword}</td>
                            <td className="py-3 font-mono">{kw.volume.toLocaleString()}</td>
                            <td className="py-3">
                              <SegmentedLedBar value={100 - kw.kd} totalTicks={14} badgeText={`KD ${kw.kd}`} />
                            </td>
                            <td className="py-3 text-zinc-300">{kw.intent}</td>
                            <td className="py-3 font-mono">
                              <span className="text-white font-bold">#{kw.pos}</span>{' '}
                              <span className={delta >= 0 ? 'text-[#00FF66]' : 'text-rose-400'}>
                                ({delta >= 0 ? `+${delta}` : delta})
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                onClick={() => {
                                  setSuperUrlForm(prev => ({ ...prev, keyword: kw.keyword }));
                                  setActiveNav('super-url');
                                  notify(`Loaded "${kw.keyword}" into Super URL Builder`);
                                }}
                                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-[#00FF66]"
                              >
                                Build Super URL
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. SUPPLIER RESEARCH */}
          {activeNav === 'supplier-research' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {suppliers.map(sup => (
                <div key={sup.id} className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{sup.name}</div>
                      <div className="text-xs text-zinc-400">{sup.region} · {sup.specialty}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] text-[10px] font-mono">
                      Verified · {sup.certs}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="text-zinc-500 text-[10px]">MOQ</div>
                      <div className="font-mono font-semibold text-white">{sup.moq} units</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="text-zinc-500 text-[10px]">FOB Unit Cost</div>
                      <div className="font-mono font-semibold text-[#00FF66]">${sup.fobCost.toFixed(2)}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.05]">
                      <div className="text-zinc-500 text-[10px]">Lead Time</div>
                      <div className="font-mono font-semibold text-white">{sup.leadDays} days</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <SegmentedLedBar value={sup.qaScore} totalTicks={16} badgeText={`QA ${sup.qaScore}%`} />
                    <button
                      onClick={() => sendSupplierToCalculator(sup)}
                      className="px-3 py-1.5 rounded-lg bg-[#00FF66] text-black text-xs font-semibold"
                    >
                      Send Cost to Profit Calc
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6. PROFIT CALCULATOR */}
          {activeNav === 'profit-calculator' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-7 p-5 rounded-2xl bg-[#101316] border border-white/[0.07] space-y-4">
                <h2 className="text-sm font-semibold text-white">Interactive Unit Economics & SEO Organic Share Simulator</h2>
                {[
                  { label: 'Retail Selling Price ($)', key: 'sellingPrice', min: 15, max: 300, step: 1 },
                  { label: 'Manufacturing COGS ($)', key: 'cogs', min: 2, max: 150, step: 0.5 },
                  { label: 'Fulfillment & Shipping ($)', key: 'shipping', min: 1, max: 40, step: 0.5 },
                  { label: 'Paid Ad CPA ($)', key: 'paidCpa', min: 0, max: 60, step: 1 },
                  { label: 'Organic SEO Traffic Share (%)', key: 'organicSharePct', min: 0, max: 100, step: 1 },
                  { label: 'Projected Monthly Units', key: 'monthlyUnits', min: 100, max: 10000, step: 50 }
                ].map(ctrl => (
                  <div key={ctrl.key} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-400">{ctrl.label}</span>
                      <span className="font-mono font-semibold text-white">{calcState[ctrl.key]}</span>
                    </div>
                    <input
                      type="range"
                      min={ctrl.min}
                      max={ctrl.max}
                      step={ctrl.step}
                      value={calcState[ctrl.key]}
                      onChange={e =>
                        setCalcState({ ...calcState, [ctrl.key]: parseFloat(e.target.value) })
                      }
                      className="w-full accent-[#00FF66]"
                    />
                  </div>
                ))}
              </div>

              <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-b from-[#132219] to-[#0D1012] border border-[#00FF66]/30 space-y-4">
                <div className="text-xs text-zinc-400">Net Unit Profit & Margin Health</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-4xl font-bold text-white">
                    ${profitMetrics.netUnitProfit.toFixed(2)}
                  </span>
                  <span className="text-sm font-mono text-[#00FF66]">
                    {profitMetrics.netMarginPct.toFixed(1)}% Margin
                  </span>
                </div>
                <SegmentedLedBar value={profitMetrics.netMarginPct} totalTicks={24} badgeText="Healthy" />

                <div className="p-3.5 rounded-xl bg-black/50 border border-white/[0.07] font-mono text-xs space-y-1.5">
                  <div>Monthly Net Profit: <strong className="text-[#00FF66]">${profitMetrics.monthlyNetProfit.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
                  <div>Annual Run-Rate: <strong className="text-white">${profitMetrics.annualRunRate.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong></div>
                  <div>Blended Ad Cost/Unit: ${profitMetrics.blendedAdCostPerUnit.toFixed(2)}</div>
                </div>
              </div>
            </div>
          )}

          {/* 7. LISTING BUILDER */}
          {activeNav === 'listing-builder' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">AI-Assisted Listing & Semantic Keyword Composer</div>
                  <div className="text-xs text-zinc-400">
                    Indexed {listingCoverage.matchedCount} of {listingCoverage.total} priority keywords
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <SegmentedLedBar value={listingCoverage.score} totalTicks={18} badgeText={`${listingCoverage.score}/100`} />
                  <button
                    onClick={autoInjectKeywords}
                    className="px-3.5 py-2 rounded-xl bg-[#00FF66] text-black text-xs font-semibold"
                  >
                    Auto-Inject Missing Keywords
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] space-y-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Product / Page Title</label>
                  <input
                    value={listingState.title}
                    onChange={e => setListingState({ ...listingState, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1">Backend Search Terms</label>
                  <input
                    value={listingState.backendTerms}
                    onChange={e => setListingState({ ...listingState, backendTerms: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 8. LISTING ANALYZER */}
          {activeNav === 'listing-analyzer' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] flex gap-3">
                <input
                  value={analyzerUrl}
                  onChange={e => setAnalyzerUrl(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                />
                <button
                  onClick={() => {
                    setAnalyzerRunning(true);
                    setTimeout(() => {
                      setAnalyzerRunning(false);
                      notify('Completed technical SEO & AI Citation readiness scan');
                    }, 600);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#00FF66] text-black text-xs font-semibold"
                >
                  {analyzerRunning ? 'Scanning...' : 'Run Audit'}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Title & H1 Semantic Density', score: 92, note: 'Primary transactional keyword present in first 60 chars.' },
                  { title: 'Core Web Vitals & Mobile Viewport', score: 88, note: 'LCP 1.4s · CLS 0.02 · HTTPS & Canonical verified.' },
                  { title: 'LLM Citation & Schema Readiness', score: 84, note: 'Product & FAQPage JSON-LD detected for Perplexity/ChatGPT.' }
                ].map((c, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#101316] border border-white/[0.07] space-y-2">
                    <div className="text-xs font-semibold text-white">{c.title}</div>
                    <SegmentedLedBar value={c.score} totalTicks={18} badgeText={`${c.score}/100`} />
                    <div className="text-[11px] text-zinc-400">{c.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. SUPER URL */}
          {activeNav === 'super-url' && (
            <div className="space-y-5">
              <form onSubmit={handleGenerateSuperUrl} className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] grid grid-cols-1 md:grid-cols-4 gap-3">
                <input
                  value={superUrlForm.name}
                  onChange={e => setSuperUrlForm({ ...superUrlForm, name: e.target.value })}
                  placeholder="Campaign name"
                  className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                />
                <select
                  value={superUrlForm.type}
                  onChange={e => setSuperUrlForm({ ...superUrlForm, type: e.target.value })}
                  className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                >
                  <option>2-Step Brand + Keyword</option>
                  <option>AI Citation Anchor</option>
                  <option>Canonical Add-to-Cart</option>
                </select>
                <input
                  value={superUrlForm.keyword}
                  onChange={e => setSuperUrlForm({ ...superUrlForm, keyword: e.target.value })}
                  placeholder="Target keyword"
                  className="px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white"
                />
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#00FF66] text-black text-xs font-semibold">
                  Generate Super URL
                </button>
              </form>

              <div className="space-y-3">
                {superUrls.map(su => (
                  <div key={su.id} className="p-4 rounded-2xl bg-[#101316] border border-white/[0.07] flex flex-wrap items-center justify-between gap-3">
                    <div className="space-y-1 max-w-2xl">
                      <div className="text-xs font-semibold text-white">{su.name} · <span className="text-[#00FF66]">{su.type}</span></div>
                      <div className="text-[11px] font-mono text-zinc-400 break-all">{su.generatedUrl}</div>
                    </div>
                    <button
                      onClick={() => copyToClipboard(su.generatedUrl, su.id)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white flex items-center gap-1.5"
                    >
                      {copiedId === su.id ? <Check className="w-3.5 h-3.5 text-[#00FF66]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === su.id ? 'Copied' : 'Copy Link'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. AI VISIBILITY & CLIENT REPORTS */}
          {(activeNav === 'ai-visibility' || activeNav === 'reports') && (
            <div className="space-y-4">
              {prompts.map(pr => (
                <div key={pr.id} className="p-5 rounded-2xl bg-[#101316] border border-white/[0.07] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">“{pr.prompt}”</span>
                    <span className="px-2.5 py-0.5 rounded bg-[#00FF66]/10 text-[#00FF66] text-xs font-mono">
                      {pr.platform} · SoV {pr.sov}%
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 italic">"{pr.excerpt}"</p>
                  <div className="text-[11px] text-zinc-400">Cited Source: {pr.citationUrl}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Signal Modal */}
      {selectedSignal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-5 rounded-2xl bg-[#121519] border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">{selectedSignal.title}</h3>
              <button onClick={() => setSelectedSignal(null)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-300">{selectedSignal.recommendation}</p>
            <button
              onClick={() => {
                setSelectedSignal(null);
                notify('Remediation task queued in Launch List');
              }}
              className="w-full py-2 rounded-xl bg-[#00FF66] text-black text-xs font-semibold"
            >
              Execute Remediation & Log to Launch List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
