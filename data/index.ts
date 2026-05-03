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
    category: "Generative AI & Agents",
    skills: [
      { name: "LLMs (GPT, Claude, Gemini, Llama)", proficiency: 98 },
      { name: "RAG & Multimodal RAG", proficiency: 95 },
      { name: "Agentic Systems (LangChain, LlamaIndex, AutoGen)", proficiency: 94 },
      { name: "Vector DBs (Chroma, FAISS)", proficiency: 92 },
      { name: "Chainlit / Streamlit / Flask", proficiency: 90 },
    ],
  },
  {
    category: "Machine Learning & Research",
    skills: [
      { name: "Python / R / MATLAB", proficiency: 96 },
      { name: "Advanced Algos (LNN, XGBoost, Transformers)", proficiency: 94 },
      { name: "Statistical Modeling (MLE, ARIMA, Time Series)", proficiency: 92 },
      { name: "Computer Vision & NLP", proficiency: 90 },
      { name: "Feature Engineering & Ensemble Learning", proficiency: 92 },
    ],
  },
  {
    category: "Data Engineering & BI",
    skills: [
      { name: "SQL (Oracle) / PySpark", proficiency: 90 },
      { name: "Power BI / DAX / Power Apps", proficiency: 92 },
      { name: "Big Query / Snowflake", proficiency: 88 },
      { name: "Data Augmentation & ETL", proficiency: 90 },
    ],
  },
  {
    category: "Cloud & MLOps",
    skills: [
      { name: "AWS (SageMaker, S3, EC2, Lambda)", proficiency: 92 },
      { name: "Azure (OpenAI, Functions, CosmosDB)", proficiency: 90 },
      { name: "GCP (Vertex AI, Cloud Run)", proficiency: 88 },
      { name: "Docker / Kubernetes / ArgoCD", proficiency: 85 },
      { name: "CI/CD (Jenkins, Bitbucket, Git)", proficiency: 88 },
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
      "Overseeing multi-disciplinary teams building EdTech and retail AI platforms.",
      "Driving data-driven decision-making through advanced analytics and executive dashboards.",
      "Establishing AI governance frameworks and scalable MLOps infrastructure.",
    ],
  },
  {
    role: "CTO",
    company: "Iluzia Labs",
    period: "Jan 2025 – Present",
    points: [
      "Developed an Intelligent VR Employee Training System for a Saudi-based client.",
      "Created an Agentic VR Language Learning Lab and the Zia gamified English learning app.",
      "Developed a comprehensive AI-driven Education Ecosystem for AILT Global Academy, including SMS, LMS, and Smart Robots.",
      "Collaborated with Zyra Education to scale VR products and developed their online learning platforms.",
      "Managed an Interactive Immersive Learning System featuring over 1000+ content modules.",
    ],
  },
  {
    role: "Senior Data Engineer",
    company: "Photon Interactive",
    period: "Oct 2023 – Jan 2025",
    points: [
      "Developed full-stack GenAI chat applications across four implementation phases.",
      "Built an AI-driven IT Helpdesk chatbot leveraging Jira and technical docs to automate issue resolution.",
      "Created multiple ReActAgent-based tools and integrated them with the chatbot service UI.",
      "Engineered automated data flow services for pre-processing and injection into MongoDB and ChromaDB.",
      "Developed behavior analysis and satisfaction tracking services with automated mail reporting.",
      "Implemented microservice architecture using Kubernetes to ensure application scalability and stability.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Pristine AI",
    period: "Jan 2022 – Oct 2023",
    points: [
      "Successfully implemented Liquid Neural Networks for model building, resulting in improved accuracy and sales.",
      "Developed a dynamic UI using behavior analysis to preempt user actions and optimize efficiency.",
      "Integrated Knowledge Graphs with context panels for enhanced data visualization and decision-making.",
      "Designed predictive models and cutting-edge algorithms to forecast demand and infrastructure risk.",
      "Established scalable, automated MLOps processes for large-scale data analysis and model implementation.",
      "Developed resource usage forecasting and competitor strategy recommendation services.",
    ],
  },
  {
    role: "STEM Trainer, ATL Incharge",
    company: "Mems International",
    period: "Jun 2014 – Dec 2020",
    points: [
      "Delivered hands-on robotics, AI, and coding curriculum to 3,000+ students across GCC.",
      "Designed and iterated STEM programme content adopted by 20+ schools.",
      "Managed cross-cultural student cohorts and developed adaptive instructional strategies.",
    ],
  },
];

