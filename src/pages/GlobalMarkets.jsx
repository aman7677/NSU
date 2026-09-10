import { Factory, Globe2, Handshake, Palette } from "lucide-react";
import Container from "../components/Container";
import Button from "../components/Button";
import PageIntro from "../components/PageIntro";

const businessAudience = [
  { title: "Manufacturers", icon: Factory, description: "Colour and pigment discussions shaped around your product and process requirements." },
  { title: "Distributors", icon: Handshake, description: "A starting point for discussing range, application needs, and customer requirements." },
  { title: "Importers", icon: Globe2, description: "Connect with NSU to discuss product requirements for your market." },
  { title: "Masterbatch Producers", icon: Palette, description: "Share your polymer, process, and target shade requirements for technical review." },
  { title: "Ink Manufacturers", icon: Palette, description: "Discuss colour direction and intended ink application with the NSU team." },
  { title: "Coating Companies", icon: Factory, description: "Bring your coating substrate and process brief to an application-led conversation." },
  { title: "Industrial Buyers", icon: Handshake, description: "Start a conversation about standard products, samples, or technical requirements." },
];

export default function GlobalMarkets() {
  return (
    <>
      <PageIntro
        eyebrow="NSU / Global Business"
        title="BUILT FOR LONG-TERM COLOUR PARTNERSHIPS."
        description="Narayan Sindur Udyog is building long-term relationships with manufacturers, distributors, importers, and industrial buyers across domestic and international markets."
      />
      <Container className="pb-20 md:pb-28">
        <section className="grid gap-12 border-b border-theme pb-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:pb-24">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Who we work with</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[.94] tracking-[-.07em] md:text-6xl">A practical starting point for your colour brief.</h2>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-secondary md:text-lg">Every conversation starts with the product, application, shade, and supply requirement. Contact NSU to discuss what is currently available and what needs technical review.</p>
        </section>

        <section className="pt-16 md:pt-24">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessAudience.map(({ title, icon: Icon, description }) => (
              <article key={title} className="glass-card rounded-2xl p-7 md:p-8">
                <Icon size={28} strokeWidth={1.6} className="text-pigment-yellow" aria-hidden="true" />
                <h2 className="mt-8 text-xl font-semibold tracking-[-.04em]">{title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-secondary">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-theme pt-14">
          <div className="w-full">
            <p className="text-[10px] font-bold uppercase tracking-[.18em] text-pigment-magenta">Domestic &amp; international markets</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[.94] tracking-[-.07em] md:text-6xl">Let’s discuss the right next step.</h2>
            <p className="mt-6 text-base leading-relaxed text-secondary md:text-lg">Whether you are evaluating a standard shade, requesting a sample, or exploring a longer-term supply relationship, the NSU team can begin with your requirement.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact?intent=quote">Discuss a requirement</Button>
              <Button to="/contact?intent=sample" variant="secondary">Request a sample</Button>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}
