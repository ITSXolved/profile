// ─── Type Definitions ──────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  title: string;
  taglines: string[];
  email: string;
  linkedin: string;
  location: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Project {
  title: string;
  tags: string[];
  description: string;
  featured: boolean;
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  type: string;
}

// ─── Personal Info ─────────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: "SAINUL ABID M",
  title: "AI Technology Leader",
  taglines: [
    "AI Technology Leader",
    "CTO & Director",
    "Gen AI Architect",
    "Data Scientist",
    "Cognitive Scientist",
  ],
  email: "zainuscloud@gmail.com",
  linkedin: "https://linkedin.com/in/sainul-abid-m-585810213",
  location: "Kerala, India",
  cvPath: "/images/SAINUL ABID M Resume.pdf",
  photo: "/images/Speaking in PrOGRAM.jpeg",
  subtext: "10+ years of experience in leading AI initiatives and building intelligent systems across GenAI, ML, VR, and EdTech.",
} as PersonalInfo & { cvPath: string; photo: string; subtext: string };

// ─── Skills ────────────────────────────────────────────────────────────────────

export const skills: SkillCategory[] = [
  {
    category: "AI & Machine Learning",
    skills: [
      { name: "Python / Scikit-learn", proficiency: 95 },
      { name: "PyTorch / TensorFlow", proficiency: 90 },
      { name: "NLP (NLTK, Spacy)", proficiency: 92 },
      { name: "Computer Vision (OpenCV)", proficiency: 88 },
      { name: "LLMs / Hugging Face", proficiency: 94 },
      { name: "RAG / LangChain", proficiency: 92 },
    ],
  },
  {
    category: "Data Engineering & BI",
    skills: [
      { name: "SQL / PostgreSQL", proficiency: 90 },
      { name: "Pandas / NumPy / Keras", proficiency: 92 },
      { name: "Tableau / Power BI", proficiency: 88 },
      { name: "Seaborn / Matplotlib", proficiency: 90 },
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      { name: "AWS / Azure", proficiency: 85 },
      { name: "Docker / Kubernetes / MLflow", proficiency: 82 },
      { name: "Git / CI/CD", proficiency: 88 },
    ],
  },
  {
    category: "Web Tech",
    skills: [
      { name: "FastAPI / Flask", proficiency: 92 },
      { name: "Next.js / TypeScript", proficiency: 85 },
      { name: "Tailwind CSS", proficiency: 88 },
    ],
  },
  {
    category: "Strategic Leadership",
    skills: [
      { name: "AI Strategy & Roadmap", proficiency: 94 },
      { name: "Team Leadership", proficiency: 92 },
      { name: "Cognitive Science R&D", proficiency: 90 },
    ],
  },
];

// ─── Experience ────────────────────────────────────────────────────────────────

