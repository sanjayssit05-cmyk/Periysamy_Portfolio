import { createElement } from 'react'
import {
  FiBarChart2,
  FiCode,
  FiCreditCard,
  FiDatabase,
  FiLayers,
  FiSearch,
  FiShoppingCart,
  FiTarget,
  FiUsers,
} from 'react-icons/fi'
import { SiMysql, SiPython } from 'react-icons/si'
import { ExcelIcon, PowerBiIcon, TableauIcon } from '../components/BrandIcons.jsx'
const projectIcons = {
  chart: FiBarChart2,
  code: FiCode,
  database: SiMysql,
  excel: ExcelIcon,
  layers: FiLayers,
  powerbi: PowerBiIcon,
  python: SiPython,
  finance: FiCreditCard,
  search: FiSearch,
  tableau: TableauIcon,
  cart: FiShoppingCart,
  target: FiTarget,
  users: FiUsers,
  wallet: FiCreditCard,
}

const skillIcons = {
  excel: ExcelIcon,
  database: FiDatabase,
  powerbi: PowerBiIcon,
  python: SiPython,
  tableau: TableauIcon,
  search: FiSearch,
}

const toolIcons = {
  excel: ExcelIcon,
  'ms excel': ExcelIcon,
  sql: SiMysql,
  'power bi': PowerBiIcon,
  python: SiPython,
  tableau: TableauIcon,
}

export function iconForProject(name) {
  const Icon = projectIcons[name] || FiBarChart2
  return createElement(Icon)
}

export function iconForSkill(name) {
  const Icon = skillIcons[name] || FiBarChart2
  return createElement(Icon)
}

export function iconForTool(name) {
  const Icon = toolIcons[name.toLowerCase()] || FiDatabase
  return createElement(Icon)
}

function escapePdfText(value) {
  return value
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
}

export function createResumePdf() {
  const lines = [
    'A. Periyasamy',
    'Data Analyst',
    '',
    'PROFILE',
    'Data analyst focused on turning data into clear, practical insights.',
    'Based in Dindigul, Tamil Nadu, India.',
    'Replace this summary with your own professional introduction.',
    '',
    'TECHNICAL SKILLS',
    'Microsoft Excel | SQL | Power BI | Python | Tableau',
    'Data analysis | Data cleaning | Data visualization | Exploratory analysis',
    '',
    'PROJECTS',
    'Sales Performance Analysis - Power BI, Excel',
    'E-Commerce Data Analysis - Python, SQL',
    'HR Analytics Dashboard - Power BI',
    'Financial Data Analysis - Excel, SQL',
    'Customer Segmentation Analysis - Python',
    'Business Intelligence Dashboard - Tableau',
    '',
    'EDUCATION',
    'Add your degree, institution, and graduation year.',
    '',
    'CAREER STATUS',
    'Entry-level fresher, building a data analytics portfolio.',
    'Open to a first data analyst opportunity.',
    '',
    'CERTIFICATIONS',
    'Add completed certifications and credential links.',
    '',
    'Note: Replace placeholder details with your verified information.',
  ]
  const text = [
    'BT',
    '/F1 19 Tf',
    '52 786 Td',
    `(${escapePdfText(lines[0])}) Tj`,
    '/F1 10 Tf',
    '0 -24 Td',
    ...lines.slice(1).map((line) => `0 -17 Td (${escapePdfText(line)}) Tj`),
    'ET',
  ].join('\n')
  const objects = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>',
    `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
  ]
  let document = '%PDF-1.4\n'
  const offsets = [0]

  objects.forEach((object, index) => {
    offsets.push(document.length)
    document += `${index + 1} 0 obj\n${object}\nendobj\n`
  })

  const xrefOffset = document.length
  document += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  offsets.slice(1).forEach((offset) => {
    document += `${String(offset).padStart(10, '0')} 00000 n \n`
  })
  document += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`

  return new Blob([document], { type: 'application/pdf' })
}