import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  LayoutDashboard,
  Package,
  Store,
  Search,
  Calendar,
  Download,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Wallet,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Users,
  ShoppingBag,
  MoreHorizontal,
  X,
  ChevronLeft,
  FileText,
  ShieldCheck,
  Hourglass,
  CalendarDays,
  Layers,
  MapPin,
  Boxes,
  Timer,
} from 'lucide-react';

// ============ DESIGN TOKENS ============
const COLORS = {
  primary: '#E91E63',
  primaryLight: '#FCE4EC',
  primaryBorder: '#F8BBD0',
  primaryDark: '#C2185B',
  ink: '#1A1A2E',
  inkSoft: '#4A4A5E',
  inkMute: '#8A8A9C',
  line: '#EDEDF2',
  lineSoft: '#F5F5F8',
  bg: '#FAFAFB',
  white: '#FFFFFF',
  success: '#10B981',
  successBg: '#D1FAE5',
  warn: '#F59E0B',
  warnBg: '#FEF3C7',
  danger: '#EF4444',
  dangerBg: '#FEE2E2',
  info: '#3B82F6',
  infoBg: '#DBEAFE',
  violet: '#8B5CF6',
  violetBg: '#EDE9FE',
};

// ============ MOCK DATA ============
const trendData = [
  { date: '01/04', orders: 145, revenue: 68000 },
  { date: '02/04', orders: 168, revenue: 82000 },
  { date: '03/04', orders: 152, revenue: 71000 },
  { date: '04/04', orders: 189, revenue: 94000 },
  { date: '05/04', orders: 221, revenue: 112000 },
  { date: '06/04', orders: 198, revenue: 98000 },
  { date: '07/04', orders: 176, revenue: 86000 },
  { date: '08/04', orders: 210, revenue: 105000 },
  { date: '09/04', orders: 245, revenue: 128000 },
  { date: '10/04', orders: 232, revenue: 118000 },
  { date: '11/04', orders: 267, revenue: 142000 },
  { date: '12/04', orders: 289, revenue: 156000 },
  { date: '13/04', orders: 254, revenue: 131000 },
  { date: '14/04', orders: 278, revenue: 148000 },
];

const statusData = [
  { name: 'ติดจอง', value: 1842, color: COLORS.warn },
  { name: 'เช่าอยู่', value: 2156, color: COLORS.info },
  { name: 'สำเร็จ', value: 8921, color: COLORS.success },
  { name: 'เกินเวลา', value: 412, color: COLORS.danger },
  { name: 'ยกเลิก', value: 689, color: COLORS.inkMute },
];

const deliveryData = [
  { name: 'ไปรษณีย์ไทย', value: 5420 },
  { name: 'Lineman', value: 3890 },
  { name: 'นัดรับ', value: 2140 },
  { name: 'Messenger', value: 1230 },
  { name: 'อื่น ๆ', value: 340 },
];

const depositData = [
  { name: 'มีมัดจำ', value: 8920, color: COLORS.primary },
  { name: 'ไม่มีมัดจำ', value: 5100, color: COLORS.primaryBorder },
];

const shops = [
  {
    id: 'SH-0042',
    name: 'Lala Rental Studio',
    orders: 487,
    gmv: 248000,
    overdue: 2.1,
    active: true,
    risk: 'low',
  },
  {
    id: 'SH-0018',
    name: 'AVAALENE Official',
    orders: 412,
    gmv: 198000,
    overdue: 8.4,
    active: true,
    risk: 'medium',
  },
  {
    id: 'SH-0091',
    name: 'MITR Collection',
    orders: 356,
    gmv: 167000,
    overdue: 1.8,
    active: true,
    risk: 'low',
  },
  {
    id: 'SH-0007',
    name: 'Dreamy Dress TH',
    orders: 312,
    gmv: 156000,
    overdue: 12.8,
    active: true,
    risk: 'high',
  },
  {
    id: 'SH-0055',
    name: 'Velvet Night',
    orders: 289,
    gmv: 142000,
    overdue: 3.2,
    active: true,
    risk: 'low',
  },
  {
    id: 'SH-0023',
    name: 'Rose Petal Rent',
    orders: 245,
    gmv: 118000,
    overdue: 5.6,
    active: true,
    risk: 'medium',
  },
  {
    id: 'SH-0071',
    name: 'Noir Fashion Hub',
    orders: 198,
    gmv: 96000,
    overdue: 2.4,
    active: true,
    risk: 'low',
  },
  {
    id: 'SH-0103',
    name: 'Sakura Wardrobe',
    orders: 176,
    gmv: 87000,
    overdue: 15.2,
    active: true,
    risk: 'high',
  },
];

const orders = [
  {
    id: 'LI-20260421UD-0001',
    shop: 'Lala Rental Studio',
    shopId: 'SH-0042',
    product: 'new balacnciaga',
    created: '21/04/26',
    rentStart: '21/04/26',
    rentEnd: '23/04/26',
    duration: 3,
    status: 'ติดจอง',
    delivery: 'Lineman',
    fee: 800,
    deposit: 0,
    ship: 0,
    total: 800,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260402UD-0042',
    shop: 'AVAALENE Official',
    shopId: 'SH-0018',
    product: 'ชุดทดสอบเทสไพร',
    created: '02/04/26',
    rentStart: '02/04/26',
    rentEnd: '02/04/26',
    duration: 1,
    status: 'ติดจอง',
    delivery: 'ไปรษณีย์ไทย',
    fee: 900,
    deposit: 500,
    ship: 50,
    total: 1450,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260409UD-0156',
    shop: 'MITR Collection',
    shopId: 'SH-0091',
    product: 'ชุดทดสอบเทสไพร',
    created: '09/04/26',
    rentStart: '09/04/26',
    rentEnd: '09/04/26',
    duration: 1,
    status: 'ติดจอง',
    delivery: 'Lineman',
    fee: 600,
    deposit: 0,
    ship: 0,
    total: 600,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260403UD-0089',
    shop: 'AVAALENE Official',
    shopId: 'SH-0018',
    product: 'AVAALENE – Lala Dakpump Dress',
    created: '03/04/26',
    rentStart: '03/04/26',
    rentEnd: '03/04/26',
    duration: 1,
    status: 'เกินเวลา',
    delivery: 'ไปรษณีย์ไทย',
    fee: 270,
    deposit: 200,
    ship: 50,
    total: 520,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260404UD-0201',
    shop: 'MITR Collection',
    shopId: 'SH-0091',
    product: 'MITR - Graphic T-Shirt',
    created: '04/04/26',
    rentStart: '04/04/26',
    rentEnd: '04/04/26',
    duration: 1,
    status: 'เกินเวลา',
    delivery: 'Lineman',
    fee: 240,
    deposit: 0,
    ship: 0,
    total: 240,
    payment: 'รอชำระ',
  },
  {
    id: 'LI-20260410UD-0334',
    shop: 'Dreamy Dress TH',
    shopId: 'SH-0007',
    product: 'Midnight Gown XL',
    created: '10/04/26',
    rentStart: '12/04/26',
    rentEnd: '14/04/26',
    duration: 3,
    status: 'เช่าอยู่',
    delivery: 'Messenger',
    fee: 1200,
    deposit: 800,
    ship: 120,
    total: 2120,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260411UD-0412',
    shop: 'Velvet Night',
    shopId: 'SH-0055',
    product: 'Crimson Lace Dress',
    created: '11/04/26',
    rentStart: '13/04/26',
    rentEnd: '15/04/26',
    duration: 3,
    status: 'สำเร็จ',
    delivery: 'ไปรษณีย์ไทย',
    fee: 950,
    deposit: 500,
    ship: 50,
    total: 1500,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260412UD-0488',
    shop: 'Rose Petal Rent',
    shopId: 'SH-0023',
    product: 'Vintage Lace Set',
    created: '12/04/26',
    rentStart: '14/04/26',
    rentEnd: '16/04/26',
    duration: 3,
    status: 'ติดจอง',
    delivery: 'นัดรับ',
    fee: 680,
    deposit: 300,
    ship: 0,
    total: 980,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260413UD-0521',
    shop: 'Noir Fashion Hub',
    shopId: 'SH-0071',
    product: 'Black Tie Tuxedo',
    created: '13/04/26',
    rentStart: '15/04/26',
    rentEnd: '16/04/26',
    duration: 2,
    status: 'สำเร็จ',
    delivery: 'Lineman',
    fee: 1500,
    deposit: 1000,
    ship: 80,
    total: 2580,
    payment: 'จ่ายแล้ว',
  },
  {
    id: 'LI-20260414UD-0602',
    shop: 'Sakura Wardrobe',
    shopId: 'SH-0103',
    product: 'Cherry Blossom Yukata',
    created: '14/04/26',
    rentStart: '16/04/26',
    rentEnd: '18/04/26',
    duration: 3,
    status: 'ยกเลิก',
    delivery: 'ไปรษณีย์ไทย',
    fee: 750,
    deposit: 0,
    ship: 0,
    total: 0,
    payment: 'คืนเงิน',
  },
];

// Category Lv1
const categoryLv1Data = [
  { name: 'เสื้อผ้า', value: 4820, color: '#E91E63' },
  { name: 'กระเป๋า', value: 2410, color: '#8B5CF6' },
  { name: 'รองเท้าผู้หญิง', value: 2180, color: '#F59E0B' },
  { name: 'เครื่องประดับ', value: 1760, color: '#3B82F6' },
  { name: 'กล้อง', value: 1540, color: '#10B981' },
  { name: 'อุปกรณ์คอสเพลย์ & พร็อพ', value: 1310, color: '#8A8A9C' },
];

