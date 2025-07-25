import classnames from "classnames";
import { useEffect, useState } from "react";
import {StyleSettings, useStyle } from "../contexts/StyleContext";
import ReactDOM from "react-dom";

const AccessibilityMenu = () => {
  const { settings, updateSettings } = useStyle();
  const [readyToRender, setReadyToRender] = useState(false);
  useEffect(() => {
    setReadyToRender(true);
  }, []);
  useEffect(() => {
    if (settings.isStyleMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [settings.isStyleMenuOpen]);
  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && settings.isStyleMenuOpen) {
        updateSettings({ isStyleMenuOpen: false });
      }
    };

    if (settings.isStyleMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [settings.isStyleMenuOpen, updateSettings]);
  const onMemuClose = () => {
    updateSettings({ isStyleMenuOpen: !settings.isStyleMenuOpen });
  };
  const handleThemeSelect = (theme: "light" | "dark" | "high-contrast") => {
    updateSettings({ theme});
  };

  const handleFontSizeSelect = (
    fontSize: StyleSettings["fontSize"],
  ) => {
    updateSettings({ fontSize });
  };
  return !readyToRender
    ? null
    : ReactDOM.createPortal(
        <>
          {settings.isStyleMenuOpen && (
            <div
              className="style-menu-overlay"
              onClick={() => updateSettings({ isStyleMenuOpen: false })}
            />
          )}
          <div
            className={classnames("style-selector", {
              open: settings.isStyleMenuOpen,
            })}
          >
            <div className="style-selector-header">
              <h3>Appearance Settings</h3>
              <button
                className="close-button"
                onClick={onMemuClose}
                aria-label="Close style menu"
              >
                ×
              </button>
            </div>

            <div className="setting-group">
              <label>Theme:</label>
              <div className="theme-options">
                <button
                  className={`theme-button light ${settings.theme === "light" ? "active" : ""}`}
                  onClick={() => handleThemeSelect("light")}
                  aria-label="Light theme"
                >
                  <span className="theme-icon">☀️</span>
                  <span>Light</span>
                </button>
                <button
                  className={`theme-button dark ${settings.theme === "dark" ? "active" : ""}`}
                  onClick={() => handleThemeSelect("dark")}
                  aria-label="Dark theme"
                >
                  <span className="theme-icon">🌙</span>
                  <span>Dark</span>
                </button>
                <button
                  className={`theme-button high-contrast ${settings.theme === "high-contrast" ? "active" : ""}`}
                  onClick={() => handleThemeSelect("high-contrast")}
                  aria-label="High contrast theme"
                >
                  <span className="theme-icon">🎨</span>
                  <span>High Contrast</span>
                </button>
              </div>
            </div>

            <div className="setting-group">
              <label>Font Size:</label>
              <div className="font-size-options">
                <button
                  className={`font-button ${settings.fontSize === "normal" ? "active" : ""}`}
                  onClick={() => handleFontSizeSelect("normal")}
                  aria-label="Normal text size"
                >
                  A
                </button>
                <button
                  className={`font-button ${settings.fontSize === "large" ? "active" : ""}`}
                  onClick={() => handleFontSizeSelect("large")}
                  aria-label="Large text size"
                >
                  A+
                </button>
                <button
                  className={`font-button ${settings.fontSize === "extra-large" ? "active" : ""}`}
                  onClick={() => handleFontSizeSelect("extra-large")}
                  aria-label="Extra large text size"
                >
                  A++
                </button>
              </div>
            </div>
          </div>
        </>,
        document.querySelector(".app")!,
      );
};

export default AccessibilityMenu;
