import Script from "next/script";
import { H1 } from "./components/H1";
import { H2 } from "./components/H2";
import { InlineCode } from "./components/InlineCode";
import { Paragraph } from "./components/Paragraph";
import { Section } from "./components/Section";
import { Subtitle } from "./components/Subtitle";
import styles from "./LandingPageTemplate.module.css";

const LandingPageTemplate = () => {
  const onConfettiLoad = () => {
    setTimeout(() => {
      const colors = [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff",
      ];
      const end = Date.now() + 5 * 1000;

      (function frame() {
        (window as any).confetti({
          particleCount: colors.length,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors,
        });
        (window as any).confetti({
          particleCount: colors.length,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors,
        });

        if (Date.now() < end) {
          setTimeout(() => {
            requestAnimationFrame(frame);
          }, 50);
        }
      })();
    }, 1000);
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0/dist/confetti.browser.min.js"
        strategy="afterInteractive"
        onLoad={onConfettiLoad}
      />
      <main>
        <Section>
          <H1>Your project is a go! 🎉</H1>
          <Subtitle>
            Get started by editing <InlineCode>pages/index.tsx</InlineCode>
          </Subtitle>
        </Section>
        <Section className={styles.grayBackground}>
          <H2>Learning resources</H2>
          <Paragraph>
            If you are using a technology for the first time, you can find
            related links in the generated <InlineCode>README.md</InlineCode>{" "}
            file that might prove helpful.
          </Paragraph>
        </Section>
      </main>
      <footer>
        <Section>
          <Paragraph>
            Generated by{" "}
            <a href="https://github.com/akd-io/create-next-stack">
              Create Next Stack
            </a>
          </Paragraph>
        </Section>
      </footer>
    </>
  );
};

export default LandingPageTemplate;