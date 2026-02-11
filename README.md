# AWS-Hosted Cloud Engineering Portfolio

A high-performance, secure, and automated personal portfolio hosted on AWS. This project demonstrates proficiency in cloud architecture, DNS management, and SSL/TLS security.

## 🏗️ Architecture Overview

The project follows a standard cloud-native pattern for hosting static content with global delivery and security.


### Components
* **Storage:** Amazon S3 (Static Website Hosting)
* **Content Delivery:** Amazon CloudFront (CDN)
* **Security:** AWS Certificate Manager (ACM) - SSL/TLS
* **DNS Management:** Amazon Route 53 (Authoritative DNS)
* **Domain Registrar:** Name.com

---

## 🛠️ Implementation Steps

### 1. Storage & Hosting (Amazon S3)
* **Bucket Configuration:** Created a public S3 bucket with "Static Website Hosting" enabled.
* **Bucket Policy:** Configured a policy to allow `s3:GetObject` for public read access.
* **Key Learning:** Ensure the bucket region matches your primary target audience for lower latency.

### 2. Security & SSL (AWS Certificate Manager)
* **Certificate Generation:** Requested a public certificate for `ivanrempis.dev` and `*.ivanrempis.dev`.
* **Validation:** Performed DNS validation by adding CNAME records to the authoritative DNS manager.
* **Region Note:** For CloudFront integration, the ACM certificate must be issued in the **us-east-1 (N. Virginia)** region.

### 3. Global Delivery (Amazon CloudFront)
* **Distribution:** Set up a CloudFront distribution pointing to the S3 website endpoint.
* **Alternate Domain Names (CNAMEs):** Configured both the root (`ivanrempis.dev`) and subdomain (`www.ivanrempis.dev`) to ensure universal access.
* **Protocol Policy:** Enabled "Redirect HTTP to HTTPS" to ensure all traffic is encrypted.
* **Troubleshooting:** Resolved an issue where an incorrect **Origin Path** (`/https`) caused 404/403 errors by reverting it to the root directory.

### 4. DNS Routing (Amazon Route 53)
* **Nameserver Migration:** Transitioned DNS management from Name.com to Route 53 by updating the nameservers at the registrar level.
* **Alias Records:** Utilized Route 53 "Alias" records to point the apex domain directly to the CloudFront distribution—a feature not supported by standard CNAME records.
* **ISP Latency:** Documented the observation that DNS propagation can take 24–48 hours, often appearing as "Timeouts" in local `nslookup` queries while being live globally.

---

## 🚀 Future Enhancements (CI/CD)
Currently implementing **GitHub Actions** to automate the deployment process:
* Automated `s3 sync` on every `git push`.
* Automated CloudFront Cache Invalidation to ensure updates are visible instantly.

## 👨‍💻 Author
**IvanRempis**
* 4th Year Student | Cloud Engineering Aspirant
* University Of The East Manila
