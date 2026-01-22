# Branding Guidelines

This page provides guidelines and assets for using the Strata brand in your projects, presentations, and documentation.

## Pronunciation

**Strata** is pronounced **STRAH-tah** (/ˈstrɑːtə/).

## Alternative Names

The language may also be referred to as:

- StrataLang
- StraLang

Both are acceptable, but the official name is "Strata".

## Logo Assets

### Icon

The Strata icon is a geometric diamond shape representing layers (strata). It's available in SVG format and can be used at any size.

<div class="branding-asset">
  <div class="branding-asset-image">
    <img src="/branding/strata-icon.svg" alt="Strata Icon" width="128" height="128" />
    <p class="branding-asset-label">Icon</p>
  </div>
  <div class="branding-asset-details">
    <h4>Usage</h4>
    <ul>
      <li>Use in "Built with Strata" badges or attribution sections</li>
      <li>Use in documentation when referencing the Strata language</li>
      <li>Use in presentations or articles about Strata</li>
      <li>Use in README files to indicate Strata as a dependency</li>
      <li>Minimum size: 24px × 24px</li>
      <li>Maintain aspect ratio when scaling</li>
    </ul>
    <p><strong>Path:</strong> <code>/branding/strata-icon.svg</code></p>
  </div>
</div>

### Wordmark

The Strata wordmark combines the icon with the "STRATA" text. Use this when referencing or presenting about Strata.

<div class="branding-asset">
  <div class="branding-asset-image">
    <img src="/branding/strata-logo-wordmark.svg" alt="Strata Wordmark" style="max-width: 300px; height: auto;" />
    <p class="branding-asset-label">Wordmark</p>
  </div>
  <div class="branding-asset-details">
    <h4>Usage</h4>
    <ul>
      <li>Use in presentations or talks about Strata</li>
      <li>Use in articles or blog posts discussing Strata</li>
      <li>Use in "Powered by Strata" or attribution sections</li>
      <li>Minimum width: 200px</li>
      <li>Maintain aspect ratio when scaling</li>
    </ul>
    <p><strong>Path:</strong> <code>/branding/strata-logo-wordmark.svg</code></p>
  </div>
</div>

### Wordmark (Dark Mode)

The dark mode wordmark is designed for use on dark backgrounds when referencing Strata.

<div class="branding-asset">
  <div class="branding-asset-image">
    <img src="/branding/strata-logo-wordmark-dark.svg" alt="Strata Wordmark Dark" style="max-width: 300px; height: auto; background: #1a1a1a; padding: 2rem; border-radius: 8px;" />
    <p class="branding-asset-label">Wordmark (Dark Mode)</p>
  </div>
  <div class="branding-asset-details">
    <h4>Usage</h4>
    <ul>
      <li>Use on dark backgrounds and in dark mode</li>
      <li>Minimum width: 200px</li>
      <li>Maintain aspect ratio when scaling</li>
    </ul>
    <p><strong>Path:</strong> <code>/branding/strata-logo-wordmark-dark.svg</code></p>
  </div>
</div>

## Color Palette

Strata uses a blue color palette that represents trust, technology, and professionalism. The palette is based on Tailwind CSS blue shades.

### Primary Colors

<div class="color-palette">
  <div class="color-swatch" style="background: #93C5FD; color: #1E3A8A;">
    <div class="color-hex">#93C5FD</div>
    <div class="color-name">Blue 300</div>
    <div class="color-description">Light Blue</div>
  </div>
  <div class="color-swatch" style="background: #60A5FA; color: white;">
    <div class="color-hex">#60A5FA</div>
    <div class="color-name">Blue 400</div>
    <div class="color-description">Medium Blue</div>
  </div>
  <div class="color-swatch" style="background: #2563EB; color: white;">
    <div class="color-hex">#2563EB</div>
    <div class="color-name">Blue 600</div>
    <div class="color-description">Primary Blue</div>
  </div>
  <div class="color-swatch" style="background: #1E3A8A; color: white;">
    <div class="color-hex">#1E3A8A</div>
    <div class="color-name">Blue 800</div>
    <div class="color-description">Dark Blue</div>
  </div>
</div>

### Text Colors

<div class="color-palette">
  <div class="color-swatch" style="background: #1F2937; color: white;">
    <div class="color-hex">#1F2937</div>
    <div class="color-name">Gray 800</div>
    <div class="color-description">Primary Text</div>
  </div>
  <div class="color-swatch" style="background: #666; color: white;">
    <div class="color-hex">#666666</div>
    <div class="color-name">Gray</div>
    <div class="color-description">Secondary Text</div>
  </div>
</div>

### Color Usage Guidelines

These colors represent the Strata brand and can be used when creating content **about** Strata:

- **#2563EB (Blue 600)**: Primary Strata brand color
- **#1E3A8A (Blue 800)**: Dark Strata brand color
- **#60A5FA (Blue 400)**: Light Strata brand color
- **#93C5FD (Blue 300)**: Subtle Strata brand color
- **#1F2937 (Gray 800)**: Primary text color for Strata materials
- **#666666 (Gray)**: Secondary text color for Strata materials

## Usage Guidelines

When using Strata branding assets in your content:

### Do's

- Use the logo at appropriate sizes (minimum 24px for icon, 200px for wordmark)
- Maintain the aspect ratio of all assets
- Use SVG format when possible for scalability
- Provide adequate spacing around the logo (at least 20% of the logo's height)
- Use assets when attributing or referencing Strata

### Don'ts

- Don't modify or distort the logo
- Don't change the colors of the logo
- Don't place the logo on busy backgrounds without proper contrast
- Don't use the logo smaller than the minimum recommended sizes
- Don't rotate or skew the logo
- Don't add effects like shadows, gradients, or outlines to the logo
- Don't use Strata branding as your application's primary branding

## Download Assets

All branding assets are available in the `branding/` path:

- [Icon SVG](/.vitepress/dist/branding/strata-icon.svg)
- [Wordmark SVG](/.vitepress/dist/branding/strata-logo-wordmark.svg)
- [Wordmark Dark Mode SVG](/.vitepress/dist/branding/strata-logo-wordmark-dark.svg)

## CSS Variables

If you're creating content about Strata (such as documentation, tutorials, or presentations), you can use these CSS variables for consistent branding:

```css
:root {
  --strata-blue-300: #93C5FD;
  --strata-blue-400: #60A5FA;
  --strata-blue-600: #2563EB;
  --strata-blue-800: #1E3A8A;
  --strata-text-primary: #1F2937;
  --strata-text-secondary: #666666;
}
```

## Questions?

If you have questions about using Strata branding assets, please submit an issue on the [Strata GitHub repository](https://github.com/stratalang/strata/issues).
