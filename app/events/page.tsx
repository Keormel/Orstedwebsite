import { CalendarDays, MapPin } from "lucide-react";
import MotionReveal from "@/components/MotionReveal";
import Section from "@/components/Section";
import { events } from "@/data/events";

export default function EventsPage() {
  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6">
        <MotionReveal className="rounded-[32px] border border-white/10 bg-panel p-8 sm:p-12">
          <p className="font-rune text-3xl uppercase text-gold">ивенты</p>
          <h1 className="mt-4 font-pixel text-2xl leading-[1.65] text-white sm:text-4xl">События сезона</h1>
          <p className="mt-6 max-w-3xl font-rune text-3xl leading-9 text-white/60">
            Календарь сюжетных сцен, рейдов и гильдейских активностей для первого сезона OrstedProject.
          </p>
        </MotionReveal>
      </section>

      <Section className="mt-24" title="Ближайшие события">
        <div className="grid gap-6">
          {events.map((event, index) => (
            <MotionReveal
              key={event.title}
              delay={index * 0.1}
              className="grid gap-6 rounded-[20px] border border-white/10 bg-panel p-6 sm:grid-cols-[1fr_auto]"
              whileHover={{ y: -3, boxShadow: "0 0 0 1px rgba(94,234,212,0.45), 0 0 24px rgba(94,234,212,0.14)" }}
            >
              <div>
                <span className="rounded-full border border-gold/40 bg-gold/10 px-4 py-1 font-rune text-2xl text-gold">
                  {event.status}
                </span>
                <h2 className="mt-5 font-pixel text-sm leading-7 text-white sm:text-lg">{event.title}</h2>
                <p className="mt-4 font-rune text-2xl leading-8 text-white/60">{event.description}</p>
              </div>
              <div className="grid content-center gap-3 font-rune text-2xl text-white/55">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-gold" />
                  {event.date}, {event.time}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gold" />
                  {event.location}
                </span>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Section>
    </>
  );
}