export const experience: ExperienceItem[] = [
  {
    role: "Director",
    company: "AyaTech",
    period: "Mar 2026 – Present",
    points: [
      "Leading strategic AI product direction and full-stack engineering across all AyaTech verticals.",
      "Overseeing multi-disciplinary teams building EdTech, pharma-IT, and retail AI platforms.",
      "Driving data-driven decision-making through advanced analytics and executive dashboards.",
      "Establishing AI governance frameworks and scalable MLOps infrastructure.",
    ],
  },
  {
    role: "CTO",
    company: "Iluzia Labs",
    period: "Jan 2025 – Present",
    points: [
      "Architected and shipped an enterprise GenAI chatbot platform with RAG pipelines and Supabase backend.",
      "Built immersive VR/XR learning environments integrated into LMS for 5,000+ learners.",
      "Defined and executed the full technology roadmap from MVP to production.",
      "Grew engineering capacity from 2 to 12 engineers in under 12 months.",
    ],
  },
  {
    role: "Senior Data Engineer",
    company: "Photon Interactive",
    period: "Oct 2023 – Jan 2025",
    points: [
      "Designed real-time analytics pipelines handling 50k+ events/sec for retail clients.",
      "Delivered personalisation engines improving click-through rates by 38%.",
      "Migrated legacy ETL workflows to cloud-native solutions on AWS, reducing cost by 45%.",
      "Mentored a team of 4 junior data engineers in best practices and code quality.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Pristine AI",
    period: "Jan 2022 – Oct 2023",
    points: [
      "Built NLP classifiers achieving 94% accuracy for pharmaceutical document categorisation.",
      "Deployed computer vision models for real-time defect detection on manufacturing edge devices.",
      "Developed cognitive load prediction models for adaptive e-learning systems.",
      "Published research on sustainable urbanisation data modelling in collaboration with ASEF.",
    ],
  },
  {
    role: "STEM Trainer",
    company: "Mems International",
    period: "Jun 2014 – Dec 2020",
    points: [
      "Delivered hands-on robotics, AI, and coding curriculum to 3,000+ students across GCC.",
      "Designed and iterated STEM programme content adopted by 20+ schools.",
      "Managed cross-cultural student cohorts, developing adaptive instructional strategies.",
    ],
  },
];

// ─── Education ─────────────────────────────────────────────────────────────────

export const education: EducationItem[] = [
  {
    degree: "M.Tech in Cognitive Science",
    institution: "CBCS, University of Allahabad",
    year: "2021 – 2023",
    type: "Masters",
  },
  {
    degree: "B.Tech in Electronics and Communication Engineering",
    institution: "CUSAT, Kochi, Kerala",
    year: "2010 – 2014",
    type: "Bachelors",
  },
  {
    degree: "UGC NET Qualified",
    institution: "National Testing Agency, India",
    year: "2023",
    type: "National Exam",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: "IT HelpDesk AI",
    tags: ["GenAI", "RAG", "Kubernetes"],
    description:
      "Enterprise GenAI helpdesk for Medimpact/Photon with RAG pipelines, LangChain agents, and Kubernetes orchestration — slashing ticket resolution time by 60%.",
    featured: true,
    image: "/images/Speaking in PrOGRAM.jpeg",
  },
  {
    title: "AI Education Ecosystem",
    tags: ["EdTech", "GenAI", "Agentic AI"],
    description:
      "Agentic data-driven EdTech ecosystem for AILT Gujarat — adaptive curricula, AI tutors, and real-time learning analytics for 10,000+ students.",
    featured: true,
    image: "/images/iNTERACTION WITH CHILDREN.jpeg",
  },
  {
    title: "VR Training System",
    tags: ["VR", "Agentic AI", "EdTech"],
    description:
      "Immersive VR + Agentic AI training platform for a Saudi enterprise client via Iluzia Labs — real-time AI feedback inside Unity WebGL environments.",
    featured: true,
    image: "/images/Talking In Profsummit.jpeg",
  },
  {
    title: "Liquid Neural Network — Retail AI",
    tags: ["ML/Data", "Retail AI", "Research"],
    description:
      "Applied Liquid Neural Networks to real-time retail demand forecasting at Pristine AI, outperforming LSTM baselines by 22% on volatile SKUs.",
    featured: true,
    image: "/images/iNTERACTION WITH A MR. IDRIS VOHRA.jpeg",
  },
  {
    title: "Pupil Dynamics Classifier",
    tags: ["ML/Data", "Research", "Cognitive Science"],
    description:
      "PCA + ensemble ML pipeline classifying cognitive load from pupil dilation signals — 91% accuracy on a 3-class cognitive-state dataset.",
    featured: true,
    image: "/images/InteractionwithChildren.jpeg",
  },
  {
    title: "Waste Management — ASEF Hackathon",
    tags: ["Research", "Sustainability", "ML/Data"],
    description:
      "Award-winning predictive waste-flow model for smart-city route optimisation, presented at the Asia-Europe Sustainable Futures hackathon.",
    featured: true,
    image: "/images/Meeting with ObaidullaKhan Azmi.jpeg",
  },
];
