// tests/components.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "../src/App.jsx";
import { UserProvider } from "../src/context/UserContext.jsx";
import { ResumeProvider } from "../src/context/ResumeContext.jsx";

const queryClient = new QueryClient();

const renderApp = (initialRoute = "/") => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ResumeProvider>
            <App />
          </ResumeProvider>
        </UserProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("App pages", () => {
  //home page
  test("renders Home page", () => {
    renderApp("/");
    expect(screen.getByText(/Commencer/i)).toBeInTheDocument();
  });

//static pages
  test("renders MentionsLegales page", () => {
    renderApp("/mentions-legales");
    expect(screen.getByText(/Propriété intellectuelle/i)).toBeInTheDocument();
  });

  test("renders PolitiqueConfidentialite page", () => {
    renderApp("/politique-confidentialite");
    expect(screen.getByText(/Durée de conservation/i)).toBeInTheDocument();
  });

  test("renders CGU page", () => {
    renderApp("/cgu");
    expect(screen.getByText(/Modification des CGU/i)).toBeInTheDocument();
  });

  test("renders NotFound page for unknown route", () => {
    renderApp("/unknown-route");
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});

