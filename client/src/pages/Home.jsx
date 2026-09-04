import React from "react";
import { Link } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import heroBg from "../assets/hero_backgroundImg.jpg";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div
        className="relative min-h-125 sm:min-h-150 w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col items-center py-16">
          <span className="text-amber-300 font-semibold tracking-widest text-xs uppercase mb-3 px-3 py-1 bg-amber-400/10 rounded-full border border-amber-400/20">
            DevForge Developer Workspace
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            All Your Developer Data in One Unified Dashboard
          </h1>

          <p className="mt-4 text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed">
            Track solved coding problems, manage project showcases, organize learning goals, save resources, and keep developer notes seamlessly.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {user ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-neutral-900 font-bold text-sm hover:bg-neutral-200 transition-all shadow text-center"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white text-neutral-900 font-bold text-sm hover:bg-neutral-200 transition-all shadow text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/60 hover:border-white text-white hover:bg-white/10 font-semibold text-sm transition-all text-center"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Built for Developer Productivity
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Everything you need to organize your learning journey and showcase your engineering progress.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon="#"
            title="Coding Problems"
            description="Log your solved LeetCode and DSA problems with topics, difficulties, and hashmap solution notes."
          />
          <FeatureCard
            icon="$"
            title="Learning Goals"
            description="Set targeted learning milestones, deadlines, and visually track your progress percentage."
          />
          <FeatureCard
            icon="&"
            title="Projects Showcase"
            description="Maintain your full-stack projects with live URLs, GitHub repositories, and tech stack tags."
          />
          <FeatureCard
            icon="@"
            title="Developer Notes"
            description="Keep personal technical notes, useEffect guides, cheatsheets, and bookmark resources."
          />
        </div>
      </div>
    </div>
  );
};

export default Home;