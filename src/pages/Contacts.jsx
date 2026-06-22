import ContactForm from '../components/ContactForm.jsx';

export default function Contacts() {
  return (
    <main className="main-contacts">
      <section className="contact-section" aria-labelledby="contact-form-title">
        <h1 id="contact-form-title" className="page-title">Форма обратной связи</h1>
        <ContactForm />
      </section>

      <section className="map-section" aria-labelledby="map-title">
        <h2 id="map-title" className="section-title">Я тут ↓</h2>

        <div className="map-wrapper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d940.0880200176613!2d37.81991264129186!3d55.9161096218582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1774373413807!5m2!1sru!2sru"
            title="Карта с местоположением автора"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </main>
  );
}
