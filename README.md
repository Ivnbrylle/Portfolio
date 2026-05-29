# AWS Cloud Portfolio: Architected & Automated

![AWS](https://img.shields.io/badge/AWS-Cloud%20Native-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)

A modern, high-performance personal portfolio built using a cloud-native, serverless architecture. This project showcases Infrastructure as Code (IaC), automated CI/CD, and a secure backend pipeline.

## Live Site

**[ivanrempis.dev](https://ivanrempis.dev)**

---

## Table of Contents

- [Features](#-features)
- [Technical Architecture](#-technical-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Key Technical Challenges & Solutions](#-key-technical-challenges--solutions)
- [Local Development](#-local-development)
- [Author](#-author)

---

## Features

- **Responsive Design** - Mobile-first approach with smooth animations
- **Serverless Contact Form** - AWS-powered backend with real-time email notifications
- **Global CDN Delivery** - Low-latency access worldwide via CloudFront
- **SSL/HTTPS Encryption** - Full end-to-end encryption with ACM certificates
- **DDoS Protection** - Rate limiting and throttling for security
- **Infrastructure as Code** - 100% Terraform-managed resources

---

## Technical Architecture

### 1. Infrastructure as Code (IaC)

| Component            | Technology    | Purpose                                                          |
| -------------------- | ------------- | ---------------------------------------------------------------- |
| **Provisioning**     | Terraform     | 100% of resource provisioning with version control               |
| **State Management** | S3 + DynamoDB | Remote backend with state locking for safe collaborative updates |

### 2. Serverless Backend Pipeline

| Component         | Service                       | Purpose                                               |
| ----------------- | ----------------------------- | ----------------------------------------------------- |
| **API Layer**     | Amazon API Gateway (HTTP API) | Secure, low-latency entry point with rate limiting    |
| **Compute**       | AWS Lambda (Python 3.12)      | Contact form processing and multi-service integration |
| **Database**      | Amazon DynamoDB               | NoSQL storage with pay-per-request model              |
| **Notifications** | Amazon SES                    | Automated email alerts for contact submissions        |

### 3. Frontend & Global Delivery

| Component   | Service               | Purpose                                      |
| ----------- | --------------------- | -------------------------------------------- |
| **Storage** | Amazon S3             | Static website hosting                       |
| **CDN**     | Amazon CloudFront     | Global delivery and SSL termination          |
| **DNS**     | Amazon Route 53 + ACM | Domain management with full HTTPS encryption |

---

## Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

Single-page app built with **React 19 + TypeScript**, bundled by **Vite**, styled with **Tailwind CSS v4** (single amber palette with a persisted light/dark theme toggle), and animated with **Motion**. The production build outputs static assets to `dist/`, deployed to S3 + CloudFront.

### Cloud & DevOps

![AWS](https://img.shields.io/badge/AWS-232F3E?style=flat-square&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)

### AWS Services Used

- S3 (Static Hosting)
- CloudFront (CDN)
- Route 53 (DNS)
- API Gateway (REST API)
- Lambda (Serverless Compute)
- DynamoDB (NoSQL Database)
- SES (Email Service)
- ACM (SSL Certificates)

---

## Project Structure

```
Portfolio/
├── index.html              # Vite entry (mount point, fonts, no-flash theme script)
├── package.json            # Dependencies & scripts (dev / build / preview)
├── vite.config.ts          # Vite + React + Tailwind plugins
├── tsconfig*.json          # TypeScript configuration
├── public/
│   └── Downloads/          # Static assets (images, icons, certs, resume)
├── src/
│   ├── main.tsx            # App bootstrap + ThemeProvider
│   ├── App.tsx             # Section composition
│   ├── index.css           # Tailwind v4 import + theme tokens + globals
│   ├── lib/theme.tsx       # Light/dark theme context
│   ├── data/               # Typed content (skills, projects, certs)
│   └── components/         # Navbar, Hero, AwsProjects, ProjectModal, ...
└── .github/workflows/      # CI/CD: build → S3 sync → CloudFront invalidation
```

---

## 🛠️ Key Technical Challenges & Solutions

### 1. Transitioning to IaC (Remote State)

| Challenge                                                                    | Solution                                                                                                                                       |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Managing infrastructure manually in AWS Console led to "configuration drift" | Bootstrapped a Terraform remote backend, learning the "chicken-and-egg" problem of using Terraform to build its own state-management resources |

### 2. DDoS Mitigation & Cost Control

| Challenge                                                         | Solution                                                                                                                  |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Serverless architectures can lead to unexpected costs if attacked | Implemented API Gateway Throttling (5 requests/sec) to drop malicious traffic before triggering costly downstream compute |

### 3. IAM Policy Hardening

| Challenge                                                         | Solution                                                                                                                       |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Ensuring "Principle of Least Privilege" for Lambda execution role | Refined IAM policies to limit permissions to specific actions (`dynamodb:PutItem`, `ses:SendEmail`) on specific resources only |

---

## Local Development

**Prerequisites:** Node.js 22+ and npm.

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ivnbrylle/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Then navigate to `http://localhost:5173`.

4. **Build for production**

   ```bash
   npm run build     # outputs static assets to dist/
   npm run preview   # serve the production build locally
   ```

> **Note:** The contact form posts to the live AWS backend (API Gateway). Submissions work from any environment with network access to the endpoint.

---

## 👨‍💻 Author

**Ivan Rempis**

- 🎓 4th Year Computer Science Student | University of the East - Manila
- ☁️ Aspiring Cloud Engineer
- 🔗 [LinkedIn](https://www.linkedin.com/in/ivn-brylle/)
- 💻 [GitHub](https://github.com/Ivnbrylle)

---

## 📄 License

This project is open source and available for learning purposes.

---

<p align="center">
  <i>Built with ☁️ on AWS</i>
</p>
