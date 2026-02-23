# AWS Cloud Portfolio: Architected & Automated

![AWS](https://img.shields.io/badge/AWS-Cloud%20Native-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-IaC-7B42BC?style=for-the-badge&logo=terraform&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)

A modern, high-performance personal portfolio built using a cloud-native, serverless architecture. This project showcases Infrastructure as Code (IaC), automated CI/CD, and a secure backend pipeline.

## 🌐 Live Site

**[ivanrempis.dev](https://ivanrempis.dev)**

---

## 📋 Table of Contents

- [Features](#-features)
- [Technical Architecture](#-technical-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Key Technical Challenges & Solutions](#-key-technical-challenges--solutions)
- [Local Development](#-local-development)
- [Author](#-author)

---

## ✨ Features

- **Responsive Design** - Mobile-first approach with smooth animations
- **Serverless Contact Form** - AWS-powered backend with real-time email notifications
- **Global CDN Delivery** - Low-latency access worldwide via CloudFront
- **SSL/HTTPS Encryption** - Full end-to-end encryption with ACM certificates
- **DDoS Protection** - Rate limiting and throttling for security
- **Infrastructure as Code** - 100% Terraform-managed resources

---

## 🏗️ Technical Architecture

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

## 🛠️ Tech Stack

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

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

## 📁 Project Structure

```
Portfolio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet with responsive design
├── script.js           # JavaScript for interactivity & form handling
├── README.md           # Documentation
└── Downloads/          # Assets (images, icons, resume)
    ├── Logo.png
    ├── PFP.png
    ├── Resume.pdf
    └── ...
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

## 💻 Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/Ivnbrylle/Portfolio.git
   cd Portfolio
   ```

2. **Open locally**
   - Simply open `index.html` in your browser, or
   - Use a local server:

     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js
     npx serve
     ```

3. **View the site**
   - Navigate to `http://localhost:8000`

> **Note:** The contact form requires the AWS backend to be deployed. For local testing, form submissions will not work.

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
