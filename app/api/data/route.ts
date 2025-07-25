import { NextResponse } from "next/server";

import { HeaderItem } from "../../../types/menu";
import { FeaturesType } from "../../../types/features";
import { ExpertChiefType } from "../../../types/expertchief";
import { GalleryImagesType } from "../../../types/galleryimage";
import { FullMenuType } from "../../../types/fullmenu";
import { FooterLinkType } from "../../../types/footerlink";
import { CourseType } from "../../../types/course";


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

const CourseData: CourseType[] = [
  {
    heading: '(MERN) Full-Stack Development',
    name: 'James Nolan',
    imgSrc: '/images/courses/mern.webp',
    students: 150,
    classes: 12,
    price: 20,
    rating: 4.4,
  },
  {
    heading: 'Design Systems with React',
    name: 'Elena Brooks',
    imgSrc: '/images/courses/react.webp',
    students: 130,
    classes: 12,
    price: 20,
    rating: 4.5,
  },
  {
    heading: 'Create Stunning Banners in Figma',
    name: 'Aria Kim',
    imgSrc: '/images/courses/UiUx.webp',
    students: 120,
    classes: 12,
    price: 20,
    rating: 5.0,
  },
  {
    heading: 'Build & Launch a Webflow Website',
    name: 'Marcus Lee',
    imgSrc: '/images/courses/webflow.webp',
    students: 150,
    classes: 12,
    price: 20,
    rating: 5.0,
  },
]

export const GET = () => {
  return NextResponse.json({
    HeaderData,
    FeaturesData,
    ExpertChiefData,
    GalleryImagesData,
    FullMenuData,
    FooterLinkData,
    CourseData,
  });
};
