export interface Skill {
  icon: string;
  label: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Cloud',
    items: [
      { icon: '/Downloads/amazon.png', label: 'AWS' },
      { icon: '/Downloads/gcp.svg', label: 'GCP' },
    ],
  },
  {
    category: 'Infrastructure',
    items: [
      { icon: '/Downloads/terraform.svg', label: 'Terraform' },
      { icon: '/Downloads/kubernetes.svg', label: 'Kubernetes' },
      { icon: '/Downloads/docker.svg', label: 'Docker' },
    ],
  },
  {
    category: 'CI/CD & DevOps Tools',
    items: [
      { icon: '/Downloads/git_logo.png', label: 'Git' },
    ],
  },
  {
    category: 'Programming & Databases',
    items: [
      { icon: '/Downloads/python.png', label: 'Python' },
      { icon: '/Downloads/Php.svg', label: 'PHP' },
      { icon: '/Downloads/Javascript.svg', label: 'JavaScript' },
      { icon: '/Downloads/mysql.png', label: 'MySQL' },
    ],
  },
  {
    category: 'Frontend & Design',
    items: [
      { icon: '/Downloads/html5.svg', label: 'HTML5' },
      { icon: '/Downloads/css.svg', label: 'CSS3' },
      { icon: '/Downloads/figma.svg', label: 'Figma' },
    ],
  },
];

export const skills: Skill[] = [
  { icon: '/Downloads/amazon.png', label: 'AWS' },
  { icon: '/Downloads/gcp.svg', label: 'GCP' },
  { icon: '/Downloads/terraform.svg', label: 'Terraform' },
  { icon: '/Downloads/kubernetes.svg', label: 'Kubernetes' },
  { icon: '/Downloads/docker.svg', label: 'Docker' },
  { icon: '/Downloads/git_logo.png', label: 'Git' },
  { icon: '/Downloads/python.png', label: 'Python' },
  { icon: '/Downloads/Php.svg', label: 'PHP' },
  { icon: '/Downloads/Javascript.svg', label: 'JavaScript' },
  { icon: '/Downloads/mysql.png', label: 'MySQL' },
  { icon: '/Downloads/html5.svg', label: 'HTML5' },
  { icon: '/Downloads/css.svg', label: 'CSS3' },
  { icon: '/Downloads/figma.svg', label: 'Figma' },
];
