import React from 'react';
import SectionWrapper from 'components/SectionWrapper';
import FadeUp from 'components/FadeUp';
import Button from 'components/Button';

const bookingUrl = 'https://book.squareup.com/appointments/the-chair-barbershop';
const mapsUrl = 'https://maps.google.com/?q=The+Chair+Barbershop+72+Queen+Street+West+Toronto';

const hours = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday - Friday', time: '9:00 am - 7:00 pm' },
  { day: 'Saturday', time: '8:00 am - 6:00 pm' },
  { day: 'Sunday', time: '10:00 am - 4:00 pm' },
];

export default function Contact() {
  return (
    <SectionWrapper id="contact" dark={true} className="py-28 md:py-36 relative">
      <FadeUp className="absolute top-10 right-8 md:right-14">
        <div className="flex flex-col items-end gap-2 opacity-60">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-brand-gray">
            06 - Visit
          </span>
          <div className="w-10 h-px bg-brand-gray/40" />
        </div>
      </FadeUp>

      <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-start">
        <div className="flex flex-col gap-8">
          <FadeUp>
            <p className="font-script text-3xl text-brand-brown">Come In</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="font-display text-4xl md:text-6xl font-semibold text-brand-light leading-tight">
              Find <em className="text-brand-burgundy not-italic font-normal italic">Us</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="w-12 h-px bg-brand-green" />
          </FadeUp>

          <FadeUp delay={0.18}>
            <p className="font-sans text-sm md:text-base leading-relaxed text-brand-gray max-w-md">
              Book ahead for the chair you want, or stop by between appointments. Walk-ins welcome
              whenever a barber is open.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-1">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-gray">
                Address
              </p>
              <p className="font-sans text-base md:text-lg text-brand-light mt-2 leading-relaxed">
                72 Queen Street West
                <br />
                Toronto, ON - M5H 2N2
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.25}>
            <div className="flex flex-col gap-1">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-gray">
                Phone
              </p>
              <a
                href="tel:+14165372009"
                className="font-sans text-base md:text-lg text-brand-brown hover:text-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-green transition-colors cursor-pointer mt-2"
              >
                (416) 537-2009
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-brand-gray">
                Hours
              </p>
              <table className="w-full mt-2">
                <tbody>
                  {hours.map((row) => (
                    <tr key={row.day} className="border-b border-brand-charcoal/60">
                      <td className="font-sans text-sm text-brand-gray py-3 pr-6">{row.day}</td>
                      <td
                        className={`font-sans text-sm py-3 text-right ${
                          row.time === 'Closed' ? 'text-brand-burgundy' : 'text-brand-light'
                        }`}
                      >
                        {row.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Button href={bookingUrl} aria-label="Book an appointment online">
                Book Online
              </Button>
              <Button href={mapsUrl} variant="ghost" aria-label="Open in Google Maps">
                Get Directions
              </Button>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.2}>
          <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden border border-brand-charcoal group">
            <iframe
              title="The Chair Barbershop Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.243!2d-79.388!3d43.650!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM5JzAwLjAiTiA3OcKwMjMnMTYuOCJX!5e0!3m2!1sen!2sca!4v1"
              className="absolute inset-0 w-full h-full border-0 grayscale brightness-[0.6] contrast-[1.1] invert hue-rotate-180 group-hover:grayscale-0 group-hover:brightness-90 transition-all duration-700"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 bg-brand-burgundy/10 pointer-events-none group-hover:bg-brand-burgundy/0 transition-colors duration-700" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg
                width="40"
                height="50"
                viewBox="0 0 32 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              >
                <path
                  d="M16 0C9.373 0 4 5.373 4 12c0 9 12 28 12 28S28 21 28 12C28 5.373 22.627 0 16 0z"
                  fill="#672f25"
                />
                <circle cx="16" cy="12" r="5" fill="#f4e4de" />
              </svg>
            </div>
          </div>
        </FadeUp>
      </div>
    </SectionWrapper>
  );
}
