import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./StartingPageContent.module.css";

const FeatureCard = ({ title, description }) => (
  <div className={classes.feature}>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const Footer = () => (
  <footer className={classes.footer}>
    <a
      href="https://github.com/kursadsaka/reactAuthTasks"
      target="_blank"
      rel="noopener noreferrer"
      className={classes.githubLink}
      title="View source code on GitHub"
    >
      <svg height="24" width="24" viewBox="0 0 16 16" version="1.1">
        <path
          fillRule="evenodd"
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
        ></path>
      </svg>
    </a>
  </footer>
);

const StartingPageContent = ({ isLoggedIn }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const features = [
    {
      title: "Real-time Sync",
      description:
        "Tasks sync instantly across devices, providing a seamless experience.",
    },
    {
      title: "React & Firebase",
      description:
        "Built with React for the frontend and Firebase for backend services.",
    },
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className={classes.starting}>
      {isLoggedIn ? (
        <>
          <h1>Welcome Back!</h1>
          <p>Your tasks are syncing in real-time across all your devices.</p>
          <p>Start managing your tasks below.</p>
          <button onClick={toggleExpand} className={classes.toggleButton}>
            {isExpanded ? "Hide Project Info" : "Show Project Info"}
          </button>
          {isExpanded && (
            <div
              className={`${classes.collapsible} ${
                isExpanded ? classes.expanded : ""
              }`}
            >
              <h2>About This Project</h2>
              <div className={classes.features}>
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
              <Footer />
            </div>
          )}
        </>
      ) : (
        <>
          <h1>Welcome to TaskMaster</h1>
          <p>
            A showcase of modern web development techniques for my portfolio.
          </p>
          <div className={classes.features}>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>

          <Link className={classes.ctaLink} to="/reactAuthTasks/auth">
            Try It Out
          </Link>
          <Footer />
        </>
      )}
    </section>
  );
};

export default StartingPageContent;
