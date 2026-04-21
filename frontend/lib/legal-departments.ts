export type IconName =
  | "Building2"
  | "Shield"
  | "Car"
  | "ShoppingCart"
  | "Users"
  | "Briefcase"
  | "Globe"
  | "Landmark"

export interface LegalDepartment {
  id: string
  name: string
  nameUr: string
  description: string
  descriptionUr: string
  iconName: IconName
  color: string
  examples: string[]
  examplesUr: string[]
  systemPrompt: string
}

export const legalDepartments: LegalDepartment[] = [
  {
    id: "property",
    name: "Property Disputes",
    nameUr: "جائیداد کے تنازعات",
    description: "Land ownership, tenant rights, property registration, boundary disputes, and real estate matters.",
    descriptionUr: "زمین کی ملکیت، کرایہ دار کے حقوق، جائیداد کی رجسٹریشن، حد بندی کے تنازعات اور رئیل اسٹیٹ کے معاملات۔",
    iconName: "Building2",
    color: "bg-primary/5 text-primary border-primary/20",
    examples: [
      "How do I register my property?",
      "What are my rights as a tenant?",
      "How to resolve boundary disputes?",
    ],
    examplesUr: [
      "میں اپنی جائیداد کیسے رجسٹر کروں؟",
      "بطور کرایہ دار میرے کیا حقوق ہیں؟",
      "حد بندی کے تنازعات کیسے حل کریں؟",
    ],
    systemPrompt: `You are a legal assistant specializing in Property Law. Help users understand:
- Property registration and documentation
- Tenant and landlord rights
- Boundary and land disputes
- Real estate transactions
- Inheritance and succession laws
- Property tax matters

Always provide simplified explanations and guide users on possible legal actions. Remind them to consult a qualified lawyer for specific cases. Be empathetic and use simple language.`,
  },
  {
    id: "cybercrime",
    name: "Cybercrime",
    nameUr: "سائبر کرائم",
    description: "Online fraud, identity theft, cyberbullying, data breaches, and digital privacy violations.",
    descriptionUr: "آن لائن دھوکہ دہی، شناختی چوری، سائبر بلنگ، ڈیٹا کی خلاف ورزی اور ڈیجیٹل رازداری کی خلاف ورزیاں۔",
    iconName: "Shield",
    color: "bg-accent/5 text-accent border-accent/20",
    examples: [
      "Someone hacked my social media account",
      "I received a fraudulent message",
      "How to report online harassment?",
    ],
    examplesUr: [
      "کسی نے میرا سوشل میڈیا اکاؤنٹ ہیک کر لیا",
      "مجھے ایک دھوکہ دہی کا پیغام ملا",
      "آن لائن ہراسانی کی رپورٹ کیسے کریں؟",
    ],
    systemPrompt: `You are a legal assistant specializing in Cybercrime and Digital Law. Help users understand:
- Online fraud and scams
- Identity theft protection
- Cyberbullying and harassment
- Data privacy violations
- Social media crimes
- Digital evidence collection

Guide users on how to report cybercrimes to appropriate authorities. Explain relevant IT laws and digital rights. Always recommend professional legal consultation for serious cases.`,
  },
  {
    id: "traffic",
    name: "Traffic Regulations",
    nameUr: "ٹریفک قوانین",
    description: "Traffic violations, accident claims, license issues, vehicle registration, and road safety laws.",
    descriptionUr: "ٹریفک قوانین کی خلاف ورزی، حادثے کے دعوے، لائسنس کے مسائل، گاڑی کی رجسٹریشن اور سڑک سیفٹی قوانین۔",
    iconName: "Car",
    color: "bg-primary/5 text-primary border-primary/20",
    examples: [
      "What to do after a road accident?",
      "How to contest a traffic challan?",
      "License renewal process",
    ],
    examplesUr: [
      "سڑک حادثے کے بعد کیا کریں؟",
      "ٹریفک چالان کا مقابلہ کیسے کریں؟",
      "لائسنس کی تجدید کا طریقہ کار",
    ],
    systemPrompt: `You are a legal assistant specializing in Traffic Law and Road Regulations. Help users understand:
- Traffic violation penalties
- Accident claim procedures
- Insurance claims
- License and registration rules
- Road safety regulations
- DUI/DWI laws

Provide clear guidance on traffic rules and legal procedures. Help users understand their rights during traffic stops and accidents.`,
  },
  {
    id: "consumer",
    name: "Consumer Rights",
    nameUr: "صارف کے حقوق",
    description: "Product complaints, refund policies, unfair trade practices, and consumer protection laws.",
    descriptionUr: "مصنوعات کی شکایات، واپسی کی پالیسیاں، ناجائز تجارتی طریقے اور صارف تحفظ کے قوانین۔",
    iconName: "ShoppingCart",
    color: "bg-accent/5 text-accent border-accent/20",
    examples: [
      "I received a defective product",
      "The seller refuses to refund",
      "How to file a consumer complaint?",
    ],
    examplesUr: [
      "مجھے خراب مصنوع ملی",
      "دکاندار واپسی دینے سے انکار کر رہا ہے",
      "صارف شکایت کیسے درج کروائیں؟",
    ],
    systemPrompt: `You are a legal assistant specializing in Consumer Protection Law. Help users understand:
- Consumer rights and protections
- Product liability and warranties
- Refund and return policies
- Filing complaints with consumer forums
- E-commerce regulations
- Unfair trade practices

Guide users on how to file complaints and seek remedies. Explain consumer court procedures in simple terms.`,
  },
  {
    id: "family",
    name: "Family Law",
    nameUr: "خاندانی قانون",
    description: "Marriage, divorce, child custody, domestic violence, maintenance, and adoption procedures.",
    descriptionUr: "شادی، طلاق، بچوں کی حضانت، گھریلو تشدد، نفقہ اور گود لینے کے طریقہ کار۔",
    iconName: "Users",
    color: "bg-primary/5 text-primary border-primary/20",
    examples: [
      "What is the divorce procedure?",
      "Child custody rights",
      "How to file for maintenance?",
    ],
    examplesUr: [
      "طلاق کا طریقہ کار کیا ہے؟",
      "بچوں کی حضانت کے حقوق",
      "نفقہ کے لیے درخواست کیسے دیں؟",
    ],
    systemPrompt: `You are a legal assistant specializing in Family Law. Help users understand:
- Marriage and divorce procedures
- Child custody and visitation rights
- Domestic violence protection
- Alimony and maintenance
- Adoption processes
- Inheritance within families

Be especially sensitive and empathetic. Provide information about support resources and legal aid options.`,
  },
  {
    id: "labour",
    name: "Labor Law",
    nameUr: "محنت کش قانون",
    description: "Employment rights, workplace harassment, salary disputes, wrongful termination, and labor unions.",
    descriptionUr: "ملازمت کے حقوق، کام کی جگہ پر ہراسانی، تنخواہ کے تنازعات، غلط برطرفی اور مزدور یونینیں۔",
    iconName: "Briefcase",
    color: "bg-accent/5 text-accent border-accent/20",
    examples: [
      "My employer withheld my salary",
      "I was fired without notice",
      "What are my leave entitlements?",
    ],
    examplesUr: [
      "میرے آجر نے میری تنخواہ روک لی",
      "مجھے بغیر نوٹس کے برخاست کر دیا گیا",
      "میری چھٹیوں کے حقوق کیا ہیں؟",
    ],
    systemPrompt: `You are a legal assistant specializing in Labor and Employment Law. Help users understand:
- Employment contracts and rights
- Wrongful termination
- Workplace harassment
- Salary and benefits disputes
- Leave entitlements
- Labor union rights

Guide workers on their rights and how to file complaints with labor authorities. Explain the dispute resolution process.`,
  },
  {
    id: "criminal",
    name: "Criminal Law",
    nameUr: "فوجداری قانون",
    description: "FIR procedures, bail process, criminal complaints, police procedures, and fundamental rights.",
    descriptionUr: "ایف آئی آر کا طریقہ کار، ضمانت کا عمل، فوجداری شکایات، پولیس طریقہ کار اور بنیادی حقوق۔",
    iconName: "Landmark",
    color: "bg-primary/5 text-primary border-primary/20",
    examples: [
      "How to file an FIR?",
      "What is the bail procedure?",
      "My fundamental rights during arrest",
    ],
    examplesUr: [
      "ایف آئی آر کیسے درج کریں؟",
      "ضمانت کا طریقہ کار کیا ہے؟",
      "گرفتاری کے دوران میرے بنیادی حقوق",
    ],
    systemPrompt: `You are a legal assistant specializing in Criminal Law. Help users understand:
- FIR filing procedures
- Bail and anticipatory bail
- Rights during arrest
- Criminal complaint process
- Police procedures
- Constitutional rights

Explain criminal procedures clearly. Emphasize fundamental rights and the importance of legal representation. Always recommend consulting a criminal lawyer.`,
  },
  {
    id: "constitutional",
    name: "Constitutional Rights",
    nameUr: "آئینی حقوق",
    description: "Fundamental rights, RTI applications, public interest litigation, and civic duties.",
    descriptionUr: "بنیادی حقوق، آر ٹی آئی درخواستیں، عوامی مفاد کی قانونی چارہ جوئی اور شہری فرائض۔",
    iconName: "Globe",
    color: "bg-accent/5 text-accent border-accent/20",
    examples: [
      "What are my fundamental rights?",
      "How to file an RTI?",
      "What is a PIL?",
    ],
    examplesUr: [
      "میرے بنیادی حقوق کیا ہیں؟",
      "آر ٹی آئی کیسے دائر کریں؟",
      "پی آئی ایل کیا ہے؟",
    ],
    systemPrompt: `You are a legal assistant specializing in Constitutional Law. Help users understand:
- Fundamental rights
- Right to Information (RTI)
- Public Interest Litigation (PIL)
- Directive Principles
- Civic duties and responsibilities
- Writ petitions

Educate citizens about their constitutional rights and how to exercise them. Explain democratic processes and legal remedies for rights violations.`,
  },
]

export function getDepartmentById(id: string): LegalDepartment | undefined {
  return legalDepartments.find((dept) => dept.id === id)
}
