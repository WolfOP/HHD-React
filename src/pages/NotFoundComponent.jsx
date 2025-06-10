import React from "react";

export default function NotFoundComponent() {
  return (
    <section className="content-section text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-8">Sorry, the page you are looking for does not exist.</p>
      <a href="#home" className="button-style">Go Home</a>
    </section>
  );
}
