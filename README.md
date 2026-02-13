# AWS Cloud Portfolio: Architected & Automated
A modern, high-performance personal portfolio built using a cloud-native, serverless architecture. This project showcases Infrastructure as Code (IaC), automated CI/CD, and a secure backend pipeline.

Live Site
Check it out at: ivanrempis.dev

Technical Architecture
1. Infrastructure as Code (IaC)
Terraform: Used for 100% of resource provisioning, ensuring consistency and version control.

Remote State Management: Implemented an S3 backend with DynamoDB State Locking to prevent concurrent execution and ensure safe collaborative updates.

2. Serverless Backend Pipeline
API Layer: Amazon API Gateway (HTTP API) provides a secure, low-latency entry point with Rate Limiting implemented for DDoS protection.

Compute: AWS Lambda (Python 3.12) processes contact form data and manages multi-service integration.

NoSQL Storage: Amazon DynamoDB stores messages in a cost-efficient, pay-per-request model.

Notifications: Amazon SES triggers automated Gmail alerts for real-time contact notifications.

3. Frontend & Global Delivery
Storage: Amazon S3 (Static Website Hosting).

CDN: Amazon CloudFront for low-latency global delivery and SSL termination.

DNS: Amazon Route 53 with ACM for full HTTPS encryption.

🛠️ Key Technical Challenges & Solutions
1. Transitioning to IaC (Remote State)
Challenge: Managing infrastructure manually in the AWS Console led to "configuration drift."

Solution: Bootstrapped a Terraform remote backend. This taught me the "chicken-and-egg" problem of using Terraform to build its own state-management resources.

2. DDoS Mitigation & Cost Control
Challenge: Serverless architectures are elastically scalable but can lead to unexpected costs if attacked.

Solution: Implemented API Gateway Throttling (5 requests/sec) to drop malicious traffic before it triggers costly downstream compute or storage.

3. IAM Policy Hardening
Challenge: Ensuring the "Principle of Least Privilege" for the Lambda execution role.

Solution: Refined IAM policies to limit permissions specifically to dynamodb:PutItem and ses:SendEmail on specific resources rather than using broad administrative access.

👨‍💻 Author
Ivan Rempis 4th Year Computer Science Student | University of the East - Manila Aspiring Cloud Engineer
