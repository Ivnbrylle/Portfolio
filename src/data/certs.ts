export interface Certification {
  certificate: string;
  name: string;
}

export interface Badge {
  image: string;
  name: string;
}

export const certifications: Certification[] = [
  { certificate: '/Downloads/awssimulearn.jpg', name: 'AWS Simulearn: Cloud Practitioner' },
  { certificate: '/Downloads/awsessentials.jpg', name: 'AWS Technical Essentials' },
  { certificate: '/Downloads/awsmicrodential.jpg', name: 'AWS Microdential Preview' },
  { certificate: '/Downloads/introcyber.jpg', name: 'Introduction to Cybersecurity' },
  { certificate: '/Downloads/networking.jpg', name: 'Networking Basics' },
];

export const badges: Badge[] = [
  { image: '/Downloads/networkbadge.png', name: 'Network Basics' },
  { image: '/Downloads/introcyberbadge.png', name: 'Introduction to Cybersecurity' },
];
