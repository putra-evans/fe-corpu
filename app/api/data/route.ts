import { NextResponse } from "next/server";

import { HeaderItem } from "../../../types/menu";
import { FeaturesType } from "../../../types/features";
import { ExpertChiefType } from "../../../types/expertchief";
import { GalleryImagesType } from "../../../types/galleryimage";
import { FullMenuType } from "../../../types/fullmenu";
import { FooterLinkType } from "../../../types/footerlink";
import { KelasType, KategoriKelasType } from "../../../types/kelas";

const HeaderData: HeaderItem[] = [
  { label: "Kelas", href: "/kelas" },
  // { label: "Menu", href: "/#menu" },
  // { label: "Reserve Table", href: "/#reserve" },
  { label: "Docs", href: "/documentation" },
];

const FeaturesData: FeaturesType[] = [
  {
    imgSrc: "/images/Features/featureOne.svg",
    heading: "Elegant Dining Atmosphere",
    subheading:
      "Enjoy a warm, refined space perfect for intimate dinners or small group gatherings.",
  },
  {
    imgSrc: "/images/Features/featureThree.svg",
    heading: "Signature Chef Creations",
    subheading:
      "Taste one-of-a-kind dishes crafted with passion by our top culinary team.",
  },
  {
    imgSrc: "/images/Features/featureTwo.svg",
    heading: "Fresh, Local Ingredients",
    subheading:
      "We use locally sourced goods daily for unmatched taste and quality.",
  },
  {
    imgSrc: "/images/Features/featureFour.svg",
    heading: "Hassle-Free Reservations",
    subheading:
      "Reserve online in seconds or walk in anytime — we’re ready when you are.",
  },
];

const ExpertChiefData: ExpertChiefType[] = [
  {
    profession: "Senior Chef",
    name: "Marco Benton",
    imgSrc: "/images/Expert/boyone.png",
  },
  {
    profession: "Junior Chef",
    name: "Elena Rivera",
    imgSrc: "/images/Expert/girl.png",
  },
  {
    profession: "Junior Chef",
    name: "John Doe",
    imgSrc: "/images/Expert/boytwo.png",
  },
];

const GalleryImagesData: GalleryImagesType[] = [
  {
    src: "/images/Gallery/foodone.webp",
    name: "Caesar Salad(187 Kcal)",
    price: 35,
  },
  {
    src: "/images/Gallery/foodtwo.webp",
    name: "Christmas salad(118 Kcal)",
    price: 17,
  },
  {
    src: "/images/Gallery/foodthree.webp",
    name: "Sauteed mushrooms with pumpkin bowl(238 kcal)",
    price: 45,
  },
  {
    src: "/images/Gallery/foodfour.webp",
    name: "BBQ Chicken Feast Pizza(272 kcal)",
    price: 27,
  },
];

const FullMenuData: FullMenuType[] = [
  {
    name: "Grilled Salmon",
    price: "$18.99",
    description: "Served with lemon butter sauce and grilled vegetables.",
  },
  {
    name: "Caesar Salad",
    price: "$9.99",
    description: "Crisp romaine with parmesan, croutons, and Caesar dressing.",
  },
  {
    name: "Margherita Pizza",
    price: "$13.49",
    description: "Classic pizza with tomato, mozzarella, and fresh basil.",
  },
  {
    name: "Tomato Basil Soup",
    price: "$6.99",
    description: "Creamy tomato soup with a hint of garlic and fresh basil.",
  },
  {
    name: "Chocolate Lava Cake",
    price: "$7.99",
    description:
      "Warm chocolate cake with a molten center served with vanilla ice cream.",
  },
  {
    name: "Spaghetti Carbonara",
    price: "$15.25",
    description:
      "Spaghetti tossed with eggs, pancetta, parmesan, and black pepper.",
  },
  {
    name: "Tiramisu",
    price: "$8.50",
    description:
      "Layered espresso-soaked ladyfingers with mascarpone and cocoa.",
  },
];

const FooterLinkData: FooterLinkType[] = [
  {
    section: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/#aboutus" },
      { label: "Menu", href: "/#menu" },
      { label: "Reserve Table", href: "/#reserve" },
    ],
  },
  {
    section: "Support",
    links: [
      { label: "Help/FAQ", href: "/" },
      { label: "Press", href: "/" },
      { label: "Affiliates", href: "/" },
      { label: "Hotel owners", href: "/" },
      { label: "Partners", href: "/" },
    ],
  },
];

