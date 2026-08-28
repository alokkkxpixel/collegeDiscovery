// seed.ts
// Run with: npx prisma db seed  (after adding "prisma": { "seed": "ts-node seed.ts" } to package.json)
// or directly: npx ts-node seed.ts
//
// NOTE: Fees, ratings, and package figures below are approximate/illustrative
// placeholder values for MVP/demo purposes — not scraped or verified data.
// Swap in verified numbers if this goes beyond the assignment.

import { prisma } from "../src/lib/prisma.client";

type SeedCollege = {
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  fees: number; // total course fees (INR)
  rating: number;
  overview: string;
  courses: { name: string; duration: string; fees: number; seats: number }[];
  placements: {
    year: number;
    avgPackage: number;
    highestPackage: number;
    placementRate: number;
  }[];
};

const colleges: SeedCollege[] = [
  {
    name: "Indian Institute of Technology Bombay",
    slug: "iit-bombay",
    location: "Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    fees: 900000,
    rating: 4.8,
    overview:
      "Premier engineering institute known for strong research output, top-tier placements, and a highly competitive admission process via JEE Advanced.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 900000, seats: 120 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 850000, seats: 100 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 800000, seats: 110 },
    ],
    placements: [
      { year: 2024, avgPackage: 2400000, highestPackage: 12000000, placementRate: 95 },
      { year: 2023, avgPackage: 2200000, highestPackage: 10000000, placementRate: 93 },
    ],
  },
  {
    name: "Indian Institute of Technology Delhi",
    slug: "iit-delhi",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    fees: 880000,
    rating: 4.8,
    overview:
      "Leading technical institute with strong industry ties, offering undergraduate and postgraduate programs across engineering disciplines.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 880000, seats: 115 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 780000, seats: 90 },
      { name: "B.Tech Chemical Engineering", duration: "4 years", fees: 780000, seats: 80 },
    ],
    placements: [
      { year: 2024, avgPackage: 2300000, highestPackage: 11000000, placementRate: 94 },
      { year: 2023, avgPackage: 2100000, highestPackage: 9500000, placementRate: 92 },
    ],
  },
  {
    name: "Indian Institute of Technology Madras",
    slug: "iit-madras",
    location: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 870000,
    rating: 4.7,
    overview:
      "Consistently ranked India's top engineering institute, with a strong focus on research, entrepreneurship, and industry collaboration.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 870000, seats: 120 },
      { name: "B.Tech Aerospace Engineering", duration: "4 years", fees: 800000, seats: 60 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 800000, seats: 100 },
    ],
    placements: [
      { year: 2024, avgPackage: 2350000, highestPackage: 10500000, placementRate: 94 },
      { year: 2023, avgPackage: 2150000, highestPackage: 9800000, placementRate: 91 },
    ],
  },
  {
    name: "Birla Institute of Technology and Science, Pilani",
    slug: "bits-pilani",
    location: "Pilani",
    city: "Pilani",
    state: "Rajasthan",
    fees: 1900000,
    rating: 4.6,
    overview:
      "Top private deemed university known for flexible curriculum, strong alumni network, and practice school (internship) program.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 1900000, seats: 180 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 1850000, seats: 150 },
      { name: "B.Pharm", duration: "4 years", fees: 1600000, seats: 80 },
    ],
    placements: [
      { year: 2024, avgPackage: 1900000, highestPackage: 6500000, placementRate: 92 },
      { year: 2023, avgPackage: 1750000, highestPackage: 6000000, placementRate: 90 },
    ],
  },
  {
    name: "Vellore Institute of Technology",
    slug: "vit-vellore",
    location: "Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    fees: 800000,
    rating: 4.3,
    overview:
      "Large private university offering a wide range of engineering and technology programs with strong corporate placement drives.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 800000, seats: 600 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 780000, seats: 300 },
      { name: "B.Tech Biotechnology", duration: "4 years", fees: 720000, seats: 120 },
    ],
    placements: [
      { year: 2024, avgPackage: 850000, highestPackage: 4400000, placementRate: 85 },
      { year: 2023, avgPackage: 780000, highestPackage: 4100000, placementRate: 83 },
    ],
  },
  {
    name: "Delhi Technological University",
    slug: "dtu-delhi",
    location: "Rohini, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    fees: 560000,
    rating: 4.4,
    overview:
      "State-run technical university (formerly Delhi College of Engineering) known for strong academics at government fee levels.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 560000, seats: 180 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", fees: 540000, seats: 150 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 540000, seats: 140 },
    ],
    placements: [
      { year: 2024, avgPackage: 1400000, highestPackage: 6000000, placementRate: 88 },
      { year: 2023, avgPackage: 1250000, highestPackage: 5500000, placementRate: 86 },
    ],
  },
  {
    name: "Manipal Institute of Technology",
    slug: "manipal-institute-of-technology",
    location: "Manipal",
    city: "Udupi",
    state: "Karnataka",
    fees: 1750000,
    rating: 4.2,
    overview:
      "Constituent institute of Manipal Academy of Higher Education, offering a broad range of engineering programs with active placement cells.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 1750000, seats: 300 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 1700000, seats: 180 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 1600000, seats: 150 },
    ],
    placements: [
      { year: 2024, avgPackage: 900000, highestPackage: 4800000, placementRate: 82 },
      { year: 2023, avgPackage: 830000, highestPackage: 4200000, placementRate: 80 },
    ],
  },
  {
    name: "SRM Institute of Science and Technology",
    slug: "srm-institute-chennai",
    location: "Kattankulathur, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    fees: 950000,
    rating: 4.0,
    overview:
      "Large private deemed university with multiple campuses, offering diverse engineering, management, and health science programs.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 950000, seats: 500 },
      { name: "B.Tech Data Science", duration: "4 years", fees: 940000, seats: 180 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 700000, seats: 120 },
    ],
    placements: [
      { year: 2024, avgPackage: 720000, highestPackage: 4100000, placementRate: 78 },
      { year: 2023, avgPackage: 680000, highestPackage: 3800000, placementRate: 76 },
    ],
  },
  {
    name: "National Institute of Technology Trichy",
    slug: "nit-trichy",
    location: "Tiruchirappalli",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    fees: 620000,
    rating: 4.5,
    overview:
      "One of India's top NITs, known for strong core engineering programs and consistent placement performance.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 620000, seats: 130 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 600000, seats: 120 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 590000, seats: 110 },
    ],
    placements: [
      { year: 2024, avgPackage: 1500000, highestPackage: 5800000, placementRate: 90 },
      { year: 2023, avgPackage: 1350000, highestPackage: 5200000, placementRate: 88 },
    ],
  },
  {
    name: "National Institute of Technology Karnataka, Surathkal",
    slug: "nitk-surathkal",
    location: "Surathkal, Mangalore",
    city: "Mangalore",
    state: "Karnataka",
    fees: 630000,
    rating: 4.5,
    overview:
      "Top-ranked NIT with a scenic coastal campus, strong in computer science, electronics, and civil engineering programs.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 630000, seats: 130 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 610000, seats: 100 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 580000, seats: 100 },
    ],
    placements: [
      { year: 2024, avgPackage: 1450000, highestPackage: 5600000, placementRate: 89 },
      { year: 2023, avgPackage: 1300000, highestPackage: 5000000, placementRate: 87 },
    ],
  },
  {
    name: "Jadavpur University",
    slug: "jadavpur-university",
    location: "Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    fees: 150000,
    rating: 4.4,
    overview:
      "Renowned state university offering highly subsidized, quality engineering and arts education with a strong legacy.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 150000, seats: 90 },
      { name: "B.E. Electrical Engineering", duration: "4 years", fees: 145000, seats: 80 },
      { name: "B.E. Metallurgical Engineering", duration: "4 years", fees: 140000, seats: 40 },
    ],
    placements: [
      { year: 2024, avgPackage: 1200000, highestPackage: 4800000, placementRate: 85 },
      { year: 2023, avgPackage: 1100000, highestPackage: 4300000, placementRate: 83 },
    ],
  },
  {
    name: "College of Engineering, Pune",
    slug: "coep-pune",
    location: "Shivajinagar, Pune",
    city: "Pune",
    state: "Maharashtra",
    fees: 180000,
    rating: 4.3,
    overview:
      "One of India's oldest engineering colleges, now an autonomous state-run institute known for strong core engineering programs.",
    courses: [
      { name: "B.Tech Computer Engineering", duration: "4 years", fees: 180000, seats: 120 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 170000, seats: 100 },
      { name: "B.Tech Civil Engineering", duration: "4 years", fees: 165000, seats: 90 },
    ],
    placements: [
      { year: 2024, avgPackage: 1050000, highestPackage: 4200000, placementRate: 84 },
      { year: 2023, avgPackage: 950000, highestPackage: 3900000, placementRate: 82 },
    ],
  },
  {
    name: "PSG College of Technology",
    slug: "psg-college-of-technology",
    location: "Coimbatore",
    city: "Coimbatore",
    state: "Tamil Nadu",
    fees: 400000,
    rating: 4.3,
    overview:
      "Autonomous engineering college with strong industry linkages and a reputation for consistent academic and placement performance.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 400000, seats: 120 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 380000, seats: 100 },
      { name: "B.E. Textile Technology", duration: "4 years", fees: 320000, seats: 60 },
    ],
    placements: [
      { year: 2024, avgPackage: 780000, highestPackage: 3600000, placementRate: 86 },
      { year: 2023, avgPackage: 720000, highestPackage: 3200000, placementRate: 84 },
    ],
  },
  {
    name: "R.V. College of Engineering",
    slug: "rv-college-of-engineering",
    location: "Mysore Road, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    fees: 550000,
    rating: 4.4,
    overview:
      "Top autonomous engineering college in Bengaluru with strong recruiter relationships in the local IT industry.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 550000, seats: 180 },
      { name: "B.E. Information Science", duration: "4 years", fees: 540000, seats: 120 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 520000, seats: 120 },
    ],
    placements: [
      { year: 2024, avgPackage: 950000, highestPackage: 4500000, placementRate: 87 },
      { year: 2023, avgPackage: 880000, highestPackage: 4000000, placementRate: 85 },
    ],
  },
  {
    name: "BMS College of Engineering",
    slug: "bms-college-of-engineering",
    location: "Basavanagudi, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    fees: 530000,
    rating: 4.3,
    overview:
      "One of India's oldest private engineering colleges, autonomous, with a strong reputation in Karnataka for placements.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 530000, seats: 150 },
      { name: "B.E. Mechanical Engineering", duration: "4 years", fees: 500000, seats: 100 },
      { name: "B.E. Civil Engineering", duration: "4 years", fees: 480000, seats: 80 },
    ],
    placements: [
      { year: 2024, avgPackage: 920000, highestPackage: 4300000, placementRate: 86 },
      { year: 2023, avgPackage: 850000, highestPackage: 3900000, placementRate: 84 },
    ],
  },
  {
    name: "Thapar Institute of Engineering and Technology",
    slug: "thapar-institute",
    location: "Patiala",
    city: "Patiala",
    state: "Punjab",
    fees: 1100000,
    rating: 4.2,
    overview:
      "Leading private deemed university in North India, known for engineering and applied sciences programs.",
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", fees: 1100000, seats: 240 },
      { name: "B.E. Electronics & Communication", duration: "4 years", fees: 1050000, seats: 150 },
      { name: "B.E. Chemical Engineering", duration: "4 years", fees: 950000, seats: 80 },
    ],
    placements: [
      { year: 2024, avgPackage: 880000, highestPackage: 4400000, placementRate: 83 },
      { year: 2023, avgPackage: 820000, highestPackage: 3900000, placementRate: 81 },
    ],
  },
  {
    name: "Amrita Vishwa Vidyapeetham, Coimbatore",
    slug: "amrita-coimbatore",
    location: "Ettimadai, Coimbatore",
    city: "Coimbatore",
    state: "Tamil Nadu",
    fees: 950000,
    rating: 4.2,
    overview:
      "Deemed university with a scenic campus, offering engineering, management, and health science programs with active research centers.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 950000, seats: 240 },
      { name: "B.Tech Electronics & Communication", duration: "4 years", fees: 900000, seats: 150 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 850000, seats: 100 },
    ],
    placements: [
      { year: 2024, avgPackage: 780000, highestPackage: 4000000, placementRate: 82 },
      { year: 2023, avgPackage: 720000, highestPackage: 3600000, placementRate: 80 },
    ],
  },
  {
    name: "Indian Institute of Technology Hyderabad",
    slug: "iit-hyderabad",
    location: "Kandi, Sangareddy",
    city: "Hyderabad",
    state: "Telangana",
    fees: 850000,
    rating: 4.6,
    overview:
      "Newer-generation IIT known for a research-focused, interdisciplinary curriculum and rapidly growing placement outcomes.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 850000, seats: 100 },
      { name: "B.Tech Artificial Intelligence", duration: "4 years", fees: 850000, seats: 60 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", fees: 800000, seats: 80 },
    ],
    placements: [
      { year: 2024, avgPackage: 2000000, highestPackage: 8500000, placementRate: 92 },
      { year: 2023, avgPackage: 1850000, highestPackage: 7800000, placementRate: 90 },
    ],
  },
  {
    name: "Netaji Subhas University of Technology",
    slug: "nsut-delhi",
    location: "Dwarka, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    fees: 570000,
    rating: 4.3,
    overview:
      "State-run technical university in Delhi with strong computer science and electronics programs, popular among Delhi-NCR students.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 570000, seats: 130 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 550000, seats: 100 },
      { name: "B.Tech Electronics Engineering", duration: "4 years", fees: 540000, seats: 100 },
    ],
    placements: [
      { year: 2024, avgPackage: 1350000, highestPackage: 5500000, placementRate: 88 },
      { year: 2023, avgPackage: 1200000, highestPackage: 5000000, placementRate: 86 },
    ],
  },
  {
    name: "Christ University",
    slug: "christ-university-bengaluru",
    location: "Hosur Road, Bengaluru",
    city: "Bengaluru",
    state: "Karnataka",
    fees: 350000,
    rating: 4.1,
    overview:
      "Well-known deemed university offering a mix of engineering, management, and liberal arts programs with a strong campus culture.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 350000, seats: 120 },
      { name: "BCA", duration: "3 years", fees: 240000, seats: 150 },
      { name: "B.Tech Artificial Intelligence & Machine Learning", duration: "4 years", fees: 360000, seats: 80 },
    ],
    placements: [
      { year: 2024, avgPackage: 650000, highestPackage: 2800000, placementRate: 78 },
      { year: 2023, avgPackage: 600000, highestPackage: 2500000, placementRate: 76 },
    ],
  },
  {
    name: "Lovely Professional University",
    slug: "lpu-jalandhar",
    location: "Phagwara",
    city: "Jalandhar",
    state: "Punjab",
    fees: 720000,
    rating: 3.9,
    overview:
      "One of India's largest private universities by enrollment, offering a very wide range of programs and large-scale placement drives.",
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", fees: 720000, seats: 800 },
      { name: "B.Tech Information Technology", duration: "4 years", fees: 700000, seats: 300 },
      { name: "BBA", duration: "3 years", fees: 360000, seats: 400 },
    ],
    placements: [
      { year: 2024, avgPackage: 550000, highestPackage: 3800000, placementRate: 75 },
      { year: 2023, avgPackage: 500000, highestPackage: 3400000, placementRate: 72 },
    ],
  },
];

async function main() {
  console.log(`Seeding ${colleges.length} colleges...`);

  for (const c of colleges) {
    const college = await prisma.college.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        name: c.name,
        slug: c.slug,
        location: c.location,
        city: c.city,
        state: c.state,
        fees: c.fees,
        rating: c.rating,
        overview: c.overview,
        courses: { create: c.courses },
        placements: { create: c.placements },
      },
    });
    console.log(`✔ Seeded: ${college.name}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
