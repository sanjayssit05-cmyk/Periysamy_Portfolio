export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Fresher journey', href: '#journey' },
]

export const socialLinks = {
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/',
  instagram: 'https://www.instagram.com/a.periya_samy/#',
}

export const whatsappUrl =
  'https://wa.me/919025872798?text=Hello%20Periyasamy%2C%20I%20saw%20your%20portfolio.'

export const skills = [
  {
    name: 'MS Excel',
    category: 'Reporting',
    icon: 'excel',
    description: 'Pivot tables, Power Query, formulas, and clear reporting.',
  },
  {
    name: 'SQL',
    category: 'Data',
    icon: 'database',
    description: 'Querying, joining, and shaping data for useful answers.',
  },
  {
    name: 'Power BI',
    category: 'Business intelligence',
    icon: 'powerbi',
    description: 'Interactive dashboards, KPI tracking, and data storytelling.',
  },
  {
    name: 'Python',
    category: 'Analytics',
    icon: 'python',
    description: 'Exploratory analysis and repeatable data workflows.',
  },
  {
    name: 'Tableau',
    category: 'Visualization',
    icon: 'tableau',
    description: 'Accessible visualizations that make trends easy to explore.',
  },
  {
    name: 'Data analysis',
    category: 'Problem solving',
    icon: 'search',
    description: 'Turning business questions into evidence-led decisions.',
  },
]

export const projects = [
  {
    title: 'Sales Performance Analysis',
    category: 'Business intelligence',
    tools: ['Power BI', 'Excel'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Colorful analytics charts displayed on a computer screen',
    icon: 'chart',
    accent: 'blue',
    description:
      'A sample sales dashboard exploring revenue, product mix, and monthly performance.',
    detail:
      'The sample workflow brings together sales data, cleans the reporting fields, and presents product and monthly trends in an interactive dashboard. Replace the illustrative dataset with your own before sharing results.',
  },
  {
    title: 'E-Commerce Data Analysis',
    category: 'Data analytics',
    tools: ['Python', 'SQL'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Online shopping checkout on a laptop',
    icon: 'cart',
    accent: 'violet',
    description:
      'An end-to-end sample analysis of orders, customer behavior, and purchasing patterns.',
    detail:
      'A practical analysis outline for shaping order data with SQL, exploring repeat purchases in Python, and communicating customer and product patterns. Metrics shown in the portfolio dashboard are illustrative.',
  },
  {
    title: 'HR Analytics Dashboard',
    category: 'Business intelligence',
    tools: ['Power BI'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Colleagues collaborating around a table',
    icon: 'users',
    accent: 'orange',
    description:
      'A people analytics concept for exploring headcount, retention, and workforce trends.',
    detail:
      'A dashboard concept for responsibly exploring workforce trends using aggregated, non-identifying data. Add a verified dataset, definitions, and the final dashboard link when ready.',
  },
  {
    title: 'Financial Data Analysis',
    category: 'Finance',
    tools: ['Excel', 'SQL'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Financial performance charts on a laptop',
    icon: 'wallet',
    accent: 'green',
    description:
      'A sample financial reporting workflow for comparing costs, budgets, and actuals.',
    detail:
      'An example workflow for organizing financial records, reconciling categories, and comparing monthly actuals with a sample budget. Replace the example figures and assumptions before using this as a case study.',
  },
  {
    title: 'Customer Segmentation Analysis',
    category: 'Data analytics',
    tools: ['Python'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Portrait representing customer audience insights',
    icon: 'target',
    accent: 'pink',
    description:
      'A customer analysis concept focused on meaningful, data-led audience groups.',
    detail:
      'A starter project concept for preparing customer data, exploring behavior patterns, and assessing interpretable segments. Document the source, method, and limitations alongside your final analysis.',
  },
  {
    title: 'Business Intelligence Dashboard',
    category: 'Visualization',
    tools: ['Tableau'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Team reviewing business data on a large display',
    icon: 'layers',
    accent: 'cyan',
    description:
      'A Tableau dashboard concept for bringing business KPIs into one clear view.',
    detail:
      'A sample dashboard concept that combines business KPIs, filters, and time-based comparisons. Add screenshots and a verified public dashboard URL when the project is ready to publish.',
  },
]

export const monthlyPerformance = [
  { month: 'Jan', revenue: 32000, orders: 218, customers: 165 },
  { month: 'Feb', revenue: 36500, orders: 247, customers: 188 },
  { month: 'Mar', revenue: 34200, orders: 232, customers: 179 },
  { month: 'Apr', revenue: 42800, orders: 286, customers: 215 },
  { month: 'May', revenue: 39700, orders: 271, customers: 206 },
  { month: 'Jun', revenue: 48600, orders: 322, customers: 244 },
  { month: 'Jul', revenue: 45200, orders: 305, customers: 231 },
  { month: 'Aug', revenue: 52100, orders: 351, customers: 269 },
  { month: 'Sep', revenue: 49300, orders: 338, customers: 253 },
  { month: 'Oct', revenue: 56800, orders: 379, customers: 291 },
  { month: 'Nov', revenue: 53700, orders: 362, customers: 278 },
  { month: 'Dec', revenue: 62400, orders: 416, customers: 318 },
]

export const education = [
  {
    title: 'Add your degree or qualification',
    organization: 'Institution name',
    date: 'Year - Year',
    description:
      'Replace this placeholder with your qualification, field of study, and any relevant academic highlights.',
    placeholder: true,
  },
]

export const certifications = [
  { name: 'Microsoft Excel', issuer: 'Add credential after completion', status: 'Learning goal' },
  { name: 'SQL', issuer: 'Add credential after completion', status: 'Learning goal' },
  { name: 'Power BI', issuer: 'Add credential after completion', status: 'Learning goal' },
  { name: 'Python', issuer: 'Add credential after completion', status: 'Learning goal' },
  { name: 'Tableau', issuer: 'Add credential after completion', status: 'Learning goal' },
]
