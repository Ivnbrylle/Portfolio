export interface CodeBlock {
  lang: string;
  file: string;
  code: string;
}

export interface ResultMetric {
  value: string;
  label: string;
  detail: string;
}

export interface TechItem {
  label: string;
  value: string;
}

export interface DeepDive {
  problem: string;
  solutionIntro: string;
  solution: string[];
  diagram: string;
  iacIntro?: string;
  codeBlocks?: CodeBlock[];
  results: ResultMetric[];
  tech: TechItem[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  cardImage: string;
  githubUrl: string;
  highlights: string[];
  deepDiveUrl: string;
  deepDiveLabel: string;
  deepDiveType: 'linkedin' | 'github';
  region: string;
  deepDive: DeepDive;
}

export const projects: Project[] = [
  {
    id: 'resilience',
    title: 'Project Resilience',
    subtitle: 'High-Availability 3-Tier AWS Infrastructure',
    cardImage: '/Downloads/project-resilience-arch.png',
    githubUrl: 'https://github.com/Ivnbrylle/Project-Resilience',
    highlights: [
      'Self-Healing - Automatically replaces unhealthy instances via ASG.',
      'Fault Tolerance - Multi-AZ RDS with zero data loss during AZ failures.',
      'High Availability - Multi-AZ deployment survives single AZ outages.',
    ],
    deepDiveUrl:
      'https://www.linkedin.com/pulse/building-fault-tolerant-3-tier-aws-architecture-terraform-rempis-eiqtc',
    deepDiveLabel: 'Read Full Engineering Deep-Dive',
    deepDiveType: 'linkedin',
    region: 'ap-southeast-1',
    deepDive: {
      problem:
        'Standard single-server deployments represent a Single Point of Failure (SPOF). If a single AWS Availability Zone (AZ) goes down or a manual configuration error occurs, the entire application stays offline, leading to significant downtime and potential data loss. I needed to move away from "manual, fragile setups" toward a system that is decoupled, secure, and self-healing.',
      solutionIntro:
        'I engineered a production-grade 3-tier architecture in the ap-southeast-1 (Singapore) region. The system is designed to "survive" by distributing workloads across multiple AZs and automating the recovery process. Key solutions included:',
      solution: [
        'High Availability: Distributing traffic via an ALB to an Auto Scaling Group.',
        'Data Durability: Utilizing RDS Multi-AZ for synchronous replication.',
        'Secure Networking: Isolating the Database and App tiers in Private Subnets.',
      ],
      diagram: '/Downloads/project-resilience-arch.png',
      iacIntro: 'Terraform configuration for the Security Group Nesting:',
      codeBlocks: [
        {
          lang: 'Terraform',
          file: 'security.tf',
          code: `# The "Chain of Trust": Only the App Tier can talk to the Database
resource "aws_security_group" "db_sg" {
  name        = "database-layer-security-group"
  description = "Allow MySQL traffic from App Tier only"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 3306
    to_port         = 3306
    protocol        = "tcp"
    # This is nesting: No IP addresses, just the App SG ID
    security_groups = [aws_security_group.app_sg.id]
  }
}`,
        },
      ],
      results: [
        {
          value: '90%',
          label: 'MTTR Reduction',
          detail: 'Automated instance replacement via ASG eliminates manual rebooting.',
        },
        {
          value: '<60s',
          label: 'Failover',
          detail: 'RDS Multi-AZ ensures rapid database failover with zero data loss.',
        },
        {
          value: '99.9%',
          label: 'Uptime',
          detail: 'Multi-AZ deployment ensures regional resilience against AZ outages.',
        },
        {
          value: '0',
          label: 'Interventions',
          detail: 'Self-healing infrastructure automatically maintains desired instance count.',
        },
      ],
      tech: [
        { label: 'Cloud Provider', value: 'AWS (Region: ap-southeast-1).' },
        { label: 'Infrastructure as Code', value: 'Terraform (~> 5.0).' },
        { label: 'Database', value: 'MySQL 8.0 (RDS Multi-AZ).' },
        { label: 'Compute', value: 'Amazon Linux 2023 + Apache HTTP Server.' },
      ],
    },
  },
  {
    id: 'janitor',
    title: 'Auto Remediation',
    subtitle: 'Event-Driven Self-Healing Infrastructure',
    cardImage: '/Downloads/awsjanitor.png',
    githubUrl: 'https://github.com/Ivnbrylle/Auto-Remediation',
    highlights: [
      'Zero-Touch Recovery - No manual SSH required to fix service crashes.',
      'Event-Driven Architecture - Responds to failures in real-time.',
      'Maintenance Mode - Skip automation during planned maintenance.',
    ],
    deepDiveUrl:
      'https://www.linkedin.com/pulse/building-self-healing-cloud-my-journey-aws-janitor-ivan-brylle-rempis-eglmc',
    deepDiveLabel: 'Read Full Engineering Deep-Dive',
    deepDiveType: 'linkedin',
    region: 'ap-southeast-1',
    deepDive: {
      problem:
        'In modern cloud environments, relying on manual SSH to fix a crashed service is slow and does not scale. Manual intervention creates a bottleneck, increases Mean Time To Recovery (MTTR), and often requires open SSH ports, which increases the security attack surface.',
      solutionIntro: 'I designed a pipeline that automates the entire detection-to-remediation lifecycle:',
      solution: [
        'Monitoring & Detection: CloudWatch Alarms monitor instance health; if a service crashes, the alarm state change triggers EventBridge.',
        'The "Brain" (Lambda): A Python-based Lambda function validates the environment, checking for a Maintenance tag to ensure safety.',
        'Secure Remediation: The system triggers AWS Systems Manager (SSM) to run a custom Command Document, restarting the service securely over the AWS backbone without needing open SSH ports.',
        'Real-time Observability: Automated logs are sent via Discord Webhooks, providing the specific cause and duration of downtime.',
      ],
      diagram: '/Downloads/janitorstructure.png',
      iacIntro:
        'Here is the Python logic that serves as the system’s circuit breaker, combined with the Terraform trigger:',
      codeBlocks: [
        {
          lang: 'Terraform',
          file: 'main.tf',
          code: `# IAM Policy for Lambda Hardening
resource "aws_iam_role_policy" "lambda_policy" {
  name = "lambda_janitor_permissions"
  role = aws_iam_role.lambda_role.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action   = ["ssm:SendCommand", "ec2:DescribeTags"],
        Effect   = "Allow",
        Resource = "*"
      },
      {
        Action   = ["logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"],
        Effect   = "Allow",
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })
}

# Intelligence Layer Configuration
resource "aws_lambda_function" "janitor_brain" {
  function_name    = "CloudJanitor_Remediation_Brain"
  handler          = "lambda_function.lambda_handler"
  runtime          = "python3.11"

  environment {
    variables = {
      DISCORD_WEBHOOK_URL = var.discord_webhook_url
      SSM_DOCUMENT_NAME   = aws_ssm_document.remediate_nginx.name
    }
  }
}

# Cross-Service Permission
resource "aws_lambda_permission" "allow_cloudwatch" {
  statement_id  = "AllowExecutionFromCloudWatch"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.janitor_brain.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.remediation_rule.arn
}`,
        },
        {
          lang: 'Python',
          file: 'lambda_function.py',
          code: `import boto3
import os

def lambda_handler(event, context):
    ec2 = boto3.client('ec2')
    ssm = boto3.client('ssm')

    # Validation: Maintenance Check
    detail = event.get('detail', {})
    metrics = detail.get('configuration', {}).get('metrics', [{}])
    instance_id = metrics[0].get('metricStat', {}).get('metric', {}).get('dimensions', {}).get('InstanceId', 'Unknown')

    tags = ec2.describe_tags(Filters=[{'Name': 'resource-id', 'Values': [instance_id]}])['Tags']
    is_maintenance = any(t['Key'] == 'Maintenance' and t['Value'].lower() == 'true' for t in tags)

    if is_maintenance:
        return {"status": "skipped", "reason": "Maintenance Mode Active"}

    # Secure Remediation via SSM
    ssm.send_command(
        InstanceIds=[instance_id],
        DocumentName=os.environ.get('SSM_DOCUMENT_NAME')
    )

    return {"status": "success"}`,
        },
      ],
      results: [
        {
          value: '90%',
          label: 'Reduction in MTTR',
          detail:
            'System identifies and fixes failures in under 30 seconds, down from 15 minutes of manual detection.',
        },
        {
          value: '0',
          label: 'Zero-Trust Security',
          detail: 'Remediation occurs via SSM, allowing for the complete removal of public SSH access.',
        },
        {
          value: '24/7',
          label: 'Dynamic Observability',
          detail: 'Real-time Discord notifications provide instant clarity on why a service failed.',
        },
      ],
      tech: [
        { label: 'Cloud Provider', value: 'AWS (Region: ap-southeast-1)' },
        { label: 'Automation & IaC', value: 'Terraform, Python (Boto3), Bash, HCL.' },
        {
          label: 'AWS Services',
          value: 'EC2, Lambda, EventBridge, CloudWatch, Systems Manager (SSM), IAM.',
        },
        { label: 'Integrations', value: 'Discord API for real-time webhooks.' },
      ],
    },
  },
  {
    id: 'global-flow',
    title: 'Project Global-Flow',
    subtitle: 'Multi-Region Serverless API with Active-Active Data Layer',
    cardImage: '/Downloads/project-global-flow-diagram.jpg',
    githubUrl: 'https://github.com/Ivnbrylle/Global-Flow-Architecture',
    highlights: [
      'Multi-Region API - Regional API Gateway + Lambda in us-east-1 and us-west-2.',
      'Active-Active Data - DynamoDB Global Table replication for cross-region durability.',
      'Infrastructure as Code - Full deployment and packaging automated through Terraform modules.',
    ],
    deepDiveUrl: 'https://github.com/Ivnbrylle/Global-Flow-Architecture',
    deepDiveLabel: 'View Full Source Code',
    deepDiveType: 'github',
    region: 'us-east-1, us-west-2',
    deepDive: {
      problem:
        'Single-region APIs create regional dependency risks. If one region degrades, users can experience higher latency or service interruption. I wanted to implement a design that improves continuity while keeping the stack lightweight and cost-efficient.',
      solutionIntro:
        'I built a multi-region serverless architecture using Terraform modules and replicated data services:',
      solution: [
        'Regional API Layer: API Gateway HTTP APIs deployed in us-east-1 and us-west-2.',
        'Regional Compute Layer: Lambda functions in each region serving a /status endpoint.',
        'Global Data Layer: DynamoDB Global Table for cross-region replication and resilience.',
        'Modular IaC: Reusable Terraform module applied per region for consistent provisioning.',
      ],
      diagram: '/Downloads/project-global-flow-diagram.jpg',
      iacIntro: 'Module-based Terraform configuration for regional API deployment:',
      codeBlocks: [
        {
          lang: 'Terraform',
          file: 'main.tf',
          code: `module "api_primary" {
  source     = "./modules/serverless_api"
  app_region = "us-east-1"
}

module "api_secondary" {
  source     = "./modules/serverless_api"
  app_region = "us-west-2"

  providers = {
    aws = aws.west
  }
}

resource "aws_dynamodb_table" "global_api_table" {
  name         = "GlobalUserTable"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "UserId"

  replica {
    region_name = "us-west-2"
  }
}`,
        },
      ],
      results: [
        {
          value: '2',
          label: 'Active Regions',
          detail: 'API endpoints deployed in two AWS regions for improved continuity.',
        },
        {
          value: '100%',
          label: 'IaC Provisioning',
          detail: 'All infrastructure components are defined and versioned in Terraform.',
        },
        {
          value: 'Global',
          label: 'Data Durability',
          detail: 'DynamoDB global replication supports regional failover scenarios.',
        },
      ],
      tech: [
        { label: 'Cloud Provider', value: 'AWS (us-east-1, us-west-2).' },
        { label: 'Compute & API', value: 'AWS Lambda, API Gateway HTTP API.' },
        { label: 'Data Layer', value: 'Amazon DynamoDB Global Tables.' },
        { label: 'Automation & IaC', value: 'Terraform, Python 3.12, IAM.' },
      ],
    },
  },
  {
    id: 'arca',
    title: 'Project A.R.C.A.',
    subtitle: 'AI Root-Cause Analysis for EC2-hosted Nginx',
    cardImage: '/Downloads/arca_architecture.png',
    githubUrl: 'https://github.com/Ivnbrylle/Project-A.R.C.A',
    highlights: [
      'Log Intelligence - Streams Nginx error logs from CloudWatch into Lambda automatically.',
      'Bedrock Analysis - Uses Amazon Bedrock to infer the likely root cause and fix.',
      'Incident Automation - Sends structured remediation summaries to Discord in real time.',
    ],
    deepDiveUrl: 'https://www.linkedin.com/pulse/project-arca-ivan-brylle-rempis-vtjbc',
    deepDiveLabel: 'Read Full Engineering Deep-Dive',
    deepDiveType: 'linkedin',
    region: 'us-east-1',
    deepDive: {
      problem:
        'Standard monitoring can tell you that an application is broken, but not why it broke. That forces engineers to manually inspect logs, test hypotheses, and stitch together a fix while downtime continues.',
      solutionIntro: 'I built an event-driven analysis pipeline that automates the first response loop:',
      solution: [
        'CloudWatch logs stream Nginx errors from the EC2 instance.',
        'A Lambda function decodes the log payload and forwards it to Amazon Bedrock.',
        'Bedrock returns a likely root cause and remediation command for the incident.',
        'The result is posted to Discord so the response is visible immediately.',
      ],
      diagram: '/Downloads/arca_architecture.png',
      results: [
        {
          value: '4',
          label: 'Incident Families',
          detail: 'Covers crashes, security events, connectivity issues, and maintenance failures.',
        },
        {
          value: 'AI',
          label: 'Root-Cause Triage',
          detail: 'Uses Amazon Bedrock to convert raw log signals into a likely fix path.',
        },
        {
          value: '1',
          label: 'Unified Response Flow',
          detail: 'Connects logs, Lambda, Bedrock, and Discord into a single remediation loop.',
        },
      ],
      tech: [
        { label: 'Cloud Provider', value: 'AWS (Region: us-east-1).' },
        { label: 'Compute', value: 'Amazon EC2, AWS Lambda, Amazon Bedrock.' },
        { label: 'Observability', value: 'CloudWatch Logs and subscription filters.' },
        { label: 'Automation', value: 'Terraform, Python 3.12, Discord webhooks.' },
      ],
    },
  },
];
