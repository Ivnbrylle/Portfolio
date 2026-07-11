import { SectionTitle } from './SectionTitle';
import { Reveal } from './Reveal';

const services = [
  {
    title: 'CLOUD ARCHITECTURE',
    tagline: '"Building the blueprints for tomorrow\'s scale."',
    body: "I architect resilient, cloud-native foundations designed to scale. From legacy migrations to serverless microservices, I build the high-availability blueprints that turn your vision into a global reality.",
  },
  {
    title: 'DEVOPS & AUTOMATION',
    tagline: '"Turning complex infrastructure into code."',
    body: 'I bridge the gap between code and production using Infrastructure as Code (IaC). By automating CI/CD pipelines and container orchestration, I ensure your deployments are fast, secure, and repeatable.',
  },
  {
    title: 'SRE & OPTIMIZATION',
    tagline: '"Efficiency is the heartbeat of the cloud."',
    body: 'I maximize performance while minimizing cloud spend. Through proactive monitoring and security hardening, I ensure your infrastructure remains rock-solid, cost-effective, and ready for sudden growth.',
  },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 py-20">
      <div className="mx-auto max-w-[1200px] px-5">
        <SectionTitle>ABOUT ME</SectionTitle>

        <Reveal>
          <div className="mx-auto max-w-[600px] text-center">
            <p className="text-lg text-muted">
              <strong className="text-text">Aspiring Cloud Engineer | BSCS Graduate</strong>
              <br />I specialize in architecting resilient, high-availability infrastructure on AWS using Terraform.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-[900px] gap-8 sm:grid-cols-2">
          {services.map((s, i) => (
            <Reveal
              key={s.title}
              delay={i * 0.08}
              className={i === 2 ? 'sm:col-span-2 sm:mx-auto sm:max-w-[450px]' : ''}
            >
              <div className="group h-full rounded-2xl border border-border bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/45 shadow-card hover:shadow-card-hover">
                <h3 className="mb-4 text-xl font-semibold text-text">{s.title}</h3>
                <p className="mb-4 text-sm italic text-muted/70">{s.tagline}</p>
                <p className="text-[0.95rem] text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