// ─── Education ─────────────────────────────────────────────────────────────────

export const education: EducationItem[] = [
  {
    degree: "PG Diploma in Applied Statistics",
    institution: "IGNOU",
    year: "Pursuing",
    type: "PG Diploma",
  },
  {
    degree: "M.Sc in Cognitive Science",
    institution: "Centre of Behavioral and Cognitive Science, Allahabad",
    year: "2022",
    type: "Masters",
  },
  {
    degree: "CCPD (Global Leadership and Sustainable Urbanization)",
    institution: "University College of Cork, Ireland",
    year: "2021",
    type: "Certificate",
  },
  {
    degree: "Advanced Diploma (Cloud Computing)",
    institution: "NIELIT, Calicut",
    year: "2017",
    type: "Certification",
  },
  {
    degree: "B.Tech in Electrical and Electronics Engineering",
    institution: "Govt. Engineering College, Thrissur",
    year: "2013",
    type: "Bachelors",
  },
  {
    degree: "UGC NET in Electronic Science",
    institution: "National Testing Agency, India",
    year: "2022",
    type: "National Exam",
  },
];

// ─── Projects ─────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    title: "Data-Driven Education Ecosystem",
    tags: ["EdTech", "GenAI", "Power BI"],
    description:
      "Created an automated ecosystem for AILT Global featuring automatic lesson plan creation (Gemini API), behavior management dashboards, and Power BI integration.",
    featured: true,
    image: "/images/iNTERACTION WITH CHILDREN.jpeg",
  },
  {
    title: "Liquid Neural Network Forecasting",
    tags: ["ML/Data", "Retail AI", "Research"],
    description:
      "Implemented a novel Liquid Neural Network architecture at Pristine AI for real-time demand forecasting and risk prediction, significantly improving accuracy over traditional models.",
    featured: true,
    image: "/images/iNTERACTION WITH A MR. IDRIS VOHRA.jpeg",
  },
  {
    title: "Pupil Dynamics Behavioral Classifier",
    tags: ["ML/Data", "Research", "Cognitive Science"],
    description:
      "Developed a system using PCA algorithms to classify behavioral states from pupil dynamics with 98% accuracy, improving eye tracking and cognitive research tools.",
    featured: true,
    image: "/images/InteractionwithChildren.jpeg",
  },
  {
    title: "VR Training System",
    tags: ["VR", "Agentic AI", "EdTech"],
    description:
      "Immersive VR + Agentic AI training platform developed at Iluzia Labs — featuring real-time AI feedback inside Unity WebGL environments for enterprise learners.",
    featured: true,
    image: "/images/Talking In Profsummit.jpeg",
  },
  {
    title: "Waste Management — Dhaka City",
    tags: ["Research", "Sustainability", "ASEF"],
    description:
      "Award-winning technological solution for waste management in Dhaka, presented at the ASEF Hackathon and published in The Daily Star.",
    featured: true,
    image: "/images/Meeting with ObaidullaKhan Azmi.jpeg",
  },
  {
    title: "Intelligent Tutoring System",
    tags: ["AWS", "ML", "Adaptive Learning"],
    description:
      "Personalized learning platform on AWS using adaptive content delivery algorithms to promote inclusive education through individualized tutoring.",
    featured: true,
    image: "/images/Speaking in PrOGRAM.jpeg",
  },
];