// Category Lv2 (subcategories)
const categoryLv2Data = [
  {
    lv1: 'ชุดราตรี',
    lv2: 'ราตรียาว (Evening Gown)',
    orders: 2140,
    gmv: 1284000,
    share: 15.3,
  },
  {
    lv1: 'ชุดราตรี',
    lv2: 'ราตรีสั้น (Cocktail)',
    orders: 1680,
    gmv: 672000,
    share: 12.0,
  },
  {
    lv1: 'ชุดราตรี',
    lv2: 'คัตเอาท์ (Cut-out)',
    orders: 620,
    gmv: 248000,
    share: 4.4,
  },
  { lv1: 'ชุดราตรี', lv2: 'ทรงเมอร์เมด', orders: 380, gmv: 190000, share: 2.7 },
  { lv1: 'ชุดเจ้าสาว', lv2: 'Ballgown', orders: 980, gmv: 882000, share: 7.0 },
  { lv1: 'ชุดเจ้าสาว', lv2: 'A-line', orders: 820, gmv: 615000, share: 5.8 },
  { lv1: 'ชุดเจ้าสาว', lv2: 'Mermaid', orders: 610, gmv: 488000, share: 4.3 },
  { lv1: 'ชุดไทย', lv2: 'ชุดไทยจักรี', orders: 890, gmv: 534000, share: 6.3 },
  {
    lv1: 'ชุดไทย',
    lv2: 'ชุดไทยจักรพรรดิ',
    orders: 720,
    gmv: 432000,
    share: 5.1,
  },
  {
    lv1: 'ชุดไทย',
    lv2: 'ชุดไทยบรมพิมาน',
    orders: 570,
    gmv: 342000,
    share: 4.1,
  },
  {
    lv1: 'สูท/ทักซิโด้',
    lv2: 'สูทเจ้าบ่าว',
    orders: 980,
    gmv: 588000,
    share: 7.0,
  },
  {
    lv1: 'สูท/ทักซิโด้',
    lv2: 'ทักซิโด้',
    orders: 480,
    gmv: 288000,
    share: 3.4,
  },
  {
    lv1: 'สูท/ทักซิโด้',
    lv2: 'สูทธุรกิจ',
    orders: 300,
    gmv: 120000,
    share: 2.1,
  },
];

// Delivery channel breakdown (3 mega categories)
const deliveryChannelData = [
  {
    name: 'พัสดุ (ขนส่ง)',
    value: 9310,
    pct: 66.4,
    color: '#E91E63',
    detail: 'ไปรษณีย์ไทย, Kerry, Flash, J&T',
  },
  {
    name: 'Messenger / ส่งถึงที่',
    value: 3870,
    pct: 27.6,
    color: '#8B5CF6',
    detail: 'Lineman, Grab, Robinhood',
  },
  {
    name: 'รับหน้าร้าน',
    value: 840,
    pct: 6.0,
    color: '#F59E0B',
    detail: 'นัดรับที่ร้าน',
  },
];

// Heatmap: 7 days × 24 hours, value = orders
const heatmapData = (() => {
  const days = [
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัส',
    'ศุกร์',
    'เสาร์',
    'อาทิตย์',
  ];
  // Pattern: peak Fri-Sun evenings 7-10pm, secondary peak Thu 8-10pm, lunchtime small peak
  const result = [];
  days.forEach((day, di) => {
    for (let h = 0; h < 24; h++) {
      let base = 2;
      // Night sleep
      if (h >= 0 && h < 7) base = Math.random() * 2;
      // Morning
      else if (h >= 7 && h < 11) base = 8 + Math.random() * 6;
      // Lunch
      else if (h >= 11 && h < 14) base = 18 + Math.random() * 8;
      // Afternoon
      else if (h >= 14 && h < 18) base = 14 + Math.random() * 6;
      // Evening peak
      else if (h >= 18 && h < 23) base = 28 + Math.random() * 14;
      // Late
      else base = 10 + Math.random() * 5;

      // Weekend boost (Fri evening, Sat, Sun)
      if (di === 4 && h >= 18) base *= 1.4; // Friday evening
      if (di === 5) base *= 1.35; // Saturday
      if (di === 6 && h < 20) base *= 1.25; // Sunday

      // Monday blues dip
      if (di === 0 && h < 12) base *= 0.75;

      result.push({ day, dayIndex: di, hour: h, value: Math.round(base) });
    }
  });
  return result;
})();

// Thailand province data (choropleth)
const provinceData = [
  { code: 'BKK', name: 'กรุงเทพฯ', orders: 4820, region: 'central' },
  { code: 'NTB', name: 'นนทบุรี', orders: 820, region: 'central' },
  { code: 'PTE', name: 'ปทุมธานี', orders: 760, region: 'central' },
  { code: 'SPK', name: 'สมุทรปราการ', orders: 690, region: 'central' },
  { code: 'SKN', name: 'สมุทรสาคร', orders: 280, region: 'central' },
  { code: 'NPT', name: 'นครปฐม', orders: 340, region: 'central' },
  { code: 'AYA', name: 'พระนครศรีอยุธยา', orders: 310, region: 'central' },
  { code: 'CBI', name: 'ชลบุรี', orders: 720, region: 'east' },
  { code: 'RYG', name: 'ระยอง', orders: 380, region: 'east' },
  { code: 'CTI', name: 'จันทบุรี', orders: 180, region: 'east' },
  { code: 'CMI', name: 'เชียงใหม่', orders: 620, region: 'north' },
  { code: 'CRI', name: 'เชียงราย', orders: 240, region: 'north' },
  { code: 'LPG', name: 'ลำปาง', orders: 150, region: 'north' },
  { code: 'PLK', name: 'พิษณุโลก', orders: 220, region: 'north' },
  { code: 'KKN', name: 'ขอนแก่น', orders: 480, region: 'northeast' },
  { code: 'NMA', name: 'นครราชสีมา', orders: 520, region: 'northeast' },
  { code: 'UDN', name: 'อุดรธานี', orders: 310, region: 'northeast' },
  { code: 'UBN', name: 'อุบลราชธานี', orders: 290, region: 'northeast' },
  { code: 'BKN', name: 'บุรีรัมย์', orders: 180, region: 'northeast' },
  { code: 'SRN', name: 'สุรินทร์', orders: 140, region: 'northeast' },
  { code: 'HKT', name: 'ภูเก็ต', orders: 420, region: 'south' },
  { code: 'SKA', name: 'สงขลา', orders: 310, region: 'south' },
  { code: 'SRT', name: 'สุราษฎร์ธานี', orders: 280, region: 'south' },
  { code: 'NRT', name: 'นครศรีธรรมราช', orders: 220, region: 'south' },
  { code: 'KBI', name: 'กระบี่', orders: 160, region: 'south' },
];

const shopTrendData = [
  { date: '01/04', orders: 12, revenue: 5800 },
  { date: '02/04', orders: 15, revenue: 7200 },
  { date: '03/04', orders: 18, revenue: 8900 },
  { date: '04/04', orders: 14, revenue: 6700 },
  { date: '05/04', orders: 21, revenue: 10500 },
  { date: '06/04', orders: 19, revenue: 9400 },
  { date: '07/04', orders: 23, revenue: 11800 },
  { date: '08/04', orders: 17, revenue: 8300 },
  { date: '09/04', orders: 25, revenue: 13200 },
  { date: '10/04', orders: 28, revenue: 14700 },
  { date: '11/04', orders: 22, revenue: 10800 },
  { date: '12/04', orders: 31, revenue: 16500 },
  { date: '13/04', orders: 27, revenue: 13900 },
  { date: '14/04', orders: 29, revenue: 15200 },
];

// ============ HELPERS ============
const formatBaht = (n) => `฿${n.toLocaleString('th-TH')}`;
const formatNum = (n) => n.toLocaleString('th-TH');

const statusStyle = (status) => {
  const map = {
    ติดจอง: { bg: COLORS.warnBg, color: '#92400E', dot: COLORS.warn },
    เช่าอยู่: { bg: COLORS.infoBg, color: '#1E40AF', dot: COLORS.info },
    สำเร็จ: { bg: COLORS.successBg, color: '#065F46', dot: COLORS.success },
    เกินเวลา: { bg: COLORS.dangerBg, color: '#991B1B', dot: COLORS.danger },
    ยกเลิก: { bg: '#F3F4F6', color: '#4B5563', dot: COLORS.inkMute },
    รอส่งกลับ: { bg: COLORS.violetBg, color: '#5B21B6', dot: COLORS.violet },
    คลีนนิ่ง: { bg: '#E0F2FE', color: '#075985', dot: '#0EA5E9' },
  };
  return map[status] || map['ยกเลิก'];
};

const riskStyle = (risk) => {
  const map = {
    low: { bg: COLORS.successBg, color: '#065F46', label: 'ปกติ' },
    medium: { bg: COLORS.warnBg, color: '#92400E', label: 'ควรจับตา' },
    high: { bg: COLORS.dangerBg, color: '#991B1B', label: 'มีความเสี่ยง' },
  };
  return map[risk];
};

// ============ SHARED COMPONENTS ============
const StatusPill = ({ status }) => {
  const s = statusStyle(status);
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 20,
        fontSize: 12,
        fontWeight: 500,
        background: s.bg,
        color: s.color,
      }}
    >
      <span
        style={{ width: 6, height: 6, borderRadius: 999, background: s.dot }}
      />
      {status}
    </span>
  );
};

const KpiCard = ({ label, value, delta, icon: Icon, accent, suffix }) => (
  <div
    style={{
      background: COLORS.white,
      borderRadius: 16,
      padding: 20,
      border: `1px solid ${COLORS.line}`,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      transition: 'all 0.2s',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: accent?.bg || COLORS.primaryLight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon
          size={18}
          color={accent?.color || COLORS.primary}
          strokeWidth={2}
        />
      </div>
      {delta !== undefined && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 3,
            fontSize: 12,
            fontWeight: 600,
            color: delta >= 0 ? COLORS.success : COLORS.danger,
          }}
        >
          {delta >= 0 ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {Math.abs(delta)}%
        </span>
      )}
    </div>
    <div>
      <div style={{ fontSize: 13, color: COLORS.inkMute, marginBottom: 6 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: COLORS.ink,
          letterSpacing: '-0.02em',
          fontFamily: '"IBM Plex Sans Thai", sans-serif',
        }}
      >
        {value}
        {suffix && (
          <span
            style={{
              fontSize: 14,
              color: COLORS.inkMute,
              fontWeight: 500,
              marginLeft: 4,
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  </div>
);

const Section = ({ title, subtitle, action, children }) => (
  <div
    style={{
      background: COLORS.white,
      borderRadius: 16,
      padding: 24,
      border: `1px solid ${COLORS.line}`,
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: COLORS.ink,
            marginBottom: 2,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: COLORS.inkMute }}>{subtitle}</div>
        )}
      </div>
      {action}
    </div>
    {children}
  </div>
);

const ReadOnlyBadge = () => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      padding: '3px 9px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 500,
      background: COLORS.lineSoft,
      color: COLORS.inkSoft,
      border: `1px solid ${COLORS.line}`,
    }}
  >
    <ShieldCheck size={11} />
    Read-only
  </span>
);