const CourseData: KelasType[] = [
  {
    id: 1,
    id_kategori: 1,
    heading: "(MERN) Full-Stack Development",
    name: "James Nolan",
    imgSrc: "/images/courses/mern.webp",
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.4,
    created_at: "2025-07-29T10:00:00Z",
  },
  {
    id: 2,
    id_kategori: 2,
    heading: "Design Systems with React",
    name: "Elena Brooks",
    imgSrc: "/images/courses/react.webp",
    students: 130,
    classes: 12,
    price: 20,
    rating: 4.5,
    created_at: "2025-07-29T10:00:00Z",
  },
  {
    id: 3,
    id_kategori: 1,
    heading: "Create Stunning Banners in Figma",
    name: "Aria Kim",
    imgSrc: "/images/courses/UiUx.webp",
    students: 120,
    classes: 12,
    price: 20,
    rating: 5.0,
    created_at: "2025-07-29T10:00:00Z",
  },
  {
    id: 4,
    id_kategori: 2,
    heading: "Build & Launch a Webflow Website",
    name: "Marcus Lee",
    imgSrc: "/images/courses/webflow.webp",
    students: 150,
    classes: 12,
    price: 20,
    rating: 5.0,
    created_at: "2025-07-28T10:00:00Z",
  },
  {
    id: 5,
    id_kategori: 2,
    heading: "Explore The World",
    name: "Diego Lee",
    imgSrc: "/images/courses/adventure.jpg",
    students: 150,
    classes: 12,
    price: 20,
    rating: 5.0,
    created_at: "2025-07-28T10:00:00Z",
  },
  {
    id: 6,
    id_kategori: 2,
    heading: "Kembangkan Bisnismu Ke Seluruh Dunia",
    name: "Cristiano hwa",
    imgSrc: "/images/courses/bisnis.png",
    students: 500,
    classes: 23,
    price: 20000,
    rating: 3.0,
    created_at: "2024-06-20T08:00:00Z",
  },
  {
    id: 7,
    id_kategori: 1,
    heading: "Tutorial Dasar dan Pergerakan Flexibel Dance yang Popular",
    name: "Messi Lionel",
    imgSrc: "/images/courses/dance.jpg",
    students: 30,
    classes: 28,
    price: 100000,
    rating: 4.5,
    created_at: "2024-10-20T08:00:00Z",
  },
  {
    id: 8,
    id_kategori: 3,
    heading: "Rekomendasi Desain Studio dengan Modern Desain yang Terbaru",
    name: "Joni Bernard",
    imgSrc: "/images/courses/desain_studio.jpg",
    students: 37,
    classes: 78,
    price: 150000,
    rating: 4.7,
    created_at: "2024-08-20T08:00:00Z",
  },
  {
    id: 9,
    id_kategori: 1,
    heading: "Explore Dunia Dengan Penuh Semangat dan Kehangatan",
    name: "Bernard",
    imgSrc: "/images/courses/explore.jpg",
    students: 57,
    classes: 71,
    price: 200000,
    rating: 4.4,
    created_at: "2025-06-20T08:00:00Z",
  },
  {
    id: 10,
    id_kategori: 3,
    heading: "Tutorial Panduan Praktis Awal Untuk Pemula Mendaki Gunung",
    name: "Bernard Kennedy",
    imgSrc: "/images/courses/hiking.jpg",
    students: 100,
    classes: 89,
    price: 250000,
    rating: 4.5,
    created_at: "2025-02-20T08:00:00Z",
  },
  {
    id: 11,
    id_kategori: 2,
    heading: "Berfikir Kritis dalam menyelesaikan permasalahan yang ada",
    name: "Thomas Edison",
    imgSrc: "/images/courses/kreatifitas.jpg",
    students: 140,
    classes: 90,
    price: 220000,
    rating: 4.1,
    created_at: "2025-03-20T08:00:00Z",
  },
  {
    id: 12,
    id_kategori: 1,
    heading: "Tips-Trik dalam menghadapi forum pada saat melaksanakan meeting",
    name: "Edison Alfa",
    imgSrc: "/images/courses/meeting.jpg",
    students: 99,
    classes: 30,
    price: 210000,
    rating: 3.4,
    created_at: "2025-05-20T08:00:00Z",
  },
  {
    id: 13,
    id_kategori: 3,
    heading:
      "Fakta Menarik dengan sepeda kita berhasil menurunkan berat badan dengan cepat",
    name: "Alfa Anwar",
    imgSrc: "/images/courses/sepeda.jpg",
    students: 87,
    classes: 80,
    price: 150000,
    rating: 5.0,
    created_at: "2025-01-21T08:00:00Z",
  },
  {
    id: 14,
    id_kategori: 2,
    heading: "Belajar Skateboard dengan cepat untuk pemula",
    name: "Joko Anwar",
    imgSrc: "/images/courses/skateboard.jpg",
    students: 20,
    classes: 150,
    price: 120000,
    rating: 4.0,
    created_at: "2025-07-10T08:00:00Z",
  },
];

const KategoriKelas: KategoriKelasType[] = [
  {
    id_kategori: 1,
    nama_kategori: "Design",
  },
  {
    id_kategori: 2,
    nama_kategori: "Coding",
  },
  {
    id_kategori: 3,
    nama_kategori: "Public Speaking",
  },
];

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    FeaturesData,
    ExpertChiefData,
    GalleryImagesData,
    FullMenuData,
    FooterLinkData,
    CourseData,
    KategoriKelas,
  });
};
