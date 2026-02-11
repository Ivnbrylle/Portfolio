# AWS Cloud Portfolio: Architected & Automated

A modern, high-performance personal portfolio built using a cloud-native architecture. This project showcases full-stack cloud skills, including hosting, global delivery, DNS security, and automated CI/CD.

## 🚀 Live Site
Check it out at: [ivanrempis.dev](https://ivanrempis.dev)

## 🏗️ Technical Architecture


### Infrastructure & Security
* **Storage:** Amazon S3 (Static Website Hosting) for reliable object storage.
* **CDN:** Amazon CloudFront for low-latency global delivery and SSL termination.
* **DNS:** Amazon Route 53 (Authoritative DNS) with Name.com as the registrar.
* **Security:** AWS Certificate Manager (ACM) providing full HTTPS encryption via SSL/TLS.

### Automation (CI/CD)
* **Pipeline:** GitHub Actions.
* **Workflow:** Every `git push` to the `main` branch triggers an automated sync to S3 and a cache invalidation for global CloudFront distributions.

---

## 🛠️ Challenges & Key Learnings

### 1. DNS Propagation & ISP Latency
* **Challenge:** Encountered `nslookup` timeouts despite correct Route 53 configuration.
* **Lesson:** Documented the reality of global DNS propagation (24–48 hours) and learned how to verify nameserver "handshakes" using global propagation tools.

### 2. CloudFront CNAME & Origin Resolution
* **Challenge:** Site failed to resolve for the root domain and returned 403/404 errors due to an incorrect "Origin Path."
* **Solution:** Configured both apex (`ivanrempis.dev`) and subdomain (`www`) in Alternate Domain Names and removed unnecessary subdirectory paths to align with the S3 root object.

### 3. Automated Invalidation (The "Instant" Update)
* **Challenge:** New code changes in S3 weren't visible due to CloudFront’s edge caching.
* **Implementation:** Integrated `aws cloudfront create-invalidation` into the CI/CD pipeline to clear the cache for multiple distributions automatically upon deployment.

---

## 👨‍💻 Author
**Ivan Rempis** *4th Year College Student | Cloud Engineering Aspirant
