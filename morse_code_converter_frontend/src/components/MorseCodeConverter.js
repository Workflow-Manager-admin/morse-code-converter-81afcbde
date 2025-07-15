import React, { useRef } from 'react';
import styles from './MorseCodeConverter.module.css';

// PUBLIC_INTERFACE
/**
 * MorseCodeConverter - UI for converting between text and morse code, matching the Figma layout.
 * - Structure follows the Figma design with visual elements and placeholders.
 * - No conversion logic is wired yet; input and output will use future state.
 */
function MorseCodeConverter() {
  // Future: Wire up with state and handlers for actual conversion, interactivity, and copy.

  // For demo: allow input editing and placeholder for output, but wiring up JS to follow.
  const inputRef = useRef();

  return (
    <div className={styles.figmaFrame}>
      {/* Main conversion area background */}
      <div className={styles.mainBackground}></div>

      {/* Labels and placeholders */}
      <span className={styles.inputLabel}>Input:</span>
      <span className={styles.outputLabel}>Output:</span>
      <span className={styles.inputPlaceholder}>Type your message here</span>
      <span className={styles.outputPlaceholder}>Translated message</span>

      {/* Key rectangles, mimic as keyboard area - future: actual keys */}
      <div className={`${styles.rectKey} ${styles.rectKey1}`}></div>
      <div className={`${styles.rectKey} ${styles.rectKey2}`}></div>
      <div className={`${styles.rectKey} ${styles.rectKey3}`}></div>
      <div className={`${styles.rectKey} ${styles.rectKey4}`}></div>

      {/* Polygon icon */}
      <div className={styles.polygonKey}></div>

      {/* Top-left logo/title group */}
      <img
        className={styles.logoTitleGroup}
        src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/133b7df0-eb4b-4ce4-bda3-e3bd6570412f"
        alt="MorseCodeConverter AI"
      />

      {/* Button/keyboard group */}
      <div className={styles.group1}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/62cb76b1-374e-439d-8b8e-6f49b7baa079"
          alt="Group 1"
          style={{ width: 35, height: 51 }}
        />
      </div>
      <div className={styles.vectorGraphic}></div>
      <div className={styles.rectKey5}></div>

      {/* Key rows */}
      <div className={styles.keyRow} style={{ top: '128px' }}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/9d03a0f8-9c5e-470c-ad24-148d8c129bd0"
          alt="Row1"
          style={{ width: 600, height: 98 }}
        />
      </div>
      <div className={styles.keyRow} style={{ top: '266px' }}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/d2f73117-4545-499c-ae10-1e05dd574846"
          alt="Row2"
          style={{ width: 600, height: 98 }}
        />
      </div>
      <div className={styles.keyRow} style={{ top: '404px' }}>
        <img
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/5e4d9a37-6ae0-4352-908e-d74af4263b6c"
          alt="Row3"
          style={{ width: 600, height: 98 }}
        />
      </div>
    </div>
  );
}

export default MorseCodeConverter;