// ============ HEATMAP GRID ============
const HeatmapGrid = ({ data }) => {
  const days = [
    'จันทร์',
    'อังคาร',
    'พุธ',
    'พฤหัส',
    'ศุกร์',
    'เสาร์',
    'อาทิตย์',
  ];
  const max = Math.max(...data.map((d) => d.value));
  const [hover, setHover] = useState(null);

  // Find peak
  const peak = data.reduce((a, b) => (b.value > a.value ? b : a), data[0]);

  return (
    <div>
      {/* Stats row */}
      <div
        style={{
          display: 'flex',
          gap: 24,
          marginBottom: 16,
          paddingBottom: 14,
          borderBottom: `1px solid ${COLORS.lineSoft}`,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 10.5,
              color: COLORS.inkMute,
              fontWeight: 500,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              marginBottom: 3,
            }}
          >
            Peak Time
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.primary }}>
            {peak.day} · {String(peak.hour).padStart(2, '0')}:00 น.
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 10.5,
              color: COLORS.inkMute,
              fontWeight: 500,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              marginBottom: 3,
            }}
          >
            ออเดอร์สูงสุด
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>
            {peak.value} orders/hr
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: 10.5,
              color: COLORS.inkMute,
              fontWeight: 500,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
              marginBottom: 3,
            }}
          >
            Pattern
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.ink }}>
            ศุกร์–อาทิตย์ 19:00–22:00
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <div style={{ display: 'inline-block', minWidth: '100%' }}>
          {/* Hour labels */}
          <div style={{ display: 'flex', marginLeft: 72, marginBottom: 4 }}>
            {Array.from({ length: 24 }, (_, h) => (
              <div
                key={h}
                style={{
                  width: 24,
                  textAlign: 'center',
                  fontSize: 10,
                  color: COLORS.inkMute,
                  fontFamily: 'monospace',
                }}
              >
                {h % 3 === 0 ? String(h).padStart(2, '0') : ''}
              </div>
            ))}
          </div>

          {/* Rows */}
          {days.map((day, di) => (
            <div
              key={day}
              style={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}
            >
              <div
                style={{
                  width: 68,
                  fontSize: 11.5,
                  color: COLORS.inkSoft,
                  fontWeight: 500,
                  paddingRight: 4,
                  textAlign: 'right',
                }}
              >
                {day}
              </div>
              {Array.from({ length: 24 }, (_, h) => {
                const cell = data.find(
                  (c) => c.dayIndex === di && c.hour === h
                );
                const intensity = cell ? cell.value / max : 0;
                const isHovered =
                  hover && hover.dayIndex === di && hover.hour === h;
                return (
                  <div
                    key={h}
                    onMouseEnter={() => setHover(cell)}
                    onMouseLeave={() => setHover(null)}
                    style={{
                      width: 22,
                      height: 22,
                      margin: 1,
                      background:
                        intensity < 0.05
                          ? COLORS.lineSoft
                          : `rgba(233, 30, 99, ${0.15 + intensity * 0.85})`,
                      borderRadius: 4,
                      cursor: 'pointer',
                      transition: 'transform 0.15s',
                      transform: isHovered ? 'scale(1.25)' : 'scale(1)',
                      boxShadow: isHovered
                        ? '0 2px 8px rgba(233,30,99,0.35)'
                        : 'none',
                      position: 'relative',
                      zIndex: isHovered ? 10 : 1,
                    }}
                    title={`${day} ${String(h).padStart(2, '0')}:00 · ${
                      cell?.value
                    } orders`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip info */}
      <div
        style={{
          marginTop: 12,
          fontSize: 12,
          color: COLORS.inkMute,
          minHeight: 18,
        }}
      >
        {hover ? (
          <span>
            <span style={{ color: COLORS.ink, fontWeight: 600 }}>
              {hover.day} · {String(hover.hour).padStart(2, '0')}:00–
              {String(hover.hour + 1).padStart(2, '0')}:00
            </span>
            <span style={{ margin: '0 8px', color: COLORS.inkMute }}>·</span>
            <span style={{ color: COLORS.primary, fontWeight: 600 }}>
              {hover.value} ออเดอร์/ชม.
            </span>
          </span>
        ) : (
          <span style={{ fontStyle: 'italic' }}>
            ชี้ที่ cell เพื่อดูรายละเอียด
          </span>
        )}
      </div>
    </div>
  );
};

// ============ THAILAND MAP (Choropleth) ============
const ThailandMap = ({ data }) => {
  const [hover, setHover] = useState(null);
  const max = Math.max(...data.map((d) => d.orders));

  const getColor = (orders) => {
    const intensity = Math.sqrt(orders / max); // sqrt for better visual distribution
    return `rgba(233, 30, 99, ${0.15 + intensity * 0.85})`;
  };

  // Simplified Thailand regions as SVG paths (stylized - not geo-accurate but recognizable)
  // Using simplified shapes per province, grouped by region
  const provincePaths = {
    // Each province: approximate position + simple polygon shape
    BKK: 'M 220,360 L 240,355 L 245,370 L 235,380 L 218,378 Z',
    NTB: 'M 215,345 L 230,342 L 232,356 L 218,358 Z',
    PTE: 'M 230,335 L 248,333 L 250,348 L 232,350 Z',
    SPK: 'M 240,370 L 260,368 L 262,385 L 242,388 Z',
    SKN: 'M 198,375 L 215,372 L 218,388 L 200,390 Z',
    NPT: 'M 185,355 L 205,350 L 210,370 L 188,372 Z',
    AYA: 'M 215,310 L 240,305 L 245,325 L 220,330 Z',
    // East
    CBI: 'M 275,380 L 300,375 L 305,400 L 278,405 Z',
    RYG: 'M 300,395 L 325,388 L 330,415 L 302,420 Z',
    CTI: 'M 325,405 L 355,398 L 360,428 L 328,432 Z',
    // North
    CMI: 'M 160,145 L 195,140 L 200,180 L 163,185 Z',
    CRI: 'M 175,95 L 215,90 L 220,130 L 180,135 Z',
    LPG: 'M 200,175 L 225,170 L 230,200 L 203,205 Z',
    PLK: 'M 215,220 L 245,215 L 250,248 L 218,253 Z',
    // Northeast
    KKN: 'M 280,240 L 315,235 L 320,270 L 283,275 Z',
    NMA: 'M 275,280 L 315,275 L 320,315 L 278,320 Z',
    UDN: 'M 285,195 L 320,190 L 325,225 L 288,230 Z',
    UBN: 'M 345,270 L 380,265 L 385,300 L 348,305 Z',
    BKN: 'M 305,310 L 335,305 L 340,335 L 308,340 Z',
    SRN: 'M 325,335 L 355,330 L 360,360 L 328,365 Z',
    // South
    HKT: 'M 155,540 L 175,535 L 180,560 L 158,565 Z',
    SKA: 'M 205,620 L 230,615 L 235,645 L 208,650 Z',
    SRT: 'M 185,490 L 215,485 L 220,520 L 188,525 Z',
    NRT: 'M 200,540 L 230,535 L 235,570 L 203,575 Z',
    KBI: 'M 170,575 L 195,570 L 200,600 L 173,605 Z',
  };

  const regionGroups = {
    central: data.filter((d) => d.region === 'central'),
    east: data.filter((d) => d.region === 'east'),
    north: data.filter((d) => d.region === 'north'),
    northeast: data.filter((d) => d.region === 'northeast'),
    south: data.filter((d) => d.region === 'south'),
  };

  const total = data.reduce((s, d) => s + d.orders, 0);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 24 }}>
      {/* Map */}
      <div style={{ position: 'relative' }}>
        <svg
          viewBox="100 60 320 620"
          style={{ width: '100%', height: 'auto', maxHeight: 520 }}
        >
          {/* Country silhouette backdrop */}
          <path
            d="M 160,90 Q 150,140 165,200 Q 175,250 220,290 Q 240,310 260,310 L 290,310 Q 320,310 350,320 L 400,330 Q 400,360 380,380 L 340,420 Q 310,440 290,440 L 270,440 Q 260,440 250,430 L 230,410 Q 220,400 210,410 Q 195,430 180,460 Q 165,500 170,550 Q 180,610 220,660 L 240,680 L 210,680 Q 180,670 165,640 Q 140,590 145,530 Q 150,470 175,430 Q 195,390 200,360 L 205,330 Q 200,310 185,300 Q 155,270 140,220 Q 130,160 145,110 Z"
            fill={COLORS.lineSoft}
            stroke={COLORS.line}
            strokeWidth="1"
          />

          {/* Province polygons */}
          {data.map((province) => {
            const path = provincePaths[province.code];
            if (!path) return null;
            const isHovered = hover?.code === province.code;
            return (
              <path
                key={province.code}
                d={path}
                fill={getColor(province.orders)}
                stroke={isHovered ? COLORS.primaryDark : COLORS.white}
                strokeWidth={isHovered ? 2 : 1}
                style={{ cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={() => setHover(province)}
                onMouseLeave={() => setHover(null)}
              />
            );
          })}

          {/* BKK marker */}
          <circle
            cx="228"
            cy="367"
            r="4"
            fill={COLORS.primaryDark}
            stroke="white"
            strokeWidth="1.5"
          />
          <text
            x="238"
            y="371"
            fontSize="10"
            fill={COLORS.ink}
            fontWeight="600"
          >
            BKK
          </text>
        </svg>

        {hover && (
          <div
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              background: COLORS.white,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 10,
              padding: '10px 14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              minWidth: 150,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.ink }}>
              {hover.name}
            </div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: COLORS.primary,
                fontFamily: 'monospace',
                marginTop: 2,
              }}
            >
              {formatNum(hover.orders)}
            </div>
            <div style={{ fontSize: 11, color: COLORS.inkMute }}>
              {((hover.orders / total) * 100).toFixed(1)}% ของยอดรวม
            </div>
          </div>
        )}
      </div>

      {/* Top provinces ranking */}
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: COLORS.inkSoft,
            marginBottom: 12,
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          Top จังหวัด
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            maxHeight: 440,
            overflowY: 'auto',
          }}
        >
          {[...data]
            .sort((a, b) => b.orders - a.orders)
            .map((p, i) => {
              const pct = (p.orders / total) * 100;
              const isHovered = hover?.code === p.code;
              return (
                <div
                  key={p.code}
                  onMouseEnter={() => setHover(p)}
                  onMouseLeave={() => setHover(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '6px 10px',
                    borderRadius: 8,
                    background: isHovered ? COLORS.primaryLight : 'transparent',
                    transition: 'background 0.15s',
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10.5,
                      color: COLORS.inkMute,
                      fontFamily: 'monospace',
                      width: 18,
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: getColor(p.orders),
                      flexShrink: 0,
                      border: `1px solid ${COLORS.line}`,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12.5,
                      color: COLORS.ink,
                      fontWeight: isHovered ? 600 : 500,
                      flex: 1,
                    }}
                  >
                    {p.name}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      background: COLORS.lineSoft,
                      borderRadius: 2,
                      overflow: 'hidden',
                      maxWidth: 70,
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${Math.min(pct * 3, 100)}%`,
                        background: COLORS.primary,
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: 'monospace',
                      color: COLORS.ink,
                      fontWeight: 600,
                      minWidth: 50,
                      textAlign: 'right',
                    }}
                  >
                    {formatNum(p.orders)}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Region summary */}
        <div
          style={{
            marginTop: 16,
            paddingTop: 14,
            borderTop: `1px solid ${COLORS.lineSoft}`,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.inkSoft,
              marginBottom: 10,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            ตามภูมิภาค
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { key: 'central', label: 'ภาคกลาง (รวม กทม.)' },
              { key: 'east', label: 'ภาคตะวันออก' },
              { key: 'north', label: 'ภาคเหนือ' },
              { key: 'northeast', label: 'ภาคอีสาน' },
              { key: 'south', label: 'ภาคใต้' },
            ].map((r) => {
              const sum = regionGroups[r.key].reduce((s, d) => s + d.orders, 0);
              const pct = (sum / total) * 100;
              return (
                <div
                  key={r.key}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 12,
                  }}
                >
                  <span style={{ color: COLORS.inkSoft }}>{r.label}</span>
                  <span
                    style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}
                  >
                    <span style={{ fontSize: 11, color: COLORS.inkMute }}>
                      {pct.toFixed(1)}%
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        color: COLORS.ink,
                        fontFamily: 'monospace',
                        minWidth: 50,
                        textAlign: 'right',
                      }}
                    >
                      {formatNum(sum)}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ SIDEBAR ============
const Sidebar = ({ current, onNavigate }) => {
  const items = [
    { key: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
    { key: 'orders', label: 'Orders Analytics', icon: Package },
    { key: 'shops', label: 'Shop Analytics', icon: Store },
  ];

  return (
    <aside
      style={{
        width: 240,
        background: COLORS.white,
        borderRight: `1px solid ${COLORS.line}`,
        padding: '20px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <div
        style={{
          padding: '8px 10px 20px 10px',
          borderBottom: `1px solid ${COLORS.line}`,
          marginBottom: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: `linear-gradient(135deg, ${COLORS.primary}, #FF6B9D)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            U
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: COLORS.ink,
                letterSpacing: '-0.01em',
              }}
            >
              UpDress
            </div>
            <div
              style={{ fontSize: 10.5, color: COLORS.inkMute, fontWeight: 500 }}
            >
              Admin Observatory
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: '2px 10px 6px 10px',
          fontSize: 10.5,
          color: COLORS.inkMute,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Monitoring
      </div>

      {items.map((item) => {
        const active =
          current === item.key ||
          (current === 'shopDetail' && item.key === 'shops') ||
          (current === 'orderDetail' && item.key === 'orders');
        return (
          <button
            key={item.key}
            onClick={() => onNavigate(item.key)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 9,
              cursor: 'pointer',
              background: active ? COLORS.primaryLight : 'transparent',
              color: active ? COLORS.primary : COLORS.inkSoft,
              border: 'none',
              textAlign: 'left',
              width: '100%',
              fontSize: 13.5,
              fontWeight: active ? 600 : 500,
              transition: 'all 0.15s',
            }}
          >
            <item.icon size={17} strokeWidth={active ? 2.2 : 1.8} />
            {item.label}
          </button>
        );
      })}

      <div
        style={{
          marginTop: 'auto',
          padding: 12,
          background: COLORS.lineSoft,
          borderRadius: 10,
          fontSize: 11.5,
          color: COLORS.inkSoft,
          lineHeight: 1.5,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 4,
            fontWeight: 600,
            color: COLORS.ink,
          }}
        >
          <ShieldCheck size={13} color={COLORS.primary} />
          Read-only Access
        </div>
        ระบบนี้ใช้สำหรับวิเคราะห์เท่านั้น ไม่สามารถแก้ไขข้อมูลได้
      </div>
    </aside>
  );
};

// ============ PAGE 1: SYSTEM OVERVIEW ============
const SystemOverview = () => {
  const [range, setRange] = useState('30d');

  return (
    <div
      style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.inkMute }}>Admin</span>
            <ChevronRight size={13} color={COLORS.inkMute} />
            <span style={{ fontSize: 12, color: COLORS.ink, fontWeight: 500 }}>
              System Overview
            </span>
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.ink,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            ภาพรวมระบบ
          </h1>
          <div style={{ fontSize: 13, color: COLORS.inkMute, marginTop: 4 }}>
            Monitor performance ของทุกร้านใน UpDress SaaS
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <ReadOnlyBadge />
          <div
            style={{
              display: 'flex',
              background: COLORS.white,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 10,
              padding: 3,
            }}
          >
            {['7d', '30d', '90d', '12m'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                style={{
                  padding: '6px 14px',
                  fontSize: 12.5,
                  fontWeight: 500,
                  background: range === r ? COLORS.primaryLight : 'transparent',
                  color: range === r ? COLORS.primary : COLORS.inkMute,
                  border: 'none',
                  borderRadius: 7,
                  cursor: 'pointer',
                }}
              >
                {r === '12m' ? '12 เดือน' : r.replace('d', ' วัน')}
              </button>
            ))}
          </div>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: COLORS.white,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 10,
              fontSize: 12.5,
              color: COLORS.inkSoft,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <Calendar size={14} />1 - 30 เม.ย. 26
          </button>
        </div>
      </div>

      {/* KPI Row 1 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}
      >
        <KpiCard
          label="ร้านค้าทั้งหมด"
          value={formatNum(1247)}
          delta={3.2}
          icon={Store}
        />
        <KpiCard
          label="ร้าน Active (30 วัน)"
          value={formatNum(892)}
          delta={5.8}
          icon={Activity}
          accent={{ bg: COLORS.successBg, color: COLORS.success }}
        />
        <KpiCard
          label="ออเดอร์รวม"
          value={formatNum(14020)}
          delta={12.4}
          icon={ShoppingBag}
          accent={{ bg: COLORS.infoBg, color: COLORS.info }}
        />
        <KpiCard
          label="มูลค่ารวม (GMV)"
          value="฿6.84M"
          delta={8.9}
          icon={Wallet}
          accent={{ bg: COLORS.violetBg, color: COLORS.violet }}
        />
      </div>

      {/* KPI Row 2 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}
      >
        <KpiCard
          label="ออเดอร์เฉลี่ย/วัน"
          value="467"
          delta={6.1}
          icon={TrendingUp}
        />
        <KpiCard
          label="รายได้เฉลี่ย/วัน"
          value="฿228K"
          delta={4.3}
          icon={TrendingUp}
          accent={{ bg: COLORS.successBg, color: COLORS.success }}
        />
        <KpiCard
          label="สินค้าที่กำลังเปิดเช่า"
          value={formatNum(3421)}
          icon={Package}
          accent={{ bg: COLORS.infoBg, color: COLORS.info }}
        />
        <KpiCard
          label="% ออเดอร์เกินเวลา"
          value="2.94"
          suffix="%"
          delta={-0.6}
          icon={AlertTriangle}
          accent={{ bg: COLORS.warnBg, color: COLORS.warn }}
        />
      </div>

      {/* KPI Row 3: Operational / Behavioral Metrics */}
      <div>
        <div
          style={{
            fontSize: 11,
            color: COLORS.inkMute,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 10,
            paddingLeft: 2,
          }}
        >
          พฤติกรรมการเช่า
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 14,
          }}
        >
          <KpiCard
            label="ระยะเวลาเช่าเฉลี่ย"
            value="2.4"
            suffix="วัน"
            delta={1.2}
            icon={CalendarDays}
            accent={{ bg: COLORS.infoBg, color: COLORS.info }}
          />
          <KpiCard
            label="เปิดออเดอร์เผื่อหน้าเฉลี่ย"
            value="1.8"
            suffix="วัน"
            icon={Clock}
            accent={{ bg: COLORS.primaryLight, color: COLORS.primary }}
          />
          <KpiCard
            label="เปิดออเดอร์เผื่อหลังเฉลี่ย"
            value="0.9"
            suffix="วัน"
            icon={Clock}
            accent={{ bg: COLORS.primaryLight, color: COLORS.primary }}
          />
          <KpiCard
            label="ระยะเวลาสร้างออเดอร์จนกดสำเร็จ/ยกเลิกเฉลี่ย"
            value="4.6"
            suffix="วัน"
            delta={-2.3}
            icon={Timer}
            accent={{ bg: COLORS.violetBg, color: COLORS.violet }}
          />
          <KpiCard
            label="จำนวนชิ้นที่เช่าเฉลี่ยแต่ละออเดอร์"
            value="1.7"
            suffix="ชิ้น"
            delta={3.5}
            icon={Boxes}
            accent={{ bg: COLORS.successBg, color: COLORS.success }}
          />
        </div>
      </div>

      {/* Trend chart */}
      <Section
        title="Trend: ออเดอร์ & รายได้ต่อวัน"
        subtitle="แสดงข้อมูล 14 วันล่าสุด"
        action={
          <div
            style={{
              display: 'flex',
              gap: 16,
              alignItems: 'center',
              fontSize: 12,
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: COLORS.inkSoft,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 2,
                  background: COLORS.primary,
                  borderRadius: 2,
                }}
              />
              ออเดอร์
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                color: COLORS.inkSoft,
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 2,
                  background: COLORS.violet,
                  borderRadius: 2,
                }}
              />
              รายได้ (฿)
            </span>
          </div>
        }
      >
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={trendData}
              margin={{ top: 8, right: 20, bottom: 0, left: 0 }}
            >
              <defs>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={COLORS.primary}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="100%"
                    stopColor={COLORS.primary}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={COLORS.line}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: COLORS.inkMute, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="l"
                tick={{ fill: COLORS.inkMute, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="r"
                orientation="right"
                tick={{ fill: COLORS.inkMute, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 10,
                  fontSize: 12,
                }}
                formatter={(v, n) => [
                  n === 'revenue' ? formatBaht(v) : formatNum(v),
                  n === 'orders' ? 'ออเดอร์' : 'รายได้',
                ]}
              />
              <Line
                yAxisId="l"
                type="monotone"
                dataKey="orders"
                stroke={COLORS.primary}
                strokeWidth={2.5}
                dot={{ r: 3, fill: COLORS.primary }}
                activeDot={{ r: 5 }}
              />
              <Line
                yAxisId="r"
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.violet}
                strokeWidth={2.5}
                dot={{ r: 3, fill: COLORS.violet }}
                activeDot={{ r: 5 }}
                strokeDasharray="5 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* Distribution row */}
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}
      >
        <Section title="Status Distribution" subtitle="สถานะออเดอร์ทั้งหมด">
          <div
            style={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((e, i) => (
                    <Cell key={i} fill={e.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  formatter={(v) => formatNum(v)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              marginTop: 4,
            }}
          >
            {statusData.map((s) => (
              <div
                key={s.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: COLORS.inkSoft,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: s.color,
                    }}
                  />
                  {s.name}
                </span>
                <span style={{ fontWeight: 600, color: COLORS.ink }}>
                  {formatNum(s.value)}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="ช่องทางจัดส่ง" subtitle="Distribution by delivery type">
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={deliveryData}
                layout="vertical"
                margin={{ left: 10, right: 10 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={COLORS.line}
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fill: COLORS.inkMute, fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fill: COLORS.inkSoft, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  contentStyle={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  formatter={(v) => formatNum(v)}
                />
                <Bar
                  dataKey="value"
                  fill={COLORS.primary}
                  radius={[0, 6, 6, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        <Section title="การใช้มัดจำ" subtitle="฿4.2M มูลค่ามัดจำรวม">
          <div
            style={{
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={depositData}
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {depositData.map((e, i) => (
                    <Cell key={i} fill={e.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                  formatter={(v) => formatNum(v)}
                />
              </PieChart>
            </ResponsiveContainer>
            <div
              style={{
                position: 'absolute',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.ink }}>
                63.6%
              </div>
              <div style={{ fontSize: 11, color: COLORS.inkMute }}>มีมัดจำ</div>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              marginTop: 4,
            }}
          >
            {depositData.map((s) => (
              <div
                key={s.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: COLORS.inkSoft,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: s.color,
                    }}
                  />
                  {s.name}
                </span>
                <span style={{ fontWeight: 600, color: COLORS.ink }}>
                  {formatNum(s.value)}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Category Lv1 + Delivery Channel Mapping */}
      <div
        style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}
      >
        <Section
          title="ประเภทสินค้าที่เปิดออเดอร์ — Lv.1"
          subtitle="สัดส่วนตามหมวดหมู่หลัก"
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '200px 1fr',
              gap: 20,
              alignItems: 'center',
            }}
          >
            <div style={{ height: 200, position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryLv1Data}
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryLv1Data.map((e, i) => (
                      <Cell key={i} fill={e.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: COLORS.white,
                      border: `1px solid ${COLORS.line}`,
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                    formatter={(v) => formatNum(v)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ textAlign: 'center' }}>
                  <div
                    style={{ fontSize: 20, fontWeight: 700, color: COLORS.ink }}
                  >
                    {formatNum(14020)}
                  </div>
                  <div style={{ fontSize: 10, color: COLORS.inkMute }}>
                    ออเดอร์รวม
                  </div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {categoryLv1Data.map((c) => {
                const pct = ((c.value / 14020) * 100).toFixed(1);
                return (
                  <div
                    key={c.name}
                    style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: 12.5,
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          color: COLORS.inkSoft,
                        }}
                      >
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 3,
                            background: c.color,
                          }}
                        />
                        {c.name}
                      </span>
                      <span
                        style={{
                          display: 'flex',
                          gap: 10,
                          alignItems: 'baseline',
                        }}
                      >
                        <span style={{ fontSize: 11, color: COLORS.inkMute }}>
                          {pct}%
                        </span>
                        <span
                          style={{
                            fontWeight: 600,
                            color: COLORS.ink,
                            fontFamily: 'monospace',
                            minWidth: 44,
                            textAlign: 'right',
                          }}
                        >
                          {formatNum(c.value)}
                        </span>
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: COLORS.lineSoft,
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          width: `${pct}%`,
                          background: c.color,
                          borderRadius: 2,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>

        <Section title="สัดส่วนช่องทางจัดส่ง" subtitle="3 ประเภทหลัก">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Stacked bar */}
            <div
              style={{
                height: 36,
                display: 'flex',
                borderRadius: 10,
                overflow: 'hidden',
                border: `1px solid ${COLORS.line}`,
              }}
            >
              {deliveryChannelData.map((c) => (
                <div
                  key={c.name}
                  title={`${c.name} ${c.pct}%`}
                  style={{
                    width: `${c.pct}%`,
                    background: c.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {c.pct >= 10 && `${c.pct}%`}
                </div>
              ))}
            </div>

            {/* Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {deliveryChannelData.map((c) => {
                const icon = c.name.includes('พัสดุ')
                  ? Truck
                  : c.name.includes('Messenger')
                  ? Activity
                  : Store;
                const Icon = icon;
                return (
                  <div
                    key={c.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 12px',
                      borderRadius: 10,
                      background: COLORS.lineSoft,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 8,
                        background: c.color + '22',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={17} color={c.color} strokeWidth={2.2} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: COLORS.ink,
                          }}
                        >
                          {c.name}
                        </span>
                        <span
                          style={{
                            fontSize: 14,
                            fontWeight: 700,
                            color: COLORS.ink,
                            fontFamily: 'monospace',
                          }}
                        >
                          {c.pct}%
                        </span>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'baseline',
                          marginTop: 2,
                        }}
                      >
                        <span style={{ fontSize: 10.5, color: COLORS.inkMute }}>
                          {c.detail}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            color: COLORS.inkMute,
                            fontFamily: 'monospace',
                          }}
                        >
                          {formatNum(c.value)} ออเดอร์
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </div>

      {/* Category Lv2 Table */}
      <Section
        title="ประเภทสินค้า — Lv.2 (รายละเอียดหมวดย่อย)"
        subtitle="แสดง top subcategories พร้อม orders และ GMV"
        action={
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              background: COLORS.white,
              border: `1px solid ${COLORS.line}`,
              borderRadius: 8,
              fontSize: 12,
              color: COLORS.inkSoft,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <Download size={12} /> Export
          </button>
        }
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 12.5,
            }}
          >
            <thead>
              <tr style={{ borderBottom: `1px solid ${COLORS.line}` }}>
                {[
                  'Lv.1',
                  'Lv.2 (Subcategory)',
                  'Orders',
                  'GMV',
                  '% ของระบบ',
                  'Share bar',
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '10px 12px',
                      textAlign:
                        h === 'Orders' || h === 'GMV' || h === '% ของระบบ'
                          ? 'right'
                          : 'left',
                      fontWeight: 600,
                      color: COLORS.inkSoft,
                      fontSize: 11.5,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categoryLv2Data.map((row, i) => {
                const lv1Color =
                  categoryLv1Data.find((c) => c.name === row.lv1)?.color ||
                  COLORS.primary;
                return (
                  <tr
                    key={i}
                    style={{
                      borderBottom:
                        i < categoryLv2Data.length - 1
                          ? `1px solid ${COLORS.lineSoft}`
                          : 'none',
                    }}
                  >
                    <td style={{ padding: '11px 12px' }}>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 12,
                          color: COLORS.inkSoft,
                        }}
                      >
                        <span
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 2,
                            background: lv1Color,
                          }}
                        />
                        {row.lv1}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: '11px 12px',
                        fontWeight: 500,
                        color: COLORS.ink,
                      }}
                    >
                      {row.lv2}
                    </td>
                    <td
                      style={{
                        padding: '11px 12px',
                        textAlign: 'right',
                        fontFamily: 'monospace',
                        color: COLORS.ink,
                      }}
                    >
                      {formatNum(row.orders)}
                    </td>
                    <td
                      style={{
                        padding: '11px 12px',
                        textAlign: 'right',
                        fontFamily: 'monospace',
                        color: COLORS.ink,
                        fontWeight: 600,
                      }}
                    >
                      {formatBaht(row.gmv)}
                    </td>
                    <td
                      style={{
                        padding: '11px 12px',
                        textAlign: 'right',
                        fontFamily: 'monospace',
                        color: COLORS.inkSoft,
                      }}
                    >
                      {row.share}%
                    </td>
                    <td style={{ padding: '11px 12px', width: 160 }}>
                      <div
                        style={{
                          height: 6,
                          background: COLORS.lineSoft,
                          borderRadius: 3,
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            height: '100%',
                            width: `${Math.min(row.share * 5, 100)}%`,
                            background: lv1Color,
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
};

// ============ PAGE 2: ORDERS ANALYTICS ============
const OrdersAnalytics = ({ onOrderClick }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [deliveryFilter, setDeliveryFilter] = useState('all');
  const [shopSizeFilter, setShopSizeFilter] = useState('all');

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      if (
        search &&
        !o.shop.toLowerCase().includes(search.toLowerCase()) &&
        !o.id.toLowerCase().includes(search.toLowerCase()) &&
        !o.product.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;
      if (deliveryFilter !== 'all' && o.delivery !== deliveryFilter)
        return false;
      return true;
    });
  }, [search, statusFilter, deliveryFilter]);

  const totalRevenue = filtered.reduce((s, o) => s + o.total, 0);
  const avgOrder = filtered.length
    ? Math.round(totalRevenue / filtered.length)
    : 0;
  const overdueCount = filtered.filter((o) => o.status === 'เกินเวลา').length;
  const overdueRate = filtered.length
    ? ((overdueCount / filtered.length) * 100).toFixed(1)
    : 0;

  return (
    <div
      style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.inkMute }}>Admin</span>
            <ChevronRight size={13} color={COLORS.inkMute} />
            <span style={{ fontSize: 12, color: COLORS.ink, fontWeight: 500 }}>
              Orders Analytics
            </span>
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.ink,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            ออเดอร์ทั้งหมดในระบบ
          </h1>
          <div style={{ fontSize: 13, color: COLORS.inkMute, marginTop: 4 }}>
            Data-heavy view · รวมทุกร้าน · เรียงตามเวลาล่าสุด
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <ReadOnlyBadge />
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 14px',
              background: COLORS.white,
              border: `1px solid ${COLORS.primaryBorder}`,
              borderRadius: 10,
              fontSize: 12.5,
              color: COLORS.primary,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Aggregate Bar */}
      <div
        style={{
          background: COLORS.white,
          borderRadius: 14,
          padding: '16px 20px',
          border: `1px solid ${COLORS.line}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}
      >
        {[
          {
            label: 'Total orders',
            value: formatNum(filtered.length),
            hint: `จาก ${formatNum(orders.length)} รายการ`,
          },
          {
            label: 'Total revenue',
            value: formatBaht(totalRevenue),
            hint: 'ในผลลัพธ์ปัจจุบัน',
          },
          {
            label: 'Avg order value',
            value: formatBaht(avgOrder),
            hint: 'AOV',
          },
          {
            label: 'Overdue rate',
            value: `${overdueRate}%`,
            hint: `${overdueCount} ออเดอร์`,
            danger: overdueRate > 5,
          },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              padding: '0 20px',
              borderLeft: i > 0 ? `1px solid ${COLORS.line}` : 'none',
            }}
          >
            <div
              style={{
                fontSize: 11.5,
                color: COLORS.inkMute,
                marginBottom: 6,
                fontWeight: 500,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: item.danger ? COLORS.danger : COLORS.ink,
                letterSpacing: '-0.01em',
              }}
            >
              {item.value}
            </div>
            <div style={{ fontSize: 11, color: COLORS.inkMute, marginTop: 3 }}>
              {item.hint}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div
        style={{
          background: COLORS.white,
          borderRadius: 14,
          padding: 14,
          border: `1px solid ${COLORS.line}`,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ position: 'relative', flex: '1 1 280px' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: 12,
              top: 11,
              color: COLORS.inkMute,
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาด้วยชื่อร้าน, Order ID, หรือชื่อสินค้า"
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              border: `1px solid ${COLORS.line}`,
              borderRadius: 9,
              fontSize: 13,
              outline: 'none',
              fontFamily: 'inherit',
              color: COLORS.ink,
            }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '9px 12px',
            border: `1px solid ${COLORS.line}`,
            borderRadius: 9,
            fontSize: 13,
            fontFamily: 'inherit',
            color: COLORS.ink,
            background: COLORS.white,
            cursor: 'pointer',
          }}
        >
          <option value="all">สถานะทั้งหมด</option>
          <option>ติดจอง</option>
          <option>เช่าอยู่</option>
          <option>สำเร็จ</option>
          <option>เกินเวลา</option>
          <option>ยกเลิก</option>
        </select>
        <select
          value={deliveryFilter}
          onChange={(e) => setDeliveryFilter(e.target.value)}
          style={{
            padding: '9px 12px',
            border: `1px solid ${COLORS.line}`,
            borderRadius: 9,
            fontSize: 13,
            fontFamily: 'inherit',
            color: COLORS.ink,
            background: COLORS.white,
            cursor: 'pointer',
          }}
        >
          <option value="all">ขนส่งทั้งหมด</option>
          <option>Lineman</option>
          <option>ไปรษณีย์ไทย</option>
          <option>Messenger</option>
          <option>นัดรับ</option>
        </select>
        <select
          value={shopSizeFilter}
          onChange={(e) => setShopSizeFilter(e.target.value)}
          style={{
            padding: '9px 12px',
            border: `1px solid ${COLORS.line}`,
            borderRadius: 9,
            fontSize: 13,
            fontFamily: 'inherit',
            color: COLORS.ink,
            background: COLORS.white,
            cursor: 'pointer',
          }}
        >
          <option value="all">ขนาดร้านทั้งหมด</option>
          <option value="small"> 1 - 5 ชุดต่อเดือน </option>
          <option value="medium">6 - 15 ชุดต่อเดือน </option>
          <option value="large">16 - 30 ชุดต่อเดือน </option>
          <option value="large">31 - 50 ชุดต่อเดือน </option>
          <option value="large">51 - 100 ชุดต่อเดือน </option>
          <option value="large">101 - 200 ชุดต่อเดือน </option>
          <option value="large">มากกว่า 201 ชุดต่อเดือน </option>
        </select>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '9px 14px',
            background: COLORS.white,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 9,
            fontSize: 13,
            color: COLORS.inkSoft,
            cursor: 'pointer',
          }}
        >
          <Calendar size={14} />
          ช่วงวันที่
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '9px 14px',
            background: COLORS.white,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 9,
            fontSize: 13,
            color: COLORS.inkSoft,
            cursor: 'pointer',
          }}
        >
          <Filter size={14} />
          ตัวกรองเพิ่มเติม
        </button>
      </div>

      {/* Heatmap: วัน × เวลา */}
      <Section
        title="Peak Hour Heatmap"
        subtitle="วันไหน-เวลาใด คนเปิดออเดอร์มากที่สุด (14 วันล่าสุด)"
        action={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              color: COLORS.inkMute,
            }}
          >
            <span>น้อย</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[0.1, 0.3, 0.5, 0.7, 0.9].map((o, i) => (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    background: `rgba(233, 30, 99, ${o})`,
                    borderRadius: 2,
                  }}
                />
              ))}
            </div>
            <span>มาก</span>
          </div>
        }
      >
        <HeatmapGrid data={heatmapData} />
      </Section>

      {/* Thailand Choropleth Map */}
      <Section
        title="ปลายทางออเดอร์ — กระจายตัวรายจังหวัด"
        subtitle="จำนวนออเดอร์ที่จัดส่งไปยังแต่ละจังหวัด (30 วันล่าสุด)"
        action={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              color: COLORS.inkMute,
            }}
          >
            <span>น้อย</span>
            <div style={{ display: 'flex', gap: 0 }}>
              {[0.15, 0.3, 0.5, 0.7, 0.9].map((o, i) => (
                <div
                  key={i}
                  style={{
                    width: 18,
                    height: 10,
                    background: `rgba(233, 30, 99, ${o})`,
                  }}
                />
              ))}
            </div>
            <span>มาก</span>
          </div>
        }
      >
        <ThailandMap data={provinceData} />
      </Section>

      {/* Table */}
      <div
        style={{
          background: COLORS.white,
          borderRadius: 14,
          border: `1px solid ${COLORS.line}`,
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: 12.5,
            }}
          >
            <thead>
              <tr
                style={{
                  background: COLORS.lineSoft,
                  borderBottom: `1px solid ${COLORS.line}`,
                }}
              >
                {[
                  'Shop',
                  'Order ID',
                  'สินค้า',
                  'สร้าง',
                  'ช่วงเช่า',
                  'วัน',
                  'สถานะ',
                  'ขนส่ง',
                  'ค่าเช่า',
                  'มัดจำ',
                  'ค่าส่ง',
                  'รวม',
                  'ชำระ',
                  '',
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '11px 12px',
                      textAlign: 'left',
                      fontWeight: 600,
                      color: COLORS.inkSoft,
                      fontSize: 11.5,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((o, i) => (
                <tr
                  key={o.id}
                  style={{
                    borderBottom:
                      i < filtered.length - 1
                        ? `1px solid ${COLORS.lineSoft}`
                        : 'none',
                    transition: 'background 0.15s',
                    cursor: 'pointer',
                  }}
                  onClick={() => onOrderClick(o)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = COLORS.lineSoft)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  <td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
                    <div
                      style={{
                        fontWeight: 600,
                        color: COLORS.ink,
                        fontSize: 12.5,
                      }}
                    >
                      {o.shop}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: COLORS.inkMute,
                        fontFamily: 'monospace',
                      }}
                    >
                      {o.shopId}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      fontFamily: 'monospace',
                      color: COLORS.inkSoft,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {o.id}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.ink,
                      maxWidth: 180,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {o.product}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.inkSoft,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {o.created}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.inkSoft,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {o.rentStart} – {o.rentEnd}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.ink,
                      textAlign: 'center',
                      fontWeight: 500,
                    }}
                  >
                    {o.duration}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <StatusPill status={o.status} />
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.inkSoft,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {o.delivery}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.ink,
                      textAlign: 'right',
                      fontFamily: 'monospace',
                    }}
                  >
                    {o.fee}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.inkSoft,
                      textAlign: 'right',
                      fontFamily: 'monospace',
                    }}
                  >
                    {o.deposit || '–'}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.inkSoft,
                      textAlign: 'right',
                      fontFamily: 'monospace',
                    }}
                  >
                    {o.ship || '–'}
                  </td>
                  <td
                    style={{
                      padding: '12px',
                      color: COLORS.ink,
                      textAlign: 'right',
                      fontFamily: 'monospace',
                      fontWeight: 600,
                    }}
                  >
                    ฿{o.total}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        fontSize: 11,
                        padding: '3px 8px',
                        borderRadius: 5,
                        background:
                          o.payment === 'จ่ายแล้ว'
                            ? COLORS.successBg
                            : o.payment === 'คืนเงิน'
                            ? COLORS.infoBg
                            : COLORS.warnBg,
                        color:
                          o.payment === 'จ่ายแล้ว'
                            ? '#065F46'
                            : o.payment === 'คืนเงิน'
                            ? '#1E40AF'
                            : '#92400E',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {o.payment}
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Eye size={14} color={COLORS.inkMute} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          style={{
            padding: 14,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${COLORS.line}`,
          }}
        >
          <div style={{ fontSize: 12, color: COLORS.inkMute }}>
            แสดง 1-{filtered.length} จาก {formatNum(14020)} รายการ
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button
              style={{
                padding: '6px 10px',
                border: `1px solid ${COLORS.line}`,
                borderRadius: 7,
                background: COLORS.white,
                fontSize: 12,
                cursor: 'pointer',
                color: COLORS.inkMute,
              }}
            >
              <ChevronLeft size={14} />
            </button>
            {['1', '2', '3', '...', '281'].map((p, i) => (
              <button
                key={i}
                style={{
                  padding: '6px 12px',
                  border: `1px solid ${
                    p === '1' ? COLORS.primary : COLORS.line
                  }`,
                  borderRadius: 7,
                  background: p === '1' ? COLORS.primaryLight : COLORS.white,
                  color: p === '1' ? COLORS.primary : COLORS.inkSoft,
                  fontSize: 12,
                  cursor: 'pointer',
                  fontWeight: p === '1' ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
            <button
              style={{
                padding: '6px 10px',
                border: `1px solid ${COLORS.line}`,
                borderRadius: 7,
                background: COLORS.white,
                fontSize: 12,
                cursor: 'pointer',
                color: COLORS.inkMute,
              }}
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ PAGE 3: SHOP ANALYTICS LIST ============
const ShopAnalytics = ({ onShopClick }) => {
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('all');

  const filtered = shops.filter((s) => {
    if (
      search &&
      !s.name.toLowerCase().includes(search.toLowerCase()) &&
      !s.id.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (riskFilter !== 'all' && s.risk !== riskFilter) return false;
    return true;
  });

  return (
    <div
      style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 12, color: COLORS.inkMute }}>Admin</span>
            <ChevronRight size={13} color={COLORS.inkMute} />
            <span style={{ fontSize: 12, color: COLORS.ink, fontWeight: 500 }}>
              Shop Analytics
            </span>
          </div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: COLORS.ink,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            Performance รายร้าน
          </h1>
          <div style={{ fontSize: 13, color: COLORS.inkMute, marginTop: 4 }}>
            เลือกร้านเพื่อ drill-down ดูรายละเอียด · {formatNum(892)} ร้านที่
            active
          </div>
        </div>
        <ReadOnlyBadge />
      </div>

      {/* Filter */}
      <div
        style={{
          background: COLORS.white,
          borderRadius: 14,
          padding: 14,
          border: `1px solid ${COLORS.line}`,
          display: 'flex',
          gap: 10,
          alignItems: 'center',
        }}
      >
        <div style={{ position: 'relative', flex: 1 }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: 12,
              top: 11,
              color: COLORS.inkMute,
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาร้านค้า..."
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              border: `1px solid ${COLORS.line}`,
              borderRadius: 9,
              fontSize: 13,
              outline: 'none',
              fontFamily: 'inherit',
              color: COLORS.ink,
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            background: COLORS.lineSoft,
            padding: 3,
            borderRadius: 9,
            gap: 2,
          }}
        >
          {[
            { k: 'all', label: 'ทั้งหมด' },
            { k: 'low', label: 'ปกติ' },
            { k: 'medium', label: 'ควรจับตา' },
            { k: 'high', label: 'เสี่ยง' },
          ].map((r) => (
            <button
              key={r.k}
              onClick={() => setRiskFilter(r.k)}
              style={{
                padding: '6px 14px',
                fontSize: 12.5,
                fontWeight: 500,
                background: riskFilter === r.k ? COLORS.white : 'transparent',
                color: riskFilter === r.k ? COLORS.primary : COLORS.inkMute,
                border: 'none',
                borderRadius: 7,
                cursor: 'pointer',
                boxShadow:
                  riskFilter === r.k ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shop Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 14,
        }}
      >
        {filtered.map((shop) => {
          const rs = riskStyle(shop.risk);
          return (
            <div
              key={shop.id}
              onClick={() => onShopClick(shop)}
              style={{
                background: COLORS.white,
                borderRadius: 14,
                padding: 18,
                border: `1px solid ${COLORS.line}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = COLORS.primaryBorder;
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(233,30,99,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = COLORS.line;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: COLORS.ink,
                      marginBottom: 2,
                    }}
                  >
                    {shop.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: COLORS.inkMute,
                      fontFamily: 'monospace',
                    }}
                  >
                    {shop.id}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    padding: '3px 9px',
                    borderRadius: 20,
                    fontWeight: 500,
                    background: rs.bg,
                    color: rs.color,
                  }}
                >
                  {rs.label}
                </span>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: COLORS.inkMute,
                      marginBottom: 2,
                    }}
                  >
                    ออเดอร์
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: COLORS.ink,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {formatNum(shop.orders)}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: COLORS.inkMute,
                      marginBottom: 2,
                    }}
                  >
                    GMV
                  </div>
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 700,
                      color: COLORS.ink,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {formatBaht(shop.gmv)}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: 12,
                  borderTop: `1px solid ${COLORS.lineSoft}`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    fontSize: 12,
                  }}
                >
                  <AlertTriangle
                    size={12}
                    color={shop.overdue > 5 ? COLORS.danger : COLORS.inkMute}
                  />
                  <span
                    style={{
                      color: shop.overdue > 5 ? COLORS.danger : COLORS.inkSoft,
                      fontWeight: 500,
                    }}
                  >
                    Overdue {shop.overdue}%
                  </span>
                </div>
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.primary,
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  ดูรายละเอียด <ChevronRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============ PAGE 3.5: SHOP DETAIL ============
const ShopDetail = ({ shop, onBack }) => {
  const rs = riskStyle(shop.risk);

  return (
    <div
      style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      {/* Header */}
      <div>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12.5,
            color: COLORS.inkMute,
            marginBottom: 10,
            padding: 0,
          }}
        >
          <ChevronLeft size={14} /> กลับไป Shop Analytics
        </button>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 4,
              }}
            >
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: COLORS.ink,
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {shop.name}
              </h1>
              <span
                style={{
                  fontSize: 11.5,
                  padding: '4px 10px',
                  borderRadius: 20,
                  fontWeight: 500,
                  background: rs.bg,
                  color: rs.color,
                }}
              >
                {rs.label}
              </span>
            </div>
            <div
              style={{
                fontSize: 13,
                color: COLORS.inkMute,
                fontFamily: 'monospace',
              }}
            >
              {shop.id} · Active shop · เข้าร่วมเมื่อ 15 ก.ย. 25
            </div>
          </div>
          <ReadOnlyBadge />
        </div>
      </div>

      {/* Risk Signals */}
      {shop.risk !== 'low' && (
        <div
          style={{
            background: shop.risk === 'high' ? COLORS.dangerBg : COLORS.warnBg,
            border: `1px solid ${
              shop.risk === 'high' ? COLORS.danger : COLORS.warn
            }33`,
            borderRadius: 12,
            padding: '14px 18px',
            display: 'flex',
            gap: 12,
            alignItems: 'flex-start',
          }}
        >
          <AlertTriangle
            size={20}
            color={shop.risk === 'high' ? COLORS.danger : COLORS.warn}
            style={{ flexShrink: 0, marginTop: 1 }}
          />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontWeight: 600,
                color: COLORS.ink,
                fontSize: 13,
                marginBottom: 4,
              }}
            >
              Risk Signal Detected
            </div>
            <div
              style={{ fontSize: 12.5, color: COLORS.inkSoft, lineHeight: 1.6 }}
            >
              {shop.risk === 'high' && (
                <>
                  • อัตรา overdue สูงผิดปกติ ({shop.overdue}%)
                  เทียบกับค่าเฉลี่ยระบบ 2.9%
                  <br />• รายได้ลดลง 18.4% เทียบเดือนก่อน (MoM)
                </>
              )}
              {shop.risk === 'medium' && (
                <>
                  • อัตรา overdue สูงกว่าปกติ ({shop.overdue}%)
                  <br />• Cancellation rate เพิ่มขึ้น 4% ใน 14 วันล่าสุด
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* KPIs */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
        }}
      >
        <KpiCard
          label="Total Orders"
          value={formatNum(shop.orders)}
          delta={12.4}
          icon={ShoppingBag}
        />
        <KpiCard
          label="GMV"
          value={formatBaht(shop.gmv)}
          delta={8.2}
          icon={Wallet}
          accent={{ bg: COLORS.violetBg, color: COLORS.violet }}
        />
        <KpiCard
          label="ออเดอร์เฉลี่ย/วัน"
          value="16.2"
          delta={3.1}
          icon={TrendingUp}
          accent={{ bg: COLORS.successBg, color: COLORS.success }}
        />
        <KpiCard
          label="รายได้เฉลี่ย/วัน"
          value="฿8.3K"
          delta={5.7}
          icon={TrendingUp}
          accent={{ bg: COLORS.infoBg, color: COLORS.info }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 14,
        }}
      >
        <KpiCard
          label="Overdue Rate"
          value={shop.overdue}
          suffix="%"
          delta={shop.overdue > 5 ? 2.1 : -0.4}
          icon={AlertTriangle}
          accent={{
            bg: shop.overdue > 5 ? COLORS.dangerBg : COLORS.successBg,
            color: shop.overdue > 5 ? COLORS.danger : COLORS.success,
          }}
        />
        <KpiCard
          label="Cancellation Rate"
          value="3.8"
          suffix="%"
          delta={-0.8}
          icon={XCircle}
          accent={{ bg: COLORS.warnBg, color: COLORS.warn }}
        />
        <KpiCard
          label="Deposit Usage"
          value="68.4"
          suffix="%"
          delta={2.3}
          icon={Wallet}
        />
      </div>

      {/* Trend */}
      <Section title="Growth Trend" subtitle="ออเดอร์ & รายได้ 14 วันล่าสุด">
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={shopTrendData}
              margin={{ top: 8, right: 20, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={COLORS.line}
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fill: COLORS.inkMute, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="l"
                tick={{ fill: COLORS.inkMute, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="r"
                orientation="right"
                tick={{ fill: COLORS.inkMute, fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v / 1000}K`}
              />
              <Tooltip
                contentStyle={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 10,
                  fontSize: 12,
                }}
              />
              <Line
                yAxisId="l"
                type="monotone"
                dataKey="orders"
                stroke={COLORS.primary}
                strokeWidth={2.5}
                dot={{ r: 3 }}
              />
              <Line
                yAxisId="r"
                type="monotone"
                dataKey="revenue"
                stroke={COLORS.violet}
                strokeWidth={2.5}
                dot={{ r: 3 }}
                strokeDasharray="5 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Section>

      {/* Recent orders of this shop */}
      <Section
        title="ออเดอร์ล่าสุดของร้านนี้"
        subtitle="คลิกเพื่อดู order detail"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {orders
            .filter((o) => o.shopId === shop.id)
            .slice(0, 5)
            .map((o) => (
              <div
                key={o.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr auto auto auto',
                  gap: 14,
                  alignItems: 'center',
                  padding: '12px 4px',
                  borderBottom: `1px solid ${COLORS.lineSoft}`,
                }}
              >
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    color: COLORS.inkSoft,
                  }}
                >
                  {o.id}
                </div>
                <div style={{ fontSize: 13, color: COLORS.ink }}>
                  {o.product}
                </div>
                <div style={{ fontSize: 12, color: COLORS.inkMute }}>
                  {o.created}
                </div>
                <StatusPill status={o.status} />
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.ink,
                    fontFamily: 'monospace',
                  }}
                >
                  ฿{o.total}
                </div>
              </div>
            ))}
          {orders.filter((o) => o.shopId === shop.id).length === 0 && (
            <div
              style={{
                padding: 24,
                textAlign: 'center',
                color: COLORS.inkMute,
                fontSize: 13,
              }}
            >
              ไม่มีออเดอร์ล่าสุดใน mock data
            </div>
          )}
        </div>
      </Section>
    </div>
  );
};

// ============ PAGE 4: ORDER DETAIL (MODAL) ============
const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(26,26,46,0.5)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: COLORS.white,
          borderRadius: 16,
          width: '100%',
          maxWidth: 720,
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${COLORS.line}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 4,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.ink }}>
                รายละเอียดออเดอร์
              </div>
              <ReadOnlyBadge />
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.inkMute,
                fontFamily: 'monospace',
              }}
            >
              {order.id}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 8,
              color: COLORS.inkMute,
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Status + Payment */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <StatusPill status={order.status} />
            <span
              style={{
                fontSize: 12,
                padding: '4px 10px',
                borderRadius: 20,
                background:
                  order.payment === 'จ่ายแล้ว'
                    ? COLORS.successBg
                    : order.payment === 'คืนเงิน'
                    ? COLORS.infoBg
                    : COLORS.warnBg,
                color:
                  order.payment === 'จ่ายแล้ว'
                    ? '#065F46'
                    : order.payment === 'คืนเงิน'
                    ? '#1E40AF'
                    : '#92400E',
                fontWeight: 500,
              }}
            >
              {order.payment}
            </span>
          </div>

          {/* Shop & Customer */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            <div
              style={{
                padding: 16,
                background: COLORS.lineSoft,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.inkMute,
                  marginBottom: 6,
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                ร้านค้า
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.ink,
                  marginBottom: 2,
                }}
              >
                {order.shop}
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: COLORS.inkMute,
                  fontFamily: 'monospace',
                }}
              >
                {order.shopId}
              </div>
            </div>
            <div
              style={{
                padding: 16,
                background: COLORS.lineSoft,
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.inkMute,
                  marginBottom: 6,
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                ผู้เช่า (masked)
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.ink,
                  marginBottom: 2,
                }}
              >
                น****ย ส******
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: COLORS.inkMute,
                  fontFamily: 'monospace',
                }}
              >
                08x-xxx-4521
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.ink,
                marginBottom: 10,
              }}
            >
              รายการสินค้า
            </div>
            <div
              style={{
                padding: 14,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 10,
                display: 'flex',
                gap: 14,
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 8,
                  background: `linear-gradient(135deg, ${COLORS.primaryLight}, ${COLORS.primaryBorder})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Package size={24} color={COLORS.primary} />
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: COLORS.ink,
                    marginBottom: 4,
                  }}
                >
                  {order.product}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {['XS', 'เทาเข้ม', 'x1'].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 6,
                        background: COLORS.lineSoft,
                        color: COLORS.inkSoft,
                        border: `1px solid ${COLORS.line}`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.ink,
                  fontFamily: 'monospace',
                }}
              >
                ฿{order.fee}
              </div>
            </div>
          </div>

          {/* Rental period & delivery */}
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.inkMute,
                  marginBottom: 8,
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                ช่วงเวลาเช่า
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  color: COLORS.ink,
                }}
              >
                <Calendar size={14} color={COLORS.primary} />
                {order.rentStart} – {order.rentEnd}
                <span style={{ color: COLORS.inkMute }}>
                  ({order.duration} วัน)
                </span>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: COLORS.inkMute,
                  marginBottom: 8,
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                }}
              >
                ช่องทางจัดส่ง
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  fontSize: 13,
                  color: COLORS.ink,
                }}
              >
                <Truck size={14} color={COLORS.primary} />
                {order.delivery}
              </div>
            </div>
          </div>

          {/* Payment breakdown */}
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.ink,
                marginBottom: 10,
              }}
            >
              Payment Breakdown
            </div>
            <div
              style={{
                padding: 16,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {[
                { label: 'ค่าเช่า', value: order.fee },
                { label: 'ค่ามัดจำ', value: order.deposit },
                { label: 'ค่าจัดส่ง', value: order.ship },
              ].map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: COLORS.inkSoft }}>{r.label}</span>
                  <span style={{ color: COLORS.ink, fontFamily: 'monospace' }}>
                    ฿{r.value.toLocaleString()}
                  </span>
                </div>
              ))}
              <div
                style={{ height: 1, background: COLORS.line, margin: '4px 0' }}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                <span style={{ color: COLORS.ink }}>ยอดรวมทั้งหมด</span>
                <span
                  style={{ color: COLORS.primary, fontFamily: 'monospace' }}
                >
                  ฿{order.total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: COLORS.ink,
                marginBottom: 10,
              }}
            >
              Timeline
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  time: order.created + ' 10:24',
                  label: 'สร้างออเดอร์',
                  done: true,
                },
                {
                  time: order.created + ' 10:45',
                  label: 'ชำระเงินเรียบร้อย',
                  done: true,
                },
                {
                  time: order.rentStart + ' 09:00',
                  label: 'เริ่มช่วงเช่า',
                  done: order.status !== 'ติดจอง',
                },
                {
                  time: order.rentEnd + ' 18:00',
                  label: 'สิ้นสุดช่วงเช่า',
                  done:
                    order.status === 'สำเร็จ' || order.status === 'เกินเวลา',
                },
              ].map((e, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', gap: 12, alignItems: 'center' }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: e.done ? COLORS.primary : COLORS.lineSoft,
                      border: `2px solid ${
                        e.done ? COLORS.primary : COLORS.line
                      }`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {e.done && <CheckCircle2 size={12} color="white" />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: e.done ? COLORS.ink : COLORS.inkMute,
                        fontWeight: e.done ? 500 : 400,
                      }}
                    >
                      {e.label}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: COLORS.inkMute,
                        fontFamily: 'monospace',
                      }}
                    >
                      {e.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer note */}
          <div
            style={{
              padding: 12,
              background: COLORS.lineSoft,
              borderRadius: 10,
              display: 'flex',
              gap: 10,
              alignItems: 'center',
              fontSize: 12,
              color: COLORS.inkSoft,
            }}
          >
            <ShieldCheck size={14} color={COLORS.primary} />
            หน้านี้เป็น Read-only · ไม่สามารถแก้ไขข้อมูลได้ · Created{' '}
            {order.created} · Updated 14/04/26
          </div>
        </div>
      </div>
    </div>
  );
};

// ============ ROOT APP ============
export default function UpDressAdmin() {
  const [page, setPage] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);

  const handleNav = (p) => {
    setPage(p);
    setSelectedShop(null);
    setSelectedOrder(null);
  };

  return (
    <div
      style={{
        fontFamily:
          '"IBM Plex Sans Thai", "IBM Plex Sans", -apple-system, BlinkMacSystemFont, sans-serif',
        background: COLORS.bg,
        minHeight: '100vh',
        color: COLORS.ink,
        display: 'flex',
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <Sidebar
        current={selectedShop ? 'shopDetail' : page}
        onNavigate={handleNav}
      />
      <main style={{ flex: 1, overflow: 'auto' }}>
        {page === 'dashboard' && <SystemOverview />}
        {page === 'orders' && (
          <OrdersAnalytics onOrderClick={setSelectedOrder} />
        )}
        {page === 'shops' && !selectedShop && (
          <ShopAnalytics onShopClick={setSelectedShop} />
        )}
        {page === 'shops' && selectedShop && (
          <ShopDetail
            shop={selectedShop}
            onBack={() => setSelectedShop(null)}
          />
        )}
      </main>
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
